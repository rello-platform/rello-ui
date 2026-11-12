import { describe, expect, it } from "vitest";
import fixture from "./fixtures/v2.40.0-before-spotlight.json";
import { relloEmailContrast, renderRelloEmail, type RelloEmailInput, type RelloEmailSpotlight } from "./index";
import { baselineInput, sha256 } from "../test/email-logo-baseline";
import { v240Cases } from "../test/email-v240-cases";

/**
 * v2.41.0 `spotlight` (Kelly 2026-11-11: "look how rascal spotlights the rate? We need to do that").
 * One large figure as the hero, an optional secondary at the same size (a rate's APR, Reg Z 1026.24),
 * a change line, a two-column fact grid, a note, and disclosures under the panel.
 */

const FIGURE = "font-size:40px;line-height:1.1;font-weight:800;color:#111827;letter-spacing:-0.01em;";

const RATE: RelloEmailSpotlight = {
  label: "Today's offered rate",
  value: "7.50%",
  secondary: "7.53% APR",
  change: "▼ Down 0.25 from 7.75%",
  facts: [
    { value: "$2,184/mo", label: "Principal & interest" },
    { value: "30 years", label: "Term" },
    { value: "0.5", label: "Points" },
  ],
  note: "30-year fixed, $400,000 loan, 20% down, 740 credit\nFrom Example Lending, NMLS #12345",
  disclosures: ["Disclosure one.", "Disclosure two.", "Disclosure three."],
};

function consumer(spotlight: RelloEmailSpotlight | null | undefined, extra: Partial<RelloEmailInput> = {}): RelloEmailInput {
  return { ...baselineInput("home-scout", "consumer"), spotlight, ...extra };
}

/** Every `<span style="…">` that draws a figure at hero size, with its style and inner html. */
function figureSpans(html: string): Array<{ style: string; inner: string }> {
  return [...html.matchAll(/<span style="(font-size:40px;[^"]*)">([^<]*)<\/span>/g)].map((m) => ({ style: m[1], inner: m[2] }));
}

describe("v2.41.0 spotlight: absent, null or empty renders byte for byte as v2.40.0", () => {
  const renders = fixture.renders as Record<string, { html: string; text: string }>;
  const cases = v240Cases();

  it("the corpus is the one the fixture was written from", () => {
    expect(cases.length).toBe(fixture.count);
    expect(cases.length).toBe(627);
    expect(Object.keys(renders).sort()).toEqual(cases.map((c) => c.id).sort());
  });

  const empties: Record<string, RelloEmailSpotlight | null | undefined> = {
    absent: undefined,
    null: null,
    "empty value": { value: "" },
    "nothing to show": {
      value: "  ",
      secondary: "",
      label: "A label alone",
      change: "▲ A change alone",
      note: "A note alone",
      facts: [{ value: "", label: "No value" }, { value: "No label", label: " " }],
      disclosures: [],
    },
  };
  for (const [name, spotlight] of Object.entries(empties)) {
    it(`${name}: all ${cases.length} cases`, () => {
      let compared = 0;
      for (const c of cases) {
        const input = name === "absent" ? c.input : { ...c.input, spotlight };
        const r = renderRelloEmail(input);
        expect(sha256(r.html), `${c.id} html`).toBe(renders[c.id].html);
        expect(sha256(r.text), `${c.id} text`).toBe(renders[c.id].text);
        compared++;
      }
      expect(compared).toBe(627);
    });
  }
});

