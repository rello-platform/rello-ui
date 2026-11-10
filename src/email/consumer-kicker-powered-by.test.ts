import { describe, expect, it } from "vitest";
import type { PlatformSlug } from "@rello-platform/slugs";
import golden from "./fixtures/v2.38.0-before-consumer-kicker.json";
import {
  renderRelloEmail,
  resolveRelloEmailPalette,
  type RelloEmailAudience,
  type RelloEmailBrand,
  type RelloEmailInput,
} from "./index";
import { baselineInput, sha256 } from "../test/email-logo-baseline";
import { V238_SLUGS, v238Cases } from "../test/email-v238-cases";

/**
 * v2.40.0. Kelly 2026-11-10, on whether "Rello" should come out of the header
 * of consumer email: "yes it should be branded for the MLO sending it but the
 * footer could mention rello as a small marketing piece". This replaces the
 * earlier "Rello · from <company>" consumer kicker. Pro and admin mail keep
 * their kickers, and every byte, exactly.
 */

const BRAND: RelloEmailBrand = { name: "Summit Peak", logoUrl: "https://cdn.example-mortgage.com/brand/logo.png", primary: "#1d4ed8" };
const POWERED_HTML_RE = /<a href="https:\/\/hellorello\.app" style="color:(#[0-9a-f]{6});">Powered by Rello<\/a>/;
const POWERED_TEXT = "Powered by Rello (hellorello.app)";

function consumer(app: PlatformSlug, extra: Partial<RelloEmailInput> = {}): RelloEmailInput {
  return { ...baselineInput(app, "consumer"), companyName: "Summit Peak Mortgage", ...extra };
}

/** The kicker div's inner HTML, or null when the header has none. */
function kickerHtml(html: string): string | null {
  const m = html.match(/<div style="font-size:12px;letter-spacing:\.1em;text-transform:uppercase;color:#ffffff;">(.*?)<\/div>/);
  return m ? m[1] : null;
}

/** The header cell's inner HTML. */
function header(html: string): string {
  const m = html.match(/<tr><td align="center" bgcolor="[^"]+"[^>]*>(.*?)<\/td><\/tr>/);
  if (!m) throw new Error("no header");
  return m[1];
}

/** The footer cell's inner HTML, or null when there is no footer row. */
function footer(html: string): string | null {
  const m = html.match(/<tr><td style="border-top:1px solid #e5e7eb;padding:16px 32px;[^"]*">(.*?)<\/td><\/tr>/);
  return m ? m[1] : null;
}

