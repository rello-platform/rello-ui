import { describe, it, expect } from "vitest";
import { alphaTint, hexAlphaToPercent } from "./alpha-tint";

/**
 * These pin the ARITHMETIC and the SHAPE. They cannot pin the rendered color —
 * jsdom does not evaluate `color-mix()` or resolve `var()`, so a computed-style
 * read here would prove nothing. The rendered-color claim is measured in a real
 * headless Chromium; see the companion doc §Rendered proof.
 */

describe("hexAlphaToPercent", () => {
  it("reads the suffix as a BYTE, not as decimal digits", () => {
    // The whole reason the helper exists: `14` looks like 14% and is 7.84%.
    // Converting by eye is how a pixel-identical refactor becomes a visual diff.
    expect(hexAlphaToPercent(0x14)).toBeCloseTo(7.843137, 5);
    expect(hexAlphaToPercent(0x66)).toBeCloseTo(40, 10);
    expect(hexAlphaToPercent(0x1a)).toBeCloseTo(10.196078, 5);
    expect(hexAlphaToPercent(0x80)).toBeCloseTo(50.196078, 5);
  });

  it("anchors the endpoints", () => {
    expect(hexAlphaToPercent(0x00)).toBe(0);
    expect(hexAlphaToPercent(0xff)).toBe(100);
  });

  it("clamps out-of-range and non-finite input instead of emitting NaN", () => {
    expect(hexAlphaToPercent(-1)).toBe(0);
    expect(hexAlphaToPercent(999)).toBe(100);
    expect(hexAlphaToPercent(Number.NaN)).toBe(0);
  });
});

describe("alphaTint", () => {
  it("accepts a literal hex", () => {
    expect(alphaTint("#2A6F97", 40)).toBe("color-mix(in srgb, #2A6F97 40%, transparent)");
  });

  it("accepts a CSS custom property — the case hex-alpha concatenation could not express", () => {
    expect(alphaTint("var(--brand-accent, #2A6F97)", 40)).toBe(
      "color-mix(in srgb, var(--brand-accent, #2A6F97) 40%, transparent)",
    );
  });

  it("treats both shapes identically — no branch on the input", () => {
    // A hex fast-path would be a second mechanism, and the second mechanism is
    // always the one that quietly stays hex-only.
    const hex = alphaTint("#2A6F97", 7.843137254901961);
    const cssVar = alphaTint("var(--brand-accent, #2A6F97)", 7.843137254901961);
    expect(hex.replace("#2A6F97", "X")).toBe(cssVar.replace("var(--brand-accent, #2A6F97)", "X"));
  });

  it("passes through other CSS color forms", () => {
    for (const color of ["rgb(42 111 151)", "hsl(203 56% 38%)", "currentColor", "tomato"]) {
      expect(alphaTint(color, 50)).toBe(`color-mix(in srgb, ${color} 50%, transparent)`);
    }
  });

  it("clamps percent to 0-100", () => {
    expect(alphaTint("#fff", -20)).toBe("color-mix(in srgb, #fff 0%, transparent)");
    expect(alphaTint("#fff", 140)).toBe("color-mix(in srgb, #fff 100%, transparent)");
  });

  it("emits 0% rather than NaN% for a non-finite percent", () => {
    // `NaN%` invalidates the whole declaration, so the surface would lose its
    // background entirely — fail visible-but-transparent, never fail-to-unstyled.
    expect(alphaTint("#fff", Number.NaN)).toBe("color-mix(in srgb, #fff 0%, transparent)");
    expect(alphaTint("#fff", Number.POSITIVE_INFINITY)).toBe("color-mix(in srgb, #fff 0%, transparent)");
  });

  it("trims the float so inline styles do not carry 15 decimal places", () => {
    expect(alphaTint("#fff", hexAlphaToPercent(0x14))).toBe(
      "color-mix(in srgb, #fff 7.8431%, transparent)",
    );
  });
});
