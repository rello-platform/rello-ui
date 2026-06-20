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

// ============== WAVE 1 ICONS (7) ==============

/* ==========================================
   THE LEDGER — kanban columns with flow arrows
   For DashboardStatsRow (My Pipeline) card
   ========================================== */
export function MyPipelineIcon({ accent, size = 48, className }: TrackIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      {/* Baseline */}
      <line x1="6" y1="40" x2="42" y2="40" stroke={accent} strokeWidth="1" opacity="0.15" strokeLinecap="round" />
      {/* Faint grid */}
      <line x1="6" y1="32" x2="42" y2="32" stroke={accent} strokeWidth="0.5" opacity="0.08" />
      <line x1="6" y1="24" x2="42" y2="24" stroke={accent} strokeWidth="0.5" opacity="0.08" />
      {/* Column 1 — tallest (new leads) */}
      <rect
        x="8"
        y="14"
        width="8"
        height="26"
        rx="1.5"
        fill={accent}
        fillOpacity="0.1"
        stroke={accent}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Column 2 — mid */}
      <rect
        x="20"
        y="20"
        width="8"
        height="20"
        rx="1.5"
        fill={accent}
        fillOpacity="0.08"
        stroke={accent}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Column 3 — shortest (closed) */}
      <rect
        x="32"
        y="26"
        width="8"
        height="14"
        rx="1.5"
        fill={accent}
        fillOpacity="0.06"
        stroke={accent}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Flow arrows between columns */}
      <path d="M16 22l4 0" stroke={accent} strokeWidth="1" opacity="0.35" strokeLinecap="round" />
      <path d="M19 21l1 1-1 1" stroke={accent} strokeWidth="1" opacity="0.35" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M28 28l4 0" stroke={accent} strokeWidth="1" opacity="0.3" strokeLinecap="round" />
      <path d="M31 27l1 1-1 1" stroke={accent} strokeWidth="1" opacity="0.3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* Data dots atop each column */}
      <circle cx="12" cy="11" r="1.5" fill={accent} opacity="0.4" />
      <circle cx="24" cy="17" r="1.5" fill={accent} opacity="0.3" />
      <circle cx="36" cy="23" r="1.5" fill={accent} opacity="0.25" />
      {/* Micro-detail: trend mark top-right */}
      <path d="M38 9l3-3" stroke={accent} strokeWidth="1" opacity="0.3" strokeLinecap="round" />
      <path d="M41 6l0 2" stroke={accent} strokeWidth="1" opacity="0.25" strokeLinecap="round" />
      <path d="M41 6l-2 0" stroke={accent} strokeWidth="1" opacity="0.25" strokeLinecap="round" />
      {/* Sparkle */}
      <circle cx="6" cy="8" r="0.8" fill={accent} opacity="0.2" />
    </svg>
  );
}

/* ==========================================
   THE SPARK — lightning bolt with checkmark badge
   For QuickActionsPanel card
   ========================================== */
export function ActionsIcon({ accent, size = 48, className }: TrackIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      {/* Background ripple ring */}
      <circle cx="22" cy="24" r="18" stroke={accent} strokeWidth="0.5" opacity="0.08" fill="none" />
      <circle cx="22" cy="24" r="14" stroke={accent} strokeWidth="0.5" opacity="0.1" fill="none" />
      {/* Primary lightning bolt */}
      <path
        d="M24 6 L14 26 L22 26 L20 42 L32 22 L24 22 Z"
        fill={accent}
        fillOpacity="0.1"
        stroke={accent}
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* Bolt highlight crease */}
      <path d="M22 14l-3 8" stroke={accent} strokeWidth="1" opacity="0.25" strokeLinecap="round" />
      {/* Action ripple dots radiating */}
      <circle cx="8" cy="20" r="1.2" fill={accent} opacity="0.3" />
      <circle cx="6" cy="28" r="1" fill={accent} opacity="0.2" />
      <circle cx="40" cy="16" r="1.2" fill={accent} opacity="0.3" />
      <circle cx="42" cy="24" r="1" fill={accent} opacity="0.2" />
      <circle cx="12" cy="38" r="1" fill={accent} opacity="0.18" />
      {/* Check badge bottom-right */}
      <circle cx="36" cy="36" r="5" fill={accent} fillOpacity="0.15" stroke={accent} strokeWidth="1.5" opacity="0.5" />
      <path d="M33.5 36l1.8 1.8 3.2-3.5" stroke={accent} strokeWidth="1.2" opacity="0.7" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* Sparkle */}
      <circle cx="40" cy="8" r="0.8" fill={accent} opacity="0.3" />
      <path d="M38 6l2 2" stroke={accent} strokeWidth="1" opacity="0.35" strokeLinecap="round" />
    </svg>
  );
}

/* ==========================================
   THE ORACLE — geometric brain with synapse pulses
   For MiloInsightsSummary card
   ========================================== */
export function BrainIcon({ accent, size = 48, className }: TrackIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      {/* Background thought aura */}
      <circle cx="24" cy="24" r="20" stroke={accent} strokeWidth="0.5" opacity="0.08" fill="none" />
      {/* Left hemisphere */}
      <path
        d="M22 10c-5 0-9 4-9 9 0 2 .5 3.5 1.5 5-1 1.5-1.5 3-1.5 4.5 0 4 3.5 7.5 9 7.5V10z"
        fill={accent}
        fillOpacity="0.1"
        stroke={accent}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Right hemisphere */}
      <path
        d="M26 10c5 0 9 4 9 9 0 2-.5 3.5-1.5 5 1 1.5 1.5 3 1.5 4.5 0 4-3.5 7.5-9 7.5V10z"
        fill={accent}
        fillOpacity="0.1"
        stroke={accent}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Center cleft */}
      <line x1="24" y1="11" x2="24" y2="35" stroke={accent} strokeWidth="1" opacity="0.25" strokeDasharray="2 2" />
      {/* Internal neural lines — left */}
      <path d="M17 16c2 1 3 3 3 5" stroke={accent} strokeWidth="1" opacity="0.3" strokeLinecap="round" fill="none" />
      <path d="M16 24c1.5 0 3 1.5 4 3" stroke={accent} strokeWidth="1" opacity="0.25" strokeLinecap="round" fill="none" />
      {/* Internal neural lines — right */}
      <path d="M31 16c-2 1-3 3-3 5" stroke={accent} strokeWidth="1" opacity="0.3" strokeLinecap="round" fill="none" />
      <path d="M32 24c-1.5 0-3 1.5-4 3" stroke={accent} strokeWidth="1" opacity="0.25" strokeLinecap="round" fill="none" />
      {/* Synapse pulse dots between hemispheres */}
      <circle cx="20" cy="18" r="1.2" fill={accent} opacity="0.4" />
      <circle cx="28" cy="22" r="1.2" fill={accent} opacity="0.35" />
      <circle cx="20" cy="28" r="1" fill={accent} opacity="0.3" />
      <circle cx="28" cy="30" r="1.2" fill={accent} opacity="0.35" />
      {/* Synapse arc connecting them */}
      <path d="M20 18c2 1 6 3 8 4" stroke={accent} strokeWidth="0.8" opacity="0.2" strokeLinecap="round" fill="none" />
      {/* Micro-detail: insight spark top */}
      <path d="M24 4l0 3" stroke={accent} strokeWidth="1" opacity="0.4" strokeLinecap="round" />
      <path d="M21 5l1 1.5" stroke={accent} strokeWidth="1" opacity="0.3" strokeLinecap="round" />
      <path d="M27 5l-1 1.5" stroke={accent} strokeWidth="1" opacity="0.3" strokeLinecap="round" />
      {/* Sparkle */}
      <circle cx="42" cy="40" r="0.8" fill={accent} opacity="0.25" />
      <path d="M40 38l2 2" stroke={accent} strokeWidth="1" opacity="0.3" strokeLinecap="round" />
    </svg>
  );
}

/* ==========================================
   THE CURRENT — horizontal arrow flow with stage circles
   For PipelineMovementCard
   ========================================== */
