import { PlatformSlug } from '@rello-platform/slugs';

/**
 * The shared Rello-family transactional email shell (Kelly's pick 2026-10-28,
 * "option A": the app logo, big and centered on the brand color, the kicker
 * "<App> · from <Company>", the headline, then body, one button, signer and
 * footer). One layout, three audiences:
 *
 *   consumer — leads and clients: the sending app's colors, the app's logo,
 *              the LO signer, the lender footer.
 *   pro      — agents and LOs: the sending app's colors, the app's logo, an
 *              optional info card, a "why you get this" footer.
 *   admin    — platform admins: Rello's colors, the Rello logo, short.
 *
 * Logos: every app's email carries that app's logo, whoever receives it
 * (KA ruling 2026-10-29, on Kelly's "those dont include the Market intel
 * logo"). Only admin mail draws Rello's. An app with no hosted logo shows its
 * name as text in the header.
 *
 * Colors (Kelly 2026-10-29: "Each app has its own colors in Rello ui that
 * should match"): read at render time from tokens/app-overrides.json, the same
 * file the Configurator edits and the apps theme from — apps.<key>.<field>,
 * else defaults.<field>. No app color is copied into this file. A color that
 * would make text hard to read is darkened here until it passes (white header
 * text ≥ 3:1, other text ≥ 4.5:1).
 *
 * Pure: no React, no DOM, no network, no env. It RENDERS; it never sends and
 * adds no compliance rule. Each app keeps its own send path, consent checks
 * and footer obligations, and passes the footer facts in.
 *
 * Every text value is HTML-escaped here, the URLs in attributes included. A
 * URL that is not http(s) drops the button or link it belongs to. An empty
 * field is omitted: the output never shows "undefined", "null" or a bare
 * "NMLS #".
 *
 * Email-safe: tables and inline styles only, 600 px wide, an MSO conditional
 * pins the width in Outlook desktop, no flex/grid, no web fonts, no external
 * CSS. Logos are PNGs at a fixed public address because Gmail and Outlook do
 * not show SVG or WebP.
 */

type RelloEmailAudience = "consumer" | "pro" | "admin";
/**
 * @deprecated Accepted and ignored: every badge uses the sending app's accent
 * (Kelly 2026-10-29). The badge label carries the meaning.
 */
type RelloEmailBadgeTone = "hot" | "info" | "success" | "warning" | "neutral";
interface RelloEmailLink {
    label: string;
    /** http(s) only; anything else drops the link. */
    url: string;
}
interface RelloEmailButton extends RelloEmailLink {
    /** Small line under the button, e.g. "This button signs you in. It works once and expires in 24 hours." */
    note?: string | null;
}
interface RelloEmailCardRow {
    label: string;
    value: string;
}
interface RelloEmailSigner {
    name: string;
    title?: string | null;
    /** The number only ("123456"); the shell writes "NMLS #". */
    nmls?: string | null;
    phone?: string | null;
    /** Shown in the round badge; derived from `name` when omitted. */
    initials?: string | null;
    /** The line above the signer, e.g. "Questions? Just reply. It comes straight to me." */
    replyLine?: string | null;
}
interface RelloEmailFooter {
    companyName?: string | null;
    /** The number only; the shell writes "Company NMLS #". */
    companyNmls?: string | null;
    address?: string | null;
    /** Adds "Equal Housing Opportunity". */
    equalHousing?: boolean;
    /** "You're getting this because …". */
    reason?: string | null;
    /** e.g. "Change your alerts" → the app's preference page. */
    preferenceLink?: RelloEmailLink | null;
}
/**
 * The sender's own brand (the agent's or tenant's), for consumer and pro mail
 * sent on their behalf: the reader hears from that agent or business, not from
 * the app behind the email. Admin mail ignores it.
 */
interface RelloEmailBrand {
    /** Header text when there is no usable logo, and the logo's alt text. Empty: the header names nobody. */
    name: string;
    /** Drawn only when a clean https URL whose path ends .png, .jpg, .jpeg or .gif; else the name is the header text. */
    logoUrl?: string | null;
    /** Header band and button color when a #rgb/#rrggbb hex, darkened as needed; else the neutral default. */
    primary?: string | null;
}
/** One level's brand facts as an app stores them, before the rule picks a level. */
interface RelloEmailBrandLevelInput {
    name?: string | null;
    logoUrl?: string | null;
    primary?: string | null;
}
/** The brand the rule picked, and which level it came from. */
interface ResolvedRelloEmailBrand extends RelloEmailBrand {
    logoUrl: string | null;
    primary: string | null;
    level: "agent" | "tenant";
}
interface RelloEmailInput {
    audience: RelloEmailAudience;
    /**
     * The app the email comes from. Decides the app name, the colors (from
     * tokens/app-overrides.json; admin mail always uses Rello's) and, for
     * consumer and pro mail, the logo.
     */
    app: PlatformSlug;
    /** The sender company (tenant). Omitted from the kicker when empty. */
    companyName?: string | null;
    subject: string;
    /** Inbox preview text. */
    preheader?: string | null;
    /** Overrides the default kicker line in the header. */
    kicker?: string | null;
    headline: string;
    /** A short line under the headline, e.g. "4 minutes ago · from your Home Ready page". */
    detail?: string | null;
    badge?: {
        label: string;
        tone?: RelloEmailBadgeTone;
    } | null;
    /** Body paragraphs; a "\n" inside one becomes a line break. */
    paragraphs?: ReadonlyArray<string | null | undefined>;
    card?: {
        title?: string | null;
        rows: ReadonlyArray<RelloEmailCardRow>;
    } | null;
    button?: RelloEmailButton | null;
    /** A text link beside the button. */
    secondaryLink?: RelloEmailLink | null;
    /** Writes the button's full URL under it ("Button not working? …"). Default true. */
    showLinkFallback?: boolean;
    signer?: RelloEmailSigner | null;
    footer?: RelloEmailFooter | null;
    /**
     * Consumer and pro mail: the sender's brand replaces the app's logo, name and
     * colors, so neither the app's name, logo nor color appears anywhere in the
     * email. Admin mail ignores it. Absent (or null), the email is exactly what
     * it was at v2.33.0.
     */
    brand?: RelloEmailBrand | null;
}
interface RenderedRelloEmail {
    subject: string;
    preheader: string;
    html: string;
    text: string;
}
declare const RELLO_EMAIL_LOGO_BASE_URL = "https://hellorello.app/email/logos";
/**
 * Display name for every platform slug. Typed as a full Record so a slug added
 * to @rello-platform/slugs fails this package's typecheck until it is named.
 */