describe("consumer kicker: the sender, never Rello by default", () => {
  it('a known company: "From <company>", in the header and the text part, unbranded and branded', () => {
    for (const app of ["home-ready", "rello", "home-scout", "newsletter-studio"] as const) {
      const plain = renderRelloEmail(consumer(app));
      expect(kickerHtml(plain.html), app).toBe("From Summit Peak Mortgage");
      expect(plain.text.split("\n")[0], app).toBe("From Summit Peak Mortgage");
      const branded = renderRelloEmail(consumer(app, { brand: BRAND }));
      expect(kickerHtml(branded.html), app).toBe("From Summit Peak Mortgage");
      expect(branded.text.split("\n").slice(0, 2), app).toEqual(["Summit Peak", "From Summit Peak Mortgage"]);
      expect(header(branded.html), app).not.toMatch(/rello/i);
    }
  });

  it("the company is trimmed, flattened and escaped as the rest of the header is", () => {
    const r = renderRelloEmail(consumer("home-ready", { companyName: `  A & B "Home"\n<Loans>  ` }));
    expect(kickerHtml(r.html)).toBe("From A &amp; B &quot;Home&quot; &lt;Loans&gt;");
    expect(r.text.split("\n")[0]).toBe(`From A & B "Home" <Loans>`);
  });

  it('under a brand with no company: "From <brand>" (KA ruling, a1-664), HTML and text', () => {
    for (const app of ["home-scout", "home-ready", "rello"] as const) {
      for (const companyName of [null, undefined, "", "   ", 42 as unknown as string]) {
        const r = renderRelloEmail(consumer(app, { brand: BRAND, companyName }));
        expect(kickerHtml(r.html), `${app} ${String(companyName)}`).toBe("From Summit Peak");
        expect(r.text.split("\n").slice(0, 2), `${app} ${String(companyName)}`).toEqual(["Summit Peak", "From Summit Peak"]);
        expect(header(r.html)).not.toMatch(/rello/i);
      }
    }
    const escaped = renderRelloEmail(consumer("home-scout", { brand: { name: `A & B "Homes" <x>` }, companyName: null }));
    expect(kickerHtml(escaped.html)).toBe("From A &amp; B &quot;Homes&quot; &lt;x&gt;");
    expect(escaped.text.split("\n").slice(0, 2)).toEqual([`A & B "Homes" <x>`, `From A & B "Homes" <x>`]);
  });

  it("the brand name in the kicker loses its control characters, as the text part's name line does", () => {
    const r = renderRelloEmail(consumer("home-scout", { brand: { name: "Summit\u0000 Peak\u0085" }, companyName: null }));
    expect(kickerHtml(r.html)).toBe("From Summit Peak");
    expect(r.text.split("\n").slice(0, 2)).toEqual(["Summit Peak", "From Summit Peak"]);
  });

  it("under a brand with no name and no company: no kicker at all, and no Rello", () => {
    for (const name of ["", "   ", "\u0000"]) {
      const r = renderRelloEmail(consumer("home-scout", { brand: { name }, companyName: null }));
      expect(kickerHtml(r.html), JSON.stringify(name)).toBeNull();
      expect(header(r.html)).not.toMatch(/rello/i);
      expect(r.text.split("\n")[0], JSON.stringify(name)).toBe("Your plan is ready, Sarah.");
    }
  });

  it("unbranded with no company: the app's name, as at v2.38.0", () => {
    for (const [app, name] of [["home-ready", "Home Ready"], ["home-scout", "Home Scout"], ["rello", "Rello"]] as const) {
      const r = renderRelloEmail(consumer(app, { companyName: null }));
      expect(kickerHtml(r.html), app).toBe(name);
      expect(r.text.split("\n")[0], app).toBe(name);
    }
  });

  it("a given kicker still wins", () => {
    for (const brand of [null, BRAND]) {
      const r = renderRelloEmail(consumer("home-ready", { brand, kicker: "Your pre-approval" }));
      expect(kickerHtml(r.html)).toBe("Your pre-approval");
    }
  });
});

