import * as React from "react";
import { afterEach, describe, it, expect, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe, toHaveNoViolations } from "jest-axe";
import type { BillingUsageSummary } from "@rello-platform/billing-client";
import { SpendPanel } from "./SpendPanel";

expect.extend(toHaveNoViolations);

afterEach(cleanup);

const period = {
  year: 2026,
  month: 5,
  label: "May 2026",
  start: "2026-05-01T00:00:00.000Z",
  end: "2026-05-31T23:59:59.999Z",
};

function summary(over: Partial<BillingUsageSummary> = {}): BillingUsageSummary {
  return {
    appSlug: "open-house-hub",
    appName: "Open House Hub",
    period,
    totalRevenueCents: 4231,
    totalRevenueKnown: true,
    recordCount: 6,
    rows: [
      {
        appSlug: "open-house-hub",
        appName: "Open House Hub",
        metric: "emails_sent",
        metricName: "Emails sent",
        unit: "email",
        service: "mailgun",
        quantity: 320,
        revenueCents: 2560,
        revenueKnown: true,
      },
    ],
    allotments: [
      {
        metric: "emails_sent",
        metricName: "Emails sent",
        included: 500,
        used: 320,
        remaining: 180,
        overageCents: null,
      },
    ],
    portalAvailable: true,
    ...over,
  };
}

describe("SpendPanel", () => {
  it("renders total revenue formatted as currency (DL1)", () => {
    render(<SpendPanel data={summary()} />);
    expect(screen.getByText("$42.31")).toBeTruthy();
  });

  it("shows an em-dash for total when revenue is unknown", () => {
    render(
      <SpendPanel
        data={summary({ totalRevenueKnown: false, totalRevenueCents: 0 })}
      />,
    );
    expect(screen.getByText("—")).toBeTruthy();
  });

  it("renders an allotment progressbar with aria values (DL3)", () => {
    render(<SpendPanel data={summary()} />);
    const bar = screen.getByRole("progressbar", { name: /Emails sent/i });
    expect(bar.getAttribute("aria-valuemax")).toBe("500");
    expect(bar.getAttribute("aria-valuenow")).toBe("320");
  });

  it("flags overage when used exceeds included", () => {
    render(
      <SpendPanel
        data={summary({
          allotments: [
            {
              metric: "sms_sent",
              metricName: "SMS sent",
              included: 50,
              used: 84,
              remaining: 0,
              overageCents: 680,
            },
          ],
        })}
      />,
    );
    expect(screen.getByText(/over plan/i)).toBeTruthy();
    expect(screen.getByText(/\$6\.80/)).toBeTruthy();
  });

  it("shows the Manage billing button only when portalAvailable + handler given (DL4)", async () => {
    const onManageBilling = vi.fn();
    const { rerender } = render(
      <SpendPanel data={summary()} onManageBilling={onManageBilling} />,
    );
    const btn = screen.getByRole("button", { name: /manage billing/i });
    await userEvent.click(btn);
    expect(onManageBilling).toHaveBeenCalledTimes(1);

    // No handler → hidden even when portalAvailable.
    rerender(<SpendPanel data={summary()} />);
    expect(screen.queryByRole("button", { name: /manage billing/i })).toBeNull();

    // portalAvailable false → hidden even with handler.
    rerender(
      <SpendPanel
        data={summary({ portalAvailable: false })}
        onManageBilling={onManageBilling}
      />,
    );
    expect(screen.queryByRole("button", { name: /manage billing/i })).toBeNull();
  });

  it("renders a friendly zero-state and never hides (DL6)", () => {
    render(
      <SpendPanel
        data={summary({
          rows: [],
          allotments: [],
          totalRevenueKnown: false,
          totalRevenueCents: 0,
          recordCount: 0,
        })}
      />,
    );
    expect(screen.getByText(/No usage yet this period/i)).toBeTruthy();
    expect(screen.getByText(/nothing has been metered yet/i)).toBeTruthy();
  });

  it("has no axe accessibility violations (populated state)", async () => {
    const { container } = render(<SpendPanel data={summary()} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