export function FlowIcon({ accent, size = 48, className }: TrackIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      {/* Velocity lines behind */}
      <line x1="4" y1="14" x2="14" y2="14" stroke={accent} strokeWidth="1" opacity="0.12" strokeLinecap="round" />
      <line x1="4" y1="36" x2="14" y2="36" stroke={accent} strokeWidth="1" opacity="0.1" strokeLinecap="round" />
      <line x1="6" y1="18" x2="14" y2="18" stroke={accent} strokeWidth="0.8" opacity="0.08" strokeLinecap="round" />
      <line x1="6" y1="32" x2="14" y2="32" stroke={accent} strokeWidth="0.8" opacity="0.08" strokeLinecap="round" />
      {/* Main flow arrow shaft */}
      <path
        d="M6 24 L38 24"
        stroke={accent}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      {/* Arrow head */}
      <path
        d="M34 18 L42 24 L34 30"
        stroke={accent}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={accent}
        fillOpacity="0.1"
      />
      {/* Stage circle 1 */}
      <circle cx="12" cy="24" r="3.5" fill={accent} fillOpacity="0.15" stroke={accent} strokeWidth="1.5" opacity="0.7" />
      {/* Stage circle 2 */}
      <circle cx="22" cy="24" r="3.5" fill={accent} fillOpacity="0.1" stroke={accent} strokeWidth="1.5" opacity="0.5" />
      {/* Stage circle 3 */}
      <circle cx="32" cy="24" r="3.5" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1.5" opacity="0.35" />
      {/* Inner dots */}
      <circle cx="12" cy="24" r="1" fill={accent} opacity="0.4" />
      <circle cx="22" cy="24" r="1" fill={accent} opacity="0.3" />
      <circle cx="32" cy="24" r="1" fill={accent} opacity="0.2" />
      {/* Micro-detail: motion wisp */}
      <path d="M42 12c-2 1-3 2-3 3" stroke={accent} strokeWidth="1" opacity="0.25" strokeLinecap="round" fill="none" />
      {/* Sparkle */}
      <circle cx="6" cy="40" r="0.8" fill={accent} opacity="0.25" />
      <path d="M4 38l2 2" stroke={accent} strokeWidth="1" opacity="0.3" strokeLinecap="round" />
    </svg>
  );
}

/* ==========================================
   THE STACK — angled document stack with progress
   For DocsPendingCard
   ========================================== */
export function DocsIcon({ accent, size = 48, className }: TrackIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      {/* Background hatch lines */}
      <line x1="4" y1="42" x2="44" y2="42" stroke={accent} strokeWidth="0.5" opacity="0.1" />
      <line x1="6" y1="38" x2="14" y2="38" stroke={accent} strokeWidth="0.5" opacity="0.08" />
      {/* Bottom doc (deepest tilt) */}
      <rect
        x="12"
        y="14"
        width="20"
        height="26"
        rx="1.5"
        fill={accent}
        fillOpacity="0.06"
        stroke={accent}
        strokeWidth="1.5"
        opacity="0.3"
        transform="rotate(-8 22 27)"
      />
      {/* Middle doc */}
      <rect
        x="14"
        y="12"
        width="20"
        height="26"
        rx="1.5"
        fill={accent}
        fillOpacity="0.08"
        stroke={accent}
        strokeWidth="1.5"
        opacity="0.5"
        transform="rotate(-3 24 25)"
      />
      {/* Top doc — primary */}
      <rect
        x="14"
        y="10"
        width="20"
        height="26"
        rx="1.5"
        fill={accent}
        fillOpacity="0.1"
        stroke={accent}
        strokeWidth="2"
      />
      {/* Top doc text lines */}
      <line x1="17" y1="16" x2="29" y2="16" stroke={accent} strokeWidth="1" opacity="0.3" strokeLinecap="round" />
      <line x1="17" y1="20" x2="27" y2="20" stroke={accent} strokeWidth="1" opacity="0.25" strokeLinecap="round" />
      <line x1="17" y1="24" x2="28" y2="24" stroke={accent} strokeWidth="1" opacity="0.2" strokeLinecap="round" />
      {/* Progress bar on top doc */}
      <rect x="17" y="29" width="14" height="2" rx="1" stroke={accent} strokeWidth="0.8" opacity="0.3" fill="none" />
      <rect x="17" y="29" width="9" height="2" rx="1" fill={accent} opacity="0.5" />
      {/* Paperclip detail */}
      <path
        d="M31 8c1.5 0 2.5 1 2.5 2.5v3c0 1-1 2-2 2s-2-1-2-2v-2.5"
        stroke={accent}
        strokeWidth="1"
        opacity="0.4"
        strokeLinecap="round"
        fill="none"
      />
      {/* Micro-detail: pending dot top-right */}
      <circle cx="40" cy="10" r="1.8" fill={accent} opacity="0.4" />
      {/* Sparkle */}
      <circle cx="8" cy="8" r="0.8" fill={accent} opacity="0.2" />
      <path d="M6 6l2 2" stroke={accent} strokeWidth="1" opacity="0.3" strokeLinecap="round" />
    </svg>
  );
}

/* ==========================================
   THE BEACON — bell with rate-spike line
   For RateAlertsCard
   ========================================== */
export function RateAlertIcon({ accent, size = 48, className }: TrackIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      {/* Ringing waves above */}
      <path d="M14 8c0-3 4-5 10-5s10 2 10 5" stroke={accent} strokeWidth="1" opacity="0.15" strokeLinecap="round" fill="none" />
      <path d="M10 6c1-3 6-5 14-5s13 2 14 5" stroke={accent} strokeWidth="0.8" opacity="0.1" strokeLinecap="round" fill="none" />
      {/* Bell body */}
      <path
        d="M24 8c-6 0-10 4-10 10v8l-3 4h26l-3-4v-8c0-6-4-10-10-10z"
        fill={accent}
        fillOpacity="0.1"
        stroke={accent}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Bell crown */}
      <path d="M22 6 v-2 h4 v2" stroke={accent} strokeWidth="1.5" opacity="0.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* Bell clapper */}
      <path d="M22 32a2 2 0 0 0 4 0" stroke={accent} strokeWidth="1.5" opacity="0.5" strokeLinecap="round" fill="none" />
      {/* Notification dot top-right */}
      <circle cx="36" cy="12" r="3" fill={accent} opacity="0.7" />
      <circle cx="36" cy="12" r="5" stroke={accent} strokeWidth="1" opacity="0.25" fill="none" />
      {/* Rate spike line below */}
      <path
        d="M8 42 L14 40 L20 41 L26 36 L32 38 L40 34"
        stroke={accent}
        strokeWidth="1.5"
        opacity="0.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="26" cy="36" r="1.2" fill={accent} opacity="0.4" />
      <circle cx="40" cy="34" r="1.5" fill={accent} opacity="0.5" />
      {/* Sparkle */}
      <circle cx="6" cy="10" r="0.8" fill={accent} opacity="0.2" />
      <path d="M4 8l2 2" stroke={accent} strokeWidth="1" opacity="0.3" strokeLinecap="round" />
    </svg>
  );
}

/* ==========================================
   THE ASCENT — three-step staircase with checkmark
   For PreQualPipelineCard
   ========================================== */
export function PreQualIcon({ accent, size = 48, className }: TrackIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      {/* Baseline */}
      <line x1="4" y1="40" x2="44" y2="40" stroke={accent} strokeWidth="1" opacity="0.2" strokeLinecap="round" />
      {/* Faint grid */}
      <line x1="4" y1="32" x2="44" y2="32" stroke={accent} strokeWidth="0.5" opacity="0.08" />
      <line x1="4" y1="24" x2="44" y2="24" stroke={accent} strokeWidth="0.5" opacity="0.08" />
      {/* Bottom step */}
      <rect
        x="6"
        y="30"
        width="12"
        height="10"
        rx="1"
        fill={accent}
        fillOpacity="0.08"
        stroke={accent}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Middle step */}
      <rect
        x="18"
        y="22"
        width="12"
        height="18"
        rx="1"
        fill={accent}
        fillOpacity="0.1"
        stroke={accent}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Top step */}
      <rect
        x="30"
        y="14"
        width="12"
        height="26"
        rx="1"
        fill={accent}
        fillOpacity="0.12"
        stroke={accent}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Checkmark on top step */}
      <path
        d="M33 19l2.5 2.5 5-5"
        stroke={accent}
        strokeWidth="2"
        opacity="0.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Ascending dots */}
      <circle cx="12" cy="27" r="1" fill={accent} opacity="0.3" />
      <circle cx="24" cy="19" r="1.2" fill={accent} opacity="0.35" />
      <circle cx="36" cy="11" r="1.5" fill={accent} opacity="0.4" />
      {/* Connecting dotted ascent */}
      <line x1="14" y1="26" x2="22" y2="20" stroke={accent} strokeWidth="0.8" opacity="0.15" strokeDasharray="1.5 2" />
      <line x1="26" y1="18" x2="34" y2="12" stroke={accent} strokeWidth="0.8" opacity="0.15" strokeDasharray="1.5 2" />
      {/* Micro-detail: peak marker */}
      <path d="M36 6l0 3" stroke={accent} strokeWidth="1" opacity="0.4" strokeLinecap="round" />
      {/* Sparkle */}
      <circle cx="8" cy="10" r="0.8" fill={accent} opacity="0.25" />
      <path d="M6 8l2 2" stroke={accent} strokeWidth="1" opacity="0.3" strokeLinecap="round" />
    </svg>
  );
}

