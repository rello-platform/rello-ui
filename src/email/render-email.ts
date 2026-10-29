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

import type { PlatformSlug } from "@rello-platform/slugs";

export type RelloEmailAudience = "consumer" | "pro" | "admin";

export type RelloEmailBadgeTone = "hot" | "info" | "success" | "warning" | "neutral";

export interface RelloEmailLink {
  label: string;
  /** http(s) only; anything else drops the link. */
  url: string;
}

export interface RelloEmailButton extends RelloEmailLink {
  /** Small line under the button, e.g. "This button signs you in. It works once and expires in 24 hours." */
  note?: string | null;
}

export interface RelloEmailCardRow {
  label: string;
  value: string;
}

export interface RelloEmailSigner {
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

export interface RelloEmailFooter {
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

export interface RelloEmailInput {
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
  badge?: { label: string; tone?: RelloEmailBadgeTone } | null;
  /** Body paragraphs; a "\n" inside one becomes a line break. */
  paragraphs?: ReadonlyArray<string | null | undefined>;
  card?: { title?: string | null; rows: ReadonlyArray<RelloEmailCardRow> } | null;
  button?: RelloEmailButton | null;
  /** A text link beside the button. */
  secondaryLink?: RelloEmailLink | null;
  /** Writes the button's full URL under it ("Button not working? …"). Default true. */
  showLinkFallback?: boolean;
  signer?: RelloEmailSigner | null;
  footer?: RelloEmailFooter | null;
}

export interface RenderedRelloEmail {
  subject: string;
  preheader: string;
  html: string;
  text: string;
}

export const RELLO_EMAIL_DEFAULT_BRAND_COLOR = "#1a365d";
export const RELLO_EMAIL_ADMIN_COLOR = "#111827";
export const RELLO_EMAIL_LOGO_BASE_URL = "https://hellorello.app/email/logos";

/**
 * Display name for every platform slug. Typed as a full Record so a slug added
 * to @rello-platform/slugs fails this package's typecheck until it is named.
 */
export const RELLO_EMAIL_APP_NAMES: Readonly<Record<PlatformSlug, string>> = {
  arive: "ARIVE",
  rello: "Rello",
  "harvest-home": "Harvest Home",
  "home-ready": "Home Ready",
  "home-stretch": "The Home Stretch",
  "home-scout": "Home Scout",
  "market-intel": "Market Intel",
  "newsletter-studio": "Newsletter Studio",
  "the-oven": "The Oven",
  "the-drumbeat": "The Drumbeat",
  "open-house-hub": "Open House Hub",
  "pathfinder-pro": "PathfinderPro",
  "prequal-pro": "PreQual Pro",
  "milo-engine": "Milo",
  "content-engine": "Content Engine",
  "property-engine": "Property Engine",
  "journey-engine": "Journey",
  "report-engine": "Report Engine",
  "drumbeat-video-engine": "Drumbeat Video",
};

/**
 * Apps that have a hosted PNG logo (white on transparent, 192×192, served by
 * Rello from public/email/logos/<slug>.png). An app not listed renders its
 * name as text in the header.
 */
export const RELLO_EMAIL_LOGO_SLUGS: ReadonlySet<PlatformSlug> = new Set<PlatformSlug>([
  "rello",
  "home-ready",
  "home-stretch",
  "harvest-home",
  "market-intel",
  "newsletter-studio",
  "the-drumbeat",
  "prequal-pro",
]);

export function relloEmailLogoUrl(app: PlatformSlug): string | null {
  return RELLO_EMAIL_LOGO_SLUGS.has(app) ? `${RELLO_EMAIL_LOGO_BASE_URL}/${app}.png` : null;
}

const BADGE_COLORS: Record<RelloEmailBadgeTone, { bg: string; fg: string }> = {
  hot: { bg: "#fdecea", fg: "#b42318" },
  info: { bg: "#e8f0fb", fg: "#1d4ed8" },
  success: { bg: "#e7f6ec", fg: "#067647" },
  warning: { bg: "#fef4e6", fg: "#b54708" },
  neutral: { bg: "#f2f4f7", fg: "#344054" },
};

const FONT = "-apple-system,'Segoe UI',Helvetica,Arial,sans-serif";

export function escapeEmailHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** One line of text: trimmed, line breaks flattened, non-strings read as empty. */
function line(value: unknown): string {
  return typeof value === "string" ? value.replace(/[\r\n]+/g, " ").replace(/\s+/g, " ").trim() : "";
}

/** A block of text: trimmed, inner line breaks kept (normalised to \n). */
function block(value: unknown): string {
  return typeof value === "string" ? value.replace(/\r\n?/g, "\n").trim() : "";
}

/** The URL if it is an absolute http(s) URL, else null. */
export function safeEmailUrl(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const raw = value.trim();
  if (!raw) return null;
  try {
    const url = new URL(raw);
    return url.protocol === "https:" || url.protocol === "http:" ? raw : null;
  } catch {
    return null;
  }
}

function channel(hex: string, i: number): number {
  const c = parseInt(hex.slice(i, i + 2), 16) / 255;
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

/** WCAG contrast of white text on this #rrggbb color. */
function whiteContrast(hex: string): number {
  const l = 0.2126 * channel(hex, 1) + 0.7152 * channel(hex, 3) + 0.0722 * channel(hex, 5);
  return 1.05 / (l + 0.05);
}

/**
 * The header/button color. A valid #rrggbb that white text and the white logo
 * can sit on (contrast ≥ 3:1, WCAG large text) is used as given; anything else
 * falls back to the default navy. Admin mail is always #111827.
 */
export function resolveRelloEmailColor(audience: RelloEmailAudience, brandColor: unknown): string {
  if (audience === "admin") return RELLO_EMAIL_ADMIN_COLOR;
  if (typeof brandColor !== "string") return RELLO_EMAIL_DEFAULT_BRAND_COLOR;
  const hex = brandColor.trim().toLowerCase();
  if (!/^#[0-9a-f]{6}$/.test(hex)) return RELLO_EMAIL_DEFAULT_BRAND_COLOR;
  return whiteContrast(hex) >= 3 ? hex : RELLO_EMAIL_DEFAULT_BRAND_COLOR;
}

function initialsOf(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w.charAt(0).toUpperCase())
    .join("");
}

function appName(app: unknown): string {
  return typeof app === "string" && app in RELLO_EMAIL_APP_NAMES
    ? RELLO_EMAIL_APP_NAMES[app as PlatformSlug]
    : "Rello";
}

export function renderRelloEmail(input: RelloEmailInput): RenderedRelloEmail {
  const e = escapeEmailHtml;
  const audience: RelloEmailAudience =
    input.audience === "pro" || input.audience === "admin" ? input.audience : "consumer";
  const app = appName(input.app);
  const company = line(input.companyName);
  const color = resolveRelloEmailColor(audience, input.brandColor);
  // Option A: the app's own logo on consumer mail; Rello's on agent/LO and admin mail.
  const logoSlug: PlatformSlug =
    audience === "consumer" && typeof input.app === "string" && input.app in RELLO_EMAIL_APP_NAMES
      ? input.app
      : "rello";
  const logoUrl = relloEmailLogoUrl(logoSlug);
  const logoAlt = appName(logoSlug);

  const subject = line(input.subject);
  const preheader = line(input.preheader);
  const headline = line(input.headline);
  const detail = line(input.detail);
  const kicker =
    line(input.kicker) ||
    (audience === "admin"
      ? `${app} · Platform alert`
      : company
        ? audience === "consumer"
          ? `${app} · from ${company}`
          : `${app} · ${company}`
        : app);

  const badgeLabel = line(input.badge?.label);
  const badgeTone = BADGE_COLORS[input.badge?.tone ?? "neutral"] ?? BADGE_COLORS.neutral;
  const paragraphs = (input.paragraphs ?? []).map(block).filter(Boolean);
  const cardTitle = line(input.card?.title);
  const cardRows = (input.card?.rows ?? [])
    .map((r) => ({ label: line(r?.label), value: block(r?.value) }))
    .filter((r) => r.label && r.value);

  const buttonUrl = safeEmailUrl(input.button?.url);
  const buttonLabel = line(input.button?.label);
  const button = buttonUrl && buttonLabel ? { url: buttonUrl, label: buttonLabel, note: line(input.button?.note) } : null;
  const secondaryUrl = safeEmailUrl(input.secondaryLink?.url);
  const secondaryLabel = line(input.secondaryLink?.label);
  const secondary = secondaryUrl && secondaryLabel ? { url: secondaryUrl, label: secondaryLabel } : null;
  const showFallback = button !== null && input.showLinkFallback !== false;

  const signerName = line(input.signer?.name);
  const signer = signerName
    ? {
        name: signerName,
        title: line(input.signer?.title),
        nmls: line(input.signer?.nmls),
        phone: line(input.signer?.phone),
        initials: line(input.signer?.initials).slice(0, 3) || initialsOf(signerName),
        replyLine: line(input.signer?.replyLine),
      }
    : null;
  const signerMeta = signer ? [signer.title, signer.nmls ? `NMLS #${signer.nmls}` : ""].filter(Boolean).join(" · ") : "";

  const f = input.footer ?? {};
  const footerCompany = line(f.companyName);
  const footerNmls = line(f.companyNmls);
  const footerAddress = line(f.address);
  const footerReason =
    line(f.reason) || (audience === "admin" ? "Sent to platform admins only." : "");
  const prefUrl = safeEmailUrl(f.preferenceLink?.url);
  const prefLabel = line(f.preferenceLink?.label);
  const pref = prefUrl && prefLabel ? { url: prefUrl, label: prefLabel } : null;
  const footerLine1 = [footerCompany, footerNmls ? `Company NMLS #${footerNmls}` : ""].filter(Boolean).join(" · ");
  const footerLine2 = [footerAddress, f.equalHousing === true ? "Equal Housing Opportunity" : ""].filter(Boolean).join(" · ");

  // ── HTML ──────────────────────────────────────────────────────────────────
  const rows: string[] = [];

  rows.push(
    `<tr><td align="center" bgcolor="${color}" style="background:${color};padding:30px 32px 26px;color:#ffffff;border-radius:10px 10px 0 0;">` +
      (logoUrl
        ? `<img src="${e(logoUrl)}" width="96" height="96" alt="${e(logoAlt)}" style="display:block;margin:0 auto 12px;width:96px;height:96px;border:0;outline:none;text-decoration:none;">`
        : `<div style="font-size:22px;font-weight:700;color:#ffffff;margin:0 0 10px;">${e(logoAlt)}</div>`) +
      `<div style="font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:#ffffff;opacity:.85;">${e(kicker)}</div>` +
      (headline
        ? `<div style="font-size:25px;font-weight:700;margin-top:10px;line-height:1.25;color:#ffffff;">${e(headline)}</div>`
        : "") +
      `</td></tr>`,
  );

  if (badgeLabel || detail) {
    rows.push(
      `<tr><td style="padding:24px 32px 0;">` +
        (badgeLabel
          ? `<span style="display:inline-block;background:${badgeTone.bg};color:${badgeTone.fg};font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;padding:4px 10px;border-radius:999px;">${e(badgeLabel)}</span>`
          : "") +
        (detail
          ? `<div style="font-size:14px;color:#6b7280;margin-top:${badgeLabel ? "8px" : "0"};">${e(detail)}</div>`
          : "") +
        `</td></tr>`,
    );
  }

  if (paragraphs.length > 0) {
    rows.push(
      `<tr><td style="padding:24px 32px 4px;font-size:16px;line-height:1.6;color:#1f2937;">` +
        paragraphs
          .map(
            (p, i) =>
              `<p style="margin:0 0 ${i === paragraphs.length - 1 ? "0" : "12px"};">${e(p).replace(/\n/g, "<br>")}</p>`,
          )
          .join("") +
        `</td></tr>`,
    );
  }

  if (cardRows.length > 0) {
    rows.push(
      `<tr><td style="padding:18px 32px 4px;">` +
        `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3f6fa;border-radius:8px;font-size:14px;line-height:1.5;">` +
        (cardTitle
          ? `<tr><td colspan="2" style="padding:14px 18px 2px;font-weight:700;color:#111827;">${e(cardTitle)}</td></tr>`
          : "") +
        cardRows
          .map((r, i) => {
            const top = i === 0 ? (cardTitle ? "8px" : "14px") : "4px";
            const bottom = i === cardRows.length - 1 ? "14px" : "4px";
            return (
              `<tr><td valign="top" style="padding:${top} 18px ${bottom};color:#6b7280;width:130px;">${e(r.label)}</td>` +
              `<td valign="top" style="padding:${top} 18px ${bottom};color:#111827;">${e(r.value).replace(/\n/g, "<br>")}</td></tr>`
            );
          })
          .join("") +
        `</table></td></tr>`,
    );
  }

  if (button || secondary) {
    rows.push(
      `<tr><td align="center" style="padding:24px 32px 6px;">` +
        (button
          ? `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;"><tr>` +
            `<td align="center" bgcolor="${color}" style="background:${color};border-radius:8px;">` +
            `<a href="${e(button.url)}" style="display:inline-block;background:${color};color:#ffffff;text-decoration:none;font-weight:600;font-size:16px;line-height:20px;padding:14px 32px;border-radius:8px;">${e(button.label)}</a>` +
            `</td></tr></table>`
          : "") +
        (secondary
          ? `<div style="margin-top:${button ? "12px" : "0"};font-size:15px;"><a href="${e(secondary.url)}" style="color:${color};font-weight:600;text-decoration:none;">${e(secondary.label)}</a></div>`
          : "") +
        (button && button.note
          ? `<div style="font-size:13px;color:#6b7280;margin-top:10px;">${e(button.note)}</div>`
          : "") +
        `</td></tr>`,
    );
  }

  if (showFallback && button) {
    rows.push(
      `<tr><td style="padding:16px 32px 4px;font-size:13px;line-height:1.6;color:#4b5563;">` +
        `Button not working? Copy this link into your browser:<br>` +
        `<a href="${e(button.url)}" style="color:${color};word-break:break-all;">${e(button.url)}</a>` +
        `</td></tr>`,
    );
  }

  if (signer) {
    rows.push(
      `<tr><td style="padding:20px 32px 22px;font-size:15px;line-height:1.6;color:#1f2937;">` +
        (signer.replyLine ? `<p style="margin:0 0 12px;">${e(signer.replyLine)}</p>` : "") +
        `<table role="presentation" cellpadding="0" cellspacing="0"><tr>` +
        `<td width="52" valign="top"><div style="width:40px;height:40px;border-radius:20px;background:#dbe4f0;text-align:center;line-height:40px;font-size:14px;font-weight:700;color:${color};">${e(signer.initials)}</div></td>` +
        `<td valign="top" style="font-size:14px;line-height:1.5;"><b>${e(signer.name)}</b>` +
        (signerMeta ? `<br><span style="color:#4b5563;">${e(signerMeta)}</span>` : "") +
        (signer.phone ? `<br><span style="color:#4b5563;">${e(signer.phone)}</span>` : "") +
        `</td></tr></table></td></tr>`,
    );
  }

  const footerParts = [
    footerLine1 ? e(footerLine1) : "",
    footerLine2 ? e(footerLine2) : "",
    footerReason ? e(footerReason) : "",
    pref ? `<a href="${e(pref.url)}" style="color:#6b7280;">${e(pref.label)}</a>` : "",
  ].filter(Boolean);
  if (footerParts.length > 0) {
    rows.push(
      `<tr><td style="border-top:1px solid #e5e7eb;padding:16px 32px;text-align:center;font-size:12px;color:#6b7280;line-height:1.6;">` +
        footerParts.join("<br>") +
        `</td></tr>`,
    );
  }

  const html =
    `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8">` +
    `<meta name="viewport" content="width=device-width,initial-scale=1">` +
    `<meta name="x-apple-disable-message-reformatting">` +
    `<title>${e(subject)}</title></head>` +
    `<body style="margin:0;padding:24px 12px;background:#eef1f5;font-family:${FONT};color:#1f2937;">` +
    (preheader
      ? `<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;font-size:1px;line-height:1px;color:#eef1f5;opacity:0;">${e(preheader)}</div>`
      : "") +
    `<!--[if mso]><table role="presentation" width="600" align="center" cellpadding="0" cellspacing="0"><tr><td><![endif]-->` +
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:10px;font-family:${FONT};">` +
    rows.join("") +
    `</table>` +
    `<!--[if mso]></td></tr></table><![endif]-->` +
    `</body></html>`;

  // ── Plain text: the same words, full links ────────────────────────────────
  const t: string[] = [];
  const push = (...ls: string[]) => t.push(...ls);
  push(kicker);
  if (headline) push("", headline);
  if (badgeLabel || detail) push("", ...[badgeLabel, detail].filter(Boolean));
  for (const p of paragraphs) push("", p);
  if (cardRows.length > 0) {
    push("");
    if (cardTitle) push(cardTitle);
    for (const r of cardRows) push(`${r.label}: ${r.value.replace(/\n/g, ", ")}`);
  }
  if (button) {
    push("", `${button.label}:`, button.url);
    if (button.note) push(button.note);
  }
  if (secondary) push("", `${secondary.label}: ${secondary.url}`);
  if (signer) {
    push("");
    if (signer.replyLine) push(signer.replyLine, "");
    push(signer.name);
    if (signerMeta) push(signerMeta);
    if (signer.phone) push(signer.phone);
  }
  const footerText = [footerLine1, footerLine2, footerReason, pref ? `${pref.label}: ${pref.url}` : ""].filter(Boolean);
  if (footerText.length > 0) push("", "—", ...footerText);
  const text = t
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  return { subject, preheader, html, text: `${text}\n` };
}
