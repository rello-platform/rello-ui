import * as React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { DashboardShell, type DashboardNavItem } from "./DashboardShell";

afterEach(() => cleanup());

// HI-05 (Home Insight spec §9, was R-2): a locked nav item is a focusable
// button that names its locked state; it is never a link and never fires the
// navigation callback.
function shell(items: DashboardNavItem[], onNavClick = vi.fn()) {
  return render(
    <DashboardShell
      logo={<span>Logo</span>}
      appTitle="App"
      appSubtitle="Sub"
      agentName="Jane Doe"
      agentInitials="JD"
      navGroups={[{ items }]}
      activeNavLabel="Leads"
      onNavClick={onNavClick}
    />,
  );
}

const icon = <svg data-testid="icon" />;

describe("DashboardShell — locked nav items (HI-05)", () => {
  it("a locked item with an href renders a button, not a link", () => {
    const { container } = shell([
      { icon, label: "Leads", href: "/leads" },
      { icon, label: "Pools", href: "/pools", locked: true, lockedLabel: "Part of full Brand", onLockedClick: () => {} },
    ]);
    expect(container.querySelector('a[href="/pools"]')).toBeNull();
    expect(container.querySelector('a[href="/leads"]')).not.toBeNull();
    const locked = screen.getByRole("button", { name: /Pools.*Part of full Brand/ });
    expect(locked).toHaveAttribute("data-locked", "true");
    expect(locked).not.toBeDisabled();
    expect(locked.className).toContain("min-h-[44px]");
  });

  it("clicking a locked item fires onLockedClick and not onNavClick", () => {
    const onLockedClick = vi.fn();
    const onNavClick = vi.fn();
    shell(
      [{ icon, label: "Pools", href: "/pools", locked: true, lockedLabel: "Part of full Brand", onLockedClick }],
      onNavClick,
    );
    fireEvent.click(screen.getByRole("button", { name: /Pools/ }));
    expect(onLockedClick).toHaveBeenCalledTimes(1);
    expect(onNavClick).not.toHaveBeenCalled();
  });

  it("a locked item is never marked as the current page", () => {
    shell([{ icon, label: "Leads", href: "/leads", locked: true, onLockedClick: () => {} }]);
    expect(screen.getByRole("button", { name: /Leads/ })).not.toHaveAttribute("aria-current");
  });

  it("the collapsed rail still shows a lock (icon-only), and the name says Locked by default", () => {
    const { container } = shell([{ icon, label: "Team", href: "/team", locked: true }]);
    const btn = screen.getByRole("button", { name: /Team.*Locked/ });
    expect(within(btn).getByTestId("locked-indicator")).toHaveAttribute("aria-hidden", "true");
    expect(container.querySelector('a[href="/team"]')).toBeNull();
  });
});
