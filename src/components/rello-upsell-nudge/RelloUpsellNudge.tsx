"use client";

import * as React from "react";
import { Xmark } from "iconoir-react";
import { Button } from "../button/Button";
import { cn } from "../../lib/cn";
import { renderUpsellCopy } from "./copy";
import { UPSELL_ENGAGED_DWELL_MS } from "./events";

const DEFAULT_CTA_LABEL = "Upgrade to Rello";

export interface RelloUpsellNudgeProps extends React.HTMLAttributes<HTMLElement> {
  /** Stable seam identifier — bound to telemetry namespace at the consumer wrapper. */
  seam: string;
  /** Headline copy (one short line). May carry `{{monthlyPrice}}` / `{{roiCopy}}`. */
  headline: string;
  /** Body copy explaining the Rello-tier capability. May carry `{{monthlyPrice}}` / `{{roiCopy}}`. */
  body: string;
  /** CTA text — defaults to "Upgrade to Rello". May carry tokens; falls back to the default only if substitution empties it (an explicit "" stays empty). */
  ctaLabel?: string;
  /** Click handler — consumer fires `clicked` telemetry then navigates to upgrade flow. */
  onClick: () => void;
  /** Dismiss handler — consumer fires `dismissed` telemetry and hides the nudge. */
  onDismiss: () => void;
  /** Optional left-icon slot. */
  icon?: React.ReactNode;
  /**
   * Display-ready monthly price from Rello's pricing config (e.g. "$199"),
   * substituted for `{{monthlyPrice}}`. Never typed in this package. When it
   * is missing, blank or carries no non-zero digit, the sentence that uses it
   * is omitted; the nudge still renders.
   */
  monthlyPrice?: string | null;
  /** Per-seam ROI line from Rello's config, substituted for `{{roiCopy}}`. Missing → its sentence is omitted. */
  roiCopy?: string | null;
  /**
   * The 5th telemetry event. Fires at most once per mount, when the pointer
   * or keyboard focus has stayed on the nudge for 3 seconds, or when the
   * detail panel is first expanded. The consumer fires
   * `<spoke>.upsell.<seam>.engaged`.
   */
  onEngaged?: () => void;
  /** Optional detail panel behind a disclosure toggle. Expanding it counts as `engaged`. */
  details?: React.ReactNode;
  /** Label of the detail toggle — defaults to "How it works". */
  detailsLabel?: string;
}

