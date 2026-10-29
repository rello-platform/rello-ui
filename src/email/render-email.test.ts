import { describe, expect, it } from "vitest";
import { APP_SLUGS, ENGINE_SLUGS } from "@rello-platform/slugs";
import {
  RELLO_EMAIL_ADMIN_COLOR,
  RELLO_EMAIL_APP_NAMES,
  RELLO_EMAIL_DEFAULT_BRAND_COLOR,
  RELLO_EMAIL_LOGO_SLUGS,
  renderRelloEmail,
  resolveRelloEmailColor,
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
    brandColor: "#1a365d",
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
    brandColor: "#1a365d",
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

describe("renderRelloEmail — color", () => {
  it("uses a valid tenant color", () => {
    expect(renderRelloEmail(full({ brandColor: "#0F766E" })).html).toContain("background:#0f766e");
  });

  for (const bad of ["red", "#fff", "#12345g", "rgb(0,0,0)", "#1a365d;background:url(x)", "", null, undefined]) {
    it(`falls back to the default for ${JSON.stringify(bad)}`, () => {
      expect(resolveRelloEmailColor("consumer", bad)).toBe(RELLO_EMAIL_DEFAULT_BRAND_COLOR);
    });
  }

  it("falls back when white text would be unreadable on the color", () => {
    expect(resolveRelloEmailColor("consumer", "#ffd400")).toBe(RELLO_EMAIL_DEFAULT_BRAND_COLOR);
    expect(resolveRelloEmailColor("pro", "#ffffff")).toBe(RELLO_EMAIL_DEFAULT_BRAND_COLOR);
  });

  it("admin mail is always #111827", () => {
    expect(resolveRelloEmailColor("admin", "#0f766e")).toBe(RELLO_EMAIL_ADMIN_COLOR);
    const { html } = renderRelloEmail(full({ audience: "admin", brandColor: "#0f766e" }));
    expect(html).toContain(`background:${RELLO_EMAIL_ADMIN_COLOR}`);
    expect(html).not.toContain("#0f766e");
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

  it("pro and admin mail carry the Rello logo", () => {
    for (const audience of ["pro", "admin"] as const) {
      const { html } = renderRelloEmail(full({ audience }));
      expect(html).toContain('src="https://hellorello.app/email/logos/rello.png"');
      expect(html).not.toContain("home-ready.png");
    }
    expect(renderRelloEmail(full({ audience: "pro" })).html).toContain("Home Ready · ClearPath Utah Mortgage");
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
