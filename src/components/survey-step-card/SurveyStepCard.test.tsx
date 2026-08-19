import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import * as React from "react";
import { SurveyStepCard } from "./SurveyStepCard";
import type { SurveyQuestion } from "./SurveyStepCard";

/**
 * SurveyGate (Home Scout) is this component's only platform consumer, and it was
 * blocked from binding to the tenant accent because every tint here was a
 * hex-alpha suffix. These assert the accent prop now survives as a CSS custom
 * property on each tinted surface. jsdom preserves `color-mix()` verbatim
 * without evaluating it; the rendered-color equality is measured in a real
 * headless Chromium — see the companion doc §Rendered proof.
 */

const ACCENT_VAR = "var(--brand-accent, #2A6F97)";

function optionQuestion(accent: string): SurveyQuestion {
  return {
    key: "goal",
    accent,
    question: "What are you hoping to do?",
    options: ["Buy", "Sell"],
  };
}

function textQuestion(accent: string): SurveyQuestion {
  return { key: "name", accent, question: "Your name?", placeholder: "Jordan" };
}

/** Every inline background-color / background in the tree, as authored. */
function backgrounds(container: HTMLElement): string[] {
  return Array.from(container.querySelectorAll<HTMLElement>("[style]"))
    .flatMap((el) => [el.style.backgroundColor, el.style.background])
    .filter(Boolean);
}

describe("SurveyStepCard accent as a CSS custom property", () => {
  it("keeps the var intact on the illustration box tint", () => {
    // The box renders ONLY when the question carries an illustration or pattern
    // (SurveyStepCard.tsx:516). Without one, this test would pass on the
    // progress gradient instead and prove nothing about the box.
    const question: SurveyQuestion = {
      ...optionQuestion(ACCENT_VAR),
      illustration: <span data-testid="illo">*</span>,
    };
    const { container } = render(
      <SurveyStepCard questions={[question]} step={0} showProgress={false} />,
    );
    // The illustration is wrapped in a relative div inside the box, so the box
    // is two levels up.
    const box = screen.getByTestId("illo").parentElement!.parentElement as HTMLElement;
    expect(box.style.width).toBe("88px"); // it IS the illustration box
    expect(box.style.backgroundColor).toContain("color-mix(in srgb");
    expect(box.style.backgroundColor).toContain(ACCENT_VAR);
    // The failure this guards: `${accent}14` on a var appends after the closing
    // paren and the declaration is discarded.
    expect(box.style.backgroundColor).not.toContain(")14");
    // With the progress bar off, the box is the only color-mix in the tree —
    // so a regression cannot hide behind another element's tint.
    expect(backgrounds(container).filter((b) => b.includes("color-mix"))).toHaveLength(1);
  });

  it("keeps the var intact on the progress gradient", () => {
    const { container } = render(
      <SurveyStepCard questions={[optionQuestion(ACCENT_VAR), optionQuestion(ACCENT_VAR)]} step={1} />,
    );
    const gradient = backgrounds(container).find((b) => b.includes("linear-gradient"));
    expect(gradient).toBeDefined();
    expect(gradient).toContain("color-mix(in srgb");
    expect(gradient).toContain(ACCENT_VAR);
    expect(gradient).not.toContain(")66");
  });

  it("keeps the var intact on a selected option's tint", () => {
    const { container } = render(
      <SurveyStepCard
        questions={[optionQuestion(ACCENT_VAR)]}
        step={0}
        selections={{ goal: "Buy" }}
      />,
    );
    const selected = screen.getByRole("button", { name: "Buy" });
    expect(selected.style.backgroundColor).toContain(ACCENT_VAR);
    expect(selected.style.borderColor).toBe(ACCENT_VAR);
    expect(backgrounds(container).some((b) => b.includes("color-mix"))).toBe(true);
  });

  it("keeps the var intact on a filled text input's tint", () => {
    render(
      <SurveyStepCard
        questions={[textQuestion(ACCENT_VAR)]}
        step={0}
        selections={{ name: "Jordan" }}
      />,
    );
    const input = screen.getByPlaceholderText("Jordan") as HTMLInputElement;
    expect(input.style.backgroundColor).toContain(ACCENT_VAR);
    expect(input.style.backgroundColor).toContain("color-mix(in srgb");
    expect(input.style.borderColor).toBe(ACCENT_VAR);
  });
});

describe("SurveyStepCard accent as a literal hex (existing callers)", () => {
  it("still tints, and no longer emits an 8-digit hex", () => {
    const { container } = render(
      <SurveyStepCard questions={[optionQuestion("#2A6F97")]} step={0} selections={{ goal: "Buy" }} />,
    );
    const tinted = backgrounds(container).filter((b) => b.includes("color-mix"));
    expect(tinted.length).toBeGreaterThan(0);
    for (const b of tinted) expect(b).not.toMatch(/#[0-9a-f]{8}\b/i);
  });

  it("uses the accent at full strength where no tint was ever applied", () => {
    render(
      <SurveyStepCard questions={[optionQuestion("#2A6F97")]} step={0} selections={{ goal: "Buy" }} />,
    );
    // Selected text color is the raw accent — unchanged by this work.
    expect(screen.getByRole("button", { name: "Buy" }).style.color).toBe("rgb(42, 111, 151)");
  });
});
