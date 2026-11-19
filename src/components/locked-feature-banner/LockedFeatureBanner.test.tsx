import * as React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LockedFeatureBanner, type LockedFeatureBannerProps } from "./LockedFeatureBanner";

const base: LockedFeatureBannerProps = {
  title: "Feature X is part of Plan Y.",
  body: "One value sentence.",
  variant: "page",
  primary: { label: "Primary action", href: "/go" },
  learnMore: { label: "Learn more", href: "https://example.test/features/x" },
  seam: "seam-x",
};

/** A controllable IntersectionObserver: tests decide when the banner enters view. */
function installObserver() {
  const callbacks: IntersectionObserverCallback[] = [];
  const disconnect = vi.fn();
  class FakeObserver {
    constructor(cb: IntersectionObserverCallback) {
      callbacks.push(cb);
    }
    observe() {}
    unobserve() {}
    disconnect = disconnect;
    takeRecords() {
      return [];
    }
  }
  vi.stubGlobal("IntersectionObserver", FakeObserver);
  const enter = (isIntersecting = true) =>
    act(() => {
      for (const cb of callbacks) cb([{ isIntersecting } as IntersectionObserverEntry], {} as IntersectionObserver);
    });
  return { enter, disconnect, callbacks };
}

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("LockedFeatureBanner — content and props", () => {
  it("is a note labelled by its title, with the body after it", () => {
    render(<LockedFeatureBanner {...base} />);
    const note = screen.getByRole("note", { name: "Feature X is part of Plan Y." });
    expect(note).toHaveTextContent("Feature X is part of Plan Y. One value sentence.");
    expect(note).toHaveAttribute("data-seam", "seam-x");
    // The lock is decorative.
    expect(note.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });

  it.each(["page", "section", "card"] as const)("variant %s is rendered", (variant) => {
    render(<LockedFeatureBanner {...base} variant={variant} />);
    expect(screen.getByRole("note")).toHaveAttribute("data-variant", variant);
  });

  it("card variant stacks its buttons; page does not", () => {
    const { rerender } = render(<LockedFeatureBanner {...base} variant="card" />);
    expect(screen.getByRole("link", { name: "Primary action" }).parentElement?.className).toMatch(/flex-col/);
    rerender(<LockedFeatureBanner {...base} variant="page" />);
    expect(screen.getByRole("link", { name: "Primary action" }).parentElement?.className).not.toMatch(/flex-col/);
  });

  it("primary with href is a link; with onClick only, a button that calls it", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    const { rerender } = render(<LockedFeatureBanner {...base} />);
    expect(screen.getByRole("link", { name: "Primary action" })).toHaveAttribute("href", "/go");
    rerender(<LockedFeatureBanner {...base} primary={{ label: "Primary action", onClick }} />);
    const btn = screen.getByRole("button", { name: "Primary action" });
    expect(btn).toHaveAttribute("type", "button");
    await user.click(btn);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("Learn more opens a new tab with rel noopener and says so to screen readers", () => {
    render(<LockedFeatureBanner {...base} />);
    const learn = screen.getByRole("link", { name: "Learn more (opens in a new tab)" });
    expect(learn).toHaveAttribute("href", "https://example.test/features/x");
    expect(learn).toHaveAttribute("target", "_blank");
    expect(learn.getAttribute("rel")?.split(" ")).toContain("noopener");
  });

  it("the new-tab hint is a prop, and an empty one is omitted", () => {
    const { rerender } = render(<LockedFeatureBanner {...base} learnMore={{ label: "Learn more", href: "/x", newTabHint: "(new tab)" }} />);
    expect(screen.getByRole("link", { name: "Learn more (new tab)" })).toBeInTheDocument();
    rerender(<LockedFeatureBanner {...base} learnMore={{ label: "Learn more", href: "/x", newTabHint: "" }} />);
    expect(screen.getByRole("link", { name: "Learn more" })).toBeInTheDocument();
  });

  it("without learnMore there is only the primary action", () => {
    render(<LockedFeatureBanner {...base} learnMore={undefined} />);
    expect(screen.getAllByRole("link")).toHaveLength(1);
  });

  it("every button is at least 44px tall", () => {
    render(<LockedFeatureBanner {...base} />);
    for (const a of screen.getAllByRole("link")) expect(a.className).toMatch(/min-h-\[44px\]/);
  });
});

describe("LockedFeatureBanner — events (UPSELL_EVENTS)", () => {
  it("no IntersectionObserver: `shown` once on mount, even under StrictMode's double effect and a re-render", () => {
    vi.stubGlobal("IntersectionObserver", undefined);
    const onEvent = vi.fn();
    const { rerender } = render(
      <React.StrictMode>
        <LockedFeatureBanner {...base} onEvent={onEvent} />
      </React.StrictMode>,
    );
    const onEvent2 = vi.fn();
    rerender(
      <React.StrictMode>
        <LockedFeatureBanner {...base} onEvent={onEvent2} />
      </React.StrictMode>,
    );
    expect(onEvent.mock.calls.filter(([e]) => e === "shown")).toEqual([["shown", "seam-x"]]);
    expect(onEvent2).not.toHaveBeenCalled();
  });

  it("with an observer: nothing until in view, then `shown` exactly once however often it re-enters", () => {
    const io = installObserver();
    const onEvent = vi.fn();
    render(<LockedFeatureBanner {...base} onEvent={onEvent} />);
    io.enter(false);
    expect(onEvent).not.toHaveBeenCalled();
    io.enter();
    io.enter();
    io.enter();
    expect(onEvent.mock.calls).toEqual([["shown", "seam-x"]]);
    expect(io.disconnect).toHaveBeenCalled();
  });

  it("disconnects its observer on unmount", () => {
    const io = installObserver();
    const { unmount } = render(<LockedFeatureBanner {...base} />);
    unmount();
    expect(io.disconnect).toHaveBeenCalled();
  });

  it("`clicked` on the primary link, the primary button and Learn more — once each, with the seam", async () => {
    vi.stubGlobal("IntersectionObserver", undefined);
    const user = userEvent.setup();
    const onEvent = vi.fn();
    const primaryClick = vi.fn((e: React.MouseEvent) => e.preventDefault());
    const { rerender } = render(<LockedFeatureBanner {...base} primary={{ label: "Primary action", href: "/go", onClick: primaryClick }} onEvent={onEvent} />);
    await user.click(screen.getByRole("link", { name: "Primary action" }));
    expect(primaryClick).toHaveBeenCalledTimes(1);
    const learn = screen.getByRole("link", { name: /Learn more/ });
    learn.addEventListener("click", (e) => e.preventDefault());
    await user.click(learn);
    rerender(<LockedFeatureBanner {...base} primary={{ label: "Primary action", onClick: () => {} }} onEvent={onEvent} />);
    await user.click(screen.getByRole("button", { name: "Primary action" }));
    expect(onEvent.mock.calls.filter(([e]) => e === "clicked")).toEqual([
      ["clicked", "seam-x"],
      ["clicked", "seam-x"],
      ["clicked", "seam-x"],
    ]);
  });

  it("a throwing onEvent is logged and never breaks the button", async () => {
    vi.stubGlobal("IntersectionObserver", undefined);
    const user = userEvent.setup();
    const err = vi.spyOn(console, "error").mockImplementation(() => {});
    const onClick = vi.fn();
    render(
      <LockedFeatureBanner
        {...base}
        primary={{ label: "Primary action", onClick }}
        onEvent={() => {
          throw new Error("telemetry down");
        }}
      />,
    );
    await user.click(screen.getByRole("button", { name: "Primary action" }));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(err).toHaveBeenCalledWith("[LockedFeatureBanner] onEvent threw", expect.objectContaining({ event: "clicked", seam: "seam-x" }));
  });
});
