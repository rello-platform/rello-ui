import { describe, expect, it } from "vitest";
import { APP_SLUGS, ENGINE_SLUGS, type PlatformSlug } from "@rello-platform/slugs";
import baseline from "./fixtures/v2.32.0-logo-baseline.json";
import consumerFixture from "./fixtures/v2.33.0-no-brand-consumer.json";
import proFixture from "./fixtures/v2.33.0-no-brand-pro.json";
import adminFixture from "./fixtures/v2.33.0-no-brand-admin.json";
import {
  RELLO_EMAIL_APP_NAMES,
  relloEmailContrast,
  relloEmailLogoUrl,
  renderRelloEmail,
  resolveRelloEmailPalette,
  type RelloEmailAudience,
  type RelloEmailBrand,
  type RelloEmailInput,
} from "./index";
import { BASELINE_AUDIENCES, baselineInput, cutLogo, sha256 } from "../test/email-logo-baseline";

/**
 * v2.34.0 (KA ruling 2026-10-29, prompt 097): consumer mail can carry the
 * sender's own brand, the agent's or tenant's, instead of the sending app's.
 * Kelly: "Home Scout CTA emails should NOT have home scout branding. They need
 * to have the branding of the tenant or agent."
 */

const SLUGS: readonly PlatformSlug[] = [...APP_SLUGS, ...ENGINE_SLUGS];

const LOGO = "https://cdn.example-realty.com/brand/logo.png";
const BRAND: RelloEmailBrand = { name: "Summit Realty Group", logoUrl: LOGO, primary: "#7c3aed" };

function branded(app: PlatformSlug, brand: RelloEmailBrand | null | undefined, audience: RelloEmailAudience = "consumer"): RelloEmailInput {
  return { ...baselineInput(app, audience), brand };
}

/** The header cell: from the first <td> to its close. */
function header(html: string): string {
  const m = html.match(/<tr><td align="center" bgcolor="[^"]+"[^>]*>(.*?)<\/td><\/tr>/);
  if (!m) throw new Error("no header");
  return m[1];
}

function headerImg(html: string): Record<string, string> | null {
  const tag = header(html).match(/<img [^>]*>/);
  if (!tag) return null;
  const attrs: Record<string, string> = {};
  for (const [, k, v] of tag[0].matchAll(/([a-z-]+)="([^"]*)"/g)) attrs[k] = v;
  return attrs;
}

function headerBand(html: string): string {
  const m = html.match(/<tr><td align="center" bgcolor="(#[0-9a-f]{6})"/);
  if (!m) throw new Error("no header band");
  return m[1];
}

function buttonColor(html: string): string {
  const m = html.match(/<td align="center" bgcolor="(#[0-9a-f]{6})" style="background:#[0-9a-f]{6};border-radius:8px;">/);
  if (!m) throw new Error("no button");
  return m[1];
}

function linkColor(html: string): string {
  const m = html.match(/<a href="https:\/\/example\.com\/talk" style="color:(#[0-9a-f]{6});/);
  if (!m) throw new Error("no secondary link");
  return m[1];
}

/** Visible words: tags, attribute values and URLs removed. */
function visible(s: string): string {
  return s
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/https?:\/\/\S+/g, " ");
}

describe("brand: the header logo", () => {
  it("draws the brand logo for a clean https png/jpg/jpeg/gif URL, with width, height and alt = brand name", () => {
    for (const url of [
      LOGO,
      "https://cdn.example.com/a/logo.JPG",
      "https://cdn.example.com/a/logo.jpeg?v=3",
      "https://cdn.example.com/a/logo.gif#x",
    ]) {
      const img = headerImg(renderRelloEmail(branded("home-scout", { ...BRAND, logoUrl: url })).html);
      expect(img, url).not.toBeNull();
      expect(img!.src, url).toBe(url);
      expect(img!.alt, url).toBe("Summit Realty Group");
      expect(Number(img!.width), url).toBeGreaterThan(0);
      expect(Number(img!.height), url).toBeGreaterThan(0);
    }
  });

  it("writes the brand name as the header text when the logo is missing, http, svg, webp, or not a URL", () => {
    for (const logoUrl of [
      null,
      undefined,
      "",
      "http://cdn.example.com/logo.png",
      "https://cdn.example.com/logo.svg",
      "https://cdn.example.com/logo.webp",
      "https://cdn.example.com/logo",
      "https://cdn.example.com/logo.png.exe",
      "https://user:pw@cdn.example.com/logo.png",
      "https://cdn.example.com/lo go.png",
      "javascript:alert(1)//.png",
      "data:image/png;base64,AAAA",
      "/relative/logo.png",
    ]) {
      const html = renderRelloEmail(branded("home-scout", { ...BRAND, logoUrl })).html;
      expect(headerImg(html), String(logoUrl)).toBeNull();
      expect(header(html), String(logoUrl)).toContain(
        `<div style="font-size:22px;font-weight:700;color:#ffffff;margin:0 0 10px;">Summit Realty Group</div>`,
      );
    }
  });

  it("escapes the brand name and the logo URL", () => {
    const html = renderRelloEmail(
      branded("home-scout", { name: `A & B "Homes" <x>`, logoUrl: "https://cdn.example.com/a&b/logo.png" }),
    ).html;
    const tag = header(html).match(/<img [^>]*>/)![0];
    expect(tag).toContain(`src="https://cdn.example.com/a&amp;b/logo.png"`);
    expect(tag).toContain(`alt="A &amp; B &quot;Homes&quot; &lt;x&gt;"`);
  });

  it("with no brand name and no usable logo, the header names nobody (no app name)", () => {
    const r = renderRelloEmail({ ...branded("home-scout", { name: "  " }), companyName: null, kicker: "Rello" });
    expect(headerImg(r.html)).toBeNull();
    expect(header(r.html)).not.toContain("font-size:22px");
    expect(r.html).not.toMatch(/home scout/i);
    expect(r.text).not.toMatch(/home scout/i);
  });
});