declare const RELLO_EMAIL_APP_NAMES: Readonly<Record<PlatformSlug, string>>;
/**
 * Apps that have a hosted PNG logo (white on transparent, 192×192, served by
 * Rello from public/email/logos/<slug>.png). An app not listed renders its
 * name as text in the header.
 */
declare const RELLO_EMAIL_LOGO_SLUGS: ReadonlySet<PlatformSlug>;
declare function relloEmailLogoUrl(app: PlatformSlug): string | null;
declare function escapeEmailHtml(value: string): string;
/**
 * The URL if it is an absolute http(s) URL, else null. A URL with whitespace,
 * a control character or a line separator inside it is refused: the URL parser
 * would quietly strip those, but the returned string is written as-is into the
 * plain-text part, where a line break would start a second, fake link line.
 */
declare function safeEmailUrl(value: unknown): string | null;
/**
 * tokens/app-overrides.json keys that are not the platform slug. Every other
 * slug reads the block under its own name; a slug with no block (prequal-pro,
 * the-oven, the engines, …) reads `defaults`. The JSON's "conversations" block
 * is a Rello module, not a platform slug, so no email reads it.
 */
declare const RELLO_EMAIL_TOKEN_KEY_FOR_SLUG: Readonly<Partial<Record<PlatformSlug, string>>>;
/** The colors one email is drawn with. All lowercase #rrggbb. */
interface RelloEmailPalette {
    /** Header band and button: the app's `primary`, darkened only if white text on it falls under 3:1. */
    primary: string;
    /** Link text: `primary`, darkened until ≥ 4.5:1 on white. */
    link: string;
    /** Badge background: a light tint of the app's `accent`. */
    badgeBackground: string;
    /** Badge text: `accent`, darkened until ≥ 4.5:1 on the badge background. */
    badgeText: string;
    /** Detail line, card labels, notes, signer details, footer: `secondaryText`, darkened until ≥ 4.5:1 on white and on the card. */
    secondaryText: string;
    /** Info card: `rowBackground` (white if too dark for the card's text) with a `cardBorder` edge. */
    cardBackground: string;
    cardBorder: string;
    /** Signer initials: a light tint of `primary`, with `primary` darkened until ≥ 4.5:1 on it. */
    avatarBackground: string;
    avatarText: string;
}
/** WCAG contrast ratio of two #rrggbb colors. */
declare function relloEmailContrast(a: string, b: string): number;
/**
 * The colors for one email: the sending app's tokens (admin mail and an
 * unknown app: Rello's), each text color held to its contrast floor.
 */
declare function resolveRelloEmailPalette(audience: RelloEmailAudience, app: unknown): RelloEmailPalette;
/**
 * THE BRAND RULE, one rule for every app (KA amended 121, 2026-10-30). The
 * agent level wins as a whole: an agent with their own business uses its name,
 * logo and color, and a missing one stays missing, so an RE agent inside an MLO
 * tenant never carries the MLO's logo or color. Otherwise the tenant level. An
 * agent whose business is the tenant's is the tenant level. An own logo with no
 * business name is named by the agent. Nothing is gated: a missing fact is left
 * out and the shell shows the name as text, or the neutral default color.
 */
declare function resolveRelloEmailBrand(args: {
    /** The agent's own name: the last resort for the brand's name. */
    agentName?: string | null;
    /** The agent's business. */
    business?: RelloEmailBrandLevelInput | null;
    tenant?: RelloEmailBrandLevelInput | null;
}): ResolvedRelloEmailBrand;
declare function renderRelloEmail(input: RelloEmailInput): RenderedRelloEmail;

export { RELLO_EMAIL_APP_NAMES, RELLO_EMAIL_LOGO_BASE_URL, RELLO_EMAIL_LOGO_SLUGS, RELLO_EMAIL_TOKEN_KEY_FOR_SLUG, type RelloEmailAudience, type RelloEmailBadgeTone, type RelloEmailBrand, type RelloEmailBrandLevelInput, type RelloEmailButton, type RelloEmailCardRow, type RelloEmailFooter, type RelloEmailInput, type RelloEmailLink, type RelloEmailPalette, type RelloEmailSigner, type RenderedRelloEmail, type ResolvedRelloEmailBrand, escapeEmailHtml, relloEmailContrast, relloEmailLogoUrl, renderRelloEmail, resolveRelloEmailBrand, resolveRelloEmailPalette, safeEmailUrl };
