"use client";

import * as React from "react";
import { CardIllustration, type CardIllustrationProps } from "./CardIllustration";
import {
  CreditScoreIcon,
  SavingsIcon,
  DtiIcon,
  DreamHomeIcon,
  MortgageTermsIcon,
  BudgetIcon,
  TimelineIcon,
  StreakIcon,
  DailyExerciseIcon,
  WeeklyChallengeIcon,
  SelfPacedIcon,
  CelebrationIcon,
  DownPaymentIcon,
  PreApprovalIcon,
  NeighborhoodIcon,
} from "../../icons";
import {
  ConcentricCircles,
  DotGrid,
  OrbitalRings,
  CrossHatch,
  DiamondGrid,
  RadialBurst,
} from "../survey-step-card/patterns";

/* ==========================================
   TRACK ILLUSTRATION REGISTRY

   Each illustration is permanently assigned:
   - Codename (creative name)
   - Accent color (from the 20-color palette)
   - Pattern (from lifecycle phase families)
   - Icon (from custom track icon catalog)

   Phase mapping for Home Stretch tracks:
   - Nurture & Education → Concentric circles
   ========================================== */

export interface TrackIllustrationDef {
  /** Creative codename */
  codename: string;
  /** What this card covers */
  section: string;
  /** Accent color hex */
  accent: string;
  /** Pattern component */
  pattern: React.ComponentType<{ accent: string }>;
  /** Icon component */
  icon: React.ComponentType<{ accent: string; size?: number }>;
}

/** Pre-defined track card illustrations — permanently assigned */
export const TRACK_ILLUSTRATIONS: Record<string, TrackIllustrationDef> = {
  /* ---- Track Selection ---- */
  "track-daily": {
    codename: "The Sunrise",
    section: "Daily Exercises Track Card",
    accent: "#D4943A",
    pattern: ConcentricCircles,
    icon: DailyExerciseIcon,
  },
  "track-weekly": {
    codename: "The Summit",
    section: "Weekly Challenges Track Card",
    accent: "#5A7EB5",
    pattern: OrbitalRings,
    icon: WeeklyChallengeIcon,
  },
  "track-self-paced": {
    codename: "The Wanderer",
    section: "Self-Paced Track Card",
    accent: "#7A9E7E",
    pattern: DotGrid,
    icon: SelfPacedIcon,
  },

  /* ---- Daily Track Cards ---- */
  "daily-credit-score": {
    codename: "The Gauge",
    section: "Credit Score Education",
    accent: "#5B9EA6",
    pattern: ConcentricCircles,
    icon: CreditScoreIcon,
  },
  "daily-savings": {
    codename: "The Nest Egg",
    section: "Savings Goals & Tips",
    accent: "#5E8C6A",
    pattern: ConcentricCircles,
    icon: SavingsIcon,
  },
  "daily-dti": {
    codename: "The Balancer",
    section: "Debt-to-Income Ratio",
    accent: "#6E6EA8",
    pattern: DotGrid,
    icon: DtiIcon,
  },
  "daily-dream-home": {
    codename: "The Vision Board",
    section: "Dream Home Exploration",
    accent: "#C9785D",
    pattern: OrbitalRings,
    icon: DreamHomeIcon,
  },
  "daily-mortgage-terms": {
    codename: "The Decoder",
    section: "Mortgage Terms & Concepts",
    accent: "#4A7B94",
    pattern: CrossHatch,
    icon: MortgageTermsIcon,
  },
  "daily-budget": {
    codename: "The Ledger",
    section: "Budget & Affordability",
    accent: "#7B8EC2",
    pattern: DiamondGrid,
    icon: BudgetIcon,
  },
  "daily-timeline": {
    codename: "The Roadmap",
    section: "Home Buying Timeline",
    accent: "#8B5E83",
    pattern: ConcentricCircles,
    icon: TimelineIcon,
  },
  "daily-streak": {
    codename: "The Flame",
    section: "Streak & Motivation",
    accent: "#B85C38",
    pattern: RadialBurst,
    icon: StreakIcon,
  },
  "daily-celebration": {
    codename: "The Confetti",
    section: "Milestone Celebration",
    accent: "#D4943A",
    pattern: RadialBurst,
    icon: CelebrationIcon,
  },
  "daily-down-payment": {
    codename: "The Stack",
    section: "Down Payment Progress",
    accent: "#3D7A80",
    pattern: DotGrid,
    icon: DownPaymentIcon,
  },
  "daily-pre-approval": {
    codename: "The Shield",
    section: "Pre-Approval Readiness",
    accent: "#5A7EB5",
    pattern: CrossHatch,
    icon: PreApprovalIcon,
  },
  "daily-neighborhood": {
    codename: "The Village",
    section: "Neighborhood Exploration",
    accent: "#A67B8A",
    pattern: OrbitalRings,
    icon: NeighborhoodIcon,
  },

  /* ---- Weekly Track Cards ---- */
  "weekly-credit-check": {
    codename: "The Compass Check",
    section: "Weekly Credit Review",
    accent: "#5B9EA6",
    pattern: ConcentricCircles,
    icon: CreditScoreIcon,
  },
  "weekly-savings-goal": {
    codename: "The Milestone Jar",
    section: "Weekly Savings Target",
    accent: "#7A9E7E",
    pattern: ConcentricCircles,
    icon: SavingsIcon,
  },
  "weekly-budget-review": {
    codename: "The Weekly Ledger",
    section: "Weekly Budget Review",
    accent: "#5A7EB5",
    pattern: DiamondGrid,
    icon: BudgetIcon,
  },
  "weekly-research": {
    codename: "The Explorer",
    section: "Weekly Research Task",
    accent: "#8E7CC3",
    pattern: OrbitalRings,
    icon: NeighborhoodIcon,
  },
  "weekly-challenge": {
    codename: "The Trophy Case",
    section: "Weekly Challenge Completion",
    accent: "#C27052",
    pattern: RadialBurst,
    icon: WeeklyChallengeIcon,
  },
};

/* ==========================================
   PRE-COMPOSED ILLUSTRATION COMPONENT

   Renders a complete 3-layer illustration
   from the registry by key.
   ========================================== */

export interface TrackCardIllustrationProps extends Omit<CardIllustrationProps, "accent" | "pattern" | "icon"> {
  /** Registry key (e.g. "daily-credit-score") */
  illustrationKey: string;
  /** Override accent color */
  accentOverride?: string;
  /** Icon size in px (default 48) */
  iconSize?: number;
}

export function TrackCardIllustration({
  illustrationKey,
  accentOverride,
  iconSize = 48,
  ...props
}: TrackCardIllustrationProps) {
  const def = TRACK_ILLUSTRATIONS[illustrationKey];
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
