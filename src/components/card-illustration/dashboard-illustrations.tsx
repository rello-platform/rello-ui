"use client";

import * as React from "react";
import { CardIllustration, type CardIllustrationProps } from "./CardIllustration";
import {
  DawnIcon,
  SignalIcon,
  PulseIcon,
  AtlasIcon,
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

/* ==========================================
   DASHBOARD ILLUSTRATION REGISTRY

   Pre-defined branded illustrations for
   dashboard cards. Each is permanently
   assigned an accent, pattern, and icon.
   ========================================== */

export interface DashboardIllustrationDef {
  /** Creative codename */
  codename: string;
  /** What card this is for */
  section: string;
  /** Accent color hex */
  accent: string;
  /** Pattern component */
  pattern: React.ComponentType<{ accent: string }>;
  /** Icon component */
  icon: React.ComponentType<TrackIconProps>;
  /** Whether this should render in dark mode */
  dark?: boolean;
}

export const DASHBOARD_ILLUSTRATIONS: Record<string, DashboardIllustrationDef> = {
  "before-9": {
    codename: "The Dawn",
    section: "Five Before 9 Action Card",
    accent: "#D4943A",
    pattern: RadialBurst,
    icon: DawnIcon,
    dark: true,
  },
  conversations: {
    codename: "The Signal",
    section: "Conversations Inbox Card",
    accent: "#5B9EA6",
    pattern: ConcentricCircles,
    icon: SignalIcon,
  },
  "market-intel": {
    codename: "The Pulse",
    section: "Market Intel TL;DR Card",
    accent: "#5A7EB5",
    pattern: OrbitalRings,
    icon: PulseIcon,
  },
  "neighborhood-intel": {
    codename: "The Atlas",
    section: "Neighborhood Intel Card",
    accent: "#4A7B5E",
    pattern: DotGrid,
    icon: AtlasIcon,
  },
};

/* ==========================================
   PRE-COMPOSED COMPONENT

   Usage:
     <DashboardCardIllustration illustrationKey="market-intel" />
     <DashboardCardIllustration illustrationKey="before-9" size={96} />
   ========================================== */

export interface DashboardCardIllustrationProps
  extends Omit<CardIllustrationProps, "accent" | "pattern" | "icon" | "dark"> {
  /** Registry key (e.g. "market-intel", "before-9") */
  illustrationKey: string;
  /** Override accent color */
  accentOverride?: string;
  /** Icon size in px (default 48) */
  iconSize?: number;
}

export function DashboardCardIllustration({
  illustrationKey,
  accentOverride,
  iconSize = 48,
  ...props
}: DashboardCardIllustrationProps) {
  const def = DASHBOARD_ILLUSTRATIONS[illustrationKey];
  if (!def) return null;

  const accent = accentOverride ?? def.accent;
  const PatternComp = def.pattern;
  const IconComp = def.icon;

  return (
    <CardIllustration
      accent={accent}
      dark={def.dark}
      pattern={<PatternComp accent={accent} />}
      icon={<IconComp accent={def.dark ? "#fff" : accent} size={iconSize} />}
      {...props}
    />
  );
}
