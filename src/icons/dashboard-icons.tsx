"use client";

/**
 * Custom Branded Illustration Icons — Dashboard Cards
 *
 * Style: 48x48 viewBox, accent-colored, strokeWidth 1.5–2,
 * multi-opacity depth layers, at least one micro-detail per icon.
 * All icons accept { accent: string } prop for white-label theming.
 */

import * as React from "react";
import type { TrackIconProps } from "./track-icons";

/* ==========================================
   THE DAWN — sunrise with task checkmarks
   For "Five Before 9" action card
   ========================================== */
export function DawnIcon({ accent, size = 48, className }: TrackIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      {/* Horizon line */}
      <line x1="4" y1="30" x2="44" y2="30" stroke={accent} strokeWidth="1.5" opacity="0.2" />
      {/* Sun rising */}
      <path d="M14 30a10 10 0 0 1 20 0" fill={accent} opacity="0.1" />
      <path d="M14 30a10 10 0 0 1 20 0" stroke={accent} strokeWidth="2" fill="none" />
      {/* Sun rays */}
      {[0, 30, 60, 90, 120, 150].map((angle) => {
        const rad = ((angle) * Math.PI) / 180;
        return (
          <line
            key={angle}
            x1={24 + Math.cos(rad) * 13}
            y1={30 - Math.sin(rad) * 13}
            x2={24 + Math.cos(rad) * 17}
            y2={30 - Math.sin(rad) * 17}
            stroke={accent}
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.3"
          />
        );
      })}
      {/* Checkmark boxes — task completion */}
      <rect x="8" y="34" width="5" height="5" rx="1" stroke={accent} strokeWidth="1" opacity="0.25" />
      <path d="M9.5 37l1.5 1.5 2.5-2.5" stroke={accent} strokeWidth="1" opacity="0.5" strokeLinecap="round" />
      <rect x="16" y="34" width="5" height="5" rx="1" stroke={accent} strokeWidth="1" opacity="0.25" />
      <path d="M17.5 37l1.5 1.5 2.5-2.5" stroke={accent} strokeWidth="1" opacity="0.5" strokeLinecap="round" />
      <rect x="24" y="34" width="5" height="5" rx="1" stroke={accent} strokeWidth="1" opacity="0.15" />
      <rect x="32" y="34" width="5" height="5" rx="1" stroke={accent} strokeWidth="1" opacity="0.1" />
      {/* Micro-detail: sparkle */}
      <circle cx="38" cy="14" r="1.2" fill={accent} opacity="0.3" />
      <path d="M36 12l2-2" stroke={accent} strokeWidth="1" opacity="0.4" strokeLinecap="round" />
      {/* Wisp */}
      <path d="M6 28c2-1 3 0 5-1" stroke={accent} strokeWidth="0.8" opacity="0.15" strokeLinecap="round" />
    </svg>
  );
}

/* ==========================================
   THE SIGNAL — chat bubbles with waves
   For Conversations Inbox card
   ========================================== */
export function SignalIcon({ accent, size = 48, className }: TrackIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      {/* Primary chat bubble */}
      <path
        d="M10 10h20a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H18l-6 5v-5h-2a2 2 0 0 1-2-2V12a2 2 0 0 1 2-2z"
        fill={accent}
        opacity="0.1"
        stroke={accent}
        strokeWidth="2"
      />
      {/* Chat lines */}
      <line x1="15" y1="16" x2="27" y2="16" stroke={accent} strokeWidth="1.5" opacity="0.25" strokeLinecap="round" />
      <line x1="15" y1="20" x2="23" y2="20" stroke={accent} strokeWidth="1.5" opacity="0.2" strokeLinecap="round" />
      {/* Secondary bubble (reply) */}
      <path
        d="M20 28h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2v3l-4-3h-10a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2z"
        fill={accent}
        fillOpacity="0.06"
        stroke={accent}
        strokeWidth="1.5"
        opacity="0.3"
      />
      {/* Reply dots */}
      <circle cx="27" cy="34" r="1.2" fill={accent} opacity="0.3" />
      <circle cx="31" cy="34" r="1.2" fill={accent} opacity="0.25" />
      <circle cx="35" cy="34" r="1.2" fill={accent} opacity="0.2" />
      {/* Signal waves — communication ripples */}
      <path d="M36 8c2 0 3 1 3 3" stroke={accent} strokeWidth="1" opacity="0.2" strokeLinecap="round" fill="none" />
      <path d="M36 5c4 0 6 2 6 6" stroke={accent} strokeWidth="1" opacity="0.15" strokeLinecap="round" fill="none" />
      {/* Micro-detail: notification dot */}
      <circle cx="32" cy="10" r="2" fill={accent} opacity="0.4" />
      {/* Sparkle */}
      <circle cx="40" cy="4" r="0.8" fill={accent} opacity="0.25" />
    </svg>
  );
}

/* ==========================================
   THE PULSE — chart line with market pulse
   For Market Intel TL;DR card
   ========================================== */
