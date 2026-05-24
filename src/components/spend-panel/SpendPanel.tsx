"use client";

import * as React from "react";
import type {
  BillingUsageAllotment,
  BillingUsageSummary,
  BillingUsageSummaryRow,
} from "@rello-platform/billing-client";
import { Card } from "../card";
import { StatCard } from "../stat-card";
import { EmptyState } from "../empty-state";
import { Button } from "../button";
import { cn } from "../../lib/cn";

/**
 * SpendPanel — the shared, revenue-only per-app billing panel
 * (PER-APP-BILLING-PANELS CR-2). Every spoke mounts this thin component,
 * feeding it `billing.getUsageSummary(relloTenantId)`.
 *
 * Contract (ANSWERS.md):
 * - DL1 revenue-only: renders `revenueCents`/`totalRevenueCents` only — there
 *   is no cost/margin field on the data and none is shown.
 * - DL3 allotment bars: a usage bar per metric with a finite plan quota,
 *   flipping to an overage treatment when `used > included`.
 * - DL4 portal link: a "Manage billing" button shown only when
 *   `portalAvailable`, wired to `onManageBilling`.
 * - DL6 never hide: the panel always renders. When there's no usage at all it
 *   shows a friendly zero-state, not nothing.
 */
export interface SpendPanelProps {
  /** The summary from `@rello-platform/billing-client` getUsageSummary. */
  data: BillingUsageSummary;
  /**
   * Portal link handler (DL4). The "Manage billing" button is only rendered
   * when `data.portalAvailable` is true AND this handler is provided.
   */
  onManageBilling?: () => void;
  className?: string;
}

// Token colors — every CSS var carries a literal fallback (CLAUDE.md design
// system). Layout/spacing stays in Tailwind utilities (no vars).
const COLOR = {
  foreground: "var(--foreground, #2D3339)",
  muted: "var(--neutral-500, #646F77)",
  faint: "var(--neutral-400, #98A1AA)",
  border: "var(--card-border, #D1D5DB)",
  track: "var(--neutral-100, #D1D5DB)",
  brand: "var(--brand-primary, #3B5998)",
  error: "var(--error, #C9605D)",
} as const;

const currencyFmt = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
const numberFmt = new Intl.NumberFormat("en-US");

/** Integer cents → "$X.XX". Guards against NaN/non-finite input. */
function formatCents(cents: number | null | undefined): string {
  if (cents == null || !Number.isFinite(cents)) return "—";
  return currencyFmt.format(cents / 100);
}

function formatQuantity(n: number): string {
  return Number.isFinite(n) ? numberFmt.format(n) : "0";
}

function AllotmentBar({ allotment }: { allotment: BillingUsageAllotment }) {
  const { metricName, included, used, remaining, overageCents } = allotment;
  const over = used > included;
  const pct =
    included > 0 ? Math.min(Math.max((used / included) * 100, 0), 100) : 0;
  const fillColor = over ? COLOR.error : COLOR.brand;

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-baseline justify-between gap-2">
        <span
          className="text-sm font-medium"
          style={{ color: COLOR.foreground }}
        >
          {metricName}
        </span>
        <span className="text-xs tabular-nums" style={{ color: COLOR.muted }}>
          {formatQuantity(used)} / {formatQuantity(included)}
        </span>
      </div>
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={included}
        aria-valuenow={Math.min(used, included)}
        aria-label={`${metricName}: ${formatQuantity(used)} of ${formatQuantity(
          included,
        )} used`}
        className="h-2 w-full overflow-hidden rounded-full"
        style={{ backgroundColor: COLOR.track }}
      >
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{ width: `${pct}%`, backgroundColor: fillColor }}
        />
      </div>
      <div className="flex items-center justify-between gap-2 text-xs">
        {over ? (
          <span style={{ color: COLOR.error }}>
            {formatQuantity(used - included)} over plan
            {overageCents != null ? ` · ${formatCents(overageCents)}` : ""}
          </span>
        ) : (
          <span style={{ color: COLOR.muted }}>
            {formatQuantity(remaining)} remaining
          </span>
        )}
      </div>
    </div>
  );
}

