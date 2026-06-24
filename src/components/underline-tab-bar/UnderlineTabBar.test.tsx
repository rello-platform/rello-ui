import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UnderlineTabBar, type UnderlineTab } from "./UnderlineTabBar";

/**
 * These tests assert the overflow-affordance finding end-to-end: when the tab
 * row overflows its container the right-edge (and/or left-edge) scroll chevron
 * appears; when it fits, no affordance shows; and the existing roving-tabindex
 * keyboard nav still cycles.
 *
 * jsdom does not run layout, so `scrollWidth` / `clientWidth` / `scrollLeft`
 * are all 0 and `ResizeObserver` may be absent. We model the geometry by
 * stubbing those three layout properties on HTMLElement and providing a
 * controllable ResizeObserver so the component's scroll-state effect can read
 * real-looking dimensions. The component computes affordance visibility purely
 * from `scrollLeft + clientWidth < scrollWidth - 1` and `scrollLeft > 0`.
 */

let observerCallbacks: Array<() => void> = [];

class MockResizeObserver {
  constructor(cb: ResizeObserverCallback) {
    // Store a zero-arg trigger; the component ignores entries/observer args.
    observerCallbacks.push(() => cb([], this as unknown as ResizeObserver));
  }
  observe() {}
  unobserve() {}
  disconnect() {}
}

/**
 * Define geometry on the scroll container so the component sees an overflowing
 * (or fitting) row. Returns helpers to mutate scrollLeft and re-fire scroll.
 */
function stubGeometry(opts: {
  clientWidth: number;
  scrollWidth: number;
  scrollLeft?: number;
}) {
  let scrollLeft = opts.scrollLeft ?? 0;
  Object.defineProperty(HTMLElement.prototype, "clientWidth", {
    configurable: true,
    get() {
      return opts.clientWidth;
    },
  });
  Object.defineProperty(HTMLElement.prototype, "scrollWidth", {
    configurable: true,
    get() {
      return opts.scrollWidth;
    },
  });
  Object.defineProperty(HTMLElement.prototype, "scrollLeft", {
    configurable: true,
    get() {
      return scrollLeft;
    },
    set(v: number) {
      scrollLeft = v;
    },
  });
  Object.defineProperty(HTMLElement.prototype, "offsetWidth", {
    configurable: true,
    get() {
      return 96;
    },
  });
  return {
    setScrollLeft(v: number) {
      scrollLeft = v;
    },
  };
}

function clearGeometry() {
  for (const prop of [
    "clientWidth",
    "scrollWidth",
    "scrollLeft",
    "offsetWidth",
  ]) {
    delete (HTMLElement.prototype as Record<string, unknown>)[prop];
  }
}

const manyTabs: UnderlineTab[] = [
  { id: "buys", label: "Buys" },
  { id: "sells", label: "Sells" },
  { id: "closings", label: "Closings" },
  { id: "trust", label: "Trust / Escrow" },
  { id: "wire", label: "Wire Tracking" },
  { id: "docs", label: "Documents" },
];

beforeEach(() => {
  observerCallbacks = [];
  vi.stubGlobal("ResizeObserver", MockResizeObserver);
  // jsdom doesn't implement scrollBy; the component calls it on chevron click.
  HTMLElement.prototype.scrollBy = vi.fn();
});

