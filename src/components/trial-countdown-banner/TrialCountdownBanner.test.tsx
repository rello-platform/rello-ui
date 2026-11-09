import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { TrialCountdownBanner } from "./TrialCountdownBanner";
import { getTrialTimeRemaining } from "./remaining";

const NOW = new Date("2026-11-08T12:00:00.000Z").getTime();
const MIN = 60_000;
const HOUR = 60 * MIN;
const DAY = 24 * HOUR;

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(NOW);
});

afterEach(() => {
  vi.useRealTimers();
});

describe("getTrialTimeRemaining", () => {
  it.each([
    ["null", null],
    ["undefined", undefined],
    ["an unparseable string", "not a date"],
    ["an empty string", ""],
    ["an invalid Date", new Date("nope")],
    ["NaN", Number.NaN],
    ["Infinity", Number.POSITIVE_INFINITY],
    ["an object", {}],
  ])("returns null for %s", (_label, value) => {
    expect(getTrialTimeRemaining(value as never, NOW)).toBeNull();
  });

  it("returns null when the trial has ended or ends this instant", () => {
    expect(getTrialTimeRemaining(NOW - 1, NOW)).toBeNull();
    expect(getTrialTimeRemaining(NOW, NOW)).toBeNull();
  });

  it("counts whole days, rounding up, from a fresh 14-day trial", () => {
    expect(getTrialTimeRemaining(NOW + 14 * DAY - 5, NOW)).toMatchObject({ unit: "days", value: 14 });
    expect(getTrialTimeRemaining(NOW + DAY, NOW)).toMatchObject({ unit: "days", value: 1 });
  });

  it("switches to hours inside the last 24 hours, and minutes inside the last hour", () => {
    expect(getTrialTimeRemaining(NOW + DAY - 1, NOW)).toMatchObject({ unit: "hours", value: 24 });
    expect(getTrialTimeRemaining(NOW + 5 * HOUR, NOW)).toMatchObject({ unit: "hours", value: 5 });
    expect(getTrialTimeRemaining(NOW + HOUR - 1, NOW)).toMatchObject({ unit: "minutes", value: 60 });
    expect(getTrialTimeRemaining(NOW + 30_000, NOW)).toMatchObject({ unit: "minutes", value: 1 });
  });

  it("marks the last 48 hours as urgent", () => {
    expect(getTrialTimeRemaining(NOW + 2 * DAY + 1, NOW)?.isUrgent).toBe(false);
    expect(getTrialTimeRemaining(NOW + 2 * DAY, NOW)?.isUrgent).toBe(true);
    expect(getTrialTimeRemaining(NOW + HOUR, NOW)?.isUrgent).toBe(true);
  });

  it("accepts an ISO string, a Date and epoch milliseconds", () => {
    const end = NOW + 3 * DAY;
    expect(getTrialTimeRemaining(new Date(end).toISOString(), NOW)?.msRemaining).toBe(3 * DAY);
    expect(getTrialTimeRemaining(new Date(end), NOW)?.msRemaining).toBe(3 * DAY);
    expect(getTrialTimeRemaining(end, NOW)?.msRemaining).toBe(3 * DAY);
  });
});