// ============== WAVE 2 ICONS (6) ==============

/* ==========================================
   THE VAULT — ascending bars with coin stack
   For LoanVolumeCard
   ========================================== */
export function LoanVolumeIcon({ accent, size = 48, className }: TrackIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      {/* Baseline */}
      <line x1="4" y1="40" x2="44" y2="40" stroke={accent} strokeWidth="1" opacity="0.2" strokeLinecap="round" />
      {/* Grid */}
      <line x1="4" y1="32" x2="44" y2="32" stroke={accent} strokeWidth="0.5" opacity="0.08" />
      <line x1="4" y1="24" x2="44" y2="24" stroke={accent} strokeWidth="0.5" opacity="0.08" />
      <line x1="4" y1="16" x2="44" y2="16" stroke={accent} strokeWidth="0.5" opacity="0.06" />
      {/* Bar 1 — shortest */}
      <rect
        x="6"
        y="28"
        width="7"
        height="12"
        rx="1"
        fill={accent}
        fillOpacity="0.08"
        stroke={accent}
        strokeWidth="1.5"
        opacity="0.5"
        strokeLinejoin="round"
      />
      {/* Bar 2 */}
      <rect
        x="14"
        y="22"
        width="7"
        height="18"
        rx="1"
        fill={accent}
        fillOpacity="0.1"
        stroke={accent}
        strokeWidth="1.5"
        opacity="0.65"
        strokeLinejoin="round"
      />
      {/* Bar 3 */}
      <rect
        x="22"
        y="16"
        width="7"
        height="24"
        rx="1"
        fill={accent}
        fillOpacity="0.12"
        stroke={accent}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Bar 4 — tallest */}
      <rect
        x="30"
        y="10"
        width="7"
        height="30"
        rx="1"
        fill={accent}
        fillOpacity="0.14"
        stroke={accent}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Coin stack top-right */}
      <ellipse cx="40" cy="14" rx="4" ry="1.3" fill={accent} fillOpacity="0.2" stroke={accent} strokeWidth="1" opacity="0.5" />
      <ellipse cx="40" cy="11" rx="4" ry="1.3" fill={accent} fillOpacity="0.15" stroke={accent} strokeWidth="1" opacity="0.4" />
      <ellipse cx="40" cy="8" rx="4" ry="1.3" fill={accent} fillOpacity="0.1" stroke={accent} strokeWidth="1" opacity="0.3" />
      {/* $ glyph on top coin */}
      <path d="M40 6.5l0 3" stroke={accent} strokeWidth="0.8" opacity="0.5" strokeLinecap="round" />
      <path d="M38.8 7.5c0-.5.5-.8 1.2-.8s1.2.3 1.2.8-.5.6-1.2.7-1.2.2-1.2.7.5.8 1.2.8 1.2-.3 1.2-.8" stroke={accent} strokeWidth="0.6" opacity="0.5" strokeLinecap="round" fill="none" />
      {/* Sparkle */}
      <circle cx="6" cy="10" r="0.8" fill={accent} opacity="0.2" />
      <path d="M4 8l2 2" stroke={accent} strokeWidth="1" opacity="0.3" strokeLinecap="round" />
    </svg>
  );
}

/* ==========================================
   THE KEYSTONE — calendar with target date + key
   For ClosingThisMonthCard
   ========================================== */
export function ClosingIcon({ accent, size = 48, className }: TrackIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      {/* Background page lines */}
      <line x1="4" y1="42" x2="34" y2="42" stroke={accent} strokeWidth="0.5" opacity="0.08" />
      {/* Calendar body */}
      <rect
        x="6"
        y="10"
        width="28"
        height="28"
        rx="2"
        fill={accent}
        fillOpacity="0.08"
        stroke={accent}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Calendar header bar */}
      <line x1="6" y1="16" x2="34" y2="16" stroke={accent} strokeWidth="1.5" opacity="0.4" />
      {/* Hanging pins */}
      <line x1="12" y1="7" x2="12" y2="12" stroke={accent} strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />
      <line x1="28" y1="7" x2="28" y2="12" stroke={accent} strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />
      {/* Grid — 7-col lite (4 visible verticals) */}
      <line x1="13" y1="20" x2="13" y2="36" stroke={accent} strokeWidth="0.5" opacity="0.15" />
      <line x1="20" y1="20" x2="20" y2="36" stroke={accent} strokeWidth="0.5" opacity="0.15" />
      <line x1="27" y1="20" x2="27" y2="36" stroke={accent} strokeWidth="0.5" opacity="0.15" />
      <line x1="6" y1="24" x2="34" y2="24" stroke={accent} strokeWidth="0.5" opacity="0.15" />
      <line x1="6" y1="30" x2="34" y2="30" stroke={accent} strokeWidth="0.5" opacity="0.15" />
      {/* Empty date dots */}
      <circle cx="10" cy="21" r="0.8" fill={accent} opacity="0.15" />
      <circle cx="17" cy="21" r="0.8" fill={accent} opacity="0.15" />
      <circle cx="24" cy="21" r="0.8" fill={accent} opacity="0.15" />
      <circle cx="10" cy="27" r="0.8" fill={accent} opacity="0.15" />
      <circle cx="24" cy="27" r="0.8" fill={accent} opacity="0.15" />
      <circle cx="31" cy="27" r="0.8" fill={accent} opacity="0.15" />
      <circle cx="10" cy="33" r="0.8" fill={accent} opacity="0.15" />
      <circle cx="17" cy="33" r="0.8" fill={accent} opacity="0.15" />
      {/* Target date highlight + checkmark */}
      <circle cx="17" cy="27" r="3" fill={accent} fillOpacity="0.25" stroke={accent} strokeWidth="1.2" opacity="0.7" />
      <path d="M15.5 27l1.2 1.2 2.2-2.4" stroke={accent} strokeWidth="1" opacity="0.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* Key top-right */}
      <circle cx="38" cy="12" r="3" stroke={accent} strokeWidth="1.5" opacity="0.6" fill="none" />
      <line x1="40.5" y1="14" x2="44" y2="17.5" stroke={accent} strokeWidth="1.5" opacity="0.55" strokeLinecap="round" />
      <line x1="42.5" y1="16" x2="43.5" y2="15" stroke={accent} strokeWidth="1.2" opacity="0.5" strokeLinecap="round" />
      {/* Sparkle */}
      <circle cx="42" cy="38" r="0.8" fill={accent} opacity="0.25" />
      <path d="M40 36l2 2" stroke={accent} strokeWidth="1" opacity="0.3" strokeLinecap="round" />
    </svg>
  );
}

/* ==========================================
   THE ASSAY — clipboard with home + status pills
   For HRAssessmentsCard
   ========================================== */