function rowKey(row: BillingUsageSummaryRow): string {
  return `${row.metric}::${row.service ?? "—"}`;
}

function SpendPanel({ data, onManageBilling, className }: SpendPanelProps) {
  const {
    appName,
    period,
    totalRevenueCents,
    totalRevenueKnown,
    recordCount,
    rows,
    allotments,
    portalAvailable,
  } = data;

  const isEmpty = rows.length === 0 && allotments.length === 0;
  const showPortal = portalAvailable && typeof onManageBilling === "function";

  return (
    <Card className={cn("flex flex-col gap-5", className)}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3
            className="text-lg font-semibold"
            style={{ color: COLOR.foreground }}
          >
            Usage &amp; spend
          </h3>
          <p className="text-sm" style={{ color: COLOR.muted }}>
            {appName} · {period.label}
          </p>
        </div>
        {showPortal && (
          <Button
            variant="outline"
            size="lg"
            className="min-h-[44px]"
            onClick={onManageBilling}
          >
            Manage billing
          </Button>
        )}
      </div>

      <StatCard
        label="Total this period"
        value={totalRevenueKnown ? formatCents(totalRevenueCents) : "—"}
        subtitle={
          recordCount === 1 ? "1 metered event" : `${recordCount} metered events`
        }
      />

      {isEmpty ? (
        <EmptyState
          title="No usage yet this period"
          description="$0 this month — nothing has been metered yet. Charges will appear here as you use the app."
        />
      ) : (
        <>
          {allotments.length > 0 && (
            <section
              aria-label="Plan allotments"
              className="flex flex-col gap-4"
            >
              <h4
                className="text-sm font-semibold"
                style={{ color: COLOR.foreground }}
              >
                Plan allotments
              </h4>
              {allotments.map((a) => (
                <AllotmentBar key={a.metric} allotment={a} />
              ))}
            </section>
          )}

          {rows.length > 0 && (
            <section aria-label="Usage breakdown" className="flex flex-col gap-2">
              <h4
                className="text-sm font-semibold"
                style={{ color: COLOR.foreground }}
              >
                Breakdown
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <caption className="sr-only">
                    Per-metric usage and revenue for {appName}, {period.label}
                  </caption>
                  <thead>
                    <tr
                      className="text-left"
                      style={{ color: COLOR.muted }}
                    >
                      <th scope="col" className="py-2 pr-3 font-medium">
                        Metric
                      </th>
                      <th scope="col" className="py-2 pr-3 font-medium">
                        Service
                      </th>
                      <th
                        scope="col"
                        className="py-2 pr-3 text-right font-medium"
                      >
                        Quantity
                      </th>
                      <th scope="col" className="py-2 text-right font-medium">
                        Revenue
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row) => (
                      <tr
                        key={rowKey(row)}
                        className="border-t"
                        style={{ borderColor: COLOR.border }}
                      >
                        <th
                          scope="row"
                          className="py-2 pr-3 text-left font-normal"
                          style={{ color: COLOR.foreground }}
                        >
                          {row.metricName}
                        </th>
                        <td className="py-2 pr-3" style={{ color: COLOR.muted }}>
                          {row.service ?? "—"}
                        </td>
                        <td
                          className="py-2 pr-3 text-right tabular-nums"
                          style={{ color: COLOR.foreground }}
                        >
                          {formatQuantity(row.quantity)}
                          {row.unit ? (
                            <span style={{ color: COLOR.faint }}> {row.unit}</span>
                          ) : null}
                        </td>
                        <td
                          className="py-2 text-right tabular-nums"
                          style={{ color: COLOR.foreground }}
                        >
                          {row.revenueKnown ? formatCents(row.revenueCents) : "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}
        </>
      )}
    </Card>
  );
}

export { SpendPanel };