describe("TrialCountdownBanner", () => {
  it.each([
    ["no trial (null)", null],
    ["no trial (undefined)", undefined],
    ["an unparseable date", "garbage"],
    ["an ended trial", new Date(NOW - HOUR).toISOString()],
  ])("renders nothing for %s", (_label, trialEndsAt) => {
    const onShown = vi.fn();
    const { container } = render(<TrialCountdownBanner trialEndsAt={trialEndsAt} onShown={onShown} />);
    expect(container).toBeEmptyDOMElement();
    expect(onShown).not.toHaveBeenCalled();
  });

  it("shows the days left in a polite live region", () => {
    render(<TrialCountdownBanner trialEndsAt={new Date(NOW + 5 * DAY).toISOString()} />);
    const status = screen.getByRole("status");
    expect(status).toHaveAttribute("aria-live", "polite");
    expect(status).toHaveTextContent("Your Rello trial ends in 5 days.");
    expect(screen.getByRole("region", { name: "Rello trial" })).toBeInTheDocument();
  });

  it("uses the singular for one day, one hour and one minute", () => {
    const { rerender } = render(<TrialCountdownBanner trialEndsAt={NOW + DAY} />);
    expect(screen.getByRole("status")).toHaveTextContent("ends in 1 day.");
    rerender(<TrialCountdownBanner trialEndsAt={NOW + HOUR} />);
    expect(screen.getByRole("status")).toHaveTextContent("ends in 1 hour.");
    rerender(<TrialCountdownBanner trialEndsAt={NOW + 30_000} />);
    expect(screen.getByRole("status")).toHaveTextContent("ends in 1 minute.");
  });

  it("marks the last 48 hours with an icon and a data flag, not colour alone", () => {
    const { rerender } = render(<TrialCountdownBanner trialEndsAt={NOW + 3 * DAY} />);
    const banner = screen.getByRole("region", { name: "Rello trial" });
    expect(banner).toHaveAttribute("data-urgent", "false");
    expect(banner.querySelector("[data-urgent-icon]")).toBeNull();
    rerender(<TrialCountdownBanner trialEndsAt={NOW + 47 * HOUR} />);
    expect(banner).toHaveAttribute("data-urgent", "true");
    expect(banner.querySelector("[data-urgent-icon]")).not.toBeNull();
  });

  it("counts down while mounted and disappears when the trial ends", () => {
    const onShown = vi.fn();
    const { container } = render(<TrialCountdownBanner trialEndsAt={NOW + 2 * MIN} onShown={onShown} />);
    expect(screen.getByRole("status")).toHaveTextContent("ends in 2 minutes.");
    act(() => {
      vi.advanceTimersByTime(MIN + 30_000);
    });
    expect(screen.getByRole("status")).toHaveTextContent("ends in 1 minute.");
    act(() => {
      vi.advanceTimersByTime(MIN);
    });
    expect(container).toBeEmptyDOMElement();
    // Once ended it stops ticking.
    expect(vi.getTimerCount()).toBe(0);
    expect(onShown).toHaveBeenCalledTimes(1);
  });

  it("fires onShown once while visible", () => {
    const onShown = vi.fn();
    const { rerender } = render(<TrialCountdownBanner trialEndsAt={NOW + 3 * DAY} onShown={onShown} />);
    act(() => {
      vi.advanceTimersByTime(5 * MIN);
    });
    rerender(<TrialCountdownBanner trialEndsAt={NOW + 3 * DAY} onShown={onShown} />);
    expect(onShown).toHaveBeenCalledTimes(1);
  });

  it("fires onShown once per mount even if the banner hides and comes back", () => {
    const onShown = vi.fn();
    const { rerender } = render(<TrialCountdownBanner trialEndsAt={NOW + 3 * DAY} onShown={onShown} />);
    rerender(<TrialCountdownBanner trialEndsAt={null} onShown={onShown} />);
    rerender(<TrialCountdownBanner trialEndsAt={NOW + 5 * DAY} onShown={onShown} />);
    expect(screen.getByRole("status")).toHaveTextContent("ends in 5 days.");
    expect(onShown).toHaveBeenCalledTimes(1);
  });

  it("leaves no timer behind on unmount", () => {
    const { unmount } = render(<TrialCountdownBanner trialEndsAt={NOW + 3 * DAY} />);
    expect(vi.getTimerCount()).toBeGreaterThan(0);
    unmount();
    expect(vi.getTimerCount()).toBe(0);
  });

  it("renders an upgrade link with a 44px touch target, and reports the click", () => {
    const onCtaClick = vi.fn();
    render(<TrialCountdownBanner trialEndsAt={NOW + 3 * DAY} ctaHref="/upgrade" onCtaClick={onCtaClick} />);
    const link = screen.getByRole("link", { name: "Upgrade to Rello" });
    expect(link).toHaveAttribute("href", "/upgrade");
    expect(link.className).toMatch(/min-h-\[44px\]/);
    fireEvent.click(link);
    expect(onCtaClick).toHaveBeenCalledTimes(1);
  });

  it("renders a button CTA when only onCtaClick is passed, and no CTA when neither is", () => {
    const onCtaClick = vi.fn();
    const { rerender } = render(
      <TrialCountdownBanner trialEndsAt={NOW + 3 * DAY} onCtaClick={onCtaClick} ctaLabel="See plans" />,
    );
    const button = screen.getByRole("button", { name: "See plans" });
    expect(button.className).toMatch(/min-h-\[44px\]/);
    fireEvent.click(button);
    expect(onCtaClick).toHaveBeenCalledTimes(1);
    rerender(<TrialCountdownBanner trialEndsAt={NOW + 3 * DAY} />);
    expect(screen.queryByRole("button")).toBeNull();
    expect(screen.queryByRole("link")).toBeNull();
  });

  it("picks up a new trialEndsAt prop", () => {
    const { rerender, container } = render(<TrialCountdownBanner trialEndsAt={null} />);
    expect(container).toBeEmptyDOMElement();
    rerender(<TrialCountdownBanner trialEndsAt={NOW + 4 * DAY} />);
    expect(screen.getByRole("status")).toHaveTextContent("ends in 4 days.");
  });
});
