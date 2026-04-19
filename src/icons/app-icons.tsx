"use client";

/**
 * Custom Branded Illustration Icons — Platform App Cards
 *
 * Style: 48x48 viewBox, accent-colored, strokeWidth 1.5–2,
 * multi-opacity depth layers, at least one micro-detail per icon.
 * All icons accept { accent: string } prop for white-label theming.
 */

import * as React from "react";
import type { TrackIconProps } from "./track-icons";

/* ==========================================
   THE CHECKPOINT — daily checklist with target
   For Accountability Tracker
   ========================================== */
export function AccountabilityTrackerIcon({ accent, size = 48, className }: TrackIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      {/* Target circle */}
      <circle cx="24" cy="16" r="10" stroke={accent} strokeWidth="2" opacity="0.3" fill="none" />
      <circle cx="24" cy="16" r="6" stroke={accent} strokeWidth="1" opacity="0.2" fill="none" />
      <circle cx="24" cy="16" r="2.5" fill={accent} opacity="0.4" />
      {/* Arrow hitting center */}
      <line x1="34" y1="8" x2="26" y2="14" stroke={accent} strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />
      <path d="M34 8l-3 0.5 0.5-3" stroke={accent} strokeWidth="1" opacity="0.4" strokeLinecap="round" strokeLinejoin="round" />
      {/* Checklist rows below */}
      <rect x="10" y="30" width="4" height="4" rx="1" stroke={accent} strokeWidth="1" opacity="0.25" />
      <path d="M11 32.5l1.5 1.5 2-2" stroke={accent} strokeWidth="1" opacity="0.5" strokeLinecap="round" />
      <line x1="18" y1="32" x2="34" y2="32" stroke={accent} strokeWidth="1.5" opacity="0.2" strokeLinecap="round" />
      <rect x="10" y="37" width="4" height="4" rx="1" stroke={accent} strokeWidth="1" opacity="0.2" />
      <path d="M11 39.5l1.5 1.5 2-2" stroke={accent} strokeWidth="1" opacity="0.4" strokeLinecap="round" />
      <line x1="18" y1="39" x2="30" y2="39" stroke={accent} strokeWidth="1.5" opacity="0.15" strokeLinecap="round" />
      {/* Micro-detail: sparkle */}
      <circle cx="40" cy="6" r="1" fill={accent} opacity="0.3" />
      <path d="M38 4l2-2" stroke={accent} strokeWidth="1" opacity="0.4" strokeLinecap="round" />
    </svg>
  );
}

/* ==========================================
   THE RHYTHM — drumsticks with sound waves
   For The Drumbeat
   ========================================== */
export function DrumbeatIcon({ accent, size = 48, className }: TrackIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      {/* Drum body */}
      <ellipse cx="24" cy="32" rx="14" ry="5" fill={accent} opacity="0.08" stroke={accent} strokeWidth="1.5" />
      <ellipse cx="24" cy="24" rx="14" ry="5" stroke={accent} strokeWidth="2" />
      <line x1="10" y1="24" x2="10" y2="32" stroke={accent} strokeWidth="1.5" />
      <line x1="38" y1="24" x2="38" y2="32" stroke={accent} strokeWidth="1.5" />
      {/* Drumsticks */}
      <line x1="16" y1="8" x2="22" y2="20" stroke={accent} strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      <circle cx="22" cy="20" r="1.5" fill={accent} opacity="0.4" />
      <line x1="32" y1="8" x2="26" y2="20" stroke={accent} strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      <circle cx="26" cy="20" r="1.5" fill={accent} opacity="0.4" />
      {/* Sound waves */}
      <path d="M40 18c2-1 3 0 3-2" stroke={accent} strokeWidth="1" opacity="0.2" strokeLinecap="round" fill="none" />
      <path d="M42 16c2-1 3 0 3-2" stroke={accent} strokeWidth="1" opacity="0.15" strokeLinecap="round" fill="none" />
      {/* Beat dots */}
      <circle cx="18" cy="28" r="1" fill={accent} opacity="0.15" />
      <circle cx="24" cy="27" r="1" fill={accent} opacity="0.15" />
      <circle cx="30" cy="28" r="1" fill={accent} opacity="0.15" />
      {/* Sparkle */}
      <circle cx="8" cy="10" r="0.8" fill={accent} opacity="0.25" />
    </svg>
  );
}

