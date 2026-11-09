// @vitest-environment node
/**
 * GENERATOR, not a regular test. Skipped unless GEN_NUDGE_V2371=1.
 *
 *   GEN_NUDGE_V2371=1 npx vitest run src/components/rello-upsell-nudge/__fixtures__/generate-v2.37.1-snapshot.test.tsx
 *
 * Renders every case in legacy-corpus.json with the v2.37.1 BUILD of
 * <RelloUpsellNudge>: the dist/client.js committed at 2d5e639 (the v2.37.1
 * release commit), read with `git show`, not a hand-written copy. It writes
 * the HTML to nudge-v2.37.1.json, which RelloUpsellNudge.legacy.test.tsx
 * compares the current component against.
 */
import { describe, it } from "vitest";
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import * as React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Sparks } from "iconoir-react";

const V2371 = "2d5e63951f0493fef2b654fddc2e68a0354ab5ee";
const here = dirname(fileURLToPath(import.meta.url));
const repo = resolve(here, "../../../..");

describe.skipIf(process.env.GEN_NUDGE_V2371 !== "1")("generate nudge v2.37.1 snapshot", () => {
  it("renders the corpus with the 2d5e639 build", async () => {
    const tag = execFileSync("git", ["show", `${V2371}:package.json`], { cwd: repo, encoding: "utf8" });
    if (!tag.includes('"version": "2.37.1"')) throw new Error("2d5e639 is not v2.37.1");
    const bundle = execFileSync("git", ["show", `${V2371}:dist/client.js`], { cwd: repo, encoding: "utf8" });
    // Outside node_modules so Vite transforms it and resolves its bare
    // imports (next/link, radix, iconoir) from this repo's node_modules.
    const cacheDir = join(repo, ".v2.37.1-build");
    mkdirSync(cacheDir, { recursive: true });
    const bundlePath = join(cacheDir, "client.js");
    writeFileSync(bundlePath, bundle.replace(/^\/\/# sourceMappingURL=.*$/m, ""));
    let old: { RelloUpsellNudge: React.ComponentType<Record<string, unknown>> };
    try {
      old = await import(/* @vite-ignore */ bundlePath);
    } finally {
      rmSync(cacheDir, { recursive: true, force: true });
    }

    const corpus = JSON.parse(readFileSync(join(here, "legacy-corpus.json"), "utf8")) as {
      cases: { name: string; props: Record<string, unknown> }[];
    };
    const cases = corpus.cases.map(({ name, props }) => {
      const { icon, ...rest } = props;
      const element = React.createElement(old.RelloUpsellNudge, {
        ...rest,
        icon: icon === "sparks" ? React.createElement(Sparks, { width: 20, height: 20 }) : undefined,
        onClick: () => {},
        onDismiss: () => {},
      });
      return { name, html: renderToStaticMarkup(element) };
    });
    writeFileSync(
      join(here, "nudge-v2.37.1.json"),
      JSON.stringify({ generatedFrom: `${V2371}:dist/client.js (v2.37.1)`, cases }, null, 2) + "\n",
    );
  });
});
