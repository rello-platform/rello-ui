import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { APP_SLUGS, ENGINE_SLUGS } from "@rello-platform/slugs";
import tokens from "../../tokens/app-overrides.json";
import {
  RELLO_EMAIL_APP_NAMES,
  RELLO_EMAIL_LOGO_SLUGS,
  RELLO_EMAIL_TOKEN_KEY_FOR_SLUG,
  relloEmailContrast,
  renderRelloEmail,
  resolveRelloEmailPalette,
  safeEmailUrl,
  type RelloEmailInput,
} from "./index";

const XSS = `<script>alert("x")</script>&'`;
const ESCAPED = "&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;&amp;&#39;";

function full(overrides: Partial<RelloEmailInput> = {}): RelloEmailInput {
  return {
    audience: "consumer",
    app: "home-ready",
    companyName: "ClearPath Utah Mortgage",
    subject: "Your Home Ready plan is ready, Sarah",
    preheader: "Tap to see where you stand and your next step.",
    headline: "Your Home Ready plan is ready, Sarah.",
    paragraphs: ["I put together your plan to buy a home.", "It takes about 2 minutes."],
    card: { title: "Your numbers", rows: [{ label: "Budget", value: "$450,000" }] },
    badge: { label: "New", tone: "info" },
    detail: "Ready now",
    button: { label: "See my plan", url: "https://homeready.app/auth/verify?token=abc&x=1", note: "Works once, for 24 hours." },
    secondaryLink: { label: "Read the FAQ", url: "https://homeready.app/faq" },
    signer: { name: "Kelly Sansom", title: "Loan Officer", nmls: "123456", phone: "(801) 555-0100", replyLine: "Questions? Just reply." },
    footer: {
      companyName: "ClearPath Utah Mortgage",
      companyNmls: "000000",
      address: "123 Main Street, Salt Lake City, UT 84101",
      equalHousing: true,
      reason: "You're getting this because you started a Home Ready plan.",
      preferenceLink: { label: "Email preferences", url: "https://homeready.app/preferences" },
    },
    ...overrides,
  };
}

/** Every text-bearing field set to the same hostile string. */
function hostile(): RelloEmailInput {
  return {
    audience: "consumer",
    app: "home-ready",
    companyName: XSS,
    subject: XSS,
    preheader: XSS,
    kicker: XSS,
    headline: XSS,
    detail: XSS,
    badge: { label: XSS, tone: "hot" },
    paragraphs: [XSS],
    card: { title: XSS, rows: [{ label: XSS, value: XSS }] },
    button: { label: XSS, url: `https://example.com/?q=${XSS}`, note: XSS },
    secondaryLink: { label: XSS, url: `https://example.com/b?${XSS}` },
    signer: { name: XSS, title: XSS, nmls: XSS, phone: XSS, initials: XSS, replyLine: XSS },
    footer: {
      companyName: XSS,
      companyNmls: XSS,
      address: XSS,
      equalHousing: true,
      reason: XSS,
      preferenceLink: { label: XSS, url: `https://example.com/p?${XSS}` },
    },
  };
}

describe("renderRelloEmail — escaping", () => {
  it("escapes a <script> in every text field and every URL attribute", () => {
    const { html } = renderRelloEmail(hostile());
    expect(html).not.toContain("<script");
    expect(html).not.toContain(`"x"`);
    // headline, kicker, detail, badge, paragraph, card title/label/value, button label/note,
    // secondary label, signer name/meta/phone/reply, footer x3 lines, preference label, title, preheader
    const count = html.split("&lt;script&gt;").length - 1;
    expect(count).toBeGreaterThanOrEqual(20);
  });

  it("escapes the headline specifically", () => {
    const { html } = renderRelloEmail(full({ headline: XSS }));
    expect(html).toContain(ESCAPED);
    expect(html).not.toContain(XSS);
  });

  it("escapes the ampersand in a URL attribute", () => {
    const { html } = renderRelloEmail(full());
    expect(html).toContain('href="https://homeready.app/auth/verify?token=abc&amp;x=1"');
  });

  it("returns subject and preheader as plain text (the transport encodes headers)", () => {
    const r = renderRelloEmail(full({ subject: "Line one\r\nBcc: x@example.com", preheader: "  a \n b " }));
    expect(r.subject).toBe("Line one Bcc: x@example.com");
    expect(r.preheader).toBe("a b");
  });
});