/* ==========================================
   THE HARVEST — house with growing plant
   For Harvest Home (geographic farming)
   ========================================== */
export function HarvestHomeIcon({ accent, size = 48, className }: TrackIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      {/* Ground/soil line */}
      <path d="M4 38c4-1 8 0 12-1s8-1 12 0 8-1 12 0 4 0 4 0" stroke={accent} strokeWidth="0.8" opacity="0.15" strokeLinecap="round" fill="none" />
      {/* House silhouette */}
      <path d="M28 16L20 22v14h16V22z" stroke={accent} strokeWidth="2" strokeLinejoin="round" />
      <rect x="25" y="28" width="5" height="8" rx="1" stroke={accent} strokeWidth="1" opacity="0.3" />
      <rect x="22" y="24" width="4" height="4" rx="0.5" fill={accent} opacity="0.08" />
      {/* Growing plant/seedling */}
      <line x1="12" y1="38" x2="12" y2="26" stroke={accent} strokeWidth="1.5" opacity="0.4" strokeLinecap="round" />
      <path d="M12 30c-4-1-5-5-2-7" stroke={accent} strokeWidth="1.5" opacity="0.3" fill="none" strokeLinecap="round" />
      <path d="M12 26c4-1 5-5 2-7" stroke={accent} strokeWidth="1.5" opacity="0.3" fill="none" strokeLinecap="round" />
      <path d="M12 34c-3 0-4-3-2-5" stroke={accent} strokeWidth="1" opacity="0.2" fill="none" strokeLinecap="round" />
      {/* Seed/growth dots */}
      <circle cx="8" cy="38" r="1.5" fill={accent} opacity="0.15" />
      <circle cx="16" cy="38" r="1" fill={accent} opacity="0.1" />
      <circle cx="40" cy="36" r="1" fill={accent} opacity="0.1" />
      {/* Micro-detail: sun */}
      <circle cx="40" cy="10" r="3" stroke={accent} strokeWidth="1" opacity="0.2" fill={accent} fillOpacity="0.06" />
      <path d="M40 5v-2M45 10h2M40 15v2" stroke={accent} strokeWidth="0.8" opacity="0.15" strokeLinecap="round" />
    </svg>
  );
}

/* ==========================================
   THE WELCOME — open door with people
   For Open House Hub
   ========================================== */
export function OpenHouseHubIcon({ accent, size = 48, className }: TrackIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      {/* House roof */}
      <path d="M8 20L24 8l16 12" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* House walls */}
      <rect x="12" y="20" width="24" height="20" stroke={accent} strokeWidth="1.5" fill={accent} fillOpacity="0.05" />
      {/* Open door (angled to show depth) */}
      <path d="M22 40V24h10v16" stroke={accent} strokeWidth="1.5" />
      <path d="M22 24l-3 2v14h3" fill={accent} fillOpacity="0.1" stroke={accent} strokeWidth="1" opacity="0.3" />
      {/* Door handle */}
      <circle cx="30" cy="33" r="1" fill={accent} opacity="0.4" />
      {/* Welcome mat */}
      <rect x="20" y="40" width="14" height="2" rx="0.5" fill={accent} opacity="0.15" />
      {/* People silhouettes approaching */}
      <circle cx="40" cy="30" r="2" fill={accent} opacity="0.2" />
      <path d="M38 34v5" stroke={accent} strokeWidth="1.5" opacity="0.2" strokeLinecap="round" />
      <circle cx="44" cy="32" r="1.5" fill={accent} opacity="0.15" />
      <path d="M42.5 35v4" stroke={accent} strokeWidth="1" opacity="0.15" strokeLinecap="round" />
      {/* Light rays from door */}
      <line x1="27" y1="28" x2="34" y2="26" stroke={accent} strokeWidth="0.8" opacity="0.12" strokeLinecap="round" />
      <line x1="27" y1="32" x2="35" y2="32" stroke={accent} strokeWidth="0.8" opacity="0.1" strokeLinecap="round" />
      {/* Sparkle */}
      <circle cx="6" cy="12" r="1" fill={accent} opacity="0.25" />
    </svg>
  );
}

