"use client";

import * as React from "react";
import { CardIllustration, type CardIllustrationProps } from "./CardIllustration";
import {
  AccountabilityTrackerIcon,
  DrumbeatIcon,
  HarvestHomeIcon,
  OpenHouseHubIcon,
  HomeScoutIcon,
  HomeStretchIcon,
  HomeReadyIcon,
  NewsletterStudioIcon,
  MarketIntelIcon,
  OvenIcon,
  LeadCaptureFormsIcon,
} from "../../icons";
import {
  RadialBurst,
  ConcentricCircles,
  OrbitalRings,
  DotGrid,
  CrossHatch,
  DiamondGrid,
} from "../survey-step-card/patterns";
import type { TrackIconProps } from "../../icons";
import type { AppSlug } from "@rello-platform/slugs";

/* ==========================================
   APP ILLUSTRATION REGISTRY

   Pre-defined branded illustrations for
   platform app cards. Each is permanently
   assigned an accent, pattern, and icon.
   ========================================== */

export interface AppIllustrationDef {
  /** Creative codename */
  codename: string;
  /** What app this is for */
  section: string;
  /** Accent color hex */
  accent: string;
  /** Pattern component */
  pattern: React.ComponentType<{ accent: string }>;
  /** Icon component */
  icon: React.ComponentType<TrackIconProps>;
}

/**
 * illustrationKey namespace — platform apps use canonical `AppSlug` values;
 * feature-keys are conceptual / "Coming Soon" cards with no corresponding
 * App table row (per A-030 Option D). Compile-time union keeps new drift
 * out while the registry object retains legacy aliases for runtime
 * deploy-skew tolerance.
 */
export type PlatformIllustrationKey = AppSlug;
export type FeatureIllustrationKey = "accountability-tracker" | "lead-capture-forms";
export type IllustrationKey = PlatformIllustrationKey | FeatureIllustrationKey;

// Canonical definitions — shared between canonical key + legacy alias.
const theDrumbeatIllustration: AppIllustrationDef = {
  codename: "The Rhythm",
  section: "The Drumbeat — automated prospecting sequences",
  accent: "#C74B3F",
  pattern: RadialBurst,
  icon: DrumbeatIcon,
};

const homeScoutIllustration: AppIllustrationDef = {
  codename: "The Discovery",
  section: "The Home Scout — property search & lead-capturing tools",
  accent: "#3B8DBD",
  pattern: OrbitalRings,
  icon: HomeScoutIcon,
};

const theOvenIllustration: AppIllustrationDef = {
  codename: "The Hearth",
  section: "The Oven — client retention & homeowner engagement",
  accent: "#C75B39",
  pattern: RadialBurst,
  icon: OvenIcon,
};

export const APP_ILLUSTRATIONS: Record<string, AppIllustrationDef> = {
  "accountability-tracker": {
    codename: "The Checkpoint",
    section: "Accountability Tracker — daily prospecting habits",
    accent: "#E07A2F",
    pattern: ConcentricCircles,
    icon: AccountabilityTrackerIcon,
  },
  "the-drumbeat": theDrumbeatIllustration,
  "harvest-home": {
    codename: "The Harvest",
    section: "Harvest Home — geographic farming campaigns",
    accent: "#6B8E4E",
    pattern: DotGrid,
    icon: HarvestHomeIcon,
  },
  "open-house-hub": {
    codename: "The Welcome",
    section: "Open House Hub — open house sign-in capture",
    accent: "#D4943A",
    pattern: DiamondGrid,
    icon: OpenHouseHubIcon,
  },
  "home-scout": homeScoutIllustration,
  "home-stretch": {
    codename: "The Finish Line",
    section: "The Home Stretch — buyer journey nurture",
    accent: "#5B9EA6",
    pattern: OrbitalRings,
    icon: HomeStretchIcon,
  },
  "home-ready": {
    codename: "The Key",
    section: "Home Ready — buyer readiness assessments",
    accent: "#4A7B5E",
    pattern: ConcentricCircles,
    icon: HomeReadyIcon,
  },
  "newsletter-studio": {
    codename: "The Press",
    section: "Newsletter Studio — email campaigns & newsletters",
    accent: "#7B5EA7",
    pattern: CrossHatch,
    icon: NewsletterStudioIcon,
  },
  "market-intel": {
    codename: "The Lens",
    section: "Market Intel — local market trends & data",
    accent: "#5A7EB5",
    pattern: OrbitalRings,
    icon: MarketIntelIcon,
  },
  "the-oven": theOvenIllustration,
  "lead-capture-forms": {
    codename: "The Funnel",
    section: "Lead Capture Forms — custom capture forms & funnels",
    accent: "#B8863B",
    pattern: DotGrid,
    icon: LeadCaptureFormsIcon,
  },

  // --- Legacy aliases (deploy-skew tolerance — remove in follow-up PR after soak) ---
  drumbeat: theDrumbeatIllustration,
  "the-home-scout": homeScoutIllustration,
  oven: theOvenIllustration,
};

/* ==========================================
   PRE-COMPOSED COMPONENT

   Usage:
     <AppCardIllustration illustrationKey="home-ready" />
     <AppCardIllustration illustrationKey="the-oven" size={36} />
   ========================================== */

export interface AppCardIllustrationProps
  extends Omit<CardIllustrationProps, "accent" | "pattern" | "icon"> {
  /** Registry key — canonical platform slug or feature-key. */
  illustrationKey: IllustrationKey;
  /** Override accent color */
  accentOverride?: string;
  /** Icon size in px (default 24 for app cards) */
  iconSize?: number;
}

export function AppCardIllustration({
  illustrationKey,
  accentOverride,
  iconSize = 24,
  ...props
}: AppCardIllustrationProps) {
  const def = APP_ILLUSTRATIONS[illustrationKey];
  if (!def) return null;

  const accent = accentOverride ?? def.accent;
  const PatternComp = def.pattern;
  const IconComp = def.icon;

  return (
    <CardIllustration
      accent={accent}
      pattern={<PatternComp accent={accent} />}
      icon={<IconComp accent={accent} size={iconSize} />}
      {...props}
    />
  );
}
