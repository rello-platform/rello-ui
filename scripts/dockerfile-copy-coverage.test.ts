// @vitest-environment node
/**
 * Every relative import under src/ must exist inside the Docker image that
 * compiles src/ (the Dockerfile's `lib-build` stage).
 *
 * WHY: v2.32.0 added `../../tokens/app-overrides.json` to
 * src/email/render-email.ts. Local builds and the npm publish had the whole
 * checkout and passed. The image copies only what its COPY lines name, so every
 * Railway deploy of the configurator failed from 2026-10-29 until
 * `COPY tokens/ tokens/` was added.
 *
 * The COPY lines are read from the Dockerfile. There is no second list here.
 * Only lines above the stage's `RUN npm run compile` count, and a COPY option
 * that could change which files arrive is refused, not ignored.
 *
 * NOT covered: .dockerignore exclusions, a RUN that deletes or moves copied
 * files, files read at runtime (fs, `new URL(..., import.meta.url)`),
 * non-relative specifiers such as `@/…`, computed `import()` paths, the later
 * Dockerfile stages, and anything that only breaks on Linux. The Railway deploy
 * is still the proof of the image.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, posix } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { describe, expect, it } from "vitest";

const REPO = fileURLToPath(new URL("..", import.meta.url));
const STAGE = "lib-build";
const SCRIPT_FILE = /\.[cm]?[jt]sx?$/;
const CSS_FILE = /\.css$/;
const EXTENSIONS = ["", ".ts", ".tsx", ".d.ts", ".js", ".jsx", ".json"];
const COMPILE_COMMAND = /\bnpm\s+run\s+compile(?![\w:.-])/;
/** COPY options that leave the set of arriving files alone. `--from=` is handled apart. */
const HARMLESS_COPY_OPTION = /^(--chown=.*|--chmod=.*|--link)$/;

/**
 * The one exemption. A test may import the build output, to prove the committed
 * dist/ was rebuilt. No COPY line should supply dist/: the stage makes its own
 * with `npm run compile`, and it runs no tests. A shipped file importing dist/
 * is still reported.
 */
const isTestOfBuildOutput = (file: string, target: string) =>
  /\.test\.[cm]?[jt]sx?$/.test(file) && target.startsWith("dist/");

interface Copy {
  /** Path in the build context, relative to the repo root. */
  source: string;
  /** Destination as written in the Dockerfile. */
  dest: string;
  /** Destination relative to the stage's first WORKDIR (the image's repo root). */
  destInRoot: string;
}

/**
 * The build-context COPY lines one stage has run by the time it compiles.
 * Throws on any form it can't read, and when the stage never compiles.
 */