afterEach(() => {
  clearGeometry();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("UnderlineTabBar — overflow affordance", () => {
  it("shows a right-edge scroll affordance when the tab row overflows", () => {
    // Row is 1200px wide content inside a 800px container, scrolled to start →
    // tabs hidden off the RIGHT, none off the left.
    stubGeometry({ clientWidth: 800, scrollWidth: 1200, scrollLeft: 0 });
    render(
      <UnderlineTabBar
        tabs={manyTabs}
        activeTab="buys"
        ariaLabel="Lead pipeline tabs"
      />,
    );
    expect(
      screen.getByRole("button", { name: /scroll tabs right/i }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /scroll tabs left/i }),
    ).not.toBeInTheDocument();
  });

  it("shows NO affordance when the tab row fits its container", () => {
    // Content (600px) narrower than container (800px) → no overflow either way.
    stubGeometry({ clientWidth: 800, scrollWidth: 600, scrollLeft: 0 });
    render(
      <UnderlineTabBar
        tabs={manyTabs}
        activeTab="buys"
        ariaLabel="Lead pipeline tabs"
      />,
    );
    expect(
      screen.queryByRole("button", { name: /scroll tabs right/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /scroll tabs left/i }),
    ).not.toBeInTheDocument();
  });

  it("shows BOTH edge affordances when scrolled to the middle", () => {
    // Scrolled 200px into a 1200px row inside an 800px container →
    // tabs hidden on both sides.
    stubGeometry({ clientWidth: 800, scrollWidth: 1200, scrollLeft: 200 });
    render(
      <UnderlineTabBar
        tabs={manyTabs}
        activeTab="closings"
        ariaLabel="Lead pipeline tabs"
      />,
    );
    expect(
      screen.getByRole("button", { name: /scroll tabs right/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /scroll tabs left/i }),
    ).toBeInTheDocument();
  });

  it("scrolls the container right by ~one tab-width on chevron click", async () => {
    const user = userEvent.setup();
    stubGeometry({ clientWidth: 800, scrollWidth: 1200, scrollLeft: 0 });
    render(
      <UnderlineTabBar
        tabs={manyTabs}
        activeTab="buys"
        ariaLabel="Lead pipeline tabs"
      />,
    );
    const rightChevron = screen.getByRole("button", {
      name: /scroll tabs right/i,
    });
    await user.click(rightChevron);
    // offsetWidth stub = 96, step = 96 + 24 = 120, positive (rightward).
    expect(HTMLElement.prototype.scrollBy).toHaveBeenCalledWith(
      expect.objectContaining({ left: 120, behavior: "smooth" }),
    );
  });

  it("updates affordance visibility when the container scrolls", () => {
    const geo = stubGeometry({
      clientWidth: 800,
      scrollWidth: 1200,
      scrollLeft: 0,
    });
    render(
      <UnderlineTabBar
        tabs={manyTabs}
        activeTab="buys"
        ariaLabel="Lead pipeline tabs"
      />,
    );
    // Initially only the right chevron (scrolled to start).
    expect(
      screen.queryByRole("button", { name: /scroll tabs left/i }),
    ).not.toBeInTheDocument();

    // User scrolls all the way to the end → left chevron appears, right gone.
    // The scroll container is the overflow-x-auto div that wraps the tabs.
    const scrollContainer = screen
      .getByRole("tablist")
      .querySelector("div.overflow-x-auto");
    expect(scrollContainer).not.toBeNull();
    act(() => {
      geo.setScrollLeft(400); // scrollLeft + clientWidth(800) === scrollWidth(1200)
      scrollContainer?.dispatchEvent(new Event("scroll"));
    });
    expect(
      screen.getByRole("button", { name: /scroll tabs left/i }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /scroll tabs right/i }),
    ).not.toBeInTheDocument();
  });

  it("keeps ArrowRight/ArrowLeft/Home/End roving-tabindex keyboard nav intact", async () => {
    const user = userEvent.setup();
    stubGeometry({ clientWidth: 800, scrollWidth: 1200, scrollLeft: 0 });
    const onChange = vi.fn();
    render(
      <UnderlineTabBar
        tabs={manyTabs}
        activeTab="closings"
        ariaLabel="Lead pipeline tabs"
        onChange={onChange}
      />,
    );
    const activeTabEl = screen.getByRole("tab", { name: "Closings" });
    activeTabEl.focus();

    await user.keyboard("{ArrowRight}");
    expect(onChange).toHaveBeenLastCalledWith("trust"); // next after closings

    await user.keyboard("{ArrowLeft}");
    expect(onChange).toHaveBeenLastCalledWith("sells"); // prev before closings

    await user.keyboard("{Home}");
    expect(onChange).toHaveBeenLastCalledWith("buys"); // first

    await user.keyboard("{End}");
    expect(onChange).toHaveBeenLastCalledWith("docs"); // last
  });
});