describe('consumer footer: "Powered by Rello", last and muted', () => {
  it("is the footer's last line, linked to hellorello.app in the footer's muted color", () => {
    for (const app of V238_SLUGS) {
      for (const brand of [null, BRAND]) {
        const r = renderRelloEmail(consumer(app, { brand }));
        const foot = footer(r.html)!;
        const m = foot.match(POWERED_HTML_RE);
        expect(m, `${app} ${brand ? "brand" : "plain"}`).not.toBeNull();
        expect(foot.endsWith(`<br>${m![0]}`), app).toBe(true);
        const muted = r.html.match(/border-top:1px solid #e5e7eb;padding:16px 32px;text-align:center;font-size:12px;color:(#[0-9a-f]{6});/)![1];
        expect(m![1], app).toBe(muted);
        expect(r.html.match(new RegExp(POWERED_HTML_RE.source, "g")), app).toHaveLength(1);
      }
    }
    expect(footer(renderRelloEmail(consumer("home-ready")).html)).toContain(
      `color:${resolveRelloEmailPalette("consumer", "home-ready").secondaryText};">Powered by Rello</a>`,
    );
  });

  it("is the text part's last line, after the footer", () => {
    const r = renderRelloEmail(consumer("home-ready"));
    expect(r.text.endsWith(`Email preferences: https://example.com/prefs\n${POWERED_TEXT}\n`)).toBe(true);
    expect(r.text.split(POWERED_TEXT)).toHaveLength(2);
  });

  it("shows on consumer mail with no other footer facts, with the footer rule above it", () => {
    const r = renderRelloEmail({ audience: "consumer", app: "home-ready", subject: "Hi", headline: "Hi there." });
    expect(footer(r.html)).toMatch(new RegExp(`^${POWERED_HTML_RE.source}$`));
    expect(r.text).toBe(`Home Ready\n\nHi there.\n\n—\n${POWERED_TEXT}\n`);
  });

  it("an unknown audience renders as consumer, so it carries the line too", () => {
    const r = renderRelloEmail({ ...consumer("home-ready"), audience: "nobody" as RelloEmailAudience });
    expect(r.text.endsWith(`${POWERED_TEXT}\n`)).toBe(true);
  });

  it("footer.poweredBy: false leaves it out, html and text; anything else keeps it", () => {
    const base = consumer("home-ready");
    const off = renderRelloEmail({ ...base, footer: { ...base.footer, poweredBy: false } });
    expect(off.html).not.toContain("Powered by Rello");
    expect(off.html).not.toContain('href="https://hellorello.app"');
    expect(off.text).not.toContain("Powered by Rello");
    expect(off.text.endsWith("Email preferences: https://example.com/prefs\n")).toBe(true);
    const bare = renderRelloEmail({ audience: "consumer", app: "home-ready", subject: "Hi", headline: "Hi there.", footer: { poweredBy: false } });
    expect(footer(bare.html)).toBeNull();
    expect(bare.text).toBe("Home Ready\n\nHi there.\n");
    for (const poweredBy of [true, undefined, null, 0, "false", "no"] as unknown[]) {
      const r = renderRelloEmail({ ...base, footer: { ...base.footer, poweredBy: poweredBy as boolean } });
      expect(r.html, String(poweredBy)).toMatch(POWERED_HTML_RE);
      expect(r.text, String(poweredBy)).toContain(POWERED_TEXT);
    }
    expect(renderRelloEmail({ ...base, footer: null }).text).toContain(POWERED_TEXT);
  });

  it("never on pro or admin mail, whatever footer.poweredBy says", () => {
    for (const audience of ["pro", "admin"] as const) {
      for (const poweredBy of [undefined, true]) {
        for (const brand of [null, BRAND]) {
          const base = baselineInput("home-ready", audience);
          const r = renderRelloEmail({ ...base, brand, footer: { ...base.footer, poweredBy } });
          expect(r.html, `${audience} ${String(poweredBy)}`).not.toContain("Powered by");
          expect(r.html, audience).not.toContain('href="https://hellorello.app"');
          expect(r.text, audience).not.toContain("Powered by");
        }
      }
    }
  });
});

describe("byte-for-byte against v2.38.0 (19f04a9)", () => {
  const renders = golden.renders as Record<string, { html: string; text: string }>;

  it("every pro and admin case, every slug: html and text hash as at v2.38.0", () => {
    const cases = v238Cases().filter((c) => c.input.audience !== "consumer");
    expect(cases.length).toBe(V238_SLUGS.length * 2 * 9);
    for (const c of cases) {
      const r = renderRelloEmail(c.input);
      expect(sha256(r.html), `${c.id} html`).toBe(renders[c.id].html);
      expect(sha256(r.text), `${c.id} text`).toBe(renders[c.id].text);
    }
  });

  it("the home-ready pro and admin renders equal the stored v2.38.0 copies, character for character", () => {
    expect(renderRelloEmail(baselineInput("home-ready", "pro"))).toEqual(golden.proHomeReady);
    expect(renderRelloEmail(baselineInput("home-ready", "admin"))).toEqual(golden.adminHomeReady);
  });

  it("consumer, with the v2.38.0 kicker passed and footer.poweredBy false: every slug hashes as at v2.38.0", () => {
    const cases = v238Cases().filter((c) => c.input.audience === "consumer");
    expect(cases.length).toBe(V238_SLUGS.length * 2);
    for (const c of cases) {
      const r = renderRelloEmail(c.input);
      expect(sha256(r.html), `${c.id} html`).toBe(renders[c.id].html);
      expect(sha256(r.text), `${c.id} text`).toBe(renders[c.id].text);
    }
  });

  it("the check can fail: the default consumer render no longer hashes as at v2.38.0", () => {
    const c = v238Cases().find((x) => x.id === "home-ready|consumer|pinned")!;
    const r = renderRelloEmail(baselineInput("home-ready", "consumer"));
    expect(sha256(r.html)).not.toBe(renders[c.id].html);
    expect(sha256(r.text)).not.toBe(renders[c.id].text);
  });
});
