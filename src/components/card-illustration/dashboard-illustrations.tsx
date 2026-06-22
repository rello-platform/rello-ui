"use client";

import * as React from "react";
import { CardIllustration, type CardIllustrationProps } from "./CardIllustration";
import {
  DawnIcon,
  SignalIcon,
  PulseIcon,
  AtlasIcon,
  MyPipelineIcon,
  ActionsIcon,
  BrainIcon,
  FlowIcon,
  DocsIcon,
  RateAlertIcon,
  PreQualIcon,
  LoanVolumeIcon,
  ClosingIcon,
  HRAssessmentsIcon,
  HSProgressIcon,
  HomeScoutIcon,
  NewsletterStudioIcon,
  OpenHouseIcon,
  MailboxIcon,
  FollowupIcon,
  AppGridIcon,
  FunnelIcon,
  TrophyIcon,
  TeamPipelineIcon,
  LeadPoolIcon,
  RoutingIcon,
  TeamActivityIcon,
  TeamDawnIcon,
  TendingIcon,
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
  "my-pipeline": {
    codename: "The Ledger",
    section: "My Pipeline Card",
    accent: "#3B6BB5",
    pattern: DotGrid,
    icon: MyPipelineIcon,
  },
  actions: {
    codename: "The Spark",
    section: "Quick Actions Panel Card",
    accent: "#D4943A",
    pattern: RadialBurst,
    icon: ActionsIcon,
  },
  brain: {
    codename: "The Oracle",
    section: "Milo Insights Summary Card",
    accent: "#7C5DBA",
    pattern: ConcentricCircles,
    icon: BrainIcon,
  },
  flow: {
    codename: "The Current",
    section: "Pipeline Movement Card",
    accent: "#3F9D7A",
    pattern: OrbitalRings,
    icon: FlowIcon,
  },
  docs: {
    codename: "The Stack",
    section: "Docs Pending Card",
    accent: "#C46A3A",
    pattern: DiamondGrid,
    icon: DocsIcon,
  },
  "rate-alert": {
    codename: "The Beacon",
    section: "Rate Alerts Card",
    accent: "#C24A4A",
    pattern: CrossHatch,
    icon: RateAlertIcon,
  },
  "pre-qual": {
    codename: "The Ascent",
    section: "Pre-Qual Pipeline Card",
    accent: "#5B9EA6",
    pattern: ConcentricCircles,
    icon: PreQualIcon,
  },
  "loan-volume": {
    codename: "The Vault",
    section: "Loan Volume Card",
    accent: "#2E7A50",
    pattern: DotGrid,
    icon: LoanVolumeIcon,
  },
  closing: {
    codename: "The Keystone",
    section: "Closing This Month Card",
    accent: "#2C4A6B",
    pattern: DiamondGrid,
    icon: ClosingIcon,
  },
  "hr-assessments": {
    codename: "The Assay",
    section: "HR Assessments Card",
    accent: "#4A5599",
    pattern: OrbitalRings,
    icon: HRAssessmentsIcon,
  },
  "hs-progress": {
    codename: "The Trail",
    section: "HS Progress Card",
    accent: "#B8546A",
    pattern: CrossHatch,
    icon: HSProgressIcon,
  },
  "open-house": {
    codename: "The Threshold",
    section: "Open House Check-ins Card",
    accent: "#D4A93A",
    pattern: RadialBurst,
    icon: OpenHouseIcon,
  },
  mailbox: {
    codename: "The Post",
    section: "Unread Messages Card",
    accent: "#5A6B82",
    pattern: ConcentricCircles,
    icon: MailboxIcon,
  },
  followup: {
    codename: "The Cadence",
    section: "Needs Follow-up Card",
    accent: "#D67A5A",
    pattern: OrbitalRings,
    icon: FollowupIcon,
  },
  "app-grid": {
    codename: "The Constellation",
    section: "Spoke App Status Cards",
    accent: "#6B82A0",
    pattern: DotGrid,
    icon: AppGridIcon,
  },
  funnel: {
    codename: "The Sieve",
    section: "Conversion Funnel Card",
    accent: "#8A5DB5",
    pattern: DiamondGrid,
    icon: FunnelIcon,
  },
  trophy: {
    codename: "The Laurel",
    section: "Agent Performance Card",
    accent: "#D4B83A",
    pattern: RadialBurst,
    icon: TrophyIcon,
  },
  "team-pipeline": {
    codename: "The Conclave",
    section: "Broker Agent Pipeline Card",
    accent: "#3A4F8C",
    pattern: CrossHatch,
    icon: TeamPipelineIcon,
  },
  "lead-pool": {
    codename: "The Spring",
    section: "Lead Pools Card",
    accent: "#3FA3A8",
    pattern: ConcentricCircles,
    icon: LeadPoolIcon,
  },
  routing: {
    codename: "The Junction",
    section: "Leads Needing Routing Card",
    accent: "#C26B3A",
    pattern: OrbitalRings,
    icon: RoutingIcon,
  },
  "team-activity": {
    codename: "The Choir",
    section: "Milo Team Activity Card",
    accent: "#9B5DB5",
    pattern: DiamondGrid,
    icon: TeamActivityIcon,
  },
  "team-dawn": {
    codename: "The Vigil",
    section: "Team Before 9 Card",
    accent: "#C49A52",
    pattern: RadialBurst,
    icon: TeamDawnIcon,
    dark: true,
  },
  "home-scout": {
    codename: "The Discovery",
    section: "Home Scout Card",
    accent: "#3B8DBD",
    pattern: OrbitalRings,
    icon: HomeScoutIcon,
  },
  "newsletter-studio": {
    codename: "The Press",
    section: "Newsletter Studio Card",
    accent: "#7B5EA7",
    pattern: CrossHatch,
    icon: NewsletterStudioIcon,
  },
  "client-nurture": {
    codename: "The Tending",
    section: "Client Nurture Card",
    accent: "#5B9E6E",
    pattern: ConcentricCircles,
    icon: TendingIcon,
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
  /** Icon size in px (default 28) */
  iconSize?: number;
}

const RESPONSIVE_SIZE = "clamp(48px, calc(40px + 3vw), 88px)";

export function DashboardCardIllustration({
  illustrationKey,
  accentOverride,
  iconSize = 28,
  size,
  bgOpacity = 0.08,
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
      {...(size !== undefined
        ? { size }
        : { sizeOverride: RESPONSIVE_SIZE })}
      bgOpacity={bgOpacity}
      pattern={<PatternComp accent={accent} />}
      icon={<IconComp accent={def.dark ? "#fff" : accent} size={iconSize} />}
      {...props}
    />
  );
}
