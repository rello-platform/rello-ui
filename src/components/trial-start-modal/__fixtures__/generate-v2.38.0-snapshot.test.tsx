/**
 * GENERATOR, not a regular test. Skipped unless GEN_TSM_V2380=1.
 *
 *   GEN_TSM_V2380=1 npx vitest run src/components/trial-start-modal/__fixtures__/generate-v2.38.0-snapshot.test.tsx
 *
 * Drives every case in MODAL_CORPUS (drive-modal.tsx) with the v2.38.0 BUILD
 * of <TrialStartModal>: the dist/client.js committed at 19f04a9 (the v2.38.0
 * release commit), read with `git show`, not a hand-written copy. It writes
 * the dialog HTML to modal-v2.38.0.json, which TrialStartModal.legacy.test.tsx
 * compares the current component against: v2.39.0 adds an "unknown" outcome
 * and must render started, already-used and error exactly as v2.38.0 did.
 */
import { describe, it, vi } from "vitest";
import { execFileSync } from "node:child_process";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type * as React from "react";
import { MODAL_CORPUS, driveModal } from "./drive-modal";

const V2380 = "19f04a9de2a51b4d7d08a6cfb0e2cea5fa3c78e9";
const here = dirname(fileURLToPath(import.meta.url));
const repo = resolve(here, "../../../..");

describe.skipIf(process.env.GEN_TSM_V2380 !== "1")("generate TrialStartModal v2.38.0 snapshot", () => {
  it("drives the corpus with the 19f04a9 build", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    const pkg = execFileSync("git", ["show", `${V2380}:package.json`], { cwd: repo, encoding: "utf8" });
    if (!pkg.includes('"version": "2.38.0"')) throw new Error("19f04a9 is not v2.38.0");
    const bundle = execFileSync("git", ["show", `${V2380}:dist/client.js`], { cwd: repo, encoding: "utf8" });
    // Outside node_modules so Vite transforms it and resolves its bare imports.
    const cacheDir = join(repo, ".v2.38.0-build");
    mkdirSync(cacheDir, { recursive: true });
    const bundlePath = join(cacheDir, "client.js");
    writeFileSync(bundlePath, bundle.replace(/^\/\/# sourceMappingURL=.*$/m, ""));
    let old: { TrialStartModal: React.ComponentType<Record<string, unknown>> };
    try {
      old = await import(/* @vite-ignore */ bundlePath);
    } finally {
      rmSync(cacheDir, { recursive: true, force: true });
    }
    const cases: { name: string; html: string }[] = [];
    for (const c of MODAL_CORPUS) cases.push({ name: c.name, html: await driveModal(old.TrialStartModal, c) });
    writeFileSync(
      join(here, "modal-v2.38.0.json"),
      JSON.stringify({ generatedFrom: `${V2380}:dist/client.js (v2.38.0)`, cases }, null, 2) + "\n",
    );
  });
});
