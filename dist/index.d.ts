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
 * Upsell copy templating: `{{monthlyPrice}}` and `{{roiCopy}}`.
 *
 * Pure and server-safe (no React, no "use client"), exported from the root
 * entry so a spoke can render the same copy in a server component, a
 * notification or a test, and used by `<RelloUpsellNudge>` for its headline,
 * body and CTA label.
 *
 * THE TOKEN-OMIT RULE (RELLO UPSELL Phase 3; ANSWERS Q-CS-8 + the platform
 * no-gates rule): prices are never typed in this package. The spoke passes
 * the values it read from Rello's pricing/ROI config. When a value is missing
 * the SENTENCE that uses it is omitted and the rest of the copy, and the
 * nudge, still render. The output never contains:
 *   - "$0" or a price with no non-zero digit (a missing price is not free),
 *   - an empty "/mo" left behind by a blank price,
 *   - a raw `{{token}}`, including tokens this package does not fill
 *     (e.g. `{{leadName}}`, which the spoke must substitute first).
 * Copy with no `{{` is never touched: the rule applies only to copy that
 * asked for a substitution.
 */
interface UpsellCopyValues {
    /**
     * Display-ready monthly price from Rello's config, e.g. "$199". Treated as
     * missing when absent, blank, not a string, or carrying no non-zero digit
     * ("$0", "0.00", "TBD").
     */
    monthlyPrice?: string | null;
    /** Per-seam ROI line from Rello's config. Missing when absent, blank or not a string. */
    roiCopy?: string | null;
}
/**
 * Render an upsell copy template. Copy with no `{{` is the caller's text and
 * is returned unchanged, byte for byte, literal or unbalanced braces included
 * ("Literal }} text" stays as written). Only copy that contains `{{` is
 * templated, and only there does a sentence with a leftover brace pair get
 * omitted.
 */
declare function renderUpsellCopy(template: string, values?: UpsellCopyValues): string;

/**
 * Upsell telemetry vocabulary. Pure data, server-safe (root entry).
 *
 * ANSWERS Q-CS-5: five events per seam. The component reports `engaged`
 * (`onEngaged`), `dismissed` (`onDismiss`) and `clicked` (`onClick`); the
 * spoke's wrapper reports `shown` when it mounts the nudge; Rello's
 * trial-start / upgrade handler emits `converted`. Signal types are
 * `<spoke>.upsell.<seam>.<event>`, typed with `UpsellEvent` so the event half
 * cannot be misspelled.
 */
declare const UPSELL_EVENTS: readonly ["shown", "engaged", "dismissed", "clicked", "converted"];
type UpsellEvent = (typeof UPSELL_EVENTS)[number];
/**
 * How long the pointer (or keyboard focus) must stay on a nudge before it
 * counts as `engaged` ("hover >= 3s OR detail-panel-expand").
 */
declare const UPSELL_ENGAGED_DWELL_MS = 3000;

/**
 * Trial countdown arithmetic. Pure and server-safe (root entry), so a spoke
 * can decide in a server component whether to mount the banner at all, and
 * so the banner's thresholds are tested without a DOM.
 *
 * ANSWERS Q-CS-12: days, then hours inside the last 24 hours, then minutes
 * inside the last hour; the last 48 hours are urgent.
 */
type TrialEndsAtInput = Date | string | number | null | undefined;
type TrialTimeUnit = "days" | "hours" | "minutes";
interface TrialTimeRemaining {
    unit: TrialTimeUnit;
    /** Whole units left, rounded up (a trial with 13.2 days left shows 14). */
    value: number;
    msRemaining: number;
    /** True inside the last 48 hours. */
    isUrgent: boolean;
}
declare const TRIAL_URGENT_WINDOW_MS: number;
/** Epoch ms of the trial end, or null when the input is not a readable instant. */
declare function parseTrialEndsAt(trialEndsAt: TrialEndsAtInput): number | null;
/**
 * Time left on a trial, or null when there is no trial, the date is
 * unreadable, or the trial has ended.
 */
declare function getTrialTimeRemaining(trialEndsAt: TrialEndsAtInput, now?: number): TrialTimeRemaining | null;
/** "5 days", "1 hour", "12 minutes". */
declare function formatTrialTimeRemaining(remaining: TrialTimeRemaining): string;

/**
 * Trial-start outcome contract for `<TrialStartModal>`. Pure types,
 * server-safe (root entry).
 *
 * The modal is transport-agnostic: it never calls Rello. The spoke's
 * `onConfirm` calls Rello's `POST /api/v1/billing/trial-start` and maps the
 * response to one of these:
 *
 *   2xx                     → { status: "started", trialEndsAt }
 *   409 (one trial per tenant lifetime) → { status: "already-used", trialEndsAt: <existing end> }
 *   a known refusal         → { status: "error", message? }   (or reject / throw)
 *   an outcome nobody knows → { status: "unknown", message? }  (v2.39.0)
 *
 * "unknown" is for a request that may or may not have started the trial: the
 * response was lost or timed out, a gateway 5xx, or Rello said it could not
 * tell. The modal says "We couldn't confirm whether your trial started." and
 * offers "Check my plan", which calls `onConfirm` again: the spoke should read
 * the tenant's plan FIRST on that call and post a new start only when the plan
 * says the tenant is definitely not entitled (the platform's send rule: after
 * an unknown outcome, read the provider's record before any retry).
 *
 * A rejected or thrown `onConfirm`, or a value that is none of the four, is
 * shown as the error state with a retry. It is never shown as a success.
 */