describe("brand: the app's name and logo appear nowhere", () => {
  for (const kicker of [undefined, "Rello · from Summit Realty Group"]) {
    it(`no consumer app's name or hosted logo in subject, preheader, html or text (kicker ${kicker ? "given" : "default"})`, () => {
      for (const slug of SLUGS) {
        // Rello is the platform's own name and the approved kicker word; skip that one app.
        if (slug === "rello") continue;
        for (const brand of [BRAND, { ...BRAND, logoUrl: null }, { name: "" }]) {
          const r = renderRelloEmail({ ...branded(slug, brand), kicker });
          const name = RELLO_EMAIL_APP_NAMES[slug].toLowerCase();
          for (const [part, value] of Object.entries({ subject: r.subject, preheader: r.preheader, html: r.html, text: r.text })) {
            expect(value.toLowerCase().includes(name), `${slug} ${part} ${JSON.stringify(brand)}`).toBe(false);
          }
          const logo = relloEmailLogoUrl(slug);
          if (logo) expect(r.html.includes(logo), `${slug} logo`).toBe(false);
          expect(r.html, slug).not.toContain("hellorello.app/email/logos");
        }
      }
    });
  }

  it("the check can fail: the same input without brand carries the app name", () => {
    const r = renderRelloEmail(baselineInput("home-scout", "consumer"));
    expect(r.html.toLowerCase()).toContain("home scout");
    expect(r.text.toLowerCase()).toContain("home scout");
  });
});

describe("brand: the header band and button color", () => {
  it("uses brand.primary for the band and the button, white text ≥ 3:1, links ≥ 4.5:1", () => {
    for (const primary of ["#7c3aed", "#7C3AED", " #7c3aed ", "#fc0", "#FFCC00", "#0f766e", "#e0f2fe", "#000000", "#ffffff"]) {
      const html = renderRelloEmail(branded("home-scout", { ...BRAND, primary })).html;
      const band = headerBand(html);
      expect(buttonColor(html), primary).toBe(band);
      expect(relloEmailContrast(band, "#ffffff"), primary).toBeGreaterThanOrEqual(3);
      expect(relloEmailContrast(linkColor(html), "#ffffff"), primary).toBeGreaterThanOrEqual(4.5);
      expect(band, primary).not.toBe(resolveRelloEmailPalette("consumer", "home-scout").primary);
    }
  });

  it("a brand color that already passes is used as given; #rgb is expanded", () => {
    expect(headerBand(renderRelloEmail(branded("home-scout", { ...BRAND, primary: "#7c3aed" })).html)).toBe("#7c3aed");
    expect(headerBand(renderRelloEmail(branded("home-scout", { ...BRAND, primary: "#03c" })).html)).toBe("#0033cc");
  });

  it("a light brand color is darkened until white text on it reaches 3:1, not replaced", () => {
    const band = headerBand(renderRelloEmail(branded("home-scout", { ...BRAND, primary: "#fc0" })).html);
    expect(band).not.toBe("#ffcc00");
    expect(relloEmailContrast(band, "#ffffff")).toBeGreaterThanOrEqual(3);
    // still a yellow-brown: red channel above blue
    expect(parseInt(band.slice(1, 3), 16)).toBeGreaterThan(parseInt(band.slice(5, 7), 16));
  });

  it("falls back to the app palette when brand.primary is missing or not #rgb/#rrggbb", () => {
    const app = resolveRelloEmailPalette("consumer", "home-scout");
    for (const primary of [null, undefined, "", "purple", "#7c3aed80", "#7c3ae", "rgb(1,2,3)", "7c3aed", "#ggg"]) {
      const html = renderRelloEmail(branded("home-scout", { ...BRAND, primary })).html;
      expect(headerBand(html), String(primary)).toBe(app.primary);
      expect(buttonColor(html), String(primary)).toBe(app.primary);
      expect(linkColor(html), String(primary)).toBe(app.link);
    }
  });
});

