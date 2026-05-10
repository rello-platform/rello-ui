"use client";

import * as React from "react";
import { Xmark } from "iconoir-react";
import { Button } from "../button/Button";
import { cn } from "../../lib/cn";

export interface RelloUpsellNudgeProps extends React.HTMLAttributes<HTMLElement> {
  /** Stable seam identifier — bound to telemetry namespace at the consumer wrapper. */
  seam: string;
  /** Headline copy (one short line). */
  headline: string;
  /** Body copy explaining the Rello-tier capability. */
  body: string;
  /** CTA text — defaults to "Upgrade to Rello". */
  ctaLabel?: string;
  /** Click handler — consumer fires `clicked` telemetry then navigates to upgrade flow. */
  onClick: () => void;
  /** Dismiss handler — consumer fires `dismissed` telemetry and hides the nudge. */
  onDismiss: () => void;
  /** Optional left-icon slot. */
  icon?: React.ReactNode;
}

function RelloUpsellNudge({
  seam,
  headline,
  body,
  ctaLabel = "Upgrade to Rello",
  onClick,
  onDismiss,
  icon,
  className,
  ...props
}: RelloUpsellNudgeProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      onDismiss();
    }
    props.onKeyDown?.(e);
  };

  return (
    <section
      role="region"
      aria-label="Rello upgrade option"
      data-seam={seam}
      onKeyDown={handleKeyDown}
      className={cn(
        "rounded-lg p-4 mb-4 flex flex-col sm:flex-row sm:items-center gap-3",
        className,
      )}
      style={{
        border: "1px solid var(--neutral-200, #e5e7eb)",
        backgroundColor: "transparent",
      }}
      {...props}
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
          <h3
            className="text-sm font-semibold"
            style={{ color: "var(--foreground, #111827)" }}
          >
            {headline}
          </h3>
          <p
            className="text-xs mt-1"
            style={{ color: "var(--neutral-700, #374151)" }}
          >
            {body}
          </p>
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
          {ctaLabel}
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