describe("renderRelloEmail — URLs", () => {
  for (const bad of ["javascript:alert(1)", "data:text/html,hi", "mailto:a@b.co", "tel:+18015550100", "/relative/path", "ftp://x.example", "", "   "]) {
    it(`drops a button whose url is ${JSON.stringify(bad)}`, () => {
      const { html, text } = renderRelloEmail(full({ button: { label: "Go", url: bad }, secondaryLink: { label: "Second", url: bad }, footer: { preferenceLink: { label: "Prefs", url: bad } } }));
      expect(html).not.toContain(">Go<");
      expect(html).not.toContain("Second");
      expect(html).not.toContain("Prefs");
      expect(html).not.toContain("Button not working?");
      if (bad.trim()) expect(html).not.toContain(bad);
      expect(text).not.toContain("Go:");
    });
  }

  it("keeps http and https", () => {
    expect(safeEmailUrl("http://x.example/a")).toBe("http://x.example/a");
    expect(safeEmailUrl(" https://x.example/a ")).toBe("https://x.example/a");
    expect(safeEmailUrl(42)).toBeNull();
  });

  it("writes the full link under the button, and can turn it off", () => {
    expect(renderRelloEmail(full()).html).toContain("Button not working?");
    expect(renderRelloEmail(full({ showLinkFallback: false })).html).not.toContain("Button not working?");
  });
});

