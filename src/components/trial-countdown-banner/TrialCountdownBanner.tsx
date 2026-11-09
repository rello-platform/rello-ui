"use client";

import * as React from "react";
import Link from "next/link";
import { Clock, WarningCircle } from "iconoir-react";
import { cn } from "../../lib/cn";
import {
  formatTrialTimeRemaining,
  getTrialTimeRemaining,
  parseTrialEndsAt,
  type TrialEndsAtInput,
} from "./remaining";

/** How often the countdown re-reads the clock. Minute precision needs no more. */
const TICK_MS = 30_000;

export interface TrialCountdownBannerProps extends Omit<React.HTMLAttributes<HTMLElement>, "children"> {
  /**
   * When the trial ends: `EntitlementCheck.trialEndsAt` from Rello. A Date,
   * an ISO string or epoch ms. No trial (null/undefined), an unreadable
   * value, or a trial that has ended renders nothing.
   */
  trialEndsAt: TrialEndsAtInput;
  /** Fires once per mount, the first time the banner is visible (`trial-banner.shown`). */
  onShown?: () => void;
  /** Upgrade destination (usually the spoke's `/upgrade` page). Renders the CTA as a link. */
  ctaHref?: string;
  /** Fires on CTA click (`trial-banner.clicked`). With no `ctaHref` the CTA is a button. */
  onCtaClick?: () => void;
  /** CTA text — defaults to "Upgrade to Rello". */
  ctaLabel?: string;
}

/**
 * Full-width strip for the very top of a spoke's agent/MLO chrome during an
 * active Rello trial (ANSWERS Q-CS-12). Shows days left, then hours inside
 * the last 24 hours, then minutes inside the last hour; the last 48 hours
 * carry a warning icon and an error-tinted accent. It disappears by itself
 * when the trial ends. The spoke decides where it mounts (never on
 * lead-facing routes); this component only decides what the clock says.
 */
function TrialCountdownBanner({
  trialEndsAt,
  onShown,
  ctaHref,
  onCtaClick,
  ctaLabel = "Upgrade to Rello",
  className,
  style,
  ...props
}: TrialCountdownBannerProps) {
  const endMs = parseTrialEndsAt(trialEndsAt);
  const [now, setNow] = React.useState(() => Date.now());

  React.useEffect(() => {
    if (endMs === null) return undefined;
    setNow(Date.now());
    if (endMs <= Date.now()) return undefined;
    const id = setInterval(() => {
      const t = Date.now();
      setNow(t);
      if (t >= endMs) clearInterval(id);
    }, TICK_MS);
    return () => clearInterval(id);
  }, [endMs]);

  const remaining = endMs === null ? null : getTrialTimeRemaining(endMs, now);
  const visible = remaining !== null;

  const onShownRef = React.useRef(onShown);
  onShownRef.current = onShown;
  const shownRef = React.useRef(false);
  React.useEffect(() => {
    if (visible && !shownRef.current) {
      shownRef.current = true;
      onShownRef.current?.();
    }
  }, [visible]);

  if (!remaining) return null;

  const { isUrgent } = remaining;
  const accent = "var(--error, #C9605D)";
  const ctaClass =
    "inline-flex items-center justify-center min-h-[44px] min-w-[44px] px-4 rounded-md text-sm font-medium transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary,#3B5998)] focus-visible:ring-offset-2";
  const ctaStyle: React.CSSProperties = {
    backgroundColor: "var(--brand-primary, #3B5998)",
    color: "var(--brand-primary-foreground, #FFFFFF)",
  };

  return (
    <section
      aria-label="Rello trial"
      data-urgent={isUrgent ? "true" : "false"}
      className={cn(
        "w-full flex flex-wrap items-center justify-center gap-x-4 gap-y-2 px-4 py-2 sm:px-6",
        className,
      )}
      style={{
        backgroundColor: isUrgent
          ? "color-mix(in srgb, var(--error, #C9605D) 8%, var(--card-background, #FFFFFF))"
          : "var(--neutral-50, #FAFBFC)",
        borderBottom: `1px solid ${isUrgent ? accent : "var(--card-border, #D1D5DB)"}`,
        color: "var(--foreground, #2D3339)",
        ...style,
      }}
      {...props}
    >
      <div className="flex items-center gap-2 min-w-0">
        {isUrgent ? (
          <span data-urgent-icon="" aria-hidden="true" className="inline-flex shrink-0" style={{ color: accent }}>
            <WarningCircle width={18} height={18} />
          </span>
        ) : (
          <span aria-hidden="true" className="inline-flex shrink-0" style={{ color: "var(--neutral-500, #646F77)" }}>
            <Clock width={18} height={18} />
          </span>
        )}
        <p role="status" aria-live="polite" aria-atomic="true" className="text-sm font-medium" suppressHydrationWarning>
          Your Rello trial ends in {formatTrialTimeRemaining(remaining)}.
        </p>
      </div>
      {ctaHref ? (
        <Link href={ctaHref} onClick={onCtaClick} className={ctaClass} style={ctaStyle}>
          {ctaLabel}
        </Link>
      ) : onCtaClick ? (
        <button type="button" onClick={onCtaClick} className={ctaClass} style={ctaStyle}>
          {ctaLabel}
        </button>
      ) : null}
    </section>
  );
}

export { TrialCountdownBanner };
