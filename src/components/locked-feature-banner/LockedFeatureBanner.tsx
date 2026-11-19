"use client";

import * as React from "react";
import { Lock } from "iconoir-react";
import { cn } from "../../lib/cn";
import { LockedActions, emitLockedEvent, type LockedLearnMore, type LockedOnEvent, type LockedPrimaryAction } from "./actions";

export type LockedFeatureBannerVariant = "page" | "section" | "card";

export interface LockedFeatureBannerProps {
  /** Bold lead, e.g. "<Feature> is part of <plan>". Every word is the spoke's. */
  title: string;
  /** One value sentence after the title. */
  body: React.ReactNode;
  /** "page": over a whole locked page; "section": over one section; "card": inside a narrow card (buttons stack). */
  variant: LockedFeatureBannerVariant;
  /** The call to action (a link or a handler). */
  primary: LockedPrimaryAction;
  /** Optional "Learn more" link; opens in a new tab. */
  learnMore?: LockedLearnMore;
  /** Stable seam id the spoke binds to its telemetry namespace. */
  seam: string;
  /**
   * UPSELL_EVENTS: `shown` once per mount, the first time the banner is in view (on mount where
   * IntersectionObserver is unavailable); `clicked` on the primary button or "Learn more".
   */
  onEvent?: LockedOnEvent;
  className?: string;
}

const VARIANT_CLASS: Record<LockedFeatureBannerVariant, string> = {
  page: "flex-col items-start gap-3 p-4 sm:flex-row sm:items-center sm:gap-4 sm:p-5",
  section: "flex-col items-start gap-3 p-4 sm:flex-row sm:items-center",
  card: "flex-col items-start gap-3 p-3",
};

/**
 * Cream banner over a locked page, section or card (PFP GATEWAY D58–D60). Says the feature is part of a bigger plan,
 * with a primary action and an optional "Learn more". Carries no product words, prices or routes of its own.
 */
function LockedFeatureBanner({ title, body, variant, primary, learnMore, seam, onEvent, className }: LockedFeatureBannerProps) {
  const titleId = React.useId();
  const rootRef = React.useRef<HTMLDivElement>(null);
  const onEventRef = React.useRef(onEvent);
  onEventRef.current = onEvent;
  const seamRef = React.useRef(seam);
  seamRef.current = seam;
  // Once per mount, whatever the observer, a re-render or a new onEvent does.
  const shownRef = React.useRef(false);

  React.useEffect(() => {
    const fireShown = () => {
      if (shownRef.current) return;
      shownRef.current = true;
      emitLockedEvent(onEventRef.current, "shown", seamRef.current, "LockedFeatureBanner");
    };
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      fireShown();
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        fireShown();
        observer.disconnect();
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={rootRef}
      role="note"
      aria-labelledby={titleId}
      data-seam={seam}
      data-variant={variant}
      className={cn("flex w-full min-w-0 rounded-xl border", VARIANT_CLASS[variant], className)}
      style={{
        backgroundColor: "var(--warning-light, rgba(212, 168, 75, 0.15))",
        borderColor: "color-mix(in srgb, var(--warning, #D4A84B) 45%, transparent)",
        color: "var(--foreground, #2D3339)",
      }}
    >
      <Lock
        aria-hidden="true"
        width={variant === "card" ? 20 : 26}
        height={variant === "card" ? 20 : 26}
        className="shrink-0"
        style={{ color: "var(--warning, #D4A84B)" }}
      />
      <p className="m-0 min-w-0 flex-1 text-sm [overflow-wrap:anywhere]">
        <strong id={titleId} className="font-semibold">
          {title}
        </strong>{" "}
        {body}
      </p>
      <LockedActions
        primary={primary}
        learnMore={learnMore}
        seam={seam}
        onEvent={onEvent}
        source="LockedFeatureBanner"
        stacked={variant === "card"}
        className={variant === "card" ? "w-full" : "shrink-0"}
      />
    </div>
  );
}

export { LockedFeatureBanner };
