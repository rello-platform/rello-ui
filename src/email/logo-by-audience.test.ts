import { describe, expect, it } from "vitest";
import { APP_SLUGS, ENGINE_SLUGS, type PlatformSlug } from "@rello-platform/slugs";
import baseline from "./fixtures/v2.32.0-logo-baseline.json";
import { RELLO_EMAIL_APP_NAMES, relloEmailLogoUrl, renderRelloEmail } from "./index";
import { BASELINE_AUDIENCES, baselineInput, cutLogo, sha256 } from "../test/email-logo-baseline";

/**
 * v2.33.0 (KA ruling 2026-10-29): every app's email carries that app's logo,
 * whoever receives it. Only `admin` mail keeps Rello's. Before, `pro` mail drew
 * Rello's logo.
 */

const SLUGS: readonly PlatformSlug[] = [...APP_SLUGS, ...ENGINE_SLUGS];

function headerLogo(html: string): { src: string | null; alt: string } {
  const img = html.match(/<img src="([^"]+)" width="96" height="96" alt="([^"]*)"/);
  if (img) return { src: img[1], alt: img[2] };
  const text = html.match(/<div style="font-size:22px;font-weight:700;color:#ffffff;margin:0 0 10px;">([^<]*)<\/div>/);
  if (!text) throw new Error("no header logo");
  return { src: null, alt: text[1] };
}

describe("renderRelloEmail: which logo each audience draws", () => {
  for (const audience of ["consumer", "pro"] as const) {
    it(`${audience} mail draws the sending app's logo, or its name when it has no hosted logo`, () => {
      for (const slug of SLUGS) {
        const logo = headerLogo(renderRelloEmail(baselineInput(slug, audience)).html);
        expect(logo, `${slug} ${audience}`).toEqual({ src: relloEmailLogoUrl(slug), alt: RELLO_EMAIL_APP_NAMES[slug] });
      }
    });
  }

  it("the check covers both forms: some slugs have a hosted logo and some do not", () => {
    expect(SLUGS.filter((s) => relloEmailLogoUrl(s) !== null).length).toBeGreaterThan(1);
    expect(SLUGS.filter((s) => relloEmailLogoUrl(s) === null).length).toBeGreaterThan(1);
  });

  it("admin mail always draws the Rello logo", () => {
    for (const slug of SLUGS) {
      const logo = headerLogo(renderRelloEmail(baselineInput(slug, "admin")).html);
      expect(logo, slug).toEqual({ src: "https://hellorello.app/email/logos/rello.png", alt: "Rello" });
    }
  });
});

describe("renderRelloEmail: nothing but the logo changed since v2.32.0", () => {
  const renders = baseline.renders as Record<string, Record<string, { html: string; text: string }>>;

  it("the baseline covers every slug and audience", () => {
    expect(Object.keys(renders).sort()).toEqual([...SLUGS].sort());
    for (const slug of SLUGS) expect(Object.keys(renders[slug]).sort(), slug).toEqual([...BASELINE_AUDIENCES].sort());
  });

  it("each render, its header logo cut out, hashes as it did at v2.32.0; the text part is identical", () => {
    for (const slug of SLUGS) {
      for (const audience of BASELINE_AUDIENCES) {
        const r = renderRelloEmail(baselineInput(slug, audience));
        expect(sha256(cutLogo(r.html)), `${slug} ${audience} html`).toBe(renders[slug][audience].html);
        expect(sha256(r.text), `${slug} ${audience} text`).toBe(renders[slug][audience].text);
      }
    }
  });

  it("the comparison can fail: a one-character change to the body changes the hash", () => {
    const r = renderRelloEmail({ ...baselineInput("market-intel", "pro"), headline: "Your plan is ready, Sarah!" });
    expect(sha256(cutLogo(r.html))).not.toBe(renders["market-intel"].pro.html);
  });
});