function RelloUpsellNudge({
  seam,
  headline,
  body,
  ctaLabel = DEFAULT_CTA_LABEL,
  onClick,
  onDismiss,
  icon,
  monthlyPrice,
  roiCopy,
  onEngaged,
  details,
  detailsLabel = "How it works",
  className,
  onKeyDown,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  ...props
}: RelloUpsellNudgeProps) {
  // Per field. A field with no "{{" renders exactly as at v2.37.1 (an empty
  // headline/body keeps its element; an explicit ctaLabel="" stays empty).
  // Only a field that asked for a substitution and was emptied by it loses
  // its element, or for the CTA falls back to the default label.
  const values = { monthlyPrice, roiCopy };
  const headlineHasToken = typeof headline === "string" && headline.includes("{{");
  const bodyHasToken = typeof body === "string" && body.includes("{{");
  const ctaHasToken = typeof ctaLabel === "string" && ctaLabel.includes("{{");
  const renderedHeadline = headlineHasToken ? renderUpsellCopy(headline, values) : headline;
  const renderedBody = bodyHasToken ? renderUpsellCopy(body, values) : body;
  const renderedCtaRaw = ctaHasToken ? renderUpsellCopy(ctaLabel, values) : ctaLabel;
  const renderedCta = ctaHasToken && renderedCtaRaw === "" ? DEFAULT_CTA_LABEL : renderedCtaRaw;
  const showHeadline = !headlineHasToken || renderedHeadline !== "";
  const showBody = !bodyHasToken || renderedBody !== "";

  const panelId = React.useId();
  const [detailsOpen, setDetailsOpen] = React.useState(false);

  // ── engaged: once per mount, on 3s of continuous hover/focus or first expand ──
  const onEngagedRef = React.useRef(onEngaged);
  onEngagedRef.current = onEngaged;
  const engagedRef = React.useRef(false);
  const dwellTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const hoveringRef = React.useRef(false);
  const focusedRef = React.useRef(false);

  const clearDwell = React.useCallback(() => {
    if (dwellTimerRef.current !== null) {
      clearTimeout(dwellTimerRef.current);
      dwellTimerRef.current = null;
    }
  }, []);

  const fireEngaged = React.useCallback(() => {
    clearDwell();
    if (engagedRef.current) return;
    engagedRef.current = true;
    onEngagedRef.current?.();
  }, [clearDwell]);

  const startDwell = React.useCallback(() => {
    if (engagedRef.current || dwellTimerRef.current !== null || !onEngagedRef.current) return;
    dwellTimerRef.current = setTimeout(fireEngaged, UPSELL_ENGAGED_DWELL_MS);
  }, [fireEngaged]);

  const stopDwellIfIdle = React.useCallback(() => {
    if (!hoveringRef.current && !focusedRef.current) clearDwell();
  }, [clearDwell]);

  React.useEffect(() => clearDwell, [clearDwell]);

  // Caller handlers are composed, never replaced: a spread after ours used to
  // silently drop Escape-to-dismiss, and would do the same to `engaged`.
  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      onDismiss();
    }
    onKeyDown?.(e);
  };
  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    hoveringRef.current = true;
    startDwell();
    onMouseEnter?.(e);
  };
  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    hoveringRef.current = false;
    stopDwellIfIdle();
    onMouseLeave?.(e);
  };
  const handleFocus = (e: React.FocusEvent<HTMLElement>) => {
    focusedRef.current = true;
    startDwell();
    onFocus?.(e);
  };
  const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
    const next = e.relatedTarget as Node | null;
    if (!next || !e.currentTarget.contains(next)) {
      focusedRef.current = false;
      stopDwellIfIdle();
    }
    onBlur?.(e);
  };
  const toggleDetails = () => {
    setDetailsOpen((open) => !open);
    fireEngaged();
  };

  return (
    <section
      role="region"
      aria-label="Rello upgrade option"
      data-seam={seam}
      className={cn(
        "rounded-lg p-4 mb-4 flex flex-col sm:flex-row sm:items-center gap-3",
        className,
      )}
      style={{
        border: "1px solid var(--neutral-200, #e5e7eb)",
        backgroundColor: "transparent",
      }}
      {...props}
      onKeyDown={handleKeyDown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <div className="flex items-start gap-3 flex-1 min-w-0">
        {icon ? (
          <div
            aria-hidden="true"
            className="shrink-0 flex items-center justify-center"
            style={{ color: "var(--brand-primary, #6b4f7e)" }}
          >
            {icon}
          </div>
        ) : null}
        <div className="min-w-0 flex-1">
          {showHeadline ? (
            <h3
              className="text-sm font-semibold"
              style={{ color: "var(--foreground, #111827)" }}
            >
              {renderedHeadline}
            </h3>
          ) : null}
          {showBody ? (
            <p
              className="text-xs mt-1"
              style={{ color: "var(--neutral-700, #374151)" }}
            >
              {renderedBody}
            </p>
          ) : null}
          {details ? (
            <>
              <button
                type="button"
                aria-expanded={detailsOpen}
                aria-controls={detailsOpen ? panelId : undefined}
                onClick={toggleDetails}
                className="mt-1 inline-flex items-center min-h-[44px] text-xs font-medium underline-offset-4 hover:underline rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary,#3B5998)] focus-visible:ring-offset-2"
                style={{ color: "var(--brand-primary, #3B5998)" }}
              >
                {detailsLabel}
              </button>
              {detailsOpen ? (
                <div
                  id={panelId}
                  className="text-xs"
                  style={{ color: "var(--neutral-700, #374151)" }}
                >
                  {details}
                </div>
              ) : null}
            </>
          ) : null}
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0 self-stretch sm:self-auto">
        <Button
          type="button"
          variant="primary"
          size="lg"
          onClick={onClick}
          className="min-h-[44px] w-full sm:w-auto"
        >
          {renderedCta}
        </Button>
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss upgrade nudge"
          className="inline-flex items-center justify-center rounded-md min-w-[44px] min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary,#6b4f7e)] focus-visible:ring-offset-2 transition-colors hover:bg-[var(--neutral-100,#f3f4f6)]"
          style={{ color: "var(--neutral-500, #6b7280)" }}
        >
          <Xmark width={20} height={20} />
        </button>
      </div>
    </section>
  );
}

export { RelloUpsellNudge };
