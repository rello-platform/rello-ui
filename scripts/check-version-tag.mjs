#!/usr/bin/env node
/**
 * Refuse a release tag whose name disagrees with package.json version.
 *
 * WHY THIS EXISTS, and why it is not only in the publish workflow.
 *
 * MEASURED ACROSS THE ORG 2026-08-20 — every published tag's declared version
 * compared against its tag name: 9 of 329 tags disagree, across 2 of 36
 * packages. rello-ui is one of them:
 *
 *   v1.4.0, v1.4.1  declare 1.3.0
 *   v1.4.2 - v1.4.4 declare 1.4.0
 *
 * All five were tagged 2026-03-06 — seven weeks BEFORE this repo's publish
 * workflow gained a tag-equality step (3477322, 2026-04-23). So the workflow
 * guard did not fail here; it did not yet exist. Every tag from v1.5.2 onward
 * agrees, and HEAD agrees with the newest tag.
 *
 * SO WHY ADD ANYTHING? Because the workflow guard sits on a path nobody uses.
 * Measured the same day: of 403 `@rello-platform/*` dependency declarations
 * across 62 package.json files on this machine, 401 are `github:` git-refs and
 * 2 are local workspace links. ZERO install from GitHub Packages. A git-ref pin
 * resolves the TAG'S TREE and never contacts the registry, so refusing to
 * PUBLISH a mismatched tag changes nothing for any actual consumer.
 *
 * @rello-platform/signals proved the consequence rather than predicting it. Its
 * publish guard had existed since v0.2.0 and correctly refused v0.28.0, v0.28.1,
 * v0.29.0 and v0.30.0 — four `failure` runs on 2026-08-07, unread for twelve
 * days. The tags shipped anyway, and on 2026-08-20 four consumer pins across
 * three live repos (Rello, Open-House-Hub, The-Home-Scout) still resolved
 * signals#v0.30.0, with `node_modules/.../package.json` and Rello's lockfile
 * both recording "0.27.0" for the v0.30.0 tree.
 *
 * Once a tag exists it is installable, whatever a later job decides. The only
 * moment that helps a git-ref consumer is BEFORE THE TAG EXISTS.
 *
 * Hence two enforcement points, deliberately:
 *   1. .husky/pre-push  — refuses to push a mismatched vX.Y.Z tag (this file).
 *      Stops the tag existing, which is what protects git-ref consumers.
 *   2. .github/workflows/publish.yml — refuses to PUBLISH a mismatched tag.
 *      Backstop for a tag created through the web UI or pushed with
 *      --no-verify, and the only detector once the tag is already out.
 *
 * Both call THIS file, so the two can never drift apart.
 *
 * Usage:
 *   node scripts/check-version-tag.mjs <tag>     # explicit
 *   node scripts/check-version-tag.mjs           # reads GITHUB_REF_NAME
 * Exit 0 = agree · 1 = disagree · 2 = could not determine (never a pass).
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));

export function compare(tag, declaredVersion) {
  if (!tag) return { ok: false, code: 2, reason: "no tag supplied" };
  if (!/^v\d+\.\d+\.\d+/.test(tag)) {
    // Not a release tag — nothing to compare, and refusing would block
    // unrelated tags. Explicitly a pass, not a silent skip.
    return { ok: true, code: 0, reason: `"${tag}" is not a vX.Y.Z release tag — not checked` };
  }
  if (!declaredVersion) return { ok: false, code: 2, reason: "package.json has no version field" };
  const expected = tag.replace(/^v/, "");
  if (expected !== declaredVersion) {
    return {
      ok: false,
      code: 1,
      reason: `tag ${tag} declares ${expected}, package.json declares ${declaredVersion}`,
    };
  }
  return { ok: true, code: 0, reason: `${tag} = v${declaredVersion}` };
}

function main() {
  const tag = process.argv[2] || process.env.GITHUB_REF_NAME || "";
  let declared;
  try {
    declared = JSON.parse(readFileSync(join(HERE, "..", "package.json"), "utf8")).version;
  } catch (err) {
    console.error(`[check-version-tag] UNVERIFIED — cannot read package.json: ${err.message}`);
    process.exit(2);
  }

  const r = compare(tag, declared);
  if (r.code === 0) {
    console.log(`[check-version-tag] OK — ${r.reason}`);
    process.exit(0);
  }
  if (r.code === 2) {
    console.error(`[check-version-tag] UNVERIFIED — ${r.reason}. Not a pass.`);
    process.exit(2);
  }
  console.error(
    `[check-version-tag] REFUSED — ${r.reason}.\n\n` +
      `  A tag whose tree misdeclares its version is not a cosmetic problem here:\n` +
      `  every consumer pins github:rello-platform/rello-ui#<tag>, so npm records the\n` +
      `  DECLARED version in their lockfile. v0.28.0-v0.30.0 all declare 0.27.0, which\n` +
      `  is why five repos' lockfiles read 0.27.0 while running newer code, and why any\n` +
      `  pin-vs-installed parity gate reports drift no lockfile edit can satisfy.\n\n` +
      `  Fix: set package.json version to ${tag.replace(/^v/, "")}, commit, re-tag.\n`,
  );
  process.exit(1);
}

if (process.argv[1] && process.argv[1].endsWith("check-version-tag.mjs")) main();
