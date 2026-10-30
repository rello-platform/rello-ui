import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import consumerFixture from "./fixtures/v2.33.0-no-brand-consumer.json";
import { renderRelloEmail, resolveRelloEmailPalette } from "./render-email";
import { baselineInput, sha256 } from "../test/email-logo-baseline";

/** PreQual Pro's own brand: ~/PreQual-Pro/CLAUDE.md § Colors, and the blue of its logo. */
const PQP_PRIMARY = "#4060de";
const LOGO = "https://hellorello.app/email/logos/prequal-pro.png";

describe("prequal-pro tokens (v2.35.0)", () => {
  it("consumer and pro mail draw PreQual Pro's primary and its hosted logo", () => {
    for (const audience of ["consumer", "pro"] as const) {
      expect(resolveRelloEmailPalette(audience, "prequal-pro").primary, audience).toBe(PQP_PRIMARY);
      const { html } = renderRelloEmail(baselineInput("prequal-pro", audience));
      expect(html, audience).toContain(`bgcolor="${PQP_PRIMARY}"`);
      expect(html, audience).toContain(`src="${LOGO}"`);
    }
  });

  it("admin mail stays Rello's, like every other app", () => {
    expect(resolveRelloEmailPalette("admin", "prequal-pro")).toEqual(resolveRelloEmailPalette("admin", "rello"));
    expect(renderRelloEmail(baselineInput("prequal-pro", "admin")).html).not.toContain(LOGO);
  });

  it("the byte-identical fixtures can fail: prequal-pro itself no longer matches them", () => {
    const pinned = (consumerFixture.renders as Record<string, { html: string; text: string }>)["prequal-pro"];
    expect(sha256(renderRelloEmail(baselineInput("prequal-pro", "consumer")).html)).not.toBe(pinned.html);
  });
});

describe("./email for CommonJS consumers (PreQual Pro is CommonJS Express)", () => {
  // jsdom gives import.meta.url a non-file scheme, so paths start at the repo root.
  const root = process.cwd();

  it("package.json exports a require condition for ./email", () => {
    const pkg = JSON.parse(readFileSync(resolve(root, "package.json"), "utf8"));
    expect(pkg.exports["./email"].require).toBe("./dist/email.cjs");
  });

  it("dist/email.cjs renders exactly what the source renders", () => {
    const cjs = createRequire(resolve(root, "package.json"))("./dist/email.cjs") as { renderRelloEmail: typeof renderRelloEmail };
    for (const audience of ["consumer", "pro", "admin"] as const) {
      for (const app of ["prequal-pro", "home-ready"] as const) {
        expect(cjs.renderRelloEmail(baselineInput(app, audience)), `${audience} ${app}`).toEqual(renderRelloEmail(baselineInput(app, audience)));
      }
    }
  });
});
