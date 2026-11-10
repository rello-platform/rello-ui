import { describe, expect, it } from "vitest";
import type { PlatformSlug } from "@rello-platform/slugs";
import consumerFixture from "./fixtures/v2.33.0-no-brand-consumer.json";
import proFixture from "./fixtures/v2.33.0-no-brand-pro.json";
import adminFixture from "./fixtures/v2.33.0-no-brand-admin.json";
import { renderRelloEmail, type RelloEmailAudience, type RelloEmailBrand, type RelloEmailInput } from "./index";
import { asBeforeV240, baselineInput, hasNewTokens, sha256 } from "../test/email-logo-baseline";

/**
 * v2.37.0 (TE-1207, AUDIT 27): under a brand the HTML header names the business (its logo's alt text,
 * or the name as header text) but the plain-text part never did: it opened with the kicker. Now the
 * text part's first line is that same name, then the kicker as before. With no brand every byte of
 * the text and the html is as it was; under a brand only the text changes.
 */

const LOGO = "https://cdn.example-realty.com/brand/logo.png";
const BRAND: RelloEmailBrand = { name: "Summit Realty Group", logoUrl: LOGO, primary: "#7c3aed" };

/** Each app that passes a brand to renderRelloEmail on its main, with the audience it passes. */
const BRAND_CALLERS: ReadonlyArray<{ app: PlatformSlug; audience: RelloEmailAudience; kicker?: string }> = [
  { app: "open-house-hub", audience: "pro" },
  { app: "open-house-hub", audience: "consumer", kicker: "Sign in" },
  { app: "home-scout", audience: "consumer", kicker: "Rello · from Summit Realty Group" },
  { app: "pathfinder-pro", audience: "pro" },
  { app: "pathfinder-pro", audience: "consumer" },
  { app: "prequal-pro", audience: "pro", kicker: "PreQual Pro · Summit Realty Group" },
  { app: "prequal-pro", audience: "consumer" },
  { app: "newsletter-studio", audience: "consumer", kicker: "Rello · from Summit Realty Group" },
];

function make(c: (typeof BRAND_CALLERS)[number], brand: RelloEmailBrand | null | undefined): RelloEmailInput {
  return { ...baselineInput(c.app, c.audience), ...(c.kicker ? { kicker: c.kicker } : {}), brand };
}

/** The name the HTML header prints: the logo's alt text, else the name as header text, unescaped. */
function headerName(html: string): string | null {
  const unescape = (s: string) => s.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, "&").replace(/<wbr>/g, "");
  const img = html.match(/<img [^>]*alt="([^"]*)"[^>]*max-height:64px/);
  if (img) return unescape(img[1]);
  const div = html.match(/<div style="font-size:22px;font-weight:700;color:#ffffff;margin:0 0 10px;">([^<]*(?:<wbr>[^<]*)*)<\/div>/);
  return div ? unescape(div[1]) : null;
}
const kickerOf = (html: string) => html.match(/<div style="font-size:12px;letter-spacing:\.1em;text-transform:uppercase;color:#ffffff;">(.*?)<\/div>/)![1].replace(/&amp;/g, "&");