function stageCopies(dockerfile: string, stage: string): Copy[] {
  const copies: Copy[] = [];
  let inStage = false;
  let compiles = false;
  let root: string | undefined;
  let workdir = "/";

  for (const line of dockerfile.replace(/\\\r?\n/g, " ").split(/\r?\n/)) {
    const [keyword = "", ...args] = line.trim().split(/\s+/);
    const instruction = keyword.toUpperCase();

    if (instruction === "FROM") {
      const as = args.findIndex((a) => a.toUpperCase() === "AS");
      inStage = as !== -1 && args[as + 1] === stage;
      continue;
    }
    if (!inStage) continue;

    if (instruction === "RUN" && COMPILE_COMMAND.test(args.join(" "))) {
      compiles = true;
      break; // A later COPY arrives too late for the compile step to see it.
    }
    if (instruction === "WORKDIR") {
      workdir = posix.resolve(workdir, args[0]);
      root ??= workdir;
    } else if (instruction === "COPY") {
      if (args.some((a) => a.startsWith("--from="))) continue;
      const unknown = args.find((a) => a.startsWith("--") && !HARMLESS_COPY_OPTION.test(a));
      if (unknown) {
        throw new Error(
          `This ${stage} COPY line has an option that may change which files arrive (${unknown}): ${line.trim()}. ` +
            `Remove it, or teach stageCopies() the form explicitly.`,
        );
      }
      const paths = args.filter((a) => !a.startsWith("--"));
      if (paths.length < 2 || paths.some((p) => /[*?[\]$"'<]/.test(p))) {
        throw new Error(
          `Can't read this ${stage} COPY line (wildcard, variable, quoted/JSON form or heredoc): ${line.trim()}. ` +
            `Write it as plain paths, or teach stageCopies() the form.`,
        );
      }
      const dest = paths.pop() as string;
      for (const source of paths) {
        copies.push({
          source: posix.normalize(source).replace(/\/$/, ""),
          dest,
          destInRoot: posix.relative(root ?? workdir, posix.resolve(workdir, dest)) || ".",
        });
      }
    }
  }

  if (!compiles) {
    throw new Error(
      `No RUN that runs "npm run compile" in a Dockerfile stage named "${stage}", ` +
        `so no COPY can be shown to arrive before the compile step. Was the stage or the command renamed?`,
    );
  }
  if (copies.length === 0) {
    throw new Error(`No build-context COPY lines found in a Dockerfile stage named "${stage}".`);
  }
  return copies;
}

/** True when `target` (repo-relative) lands at that same path inside the image. */
function isInImage(target: string, copies: Copy[], isDirectory: (path: string) => boolean): boolean {
  if (target === ".." || target.startsWith("../")) return false;
  return copies.some(({ source, dest, destInRoot }) => {
    if (isDirectory(source)) {
      // A directory COPY places the directory's CONTENTS in the destination.
      if (destInRoot !== source) return false;
      return source === "." || target === source || target.startsWith(`${source}/`);
    }
    const intoDirectory = dest.endsWith("/") || dest === ".";
    const landsAt = intoDirectory ? posix.join(destInRoot, posix.basename(source)) : destInRoot;
    if (landsAt !== source) return false;
    const asTypeScript = target.replace(/\.js(x?)$/, ".ts$1");
    return EXTENSIONS.some((ext) => target + ext === source) || asTypeScript === source;
  });
}

function relativeImports(file: string, text: string): { specifier: string; line: number }[] {
  const found: { specifier: string; line: number }[] = [];
  const add = (specifier: string, position: number) => {
    if (!/^\.\.?(\/|$)/.test(specifier)) return;
    found.push({ specifier, line: text.slice(0, position).split("\n").length });
  };

  if (CSS_FILE.test(file)) {
    // Comments are blanked, not removed, so line numbers stay true.
    const css = text.replace(/\/\*[\s\S]*?\*\//g, (c) => c.replace(/[^\n]/g, " "));
    for (const m of css.matchAll(/@import\s+(?:url\(\s*)?["']?([^"')\s;]+)/g)) add(m[1], m.index);
    return found;
  }

  const source = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true);
  const visit = (node: ts.Node) => {
    let literal: ts.Node | undefined;
    if (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) {
      literal = node.moduleSpecifier;
    } else if (ts.isExternalModuleReference(node)) {
      literal = node.expression;
    } else if (ts.isImportTypeNode(node) && ts.isLiteralTypeNode(node.argument)) {
      literal = node.argument.literal;
    } else if (
      ts.isCallExpression(node) &&
      (node.expression.kind === ts.SyntaxKind.ImportKeyword ||
        (ts.isIdentifier(node.expression) && node.expression.text === "require"))
    ) {
      literal = node.arguments[0];
    }
    if (literal && ts.isStringLiteralLike(literal)) {
      add(literal.text.replace(/[?#].*$/, ""), literal.getStart(source));
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return found;
}

function filesUnder(dir: string): string[] {
  return readdirSync(join(REPO, dir), { withFileTypes: true }).flatMap((entry) => {
    const path = posix.join(dir, entry.name);
    if (entry.isDirectory()) return filesUnder(path);
    return SCRIPT_FILE.test(path) || CSS_FILE.test(path) ? [path] : [];
  });
}

const isRepoDirectory = (path: string) => statSync(join(REPO, path)).isDirectory();

/** The check itself: every relative import under src/ the stage would not have. */
function uncoveredImports(dockerfile: string): { examined: number; missing: string[] } {
  const copies = stageCopies(dockerfile, STAGE);
  let examined = 0;
  const missing: string[] = [];

  for (const file of filesUnder("src")) {
    for (const { specifier, line } of relativeImports(file, readFileSync(join(REPO, file), "utf8"))) {
      examined += 1;
      const target = posix.join(posix.dirname(file), specifier).replace(/\/$/, "");
      if (!isTestOfBuildOutput(file, target) && !isInImage(target, copies, isRepoDirectory)) {
        missing.push(`${file}:${line} imports "${specifier}" -> ${target}`);
      }
    }
  }
  return { examined, missing };
}

const realDockerfile = () => readFileSync(join(REPO, "Dockerfile"), "utf8");

describe(`Dockerfile ${STAGE} stage covers every relative import under src/`, () => {
  it("has no import that resolves outside what the stage copies", () => {
    const { examined, missing } = uncoveredImports(realDockerfile());

    // A scan that found nothing would pass for the wrong reason.
    expect(examined).toBeGreaterThan(100);
    expect(
      missing,
      `These files are not in the Docker image, so the Railway build will fail. ` +
        `Add a COPY line to the Dockerfile's ${STAGE} stage, above RUN npm run compile:\n${missing.join("\n")}\n`,
    ).toEqual([]);
  });
});

/**
 * The real Dockerfile with one edit, in two shapes where the compile step can't
 * see tokens/ although a `COPY tokens/ tokens/` is still in the stage.
 */
describe("the real Dockerfile, broken by one edit", () => {
  const TOKENS_COPY = "COPY tokens/ tokens/\n";
  const COMPILE_RUN = "RUN npm run compile\n";

  /** Replaces exactly one occurrence, so an edit that stops applying can't pass quietly. */
  const edit = (text: string, find: string, replacement: string) => {
    expect(text.split(find), `the Dockerfile should contain ${JSON.stringify(find)} once`).toHaveLength(2);
    return text.replace(find, () => replacement);
  };

  it("OA-180: refuses a COPY option that changes which files arrive", () => {
    const broken = edit(realDockerfile(), TOKENS_COPY, "COPY --exclude=app-overrides.json tokens/ tokens/\n");
    expect(() => uncoveredImports(broken)).toThrow(/COPY --exclude=app-overrides\.json tokens\/ tokens\//);
  });

  it("OA-181: gives no credit for a COPY after the compile step", () => {
    const without = edit(realDockerfile(), TOKENS_COPY, "");
    const broken = edit(without, COMPILE_RUN, COMPILE_RUN + TOKENS_COPY);
    expect(uncoveredImports(broken).missing).toContain(
      'src/email/render-email.ts:43 imports "../../tokens/app-overrides.json" -> tokens/app-overrides.json',
    );
  });
});

describe("the checker itself", () => {
  const dirs = new Set(["src", "tokens"]);
  const isDir = (p: string) => dirs.has(p);
  const covered = (dockerfile: string, target: string) =>
    isInImage(target, stageCopies(dockerfile, STAGE), isDir);
  const stageWithoutCompile = (...lines: string[]) =>
    [`FROM node AS ${STAGE}`, "WORKDIR /app", ...lines].join("\n");
  const stage = (...lines: string[]) => stageWithoutCompile(...lines, "RUN npm run compile");

  it("reads every import form, including after JSX text with an apostrophe", () => {
    const code = [
      `import a from "../a";`,
      `import "../b.css";`,
      `export * from "../c";`,
      `import d = require("../d");`,
      `type E = import("../e").E;`,
      `const P = () => <p>Don't stop</p>;`,
      `const f = () => import("../f");`,
      `const g = require(\`../g?raw\`);`,
      `// import x from "../commented-out";`,
      `import pkg from "some-package";`,
    ].join("\n");
    expect(relativeImports("src/x/y.tsx", code).map((i) => i.specifier)).toEqual([
      "../a", "../b.css", "../c", "../d", "../e", "../f", "../g",
    ]);
  });

  it("reads relative CSS @imports and skips packages, URLs and comments", () => {
    const css = [
      `@import "tailwindcss";`,
      `/* @import "../../commented.css"; */`,
      `@import url('https://example.com/f.css');`,
      `@import url("../a.css");`,
      `@import './b.css';`,
    ].join("\n");
    expect(relativeImports("src/styles/i.css", css)).toEqual([
      { specifier: "../a.css", line: 4 },
      { specifier: "./b.css", line: 5 },
    ]);
  });

  it("counts only what this stage copies from the build context", () => {
    const dockerfile = [
      "FROM node AS other",
      "COPY tokens/ tokens/",
      stage("COPY src/ src/", "COPY --from=other /app/tokens tokens/"),
    ].join("\n");
    expect(covered(dockerfile, "src/lib/utils")).toBe(true);
    expect(covered(dockerfile, "tokens/app-overrides.json")).toBe(false);
    expect(covered(dockerfile, "src-other/x")).toBe(false);
    expect(covered(dockerfile, "../outside-repo")).toBe(false);
  });

  it("requires the copy to keep the same path inside the image", () => {
    expect(covered(stage("COPY tokens/ ./"), "tokens/app-overrides.json")).toBe(false);
    expect(covered(stage("COPY tokens elsewhere/"), "tokens/app-overrides.json")).toBe(false);
    expect(covered(stage("COPY tokens/ /app/tokens/"), "tokens/app-overrides.json")).toBe(true);
    expect(covered(stage("COPY --chown=node tokens/ \\", "  tokens/"), "tokens/a.json")).toBe(true);
    expect(covered(stage("COPY tsconfig.json tsup.config.ts ./"), "tsup.config")).toBe(true);
    expect(covered(stage("COPY tsup.config.ts ./"), "tsup.config.js")).toBe(true);
    expect(covered(stage("COPY conf/tsconfig.json ./"), "conf/tsconfig.json")).toBe(false);
  });

  it("exempts only a test file importing the build output", () => {
    expect(isTestOfBuildOutput("src/email/a.test.ts", "dist/email.js")).toBe(true);
    expect(isTestOfBuildOutput("src/email/a.ts", "dist/email.js")).toBe(false);
    expect(isTestOfBuildOutput("src/email/a.test.ts", "tokens/app-overrides.json")).toBe(false);
  });

  it("allows only the COPY options that leave the files alone", () => {
    const options = "--chown=node:node --chmod=644 --link";
    expect(covered(stage(`COPY ${options} tokens/ tokens/`), "tokens/a.json")).toBe(true);
    for (const option of ["--exclude=*.json", "--parents", "--not-yet-invented=1"]) {
      const line = `COPY ${option} tokens/ tokens/`;
      expect(() => stageCopies(stage(line), STAGE), option).toThrow(`(${option}): ${line}.`);
    }
  });

  it("counts only the COPY lines above the first compile", () => {
    const late = stage("COPY src/ src/", "RUN npm ci && npm run compile", "COPY tokens/ tokens/", "RUN npm run compile");
    expect(covered(late, "src/a")).toBe(true);
    expect(covered(late, "tokens/a.json")).toBe(false);
    for (const run of ["RUN npm ci", "RUN npm run compile:css", `RUN ["npm", "run", "compile"]`]) {
      expect(() => stageCopies(stageWithoutCompile("COPY src/ src/", run), STAGE), run).toThrow(/No RUN that runs/);
    }
    const elsewhere = [stageWithoutCompile("COPY src/ src/"), "FROM node AS other", "RUN npm run compile"];
    expect(() => stageCopies(elsewhere.join("\n"), STAGE)).toThrow(/No RUN that runs/);
  });

  it("fails loudly instead of guessing", () => {
    expect(() => stageCopies(stage("COPY package*.json ./"), STAGE)).toThrow(/Can't read/);
    expect(() => stageCopies(stage(`COPY ["src/", "src/"]`), STAGE)).toThrow(/Can't read/);
    expect(() => stageCopies("FROM node AS renamed\nCOPY src/ src/\nRUN npm run compile", STAGE)).toThrow(
      /No RUN that runs/,
    );
    expect(() => stageCopies(stage(), STAGE)).toThrow(/No build-context COPY/);
  });
});
