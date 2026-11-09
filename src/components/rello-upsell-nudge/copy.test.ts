import { describe, it, expect } from "vitest";
import { renderUpsellCopy } from "./copy";

/**
 * The token-omit rule (RELLO UPSELL Phase 3, Q-CS-8 + the no-gates rule):
 * a missing value omits the sentence that uses it. The copy never shows "$0",
 * an empty "/mo", or a raw `{{token}}`, and the rest of the copy still renders.
 */
describe("renderUpsellCopy", () => {
  const HR = "{{monthlyPrice}}/mo after trial. {{roiCopy}}";

  it("substitutes both values when both are present", () => {
    expect(
      renderUpsellCopy(HR, {
        monthlyPrice: "$199",
        roiCopy: "One closed loan covers a full year of platform fees.",
      }),
    ).toBe("$199/mo after trial. One closed loan covers a full year of platform fees.");
  });

  it("omits the price sentence and keeps the ROI sentence when the price is missing", () => {
    const out = renderUpsellCopy(HR, { roiCopy: "One closing covers it." });
    expect(out).toBe("One closing covers it.");
    expect(out).not.toMatch(/\{\{|\}\}|\$0|\/mo/);
  });

  it("omits the ROI sentence and keeps the price sentence when the ROI copy is missing", () => {
    expect(renderUpsellCopy(HR, { monthlyPrice: "$199" })).toBe("$199/mo after trial.");
  });

  it("returns an empty string when every sentence needs a missing value", () => {
    expect(renderUpsellCopy(HR, {})).toBe("");
  });

  it("keeps the sentences that need no value", () => {
    const body = "Marcus in Sandy closed 6 weeks later. {{monthlyPrice}}/mo after trial. {{roiCopy}}";
    expect(renderUpsellCopy(body, {})).toBe("Marcus in Sandy closed 6 weeks later.");
  });

  it.each([
    ["null", null],
    ["undefined", undefined],
    ["an empty string", ""],
    ["whitespace", "   "],
    ['"$0"', "$0"],
    ['"0"', "0"],
    ['"$0.00"', "$0.00"],
    ['"$0/mo"', "$0/mo"],
    ["a value with no digit", "TBD"],
  ])("treats a monthlyPrice of %s as missing", (_label, value) => {
    const out = renderUpsellCopy("Intro. {{monthlyPrice}}/mo.", { monthlyPrice: value as string | null | undefined });
    expect(out).toBe("Intro.");
  });

  it.each([
    ["null", null],
    ["an empty string", ""],
    ["whitespace", " \n "],
  ])("treats a roiCopy of %s as missing", (_label, value) => {
    expect(renderUpsellCopy("Intro. {{roiCopy}}", { roiCopy: value as string | null })).toBe("Intro.");
  });

  it("treats a non-string value from an untyped caller as missing", () => {
    const values = { monthlyPrice: 199, roiCopy: { x: 1 } } as unknown as { monthlyPrice: string; roiCopy: string };
    expect(renderUpsellCopy("Intro. {{monthlyPrice}}/mo. {{roiCopy}}", values)).toBe("Intro.");
  });

  it("drops a sentence carrying a token this package does not fill, instead of showing it raw", () => {
    expect(
      renderUpsellCopy("We'll pre-fill {{leadName}}'s intake. Start now.", { monthlyPrice: "$199" }),
    ).toBe("Start now.");
  });

  it("drops a sentence with an unclosed token", () => {
    expect(renderUpsellCopy("Price {{monthlyPrice/mo. Start now.", { monthlyPrice: "$199" })).toBe("Start now.");
  });

  it("does not re-read a substituted value as a template", () => {
    // A config value that itself holds braces must not leak a raw token.
    expect(renderUpsellCopy("Intro. {{roiCopy}}", { roiCopy: "Save {{x}} today." })).toBe("Intro.");
  });

  it("accepts whitespace inside the braces", () => {
    expect(renderUpsellCopy("{{ monthlyPrice }}/mo.", { monthlyPrice: "$199" })).toBe("$199/mo.");
  });

  it("substitutes every occurrence of a token", () => {
    expect(renderUpsellCopy("{{monthlyPrice}} now, {{monthlyPrice}} later.", { monthlyPrice: "$5" })).toBe(
      "$5 now, $5 later.",
    );
  });

  it("returns copy with no token unchanged, byte for byte", () => {
    const body = "  Custom landing-page authoring lives in Rello.  Two  spaces.\n\nNew paragraph.  ";
    expect(renderUpsellCopy(body, {})).toBe(body);
    expect(renderUpsellCopy(body, { monthlyPrice: "$199", roiCopy: "x" })).toBe(body);
  });

  it("keeps a paragraph break when the sentence that carried it is dropped", () => {
    const body = "Story one.\n\n{{monthlyPrice}}/mo.\n\nStory two.";
    expect(renderUpsellCopy(body, {})).toBe("Story one.\n\nStory two.");
  });

  it("splits on ! and ? as well as full stops", () => {
    expect(renderUpsellCopy("Ready? Try it for {{monthlyPrice}}/mo! Go now.", {})).toBe("Ready? Go now.");
    expect(renderUpsellCopy("Ready? Try it for {{monthlyPrice}}/mo! Go now.", { monthlyPrice: "$9" })).toBe(
      "Ready? Try it for $9/mo! Go now.",
    );
  });

  it("keeps a decimal price whole", () => {
    expect(renderUpsellCopy("Only {{monthlyPrice}}/mo. Start now.", { monthlyPrice: "$199.50" })).toBe(
      "Only $199.50/mo. Start now.",
    );
  });

  it("returns an empty string for a non-string template", () => {
    expect(renderUpsellCopy(undefined as unknown as string, {})).toBe("");
  });
});
