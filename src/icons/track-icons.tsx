"use client";

/**
 * Custom Branded Illustration Icons — Three-Track Program
 *
 * Style: 48x48 viewBox, accent-colored, strokeWidth 1.5–2,
 * multi-opacity depth layers, at least one micro-detail per icon.
 * All icons accept { accent: string } prop for white-label theming.
 */

import * as React from "react";

export interface TrackIconProps {
  accent: string;
  size?: number;
  className?: string;
}

/* ==========================================
   CREDIT SCORE — gauge meter with needle
   ========================================== */
export function CreditScoreIcon({ accent, size = 48, className }: TrackIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <path d="M10 32a14 14 0 0 1 28 0" stroke={accent} strokeWidth="2" strokeLinecap="round" />
      <path d="M14 32a10 10 0 0 1 20 0" stroke={accent} strokeWidth="1" opacity="0.2" />
      {/* Needle */}
      <line x1="24" y1="32" x2="32" y2="20" stroke={accent} strokeWidth="2" strokeLinecap="round" />
      <circle cx="24" cy="32" r="2.5" fill={accent} opacity="0.4" />
      {/* Score ticks */}
      <circle cx="12" cy="28" r="1" fill={accent} opacity="0.15" />
      <circle cx="16" cy="21" r="1" fill={accent} opacity="0.15" />
      <circle cx="24" cy="18" r="1" fill={accent} opacity="0.15" />
      <circle cx="32" cy="21" r="1" fill={accent} opacity="0.5" />
      <circle cx="36" cy="28" r="1" fill={accent} opacity="0.15" />
      {/* Micro-detail: sparkle */}
      <path d="M35 14l1.5-1.5" stroke={accent} strokeWidth="1" opacity="0.4" />
      <circle cx="37.5" cy="11.5" r="1" fill={accent} opacity="0.3" />
    </svg>
  );
}

/* ==========================================
   SAVINGS — jar with coins
   ========================================== */
export function SavingsIcon({ accent, size = 48, className }: TrackIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      {/* Jar body */}
      <path d="M16 16h16v20a4 4 0 0 1-4 4H20a4 4 0 0 1-4-4V16z" stroke={accent} strokeWidth="2" />
      {/* Jar lid */}
      <rect x="14" y="12" width="20" height="4" rx="1" stroke={accent} strokeWidth="1.5" />
      {/* Coins inside */}
      <ellipse cx="24" cy="30" rx="6" ry="2" fill={accent} opacity="0.12" />
      <ellipse cx="24" cy="27" rx="6" ry="2" fill={accent} opacity="0.08" />
      <ellipse cx="24" cy="33" rx="6" ry="2" fill={accent} opacity="0.16" />
      {/* Coin stack */}
      <circle cx="22" cy="24" r="2" stroke={accent} strokeWidth="1" opacity="0.3" />
      <circle cx="26" cy="22" r="2" stroke={accent} strokeWidth="1" opacity="0.3" />
      {/* Micro-detail: sparkle */}
      <path d="M34 10l2-2" stroke={accent} strokeWidth="1" opacity="0.4" />
      <circle cx="37" cy="7" r="0.8" fill={accent} opacity="0.25" />
    </svg>
  );
}

/* ==========================================
   DTI — balance scale
   ========================================== */
export function DtiIcon({ accent, size = 48, className }: TrackIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      {/* Center post */}
      <line x1="24" y1="10" x2="24" y2="38" stroke={accent} strokeWidth="2" strokeLinecap="round" />
      {/* Base */}
      <rect x="18" y="36" width="12" height="3" rx="1.5" fill={accent} opacity="0.15" />
      {/* Beam (tilted slightly) */}
      <line x1="10" y1="18" x2="38" y2="16" stroke={accent} strokeWidth="2" strokeLinecap="round" />
      {/* Left pan (heavier / lower) */}
      <path d="M6 18a4 4 0 0 0 8 0" stroke={accent} strokeWidth="1.5" />
      <line x1="10" y1="18" x2="6" y2="18" stroke={accent} strokeWidth="1" opacity="0.3" />
      <line x1="10" y1="18" x2="14" y2="18" stroke={accent} strokeWidth="1" opacity="0.3" />
      {/* Right pan (lighter / higher) */}
      <path d="M34 16a4 4 0 0 0 8 0" stroke={accent} strokeWidth="1.5" />
      <line x1="38" y1="16" x2="34" y2="16" stroke={accent} strokeWidth="1" opacity="0.3" />
      <line x1="38" y1="16" x2="42" y2="16" stroke={accent} strokeWidth="1" opacity="0.3" />
      {/* Pivot */}
      <circle cx="24" cy="10" r="2" fill={accent} opacity="0.3" />
      {/* Micro-detail */}
      <circle cx="10" cy="22" r="1" fill={accent} opacity="0.2" />
      <circle cx="38" cy="20" r="1" fill={accent} opacity="0.2" />
    </svg>
  );
}

