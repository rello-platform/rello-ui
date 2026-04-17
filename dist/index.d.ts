import { ClassValue } from 'clsx';
import * as class_variance_authority_types from 'class-variance-authority/types';
import { VariantProps } from 'class-variance-authority';

declare function cn(...inputs: ClassValue[]): string;

declare const buttonVariants: (props?: ({
    variant?: "primary" | "secondary" | "accent" | "ghost" | "danger" | "outline" | "link" | null | undefined;
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "icon" | "icon-sm" | "icon-lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type ButtonVariantProps = VariantProps<typeof buttonVariants>;

declare const badgeVariants: (props?: ({
    variant?: "primary" | "accent" | "default" | "success" | "warning" | "error" | "info" | "hot" | "qualified" | "engaged" | "warming" | "cold" | "LEAD" | "NURTURING" | "APPLICATION" | "PROCESSING" | "CLOSED_WON" | "CLOSED_LOST" | null | undefined;
    size?: "xs" | "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type BadgeVariantProps = VariantProps<typeof badgeVariants>;
type BadgeVariant = NonNullable<BadgeVariantProps["variant"]>;

/**
 * Shared lead-team composition model — see audit
 * DISCOVERED-HR-TEAM-COMPOSITION-MODEL-041626.md
 *
 * Display vocabulary (TeamRole) is intentionally semantic and decoupled from
 * the apps' Prisma `Agent.role` enum (AgentRole). Use `agentRoleToTeamRole`
 * to map between them in each app's `getLeadTeam(leadId)` resolver.
 */
type TeamRole = "LOAN_OFFICER" | "REAL_ESTATE_AGENT" | "MANAGING_BROKER" | "SMART_ASSISTANT";
/** Mirror of the Prisma `AgentRole` enum used across consumer-facing apps. */
type AgentRole = "AGENT" | "MLO" | "BROKER";
interface TeamMember {
    role: TeamRole;
    firstName: string;
    lastName: string;
    photoUrl: string | null;
    /** Override avatar initials. When null, derived from first/last name. */
    avatarInitials?: string | null;
    phone: string | null;
    email: string | null;
    brokerage: string | null;
    brokerageLogoUrl: string | null;
    /** Per-member bio override. Falls back to catalog bio when null. */
    bio: string | null;
    nmlsNumber: string | null;
    licenseNumber: string | null;
    /** Whether to render the phone/email contact row (full + compact variants). */
    showContactRow: boolean;
}
interface TeamCopy {
    /** Long title with {firstName} / {lastName} tokens. */
    title: string;
    /** Short title for header/compact rows. No tokens. */
    shortTitle: string;
    /** Long bio with {firstName} / {lastName} tokens. */
    bio: string;
}
/** Tenant-scoped per-role copy overrides. Caller resolves for the active tenant. */
type TeamCopyOverride = Partial<Record<TeamRole, Partial<TeamCopy>>>;
type TeamRosterVariant = "full" | "compact" | "header";

/**
 * Default lead-facing copy per display role.
 * Tenant overrides merge over these via `getTeamCopy(role, override)`.
 */
declare const DEFAULT_TEAM_COPY: Record<TeamRole, TeamCopy>;
/**
 * Resolve display copy for a role, merging tenant override over defaults.
 * Pure function — no I/O. Caller passes a tenant-scoped override map.
 */
declare function getTeamCopy(role: TeamRole, override?: TeamCopyOverride): TeamCopy;
/** Map a Prisma `Agent.role` enum value to the shared `TeamRole` catalog key. */
declare function agentRoleToTeamRole(role: AgentRole): TeamRole;
/** Replace {firstName} / {lastName} tokens in a copy template. */
declare function formatCopy(template: string, firstName: string, lastName: string): string;

/**
 * Pure pipeline stage constants.
 *
 * Kept in a dedicated file (no `"use client"` directive) so the constants
 * can be imported from RSC server components via the server-safe root
 * entry `@rello-platform/ui`. See the Option-D runtime-import fix in
 * DISCOVERED-RELLO-UI-RUNTIME-IMPORT-FAILURE-ON-RAILWAY-041726.
 */
interface PipelineData {
    cold: number;
    warming: number;
    engaged: number;
    qualified: number;
    hot: number;
}
declare const STAGES: readonly ["cold", "warming", "engaged", "qualified", "hot"];
declare const STAGE_LABELS: Record<keyof PipelineData, string>;
declare const STAGE_COLORS: Record<keyof PipelineData, string>;

/**
 * Pure slug helpers for structured addresses.
 *
 * Kept in a dedicated file (no `"use client"` directive) so the helpers
 * can be imported from RSC server components — e.g. server-side signal
 * writers that need to produce `location:` tag slugs. See the Option-D
 * runtime-import fix in DISCOVERED-RELLO-UI-RUNTIME-IMPORT-FAILURE-ON-RAILWAY-041726.
 */
/** Structured address shape returned by AddressAutocomplete on selection. */
interface StructuredAddress {
    street: string;
    city: string;
    state: string;
    zip: string;
    county?: string;
    country: string;
    formattedAddress: string;
    placeId: string;
    lat?: number;
    lng?: number;
}
/**
 * Build a `location:` tag slug from structured address parts.
 *
 * Priority:
 *   1. city + state  -> `location:salt-lake-city-ut`
 *   2. zip           -> `location:84092`
 *   3. fallback      -> slugified formattedAddress
 */
declare function buildLocationTagSlug(address: StructuredAddress): string;

export { type AgentRole, type BadgeVariant, type BadgeVariantProps, type ButtonVariantProps, DEFAULT_TEAM_COPY, type PipelineData, STAGES, STAGE_COLORS, STAGE_LABELS, type StructuredAddress, type TeamCopy, type TeamCopyOverride, type TeamMember, type TeamRole, type TeamRosterVariant, agentRoleToTeamRole, badgeVariants, buildLocationTagSlug, buttonVariants, cn, formatCopy, getTeamCopy };