export function HRAssessmentsIcon({ accent, size = 48, className }: TrackIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      {/* Faint frame lines */}
      <line x1="4" y1="44" x2="44" y2="44" stroke={accent} strokeWidth="0.5" opacity="0.1" />
      {/* Clipboard body */}
      <rect
        x="10"
        y="8"
        width="26"
        height="34"
        rx="2"
        fill={accent}
        fillOpacity="0.08"
        stroke={accent}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Clipboard clip */}
      <rect x="18" y="4" width="10" height="6" rx="1" fill={accent} fillOpacity="0.2" stroke={accent} strokeWidth="1.5" opacity="0.5" strokeLinejoin="round" />
      {/* Tiny home inside clipboard */}
      <path
        d="M17 22 L23 17 L29 22 L29 28 L17 28 Z"
        fill={accent}
        fillOpacity="0.15"
        stroke={accent}
        strokeWidth="1.2"
        opacity="0.6"
        strokeLinejoin="round"
      />
      <line x1="23" y1="17" x2="23" y2="22" stroke={accent} strokeWidth="0.6" opacity="0.3" />
      <rect x="21.5" y="24" width="3" height="4" stroke={accent} strokeWidth="0.6" opacity="0.4" fill="none" />
      {/* Status pills below */}
      <rect x="14" y="32" width="6" height="2.5" rx="1.2" fill={accent} fillOpacity="0.35" />
      <rect x="21" y="32" width="6" height="2.5" rx="1.2" fill={accent} fillOpacity="0.22" />
      <rect x="28" y="32" width="6" height="2.5" rx="1.2" fill={accent} fillOpacity="0.12" />
      {/* Additional row */}
      <line x1="14" y1="37" x2="32" y2="37" stroke={accent} strokeWidth="0.8" opacity="0.15" strokeLinecap="round" />
      <line x1="14" y1="39.5" x2="28" y2="39.5" stroke={accent} strokeWidth="0.8" opacity="0.12" strokeLinecap="round" />
      {/* Micro-detail: assessment check */}
      <circle cx="40" cy="12" r="2.5" stroke={accent} strokeWidth="1" opacity="0.35" fill={accent} fillOpacity="0.1" />
      <path d="M38.8 12l1 1 1.7-1.8" stroke={accent} strokeWidth="1" opacity="0.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* Sparkle */}
      <circle cx="6" cy="14" r="0.8" fill={accent} opacity="0.2" />
      <path d="M4 12l2 2" stroke={accent} strokeWidth="1" opacity="0.3" strokeLinecap="round" />
    </svg>
  );
}

/* ==========================================
   THE TRAIL — winding path with milestone flags
   For HSProgressCard
   ========================================== */
export function HSProgressIcon({ accent, size = 48, className }: TrackIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      {/* Background terrain hatches */}
      <path d="M4 38c4-1 8 0 12-1" stroke={accent} strokeWidth="0.5" opacity="0.1" strokeLinecap="round" fill="none" />
      <path d="M32 12c4-1 8 0 12-1" stroke={accent} strokeWidth="0.5" opacity="0.08" strokeLinecap="round" fill="none" />
      {/* Main winding path */}
      <path
        d="M6 40 C 10 32, 18 34, 20 26 S 28 14, 36 12 L 42 8"
        stroke={accent}
        strokeWidth="2"
        opacity="0.6"
        strokeLinecap="round"
        strokeDasharray="1 0"
        fill="none"
      />
      {/* Dashed forward suggestion */}
      <path
        d="M42 8 L 44 6"
        stroke={accent}
        strokeWidth="1.5"
        opacity="0.4"
        strokeLinecap="round"
        strokeDasharray="2 2"
        fill="none"
      />
      {/* Path glow underlay */}
      <path
        d="M6 40 C 10 32, 18 34, 20 26 S 28 14, 36 12"
        stroke={accent}
        strokeWidth="5"
        opacity="0.08"
        strokeLinecap="round"
        fill="none"
      />
      {/* Milestone flag 1 */}
      <line x1="10" y1="36" x2="10" y2="28" stroke={accent} strokeWidth="1.2" opacity="0.7" strokeLinecap="round" />
      <path d="M10 28 L15 30 L10 32 Z" fill={accent} fillOpacity="0.4" stroke={accent} strokeWidth="0.8" opacity="0.6" strokeLinejoin="round" />
      {/* Milestone flag 2 */}
      <line x1="22" y1="26" x2="22" y2="18" stroke={accent} strokeWidth="1.2" opacity="0.55" strokeLinecap="round" />
      <path d="M22 18 L27 20 L22 22 Z" fill={accent} fillOpacity="0.3" stroke={accent} strokeWidth="0.8" opacity="0.5" strokeLinejoin="round" />
      {/* Milestone flag 3 */}
      <line x1="36" y1="12" x2="36" y2="4" stroke={accent} strokeWidth="1.2" opacity="0.45" strokeLinecap="round" />
      <path d="M36 4 L41 6 L36 8 Z" fill={accent} fillOpacity="0.25" stroke={accent} strokeWidth="0.8" opacity="0.45" strokeLinejoin="round" />
      {/* Trail markers */}
      <circle cx="10" cy="36" r="1.2" fill={accent} opacity="0.5" />
      <circle cx="22" cy="26" r="1.2" fill={accent} opacity="0.4" />
      <circle cx="36" cy="12" r="1.2" fill={accent} opacity="0.35" />
      {/* Sparkle */}
      <circle cx="6" cy="10" r="0.8" fill={accent} opacity="0.2" />
      <path d="M4 8l2 2" stroke={accent} strokeWidth="1" opacity="0.3" strokeLinecap="round" />
    </svg>
  );
}

/* ==========================================
   THE THRESHOLD — house with opening door + pennant
   For OpenHouseCheckinsCard
   ========================================== */
export function OpenHouseIcon({ accent, size = 48, className }: TrackIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      {/* Ground line */}
      <line x1="4" y1="40" x2="44" y2="40" stroke={accent} strokeWidth="1" opacity="0.2" strokeLinecap="round" />
      {/* Subtle ground texture */}
      <line x1="6" y1="42" x2="14" y2="42" stroke={accent} strokeWidth="0.5" opacity="0.1" strokeLinecap="round" />
      <line x1="34" y1="42" x2="42" y2="42" stroke={accent} strokeWidth="0.5" opacity="0.1" strokeLinecap="round" />
      {/* House body */}
      <path
        d="M10 40 L10 22 L24 12 L38 22 L38 40 Z"
        fill={accent}
        fillOpacity="0.1"
        stroke={accent}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Roof line */}
      <path
        d="M8 23 L24 11 L40 23"
        stroke={accent}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.6"
      />
      {/* Door frame */}
      <rect x="20" y="28" width="8" height="12" stroke={accent} strokeWidth="1.5" opacity="0.4" fill="none" strokeLinejoin="round" />
      {/* Opening door — angled */}
      <path
        d="M20 28 L 16 30 L 16 41 L 20 40 Z"
        fill={accent}
        fillOpacity="0.18"
        stroke={accent}
        strokeWidth="1.5"
        opacity="0.7"
        strokeLinejoin="round"
      />
      {/* Door knob */}
      <circle cx="18" cy="35" r="0.8" fill={accent} opacity="0.6" />
      {/* Window */}
      <rect x="13" y="26" width="4" height="4" rx="0.5" stroke={accent} strokeWidth="1" opacity="0.35" fill={accent} fillOpacity="0.1" />
      <rect x="31" y="26" width="4" height="4" rx="0.5" stroke={accent} strokeWidth="1" opacity="0.35" fill={accent} fillOpacity="0.1" />
      {/* OPEN pennant */}
      <line x1="38" y1="10" x2="38" y2="22" stroke={accent} strokeWidth="1.2" opacity="0.6" strokeLinecap="round" />
      <path d="M38 10 L46 12 L42 14 L46 16 L38 16 Z" fill={accent} fillOpacity="0.3" stroke={accent} strokeWidth="1" opacity="0.6" strokeLinejoin="round" />
      {/* Sparkle */}
      <circle cx="6" cy="10" r="0.8" fill={accent} opacity="0.25" />
      <path d="M4 8l2 2" stroke={accent} strokeWidth="1" opacity="0.3" strokeLinecap="round" />
    </svg>
  );
}

/* ==========================================
   THE POST — mailbox on pole with raised flag
   For UnreadMessagesCard
   ========================================== */
