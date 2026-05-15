"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { InfoCircle } from "iconoir-react";
import { cn } from "../../lib/cn";

/**
 * Two-component tooltip primitive surface for admin cards.
 *
 *   <CardTooltipIcon text="..." />    — DEFAULT shape. Render inside a card's
 *                                       title row (next to the <h2>/<h3>).
 *                                       Self-contained: 44×44 button trigger,
 *                                       Radix portal popover, aria wiring.
 *
 *   <CardTooltip text="...">          — FALLBACK shape for untitled banners +
 *     <Banner />                        KPI rows where the title-row icon has
 *   </CardTooltip>                      no anchor. Wraps a card; icon affordance
 *                                       sits in the top-right corner.
 *
 * Mount discipline: consumers must mount <Tooltip.Provider> once at their admin
 * layout root (re-exported as `Tooltip` namespace from this barrel — see
 * ./index.ts). Importing @radix-ui/react-tooltip directly from a spoke is
 * forbidden (SPEC §11 FP-1 — keeps the Radix dependency centralized in this
 * package and out of every consumer's bundle).
 */

const POPOVER_CLASS = cn(
  "z-50 max-w-xs select-text rounded-md border px-3 py-2 text-sm shadow-lg",
  "bg-white",
  "border-[var(--neutral-200,#e5e7eb)]",
  "text-[var(--neutral-900,#111827)]",
  // Radix data-state-driven fade; prefers-reduced-motion disables it.
  "data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0",
  "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
  "motion-reduce:animate-none motion-reduce:transition-none",
);

const ARROW_FILL = "var(--neutral-200, #e5e7eb)";

const TRIGGER_CLASS = cn(
  // 44×44 touch target (w-11 h-11 = 2.75rem each = 44px).
  "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full",
  "bg-transparent",
  "text-[var(--neutral-400,#94a3b8)]",
  "transition-colors duration-150",
  "hover:text-[var(--brand-primary,#2563eb)]",
  "focus-visible:text-[var(--brand-primary,#2563eb)]",
  "focus-visible:outline-2 focus-visible:outline-offset-2",
  "focus-visible:outline-[var(--brand-primary,#2563eb)]",
  "focus:outline-none",
  "cursor-pointer",
);

const WRAPPER_RELATIVE_CLASS = "relative";
const WRAPPER_ICON_POSITION_CLASS = "absolute right-2 top-2";

export interface CardTooltipIconProps {
  /** Single-sentence tooltip body. When empty string, the component renders nothing. */
  text: string;
  /** Optional placement override; defaults to "top". */
  placement?: "top" | "bottom" | "left" | "right";
  /** Optional accessible-label override for screen readers; defaults to "More info". */
  ariaLabel?: string;
  /** Optional className passthrough on the trigger button (NOT the popover). */
  className?: string;
}

export function CardTooltipIcon({
  text,
  placement = "top",
  ariaLabel = "More info",
  className,
}: CardTooltipIconProps): React.ReactElement | null {
  if (text === "") return null;

  return (
    <TooltipPrimitive.Root>
      <TooltipPrimitive.Trigger asChild>
        <button
          type="button"
          aria-label={ariaLabel}
          className={cn(TRIGGER_CLASS, className)}
        >
          <InfoCircle
            width={16}
            height={16}
            strokeWidth={2}
            aria-hidden="true"
          />
        </button>
      </TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          side={placement}
          sideOffset={6}
          className={POPOVER_CLASS}
        >
          {text}
          <TooltipPrimitive.Arrow width={10} height={5} style={{ fill: ARROW_FILL }} />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  );
}
CardTooltipIcon.displayName = "CardTooltipIcon";

export interface CardTooltipProps {
  /** Single-sentence tooltip body. When empty string, the wrapper renders children only (no icon). */
  text: string;
  /** Optional placement override; defaults to "top". */
  placement?: "top" | "bottom" | "left" | "right";
  /** Optional accessible-label override for screen readers; defaults to "More info". */
  ariaLabel?: string;
  /** Card content wrapped by this tooltip wrapper. */
  children: React.ReactNode;
}

export function CardTooltip({
  text,
  placement,
  ariaLabel,
  children,
}: CardTooltipProps): React.ReactElement {
  return (
    <div className={WRAPPER_RELATIVE_CLASS}>
      {children}
      {text !== "" && (
        <div className={WRAPPER_ICON_POSITION_CLASS}>
          <CardTooltipIcon
            text={text}
            placement={placement}
            ariaLabel={ariaLabel}
          />
        </div>
      )}
    </div>
  );
}
CardTooltip.displayName = "CardTooltip";
