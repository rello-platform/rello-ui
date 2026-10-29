import { PlatformSlug } from '@rello-platform/slugs';

/**
 * The shared Rello-family transactional email shell (Kelly's pick 2026-10-28,
 * "option A": the app logo, big and centered on the brand color, the kicker
 * "<App> · from <Company>", the headline, then body, one button, signer and
 * footer). One layout, three audiences:
 *
 *   consumer — leads and clients: the tenant's brand color, the app's logo,
 *              the LO signer, the lender footer.
 *   pro      — agents and LOs: the same brand color, the Rello logo, an
 *              optional info card, a "why you get this" footer.
 *   admin    — platform admins: Rello's own #111827, the Rello logo, short.
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
interface RelloEmailInput {
    audience: RelloEmailAudience;
    /** The app the email comes from. Decides the app name and, for consumer mail, the logo. */
    app: PlatformSlug;
    /** The sender company (tenant). Omitted from the kicker when empty. */
    companyName?: string | null;
    /** Tenant brand color, #rrggbb. Ignored for admin mail (always #111827). */
    brandColor?: string | null;
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
}
interface RenderedRelloEmail {
    subject: string;
    preheader: string;
    html: string;
    text: string;
}
declare const RELLO_EMAIL_DEFAULT_BRAND_COLOR = "#1a365d";
declare const RELLO_EMAIL_ADMIN_COLOR = "#111827";
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
 * The header/button color. A valid #rrggbb that white text and the white logo
 * can sit on (contrast ≥ 3:1, WCAG large text) is used as given; anything else
 * falls back to the default navy. Admin mail is always #111827.
 */
declare function resolveRelloEmailColor(audience: RelloEmailAudience, brandColor: unknown): string;
declare function renderRelloEmail(input: RelloEmailInput): RenderedRelloEmail;

export { RELLO_EMAIL_ADMIN_COLOR, RELLO_EMAIL_APP_NAMES, RELLO_EMAIL_DEFAULT_BRAND_COLOR, RELLO_EMAIL_LOGO_BASE_URL, RELLO_EMAIL_LOGO_SLUGS, type RelloEmailAudience, type RelloEmailBadgeTone, type RelloEmailButton, type RelloEmailCardRow, type RelloEmailFooter, type RelloEmailInput, type RelloEmailLink, type RelloEmailSigner, type RenderedRelloEmail, escapeEmailHtml, relloEmailLogoUrl, renderRelloEmail, resolveRelloEmailColor, safeEmailUrl };