export function MailboxIcon({ accent, size = 48, className }: TrackIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      {/* Ground line */}
      <line x1="4" y1="42" x2="44" y2="42" stroke={accent} strokeWidth="1" opacity="0.2" strokeLinecap="round" />
      {/* Grass tufts */}
      <path d="M8 42v-2" stroke={accent} strokeWidth="0.6" opacity="0.2" strokeLinecap="round" />
      <path d="M12 42v-1.5" stroke={accent} strokeWidth="0.6" opacity="0.18" strokeLinecap="round" />
      <path d="M36 42v-2" stroke={accent} strokeWidth="0.6" opacity="0.18" strokeLinecap="round" />
      <path d="M40 42v-1.5" stroke={accent} strokeWidth="0.6" opacity="0.15" strokeLinecap="round" />
      {/* Mailbox pole */}
      <line x1="20" y1="42" x2="20" y2="26" stroke={accent} strokeWidth="2" opacity="0.5" strokeLinecap="round" />
      {/* Mailbox body — dome top */}
      <path
        d="M10 26 L10 18 a8 4 0 0 1 16 0 L26 26 Z"
        fill={accent}
        fillOpacity="0.1"
        stroke={accent}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Mailbox front opening line */}
      <line x1="14" y1="22" x2="22" y2="22" stroke={accent} strokeWidth="1" opacity="0.4" strokeLinecap="round" />
      <line x1="14" y1="24" x2="20" y2="24" stroke={accent} strokeWidth="1" opacity="0.3" strokeLinecap="round" />
      {/* Mailbox door knob */}
      <circle cx="22" cy="23.5" r="0.8" fill={accent} opacity="0.5" />
      {/* Raised flag */}
      <line x1="26" y1="14" x2="26" y2="22" stroke={accent} strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
      <path d="M26 14 L33 16 L26 18 Z" fill={accent} fillOpacity="0.4" stroke={accent} strokeWidth="1" opacity="0.7" strokeLinejoin="round" />
      {/* Envelope peeking out */}
      <rect x="28" y="20" width="10" height="7" rx="0.5" fill={accent} fillOpacity="0.15" stroke={accent} strokeWidth="1.2" opacity="0.6" strokeLinejoin="round" />
      <path d="M28 20 L33 24 L38 20" stroke={accent} strokeWidth="1" opacity="0.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* Unread dot */}
      <circle cx="40" cy="20" r="2" fill={accent} opacity="0.55" />
      {/* Sparkle */}
      <circle cx="6" cy="10" r="0.8" fill={accent} opacity="0.2" />
      <path d="M4 8l2 2" stroke={accent} strokeWidth="1" opacity="0.3" strokeLinecap="round" />
    </svg>
  );
}

// ============== WAVE 3 ICONS (9) ==============

/* ==========================================
   THE CADENCE — clock with recurring arrow loop
   For NeedsFollowupCard
   ========================================== */
export function FollowupIcon({ accent, size = 48, className }: TrackIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      {/* Background concentric rings */}
      <circle cx="22" cy="24" r="18" stroke={accent} strokeWidth="0.5" opacity="0.08" fill="none" />
      <circle cx="22" cy="24" r="14" stroke={accent} strokeWidth="0.5" opacity="0.1" fill="none" />
      {/* Clock face */}
      <circle
        cx="22"
        cy="24"
        r="10"
        fill={accent}
        fillOpacity="0.1"
        stroke={accent}
        strokeWidth="2"
      />
      {/* Hour ticks */}
      <line x1="22" y1="15" x2="22" y2="16.5" stroke={accent} strokeWidth="1" opacity="0.5" strokeLinecap="round" />
      <line x1="22" y1="31.5" x2="22" y2="33" stroke={accent} strokeWidth="1" opacity="0.4" strokeLinecap="round" />
      <line x1="13" y1="24" x2="14.5" y2="24" stroke={accent} strokeWidth="1" opacity="0.4" strokeLinecap="round" />
      <line x1="29.5" y1="24" x2="31" y2="24" stroke={accent} strokeWidth="1" opacity="0.4" strokeLinecap="round" />
      {/* Clock hands */}
      <line x1="22" y1="24" x2="22" y2="18" stroke={accent} strokeWidth="1.5" opacity="0.7" strokeLinecap="round" />
      <line x1="22" y1="24" x2="27" y2="26" stroke={accent} strokeWidth="1.5" opacity="0.7" strokeLinecap="round" />
      <circle cx="22" cy="24" r="1" fill={accent} opacity="0.8" />
      {/* Recurring arrow loop around clock */}
      <path
        d="M34 12 a 14 14 0 0 1 4 16"
        stroke={accent}
        strokeWidth="1.5"
        opacity="0.5"
        strokeLinecap="round"
        fill="none"
      />
      <path d="M37 26 L 38 28 L 40 27" stroke={accent} strokeWidth="1.2" opacity="0.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* Urgency dot top-right */}
      <circle cx="38" cy="10" r="2.5" fill={accent} opacity="0.6" />
      <circle cx="38" cy="10" r="4" stroke={accent} strokeWidth="1" opacity="0.2" fill="none" />
      {/* Sparkle */}
      <circle cx="6" cy="40" r="0.8" fill={accent} opacity="0.25" />
      <path d="M4 38l2 2" stroke={accent} strokeWidth="1" opacity="0.3" strokeLinecap="round" />
    </svg>
  );
}

/* ==========================================
   THE CONSTELLATION — 2x2 app grid with link + status
   For SpokeAppStatusCards
   ========================================== */
export function AppGridIcon({ accent, size = 48, className }: TrackIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      {/* Background dotted constellation */}
      <circle cx="6" cy="6" r="0.6" fill={accent} opacity="0.15" />
      <circle cx="44" cy="6" r="0.6" fill={accent} opacity="0.12" />
      <circle cx="44" cy="42" r="0.6" fill={accent} opacity="0.12" />
      <circle cx="6" cy="42" r="0.6" fill={accent} opacity="0.15" />
      {/* App 1 — top-left */}
      <rect
        x="10"
        y="10"
        width="12"
        height="12"
        rx="2.5"
        fill={accent}
        fillOpacity="0.12"
        stroke={accent}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="16" cy="16" r="1.5" fill={accent} opacity="0.5" />
      {/* App 2 — top-right */}
      <rect
        x="26"
        y="10"
        width="12"
        height="12"
        rx="2.5"
        fill={accent}
        fillOpacity="0.1"
        stroke={accent}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M30 16l2 2 4-4" stroke={accent} strokeWidth="1.2" opacity="0.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* App 3 — bottom-left */}
      <rect
        x="10"
        y="26"
        width="12"
        height="12"
        rx="2.5"
        fill={accent}
        fillOpacity="0.08"
        stroke={accent}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <line x1="13" y1="30" x2="19" y2="30" stroke={accent} strokeWidth="1" opacity="0.4" strokeLinecap="round" />
      <line x1="13" y1="33" x2="17" y2="33" stroke={accent} strokeWidth="1" opacity="0.3" strokeLinecap="round" />
      {/* App 4 — bottom-right */}
      <rect
        x="26"
        y="26"
        width="12"
        height="12"
        rx="2.5"
        fill={accent}
        fillOpacity="0.1"
        stroke={accent}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="32" cy="32" r="2" stroke={accent} strokeWidth="1" opacity="0.45" fill={accent} fillOpacity="0.15" />
      {/* Connecting line between apps (diagonal) */}
      <line x1="22" y1="16" x2="26" y2="16" stroke={accent} strokeWidth="0.8" opacity="0.3" strokeDasharray="1 1.5" />
      <line x1="16" y1="22" x2="16" y2="26" stroke={accent} strokeWidth="0.8" opacity="0.3" strokeDasharray="1 1.5" />
      <line x1="32" y1="22" x2="32" y2="26" stroke={accent} strokeWidth="0.8" opacity="0.25" strokeDasharray="1 1.5" />
      <line x1="22" y1="32" x2="26" y2="32" stroke={accent} strokeWidth="0.8" opacity="0.25" strokeDasharray="1 1.5" />
      {/* Status dot on app 1 */}
      <circle cx="20" cy="12" r="1.8" fill={accent} opacity="0.7" />
      {/* Sparkle */}
      <path d="M40 4l0 2" stroke={accent} strokeWidth="1" opacity="0.3" strokeLinecap="round" />
      <path d="M39 5l2 0" stroke={accent} strokeWidth="1" opacity="0.25" strokeLinecap="round" />
    </svg>
  );
}