/* ==========================================
   THE FINISH LINE — runner crossing finish
   For The Home Stretch
   ========================================== */
export function HomeStretchIcon({ accent, size = 48, className }: TrackIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      {/* Finish line posts */}
      <line x1="34" y1="8" x2="34" y2="40" stroke={accent} strokeWidth="2" />
      <line x1="40" y1="8" x2="40" y2="40" stroke={accent} strokeWidth="2" opacity="0.4" />
      {/* Checkered banner */}
      {[0, 1, 2, 3].map((row) =>
        [0, 1].map((col) => (
          <rect
            key={`${row}-${col}`}
            x={34 + col * 3}
            y={8 + row * 3}
            width="3"
            height="3"
            fill={accent}
            opacity={(row + col) % 2 === 0 ? 0.3 : 0.08}
          />
        ))
      )}
      {/* Path/road */}
      <path d="M6 38c6-2 12-4 18-6s8-2 10-4" stroke={accent} strokeWidth="1.5" opacity="0.2" strokeLinecap="round" fill="none" />
      <path d="M6 42c6-2 12-4 18-6s8-2 10-4" stroke={accent} strokeWidth="0.8" opacity="0.1" strokeLinecap="round" fill="none" />
      {/* Runner figure */}
      <circle cx="20" cy="18" r="3" fill={accent} opacity="0.25" stroke={accent} strokeWidth="1.5" />
      <path d="M20 21v8" stroke={accent} strokeWidth="2" strokeLinecap="round" opacity="0.4" />
      <path d="M20 24l-4 3" stroke={accent} strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
      <path d="M20 24l5 2" stroke={accent} strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
      <path d="M20 29l-3 5" stroke={accent} strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
      <path d="M20 29l4 4" stroke={accent} strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
      {/* Motion lines */}
      <line x1="10" y1="20" x2="14" y2="20" stroke={accent} strokeWidth="1" opacity="0.2" strokeLinecap="round" />
      <line x1="8" y1="23" x2="13" y2="23" stroke={accent} strokeWidth="1" opacity="0.15" strokeLinecap="round" />
      {/* Sparkle at finish */}
      <circle cx="37" cy="6" r="1" fill={accent} opacity="0.35" />
    </svg>
  );
}

/* ==========================================
   THE KEY — house key with readiness meter
   For Home Ready
   ========================================== */
export function HomeReadyIcon({ accent, size = 48, className }: TrackIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      {/* Key head (circle) */}
      <circle cx="18" cy="16" r="8" stroke={accent} strokeWidth="2" fill={accent} fillOpacity="0.06" />
      <circle cx="18" cy="16" r="4" stroke={accent} strokeWidth="1.5" opacity="0.3" fill="none" />
      <circle cx="18" cy="16" r="1.5" fill={accent} opacity="0.35" />
      {/* Key shaft */}
      <line x1="26" y1="16" x2="40" y2="16" stroke={accent} strokeWidth="2" strokeLinecap="round" />
      {/* Key teeth */}
      <path d="M36 16v4" stroke={accent} strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      <path d="M40 16v5" stroke={accent} strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      {/* Readiness meter below */}
      <rect x="10" y="30" width="28" height="4" rx="2" stroke={accent} strokeWidth="1" opacity="0.2" />
      <rect x="10" y="30" width="22" height="4" rx="2" fill={accent} opacity="0.2" />
      {/* Meter segments */}
      <line x1="18" y1="30" x2="18" y2="34" stroke={accent} strokeWidth="0.5" opacity="0.15" />
      <line x1="24" y1="30" x2="24" y2="34" stroke={accent} strokeWidth="0.5" opacity="0.15" />
      <line x1="30" y1="30" x2="30" y2="34" stroke={accent} strokeWidth="0.5" opacity="0.15" />
      {/* Score label */}
      <text x="24" y="42" fill={accent} opacity="0.3" fontSize="5" fontWeight="600" textAnchor="middle" fontFamily="sans-serif">READY</text>
      {/* Sparkle */}
      <circle cx="42" cy="10" r="1" fill={accent} opacity="0.3" />
      <path d="M40 8l2-2" stroke={accent} strokeWidth="1" opacity="0.4" strokeLinecap="round" />
    </svg>
  );
}

