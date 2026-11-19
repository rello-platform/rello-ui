"use client";

import * as React from "react";
import { Lock } from "iconoir-react";
import { cn } from "../../lib/cn";

export type LockedBadgeSize = "sm" | "md";

export interface LockedBadgeProps {
  /** Visible text and the accessible name, e.g. the plan or add-on that unlocks the item. */
  label: string;
  size: LockedBadgeSize;
  className?: string;
}

const SIZE: Record<LockedBadgeSize, { cls: string; icon: number }> = {
  sm: { cls: "gap-1 px-2 py-0.5 text-[11px]", icon: 12 },
  md: { cls: "gap-1.5 px-2.5 py-1 text-xs", icon: 14 },
};

/**
 * Small lock + label marking a locked menu item, card or section (PFP GATEWAY D58–D60). Display only: not a control.
 * The lock is decorative (aria-hidden); the label is what assistive tech reads.
 */
function LockedBadge({ label, size, className }: LockedBadgeProps) {
  const s = SIZE[size];
  return (
    <span
      data-size={size}
      className={cn("inline-flex max-w-full items-center rounded-full font-bold uppercase tracking-wider", s.cls, className)}
      style={{ backgroundColor: "var(--neutral-50, #FAFBFC)", border: "1px solid var(--neutral-100, #D1D5DB)", color: "var(--neutral-700, #434B52)" }}
    >
      <Lock aria-hidden="true" width={s.icon} height={s.icon} className="shrink-0" />
      <span className="min-w-0 truncate">{label}</span>
    </span>
  );
}

export { LockedBadge };