/* ==========================================
   THE SIEVE — funnel with droplets and level lines
   For ConversionFunnelCard
   ========================================== */
export function FunnelIcon({ accent, size = 48, className }: TrackIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      {/* Background ambient lines */}
      <line x1="4" y1="8" x2="44" y2="8" stroke={accent} strokeWidth="0.5" opacity="0.08" />
      <line x1="6" y1="44" x2="42" y2="44" stroke={accent} strokeWidth="0.5" opacity="0.1" />
      {/* Funnel body — primary */}
      <path
        d="M8 10 L40 10 L28 24 L28 36 L20 36 L20 24 Z"
        fill={accent}
        fillOpacity="0.1"
        stroke={accent}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Horizontal level lines inside funnel */}
      <line x1="11" y1="14" x2="37" y2="14" stroke={accent} strokeWidth="1" opacity="0.35" strokeLinecap="round" />
      <line x1="15" y1="18" x2="33" y2="18" stroke={accent} strokeWidth="1" opacity="0.25" strokeLinecap="round" />
      <line x1="19" y1="22" x2="29" y2="22" stroke={accent} strokeWidth="1" opacity="0.2" strokeLinecap="round" />
      {/* Spout outline highlight */}
      <line x1="20" y1="24" x2="20" y2="36" stroke={accent} strokeWidth="1" opacity="0.3" />
      <line x1="28" y1="24" x2="28" y2="36" stroke={accent} strokeWidth="1" opacity="0.3" />
      {/* Droplets falling from spout */}
      <path d="M24 38c-1 1-1 2 0 2.5s1-1.5 0-2.5z" fill={accent} fillOpacity="0.5" stroke={accent} strokeWidth="0.8" opacity="0.6" />
      <path d="M22 42c-.6.6-.6 1.2 0 1.5s.6-.9 0-1.5z" fill={accent} fillOpacity="0.35" stroke={accent} strokeWidth="0.6" opacity="0.5" />
      <path d="M26 43c-.5.5-.5 1 0 1.3s.5-.8 0-1.3z" fill={accent} fillOpacity="0.3" stroke={accent} strokeWidth="0.6" opacity="0.4" />
      {/* Input dots above funnel */}
      <circle cx="14" cy="7" r="1" fill={accent} opacity="0.35" />
      <circle cx="20" cy="6" r="1.2" fill={accent} opacity="0.4" />
      <circle cx="28" cy="6" r="1.2" fill={accent} opacity="0.35" />
      <circle cx="34" cy="7" r="1" fill={accent} opacity="0.3" />
      {/* Micro-detail: percentage tick */}
      <path d="M42 14l-2 0" stroke={accent} strokeWidth="1" opacity="0.3" strokeLinecap="round" />
      <path d="M42 22l-2 0" stroke={accent} strokeWidth="1" opacity="0.25" strokeLinecap="round" />
      {/* Sparkle */}
      <circle cx="42" cy="40" r="0.8" fill={accent} opacity="0.25" />
      <path d="M40 38l2 2" stroke={accent} strokeWidth="1" opacity="0.3" strokeLinecap="round" />
    </svg>
  );
}

/* ==========================================
   THE LAUREL — trophy cup with star above
   For AgentPerformanceCard
   ========================================== */
export function TrophyIcon({ accent, size = 48, className }: TrackIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      {/* Background podium hint */}
      <line x1="6" y1="44" x2="42" y2="44" stroke={accent} strokeWidth="1" opacity="0.15" strokeLinecap="round" />
      <line x1="10" y1="42" x2="38" y2="42" stroke={accent} strokeWidth="0.5" opacity="0.1" strokeLinecap="round" />
      {/* Trophy cup body */}
      <path
        d="M16 12 L32 12 L31 24 a7 7 0 0 1 -14 0 Z"
        fill={accent}
        fillOpacity="0.12"
        stroke={accent}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Left handle */}
      <path
        d="M16 14 a4 4 0 0 0 0 8"
        stroke={accent}
        strokeWidth="1.5"
        opacity="0.55"
        strokeLinecap="round"
        fill="none"
      />
      {/* Right handle */}
      <path
        d="M32 14 a4 4 0 0 1 0 8"
        stroke={accent}
        strokeWidth="1.5"
        opacity="0.55"
        strokeLinecap="round"
        fill="none"
      />
      {/* Trophy stem */}
      <line x1="24" y1="31" x2="24" y2="36" stroke={accent} strokeWidth="2" opacity="0.6" strokeLinecap="round" />
      {/* Base */}
      <rect x="18" y="36" width="12" height="3" rx="0.5" fill={accent} fillOpacity="0.2" stroke={accent} strokeWidth="1.5" opacity="0.6" strokeLinejoin="round" />
      <rect x="16" y="39" width="16" height="2" rx="0.5" fill={accent} fillOpacity="0.15" stroke={accent} strokeWidth="1.2" opacity="0.5" strokeLinejoin="round" />
      {/* Numeral inside cup */}
      <line x1="22" y1="16" x2="22" y2="22" stroke={accent} strokeWidth="1.2" opacity="0.5" strokeLinecap="round" />
      <line x1="20" y1="17" x2="22" y2="16" stroke={accent} strokeWidth="1.2" opacity="0.5" strokeLinecap="round" />
      {/* Star above */}
      <path
        d="M24 4 L25.5 7 L29 7.5 L26.5 10 L27 13 L24 11.5 L21 13 L21.5 10 L19 7.5 L22.5 7 Z"
        fill={accent}
        fillOpacity="0.4"
        stroke={accent}
        strokeWidth="1"
        opacity="0.7"
        strokeLinejoin="round"
      />
      {/* Sparkle */}
      <circle cx="38" cy="10" r="0.8" fill={accent} opacity="0.3" />
      <path d="M36 8l2 2" stroke={accent} strokeWidth="1" opacity="0.35" strokeLinecap="round" />
      <circle cx="10" cy="10" r="0.6" fill={accent} opacity="0.2" />
    </svg>
  );
}

/* ==========================================
   THE CONCLAVE — two figures with kanban column
   For BrokerAgentPipelineCard
   ========================================== */
export function TeamPipelineIcon({ accent, size = 48, className }: TrackIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      {/* Ground line */}
      <line x1="4" y1="42" x2="44" y2="42" stroke={accent} strokeWidth="1" opacity="0.15" strokeLinecap="round" />
      <line x1="4" y1="38" x2="14" y2="38" stroke={accent} strokeWidth="0.5" opacity="0.08" />
      <line x1="34" y1="38" x2="44" y2="38" stroke={accent} strokeWidth="0.5" opacity="0.08" />
      {/* Figure 1 — left */}
      <circle cx="10" cy="16" r="3.5" fill={accent} fillOpacity="0.18" stroke={accent} strokeWidth="1.5" opacity="0.6" />
      <path
        d="M4 36 c0 -5 3 -8 6 -8 s6 3 6 8"
        fill={accent}
        fillOpacity="0.12"
        stroke={accent}
        strokeWidth="1.5"
        opacity="0.55"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* Figure 2 — right */}
      <circle cx="18" cy="14" r="3" fill={accent} fillOpacity="0.15" stroke={accent} strokeWidth="1.5" opacity="0.5" />
      <path
        d="M13 36 c0 -4 2 -7 5 -7 s5 3 5 7"
        fill={accent}
        fillOpacity="0.1"
        stroke={accent}
        strokeWidth="1.5"
        opacity="0.45"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* Kanban column in front (right side) */}
      <rect
        x="28"
        y="10"
        width="14"
        height="28"
        rx="2"
        fill={accent}
        fillOpacity="0.1"
        stroke={accent}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Card 1 in kanban */}
      <rect x="31" y="14" width="8" height="4" rx="0.8" fill={accent} fillOpacity="0.3" stroke={accent} strokeWidth="0.8" opacity="0.55" />
      {/* Card 2 */}
      <rect x="31" y="20" width="8" height="4" rx="0.8" fill={accent} fillOpacity="0.22" stroke={accent} strokeWidth="0.8" opacity="0.45" />
      {/* Card 3 */}
      <rect x="31" y="26" width="8" height="4" rx="0.8" fill={accent} fillOpacity="0.16" stroke={accent} strokeWidth="0.8" opacity="0.35" />
      {/* Card 4 — partial */}
      <rect x="31" y="32" width="8" height="3" rx="0.8" fill={accent} fillOpacity="0.1" stroke={accent} strokeWidth="0.8" opacity="0.25" />
      {/* Micro-detail: connection arc between figures and column */}
      <path d="M22 24c2 0 4 -1 6 -2" stroke={accent} strokeWidth="0.8" opacity="0.25" strokeDasharray="1.5 1.5" strokeLinecap="round" fill="none" />
      {/* Sparkle */}
      <circle cx="6" cy="8" r="0.8" fill={accent} opacity="0.2" />
      <path d="M4 6l2 2" stroke={accent} strokeWidth="1" opacity="0.3" strokeLinecap="round" />
    </svg>
  );
}