/* ==========================================
   DREAM HOME — house with heart
   ========================================== */
export function DreamHomeIcon({ accent, size = 48, className }: TrackIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      {/* House */}
      <path d="M24 8L8 22v18h32V22z" stroke={accent} strokeWidth="2" strokeLinejoin="round" />
      {/* Door */}
      <rect x="20" y="28" width="8" height="12" rx="1" stroke={accent} strokeWidth="1.5" opacity="0.3" />
      {/* Heart */}
      <path d="M24 20c-1-3-5-3-5 0s5 6 5 6 5-3 5-6-4-3-5 0z" fill={accent} opacity="0.25" stroke={accent} strokeWidth="1" />
      {/* Windows */}
      <rect x="12" y="24" width="5" height="5" rx="0.5" fill={accent} opacity="0.08" />
      <rect x="31" y="24" width="5" height="5" rx="0.5" fill={accent} opacity="0.08" />
      {/* Micro-detail: chimney smoke */}
      <path d="M34 8c0-2 2-2 2-4" stroke={accent} strokeWidth="1" opacity="0.3" strokeLinecap="round" />
      <rect x="32" y="10" width="4" height="8" rx="0.5" stroke={accent} strokeWidth="1" opacity="0.2" />
      {/* Sparkle */}
      <circle cx="38" cy="6" r="1" fill={accent} opacity="0.3" />
    </svg>
  );
}

/* ==========================================
   MORTGAGE TERMS — document with sections
   ========================================== */
export function MortgageTermsIcon({ accent, size = 48, className }: TrackIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      {/* Document */}
      <rect x="12" y="6" width="24" height="36" rx="2" stroke={accent} strokeWidth="2" />
      {/* Corner fold */}
      <path d="M30 6v6h6" stroke={accent} strokeWidth="1.5" opacity="0.3" />
      {/* Text lines */}
      <line x1="17" y1="16" x2="31" y2="16" stroke={accent} strokeWidth="1.5" opacity="0.2" />
      <line x1="17" y1="21" x2="28" y2="21" stroke={accent} strokeWidth="1.5" opacity="0.2" />
      <line x1="17" y1="26" x2="31" y2="26" stroke={accent} strokeWidth="1.5" opacity="0.2" />
      <line x1="17" y1="31" x2="25" y2="31" stroke={accent} strokeWidth="1.5" opacity="0.2" />
      {/* Highlight section */}
      <rect x="16" y="14" width="16" height="5" rx="1" fill={accent} opacity="0.08" />
      {/* Checkmark */}
      <path d="M17 36l2 2 4-4" stroke={accent} strokeWidth="1.5" opacity="0.5" />
      {/* Micro-detail */}
      <circle cx="34" cy="8" r="1" fill={accent} opacity="0.2" />
    </svg>
  );
}

/* ==========================================
   BUDGET — calculator
   ========================================== */
export function BudgetIcon({ accent, size = 48, className }: TrackIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      {/* Calculator body */}
      <rect x="12" y="6" width="24" height="36" rx="3" stroke={accent} strokeWidth="2" />
      {/* Screen */}
      <rect x="16" y="10" width="16" height="8" rx="1.5" fill={accent} opacity={0.1} />
      <rect x="16" y="10" width="16" height="8" rx="1.5" fill="none" stroke={accent} strokeWidth="1" opacity={0.3} />
      {/* Display number */}
      <text x="27" y="17" fill={accent} opacity="0.4" fontSize="6" fontWeight="600" textAnchor="end" fontFamily="monospace">$1,250</text>
      {/* Buttons grid */}
      {[0, 1, 2].map((row) =>
        [0, 1, 2].map((col) => (
          <rect key={`${row}-${col}`} x={17 + col * 5} y={22 + row * 5} width="3.5" height="3.5" rx="0.5" fill={accent} opacity={row === 2 && col === 2 ? 0.35 : 0.12} />
        ))
      )}
      {/* Equals button */}
      <rect x="17" y="37" width="14" height="3" rx="0.5" fill={accent} opacity="0.2" />
      {/* Micro-detail */}
      <path d="M36 8l2-2" stroke={accent} strokeWidth="1" opacity="0.4" />
    </svg>
  );
}

