import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import * as React from "react";
import { CardIllustration } from "./CardIllustration";

/**
 * The accent prop's contract: any CSS color value, literal hex OR custom
 * property. jsdom preserves an inline `color-mix()` verbatim but never
 * evaluates it, so these assert the DECLARATION SURVIVES and carries the caller's
 * value through untouched. The rendered-color equality claim is measured in a
 * real headless Chromium — see the companion doc §Rendered proof.
 */

function bgOf(container: HTMLElement): string {
  return (container.firstChild as HTMLElement).style.backgroundColor;
}

describe("CardIllustration accent", () => {
  it("tints a literal hex through color-mix, not a hex-alpha suffix", () => {
    const { container } = render(<CardIllustration accent="#2A6F97" />);
    const bg = bgOf(container);
    expect(bg).toContain("color-mix(in srgb");
    expect(bg).toContain("transparent)");
    // The old path produced `#2A6F9724`. Any bare 6-or-8 digit hex glued to a
    // suffix means the concatenation came back.
    expect(bg).not.toMatch(/#[0-9a-f]{8}\b/i);
  });

  it("accepts a CSS custom property and passes it through intact", () => {
    // This is the case that was impossible before: `${accent}24` on a var
    // yields `var(--brand-accent, #2A6F97)24`, which is not a color, and the
    // declaration is dropped — the surface renders untinted.
    const { container } = render(
      <CardIllustration accent="var(--brand-accent, #2A6F97)" />,
    );
    const bg = bgOf(container);
    expect(bg).toContain("var(--brand-accent, #2A6F97)");
    expect(bg).toContain("color-mix(in srgb");
    // Nothing may be appended after the caller's value — that was the bug.
    expect(bg).not.toContain(")24");
    expect(bg).not.toContain(")14");
  });

  it("maps bgOpacity 0-1 onto the tint percentage", () => {
    const { container } = render(
      <CardIllustration accent="var(--x, #000)" bgOpacity={0.5} />,
    );
    expect(bgOf(container)).toBe("color-mix(in srgb, var(--x, #000) 50%, transparent)");
  });

  it("leaves the dark variant on its fixed white wash, untouched by accent", () => {
    const { container } = render(<CardIllustration accent="#2A6F97" dark />);
    expect(bgOf(container)).toBe("rgba(255, 255, 255, 0.06)");
  });

  it("still renders pattern and icon layers", () => {
    const { container } = render(
      <CardIllustration
        accent="var(--brand-accent, #2A6F97)"
        pattern={<circle cx="10" cy="10" r="4" data-testid="pattern" />}
        icon={<span data-testid="icon">i</span>}
      />,
    );
    expect(container.querySelector("svg")).not.toBeNull();
    expect(container.querySelector('[data-testid="icon"]')).not.toBeNull();
  });
});
