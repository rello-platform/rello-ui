import { describe, expect, it } from "vitest";
import { renderRelloEmail, type RelloEmailInput, type RelloEmailSpotlight } from "./index";
import { baselineInput } from "../test/email-logo-baseline";
import { v240Cases } from "../test/email-v240-cases";

/**
 * v2.42.0 `spotlights` — several spotlight panels in one email (Home Scout Rate Watch: one per priced
 * rate option; Platform KA prompt 1021, U0). Order: `spotlight` first, then `spotlights` in order. Neither
 * replaces the other. Each panel carries its own small print directly under it.
 */

const OPTION = (rate: string, apr: string, points: string, disclosure: string): RelloEmailSpotlight => ({
  label: "Rate / APR as of November 11",
  value: rate,
  secondary: `${apr} APR`,
  facts: [
    { value: "$565", label: "Fees" },
    { value: points, label: "Points" },
    { value: "$2,517/mo", label: "Principal & interest" },
    { value: "30-year fixed", label: "Term" },
  ],
  disclosures: [disclosure],
});

const A = OPTION("7.500%", "7.534%", "-0.176", "Disclosure for option A.");
const B = OPTION("7.000%", "7.188%", "1.536", "Disclosure for option B.");
const C = OPTION("6.875%", "7.102%", "2.000", "Disclosure for option C.");

function consumer(extra: Partial<RelloEmailInput>): RelloEmailInput {
  return { ...baselineInput("home-scout", "consumer"), ...extra };
}

/** The hero figures in document order (the 40px spans), e.g. ["7.500%", "7.534% APR", …]. */
function figures(html: string): string[] {
  return [...html.matchAll(/<span style="font-size:40px;[^"]*">([^<]*)<\/span>/g)].map((m) => m[1]);
}

/** One spotlight panel's opening table: a white panel with the brand color as a 4px top edge. */
const PANEL = /border-top:4px solid [^;"]+;border-radius:8px;/g;

describe("v2.42.0 spotlights: absent, null, empty or all-empty renders byte for byte as without it", () => {
  const forms: Array<[string, RelloEmailInput["spotlights"]]> = [
    ["null", null],
    ["[]", []],
    ["[null, undefined, {}]", [null, undefined, {} as RelloEmailSpotlight]],
  ];
  for (const [name, spotlights] of forms) {
    it(`spotlights ${name}, across every v2.40.0 corpus case, with and without a single spotlight`, () => {
      for (const c of v240Cases()) {
        for (const spotlight of [undefined, A]) {
          const without = renderRelloEmail({ ...c.input, spotlight });
          const withIt = renderRelloEmail({ ...c.input, spotlight, spotlights });
          expect(withIt.html, `${c.id} html`).toBe(without.html);
          expect(withIt.text, `${c.id} text`).toBe(without.text);
        }
      }
    });
  }

  it("a non-array spotlights value is ignored, not thrown on", () => {
    const base = consumer({});
    const odd = { ...base, spotlights: "nope" as unknown as RelloEmailInput["spotlights"] };
    expect(renderRelloEmail(odd).html).toBe(renderRelloEmail(base).html);
  });
});

describe("three spotlights", () => {
  const html = renderRelloEmail(consumer({ spotlights: [A, B, C] })).html;

  it("draws three panels, each with its rate and APR at hero size, in the order given", () => {
    expect(html.match(PANEL)?.length).toBe(3);
    expect(figures(html)).toEqual(["7.500%", "7.534% APR", "7.000%", "7.188% APR", "6.875%", "7.102% APR"]);
  });

  it("puts each panel's own small print directly under it, before the next panel", () => {
    const at = (needle: string) => {
      const i = html.indexOf(needle);
      expect(i, needle).toBeGreaterThan(-1);
      return i;
    };
    const order = [at("7.500%"), at("Disclosure for option A."), at("7.000%"), at("Disclosure for option B."), at("6.875%"), at("Disclosure for option C.")];
    expect([...order].sort((x, y) => x - y)).toEqual(order);
  });

  it("each panel keeps its own fact grid", () => {
    expect(html.split(">Fees<").length - 1).toBe(3);
    expect(html).toContain(">-0.176<");
    expect(html).toContain(">1.536<");
    expect(html).toContain(">2.000<");
  });

  it("plain text: each option's figures, facts and disclosure, in order", () => {
    const text = renderRelloEmail(consumer({ spotlights: [A, B, C] })).text;
    const ia = text.indexOf("Rate / APR as of November 11: 7.500% / 7.534% APR");
    const da = text.indexOf("Disclosure for option A.");
    const ib = text.indexOf("Rate / APR as of November 11: 7.000% / 7.188% APR");
    const ic = text.indexOf("Rate / APR as of November 11: 6.875% / 7.102% APR");
    const dc = text.indexOf("Disclosure for option C.");
    expect(ia).toBeGreaterThan(-1);
    expect(ia < da && da < ib && ib < ic && ic < dc).toBe(true);
    expect(text.split("Points: ").length - 1).toBe(3);
  });
});

describe("spotlight and spotlights together", () => {
  it("both render: the single spotlight first, then the array in order (neither wins over the other)", () => {
    const html = renderRelloEmail(consumer({ spotlight: C, spotlights: [A, B] })).html;
    expect(html.match(PANEL)?.length).toBe(3);
    expect(figures(html)).toEqual(["6.875%", "7.102% APR", "7.500%", "7.534% APR", "7.000%", "7.188% APR"]);
  });

  it("an entry with nothing to show is skipped; the rest keep their order", () => {
    const html = renderRelloEmail(consumer({ spotlights: [A, { label: "only a label" } as RelloEmailSpotlight, null, B] })).html;
    expect(html.match(PANEL)?.length).toBe(2);
    expect(figures(html)).toEqual(["7.500%", "7.534% APR", "7.000%", "7.188% APR"]);
    expect(html).not.toContain("only a label");
  });

  it("an entry with only disclosures prints its small print in its place, with no panel", () => {
    const html = renderRelloEmail(consumer({ spotlights: [A, { disclosures: ["Fine print alone."] } as unknown as RelloEmailSpotlight, B] })).html;
    expect(html.match(PANEL)?.length).toBe(2);
    const a = html.indexOf("7.500%");
    const fine = html.indexOf("Fine print alone.");
    const b = html.indexOf("7.000%");
    expect(a < fine && fine < b).toBe(true);
  });

  it("sits after the paragraphs and before the card and the button", () => {
    const input = consumer({ spotlights: [A, B] });
    const html = renderRelloEmail(input).html;
    const firstPanel = html.search(PANEL);
    const lastDisclosure = html.indexOf("Disclosure for option B.");
    const cardTitle = input.card?.title ?? "";
    expect(cardTitle).not.toBe("");
    expect(firstPanel).toBeGreaterThan(html.indexOf(String(input.paragraphs?.[0] ?? "")));
    expect(lastDisclosure).toBeLessThan(html.indexOf(cardTitle));
  });

  it("escapes values in every panel", () => {
    const html = renderRelloEmail(consumer({ spotlights: [A, { value: "<b>9%</b>", disclosures: ["a & b"] }] })).html;
    expect(html).not.toContain("<b>9%</b>");
    expect(html).toContain("&lt;b&gt;");
    expect(html).toContain("a &amp; b");
  });
});
