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
 *
 * TE-1262 (whole or nothing): the span covers the WHOLE run that holds an address, so no part of a
 * 40+ run is left outside it unbroken; text glued to the address sits inside the same span, in the
 * same place, chunked as TE-1043 chunks it only when that piece is itself 40+ graphemes. A host's
 * ending is its LAST dotted label: a.b.c.123 and a.b.c.ref2026 are not addresses at all.
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
    it(`${c.name}: whole, its whole run in the wrap span, punctuation where the caller put it, visible text unchanged`, () => {
      const text = c.before + c.address + c.after;
      const out = renderRelloEmail(input(text));
      const html = body(out.html);
      // The run holding the address (with any glued punctuation) is one span; the address is one escaped
      // piece, no <wbr> anywhere inside it.
      const pre = c.before.split(" ").pop() ?? "";
      const post = c.after.split(" ")[0];
      expect(html).toContain(WRAP + escapeEmailHtml(pre + c.address + post) + "</span>");
      expect(html).not.toMatch(/<wbr>/);
      expect(visible(html)).toBe(text);
      // The text part carries the caller's words exactly.
      expect(out.text).toContain(text);
    });
  }

  // v2.37.0's chunking of an ASCII run: a <wbr> after every 10 characters.
  const chunked = (run: string) => (run.match(/.{1,10}/g) ?? []).map(escapeEmailHtml).join("<wbr>");

  it("a long run that is not an address keeps TE-1043's <wbr> every 10 characters, exactly as before", () => {
    for (const run of [
      "a".repeat(45),
      // no dot
      "tel:+18015550100;ext=123456789012345678901234567890",
      // last label numeric, or letters mixed with digits
      "version-2.37.0-of-the-shared-email-renderer-and-friends",
      "10.0.0.1/admin/this-is-a-very-long-path-to-chunk-up",
      "ref-2026.07a-and-a-long-tail-that-goes-on-and-on-and-on",
      "build.v2/artifacts/a-very-long-file-name-without-end",
      // letters glued onto a scheme
      "Visithttps://example.com/a-long-path-of-text",
      `${"N".repeat(45)}https://example.com/mortgages/options/for/homebuyers`,
      // a Windows path
      "C:\\Users\\kelly\\Documents\\a-very-long-windows-path.docx",
      // ftp: and other schemes: the host follows a "/"
      "ftp://files.example.com/pub/a-very-long-file-name.tar.gz",
    ]) {
      expect(body(renderRelloEmail(input(`x ${run} y`)).html)).toBe(`x ${chunked(run)} y`);
    }
  });

  it("a caller's line break inside an address stands: each line is its own run, as before", () => {
    const text = "https://example.com/mortgages/\noptions/for/homebuyers/verylongunbrokentail1234567890";
    const [first, second] = text.split("\n");
    expect(body(renderRelloEmail(input(text)).html)).toBe(`${escapeEmailHtml(first)}<br>${chunked(second)}`);
  });

  it("rule 2's accepted cost: a long dotted file name ending in letters is kept whole in the span", () => {
    const run = "averyveryverylongreportname-final-version.pdf";
    expect(body(renderRelloEmail(input(run)).html)).toBe(`${WRAP}${run}</span>`);
  });

  it("an address inside a longer run: one span over the whole run, the address whole, the long rest still chunked", () => {
    const junk = "z".repeat(42);
    const html = body(renderRelloEmail(input(`${junk}(https://example.com/abc)`)).html);
    expect(html).toBe(`${WRAP}zzzzzzzzzz<wbr>zzzzzzzzzz<wbr>zzzzzzzzzz<wbr>zzzzzzzzzz<wbr>zz(https://example.com/abc)</span>`);
  });

  it("trailing punctuation is not part of the address: 40+ closing marks after it are still chunked", () => {
    const url = "https://example.com/mortgages/options";
    const html = body(renderRelloEmail(input(url + "!".repeat(45))).html);
    expect(html).toBe(`${WRAP}${url}${(("!".repeat(45)).match(/.{1,10}/g) ?? []).join("<wbr>")}</span>`);
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

describe("TE-1260 / TE-1261: any alphabetic or punycode host ending, and Unicode after a scheme (AUDIT 30 fixtures)", () => {
  // One run: the span covers all of it (TE-1262), the address is a contiguous escaped piece inside.
  const whole = (text: string, address: string, before = "", after = "") => {
    expect(before + address + after).toBe(text);
    const html = body(renderRelloEmail(input(text)).html);
    expect(html).toBe(`${WRAP}${escapeEmailHtml(text)}</span>`);
    expect(html).toContain(escapeEmailHtml(address));
    expect(html).not.toMatch(/<wbr>/);
    expect(visible(html)).toBe(text);
  };

  it("TE-1260: a bare host on an ending outside the old list is one address", () => {
    for (const a of [
      "verylongmortgagebrokerage.realestate/options/for/homebuyers",
      "verylongmortgagebrokerage.xyz/options/for/homebuyers",
      "verylongmortgagebrokerage.mortgagebrokers",
      "verylongmortgagebrokerage.us.com/options/for/homebuyers",
    ]) whole(a, a);
  });

  it("TE-1260: a bare punycode host is one address", () => {
    whole("xn--bcher-kva.de/mortgages/options/for/homebuyers", "xn--bcher-kva.de/mortgages/options/for/homebuyers");
    whole("verylongmortgagebrokerage.xn--p1ai/options/for/buyers", "verylongmortgagebrokerage.xn--p1ai/options/for/buyers");
  });

  it("TE-1260: a bare Unicode host is one address, its full stop after it in the same run", () => {
    whole("bücher-und-hypotheken.de/finanzierung/für-käufer.", "bücher-und-hypotheken.de/finanzierung/für-käufer", "", ".");
    whole("Siehe:hypothekenberatung.ελλάδα/προσφορές/για-αγοραστές", "hypothekenberatung.ελλάδα/προσφορές/για-αγοραστές", "Siehe:");
  });

  it("TE-1261: Unicode after https:// stays in the address (IDN host and path)", () => {
    whole("https://bücher.de/mortgages/options/for/homebuyers", "https://bücher.de/mortgages/options/for/homebuyers");
    whole("(https://bücher.de/hypotheken/optionen/für/käufer)", "https://bücher.de/hypotheken/optionen/für/käufer", "(", ")");
    whole("www.bücher.de/hypotheken/optionen/für/käufer/und/mehr", "www.bücher.de/hypotheken/optionen/für/käufer/und/mehr");
  });

  it("TE-1261: the run-on stops at < > and \" and trailing quotes and closers are not part of the address", () => {
    const html = body(renderRelloEmail(input('https://example.com/mortgages?a=1&b=2<item>"\'suffix')).html);
    expect(html).toBe(`${WRAP}https://example.com/mortgages?a=1&amp;b=2&lt;item&gt;&quot;&#39;suffix</span>`);
    // A 40+ tail after < is chunked, so the address did stop there.
    const tail = "x".repeat(45);
    expect(body(renderRelloEmail(input(`https://example.com/a?b=1<${tail}`)).html)).toBe(
      `${WRAP}https://example.com/a?b=1${(("<" + tail).match(/.{1,10}/g) ?? []).map(escapeEmailHtml).join("<wbr>")}</span>`,
    );
    // Closing quotation marks: 40+ of them after an address are chunked, not taken into it.
    const quotes = String.fromCodePoint(0xbb).repeat(45);
    expect(body(renderRelloEmail(input(`https://example.com/mortgages${quotes}`)).html)).toBe(
      `${WRAP}https://example.com/mortgages${(quotes.match(/.{1,10}/g) ?? []).join("<wbr>")}</span>`,
    );
    whole("«https://bücher.de/hypotheken/optionen/für/käufer»", "https://bücher.de/hypotheken/optionen/für/käufer", "«", "»");
  });
});

describe("AUDIT 30's 27 shapes (pastebacks/evidence/audit30-582/shapes.json), verbatim", () => {
  // [name, input, is an address]. tel (no dot), prefix (letters glued onto the scheme) and newline
  // (the caller's break) keep TE-1043's chunking; balancedBare is a run under 40 characters.
  const SHAPES: Array<[string, string, boolean]> = [
    ["uppercase", "HTTPS://WWW.EXAMPLE.COM/mortgage/options/for/buyers", true],
    ["www", "WWW.EXAMPLE.COM/mortgage/options/for/buyers", true],
    ["query", "https://example.com/mortgages?city=Sandy&amount=250000#estimate", true],
    ["percent", "https://example.com/my%20home/loan%2Foptions/%E2%82%AC", true],
    ["balancedBare", "(en.wikipedia.org/wiki/Foo_(bar))", false],
    ["balanced", "https://en.wikipedia.org/wiki/Foo_(bar)/long_reference", true],
    ["parenthesis", "(https://example.com/mortgages/options/for/homebuyers)", true],
    ["quotes", "\"https://example.com/mortgages/options/for/homebuyers\"", true],
    ["angle", "<https://example.com/mortgages/options/for/homebuyers>", true],
    ["tailQuote", "https://example.com/mortgages/options/for/homebuyers\").", true],
    ["tailPeriod", "https://example.com/mortgages/options/for/homebuyers.)", true],
    ["tailQuestion", "https://example.com/mortgages/options/for/homebuyers?!", true],
    ["mailto", "mailto:loanofficer+homebuyer@verylongmortgagecompany.com", true],
    ["tel", "tel:+18015550100;ext=123456789012345678901234567890", false],
    ["plus", "loanofficer+homebuyer@verylongmortgagecompany.com", true],
    ["realestate", "verylongmortgagebrokerage.realestate/options/for/homebuyers", true],
    ["xyz", "verylongmortgagebrokerage.xyz/options/for/homebuyers", true],
    ["uscom", "verylongmortgagebrokerage.us.com/options/for/homebuyers", true],
    ["cc", "verylongmortgagebrokerage.co.uk/options/for/homebuyers", true],
    ["prefix", "NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNhttps://example.com/mortgages/options/for/homebuyers", false],
    ["two", "https://example.com/mortgages/options,https://other.com/mortgages/options", true],
    ["twoDelimited", "(https://example.com/mortgages/options)(https://other.com/mortgages/options)", true],
    ["newline", "https://example.com/mortgages/\noptions/for/homebuyers/verylongunbrokentail1234567890", false],
    ["puny", "https://xn--bcher-kva.example/mortgages/options/for/homebuyers", true],
    ["punyBare", "xn--bcher-kva.de/mortgages/options/for/homebuyers", true],
    ["idn", "https://bücher.de/mortgages/options/for/homebuyers", true],
    ["escapes", "https://example.com/mortgages?a=1&b=2<item>\"'suffix", true],
  ];
  for (const [name, text, isAddress] of SHAPES) {
    it(`${name}: ${isAddress ? "one or more whole addresses, no <wbr>" : "as at v2.37.0"}`, () => {
      const html = body(renderRelloEmail(input(text)).html);
      expect(visible(html.replace(/<br>/g, "\n"))).toBe(text);
      if (isAddress) {
        expect(html).not.toMatch(/<wbr>/);
        expect(html).toContain(WRAP);
      } else {
        expect(html).not.toContain(WRAP);
      }
    });
  }
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

describe("TE-1262: the host's ending is its LAST label; whole or nothing (AUDIT 30, pastebacks/evidence/audit30-591)", () => {
  // v2.37.0's chunking of an ASCII run: a <wbr> after every 10 characters.
  const chunked = (run: string) => (run.match(/.{1,10}/g) ?? []).map(escapeEmailHtml).join("<wbr>");
  const NUMERIC_FINAL = "mortgage.application.processing.123456789012345678901";
  const MIXED_FINAL = "mortgage.application.processing.reference2026";
  // The last label "D" is one letter, so this is no address either; 40397456 spanned "…Number.Ph" only.
  const ABBREVIATION = "MortgageApplicationReferenceNumber.Ph.D.";

  it("a dotted run whose last label is numeric or mixed is not an address: byte-equal to v2.37.0", () => {
    for (const run of [NUMERIC_FINAL, MIXED_FINAL, ABBREVIATION]) {
      expect(body(renderRelloEmail(input(run)).html)).toBe(chunked(run));
      expect(body(renderRelloEmail(input(`See ${run} today.`)).html)).toBe(`See ${chunked(run)} today.`);
    }
  });

  it("the same in a card value (RELLO-E43's buildCriticalDriftEmail metadata card)", () => {
    for (const run of [NUMERIC_FINAL, MIXED_FINAL]) {
      const html = renderRelloEmail({ ...input("Hi."), card: { title: "Details", rows: [{ label: "Reference", value: run }] } }).html;
      expect(html).toContain(chunked(run));
      expect(html).not.toContain(WRAP);
    }
  });

  it("a sentence's full stop still ends the host; a dotted host with a letter ending is still one address", () => {
    const run = "mortgage.application.processing.example";
    expect(body(renderRelloEmail(input(`See ${run}. Then call.`)).html)).toBe(`See ${WRAP}${run}.</span> Then call.`);
    expect(body(renderRelloEmail(input(`${run}/review`)).html)).toBe(`${WRAP}${run}/review</span>`);
  });

  it("no span ever covers part of a run: every span is a whole whitespace-delimited run", () => {
    const runs = [
      NUMERIC_FINAL, MIXED_FINAL, ABBREVIATION,
      `${NUMERIC_FINAL}/x`, `(see:${MIXED_FINAL})`,
      "LongMortgageApplicationIdentifier.Reference<item>\"'&value",
      "customer.account.application.getMortgageDecision()",
      "https://example.com/abc" + "9".repeat(30) + "<" + "8".repeat(30),
      "z".repeat(42) + "(https://example.com/abc)",
      "https://example.com/a,https://example.com/b" + ")".repeat(45),
      "Application.profile.employment.currentEmployerDisplayName",
      URL90 + "." + "1".repeat(39),
    ];
    for (const run of runs) {
      const html = body(renderRelloEmail(input(`a ${run} b`)).html);
      const spans = html.split(WRAP).length - 1;
      if (spans === 0) {
        expect(html).toBe(`a ${(run.length >= 40 ? chunked(run) : escapeEmailHtml(run))} b`);
        continue;
      }
      expect(spans).toBe(1);
      expect(html.startsWith(`a ${WRAP}`)).toBe(true);
      expect(html.endsWith("</span> b")).toBe(true);
      expect(visible(html)).toBe(`a ${run} b`);
    }
  });
});