/* ==========================================
   THE PRESS — newsletter with envelope
   For Newsletter Studio
   ========================================== */
export function NewsletterStudioIcon({ accent, size = 48, className }: TrackIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      {/* Newsletter page */}
      <rect x="14" y="4" width="20" height="28" rx="2" stroke={accent} strokeWidth="2" fill={accent} fillOpacity="0.04" />
      {/* Header bar */}
      <rect x="17" y="8" width="14" height="3" rx="1" fill={accent} opacity="0.2" />
      {/* Text lines */}
      <line x1="17" y1="15" x2="31" y2="15" stroke={accent} strokeWidth="1.5" opacity="0.15" strokeLinecap="round" />
      <line x1="17" y1="19" x2="28" y2="19" stroke={accent} strokeWidth="1.5" opacity="0.15" strokeLinecap="round" />
      <line x1="17" y1="23" x2="31" y2="23" stroke={accent} strokeWidth="1.5" opacity="0.12" strokeLinecap="round" />
      <line x1="17" y1="27" x2="25" y2="27" stroke={accent} strokeWidth="1.5" opacity="0.12" strokeLinecap="round" />
      {/* Envelope below */}
      <path d="M8 34h32v10H8z" stroke={accent} strokeWidth="1.5" fill={accent} fillOpacity="0.06" />
      <path d="M8 34l16 8 16-8" stroke={accent} strokeWidth="1.5" />
      {/* Send motion lines */}
      <line x1="42" y1="36" x2="46" y2="34" stroke={accent} strokeWidth="1" opacity="0.2" strokeLinecap="round" />
      <line x1="42" y1="39" x2="46" y2="39" stroke={accent} strokeWidth="1" opacity="0.15" strokeLinecap="round" />
      {/* Sparkle */}
      <circle cx="38" cy="6" r="1" fill={accent} opacity="0.3" />
      <path d="M36 4l2-2" stroke={accent} strokeWidth="1" opacity="0.4" strokeLinecap="round" />
    </svg>
  );
}

/* ==========================================
   THE LENS — magnifying glass over chart
   For Market Intel
   ========================================== */
export function MarketIntelIcon({ accent, size = 48, className }: TrackIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      {/* Bar chart */}
      <rect x="6" y="28" width="5" height="12" rx="1" fill={accent} fillOpacity="0.12" stroke={accent} strokeWidth="1" opacity="0.2" />
      <rect x="14" y="22" width="5" height="18" rx="1" fill={accent} fillOpacity="0.16" stroke={accent} strokeWidth="1" opacity="0.2" />
      <rect x="22" y="18" width="5" height="22" rx="1" fill={accent} fillOpacity="0.2" stroke={accent} strokeWidth="1" opacity="0.25" />
      <rect x="30" y="14" width="5" height="26" rx="1" fill={accent} fillOpacity="0.12" stroke={accent} strokeWidth="1" opacity="0.2" />
      {/* Baseline */}
      <line x1="4" y1="40" x2="44" y2="40" stroke={accent} strokeWidth="1" opacity="0.15" />
      {/* Magnifying glass */}
      <circle cx="34" cy="12" r="7" stroke={accent} strokeWidth="2" fill={accent} fillOpacity="0.06" />
      <line x1="39" y1="17" x2="44" y2="22" stroke={accent} strokeWidth="2" strokeLinecap="round" />
      {/* Trend line inside lens */}
      <path d="M29 14l3-3 3 2 2-3" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" fill="none" />
      {/* Sparkle */}
      <circle cx="30" cy="6" r="0.8" fill={accent} opacity="0.25" />
      {/* Data points */}
      <circle cx="8.5" cy="26" r="1" fill={accent} opacity="0.3" />
      <circle cx="24.5" cy="16" r="1" fill={accent} opacity="0.35" />
    </svg>
  );
}

