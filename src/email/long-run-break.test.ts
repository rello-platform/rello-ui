// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import { renderRelloEmail, type RelloEmailAudience, type RelloEmailInput } from "./index";

/**
 * v2.36.0: a very long unbroken run in any caller-text slot gets <wbr> break points
 * (TE-1043: 900 characters made a 600 px email 6,519 px wide). jsdom has no layout,
 * so this proves the structural half: in every slot the run is chunked, the text is
 * whole once the <wbr> are removed, no entity or emoji is cut, and a run under the
 * threshold is untouched. The measured half (headless Chromium at 700 and 375 px, all
 * slots and audiences) is in the paste-back's evidence, not a unit test.
 */
const RUN = Array.from({ length: 900 }, (_, i) => "abcdefghijklmnopqrstuvwxyz0123456789"[i % 36]).join("");
const AUDIENCES: RelloEmailAudience[] = ["consumer", "pro", "admin"];

function base(audience: RelloEmailAudience): RelloEmailInput {
  return {
    audience,
    app: "home-scout",
    companyName: "ClearPath Utah Mortgage",
    subject: "Your plan is ready",
    preheader: "Tap to see where you stand.",
    headline: "Your plan is ready, Sarah.",
    detail: "4 minutes ago",
    badge: { label: "New" },
    paragraphs: ["I put together your plan."],
    card: { title: "Your numbers", rows: [{ label: "Budget", value: "$450,000" }] },
    button: { label: "See my plan", url: "https://example.com/plan", note: "Expires in 7 days." },
    secondaryLink: { label: "Talk to me", url: "https://example.com/talk" },
    moreLinks: [{ label: "More", url: "https://example.com/more" }],
    signer: { name: "Kelly Sansom", title: "Loan Officer", nmls: "123456", phone: "801-555-0100", replyLine: "Reply any time." },
    footer: {
      companyName: "ClearPath Utah Mortgage",
      companyNmls: "999999",
      address: "10168 South 2505 East, Sandy, UT 84092",
      equalHousing: true,
      reason: "You asked for this.",
      preferenceLink: { label: "Email preferences", url: "https://example.com/prefs" },
    },
  };
}

type Slot = { name: string; audiences?: RelloEmailAudience[]; /** Characters the shell puts right before the value, in the same run. */ prefix?: string; set: (i: RelloEmailInput, v: string) => void };
const SLOTS: Slot[] = [
  { name: "kicker", set: (i, v) => (i.kicker = v) },
  { name: "companyName (kicker)", audiences: ["consumer", "pro"], set: (i, v) => (i.companyName = v) },
  { name: "headline", set: (i, v) => (i.headline = v) },
  { name: "detail", set: (i, v) => (i.detail = v) },
  { name: "badge", set: (i, v) => (i.badge = { label: v }) },
  { name: "paragraph", set: (i, v) => (i.paragraphs = [v]) },
  { name: "card title", set: (i, v) => (i.card = { title: v, rows: i.card!.rows }) },
  { name: "card label", set: (i, v) => (i.card = { title: "T", rows: [{ label: v, value: "x" }] }) },
  { name: "card value", set: (i, v) => (i.card = { title: "T", rows: [{ label: "Budget", value: v }] }) },
  { name: "button label", set: (i, v) => (i.button = { ...i.button!, label: v }) },
  { name: "button note", set: (i, v) => (i.button = { ...i.button!, note: v }) },
  { name: "secondary link label", set: (i, v) => (i.secondaryLink = { label: v, url: "https://example.com/talk" }) },
  { name: "more link label", set: (i, v) => (i.moreLinks = [{ label: v, url: "https://example.com/more" }]) },
  { name: "signer name", set: (i, v) => (i.signer = { ...i.signer!, name: v }) },
  { name: "signer title", set: (i, v) => (i.signer = { ...i.signer!, title: v }) },
  { name: "signer NMLS", prefix: "#", set: (i, v) => (i.signer = { ...i.signer!, nmls: v }) },
  { name: "signer phone", set: (i, v) => (i.signer = { ...i.signer!, phone: v }) },
  { name: "signer reply line", set: (i, v) => (i.signer = { ...i.signer!, replyLine: v }) },
  { name: "footer company", set: (i, v) => (i.footer = { ...i.footer!, companyName: v }) },
  { name: "footer NMLS", prefix: "#", set: (i, v) => (i.footer = { ...i.footer!, companyNmls: v }) },
  { name: "footer address", set: (i, v) => (i.footer = { ...i.footer!, address: v }) },
  { name: "footer reason", set: (i, v) => (i.footer = { ...i.footer!, reason: v }) },
  { name: "preference link label", set: (i, v) => (i.footer = { ...i.footer!, preferenceLink: { label: v, url: "https://example.com/prefs" } }) },
  { name: "brand name (header text)", audiences: ["consumer", "pro"], set: (i, v) => (i.brand = { name: v }) },
];