/* ==========================================
   TIMELINE / ROADMAP — path with milestones
   ========================================== */
export function TimelineIcon({ accent, size = 48, className }: TrackIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      {/* Winding path */}
      <path d="M12 40c0-6 12-6 12-12s-8-6-8-12 8-6 8-12" stroke={accent} strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Milestones */}
      <circle cx="24" cy="28" r="3" fill={accent} opacity="0.2" stroke={accent} strokeWidth="1.5" />
      <circle cx="16" cy="16" r="3" fill={accent} opacity="0.2" stroke={accent} strokeWidth="1.5" />
      <circle cx="24" cy="4" r="2" fill={accent} opacity="0.4" />
      {/* Start dot */}
      <circle cx="12" cy="40" r="2.5" fill={accent} opacity="0.3" />
      {/* Flag at end */}
      <line x1="24" y1="4" x2="24" y2="10" stroke={accent} strokeWidth="1" opacity="0.3" />
      <path d="M24 4h6l-3 3 3 3h-6" fill={accent} opacity="0.15" />
      {/* Micro-detail */}
      <circle cx="32" cy="24" r="1" fill={accent} opacity="0.15" />
      <circle cx="8" cy="32" r="1" fill={accent} opacity="0.15" />
    </svg>
  );
}

/* ==========================================
   STREAK / FIRE — flame
   ========================================== */
export function StreakIcon({ accent, size = 48, className }: TrackIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      {/* Main flame */}
      <path d="M24 6c0 8-10 12-10 22a10 10 0 0 0 20 0c0-10-10-14-10-22z" fill={accent} opacity="0.15" stroke={accent} strokeWidth="2" />
      {/* Inner flame */}
      <path d="M24 18c0 5-5 7-5 12a5 5 0 0 0 10 0c0-5-5-7-5-12z" fill={accent} opacity="0.25" />
      {/* Core glow */}
      <ellipse cx="24" cy="34" rx="2.5" ry="3" fill={accent} opacity="0.4" />
      {/* Sparkles */}
      <circle cx="14" cy="18" r="1" fill={accent} opacity="0.2" />
      <circle cx="34" cy="16" r="1" fill={accent} opacity="0.2" />
      <path d="M32 10l2-2" stroke={accent} strokeWidth="1" opacity="0.4" />
      <circle cx="35" cy="7" r="0.8" fill={accent} opacity="0.3" />
    </svg>
  );
}

/* ==========================================
   DAILY EXERCISE — sunrise with lightning
   ========================================== */
export function DailyExerciseIcon({ accent, size = 48, className }: TrackIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      {/* Horizon line */}
      <line x1="6" y1="32" x2="42" y2="32" stroke={accent} strokeWidth="1.5" opacity="0.3" />
      {/* Sun */}
      <circle cx="24" cy="24" r="8" fill={accent} opacity="0.12" stroke={accent} strokeWidth="2" />
      {/* Rays */}
      {[0, 45, 90, 135, 180].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        return (
          <line
            key={angle}
            x1={24 + Math.cos(rad) * 11}
            y1={24 - Math.sin(rad) * 11}
            x2={24 + Math.cos(rad) * 14}
            y2={24 - Math.sin(rad) * 14}
            stroke={accent}
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.3"
          />
        );
      })}
      {/* Lightning bolt */}
      <path d="M22 18l4-6-1 5h3l-4 6 1-5h-3z" fill={accent} opacity="0.35" />
      {/* Ground detail */}
      <rect x="10" y="34" width="28" height="4" rx="1" fill={accent} opacity="0.06" />
      {/* Micro-detail */}
      <circle cx="36" cy="14" r="1" fill={accent} opacity="0.25" />
    </svg>
  );
}

/* ==========================================
   WEEKLY CHALLENGE — trophy
   ========================================== */