/* ==========================================
   THE HEARTH — oven with warmth radiating
   For The Oven (client retention)
   ========================================== */
export function OvenIcon({ accent, size = 48, className }: TrackIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      {/* Oven body */}
      <rect x="8" y="14" width="32" height="28" rx="3" stroke={accent} strokeWidth="2" fill={accent} fillOpacity="0.04" />
      {/* Oven window */}
      <rect x="14" y="22" width="20" height="14" rx="2" stroke={accent} strokeWidth="1.5" fill={accent} fillOpacity="0.08" />
      {/* Glow inside oven */}
      <rect x="16" y="24" width="16" height="10" rx="1" fill={accent} opacity="0.12" />
      {/* Control knobs */}
      <circle cx="16" cy="18" r="2" stroke={accent} strokeWidth="1" opacity="0.3" />
      <line x1="16" y1="16" x2="16" y2="17.5" stroke={accent} strokeWidth="1" opacity="0.4" strokeLinecap="round" />
      <circle cx="24" cy="18" r="2" stroke={accent} strokeWidth="1" opacity="0.25" />
      <circle cx="32" cy="18" r="2" stroke={accent} strokeWidth="1" opacity="0.25" />
      {/* Heat/warmth waves rising */}
      <path d="M18 12c0-2 2-2 2-4" stroke={accent} strokeWidth="1" opacity="0.3" strokeLinecap="round" fill="none" />
      <path d="M24 10c0-2 2-2 2-4" stroke={accent} strokeWidth="1" opacity="0.25" strokeLinecap="round" fill="none" />
      <path d="M30 12c0-2 2-2 2-4" stroke={accent} strokeWidth="1" opacity="0.2" strokeLinecap="round" fill="none" />
      {/* Heart inside oven (warmth/love) */}
      <path d="M24 28c-0.8-2-3.5-2-3.5 0s3.5 4 3.5 4 3.5-2 3.5-4-2.7-2-3.5 0z" fill={accent} opacity="0.3" />
      {/* Sparkle */}
      <circle cx="42" cy="8" r="1" fill={accent} opacity="0.3" />
      <path d="M40 6l2-2" stroke={accent} strokeWidth="1" opacity="0.4" strokeLinecap="round" />
    </svg>
  );
}

/* ==========================================
   THE FUNNEL — capture form with magnet
   For Lead Capture Forms
   ========================================== */
export function LeadCaptureFormsIcon({ accent, size = 48, className }: TrackIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      {/* Form/clipboard */}
      <rect x="14" y="8" width="20" height="32" rx="2" stroke={accent} strokeWidth="2" fill={accent} fillOpacity="0.04" />
      {/* Clipboard clip */}
      <rect x="20" y="5" width="8" height="5" rx="1.5" stroke={accent} strokeWidth="1.5" fill={accent} fillOpacity="0.1" />
      {/* Form fields */}
      <rect x="18" y="16" width="12" height="3" rx="1" stroke={accent} strokeWidth="1" opacity="0.25" />
      <rect x="18" y="22" width="12" height="3" rx="1" stroke={accent} strokeWidth="1" opacity="0.2" />
      <rect x="18" y="28" width="12" height="3" rx="1" stroke={accent} strokeWidth="1" opacity="0.2" />
      {/* Submit button */}
      <rect x="18" y="34" width="12" height="3" rx="1" fill={accent} opacity="0.25" />
      {/* Magnetic pull lines (capturing leads) */}
      <path d="M38 16c2 1 4 2 4 5" stroke={accent} strokeWidth="1" opacity="0.2" strokeLinecap="round" fill="none" />
      <path d="M40 14c2 1 4 3 4 6" stroke={accent} strokeWidth="1" opacity="0.15" strokeLinecap="round" fill="none" />
      {/* Incoming dots (leads being captured) */}
      <circle cx="44" cy="12" r="1.5" fill={accent} opacity="0.3" />
      <circle cx="42" cy="26" r="1" fill={accent} opacity="0.2" />
      <circle cx="6" cy="20" r="1.5" fill={accent} opacity="0.2" />
      <path d="M6 20l8 0" stroke={accent} strokeWidth="0.8" opacity="0.15" strokeLinecap="round" />
      {/* Sparkle */}
      <circle cx="8" cy="8" r="0.8" fill={accent} opacity="0.25" />
    </svg>
  );
}