describe("renderRelloEmail — app colors from tokens/app-overrides.json (Kelly 2026-10-29)", () => {
  type Block = Record<string, string | null | undefined>;
  const T = tokens as unknown as { defaults: Block; apps: Record<string, Block> };
  const lc = (v: string | null | undefined) => (v ?? "").toLowerCase();
  const jsonPrimary = (key: string) => lc(T.apps[key]?.primary ?? T.defaults.primary);
  const headerOf = (html: string) => html.match(/<tr><td align="center" bgcolor="(#[0-9a-f]{6})" style="background:\1;padding:30px/)?.[1];
  const buttonOf = (html: string) => html.match(/<td align="center" bgcolor="(#[0-9a-f]{6})" style="background:\1;border-radius:8px;">/)?.[1];
  const ALL_SLUGS = [...APP_SLUGS, ...ENGINE_SLUGS];

  /** Runs `fn` with one JSON block changed, then puts the JSON back exactly. */
  function withTokens(key: string, block: Block | undefined, fn: () => void) {
    const had = Object.prototype.hasOwnProperty.call(T.apps, key);
    const before = T.apps[key];
    if (block === undefined) delete T.apps[key];
    else T.apps[key] = block;
    try {
      fn();
    } finally {
      if (had) T.apps[key] = before;
      else delete T.apps[key];
    }
  }

  it("today's JSON holds the primaries the KA listed", () => {
    expect(jsonPrimary("rello")).toBe("#3b5998");
    expect(jsonPrimary("home-ready")).toBe("#0270d2");
    expect(jsonPrimary("the-homestretch")).toBe("#0070d2");
    expect(jsonPrimary("open-house-hub")).toBe("#0d9488");
    expect(jsonPrimary("pathfinder-pro")).toBe("#1e3a5f");
    expect(jsonPrimary("newsletter-studio")).toBe("#6366f1");
    expect(jsonPrimary("market-intel")).toBe("#ca775c");
    expect(jsonPrimary("harvest-home")).toBe("#b8860b");
    expect(jsonPrimary("the-home-scout")).toBe("#2d6a4f");
    expect(jsonPrimary("the-drumbeat")).toBe("#d4506a");
  });

  const SAME_KEY = ["home-ready", "open-house-hub", "pathfinder-pro", "newsletter-studio", "market-intel", "harvest-home", "the-drumbeat"] as const;
  for (const app of SAME_KEY) {
    it(`${app}: header and button are the JSON primary, on consumer and pro mail`, () => {
      for (const audience of ["consumer", "pro"] as const) {
        const { html } = renderRelloEmail(full({ app, audience }));
        expect(headerOf(html), audience).toBe(jsonPrimary(app));
        expect(buttonOf(html), audience).toBe(jsonPrimary(app));
      }
    });
  }

  it("slugs whose JSON key differs read the mapped block", () => {
    expect(RELLO_EMAIL_TOKEN_KEY_FOR_SLUG).toEqual({ "home-stretch": "the-homestretch", "home-scout": "the-home-scout" });
    expect(headerOf(renderRelloEmail(full({ app: "home-stretch" })).html)).toBe(jsonPrimary("the-homestretch"));
    expect(headerOf(renderRelloEmail(full({ app: "home-scout" })).html)).toBe(jsonPrimary("the-home-scout"));
  });

  it("a slug with no JSON block gets defaults.primary", () => {
    for (const app of ["the-oven", "journey-engine", "rello"] as const) {
      expect(T.apps[app]?.primary ?? null, app).toBeNull();
      const { html } = renderRelloEmail(full({ app }));
      expect(headerOf(html), app).toBe(lc(T.defaults.primary));
      expect(buttonOf(html), app).toBe(lc(T.defaults.primary));
    }
  });

  it("admin mail uses Rello's primary, whatever the app; never #111827 or black", () => {
    for (const app of ["rello", "home-ready", "harvest-home"] as const) {
      const { html } = renderRelloEmail(full({ app, audience: "admin" }));
      expect(headerOf(html), app).toBe(jsonPrimary("rello"));
      expect(buttonOf(html), app).toBe(jsonPrimary("rello"));
      expect(html, app).not.toMatch(/background:#(111827|000000)|bgcolor="#(111827|000000)"/);
    }
    expect(resolveRelloEmailPalette("admin", "home-ready")).toEqual(resolveRelloEmailPalette("consumer", "rello"));
  });

  it("no header or button anywhere is the old #111827 or black", () => {
    for (const app of ALL_SLUGS) {
      for (const audience of ["consumer", "pro", "admin"] as const) {
        const { html } = renderRelloEmail(full({ app, audience }));
        expect(headerOf(html), `${audience}/${app}`).not.toMatch(/^#(111827|000000)$/);
        expect(buttonOf(html), `${audience}/${app}`).not.toMatch(/^#(111827|000000)$/);
      }
    }
  });

  it("a changed JSON value changes the render (the JSON is read, not copied)", () => {
    withTokens("home-ready", { ...T.apps["home-ready"], primary: "#7A1FA2" }, () => {
      const { html } = renderRelloEmail(full({ app: "home-ready" }));
      expect(headerOf(html)).toBe("#7a1fa2");
      expect(buttonOf(html)).toBe("#7a1fa2");
    });
    expect(headerOf(renderRelloEmail(full({ app: "home-ready" })).html)).toBe("#0270d2");
    // A block added for a slug that has none is picked up too.
    withTokens("prequal-pro", { primary: "#5B21B6" }, () => {
      expect(headerOf(renderRelloEmail(full({ app: "prequal-pro" })).html)).toBe("#5b21b6");
    });
    // A mapped key: editing the-homestretch moves home-stretch mail.
    withTokens("the-homestretch", { ...T.apps["the-homestretch"], primary: "#14532D" }, () => {
      expect(headerOf(renderRelloEmail(full({ app: "home-stretch" })).html)).toBe("#14532d");
    });
  });

  it("no app's primary hex is written into the renderer source", () => {
    const src = readFileSync(join(process.cwd(), "src/email/render-email.ts"), "utf8").toLowerCase();
    const primaries = new Set([lc(T.defaults.primary), ...Object.values(T.apps).map((b) => lc(b.primary)).filter(Boolean)]);
    for (const hex of primaries) expect(src, hex).not.toContain(hex);
  });

  it("a malformed app value falls back to defaults", () => {
    withTokens("home-ready", { ...T.apps["home-ready"], primary: "red" }, () => {
      expect(headerOf(renderRelloEmail(full({ app: "home-ready" })).html)).toBe(lc(T.defaults.primary));
    });
    withTokens("home-ready", { ...T.apps["home-ready"], primary: "#0270d2;background:url(x)" }, () => {
      const { html } = renderRelloEmail(full({ app: "home-ready" }));
      expect(headerOf(html)).toBe(lc(T.defaults.primary));
      expect(html).not.toContain("url(x)");
    });
  });

  it("the JSON defaults are valid #rrggbb and every app key is a slug, a mapped key or conversations", () => {
    for (const field of ["primary", "accent", "secondaryText", "rowBackground", "cardBorder"]) {
      expect(T.defaults[field], field).toMatch(/^#[0-9a-fA-F]{6}$/);
    }
    const known = new Set<string>([...ALL_SLUGS, ...Object.values(RELLO_EMAIL_TOKEN_KEY_FOR_SLUG), "conversations"]);
    for (const key of Object.keys(T.apps)) expect(known.has(key), key).toBe(true);
    for (const key of Object.values(RELLO_EMAIL_TOKEN_KEY_FOR_SLUG)) expect(T.apps[key as string], key).toBeTruthy();
  });

  it("contrast: white header text ≥ 3:1, every other text ≥ 4.5:1, for every slug and audience", () => {
    for (const app of ALL_SLUGS) {
      for (const audience of ["consumer", "pro", "admin"] as const) {
        const p = resolveRelloEmailPalette(audience, app);
        const at = `${audience}/${app}`;
        expect(relloEmailContrast("#ffffff", p.primary), at).toBeGreaterThanOrEqual(3);
        expect(relloEmailContrast(p.link, "#ffffff"), at).toBeGreaterThanOrEqual(4.5);
        expect(relloEmailContrast(p.badgeText, p.badgeBackground), at).toBeGreaterThanOrEqual(4.5);
        expect(relloEmailContrast(p.secondaryText, "#ffffff"), at).toBeGreaterThanOrEqual(4.5);
        expect(relloEmailContrast(p.secondaryText, p.cardBackground), at).toBeGreaterThanOrEqual(4.5);
        expect(relloEmailContrast(p.avatarText, p.avatarBackground), at).toBeGreaterThanOrEqual(4.5);
        expect(relloEmailContrast("#111827", p.cardBackground), at).toBeGreaterThanOrEqual(7);
      }
    }
  });

  it("a primary that passes 3:1 is used exactly; one that fails is darkened until it passes", () => {
    for (const key of SAME_KEY) expect(resolveRelloEmailPalette("consumer", key).primary, key).toBe(jsonPrimary(key));
    withTokens("home-ready", { ...T.apps["home-ready"], primary: "#FFD400" }, () => {
      const { primary, link } = resolveRelloEmailPalette("consumer", "home-ready");
      expect(primary).not.toBe("#ffd400");
      expect(relloEmailContrast("#ffffff", primary)).toBeGreaterThanOrEqual(3);
      expect(relloEmailContrast(link, "#ffffff")).toBeGreaterThanOrEqual(4.5);
      expect(headerOf(renderRelloEmail(full({ app: "home-ready" })).html)).toBe(primary);
    });
  });

  it("links use the app primary, darkened only where it is under 4.5:1 on white", () => {
    // home-ready #0270d2 is 4.94:1 → used as is; open-house-hub #0d9488 is 3.74:1 → darkened.
    expect(resolveRelloEmailPalette("consumer", "home-ready").link).toBe("#0270d2");
    const ohh = resolveRelloEmailPalette("consumer", "open-house-hub").link;
    expect(ohh).not.toBe("#0d9488");
    const { html } = renderRelloEmail(full({ app: "open-house-hub" }));
    expect(html).toContain(`style="color:${ohh};font-weight:600;text-decoration:none;">Read the FAQ`);
    expect(html).toContain(`style="color:${ohh};word-break:break-all;">`);
  });

  it("badge, card labels and secondary text come from the app's accent / secondaryText", () => {
    const hr = resolveRelloEmailPalette("consumer", "home-ready");
    const nl = resolveRelloEmailPalette("consumer", "newsletter-studio");
    expect(hr.badgeBackground).not.toBe(nl.badgeBackground);
    expect(hr.secondaryText).toBe(lc(T.apps["home-ready"].secondaryText));
    const { html } = renderRelloEmail(full({ app: "home-ready" }));
    expect(html).toContain(`background:${hr.badgeBackground};color:${hr.badgeText};`);
    expect(html).toContain(`color:${hr.secondaryText};width:130px;">Budget<`);
    expect(html).toContain(`background:${hr.cardBackground};border:1px solid ${hr.cardBorder};`);
    expect(html).not.toMatch(/#b42318|#6b7280|#4b5563|#f3f6fa|#dbe4f0/);
    // The tone no longer picks a color.
    for (const tone of ["hot", "info", "success", "warning", "neutral"] as const) {
      expect(renderRelloEmail(full({ badge: { label: "New", tone } })).html, tone).toBe(html);
    }
  });

  it("a brandColor passed by an old caller has no effect", () => {
    const withOld = renderRelloEmail({ ...full(), brandColor: "#ff0000" } as RelloEmailInput).html;
    expect(withOld).toBe(renderRelloEmail(full()).html);
    expect(withOld).not.toContain("#ff0000");
  });
});

describe("renderRelloEmail — omitted fields", () => {
  it("renders with only the required fields and never prints a placeholder", () => {
    const r = renderRelloEmail({ audience: "consumer", app: "home-ready", subject: "Hi", headline: "Hello" });
    for (const out of [r.html, r.text]) {
      expect(out).not.toMatch(/undefined|null|NaN|NMLS #(?!\d)|\[object/);
      expect(out).not.toContain(" · from ");
    }
    expect(r.html).not.toContain("Button not working?");
    expect(r.html).not.toContain("border-top:1px solid #e5e7eb");
  });

  it("drops empty NMLS, title and phone from the signer and footer", () => {
    const r = renderRelloEmail(full({ signer: { name: "Kelly Sansom", nmls: " ", title: "", phone: null }, footer: { companyName: "ClearPath", companyNmls: "", address: "" } }));
    expect(r.html).not.toContain("NMLS #");
    expect(r.text).not.toContain("NMLS #");
    expect(r.html).toContain("<b>Kelly Sansom</b>");
    expect(r.html).toContain(">KS<");
  });

  it("a garbage-typed input does not throw or leak", () => {
    const r = renderRelloEmail({
      audience: "nope" as never,
      app: "not-a-slug" as never,
      subject: 7 as never,
      headline: { a: 1 } as never,
      paragraphs: [null, undefined, "  ", "Real"],
      card: { rows: [{ label: "", value: "x" }, { label: "y", value: "" }] },
    });
    expect(r.html).toContain("Real");
    expect(r.html).not.toMatch(/undefined|null|\[object/);
    expect(r.html).toContain('alt="Rello"');
  });
});

describe("renderRelloEmail — header and logos", () => {
  it("consumer mail carries the app's PNG logo", () => {
    const { html } = renderRelloEmail(full());
    expect(html).toContain('src="https://hellorello.app/email/logos/home-ready.png"');
    expect(html).toContain('width="96" height="96" alt="Home Ready"');
    expect(html).toContain("Home Ready · from ClearPath Utah Mortgage");
  });

  it("pro mail carries the app's PNG logo; admin mail carries the Rello logo", () => {
    const pro = renderRelloEmail(full({ audience: "pro" })).html;
    expect(pro).toContain('src="https://hellorello.app/email/logos/home-ready.png"');
    expect(pro).not.toContain("rello.png");
    const admin = renderRelloEmail(full({ audience: "admin" })).html;
    expect(admin).toContain('src="https://hellorello.app/email/logos/rello.png"');
    expect(admin).not.toContain("home-ready.png");
    expect(pro).toContain("Home Ready · ClearPath Utah Mortgage");
    expect(renderRelloEmail(full({ audience: "admin" })).html).toContain("Home Ready · Platform alert");
  });

  it("an app with no logo gets its name as text in the header", () => {
    const { html } = renderRelloEmail(full({ app: "pathfinder-pro" }));
    expect(html).not.toContain("<img");
    expect(html).toContain(">PathfinderPro</div>");
  });

  it("names every platform slug and only maps logos for real slugs", () => {
    for (const slug of [...APP_SLUGS, ...ENGINE_SLUGS]) expect(RELLO_EMAIL_APP_NAMES[slug]).toBeTruthy();
    for (const slug of RELLO_EMAIL_LOGO_SLUGS) expect([...APP_SLUGS, ...ENGINE_SLUGS]).toContain(slug);
  });
});

describe("renderRelloEmail — structure and plain text", () => {
  it("is email-safe: tables, 600 px, MSO pin, no flex/grid/web fonts/external CSS", () => {
    const { html } = renderRelloEmail(full());
    expect(html).toContain("max-width:600px");
    expect(html).toContain('<!--[if mso]><table role="presentation" width="600"');
    expect(html).not.toMatch(/display:\s*(flex|grid)|<link|@import|<style|font-face/i);
  });

  it("the text part has the same words and full links", () => {
    const { html, text } = renderRelloEmail(full());
    for (const words of [
      "Home Ready · from ClearPath Utah Mortgage",
      "Your Home Ready plan is ready, Sarah.",
      "New",
      "Ready now",
      "I put together your plan to buy a home.",
      "It takes about 2 minutes.",
      "Your numbers",
      "Budget: $450,000",
      "See my plan:",
      "https://homeready.app/auth/verify?token=abc&x=1",
      "Works once, for 24 hours.",
      "Read the FAQ: https://homeready.app/faq",
      "Questions? Just reply.",
      "Kelly Sansom",
      "Loan Officer · NMLS #123456",
      "(801) 555-0100",
      "ClearPath Utah Mortgage · Company NMLS #000000",
      "123 Main Street, Salt Lake City, UT 84101 · Equal Housing Opportunity",
      "You're getting this because you started a Home Ready plan.",
      "Email preferences: https://homeready.app/preferences",
    ]) {
      expect(text).toContain(words);
    }
    // Every word of the text part appears in the HTML's visible text or its links, and vice versa.
    const decode = (s: string) =>
      s.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, "&");
    const body = html.slice(html.indexOf("<body"));
    const hrefs = [...body.matchAll(/href="([^"]*)"/g)].map((m) => decode(m[1]));
    const htmlWords = new Set(
      decode(body.replace(/<!--[\s\S]*?-->/g, " ").replace(/<[^>]+>/g, " ")).split(/\s+/).concat(hrefs).filter(Boolean),
    );
    const textWords = text.split(/\s+/).map((w) => w.replace(/:$/, "")).filter((w) => w && w !== "—");
    for (const w of textWords) expect(htmlWords.has(w) || htmlWords.has(`${w}:`), `text word missing from html: ${w}`).toBe(true);
    const visible = decode(body.replace(/<!--[\s\S]*?-->/g, " ").replace(/<div style="display:none[^>]*>[^<]*<\/div>/, " ").replace(/<[^>]+>/g, " "))
      .split(/\s+/)
      .filter((w) => w && w !== "Button" && w !== "not" && w !== "working?" && w !== "Copy" && w !== "this" && w !== "link" && w !== "into" && w !== "your" && w !== "browser:" && w !== "KS"); // boilerplate + the decorative initials avatar
    const textSet = new Set(text.split(/\s+/).map((w) => w.replace(/:$/, "")));
    for (const w of visible) expect(textSet.has(w.replace(/:$/, "")), `html word missing from text: ${w}`).toBe(true);
    expect(text).not.toMatch(/<[a-z]/i);
  });

  it("a paragraph's line break becomes <br> in HTML and stays a newline in text", () => {
    const r = renderRelloEmail(full({ paragraphs: ["one\ntwo"] }));
    expect(r.html).toContain("one<br>two");
    expect(r.text).toContain("one\ntwo");
  });
});

describe("renderRelloEmail — URL line breaks and controls (audit TE-001)", () => {
  const SLOTS: Array<[string, (url: string) => Partial<RelloEmailInput>]> = [
    ["button", (url) => ({ button: { label: "See my plan", url } })],
    ["secondary link", (url) => ({ secondaryLink: { label: "Read the FAQ", url } })],
    ["preference link", (url) => ({ footer: { ...full().footer, preferenceLink: { label: "Email preferences", url } } })],
  ];
  const BREAKS = ["\r\n", "\n", "\r", " ", " "];

  for (const [slot, put] of SLOTS) {
    for (const br of BREAKS) {
      it(`drops the ${slot} when its URL carries ${JSON.stringify(br)}`, () => {
        const url = `https://homeready.app/a${br}https://fake.example/b`;
        const r = renderRelloEmail(full(put(url)));
        expect(r.html).not.toContain("fake.example");
        expect(r.text).not.toContain("fake.example");
        expect(r.text.split("\n").some((l) => l.trim() === "https://homeready.app/a")).toBe(false);
      });
    }
  }

  it("rejects whitespace, C0/C1 controls and U+2028/2029 anywhere inside the URL", () => {
    const inner = [" ", "\t", "\n", "\r", "\v", "\f", "\u0000", "\u001f", "\u007f", "\u0080", "\u0085", "\u009f", " ", " ", " "];
    for (const ch of inner) {
      expect(safeEmailUrl(`https://homeready.app/a${ch}b?x=1`), JSON.stringify(ch)).toBeNull();
    }
  });

  it("still drops a newline-obfuscated javascript: URL", () => {
    expect(safeEmailUrl("java\nscript:alert(1)")).toBeNull();
    expect(safeEmailUrl("javascript:\nalert(1)")).toBeNull();
    const r = renderRelloEmail(full({ button: { label: "Go", url: "java\r\nscript:alert(1)" } }));
    expect(r.html).not.toMatch(/script:/i);
    expect(r.text).not.toMatch(/script:/i);
  });

  it("keeps an ordinary https URL with a query string and & intact in both parts", () => {
    const url = "https://homeready.app/auth/verify?token=abc&x=1&next=%2Fplan";
    expect(safeEmailUrl(`  ${url}  `)).toBe(url);
    const r = renderRelloEmail(full({ button: { label: "See my plan", url } }));
    expect(r.html).toContain('href="https://homeready.app/auth/verify?token=abc&amp;x=1&amp;next=%2Fplan"');
    expect(r.text).toContain(`See my plan:\n${url}`);
  });
});

describe("renderRelloEmail — inherited map keys (audit TE-002)", () => {
  const INHERITED = ["constructor", "__proto__", "toString", "hasOwnProperty", "valueOf"];

  it("an inherited key as the app falls back to Rello like any unknown app", () => {
    for (const app of INHERITED) {
      const r = renderRelloEmail({ ...full(), app: app as RelloEmailInput["app"] });
      expect(r.html, app).toContain('alt="Rello"');
      expect(r.html, app).toContain("https://hellorello.app/email/logos/rello.png");
      expect(r.text.startsWith("Rello · from ClearPath Utah Mortgage"), app).toBe(true);
      expect(r.html, app).not.toMatch(/undefined|\[object|function /);
    }
  });

  it("an inherited key as the badge tone falls back to the neutral tone", () => {
    const neutral = renderRelloEmail(full({ badge: { label: "New", tone: "neutral" } })).html;
    for (const tone of INHERITED) {
      const r = renderRelloEmail(full({ badge: { label: "New", tone: tone as "neutral" } }));
      expect(r.html, tone).not.toMatch(/undefined|\[object|function /);
      expect(r.html, tone).toBe(neutral);
    }
  });
});
