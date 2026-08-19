"use client";

import * as React from "react";
import { cn } from "../../lib/cn";
import { alphaTint } from "../../lib/alpha-tint";

/* ==========================================
   TYPES
   ========================================== */

export interface CardIllustrationProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Accent color. Any CSS color value — a literal hex (`"#5B9EA6"`) or a custom
   * property (`"var(--brand-accent, #5B9EA6)"`) both work, so a caller can bind
   * this to per-tenant branding without resolving the hex first.
   */
  accent: string;
  /** Container size in px (default 88) */
  size?: number;
  /** CSS-expression size override (e.g. `clamp(48px, 6vw, 88px)`). Wins over `size` (number) when present. */
  sizeOverride?: string;
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
      sizeOverride,
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
    // `alphaTint`, not a hex-alpha suffix: the suffix is string concatenation and
    // silently invalidates the declaration when `accent` is a `var(...)`. See
    // src/lib/alpha-tint.ts. This also drops a rounding artifact — the old path
    // quantised bgOpacity to an 8-bit alpha byte, so the documented default of
    // 0.14 actually rendered at 0x24/255 = 14.12%.
    const containerBg = dark
      ? `rgba(255, 255, 255, ${0.06})`
      : alphaTint(accent, bgOpacity * 100);
    const pOpacity = dark ? Math.min(patternOpacity * 2.5, 0.2) : patternOpacity;

    const dimensionStyle: React.CSSProperties = sizeOverride
      ? { width: sizeOverride, height: sizeOverride }
      : { width: size, height: size };

    return (
      <div
        ref={ref}
        className={cn("relative flex items-center justify-center overflow-hidden shrink-0", className)}
        style={{
          ...dimensionStyle,
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
        {/* Layer 3 — Primary icon. Wrapper is flex-centered (not just the
            outer container) to neutralize the line-box descender that SVG's
            default `display: inline` introduces — otherwise the icon visually
            shifts up by a few pixels inside the bounding box. */}
        {icon && (
          <div className="relative flex items-center justify-center">{icon}</div>
        )}
      </div>
    );
  },
);
CardIllustration.displayName = "CardIllustration";

export { CardIllustration };
