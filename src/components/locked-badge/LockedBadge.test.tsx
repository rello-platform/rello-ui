import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { LockedBadge } from "./LockedBadge";

describe("LockedBadge", () => {
  it("shows its label, and the label is all assistive tech reads (the lock is aria-hidden)", () => {
    const { container } = render(<LockedBadge label="Plan Y" size="md" />);
    expect(screen.getByText("Plan Y")).toBeInTheDocument();
    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
    expect(container.textContent).toBe("Plan Y");
  });

  it.each(["sm", "md"] as const)("size %s", (size) => {
    const { container } = render(<LockedBadge label="Add-on" size={size} />);
    const badge = container.firstElementChild as HTMLElement;
    expect(badge).toHaveAttribute("data-size", size);
    expect(container.querySelector("svg")).toHaveAttribute("width", size === "sm" ? "12" : "14");
  });

  it("is display only: no button, link or tab stop", () => {
    const { container } = render(<LockedBadge label="Plan Y" size="sm" />);
    expect(container.querySelector("button, a, input, [tabindex]")).toBeNull();
  });
});