type TrialStartEndsAt = Date | string | number | null | undefined;
interface TrialStartStarted {
    status: "started";
    /** New trial end, when Rello returns it. Missing/unreadable → the date sentence is omitted. */
    trialEndsAt?: TrialStartEndsAt;
}
interface TrialStartAlreadyUsed {
    status: "already-used";
    /** The EXISTING trial's end date from the 409 body. Missing/unreadable → the date sentence is omitted. */
    trialEndsAt?: TrialStartEndsAt;
}
interface TrialStartError {
    status: "error";
    /** Shown after "We couldn't start your trial." Defaults to a connection hint. */
    message?: string;
}
interface TrialStartUnknown {
    status: "unknown";
    /** Shown after "We couldn't confirm whether your trial started." Defaults to a check-your-plan hint. */
    message?: string;
}
type TrialStartResult = TrialStartStarted | TrialStartAlreadyUsed | TrialStartError | TrialStartUnknown;

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

/**
 * Pure formatting and parsing rules behind the as-you-type inputs
 * (PhoneInput, DateInput, EmailInput, UrlInput, CurrencyInput, PercentInput —
 * HI-05, Home Insight spec §9).
 *
 * Root entry (server-safe): no React, no DOM. A spoke's API route can re-check
 * what a browser sent with the same rules the field used, so the two never
 * drift. Every parser answers a value or `null`; none answers NaN, and none
 * invents a default.
 */
/** Every non-digit removed. */
declare function digitsOnly(raw: string): string;
/** `(801) 555-0123`, built progressively so it can be shown while typing. */
declare function formatUsPhone(raw: string): string;
/** `+18015550123` for a complete US number; `null` for anything incomplete. */
declare function usPhoneToE164(raw: string): string | null;
/** `MM/DD/YYYY`, built progressively from up to 8 digits. */
declare function formatDateDigits(raw: string): string;
/**
 * `MM/DD/YYYY` → `YYYY-MM-DD` when it is a real calendar date (leap years
 * included); `null` when partial or impossible (13/40/2026).
 */
declare function parseUsDate(raw: string): string | null;
/** `YYYY-MM-DD` → `MM/DD/YYYY`; anything else → "" (shown as an empty field). */
declare function isoDateToUs(iso: string | null | undefined): string;
/** Lowercased and trimmed. */
declare function normalizeEmail(raw: string): string;
/**
 * Trimmed; `https://` added when the text has no scheme. An empty field stays
 * empty (never `https://` on its own).
 */
declare function normalizeUrl(raw: string): string;
/**
 * Digits and at most one decimal point, with at most `maxDecimals` digits after
 * it. A minus sign is dropped (these fields hold non-negative amounts). With
 * `maxDecimals` 0 the point itself is dropped.
 */
declare function sanitizeDecimal(raw: string, maxDecimals: number): string;
/** `$1,234.5` from a sanitized decimal string; a typed trailing point is kept. */
declare function formatCurrencyDisplay(sanitized: string): string;
/** A finite number from a sanitized decimal string, or `null` (never NaN). */
declare function parseDecimal(sanitized: string): number | null;
/**
 * Where the caret belongs after re-formatting: just after the same count of
 * significant characters (by default digits) that preceded it before. Keeps the
 * caret in place when a separator is inserted or a character is dropped.
 */
declare function caretAfterFormat(rawBefore: string, caret: number, formatted: string, isSignificant?: (c: string) => boolean): number;

export { type AgentRole, type BadgeVariant, type BadgeVariantProps, type ButtonVariantProps, DEFAULT_TEAM_COPY, type FeatureIllustrationKey, type IllustrationKey, type PipelineData, type PlatformIllustrationKey, STAGES, STAGE_COLORS, STAGE_LABELS, type StructuredAddress, TRIAL_URGENT_WINDOW_MS, type TeamCopy, type TeamCopyOverride, type TeamMember, type TeamRole, type TeamRosterVariant, type TrialEndsAtInput, type TrialStartAlreadyUsed, type TrialStartEndsAt, type TrialStartError, type TrialStartResult, type TrialStartStarted, type TrialStartUnknown, type TrialTimeRemaining, type TrialTimeUnit, UPSELL_ENGAGED_DWELL_MS, UPSELL_EVENTS, type UpsellCopyValues, type UpsellEvent, agentRoleToTeamRole, alphaTint, badgeVariants, buildLocationTagSlug, buttonVariants, caretAfterFormat, cn, digitsOnly, formatCopy, formatCurrencyDisplay, formatDateDigits, formatTrialTimeRemaining, formatUsPhone, getTeamCopy, getTrialTimeRemaining, hexAlphaToPercent, isoDateToUs, normalizeEmail, normalizeUrl, parseDecimal, parseTrialEndsAt, parseUsDate, renderUpsellCopy, sanitizeDecimal, usPhoneToE164 };