export function WeeklyChallengeIcon({ accent, size = 48, className }: TrackIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      {/* Cup body */}
      <path d="M16 10h16v12a8 8 0 0 1-16 0V10z" stroke={accent} strokeWidth="2" />
      {/* Left handle */}
      <path d="M16 14c-4 0-6 2-6 5s2 5 6 5" stroke={accent} strokeWidth="1.5" opacity="0.3" />
      {/* Right handle */}
      <path d="M32 14c4 0 6 2 6 5s-2 5-6 5" stroke={accent} strokeWidth="1.5" opacity="0.3" />
      {/* Stem + base */}
      <line x1="24" y1="30" x2="24" y2="36" stroke={accent} strokeWidth="2" />
      <rect x="18" y="36" width="12" height="3" rx="1.5" fill={accent} opacity="0.2" />
      {/* Star */}
      <path d="M24 14l1.5 3 3.5.5-2.5 2.5.5 3.5L24 22l-3 1.5.5-3.5-2.5-2.5 3.5-.5z" fill={accent} opacity="0.25" />
      {/* Micro-detail: sparkle */}
      <circle cx="36" cy="8" r="1" fill={accent} opacity="0.3" />
      <path d="M38 6l1.5-1.5" stroke={accent} strokeWidth="1" opacity="0.4" />
    </svg>
  );
}

/* ==========================================
   SELF-PACED — compass
   ========================================== */
export function SelfPacedIcon({ accent, size = 48, className }: TrackIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      {/* Outer ring */}
      <circle cx="24" cy="24" r="16" stroke={accent} strokeWidth="2" />
      {/* Inner ring */}
      <circle cx="24" cy="24" r="12" stroke={accent} strokeWidth="0.8" opacity="0.2" />
      {/* Cardinal points */}
      <circle cx="24" cy="10" r="1.5" fill={accent} opacity="0.4" />
      <circle cx="24" cy="38" r="1" fill={accent} opacity="0.15" />
      <circle cx="10" cy="24" r="1" fill={accent} opacity="0.15" />
      <circle cx="38" cy="24" r="1" fill={accent} opacity="0.15" />
      {/* Compass needle */}
      <path d="M24 14l3 10-3 2-3-2z" fill={accent} opacity="0.35" />
      <path d="M24 34l3-10-3-2-3 2z" fill={accent} opacity="0.15" />
      {/* Center */}
      <circle cx="24" cy="24" r="2" fill={accent} opacity="0.3" />
      {/* Micro-detail */}
      <path d="M36 10l2-2" stroke={accent} strokeWidth="1" opacity="0.4" />
    </svg>
  );
}

/* ==========================================
   CELEBRATION — confetti star burst
   ========================================== */
export function CelebrationIcon({ accent, size = 48, className }: TrackIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      {/* Central star */}
      <path d="M24 8l3 9h9l-7 5 3 9-8-6-8 6 3-9-7-5h9z" fill={accent} opacity="0.2" stroke={accent} strokeWidth="1.5" />
      {/* Confetti pieces */}
      <rect x="8" y="12" width="3" height="3" rx="0.5" fill={accent} opacity="0.25" transform="rotate(15 9.5 13.5)" />
      <rect x="36" y="10" width="3" height="3" rx="0.5" fill={accent} opacity="0.2" transform="rotate(-20 37.5 11.5)" />
      <rect x="10" y="30" width="2.5" height="2.5" rx="0.5" fill={accent} opacity="0.15" transform="rotate(30 11.25 31.25)" />
      <rect x="35" y="32" width="2.5" height="2.5" rx="0.5" fill={accent} opacity="0.2" transform="rotate(-10 36.25 33.25)" />
      {/* Sparkle dots */}
      <circle cx="14" cy="22" r="1.2" fill={accent} opacity="0.3" />
      <circle cx="34" cy="24" r="1.2" fill={accent} opacity="0.3" />
      <circle cx="20" cy="38" r="1" fill={accent} opacity="0.2" />
      <circle cx="30" cy="40" r="1" fill={accent} opacity="0.2" />
      {/* Burst lines */}
      <path d="M12 8l-2-3" stroke={accent} strokeWidth="1" opacity="0.3" strokeLinecap="round" />
      <path d="M38 8l2-3" stroke={accent} strokeWidth="1" opacity="0.3" strokeLinecap="round" />
    </svg>
  );
}

/* ==========================================
   DOWN PAYMENT — coin stack
   ========================================== */
