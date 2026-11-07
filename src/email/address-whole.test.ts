// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import { escapeEmailHtml, renderRelloEmail, type RelloEmailInput } from "./index";

/**
 * v2.37.1 (TE-1189, TE-1187). TE-1043's <wbr> every 10 characters split web addresses
 * that callers write as text, and Gmail web then linked a fragment ("nance.gov/",
 * "https://ww"). An address in a run TE-1043 would have chunked is now emitted whole
 * inside a span that may break only where a line must; a long run with no address keeps
 * its <wbr> as before; a long unbroken signer name gets the same span. jsdom has no
 * layout: the measured half (headless Chromium, 375 and 700 px) is in the paste-back's
 * evidence.
 */
const WRAP = '<span style="overflow-wrap:anywhere;word-break:break-word;">';

function input(paragraph: string, signerName = "Kelly Sansom"): RelloEmailInput {
  return {
    audience: "consumer",
    app: "pathfinder-pro",
    companyName: "ClearPath Utah Mortgage",
    subject: "Your HECM summary",
    headline: "Your summary",
    paragraphs: [paragraph],
    signer: { name: signerName, title: "Loan Officer" },
  };
}

function body(html: string): string {
  const m = /<p style="margin:0 0 0;">([\s\S]*?)<\/p>/.exec(html);
  if (!m) throw new Error("paragraph not found");
  return m[1];
}

function visible(fragment: string): string {
  const el = document.createElement("div");
  el.innerHTML = fragment;
  return el.textContent ?? "";
}

const URL90 = "https://www.consumerfinance.gov/find-a-housing-counselor/?state=UT&city=Sandy&radius=25&lang=en";
const CASES: Array<{ name: string; before: string; address: string; after: string }> = [
  { name: "https:// address", before: "Read ", address: URL90, after: " today." },
  { name: "http:// address in parentheses", before: "(see ", address: "http://example-lending.com/rates/2026-11-07/hecm-summary", after: ")" },
  { name: "www. address with a trailing comma", before: "Go to ", address: "www.consumerfinance.gov/find-a-housing-counselor", after: ", then call." },
  { name: "bare domain with a path and a full stop (the PFP HECM sentence)", before: "You can find one at ", address: "consumerfinance.gov/find-a-housing-counselor", after: "." },
  { name: "bare domain alone", before: "Visit ", address: "the-very-long-subdomain-name.clearpathutahmortgage.com", after: "!" },
  { name: "email address", before: "Write to ", address: "kellydavidsansom+rello-member-261103@clearpathutah.com", after: "." },
  { name: "address glued after a colon", before: "Link:", address: "https://example.com/a/very/long/path/that/keeps/going", after: "" },
];

describe("TE-1189: an address in caller text is never split", () => {
  for (const c of CASES) {
    it(`${c.name}: whole, in the wrap span, punctuation where the caller put it, visible text unchanged`, () => {
      const text = c.before + c.address + c.after;
      const out = renderRelloEmail(input(text));
      const html = body(out.html);
      // The address is one escaped piece, no <wbr> anywhere inside it.
      expect(html).toContain(WRAP + escapeEmailHtml(c.address) + "</span>" + escapeEmailHtml(c.after));
      expect(html).not.toMatch(/<wbr>/);
      expect(visible(html)).toBe(text);
      // The text part carries the caller's words exactly.
      expect(out.text).toContain(text);
    });
  }

  it("a long run that is not an address keeps TE-1043's <wbr> every 10 characters, exactly as before", () => {
    for (const run of [
      "a".repeat(45),
      "report-2026-11-07-final-version-of-the-hecm-summary.pdf",
      "version-2.37.0-of-the-shared-email-renderer-and-friends",
      "ftp://files.example.com/pub/a-very-long-file-name.tar.gz",
      "averyveryverylongword.notatld/with-a-path-that-goes-on",
    ]) {
      const html = body(renderRelloEmail(input(`x ${run} y`)).html);
      const chunks = run.match(/.{1,10}/g) ?? [];
      expect(html).toBe(`x ${chunks.map(escapeEmailHtml).join("<wbr>")} y`);
    }
  });

  it("an address inside a longer run: the address is whole, the long rest is still chunked", () => {
    const junk = "z".repeat(42);
    const html = body(renderRelloEmail(input(`${junk}(https://example.com/abc)`)).html);
    expect(html).toBe(`zzzzzzzzzz<wbr>zzzzzzzzzz<wbr>zzzzzzzzzz<wbr>zzzzzzzzzz<wbr>zz(${WRAP}https://example.com/abc</span>)`);
  });

  it("letters before a scheme make it part of a word, not an address: chunked as before", () => {
    const run = "Visithttps://example.com/a-long-path-of-text";
    const html = body(renderRelloEmail(input(run)).html);
    expect(html).toBe((run.match(/.{1,10}/g) ?? []).map(escapeEmailHtml).join("<wbr>"));
  });

  it("& in an address is escaped and the address stays one piece", () => {
    const url = "https://example.com/search?state=UT&city=Sandy&county=Salt-Lake";
    const html = body(renderRelloEmail(input(url)).html);
    expect(html).toBe(`${WRAP}${url.replace(/&/g, "&amp;")}</span>`);
  });

  it("an address under 40 characters in a short run is untouched (no span)", () => {
    const html = body(renderRelloEmail(input("Visit consumerfinance.gov/counselor today.")).html);
    expect(html).toBe("Visit consumerfinance.gov/counselor today.");
  });

  it("the same rule holds in a card value and in the footer", () => {
    const out = renderRelloEmail({
      ...input("Hi."),
      card: { title: "Links", rows: [{ label: "Counselor", value: URL90 }] },
      footer: { companyName: "ClearPath", reason: `Questions? ${URL90}` },
    });
    expect(out.html.split(WRAP + escapeEmailHtml(URL90) + "</span>").length - 1).toBe(2);
    expect(out.html).not.toMatch(/<wbr>/);
  });
});

describe("TE-1187: a long unbroken signer name wraps where it must", () => {
  const name = (html: string) => {
    const m = /<td valign="top" style="font-size:14px;line-height:1.5;"><b>([\s\S]*?)<\/b>/.exec(html);
    if (!m) throw new Error("signer name not found");
    return m[1];
  };

  it("a 36-character name gets the wrap span; its visible text is unchanged", () => {
    for (const n of ["kellydavidsansom+rello-member-261103", "kellydavidsansomrellomember261103abc"]) {
      const html = name(renderRelloEmail(input("Hi.", n)).html);
      expect(html).toBe(`${WRAP}${escapeEmailHtml(n)}</span>`);
      expect(visible(html)).toBe(n);
    }
  });

  it("an ordinary name renders exactly as before (no span)", () => {
    for (const n of ["Kelly Sansom", "María José García-López", "Bartholomew Montgomery-Smythe", "O'Neil & Sons"]) {
      expect(name(renderRelloEmail(input("Hi.", n)).html)).toBe(escapeEmailHtml(n));
    }
  });

  it("the threshold is a 16-grapheme run", () => {
    expect(name(renderRelloEmail(input("Hi.", "W".repeat(15))).html)).toBe("W".repeat(15));
    expect(name(renderRelloEmail(input("Hi.", "W".repeat(16))).html)).toBe(`${WRAP}${"W".repeat(16)}</span>`);
  });
});