describe("TE-1207: under a brand the text part opens with the brand's name, then the kicker", () => {
  for (const c of BRAND_CALLERS) {
    for (const [label, brand] of [["logo + name + color", BRAND], ["name only", { name: "Summit Realty Group" }]] as const) {
      it(`${c.app} ${c.audience}, ${label}: line 1 is the header's name, line 2 the kicker`, () => {
        const r = renderRelloEmail(make(c, brand));
        const lines = r.text.split("\n");
        expect(headerName(r.html)).toBe("Summit Realty Group");
        expect(lines[0]).toBe(headerName(r.html));
        expect(lines[1]).toBe(kickerOf(r.html));
      });
    }
  }

  it("the rest of the text is exactly what it was: the name and a line break are all that is added", () => {
    for (const c of BRAND_CALLERS) {
      const plain = renderRelloEmail(make(c, null)).text;
      // plain is the no-brand text of the same input; a brand also swaps the default kicker, so compare
      // against the same input with the same kicker pinned.
      const kicker = c.kicker ?? "Rello · from ClearPath Utah Mortgage";
      const pinned = { ...make(c, null), kicker };
      const without = renderRelloEmail(pinned).text;
      const withBrand = renderRelloEmail({ ...pinned, brand: BRAND }).text;
      expect(withBrand, `${c.app} ${c.audience}`).toBe(`Summit Realty Group\n${without}`);
      expect(plain.length).toBeGreaterThan(0);
    }
  });

  it("the name is the same line the header prints: whitespace and line breaks collapsed, an & kept as typed", () => {
    const r = renderRelloEmail({ ...baselineInput("home-scout", "consumer"), brand: { name: "  Summit \n  Realty & Co <Utah>  " } });
    expect(headerName(r.html)).toBe("Summit Realty & Co <Utah>");
    expect(r.text.split("\n")[0]).toBe("Summit Realty & Co <Utah>");
  });

  it("a brand with no name names nobody, in the header and in the text: the text opens with the kicker as before", () => {
    for (const brand of [{ name: "" }, { name: "   " }, { name: "\n" }, { name: undefined as unknown as string }, { name: 7 as unknown as string }]) {
      const r = renderRelloEmail({ ...baselineInput("home-scout", "consumer"), brand });
      expect(headerName(r.html)).toBeNull();
      expect(r.text.split("\n")[0]).toBe(kickerOf(r.html));
      expect(r.text.startsWith("\n")).toBe(false);
    }
  });

  it("a very long name: the header may break it with <wbr>, the text carries it whole, once", () => {
    const name = "Summit".repeat(40);
    const r = renderRelloEmail({ ...baselineInput("home-scout", "consumer"), brand: { name } });
    expect(r.text.split("\n")[0]).toBe(name);
    expect(r.text.split(name)).toHaveLength(2);
  });

  it("admin mail ignores a brand, text included", () => {
    const base = renderRelloEmail(baselineInput("rello", "admin"));
    const withBrand = renderRelloEmail({ ...baselineInput("rello", "admin"), brand: BRAND });
    expect(withBrand.text).toBe(base.text);
    expect(withBrand.html).toBe(base.html);
  });

  it("a brand that is not an object is no brand", () => {
    const base = renderRelloEmail(baselineInput("home-scout", "consumer"));
    for (const brand of ["Summit", 5, true, [], undefined, null] as unknown[]) {
      const r = renderRelloEmail({ ...baselineInput("home-scout", "consumer"), brand: brand as never });
      if (Array.isArray(brand)) continue; // an array is an object to the renderer, as at v2.36.0; it names nobody
      expect(r.text, JSON.stringify(brand)).toBe(base.text);
    }
  });
});

describe("TE-1207: with no brand, the text part is byte-equal to v2.36.0 for every fixture input", () => {
  const fixtures = { consumer: consumerFixture, pro: proFixture, admin: adminFixture } as const;
  for (const audience of ["consumer", "pro", "admin"] as const) {
    it(`${audience}: every slug's text (and html where the fixture holds it) hashes as the stored copy, brand absent, undefined or null`, () => {
      const renders = fixtures[audience].renders as Record<string, { html: string; text: string }>;
      for (const slug of Object.keys(renders) as PlatformSlug[]) {
        for (const brand of [undefined, null]) {
          // v2.40.0: consumer mail with its pre-v2.40.0 kicker and no "Powered by Rello" line (asBeforeV240).
          const r = renderRelloEmail(asBeforeV240({ ...baselineInput(slug, audience), ...(brand === undefined ? {} : { brand }) }));
          expect(sha256(r.text), `${slug} ${audience} text`).toBe(renders[slug].text);
          if (!hasNewTokens(slug, audience)) expect(sha256(r.html), `${slug} ${audience} html`).toBe(renders[slug].html);
        }
      }
    });
  }
});
