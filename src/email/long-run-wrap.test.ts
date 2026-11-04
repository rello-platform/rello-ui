// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import { renderRelloEmail, type RelloEmailAudience, type RelloEmailInput } from "./index";
import { WRAP_STYLE } from "../test/email-logo-baseline";

/**
 * v2.36.0: a long unbroken run in any caller-text slot must not stretch the email
 * (TE-1043: 900 characters made a 600 px email 6,519 px wide). jsdom has no layout,
 * so this proves the structural half: every slot's text sits inside an element whose
 * style carries the wrap. The measured half (headless Chromium at 700 and 375 px, all
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

type Slot = { name: string; audiences?: RelloEmailAudience[]; set: (i: RelloEmailInput, v: string) => void };
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
  { name: "signer NMLS", set: (i, v) => (i.signer = { ...i.signer!, nmls: v }) },
  { name: "signer phone", set: (i, v) => (i.signer = { ...i.signer!, phone: v }) },
  { name: "signer reply line", set: (i, v) => (i.signer = { ...i.signer!, replyLine: v }) },
  { name: "footer company", set: (i, v) => (i.footer = { ...i.footer!, companyName: v }) },
  { name: "footer NMLS", set: (i, v) => (i.footer = { ...i.footer!, companyNmls: v }) },
  { name: "footer address", set: (i, v) => (i.footer = { ...i.footer!, address: v }) },
  { name: "footer reason", set: (i, v) => (i.footer = { ...i.footer!, reason: v }) },
  { name: "preference link label", set: (i, v) => (i.footer = { ...i.footer!, preferenceLink: { label: v, url: "https://example.com/prefs" } }) },
  { name: "brand name (header text)", audiences: ["consumer", "pro"], set: (i, v) => (i.brand = { name: v }) },
];

/** The element that directly holds the run, then every ancestor, nearest first. */
function ancestorsHolding(html: string, run: string): HTMLElement[] {
  const doc = new DOMParser().parseFromString(html, "text/html");
  const walker = doc.createTreeWalker(doc.body, NodeFilter.SHOW_TEXT);
  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    if (!(n.nodeValue ?? "").includes(run)) continue;
    const chain: HTMLElement[] = [];
    for (let el = n.parentElement; el && el !== doc.body; el = el.parentElement) chain.push(el);
    return chain;
  }
  return [];
}

describe("v2.36.0: a long unbroken run wraps in every caller-text slot", () => {
  for (const audience of AUDIENCES) {
    for (const slot of SLOTS) {
      if (slot.audiences && !slot.audiences.includes(audience)) continue;
      it(`${audience}: ${slot.name} sits inside an element that carries the wrap`, () => {
        const input = base(audience);
        slot.set(input, RUN);
        const html = renderRelloEmail(input).html;
        const chain = ancestorsHolding(html, RUN);
        expect(chain.length, "the run is in the html").toBeGreaterThan(0);
        expect(chain.some((el) => (el.getAttribute("style") ?? "").includes(WRAP_STYLE)), "an ancestor carries the wrap").toBe(true);
      });
    }
  }

  it("the check can fail: without the wrap style the same slot has no wrap", () => {
    const html = renderRelloEmail({ ...base("consumer"), card: { title: "T", rows: [{ label: "Budget", value: RUN }] } }).html.split(WRAP_STYLE).join("");
    expect(ancestorsHolding(html, RUN).some((el) => (el.getAttribute("style") ?? "").includes(WRAP_STYLE))).toBe(false);
  });

  it("loses no character and adds no zero-width one: the run is whole in the html and the text part", () => {
    const zeroWidth = /[​‌‍⁠﻿­]/;
    for (const audience of AUDIENCES) {
      const input = base(audience);
      input.card = { title: "T", rows: [{ label: "Budget", value: RUN }] };
      input.paragraphs = [RUN];
      const out = renderRelloEmail(input);
      expect(out.html.split(RUN).length - 1, audience).toBe(2);
      expect(out.text, audience).toContain(`Budget: ${RUN}`);
      expect(out.html, audience).not.toMatch(zeroWidth);
      expect(out.text, audience).not.toMatch(zeroWidth);
    }
  });

  it("emoji pass through whole: no zero-width character is added", () => {
    const emoji = Array.from({ length: 900 }, (_, i) => ["😀", "🏠", "🔑", "💰"][i % 4]).join("");
    const out = renderRelloEmail({ ...base("consumer"), card: { title: "T", rows: [{ label: "Budget", value: emoji }] } });
    expect(out.html).toContain(emoji);
    expect(out.html).not.toMatch(/[​‌‍⁠﻿­]/);
  });
});
