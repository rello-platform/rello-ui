/**
 * @rello-platform/ui (root entry)
 *
 * Server-safe surface. Pure utilities, types, and data constants only.
 * Safe to import from RSC server components, Next API route handlers,
 * Node scripts, and build-time code paths. NO React components.
 *
 * For components (Button, Card, Dialog, SVG icon renderers, etc.), use
 * the client entry:
 *
 *   import { Button } from "@rello-platform/ui/client";
 *
 * The split exists because this entry has no `"use client"` banner — so
 * pure function imports like `agentRoleToTeamRole(role)` resolve to the
 * real callable in server contexts instead of a client-reference proxy.
 * See DISCOVERED-RELLO-UI-RUNTIME-IMPORT-FAILURE-ON-RAILWAY-041726.
 */

/* ─── Pure utilities ─── */

export { cn } from "./lib/cn";

/**
 * Alpha tinting. `alphaTint(color, percent)` is the ONE mechanism this package
 * uses to express a translucent shade of a caller-supplied color, and the reason
 * `accent` props accept a CSS custom property as well as a literal hex. Exported
 * so consumers can tint the same way in their own surfaces instead of
 * reintroducing hex-alpha concatenation. See src/lib/alpha-tint.ts.
 */
export { alphaTint, hexAlphaToPercent } from "./lib/alpha-tint";

/* ─── CVA class-name builders (pure functions) ─── */

export { buttonVariants, type ButtonVariantProps } from "./components/button/variants";
export {
  badgeVariants,
  type BadgeVariant,
  type BadgeVariantProps,
} from "./components/badge/variants";

/* ─── Lead-team composition (pure functions + types) ─── */

export {
  DEFAULT_TEAM_COPY,
  agentRoleToTeamRole,
  formatCopy,
  getTeamCopy,
} from "./components/lead-team/catalog";

export type {
  AgentRole,
  TeamCopy,
  TeamCopyOverride,
  TeamMember,
  TeamRole,
  TeamRosterVariant,
} from "./components/lead-team/types";

/* ─── Pipeline stage constants (pure data) ─── */

export {
  STAGES,
  STAGE_COLORS,
  STAGE_LABELS,
  type PipelineData,
} from "./components/pipeline-thermometer/stages";

/* ─── Address slug helpers (pure functions + types) ─── */

export {
  buildLocationTagSlug,
  type StructuredAddress,
} from "./components/address-autocomplete/slug";

/* ─── App illustration key types (pure type exports) ─── */

export type {
  PlatformIllustrationKey,
  FeatureIllustrationKey,
  IllustrationKey,
} from "./components/card-illustration/app-illustrations";