export function DownPaymentIcon({ accent, size = 48, className }: TrackIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      {/* Coin stack */}
      {[0, 1, 2, 3, 4].map((i) => (
        <ellipse key={i} cx="24" cy={36 - i * 4} rx="10" ry="3" fill={accent} opacity={0.06 + i * 0.04} stroke={accent} strokeWidth={i === 4 ? "1.5" : "0.8"} />
      ))}
      {/* Dollar sign on top */}
      <text x="24" y="23" fill={accent} opacity="0.35" fontSize="8" fontWeight="700" textAnchor="middle" fontFamily="sans-serif">$</text>
      {/* Side lines */}
      <line x1="14" y1="36" x2="14" y2="20" stroke={accent} strokeWidth="0.8" opacity="0.15" />
      <line x1="34" y1="36" x2="34" y2="20" stroke={accent} strokeWidth="0.8" opacity="0.15" />
      {/* Micro-detail: sparkle */}
      <circle cx="36" cy="12" r="1" fill={accent} opacity="0.3" />
      <path d="M34 10l2-2" stroke={accent} strokeWidth="1" opacity="0.4" />
    </svg>
  );
}

/* ==========================================
   PRE-APPROVAL — shield with checkmark
   ========================================== */
export function PreApprovalIcon({ accent, size = 48, className }: TrackIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      {/* Shield */}
      <path d="M24 6L10 12v12c0 10 14 18 14 18s14-8 14-18V12z" fill={accent} opacity="0.08" stroke={accent} strokeWidth="2" />
      {/* Inner glow */}
      <path d="M24 12L14 16v8c0 7 10 13 10 13s10-6 10-13V16z" fill={accent} opacity="0.06" />
      {/* Checkmark */}
      <path d="M18 24l4 4 8-8" stroke={accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
      {/* Micro-detail */}
      <circle cx="36" cy="8" r="1" fill={accent} opacity="0.25" />
      <path d="M38 6l1-1" stroke={accent} strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

/* ==========================================
   NEIGHBORHOOD — community houses
   ========================================== */
export function NeighborhoodIcon({ accent, size = 48, className }: TrackIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      {/* Ground */}
      <rect x="4" y="36" width="40" height="4" rx="1" fill={accent} opacity="0.06" />
      {/* House 1 (left, small) */}
      <path d="M10 26L6 30v6h8v-6z" stroke={accent} strokeWidth="1.5" opacity="0.3" />
      <rect x="8" y="32" width="3" height="4" rx="0.5" fill={accent} opacity="0.1" />
      {/* House 2 (center, large) */}
      <path d="M24 14L16 22v14h16V22z" stroke={accent} strokeWidth="2" />
      <rect x="21" y="26" width="6" height="10" rx="1" stroke={accent} strokeWidth="1" opacity="0.3" />
      <rect x="18" y="24" width="4" height="4" rx="0.5" fill={accent} opacity="0.08" />
      <rect x="26" y="24" width="4" height="4" rx="0.5" fill={accent} opacity="0.08" />
      {/* House 3 (right, medium) */}
      <path d="M38 22L34 26v10h8v-10z" stroke={accent} strokeWidth="1.5" opacity="0.3" />
      <rect x="36" y="30" width="3" height="6" rx="0.5" fill={accent} opacity="0.1" />
      {/* Tree */}
      <circle cx="13" cy="20" r="3" fill={accent} opacity="0.1" />
      <line x1="13" y1="23" x2="13" y2="26" stroke={accent} strokeWidth="1" opacity="0.2" />
      {/* Micro-detail */}
      <circle cx="40" cy="14" r="1" fill={accent} opacity="0.2" />
    </svg>
  );
}

/* ==========================================
   REGISTRY — all icons by key
   ========================================== */

export const TRACK_ICONS: Record<string, React.ComponentType<TrackIconProps>> = {
  "credit-score": CreditScoreIcon,
  savings: SavingsIcon,
  dti: DtiIcon,
  "dream-home": DreamHomeIcon,
  "mortgage-terms": MortgageTermsIcon,
  budget: BudgetIcon,
  timeline: TimelineIcon,
  streak: StreakIcon,
  "daily-exercise": DailyExerciseIcon,
  "weekly-challenge": WeeklyChallengeIcon,
  "self-paced": SelfPacedIcon,
  celebration: CelebrationIcon,
  "down-payment": DownPaymentIcon,
  "pre-approval": PreApprovalIcon,
  neighborhood: NeighborhoodIcon,
};