/* ==========================================
   THE SPRING — overlapping Venn circles with dots
   For LeadPoolsCard
   ========================================== */
export function LeadPoolIcon({ accent, size = 48, className }: TrackIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      {/* Background ambient ring */}
      <circle cx="24" cy="24" r="20" stroke={accent} strokeWidth="0.5" opacity="0.06" fill="none" />
      {/* Circle 1 — top */}
      <circle
        cx="24"
        cy="16"
        r="10"
        fill={accent}
        fillOpacity="0.1"
        stroke={accent}
        strokeWidth="2"
        opacity="0.85"
      />
      {/* Circle 2 — bottom-left */}
      <circle
        cx="17"
        cy="28"
        r="10"
        fill={accent}
        fillOpacity="0.1"
        stroke={accent}
        strokeWidth="2"
        opacity="0.7"
      />
      {/* Circle 3 — bottom-right */}
      <circle
        cx="31"
        cy="28"
        r="10"
        fill={accent}
        fillOpacity="0.1"
        stroke={accent}
        strokeWidth="2"
        opacity="0.55"
      />
      {/* Center overlap dots (where all three meet) */}
      <circle cx="24" cy="24" r="1.2" fill={accent} opacity="0.55" />
      <circle cx="22" cy="22" r="0.9" fill={accent} opacity="0.4" />
      <circle cx="26" cy="22" r="0.9" fill={accent} opacity="0.45" />
      <circle cx="24" cy="26" r="0.8" fill={accent} opacity="0.35" />
      {/* Pairwise overlap dots */}
      <circle cx="20" cy="20" r="0.7" fill={accent} opacity="0.3" />
      <circle cx="28" cy="20" r="0.7" fill={accent} opacity="0.3" />
      <circle cx="24" cy="30" r="0.7" fill={accent} opacity="0.3" />
      {/* Outer single-circle dots */}
      <circle cx="24" cy="10" r="0.8" fill={accent} opacity="0.25" />
      <circle cx="12" cy="32" r="0.8" fill={accent} opacity="0.22" />
      <circle cx="36" cy="32" r="0.8" fill={accent} opacity="0.2" />
      {/* Micro-detail: pool ripple top-right */}
      <path d="M40 8c1 1 2 1 3 0" stroke={accent} strokeWidth="0.8" opacity="0.3" strokeLinecap="round" fill="none" />
      <path d="M39 11c1.5 1.5 3.5 1.5 5 0" stroke={accent} strokeWidth="0.8" opacity="0.2" strokeLinecap="round" fill="none" />
      {/* Sparkle */}
      <circle cx="6" cy="10" r="0.8" fill={accent} opacity="0.2" />
      <path d="M4 8l2 2" stroke={accent} strokeWidth="1" opacity="0.3" strokeLinecap="round" />
    </svg>
  );
}

/* ==========================================
   THE JUNCTION — diverging arrows with decision dot
   For LeadsNeedingRoutingCard
   ========================================== */
export function RoutingIcon({ accent, size = 48, className }: TrackIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      {/* Background grid */}
      <line x1="4" y1="24" x2="10" y2="24" stroke={accent} strokeWidth="0.5" opacity="0.1" strokeLinecap="round" />
      <line x1="4" y1="40" x2="44" y2="40" stroke={accent} strokeWidth="0.5" opacity="0.08" strokeLinecap="round" />
      {/* Incoming arrow shaft */}
      <path
        d="M6 24 L22 24"
        stroke={accent}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      {/* Decision dot at split */}
      <circle cx="24" cy="24" r="4" fill={accent} fillOpacity="0.2" stroke={accent} strokeWidth="2" />
      <circle cx="24" cy="24" r="1.2" fill={accent} opacity="0.7" />
      {/* Upper diverging arrow */}
      <path
        d="M27 22 L40 12"
        stroke={accent}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.8"
      />
      <path d="M40 12 L36 12 M40 12 L40 16" stroke={accent} strokeWidth="2" strokeLinecap="round" opacity="0.8" />
      {/* Lower diverging arrow */}
      <path
        d="M27 26 L40 36"
        stroke={accent}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.55"
      />
      <path d="M40 36 L36 36 M40 36 L40 32" stroke={accent} strokeWidth="2" strokeLinecap="round" opacity="0.55" />
      {/* Branch destination dots */}
      <circle cx="42" cy="10" r="1.5" fill={accent} opacity="0.45" />
      <circle cx="42" cy="38" r="1.5" fill={accent} opacity="0.3" />
      {/* Faint third branch hint */}
      <path d="M28 24 L40 24" stroke={accent} strokeWidth="1" opacity="0.15" strokeDasharray="2 2" strokeLinecap="round" />
      {/* Micro-detail: routing label tick */}
      <path d="M16 18l-2 -2" stroke={accent} strokeWidth="1" opacity="0.3" strokeLinecap="round" />
      <path d="M16 30l-2 2" stroke={accent} strokeWidth="1" opacity="0.25" strokeLinecap="round" />
      {/* Sparkle */}
      <circle cx="8" cy="8" r="0.8" fill={accent} opacity="0.2" />
      <path d="M6 6l2 2" stroke={accent} strokeWidth="1" opacity="0.3" strokeLinecap="round" />
    </svg>
  );
}

/* ==========================================
   THE CHOIR — two figures with brain node above
   For MiloTeamActivityCard
   ========================================== */
export function TeamActivityIcon({ accent, size = 48, className }: TrackIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      {/* Ground line */}
      <line x1="4" y1="42" x2="44" y2="42" stroke={accent} strokeWidth="1" opacity="0.15" strokeLinecap="round" />
      {/* Activity pulse line behind */}
      <path
        d="M4 36 L10 36 L12 32 L14 38 L16 30 L20 36 L44 36"
        stroke={accent}
        strokeWidth="1"
        opacity="0.18"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Figure 1 — left */}
      <circle cx="14" cy="26" r="3.5" fill={accent} fillOpacity="0.15" stroke={accent} strokeWidth="1.5" opacity="0.55" />
      <path
        d="M8 42 c0 -5 3 -8 6 -8 s6 3 6 8"
        fill={accent}
        fillOpacity="0.12"
        stroke={accent}
        strokeWidth="1.5"
        opacity="0.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* Figure 2 — right */}
      <circle cx="32" cy="26" r="3.5" fill={accent} fillOpacity="0.15" stroke={accent} strokeWidth="1.5" opacity="0.55" />
      <path
        d="M26 42 c0 -5 3 -8 6 -8 s6 3 6 8"
        fill={accent}
        fillOpacity="0.12"
        stroke={accent}
        strokeWidth="1.5"
        opacity="0.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* Brain/insight node above */}
      <path
        d="M19 8 a 5 5 0 0 1 10 0 c 0 2 -1 3 -2 4 v 2 h -6 v -2 c -1 -1 -2 -2 -2 -4 z"
        fill={accent}
        fillOpacity="0.2"
        stroke={accent}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Insight spark */}
      <line x1="24" y1="3" x2="24" y2="4.5" stroke={accent} strokeWidth="1" opacity="0.4" strokeLinecap="round" />
      <line x1="20.5" y1="4" x2="21.5" y2="5" stroke={accent} strokeWidth="1" opacity="0.3" strokeLinecap="round" />
      <line x1="27.5" y1="4" x2="26.5" y2="5" stroke={accent} strokeWidth="1" opacity="0.3" strokeLinecap="round" />
      {/* Connection lines from brain to figures */}
      <line x1="22" y1="15" x2="16" y2="22" stroke={accent} strokeWidth="0.8" opacity="0.3" strokeDasharray="1.5 1.5" strokeLinecap="round" />
      <line x1="26" y1="15" x2="30" y2="22" stroke={accent} strokeWidth="0.8" opacity="0.3" strokeDasharray="1.5 1.5" strokeLinecap="round" />
      {/* Activity dots */}
      <circle cx="20" cy="18" r="0.9" fill={accent} opacity="0.4" />
      <circle cx="28" cy="18" r="0.9" fill={accent} opacity="0.4" />
      {/* Sparkle */}
      <circle cx="6" cy="14" r="0.8" fill={accent} opacity="0.2" />
      <path d="M4 12l2 2" stroke={accent} strokeWidth="1" opacity="0.3" strokeLinecap="round" />
    </svg>
  );
}