/* ==========================================
   THE DISCOVERY — binoculars scanning a target home
   For The Home Scout (property search / scouting)
   ========================================== */
export function HomeScoutIcon({ accent, size = 48, className }: TrackIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      {/* Binocular left lens */}
      <circle cx="15" cy="16" r="7" stroke={accent} strokeWidth="2" fill={accent} fillOpacity="0.06" />
      <circle cx="15" cy="16" r="4" stroke={accent} strokeWidth="1" opacity="0.3" fill="none" />
      <circle cx="15" cy="16" r="1.5" fill={accent} opacity="0.4" />
      {/* Binocular right lens */}
      <circle cx="33" cy="16" r="7" stroke={accent} strokeWidth="2" fill={accent} fillOpacity="0.06" />
      <circle cx="33" cy="16" r="4" stroke={accent} strokeWidth="1" opacity="0.3" fill="none" />
      <circle cx="33" cy="16" r="1.5" fill={accent} opacity="0.4" />
      {/* Bridge between lenses */}
      <line x1="20" y1="16" x2="28" y2="16" stroke={accent} strokeWidth="2" strokeLinecap="round" />
      {/* Eyepiece tops */}
      <line x1="12" y1="8" x2="18" y2="8" stroke={accent} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <line x1="30" y1="8" x2="36" y2="8" stroke={accent} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      {/* Sightlines scanning downward (dashed — in-progress discovery) */}
      <line x1="15" y1="24" x2="22" y2="36" stroke={accent} strokeWidth="0.8" opacity="0.25" strokeLinecap="round" strokeDasharray="1.5 1.5" />
      <line x1="33" y1="24" x2="26" y2="36" stroke={accent} strokeWidth="0.8" opacity="0.25" strokeLinecap="round" strokeDasharray="1.5 1.5" />
      {/* Location ping pulse above the found house */}
      <circle cx="24" cy="32" r="3" stroke={accent} strokeWidth="0.8" opacity="0.2" fill="none" />
      <circle cx="24" cy="32" r="1.5" fill={accent} opacity="0.4" />
      {/* Target house silhouette (what's being scouted) */}
      <path d="M18 40l6-6 6 6v4H18z" stroke={accent} strokeWidth="2" strokeLinejoin="round" fill={accent} fillOpacity="0.08" />
      <rect x="22" y="40" width="4" height="4" rx="0.5" stroke={accent} strokeWidth="1" opacity="0.3" />
      {/* Sparkle */}
      <circle cx="42" cy="8" r="1" fill={accent} opacity="0.3" />
      <path d="M40 6l2-2" stroke={accent} strokeWidth="1" opacity="0.4" strokeLinecap="round" />
    </svg>
  );
}

/* ==========================================
   REGISTRY
   ========================================== */

export const APP_ICONS: Record<string, React.ComponentType<TrackIconProps>> = {
  "accountability-tracker": AccountabilityTrackerIcon,
  "the-drumbeat": DrumbeatIcon,
  "harvest-home": HarvestHomeIcon,
  "open-house-hub": OpenHouseHubIcon,
  "home-scout": HomeScoutIcon,
  "home-stretch": HomeStretchIcon,
  "home-ready": HomeReadyIcon,
  "newsletter-studio": NewsletterStudioIcon,
  "market-intel": MarketIntelIcon,
  "the-oven": OvenIcon,
  "lead-capture-forms": LeadCaptureFormsIcon,

  // --- Legacy aliases (deploy-skew tolerance — remove in follow-up PR after soak) ---
  drumbeat: DrumbeatIcon,
  "the-home-scout": HomeScoutIcon,
  oven: OvenIcon,
};