describe("spotlight HTML", () => {
  const r = renderRelloEmail(consumer(RATE));

  it("draws the value and the secondary at the same size and weight", () => {
    const spans = figureSpans(r.html);
    expect(spans.map((s) => s.inner)).toEqual(["7.50%", "7.53% APR"]);
    expect(spans[0].style).toBe(FIGURE);
    expect(spans[1].style).toBe(spans[0].style);
  });

  it("prints the label above, the change under, and the note", () => {
    const panel = r.html.slice(r.html.indexOf("Today&#39;s offered rate"));
    expect(panel.indexOf("Today&#39;s offered rate")).toBeLessThan(panel.indexOf("7.50%"));
    expect(panel.indexOf("7.53% APR")).toBeLessThan(panel.indexOf("▼ Down 0.25 from 7.75%"));
    expect(r.html).toContain("30-year fixed, $400,000 loan, 20% down, 740 credit<br>From Example Lending, NMLS #12345");
  });

  it("lays the facts out two to a row, centered; an odd last fact spans both columns", () => {
    const grid = r.html.slice(r.html.indexOf("$2,184/mo") - 400, r.html.indexOf("Points") + 200);
    expect((grid.match(/<tr><td width="50%" align="center"/g) ?? []).length).toBe(1);
    expect(r.html).toMatch(/<tr><td colspan="2" align="center" valign="top" style="padding:12px 4px 0;text-align:center;[^"]*"><div style="font-size:20px;[^"]*">0\.5<\/div><div [^>]*>Points<\/div><\/td><\/tr>/);
    for (const f of ["$2,184/mo", "30 years", "0.5"]) {
      expect(r.html).toContain(`<div style="font-size:20px;line-height:1.25;font-weight:700;color:#111827;">${f}</div>`);
    }
    // An even count has no spanning cell.
    const even = renderRelloEmail(consumer({ ...RATE, facts: RATE.facts!.slice(0, 2) })).html;
    expect(even).not.toContain('colspan="2" align="center" valign="top"');
  });

  it("centers the panel's contents", () => {
    expect(r.html).toContain('<tr><td align="center" style="padding:20px 20px 20px;text-align:center;');
    for (const m of r.html.matchAll(/<td width="50%"[^>]*>/g)) expect(m[0]).toContain('align="center"');
  });

  it("sits after the paragraphs and before the card and the button; disclosures directly under it, in order", () => {
    const at = (s: string) => {
      const i = r.html.indexOf(s);
      expect(i, s).toBeGreaterThan(-1);
      return i;
    };
    expect(at("No password needed.")).toBeLessThan(at("7.50%"));
    expect(at("Points")).toBeLessThan(at("Disclosure one."));
    expect(at("Disclosure one.")).toBeLessThan(at("Disclosure two."));
    expect(at("Disclosure two.")).toBeLessThan(at("Disclosure three."));
    expect(at("Disclosure three.")).toBeLessThan(at("Your numbers"));
    expect(at("Your numbers")).toBeLessThan(at("See my plan"));
    // Disclosures are small print (TE 686): 13px, the palette's secondary text, ≥ 4.5:1 on white.
    const m = r.html.match(/<td style="padding:14px 32px 4px;font-size:13px;line-height:1\.55;color:(#[0-9a-f]{6});"><p style="margin:0 0 10px;">Disclosure one\.<\/p>/);
    expect(m).not.toBeNull();
    expect(relloEmailContrast(m![1], "#ffffff")).toBeGreaterThanOrEqual(4.5);
  });

  it("is a white panel: email-safe tables and inline styles, no flex or grid", () => {
    expect(r.html).toContain('bgcolor="#ffffff" style="background:#ffffff;border:1px solid');
    expect(r.html).not.toMatch(/display:\s*(flex|grid)/);
    expect(r.html).not.toContain("<style");
  });

  it("keeps the change line ≥ 4.5:1 on white, a pale brand color included", () => {
    for (const primary of [null, "#fde047", "#22d3ee", "#1d4ed8", "#000"]) {
      const html = renderRelloEmail(consumer(RATE, { brand: { name: "Summit Peak", primary } })).html;
      const m = html.match(/color:(#[0-9a-f]{6});margin-top:8px;">▼ Down/);
      expect(m, String(primary)).not.toBeNull();
      expect(relloEmailContrast(m![1], "#ffffff"), String(primary)).toBeGreaterThanOrEqual(4.5);
    }
  });

  it("escapes every value", () => {
    const evil = '<b x="1">&\'</b>';
    const esc = "&lt;b x=&quot;1&quot;&gt;&amp;&#39;&lt;/b&gt;";
    const html = renderRelloEmail(
      consumer({
        label: evil,
        value: evil,
        secondary: evil,
        change: evil,
        facts: [{ value: evil, label: evil }],
        note: evil,
        disclosures: [evil],
      }),
    ).html;
    expect(html).not.toContain('<b x="1">');
    expect(html.split(esc).length - 1).toBe(8);
  });

  it("gives a long unbroken figure somewhere to break", () => {
    const html = renderRelloEmail(consumer({ value: "9".repeat(60) })).html;
    expect(html).toContain("<wbr>");
  });

  it("drops a fact missing its value or label, and draws facts with no figure", () => {
    const html = renderRelloEmail(
      consumer({ value: "", facts: [{ value: "$412", label: "Monthly saving" }, { value: "", label: "Gone" }] }),
    ).html;
    expect(html).toContain("$412");
    expect(html).toContain("Monthly saving");
    expect(html).not.toContain("Gone");
    expect(figureSpans(html)).toEqual([]);
  });

  it("prints disclosures even when the panel has nothing to show", () => {
    const res = renderRelloEmail(consumer({ value: "", disclosures: ["Only this."] }));
    expect(res.html).toContain("Only this.");
    expect(res.html).not.toContain("border-top:4px solid");
    expect(res.text).toContain("\n\nOnly this.\n");
  });

  it("renders the same way on pro mail", () => {
    const html = renderRelloEmail({ ...baselineInput("pathfinder-pro", "pro"), spotlight: RATE }).html;
    expect(figureSpans(html).map((s) => s.inner)).toEqual(["7.50%", "7.53% APR"]);
  });
});

describe("spotlight byline", () => {
  const BYLINE = {
    label: "Brought to you by",
    parties: [
      { name: "Summit Lending", detail: "NMLS #3146" },
      { name: "A1 Test Realty 589", detail: "A1 RecruitTest" },
    ],
  };
  const r = renderRelloEmail(consumer({ ...RATE, byline: BYLINE }));

  it("sits at the foot of the panel, under a hairline, label then the parties side by side", () => {
    const at = (x: string) => r.html.indexOf(x);
    expect(at("Points")).toBeLessThan(at("Brought to you by"));
    expect(at("From Example Lending, NMLS #12345")).toBeLessThan(at("Brought to you by"));
    expect(at("Brought to you by")).toBeLessThan(at("Summit Lending"));
    expect(at("Summit Lending")).toBeLessThan(at("A1 Test Realty 589"));
    // Still inside the panel: before the disclosures that follow it.
    expect(at("A1 RecruitTest")).toBeLessThan(at("Disclosure one."));
    expect(r.html).toMatch(/text-transform:uppercase;font-weight:600;color:#[0-9a-f]{6};">Brought to you by<\/td><\/tr><tr><td width="50%" align="center"[^>]*><div style="font-size:15px;line-height:1\.3;font-weight:700;color:#111827;">Summit Lending<\/div><div style="font-size:13px;[^"]*">NMLS #3146<\/div><\/td><td width="50%" align="center"[^>]*><div [^>]*>A1 Test Realty 589<\/div><div [^>]*>A1 RecruitTest<\/div><\/td><\/tr>/);
  });

  it("text: label: name (detail) · name (detail), after the note", () => {
    expect(r.text).toContain("From Example Lending, NMLS #12345\nBrought to you by: Summit Lending (NMLS #3146) · A1 Test Realty 589 (A1 RecruitTest)\n\nDisclosure one.");
  });

  it("one party is centered alone; three wrap two then one", () => {
    const one = renderRelloEmail(consumer({ ...RATE, byline: { label: "Brought to you by", parties: [BYLINE.parties[0]] } }));
    expect(one.html).toMatch(/<tr><td colspan="2" align="center" valign="top" style="padding:6px 4px 0;[^"]*"><div style="font-size:15px;[^"]*">Summit Lending/);
    expect(one.text).toContain("Brought to you by: Summit Lending (NMLS #3146)\n");
    const three = renderRelloEmail(consumer({ ...RATE, byline: { label: "By", parties: [...BYLINE.parties, { name: "Third Co" }] } }));
    expect(three.html).toMatch(/<tr><td colspan="2" align="center" valign="top" style="padding:6px 4px 0;[^"]*"><div style="font-size:15px;[^"]*">Third Co<\/div><\/td><\/tr>/);
    expect(three.text).toContain("By: Summit Lending (NMLS #3146) · A1 Test Realty 589 (A1 RecruitTest) · Third Co\n");
  });

  it("no named party: no byline, label included", () => {
    for (const byline of [null, { label: "Brought to you by", parties: [] }, { label: "Brought to you by", parties: [{ name: "  ", detail: "x" }] }]) {
      const res = renderRelloEmail(consumer({ ...RATE, byline }));
      expect(res.html).not.toContain("Brought to you by");
      expect(res.text).not.toContain("Brought to you by");
      expect(res.html).toBe(renderRelloEmail(consumer(RATE)).html);
    }
  });

  it("escapes the label, names and details", () => {
    const evil = '<b x="1">&\'</b>';
    const html = renderRelloEmail(consumer({ ...RATE, byline: { label: evil, parties: [{ name: evil, detail: evil }] } })).html;
    expect(html).not.toContain('<b x="1">');
    expect(html.split("&lt;b x=&quot;1&quot;&gt;&amp;&#39;&lt;/b&gt;").length - 1).toBe(3);
  });
});

describe("spotlight plain text", () => {
  const { text } = renderRelloEmail(consumer(RATE));

  it("label: value / secondary, the change, caption: value per fact, the note, then disclosures, before the button", () => {
    const expected = [
      "Today's offered rate: 7.50% / 7.53% APR",
      "▼ Down 0.25 from 7.75%",
      "Principal & interest: $2,184/mo",
      "Term: 30 years",
      "Points: 0.5",
      "30-year fixed, $400,000 loan, 20% down, 740 credit",
      "From Example Lending, NMLS #12345",
      "",
      "Disclosure one.",
      "",
      "Disclosure two.",
      "",
      "Disclosure three.",
      "",
      "Your numbers",
    ].join("\n");
    expect(text).toContain(`No password needed.\n\n${expected}`);
    expect(text.indexOf("Disclosure three.")).toBeLessThan(text.indexOf("See my plan:"));
    expect(text.indexOf("7.53% APR")).toBeLessThan(text.indexOf("\n—\n"));
  });

  it("a figure with no label prints alone", () => {
    const t = renderRelloEmail(consumer({ value: "7.18%" })).text;
    expect(t).toContain("No password needed.\n\n7.18%\n\nYour numbers");
  });
});