export function PulseIcon({ accent, size = 48, className }: TrackIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      {/* Chart background area */}
      <path d="M8 38L8 12" stroke={accent} strokeWidth="1.5" opacity="0.2" />
      <path d="M8 38L42 38" stroke={accent} strokeWidth="1.5" opacity="0.2" />
      {/* Grid lines */}
      <line x1="8" y1="20" x2="42" y2="20" stroke={accent} strokeWidth="0.5" opacity="0.08" />
      <line x1="8" y1="28" x2="42" y2="28" stroke={accent} strokeWidth="0.5" opacity="0.08" />
      {/* Area fill under chart */}
      <path
        d="M8 32 L14 28 L20 30 L26 18 L32 22 L38 14 L42 16 L42 38 L8 38Z"
        fill={accent}
        opacity="0.08"
      />
      {/* Main chart line */}
      <path
        d="M8 32 L14 28 L20 30 L26 18 L32 22 L38 14 L42 16"
        stroke={accent}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Trend arrow at peak */}
      <path d="M36 16l4-2" stroke={accent} strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      <path d="M40 14l0 3.5" stroke={accent} strokeWidth="1" strokeLinecap="round" opacity="0.3" />
      <path d="M40 14l-3 0" stroke={accent} strokeWidth="1" strokeLinecap="round" opacity="0.3" />
      {/* Data point dots */}
      <circle cx="14" cy="28" r="1.5" fill={accent} opacity="0.2" />
      <circle cx="26" cy="18" r="2" fill={accent} opacity="0.35" />
      <circle cx="38" cy="14" r="2" fill={accent} opacity="0.4" />
      {/* Micro-detail: pulse wave */}
      <path d="M12 8l2 3 2-5 2 4 2-2" stroke={accent} strokeWidth="1" opacity="0.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* Sparkle */}
      <circle cx="42" cy="10" r="1" fill={accent} opacity="0.3" />
      <path d="M40 8l2-2" stroke={accent} strokeWidth="1" opacity="0.35" strokeLinecap="round" />
    </svg>
  );
}

/* ==========================================
   THE ATLAS — map pin with terrain contours
   For Neighborhood Intel card
   ========================================== */
export function AtlasIcon({ accent, size = 48, className }: TrackIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      {/* Terrain contour lines */}
      <path d="M6 36c4-2 8 1 12-1s8-3 12-1 8 2 12-1" stroke={accent} strokeWidth="0.8" opacity="0.12" strokeLinecap="round" fill="none" />
      <path d="M6 40c4-2 8 1 12-1s8-3 12-1 8 2 12-1" stroke={accent} strokeWidth="0.8" opacity="0.08" strokeLinecap="round" fill="none" />
      <path d="M6 32c4-1 8 2 12 0s8-2 12 0 8 1 12-1" stroke={accent} strokeWidth="0.8" opacity="0.1" strokeLinecap="round" fill="none" />
      {/* Map pin — main */}
      <path
        d="M24 6c-6 0-10 4.5-10 10 0 8 10 18 10 18s10-10 10-18c0-5.5-4-10-10-10z"
        fill={accent}
        opacity="0.1"
        stroke={accent}
        strokeWidth="2"
      />
      {/* Pin inner circle */}
      <circle cx="24" cy="16" r="4" fill={accent} fillOpacity="0.25" stroke={accent} strokeWidth="1" opacity="0.3" />
      {/* Pin highlight */}
      <circle cx="22" cy="14" r="1.5" fill={accent} opacity="0.15" />
      {/* Radius ring — coverage area */}
      <ellipse cx="24" cy="38" rx="12" ry="3" stroke={accent} strokeWidth="1" opacity="0.15" strokeDasharray="3 3" fill="none" />
      {/* Small house markers */}
      <rect x="12" y="28" width="3" height="3" rx="0.5" fill={accent} opacity="0.12" />
      <rect x="33" y="26" width="3" height="3" rx="0.5" fill={accent} opacity="0.1" />
      <rect x="16" y="24" width="2" height="2" rx="0.3" fill={accent} opacity="0.08" />
      {/* Micro-detail: compass rose */}
      <circle cx="40" cy="8" r="3" stroke={accent} strokeWidth="0.8" opacity="0.2" fill="none" />
      <line x1="40" y1="5.5" x2="40" y2="6.5" stroke={accent} strokeWidth="0.8" opacity="0.3" />
      <line x1="40" y1="9.5" x2="40" y2="10.5" stroke={accent} strokeWidth="0.8" opacity="0.15" />
      {/* Sparkle */}
      <circle cx="8" cy="10" r="0.8" fill={accent} opacity="0.2" />
    </svg>
  );
}

/* ==========================================
   REGISTRY
   ========================================== */

export const DASHBOARD_ICONS: Record<string, React.ComponentType<TrackIconProps>> = {
  dawn: DawnIcon,
  signal: SignalIcon,
  pulse: PulseIcon,
  atlas: AtlasIcon,
};
