import { describe, it, expect, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { UpgradeMenuItem } from "./UpgradeMenuItem";

const baseProps = { href: "/upgrade", isEntitled: false, isEmbed: false };

describe("UpgradeMenuItem", () => {
  it("renders a link to the spoke's upgrade page with a 44px touch target", () => {
    render(<UpgradeMenuItem {...baseProps} />);
    const link = screen.getByRole("link", { name: "Upgrade" });
    expect(link).toHaveAttribute("href", "/upgrade");
    expect(link.className).toMatch(/min-h-\[44px\]/);
    expect(link.className).toMatch(/min-w-\[44px\]/);
  });

  it.each([
    ["entitled", { isEntitled: true, isEmbed: false }],
    ["in embed mode", { isEntitled: false, isEmbed: true }],
    ["entitled and in embed mode", { isEntitled: true, isEmbed: true }],
  ])("renders nothing when %s, and reports no impression", (_label, flags) => {
    const onShown = vi.fn();
    const { container } = render(<UpgradeMenuItem {...baseProps} {...flags} onShown={onShown} />);
    expect(container).toBeEmptyDOMElement();
    expect(onShown).not.toHaveBeenCalled();
  });

  it("disappears when the tenant becomes entitled", () => {
    const { rerender, container } = render(<UpgradeMenuItem {...baseProps} />);
    expect(screen.getByRole("link", { name: "Upgrade" })).toBeInTheDocument();
    rerender(<UpgradeMenuItem {...baseProps} isEntitled />);
    expect(container).toBeEmptyDOMElement();
  });

  it("reports one impression while visible and the click", () => {
    const onShown = vi.fn();
    const onClick = vi.fn();
    const { rerender } = render(<UpgradeMenuItem {...baseProps} onShown={onShown} onClick={onClick} />);
    rerender(<UpgradeMenuItem {...baseProps} onShown={onShown} onClick={onClick} label="Upgrade" />);
    expect(onShown).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByRole("link", { name: "Upgrade" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("reports one impression per mount even if it hides and comes back", () => {
    const onShown = vi.fn();
    const { rerender } = render(<UpgradeMenuItem {...baseProps} onShown={onShown} />);
    rerender(<UpgradeMenuItem {...baseProps} onShown={onShown} isEmbed />);
    rerender(<UpgradeMenuItem {...baseProps} onShown={onShown} />);
    expect(screen.getByRole("link", { name: "Upgrade" })).toBeInTheDocument();
    expect(onShown).toHaveBeenCalledTimes(1);
  });

  it("takes a custom label and marks the current page", () => {
    render(<UpgradeMenuItem {...baseProps} label="Upgrade to Rello" active />);
    const link = screen.getByRole("link", { name: "Upgrade to Rello" });
    expect(link).toHaveAttribute("aria-current", "page");
  });

  it("does not set aria-current when not active", () => {
    render(<UpgradeMenuItem {...baseProps} />);
    expect(screen.getByRole("link", { name: "Upgrade" })).not.toHaveAttribute("aria-current");
  });
});
