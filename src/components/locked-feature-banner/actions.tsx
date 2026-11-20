"use client";

import * as React from "react";
import { cn } from "../../lib/cn";
import type { UpsellEvent } from "../rello-upsell-nudge/events";

/**
 * The locked-feature call to action, shared by LockedFeatureBanner and LockedFeatureDialog (v2.43.0).
 * Exactly one target: a link (`href`, optional `onClick` alongside it) or a handler (`onClick`). The spoke owns what it
 * does (start a trial, open a page); these components never start anything themselves.
 */
export type LockedPrimaryAction =
  | { label: string; href: string; onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void }
  | { label: string; onClick: (event: React.MouseEvent<HTMLButtonElement>) => void; href?: undefined };

/** "Learn more": always a link that opens in a new tab (`rel="noopener noreferrer"`). */
export interface LockedLearnMore {
  label: string;
  href: string;
  /**
   * Screen-reader-only words after the label, telling the reader it opens a new tab. Defaults to
   * "(opens in a new tab)"; pass "" to omit.
   */
  newTabHint?: string;
}

/** Telemetry callback: one of the shared UPSELL_EVENTS plus the seam the spoke gave. */
export type LockedOnEvent = (event: UpsellEvent, seam: string) => void;

/** A throwing telemetry callback never breaks the button it rides on. */
export function emitLockedEvent(onEvent: LockedOnEvent | undefined, event: UpsellEvent, seam: string, source: string): void {
  if (!onEvent) return;
  try {
    onEvent(event, seam);
  } catch (err) {
    console.error(`[${source}] onEvent threw`, { event, seam, err });
  }
}

export const LOCKED_PRIMARY_CLASS =
  "inline-flex items-center justify-center gap-2 min-h-[44px] min-w-[44px] px-4 rounded-md text-sm font-semibold text-center no-underline transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary,#3B5998)] focus-visible:ring-offset-2";
export const LOCKED_PRIMARY_STYLE: React.CSSProperties = {
  backgroundColor: "var(--brand-primary, #3B5998)",
  color: "var(--brand-primary-foreground, #FFFFFF)",
};
export const LOCKED_SECONDARY_CLASS =
  "inline-flex items-center justify-center gap-2 min-h-[44px] min-w-[44px] px-4 rounded-md text-sm font-semibold text-center no-underline border transition-colors hover:bg-[var(--neutral-50,#FAFBFC)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary,#3B5998)] focus-visible:ring-offset-2";
export const LOCKED_SECONDARY_STYLE: React.CSSProperties = {
  borderColor: "var(--card-border, #D1D5DB)",
  color: "var(--neutral-700, #434B52)",
  backgroundColor: "var(--card-background, #FFFFFF)",
};

const SR_ONLY = "sr-only";

export interface LockedActionsProps {
  primary: LockedPrimaryAction;
  learnMore?: LockedLearnMore;
  seam: string;
  onEvent?: LockedOnEvent;
  /** Component name for error logs. */
  source: string;
  /** Stack the buttons (a narrow card); otherwise they wrap side by side. */
  stacked?: boolean;
  className?: string;
}

/** The primary button and "Learn more". Each click reports `clicked` once, then runs the spoke's own handler. */
export function LockedActions({ primary, learnMore, seam, onEvent, source, stacked = false, className }: LockedActionsProps) {
  const primaryEl =
    typeof primary.href === "string" && primary.href !== "" ? (
      <a
        href={primary.href}
        className={LOCKED_PRIMARY_CLASS}
        style={LOCKED_PRIMARY_STYLE}
        onClick={(event) => {
          emitLockedEvent(onEvent, "clicked", seam, source);
          (primary.onClick as ((e: React.MouseEvent<HTMLAnchorElement>) => void) | undefined)?.(event);
        }}
      >
        {primary.label}
      </a>
    ) : (
      <button
        type="button"
        className={LOCKED_PRIMARY_CLASS}
        style={LOCKED_PRIMARY_STYLE}
        onClick={(event) => {
          emitLockedEvent(onEvent, "clicked", seam, source);
          (primary.onClick as ((e: React.MouseEvent<HTMLButtonElement>) => void) | undefined)?.(event);
        }}
      >
        {primary.label}
      </button>
    );

  const hint = learnMore?.newTabHint ?? "(opens in a new tab)";
  return (
    <div className={cn("flex flex-wrap gap-2", stacked ? "flex-col items-stretch" : "items-center", className)}>
      {primaryEl}
      {learnMore ? (
        <a
          href={learnMore.href}
          target="_blank"
          rel="noopener noreferrer"
          className={LOCKED_SECONDARY_CLASS}
          style={LOCKED_SECONDARY_STYLE}
          onClick={() => emitLockedEvent(onEvent, "clicked", seam, source)}
        >
          {learnMore.label}
          {hint !== "" ? <span className={SR_ONLY}> {hint}</span> : null}
        </a>
      ) : null}
    </div>
  );
}