describe("brand: nothing is gated", () => {
  it("a brand with no usable logo, color or name still renders every part of the email", () => {
    const plain = renderRelloEmail(baselineInput("home-scout", "consumer"));
    for (const brand of [{ name: "" }, { name: "", logoUrl: "http://x/y.svg", primary: "nope" }, { name: "Summit Realty Group" }]) {
      const r = renderRelloEmail(branded("home-scout", brand));
      expect(r.subject).toBe(plain.subject);
      expect(r.preheader).toBe(plain.preheader);
      for (const piece of ["Your plan is ready, Sarah.", "See my plan", "https://example.com/plan?a=1&amp;b=2", "Talk to me", "Kelly Sansom", "Your numbers", "Email preferences"]) {
        expect(r.html, `${JSON.stringify(brand)} ${piece}`).toContain(piece);
      }
      expect(r.text.split("\n").slice(1).join("\n")).toBe(plain.text.split("\n").slice(1).join("\n"));
    }
  });
});

describe("brand: the kicker is unchanged", () => {
  it("a given kicker is written as given", () => {
    const r = renderRelloEmail({ ...branded("home-scout", BRAND), kicker: "Rello · from Summit Realty Group" });
    expect(header(r.html)).toContain(">Rello · from Summit Realty Group</div>");
    expect(r.text.split("\n")[0]).toBe("Rello · from Summit Realty Group");
  });

  it("the default kicker keeps its shape with Rello in the app's place", () => {
    expect(renderRelloEmail(branded("home-scout", BRAND)).text.split("\n")[0]).toBe("Rello · from ClearPath Utah Mortgage");
    expect(renderRelloEmail({ ...branded("home-scout", BRAND), companyName: null }).text.split("\n")[0]).toBe("Rello");
  });
});

describe("brand: without it, every render is byte-identical to v2.33.0", () => {
  const fixtures = { consumer: consumerFixture, pro: proFixture, admin: adminFixture } as const;

  for (const audience of BASELINE_AUDIENCES) {
    it(`${audience}: every slug hashes as at v2.33.0, with brand absent, undefined or null`, () => {
      const renders = fixtures[audience].renders as Record<string, { html: string; text: string }>;
      expect(Object.keys(renders).sort()).toEqual([...SLUGS].sort());
      for (const slug of SLUGS) {
        for (const input of [baselineInput(slug, audience), branded(slug, undefined, audience), branded(slug, null, audience)]) {
          const r = renderRelloEmail(input);
          expect(sha256(r.html), `${slug} ${audience} html`).toBe(renders[slug].html);
          expect(sha256(r.text), `${slug} ${audience} text`).toBe(renders[slug].text);
        }
      }
    });

    it(`${audience}: the home-scout render equals the stored v2.33.0 copy, character for character`, () => {
      const r = renderRelloEmail(baselineInput("home-scout", audience));
      expect(r).toEqual(fixtures[audience].homeScout);
    });
  }

  it("and still matches the v2.32.0 baseline with its logo cut out", () => {
    const renders = baseline.renders as Record<string, Record<string, { html: string; text: string }>>;
    for (const slug of SLUGS) {
      for (const audience of BASELINE_AUDIENCES) {
        const r = renderRelloEmail(branded(slug, null, audience));
        expect(sha256(cutLogo(r.html)), `${slug} ${audience}`).toBe(renders[slug][audience].html);
        expect(sha256(r.text), `${slug} ${audience}`).toBe(renders[slug][audience].text);
      }
    }
  });
});

describe("brand: pro and admin mail ignore it", () => {
  for (const audience of ["pro", "admin"] as const) {
    it(`${audience} mail with a brand renders exactly as without one`, () => {
      for (const slug of SLUGS) {
        const without = renderRelloEmail(baselineInput(slug, audience));
        expect(renderRelloEmail(branded(slug, BRAND, audience)), `${slug}`).toEqual(without);
      }
    });
  }
});
