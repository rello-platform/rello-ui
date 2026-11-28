import * as React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UnderlineTabBar, type UnderlineTab } from "./UnderlineTabBar";

afterEach(() => cleanup());

// HI-05 (Home Insight spec §9, was R-2): a locked tab is still a reachable tab
// that says it is locked, but it is never a link and never selects itself.
function tabs(onLockedClick: () => void): UnderlineTab[] {
  return [
    { id: "all", label: "All Leads", href: "/leads?tab=all" },
    {
      id: "pools",
      label: "Pools",
      href: "/leads?tab=pools",
      locked: true,
      lockedLabel: "Part of full Brand",
      onLockedClick,
    },
    { id: "closings", label: "Closings", href: "/leads?tab=closings" },
  ];
}

describe("UnderlineTabBar — locked tabs (HI-05)", () => {
  it("a locked tab is not a link, even when it has an href", () => {
    const { container } = render(
      <UnderlineTabBar tabs={tabs(() => {})} activeTab="all" ariaLabel="Leads" />,
    );
    const locked = screen.getByRole("tab", { name: /Pools/ });
    expect(locked.tagName).toBe("BUTTON");
    expect(locked).not.toHaveAttribute("href");
    expect(container.querySelector('a[href="/leads?tab=pools"]')).toBeNull();
    // The open tabs keep their links.
    expect(container.querySelector('a[href="/leads?tab=all"]')).not.toBeNull();
  });

  it("clicking a locked tab fires onLockedClick and never onChange", async () => {
    const onLockedClick = vi.fn();
    const onChange = vi.fn();
    render(
      <UnderlineTabBar tabs={tabs(onLockedClick)} activeTab="all" onChange={onChange} ariaLabel="Leads" />,
    );
    await userEvent.click(screen.getByRole("tab", { name: /Pools/ }));
    expect(onLockedClick).toHaveBeenCalledTimes(1);
    expect(onChange).not.toHaveBeenCalled();
  });

  it("shows the LockedBadge text, which is part of the tab's accessible name", () => {
    render(<UnderlineTabBar tabs={tabs(() => {})} activeTab="all" ariaLabel="Leads" />);
    const locked = screen.getByRole("tab", { name: /Pools.*Part of full Brand/ });
    expect(locked).toHaveAttribute("data-locked", "true");
    expect(locked.querySelector("svg[aria-hidden='true']")).not.toBeNull();
  });

  it("stays focusable and keyboard-operable (tab stop; Enter fires onLockedClick)", async () => {
    const onLockedClick = vi.fn();
    render(<UnderlineTabBar tabs={tabs(onLockedClick)} activeTab="all" ariaLabel="Leads" />);
    const locked = screen.getByRole("tab", { name: /Pools/ });
    expect(locked).not.toBeDisabled();
    expect(locked).toHaveAttribute("tabindex", "0");
    expect(locked).toHaveAttribute("aria-selected", "false");
    locked.focus();
    expect(document.activeElement).toBe(locked);
    await userEvent.keyboard("{Enter}");
    expect(onLockedClick).toHaveBeenCalledTimes(1);
  });

  it("keeps the 44 px minimum touch target", () => {
    render(<UnderlineTabBar tabs={tabs(() => {})} activeTab="all" ariaLabel="Leads" />);
    expect(screen.getByRole("tab", { name: /Pools/ }).className).toContain("min-h-[44px]");
  });

  it("arrow keys never select a locked tab (they skip it)", () => {
    const onChange = vi.fn();
    render(<UnderlineTabBar tabs={tabs(() => {})} activeTab="all" onChange={onChange} ariaLabel="Leads" />);
    fireEvent.keyDown(screen.getByRole("tab", { name: "All Leads" }), { key: "ArrowRight" });
    expect(onChange).toHaveBeenCalledWith("closings");
    expect(onChange).not.toHaveBeenCalledWith("pools");
  });

  it("a locked tab with no lockedLabel still names its state with the default text", () => {
    render(
      <UnderlineTabBar
        tabs={[{ id: "a", label: "Open" }, { id: "b", label: "Team", locked: true }]}
        activeTab="a"
        ariaLabel="Team"
      />,
    );
    expect(screen.getByRole("tab", { name: /Team.*Locked/ })).toBeInTheDocument();
  });

  it("an unlocked tab renders exactly as before (locked defaults to false)", () => {
    const { container } = render(
      <UnderlineTabBar tabs={[{ id: "a", label: "A", href: "/a" }]} activeTab="a" ariaLabel="x" />,
    );
    const a = container.querySelector('a[href="/a"]');
    expect(a).not.toBeNull();
    expect(a).not.toHaveAttribute("data-locked");
  });
});