const THRESHOLD = 40;
const CHUNK = 10;
const WBR = "<wbr>";
const segmenter = new (Intl as unknown as {
  Segmenter: new (l?: string, o?: { granularity: string }) => { segment(t: string): Iterable<{ segment: string }> };
}).Segmenter(undefined, { granularity: "grapheme" });
const graphemes = (t: string): string[] => Array.from(segmenter.segment(t), (g) => g.segment);
/** The html with every <wbr> taken out: it must read as the input does. */
const noWbr = (html: string): string => html.split(WBR).join("");
/** The test's own chunker, on already-safe ASCII: 10 characters, then <wbr>. */
const chunkAscii = (run: string): string => run.match(/.{1,10}/g)!.join(WBR);

function inputWith(audience: RelloEmailAudience, slot: Slot, v: string): RelloEmailInput {
  const input = base(audience);
  slot.set(input, v);
  return input;
}

describe("v2.36.0: a long unbroken run gets break points in every caller-text slot", () => {
  for (const audience of AUDIENCES) {
    for (const slot of SLOTS) {
      if (slot.audiences && !slot.audiences.includes(audience)) continue;
      it(`${audience}: ${slot.name} is chunked, and whole without the <wbr>`, () => {
        const html = renderRelloEmail(inputWith(audience, slot, RUN)).html;
        expect(html, "the run is chunked, 10 characters at a time").toContain(chunkAscii((slot.prefix ?? "") + RUN));
        expect(noWbr(html), "the run is whole without the <wbr>").toContain(RUN);
      });
    }
  }

  it("the check can fail: with the <wbr> taken out the slot holds the run in one piece", () => {
    const html = noWbr(renderRelloEmail(inputWith("consumer", SLOTS.find((s) => s.name === "card value")!, RUN)).html);
    expect(html).not.toContain(chunkAscii(RUN));
  });

  it("the threshold: 39 characters are left alone, 40 are chunked", () => {
    const at = (n: number) =>
      renderRelloEmail({ ...base("consumer"), card: { title: "T", rows: [{ label: "Budget", value: "z".repeat(n) }] } }).html;
    expect(at(THRESHOLD - 1)).not.toContain(WBR);
    expect(at(THRESHOLD)).toContain(`${"z".repeat(10)}${WBR}${"z".repeat(10)}${WBR}${"z".repeat(10)}${WBR}${"z".repeat(10)}`);
    expect(at(THRESHOLD).split(WBR).length - 1).toBe(3);
  });

  it("a run is counted by whole characters: 39 emoji are left alone, 40 are chunked", () => {
    const at = (n: number) =>
      renderRelloEmail({ ...base("consumer"), card: { title: "T", rows: [{ label: "Budget", value: "🏠".repeat(n) }] } }).html;
    expect(at(THRESHOLD - 1)).not.toContain(WBR);
    expect(at(THRESHOLD).split(WBR).length - 1).toBe(3);
  });

  it("ordinary mail gets no <wbr>: prose, a URL in a sentence, a normal address, a long word", () => {
    const prose = "Your communications and acknowledgement preferences will be reviewed by our representative. ".repeat(4);
    for (const audience of AUDIENCES) {
      const input = base(audience);
      input.paragraphs = [prose, "See https://example.com/a/path?x=1&y=2 for more."];
      input.card = { title: "T", rows: [
        { label: "telecommunications", value: prose },
        { label: "Email", value: "firstname.lastname@examplemortgage.com" },
        { label: "Word", value: "pneumonoultramicroscopicsilicovolcanoconios".slice(0, 39) },
      ] };
      expect(renderRelloEmail(input).html, audience).not.toContain(WBR);
    }
  });

  it("an entity is never cut: a long run of & and of < keeps every entity whole", () => {
    for (const [raw, entity] of [["&", "&amp;"], ["<", "&lt;"], [">", "&gt;"], ['"', "&quot;"], ["'", "&#39;"]] as const) {
      const run = raw.repeat(900);
      for (const audience of AUDIENCES) {
        const html = renderRelloEmail({ ...base(audience), paragraphs: [run], card: { title: "T", rows: [{ label: "Budget", value: run }] } }).html;
        expect(noWbr(html).split(entity.repeat(900)).length - 1, `${raw} ${audience}`).toBe(2);
        expect(html, `${raw} ${audience}: no <wbr> inside an entity`).not.toMatch(/&[#a-z0-9]*<wbr>/i);
        expect(html, `${raw} ${audience}: no bare & left`).not.toMatch(/&(?!amp;|lt;|gt;|quot;|#39;)/);
      }
    }
  });

  it("an emoji, a flag, a family emoji and a combining mark are never cut", () => {
    const pieces = ["😀", "🇺🇸", "👨‍👩‍👧‍👦", "e\u0301", "👍🏽", "1\uFE0F\u20E3"];
    for (const piece of pieces) {
      const run = piece.repeat(60);
      const html = renderRelloEmail({ ...base("pro"), card: { title: "T", rows: [{ label: "Budget", value: run }] } }).html;
      expect(noWbr(html), piece).toContain(run);
      const at = html.indexOf(piece);
      const cell = html.slice(at, html.indexOf("</td>", at));
      const parts = cell.split(WBR);
      expect(parts.length, piece).toBe(6);
      const cuts = new Set<number>();
      let sum = 0;
      for (const g of graphemes(run)) { sum += g.length; cuts.add(sum); }
      let cut = 0;
      for (const part of parts.slice(0, -1)) {
        cut += part.length;
        expect(cuts.has(cut), `${piece}: a cut at ${cut} falls on a character boundary`).toBe(true);
        expect(graphemes(part).length, `${piece}: 10 characters a chunk`).toBe(10);
      }
    }
  });

  it("adds no character: no zero-width character in the html or the text part, and the text part is untouched", () => {
    const zeroWidth = /[\u200B\u200C\u200D\u2060\uFEFF\u00AD]/;
    for (const audience of AUDIENCES) {
      const input = base(audience);
      input.card = { title: "T", rows: [{ label: "Budget", value: RUN }] };
      input.paragraphs = [RUN];
      const out = renderRelloEmail(input);
      expect(out.html, audience).not.toMatch(zeroWidth);
      expect(out.text, audience).not.toMatch(zeroWidth);
      expect(out.text, audience).not.toContain(WBR);
      expect(out.text, audience).toContain(`Budget: ${RUN}`);
    }
  });

  it("\\n still becomes <br> in a paragraph and a card value", () => {
    const html = renderRelloEmail({ ...base("consumer"), paragraphs: [`${RUN.slice(0, 50)}\nsecond line`], card: { title: "T", rows: [{ label: "Budget", value: `a\n${RUN.slice(0, 50)}` }] } }).html;
    expect(html).toContain("<br>second line");
    expect(html).toContain(`a<br>${chunkAscii(RUN.slice(0, 50))}`);
  });

  it("never touches an attribute: the button URL, a link href and the logo alt stay whole", () => {
    const longUrl = `https://example.com/${RUN}`;
    const html = renderRelloEmail({
      ...base("consumer"),
      button: { label: "Go", url: longUrl },
      secondaryLink: { label: "Talk", url: longUrl },
      moreLinks: [{ label: "More", url: longUrl }],
      footer: { ...base("consumer").footer!, preferenceLink: { label: "Prefs", url: longUrl } },
    }).html;
    expect(html.split(`href="${longUrl}"`).length - 1).toBe(5);
    for (const m of html.matchAll(/<[^>]*>/g)) if (m[0] !== WBR) expect(m[0], "a tag").not.toContain(WBR);
  });
});

/**
 * TE-1052: a run ends at every character a browser can already wrap a line at, not just ASCII space.
 * The set was measured in headless Chromium (paste-back evidence a4-343/chars-results.json). Code points
 * are written as numbers, never as escapes in a string, so no tool can turn one into a plain space.
 */
const range = (from: number, to: number): number[] => Array.from({ length: to - from + 1 }, (_, i) => from + i);
const BREAKING_SEPARATORS: number[] = [0x09, 0x0a, 0x0d, 0x20, 0x85, 0x1680, ...range(0x2000, 0x2006), ...range(0x2008, 0x200b), 0x2028, 0x2029, 0x205f, 0x3000];
const NON_BREAKING: number[] = [0xa0, 0x2007, 0x202f, 0x2060, 0xfeff, 0x0b, 0x0c, 0x200c, 0x200d, 0x180e];
const hex = (cp: number): string => `U+${cp.toString(16).toUpperCase().padStart(4, "0")}`;
const SENTENCE = "Your communications and acknowledgement preferences will be reviewed by our representative.".split(" ");

function mailWith(audience: RelloEmailAudience, value: string): string {
  const input = base(audience);
  input.paragraphs = [value];
  input.card = { title: "T", rows: [{ label: "Details", value }] };
  return renderRelloEmail(input).html;
}

describe("v2.36.0: a sentence spaced with a breaking space is ordinary prose (TE-1052)", () => {
  for (const cp of BREAKING_SEPARATORS) {
    it(`${hex(cp)} ends a run: the sentence gets no <wbr> in a paragraph or a card value, in every audience`, () => {
      const sentence = SENTENCE.join(String.fromCodePoint(cp));
      expect(Array.from(sentence).length, "the sentence is longer than the threshold").toBeGreaterThan(THRESHOLD);
      for (const audience of AUDIENCES) expect(mailWith(audience, sentence), `${hex(cp)} ${audience}`).not.toContain(WBR);
    });
  }

  for (const cp of NON_BREAKING) {
    it(`${hex(cp)} does not end a run: 45 characters of words joined by it are one run and get the <wbr>`, () => {
      const run = ["alpha", "bravo", "delta", "gamma", "kappa", "omega", "sigma", "theta", "zeta1"].join(String.fromCodePoint(cp));
      expect(Array.from(run).length).toBe(45 + 8);
      const html = mailWith("consumer", run);
      expect(html, hex(cp)).toContain(WBR);
      expect(noWbr(html), "no character lost").toContain(run);
    });
  }

  it("a long run between breaking spaces is still chunked: only the run, not the words around it", () => {
    const html = mailWith("consumer", `before${String.fromCodePoint(0x2003)}${"q".repeat(60)}${String.fromCodePoint(0x2003)}after`);
    expect(html).toContain(`${"q".repeat(10)}${WBR}${"q".repeat(10)}`);
    expect(html.split(WBR).length - 1, "six chunks of ten = five breaks, in the paragraph and again in the card value").toBe(10);
  });
});
