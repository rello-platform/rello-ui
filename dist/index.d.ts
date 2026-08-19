import { ClassValue } from 'clsx';
import * as class_variance_authority_types from 'class-variance-authority/types';
import { VariantProps } from 'class-variance-authority';
import { AppSlug } from '@rello-platform/slugs';

declare function cn(...inputs: ClassValue[]): string;

/**
 * alphaTint — express a translucent shade of a color that a CSS custom property
 * can survive.
 *
 * ## Why this exists
 *
 * Components used to tint an accent by concatenating a hex alpha suffix onto the
 * prop: `` `${accent}14` ``. That is string arithmetic on a color, and it only
 * works when the caller hands us a literal hex. The moment a caller passes a CSS
 * custom property — `var(--brand-accent, #2A6F97)`, the natural way to bind a
 * component to per-tenant branding — the suffix lands on the end of the whole
 * expression and produces `var(--brand-accent, #2A6F97)14`, which is not a
 * color. The declaration is dropped and the surface renders untinted.
 *
 * That forced every consumer to resolve the hex itself and thread the resolved
 * value down, which is the situation this helper exists to escape. Home Scout
 * hit it at its SurveyGate surface, where resolving would have meant threading
 * values through ToolContext across four provider sites
 * (DISCOVERED-HS-BRAND-ACCENT-COMPLETION-SURVEYGATE-CHROME-260616 item 1).
 *
 * `color-mix(in srgb, <color> N%, transparent)` expresses the same translucent
 * shade while accepting ANY CSS color value — a literal hex, `var(...)`,
 * `rgb(...)`, a named color, or a nested `color-mix`. Mixing against
 * `transparent` uses premultiplied alpha, and `transparent` has zero alpha, so
 * it contributes no channel value: the result is exactly the input color at N%
 * alpha. `alphaTint("#2A6F97", 40)` and `"#2A6F9766"` compute to the same
 * `rgba(42, 111, 151, 0.4)`.
 *
 * ## One mechanism
 *
 * This is the ONLY way this package tints a caller-supplied color. There is no
 * hex fast-path and no branch on the shape of the input — a second mechanism
 * would mean two behaviours to reason about and one of them would silently be
 * the hex-only one again. `color-mix` was already the package's idiom before
 * this helper existed (ErrorBanner, HeroActionCard, MiniKanban, NewsRow,
 * SessionRetryBanner), and it is the same shape Home Scout's `brandChrome()`
 * chose for the surfaces it could reach.
 *
 * Baseline: `color-mix()` is Chrome 111 / Safari 16.2 / Firefox 113 (all 2023).
 *
 * ## Converting an existing hex-alpha suffix
 *
 * The suffix is a byte, so the percentage is `0xNN / 255`, NOT the decimal
 * reading of the digits — `14` is 7.84%, not 14%. Use {@link hexAlphaToPercent}
 * rather than converting by eye.
 */
/**
 * Convert a two-digit hex alpha suffix (`0x00`–`0xFF`) to the percentage
 * `alphaTint` expects.
 *
 * `hexAlphaToPercent(0x14) === 7.843137254901961` — the exact value `#RRGGBB14`
 * already renders at, so a conversion from suffix to `color-mix` is pixel-identical
 * rather than approximately right.
 */
declare function hexAlphaToPercent(byte: number): number;
/**
 * Return `color` at `percent` alpha, as a CSS color value.
 *
 * @param color   Any CSS color value. A literal hex (`#2A6F97`) and a custom
 *                property (`var(--brand-accent, #2A6F97)`) are equally valid —
 *                that is the point of this helper. Not parsed or validated: an
 *                unresolvable value fails the same way it would anywhere else in
 *                CSS, by dropping the declaration.
 * @param percent Alpha as 0–100. Values outside the range are clamped; a
 *                non-finite value is treated as 0 (fully transparent) rather
 *                than being interpolated into the string as `NaN%`, which would
 *                invalidate the whole declaration.
 */
declare function alphaTint(color: string, percent: number): string;

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

/**
 * illustrationKey namespace — platform apps use canonical `AppSlug` values;
 * feature-keys are conceptual / "Coming Soon" cards with no corresponding
 * App table row (per A-030 Option D). Compile-time union keeps new drift
 * out while the registry object retains legacy aliases for runtime
 * deploy-skew tolerance.
 */
type PlatformIllustrationKey = AppSlug;
type FeatureIllustrationKey = "accountability-tracker" | "lead-capture-forms";
type IllustrationKey = PlatformIllustrationKey | FeatureIllustrationKey;

export { type AgentRole, type BadgeVariant, type BadgeVariantProps, type ButtonVariantProps, DEFAULT_TEAM_COPY, type FeatureIllustrationKey, type IllustrationKey, type PipelineData, type PlatformIllustrationKey, STAGES, STAGE_COLORS, STAGE_LABELS, type StructuredAddress, type TeamCopy, type TeamCopyOverride, type TeamMember, type TeamRole, type TeamRosterVariant, agentRoleToTeamRole, alphaTint, badgeVariants, buildLocationTagSlug, buttonVariants, cn, formatCopy, getTeamCopy, hexAlphaToPercent };
