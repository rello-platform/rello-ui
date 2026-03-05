"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

/* ==========================================
   TYPES
   ========================================== */

export interface CardIllustrationProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Accent color hex (e.g. "#5B9EA6") */
  accent: string;
  /** Container size in px (default 88) */
  size?: number;
  /** Border radius in px (default 18) */
  radius?: number;
  /** Container background opacity 0-1 (default 0.14) */
  bgOpacity?: number;
  /** Pattern SVG element (Layer 2) — rendered at low opacity inside the container */
  pattern?: React.ReactNode;
  /** Pattern opacity 0-1 (default 0.12) */
  patternOpacity?: number;
  /** Icon/illustration element (Layer 3) — rendered centered on top */
  icon?: React.ReactNode;
  /** Dark mode variant — adjusts opacities per spec */
  dark?: boolean;
}

/**
 * Branded Card Illustration — 3-layer construction
 *
 * Layer 1: Tinted container (accent at 6-10% opacity)
 * Layer 2: Decorative SVG pattern (3-12% opacity)
 * Layer 3: Primary icon/illustration (centered)
 *
 * Used on dashboard cards, survey steps, and track cards.
 */
const CardIllustration = React.forwardRef<HTMLDivElement, CardIllustrationProps>(
  (
    {
      className,
      accent,
      size = 88,
      radius = 18,
      bgOpacity = 0.14,
      pattern,
      patternOpacity = 0.12,
      icon,
      dark = false,
      style,
      ...props
    },
    ref,
  ) => {
    // Dark mode adjustments per spec
    const containerBg = dark
      ? `rgba(255, 255, 255, ${0.06})`
      : `${accent}${Math.round((bgOpacity * 255)).toString(16).padStart(2, "0")}`;
    const pOpacity = dark ? Math.min(patternOpacity * 2.5, 0.2) : patternOpacity;

    return (
      <div
        ref={ref}
        className={cn("relative flex items-center justify-center overflow-hidden shrink-0", className)}
        style={{
          width: size,
          height: size,
          borderRadius: radius,
          backgroundColor: containerBg,
          ...style,
        }}
        {...props}
      >
        {/* Layer 2 — Decorative pattern */}
        {pattern && (
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox={`0 0 ${size} ${size}`}
            style={{ opacity: pOpacity }}
          >
            {pattern}
          </svg>
        )}
        {/* Layer 3 — Primary icon */}
        {icon && <div className="relative">{icon}</div>}
      </div>
    );
  },
);
CardIllustration.displayName = "CardIllustration";

export { CardIllustration };
