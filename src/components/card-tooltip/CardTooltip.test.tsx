import * as React from "react";
import { afterEach, beforeAll, describe, it, expect } from "vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe, toHaveNoViolations } from "jest-axe";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { CardTooltip, CardTooltipIcon } from "./CardTooltip";

// jsdom is missing browser APIs Radix's positioning layer uses. Minimal polyfills.
beforeAll(() => {
  if (typeof globalThis.ResizeObserver === "undefined") {
    class NoopResizeObserver {
      observe(): void {}
      unobserve(): void {}
      disconnect(): void {}
    }
    (globalThis as unknown as { ResizeObserver: typeof NoopResizeObserver }).ResizeObserver =
      NoopResizeObserver;
  }
  if (typeof globalThis.DOMRect === "undefined") {
    (globalThis as unknown as { DOMRect: typeof DOMRect }).DOMRect = class {
      x = 0;
      y = 0;
      width = 0;
      height = 0;
      top = 0;
      left = 0;
      right = 0;
      bottom = 0;
      static fromRect() {
        return new (this as unknown as new () => DOMRect)();
      }
      toJSON() {
        return {};
      }
    } as unknown as typeof DOMRect;
  }
  if (!Element.prototype.hasPointerCapture) {
    Element.prototype.hasPointerCapture = (): boolean => false;
  }
  if (!Element.prototype.releasePointerCapture) {
    Element.prototype.releasePointerCapture = (): void => {};
  }
  if (!Element.prototype.scrollIntoView) {
    Element.prototype.scrollIntoView = (): void => {};
  }
});

expect.extend(toHaveNoViolations);

function wrap(ui: React.ReactElement): React.ReactElement {
  return (
    <TooltipPrimitive.Provider delayDuration={0} skipDelayDuration={0}>
      {ui}
    </TooltipPrimitive.Provider>
  );
}

afterEach(() => {
  cleanup();
});

describe("CardTooltipIcon", () => {
  it("renders a 44×44 button trigger (w-11 h-11 — Tailwind 44px touch target)", () => {
    render(wrap(<CardTooltipIcon text="Active leads in any non-terminal stage." />));
    const trigger = screen.getByRole("button", { name: "More info" });
    expect(trigger).toHaveClass("w-11", "h-11");
  });

  it("uses default aria-label 'More info' when not overridden", () => {
    render(wrap(<CardTooltipIcon text="Body." />));
    expect(screen.getByRole("button")).toHaveAttribute("aria-label", "More info");
  });

  it("respects ariaLabel prop override", () => {
    render(
      wrap(<CardTooltipIcon text="Body." ariaLabel="Health-score details" />),
    );
    expect(screen.getByRole("button")).toHaveAttribute(
      "aria-label",
      "Health-score details",
    );
  });

  it("text=\"\" → renders nothing (no icon, no popover)", () => {
    const { container } = render(wrap(<CardTooltipIcon text="" />));
    // Provider renders its own wrapping React fragment; the CardTooltipIcon child is null.
    expect(screen.queryByRole("button")).toBeNull();
    expect(container.querySelector("button")).toBeNull();
  });

  it("Tab moves focus to the trigger; trigger is keyboard-focusable", async () => {
    const user = userEvent.setup();
    render(wrap(<CardTooltipIcon text="Body." />));
    const trigger = screen.getByRole("button", { name: "More info" });
    await user.tab();
    expect(trigger).toHaveFocus();
  });

  it("hovering the trigger opens the popover with role='tooltip' + aria-describedby wiring", async () => {
    const user = userEvent.setup();
    render(
      wrap(
        <CardTooltipIcon text="Active leads in any non-terminal stage." />,
      ),
    );
    const trigger = screen.getByRole("button", { name: "More info" });
    await user.hover(trigger);

    const tooltip = await screen.findByRole("tooltip");
    expect(tooltip).toHaveTextContent(
      "Active leads in any non-terminal stage.",
    );

    // Radix wires aria-describedby on trigger to the popover's id.
    const describedBy = trigger.getAttribute("aria-describedby");
    expect(describedBy).not.toBeNull();
    expect(tooltip.id).toBe(describedBy);
  });

  it("focusing the trigger opens the popover", async () => {
    const user = userEvent.setup();
    render(wrap(<CardTooltipIcon text="Body." />));
    await user.tab();
    expect(await screen.findByRole("tooltip")).toBeInTheDocument();
  });

  it("Escape closes the open popover", async () => {
    const user = userEvent.setup();
    render(wrap(<CardTooltipIcon text="Body." />));
    const trigger = screen.getByRole("button", { name: "More info" });
    await user.hover(trigger);
    await screen.findByRole("tooltip");
    await user.keyboard("{Escape}");
    await waitFor(() => {
      expect(screen.queryByRole("tooltip")).toBeNull();
    });
  });

  it("passes jest-axe scan with zero violations", async () => {
    const { container } = render(
      wrap(<CardTooltipIcon text="Active leads in any non-terminal stage." />),
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("applies className passthrough on the trigger button", () => {
    render(wrap(<CardTooltipIcon text="Body." className="ml-1 custom-x" />));
    const trigger = screen.getByRole("button", { name: "More info" });
    expect(trigger).toHaveClass("ml-1", "custom-x");
    // Base classes still present.
    expect(trigger).toHaveClass("w-11", "h-11");
  });
});

describe("CardTooltip (whole-card wrapper)", () => {
  it("renders children and an info-icon trigger when text is non-empty", () => {
    render(
      wrap(
        <CardTooltip text="Composite health score.">
          <div data-testid="banner-body">banner content</div>
        </CardTooltip>,
      ),
    );
    expect(screen.getByTestId("banner-body")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "More info" })).toBeInTheDocument();
  });

  it("text=\"\" → renders children but no icon trigger", () => {
    render(
      wrap(
        <CardTooltip text="">
          <div data-testid="banner-body">banner content</div>
        </CardTooltip>,
      ),
    );
    expect(screen.getByTestId("banner-body")).toBeInTheDocument();
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("opens popover with the wrapper's text when trigger is hovered", async () => {
    const user = userEvent.setup();
    render(
      wrap(
        <CardTooltip text="Composite health score.">
          <div>banner</div>
        </CardTooltip>,
      ),
    );
    await user.hover(screen.getByRole("button", { name: "More info" }));
    const tooltip = await screen.findByRole("tooltip");
    expect(tooltip).toHaveTextContent("Composite health score.");
  });

  it("passes jest-axe scan with zero violations", async () => {
    const { container } = render(
      wrap(
        <CardTooltip text="Composite health score.">
          <div>banner content</div>
        </CardTooltip>,
      ),
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

