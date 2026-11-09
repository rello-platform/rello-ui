import { describe, it, expect, vi, afterEach } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { RelloUpsellNudge } from "./RelloUpsellNudge";

const baseProps = {
  seam: "lead-ready-threshold",
  headline: "This lead is ready. So is the door.",
  body: "Marcus in Sandy closed 6 weeks later.",
  onClick: () => {},
  onDismiss: () => {},
};

function region() {
  return screen.getByRole("region", { name: /rello upgrade option/i });
}

afterEach(() => {
  vi.useRealTimers();
});

describe("RelloUpsellNudge — {{monthlyPrice}} / {{roiCopy}} tokens", () => {
  const body = "Marcus in Sandy closed 6 weeks later. {{monthlyPrice}}/mo after trial. {{roiCopy}}";

  it("renders both values into the body", () => {
    render(
      <RelloUpsellNudge
        {...baseProps}
        body={body}
        monthlyPrice="$199"
        roiCopy="One closed loan covers a full year of platform fees."
      />,
    );
    expect(region()).toHaveTextContent(
      "Marcus in Sandy closed 6 weeks later. $199/mo after trial. One closed loan covers a full year of platform fees.",
    );
  });

  it("omits the sentences whose value is missing and still renders the nudge", () => {
    const onClick = vi.fn();
    render(<RelloUpsellNudge {...baseProps} body={body} onClick={onClick} />);
    const text = region().textContent ?? "";
    expect(text).toContain("Marcus in Sandy closed 6 weeks later.");
    expect(text).not.toMatch(/\{\{|\}\}/);
    expect(text).not.toContain("$0");
    expect(text).not.toContain("/mo");
    // The prompt itself is kept: CTA and dismiss are still there.
    fireEvent.click(screen.getByRole("button", { name: "Upgrade to Rello" }));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("button", { name: /dismiss upgrade nudge/i })).toBeInTheDocument();
  });

  it('never renders "$0" when the spoke passes a zero price', () => {
    render(<RelloUpsellNudge {...baseProps} body={body} monthlyPrice="$0" roiCopy="One closing covers it." />);
    const text = region().textContent ?? "";
    expect(text).not.toContain("$0");
    expect(text).toContain("One closing covers it.");
  });

  it("applies the rule to the headline and the CTA label too", () => {
    render(
      <RelloUpsellNudge
        {...baseProps}
        headline="Rello is {{monthlyPrice}}/mo."
        ctaLabel="Upgrade for {{monthlyPrice}}/mo"
      />,
    );
    // Headline needed the missing price: no empty heading is left behind.
    expect(screen.queryByRole("heading")).toBeNull();
    // CTA label needed it: the default label is used, never a raw token.
    expect(screen.getByRole("button", { name: "Upgrade to Rello" })).toBeInTheDocument();
    expect(region().textContent ?? "").not.toMatch(/\{\{|\}\}/);
  });

  it("renders a body with no token exactly as given (existing callers unchanged)", () => {
    const plain = "Custom landing-page authoring lives in Rello.";
    render(<RelloUpsellNudge {...baseProps} body={plain} />);
    expect(screen.getByText(plain).textContent).toBe(plain);
    expect(screen.getByRole("heading", { name: baseProps.headline })).toBeInTheDocument();
  });
});

describe("RelloUpsellNudge — fields with no {{ are unchanged from v2.37.1 (GD-11)", () => {
  it('renders a legacy headline "Literal }} text" as its h3', () => {
    render(<RelloUpsellNudge {...baseProps} headline="Literal }} text" body="Plain copy" ctaLabel="See plans" />);
    expect(screen.getByRole("heading", { level: 3 }).textContent).toBe("Literal }} text");
    expect(screen.getByText("Plain copy")).toBeInTheDocument();
  });

  it('keeps an explicit ctaLabel="" empty, as v2.37.1 did', () => {
    render(<RelloUpsellNudge {...baseProps} ctaLabel="" />);
    expect(screen.queryByRole("button", { name: "Upgrade to Rello" })).toBeNull();
    const buttons = screen.getAllByRole("button");
    // CTA (empty) + dismiss.
    expect(buttons).toHaveLength(2);
    expect(buttons[0].textContent).toBe("");
  });

  it("still renders the h3 and p for an empty headline and body", () => {
    const { container } = render(<RelloUpsellNudge {...baseProps} headline="" body="" ctaLabel="See plans" />);
    const h3 = container.querySelector("h3");
    const p = container.querySelector("p");
    expect(h3).not.toBeNull();
    expect(h3?.textContent).toBe("");
    expect(p).not.toBeNull();
    expect(p?.textContent).toBe("");
  });

  it("applies the omit rule per field: a token in the body leaves a literal-brace headline alone", () => {
    render(<RelloUpsellNudge {...baseProps} headline="Literal }} text." body="Keep. {{monthlyPrice}}/mo." />);
    expect(screen.getByRole("heading", { level: 3 }).textContent).toBe("Literal }} text.");
    expect(region().textContent).toContain("Keep.");
    expect(region().textContent).not.toContain("/mo");
  });
});

