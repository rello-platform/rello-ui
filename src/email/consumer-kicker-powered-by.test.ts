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

  // TE-1340 (AUDIT 34): the company in the consumer kicker gets the same rule as the brand line.
  const CONTROLS = /[\u0000-\u001f\u007f-\u009f]/;
  /** The text part's kicker line: the first line, or the second under a brand (the name line comes first). */
  const textKicker = (text: string, branded: boolean) => text.split("\n")[branded ? 1 : 0];

  it("TE-1340: a company with C0/C1 controls prints clean, in the header and the text part, unbranded and branded", () => {
    for (const brand of [null, BRAND]) {
      for (const companyName of ["A\u0000B\u0085C", "Summit\u0000 Peak\u0007 Mortgage\u009f", "\u001b[31mAcme\u007f Loans"]) {
        const r = renderRelloEmail(consumer("home-scout", { brand, companyName }));
        const want = `From ${companyName.replace(/[\u0000-\u001f\u007f-\u009f]/g, "").replace(/\s+/g, " ").trim()}`;
        const label = `${brand ? "branded" : "plain"} ${JSON.stringify(companyName)}`;
        expect(kickerHtml(r.html), label).toBe(want);
        expect(kickerHtml(r.html), label).not.toMatch(CONTROLS);
        expect(textKicker(r.text, !!brand), label).toBe(want);
        expect(textKicker(r.text, !!brand), label).not.toMatch(CONTROLS);
      }
    }
    expect(kickerHtml(renderRelloEmail(consumer("home-scout", { companyName: "A\u0000B\u0085C" })).html)).toBe("From ABC");
  });

  it("TE-1340: a company that is all controls is no company: the brand, else the app's name; never held", () => {
    for (const companyName of ["\u0000", "\u0085\u0000 \u009f", "\u001f\u007f"]) {
      const branded = renderRelloEmail(consumer("home-scout", { brand: BRAND, companyName }));
      expect(kickerHtml(branded.html), JSON.stringify(companyName)).toBe("From Summit Peak");
      expect(branded.text.split("\n").slice(0, 2)).toEqual(["Summit Peak", "From Summit Peak"]);
      const plain = renderRelloEmail(consumer("home-scout", { companyName }));
      expect(kickerHtml(plain.html), JSON.stringify(companyName)).toBe("Home Scout");
      expect(plain.text.split("\n")[0]).toBe("Home Scout");
      // TE-1341: a nameless brand with no usable company names the signer (no kicker under a brand).
      const nameless = renderRelloEmail(consumer("home-scout", { brand: { name: "\u0000" }, companyName }));
      expect(kickerHtml(nameless.html), JSON.stringify(companyName)).toBeNull();
      expect(nameless.text.split("\n").slice(0, 2)).toEqual(["Kelly Sansom", ""]);
    }
  });

  it("TE-1340: the strip is consumer-only; pro keeps its company as before, admin keeps its alert kicker", () => {
    const pro = renderRelloEmail({ ...baselineInput("home-scout", "pro"), companyName: "A\u0000B" });
    expect(pro.text.split("\n")[0]).toBe("Home Scout · A\u0000B");
    const admin = renderRelloEmail({ ...baselineInput("home-scout", "admin"), companyName: "A\u0000B" });
    expect(admin.text.split("\n")[0]).toBe("Home Scout · Platform alert");
  });

  it("under a brand with no name and no company: no kicker at all, and no Rello", () => {
    for (const name of ["", "   ", "\u0000"]) {
      // TE-1341: the signer names the sender; with no signer, nobody.
      const r = renderRelloEmail(consumer("home-scout", { brand: { name }, companyName: null }));
      expect(kickerHtml(r.html), JSON.stringify(name)).toBeNull();
      expect(header(r.html)).not.toMatch(/rello/i);
      expect(r.text.split("\n")[0], JSON.stringify(name)).toBe("Kelly Sansom");
      const n = renderRelloEmail(consumer("home-scout", { brand: { name }, companyName: null, signer: null }));
      expect(kickerHtml(n.html), JSON.stringify(name)).toBeNull();
      expect(header(n.html)).not.toMatch(/rello/i);
      expect(n.text.split("\n")[0], JSON.stringify(name)).toBe("Your plan is ready, Sarah.");
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

describe("TE-1341: the consumer header names one cleaned sender, the same in HTML and text", () => {
  // eslint-disable-next-line no-control-regex
  const ANY_CONTROL = /[\u0000-\u001f\u007f-\u009f]/;
  const HEADLINE = "Your plan is ready, Sarah.";
  const unescape = (s: string) =>
    s.replace(/<wbr>/g, "").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, "&");
  /** The header's visible sender name: the brand logo's alt, else the 22px name div; null when neither. */
  function htmlName(html: string): string | null {
    const h = header(html);
    const img = h.match(/<img [^>]*alt="([^"]*)"[^>]*max-height:64px/);
    if (img) return unescape(img[1]);
    const div = h.match(/<div style="font-size:22px;font-weight:700;color:#ffffff;margin:0 0 10px;">(.*?)<\/div>/);
    return div ? unescape(div[1]) : null;
  }
  /** Every text line before the headline: the text part's whole header. */
  const textHeader = (text: string) => text.split("\n").slice(0, text.split("\n").indexOf(HEADLINE));

  // [label, brand name, company, signer name, expected name, expected kicker]
  const WITNESSES: ReadonlyArray<readonly [string, string, string | null, string | null, string | null, string | null]> = [
    ["all controls", "\u0000", "\u0085", "\u0007", null, null],
    ["control brand, clean company", "\u0000", "Clean Company", "Jane Doe", "Clean Company", "From Clean Company"],
    ["control brand, no company, clean signer", "\u0000", null, "Jane Doe", "Jane Doe", null],
    ["NUL + NEL in both", "A\u0000B\u0085C", "A\u0000B\u0085C", "Jane Doe", "ABC", "From ABC"],
    ["é, NUL, emoji, NEL", "é\u0000😀\u0085C", "é\u0000😀\u0085C", "Jane Doe", "é😀C", "From é😀C"],
    ["tab", "A\tB", "A\tB", "Jane Doe", "A B", "From A B"],
    ["ESC, CSI, DEL", "\u001b[31mSummit\u009b\u007f Peak", "Summit Peak Mortgage", "Jane Doe", "[31mSummit Peak", "From Summit Peak Mortgage"],
  ];

  for (const logoUrl of [BRAND.logoUrl, null]) {
    for (const app of ["home-scout", "newsletter-studio", "open-house-hub"] as const) {
      for (const [label, name, companyName, signerName, wantName, wantKicker] of WITNESSES) {
        it(`${app}, ${logoUrl ? "logo" : "no logo"}, ${label}`, () => {
          const base = consumer(app);
          const signer = signerName === null ? null : { ...base.signer!, name: signerName };
          const r = renderRelloEmail({ ...base, brand: { name, logoUrl, primary: "#1d4ed8" }, companyName, signer });
          const h = header(r.html);
          const th = textHeader(r.text);
          // Never held: the email renders whole.
          expect(r.html).toContain(HEADLINE);
          expect(r.text).toContain(POWERED_TEXT);
          // The WHOLE header, both parts: no control character, no Rello.
          expect(h).not.toMatch(ANY_CONTROL);
          expect(h).not.toMatch(/rello/i);
          for (const l of th) expect(l).not.toMatch(ANY_CONTROL);
          for (const l of th) expect(l).not.toMatch(/rello/i);
          // One sender name: the HTML's equals the text's.
          const textName = th.length > 0 && th[0] !== wantKicker ? th[0] : null;
          expect(htmlName(r.html)).toBe(logoUrl && wantName === null ? "" : wantName);
          expect(textName).toBe(wantName);
          expect(kickerHtml(r.html) === null ? null : unescape(kickerHtml(r.html)!)).toBe(wantKicker);
          expect(th.filter((l) => l.startsWith("From "))).toEqual(wantKicker ? [wantKicker] : []);
        });
      }
    }
  }

  it("unbranded consumer: the app logo names the sender, the kicker is clean, no control anywhere in the header", () => {
    for (const app of ["home-scout", "newsletter-studio", "open-house-hub"] as const) {
      for (const [, , companyName] of WITNESSES) {
        const r = renderRelloEmail(consumer(app, { companyName }));
        expect(header(r.html)).not.toMatch(ANY_CONTROL);
        for (const l of textHeader(r.text)) expect(l).not.toMatch(ANY_CONTROL);
      }
    }
  });

  it("pro keeps its header byte for byte: the name with its controls, as before", () => {
    const r = renderRelloEmail({ ...baselineInput("home-scout", "pro"), brand: { name: "A\u0000B\u0085C" } });
    expect(htmlName(r.html)).toBe("A\u0000B\u0085C");
    expect(r.text.split("\n")[0]).toBe("ABC");
  });
});