/* ==========================================
   THE VIGIL — sunrise with two figures silhouetted
   For TeamBefore9Card (team variant of DawnIcon)
   ========================================== */
export function TeamDawnIcon({ accent, size = 48, className }: TrackIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      {/* Horizon line */}
      <line x1="4" y1="34" x2="44" y2="34" stroke={accent} strokeWidth="1.5" opacity="0.2" />
      {/* Distant horizon hint */}
      <line x1="6" y1="36" x2="42" y2="36" stroke={accent} strokeWidth="0.5" opacity="0.1" />
      {/* Smaller sun rising */}
      <path d="M16 34a8 8 0 0 1 16 0" fill={accent} opacity="0.1" />
      <path d="M16 34a8 8 0 0 1 16 0" stroke={accent} strokeWidth="2" fill="none" />
      {/* Sun rays — fewer, tighter than DawnIcon */}
      {[15, 45, 75, 105, 135, 165].map((angle) => {
        const rad = ((angle) * Math.PI) / 180;
        return (
          <line
            key={angle}
            x1={24 + Math.cos(rad) * 10.5}
            y1={34 - Math.sin(rad) * 10.5}
            x2={24 + Math.cos(rad) * 13.5}
            y2={34 - Math.sin(rad) * 13.5}
            stroke={accent}
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.3"
          />
        );
      })}
      {/* Figure 1 — silhouette (left, against sun) */}
      <circle cx="18" cy="30" r="2" fill={accent} opacity="0.65" />
      <path
        d="M14 42 c0 -4 2 -6 4 -6 s4 2 4 6"
        fill={accent}
        opacity="0.6"
        stroke={accent}
        strokeWidth="1"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* Figure 2 — silhouette (right, against sun) */}
      <circle cx="30" cy="30" r="2" fill={accent} opacity="0.55" />
      <path
        d="M26 42 c0 -4 2 -6 4 -6 s4 2 4 6"
        fill={accent}
        opacity="0.5"
        stroke={accent}
        strokeWidth="1"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* Bond line between figures */}
      <line x1="20" y1="33" x2="28" y2="33" stroke={accent} strokeWidth="0.8" opacity="0.25" strokeDasharray="1.5 1.5" strokeLinecap="round" />
      {/* Wisp */}
      <path d="M6 30c2-1 3 0 5-1" stroke={accent} strokeWidth="0.8" opacity="0.18" strokeLinecap="round" fill="none" />
      <path d="M38 30c2-1 3 0 5-1" stroke={accent} strokeWidth="0.8" opacity="0.15" strokeLinecap="round" fill="none" />
      {/* Micro-detail: sparkle top-right */}
      <circle cx="40" cy="12" r="1.2" fill={accent} opacity="0.3" />
      <path d="M38 10l2-2" stroke={accent} strokeWidth="1" opacity="0.4" strokeLinecap="round" />
      {/* Second sparkle */}
      <circle cx="8" cy="14" r="0.8" fill={accent} opacity="0.2" />
    </svg>
  );
}

/* ==========================================
   THE TENDING — growing sprout in soil with nurture droplets
   For Client Nurture card
   ========================================== */
export function TendingIcon({ accent, size = 48, className }: TrackIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      {/* Soil line */}
      <line x1="6" y1="38" x2="42" y2="38" stroke={accent} strokeWidth="1.5" opacity="0.2" strokeLinecap="round" />
      {/* Soil mound */}
      <path d="M14 38c2-3 6-4 10-4s8 1 10 4" stroke={accent} strokeWidth="1" opacity="0.15" strokeLinecap="round" fill="none" />
      {/* Soil texture flecks */}
      <circle cx="16" cy="40" r="0.6" fill={accent} opacity="0.15" />
      <circle cx="24" cy="41" r="0.6" fill={accent} opacity="0.12" />
      <circle cx="32" cy="40" r="0.6" fill={accent} opacity="0.13" />
      {/* Main stem */}
      <path
        d="M24 38 C24 30, 24 24, 24 16"
        stroke={accent}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      {/* Left leaf — lower, broad */}
      <path
        d="M24 28 C18 28, 13 25, 11 19 C17 19, 22 22, 24 28 Z"
        fill={accent}
        fillOpacity="0.12"
        stroke={accent}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Left leaf vein */}
      <path d="M24 28 C20 26, 16 23, 13 20" stroke={accent} strokeWidth="0.8" opacity="0.3" strokeLinecap="round" fill="none" />
      {/* Right leaf — upper, reaching */}
      <path
        d="M24 22 C30 22, 35 18, 37 12 C31 12, 26 16, 24 22 Z"
        fill={accent}
        fillOpacity="0.1"
        stroke={accent}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Right leaf vein */}
      <path d="M24 22 C28 20, 32 16, 35 13" stroke={accent} strokeWidth="0.8" opacity="0.25" strokeLinecap="round" fill="none" />
      {/* New bud at crown — fresh growth */}
      <path
        d="M24 16 c-2 -2 -2 -5 0 -7 c2 2 2 5 0 7 Z"
        fill={accent}
        fillOpacity="0.2"
        stroke={accent}
        strokeWidth="1.5"
        opacity="0.7"
        strokeLinejoin="round"
      />
      {/* Crown node dot */}
      <circle cx="24" cy="16" r="1.2" fill={accent} opacity="0.5" />
      {/* Nurture droplets descending — care/watering */}
      <path d="M14 8 c-1.2 1.5 -1.2 3 0 3 s1.2 -1.5 0 -3 Z" fill={accent} fillOpacity="0.3" stroke={accent} strokeWidth="0.8" opacity="0.5" strokeLinejoin="round" />
      <path d="M34 6 c-1 1.3 -1 2.6 0 2.6 s1 -1.3 0 -2.6 Z" fill={accent} fillOpacity="0.25" stroke={accent} strokeWidth="0.7" opacity="0.4" strokeLinejoin="round" />
      {/* Growth ascent dots */}
      <circle cx="29" cy="30" r="1" fill={accent} opacity="0.25" />
      <circle cx="19" cy="14" r="0.9" fill={accent} opacity="0.2" />
      {/* Sparkle — new-growth shimmer */}
      <circle cx="40" cy="20" r="0.8" fill={accent} opacity="0.25" />
      <path d="M38 18l2 2" stroke={accent} strokeWidth="1" opacity="0.3" strokeLinecap="round" />
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
  "my-pipeline": MyPipelineIcon,
  actions: ActionsIcon,
  brain: BrainIcon,
  flow: FlowIcon,
  docs: DocsIcon,
  "rate-alert": RateAlertIcon,
  "pre-qual": PreQualIcon,
  "loan-volume": LoanVolumeIcon,
  closing: ClosingIcon,
  "hr-assessments": HRAssessmentsIcon,
  "hs-progress": HSProgressIcon,
  "open-house": OpenHouseIcon,
  mailbox: MailboxIcon,
  followup: FollowupIcon,
  "app-grid": AppGridIcon,
  funnel: FunnelIcon,
  trophy: TrophyIcon,
  "team-pipeline": TeamPipelineIcon,
  "lead-pool": LeadPoolIcon,
  routing: RoutingIcon,
  "team-activity": TeamActivityIcon,
  "team-dawn": TeamDawnIcon,
  "client-nurture": TendingIcon,
};