describe("RelloUpsellNudge — engaged event", () => {
  it("fires onEngaged once after a 3-second hover", () => {
    vi.useFakeTimers();
    const onEngaged = vi.fn();
    render(<RelloUpsellNudge {...baseProps} onEngaged={onEngaged} />);
    fireEvent.mouseEnter(region());
    act(() => {
      vi.advanceTimersByTime(2999);
    });
    expect(onEngaged).not.toHaveBeenCalled();
    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(onEngaged).toHaveBeenCalledTimes(1);
    // A second long hover is not a second engagement.
    fireEvent.mouseLeave(region());
    fireEvent.mouseEnter(region());
    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(onEngaged).toHaveBeenCalledTimes(1);
  });

  it("does not fire when the pointer leaves before 3 seconds", () => {
    vi.useFakeTimers();
    const onEngaged = vi.fn();
    render(<RelloUpsellNudge {...baseProps} onEngaged={onEngaged} />);
    fireEvent.mouseEnter(region());
    act(() => {
      vi.advanceTimersByTime(2500);
    });
    fireEvent.mouseLeave(region());
    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(onEngaged).not.toHaveBeenCalled();
  });

  it("fires after keyboard focus stays inside the nudge for 3 seconds (keyboard parity with hover)", () => {
    vi.useFakeTimers();
    const onEngaged = vi.fn();
    render(<RelloUpsellNudge {...baseProps} onEngaged={onEngaged} />);
    act(() => {
      screen.getByRole("button", { name: "Upgrade to Rello" }).focus();
    });
    // Moving focus between controls inside the nudge does not restart the clock.
    act(() => {
      vi.advanceTimersByTime(1500);
      screen.getByRole("button", { name: /dismiss upgrade nudge/i }).focus();
      vi.advanceTimersByTime(1500);
    });
    expect(onEngaged).toHaveBeenCalledTimes(1);
  });

  it("does not fire when focus leaves the nudge before 3 seconds", () => {
    vi.useFakeTimers();
    const onEngaged = vi.fn();
    render(
      <>
        <RelloUpsellNudge {...baseProps} onEngaged={onEngaged} />
        <button type="button">outside</button>
      </>,
    );
    act(() => {
      screen.getByRole("button", { name: "Upgrade to Rello" }).focus();
      vi.advanceTimersByTime(2000);
      screen.getByRole("button", { name: "outside" }).focus();
      vi.advanceTimersByTime(5000);
    });
    expect(onEngaged).not.toHaveBeenCalled();
  });

  it("fires once when the detail panel is expanded, and the panel opens", () => {
    const onEngaged = vi.fn();
    render(
      <RelloUpsellNudge {...baseProps} onEngaged={onEngaged} details={<p>Rello routes the lead to Pathfinder Pro.</p>} />,
    );
    const toggle = screen.getByRole("button", { name: "How it works" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByText("Rello routes the lead to Pathfinder Pro.")).toBeNull();
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    const panel = screen.getByText("Rello routes the lead to Pathfinder Pro.");
    expect(toggle.getAttribute("aria-controls")).toBe(panel.parentElement?.id);
    expect(onEngaged).toHaveBeenCalledTimes(1);
    fireEvent.click(toggle);
    fireEvent.click(toggle);
    expect(onEngaged).toHaveBeenCalledTimes(1);
  });

  it("does not render a detail toggle when no details are passed", () => {
    render(<RelloUpsellNudge {...baseProps} />);
    expect(screen.queryByRole("button", { name: "How it works" })).toBeNull();
  });

  it("does not fire after unmount and leaves no timer behind", () => {
    vi.useFakeTimers();
    const onEngaged = vi.fn();
    const { unmount } = render(<RelloUpsellNudge {...baseProps} onEngaged={onEngaged} />);
    fireEvent.mouseEnter(region());
    unmount();
    expect(vi.getTimerCount()).toBe(0);
    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(onEngaged).not.toHaveBeenCalled();
  });

  it("still fires when the caller passes its own mouse and focus handlers, and calls them too", () => {
    vi.useFakeTimers();
    const onEngaged = vi.fn();
    const onMouseEnter = vi.fn();
    const onMouseLeave = vi.fn();
    const onFocus = vi.fn();
    const onBlur = vi.fn();
    render(
      <RelloUpsellNudge
        {...baseProps}
        onEngaged={onEngaged}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onFocus={onFocus}
        onBlur={onBlur}
      />,
    );
    fireEvent.mouseEnter(region());
    act(() => {
      vi.advanceTimersByTime(3000);
    });
    expect(onEngaged).toHaveBeenCalledTimes(1);
    expect(onMouseEnter).toHaveBeenCalledTimes(1);
    fireEvent.mouseLeave(region());
    expect(onMouseLeave).toHaveBeenCalledTimes(1);
    act(() => {
      screen.getByRole("button", { name: "Upgrade to Rello" }).focus();
    });
    expect(onFocus).toHaveBeenCalled();
    act(() => {
      screen.getByRole("button", { name: "Upgrade to Rello" }).blur();
    });
    expect(onBlur).toHaveBeenCalled();
  });

  it("still dismisses on Escape when the caller passes its own onKeyDown, and calls it too", () => {
    const onDismiss = vi.fn();
    const onKeyDown = vi.fn();
    render(<RelloUpsellNudge {...baseProps} onDismiss={onDismiss} onKeyDown={onKeyDown} />);
    fireEvent.keyDown(screen.getByRole("button", { name: "Upgrade to Rello" }), { key: "Escape" });
    expect(onDismiss).toHaveBeenCalledTimes(1);
    expect(onKeyDown).toHaveBeenCalledTimes(1);
  });

  it("works without onEngaged (existing callers)", () => {
    vi.useFakeTimers();
    render(<RelloUpsellNudge {...baseProps} />);
    fireEvent.mouseEnter(region());
    expect(() =>
      act(() => {
        vi.advanceTimersByTime(5000);
      }),
    ).not.toThrow();
  });
});
