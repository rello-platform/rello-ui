"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface ProgressSegment {
  /** How many units this segment represents */
  value: number;
  /** CSS color for the segment */
  color: string;
}

export interface SegmentedProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Segments to display (each with a value and color) */
  segments: ProgressSegment[];
  /** Total number of units */
  total: number;
  /** Bar height */
  size?: "sm" | "md" | "lg";
}

const SIZE_MAP = {
  sm: "h-1.5",
  md: "h-2.5",
  lg: "h-3.5",
};

function SegmentedProgress({
  segments,
  total,
  size = "md",
  className,
  ...props
}: SegmentedProgressProps) {
  if (total <= 0) return null;

  return (
    <div
      className={cn("flex gap-1 w-full", className)}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={total}
      aria-valuenow={segments.reduce((sum, s) => sum + s.value, 0)}
      {...props}
    >
      {Array.from({ length: total }).map((_, i) => {
        let color = "var(--neutral-200)";
        let filled = 0;
        for (const seg of segments) {
          if (i < filled + seg.value) {
            color = seg.color;
            break;
          }
          filled += seg.value;
        }
        const isFilled = i < segments.reduce((sum, s) => sum + s.value, 0);

        return (
          <div
            key={i}
            className={cn("flex-1 rounded-full transition-colors duration-300", SIZE_MAP[size])}
            style={{
              backgroundColor: isFilled ? color : "var(--neutral-200)",
            }}
          />
        );
      })}
    </div>
  );
}

export { SegmentedProgress };
