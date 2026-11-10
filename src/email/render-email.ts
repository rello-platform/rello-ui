/**
 * The shared Rello-family transactional email shell (Kelly's pick 2026-10-28,
 * "option A": the app logo, big and centered on the brand color, the kicker
 * "<App> · from <Company>", the headline, then body, one button, signer and
 * footer). One layout, three audiences:
 *
 *   consumer — leads and clients: the sending app's colors, the app's logo,
 *              the LO signer, the lender footer. Since v2.40.0 the kicker is
 *              "From <Company>" (never Rello by default) and the footer ends
 *              with a small "Powered by Rello" line (`footer.poweredBy`).
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

import type { PlatformSlug } from "@rello-platform/slugs";
import appOverrides from "../../tokens/app-overrides.json";

export type RelloEmailAudience = "consumer" | "pro" | "admin";

/**
 * @deprecated Accepted and ignored: every badge uses the sending app's accent
 * (Kelly 2026-10-29). The badge label carries the meaning.
 */
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
  /**
   * Consumer mail only: the small "Powered by Rello" line (linked to
   * hellorello.app) that closes the footer. Default on; `false` leaves it
   * out, any other value keeps it. Pro and admin mail never carry it.
   */
  poweredBy?: boolean;
}

/**
 * The sender's own brand (the agent's or tenant's), for consumer and pro mail
 * sent on their behalf: the reader hears from that agent or business, not from
 * the app behind the email. Admin mail ignores it.
 */
export interface RelloEmailBrand {
  /** Header text when there is no usable logo, and the logo's alt text. Empty: the header names nobody. */
  name: string;
  /** Drawn only when a clean https URL whose path ends .png, .jpg, .jpeg or .gif; else the name is the header text. */
  logoUrl?: string | null;
  /** Header band and button color when a #rgb/#rrggbb hex, darkened as needed; else the neutral default. */
  primary?: string | null;
}

/** One level's brand facts as an app stores them, before the rule picks a level. */
export interface RelloEmailBrandLevelInput {
  name?: string | null;
  logoUrl?: string | null;
  primary?: string | null;
}

/** The brand the rule picked, and which level it came from. */
export interface ResolvedRelloEmailBrand extends RelloEmailBrand {
  logoUrl: string | null;
  primary: string | null;
  level: "agent" | "tenant";
}

export interface RelloEmailInput {
  audience: RelloEmailAudience;
  /**
   * The app the email comes from. Decides the app name, the colors (from
   * tokens/app-overrides.json; admin mail always uses Rello's) and, for
   * consumer and pro mail, the logo.
   */
  app: PlatformSlug;
  /**
   * The sender company (tenant). Consumer mail's default kicker is
   * "From <company>"; pro mail's is "<app> · <company>". Omitted when empty.
   */
  companyName?: string | null;
  subject: string;
  /** Inbox preview text. */
  preheader?: string | null;
  /**
   * Overrides the default kicker line in the header. Defaults: admin
   * "<app> · Platform alert"; pro "<app> · <company>", else "<app>"; consumer
   * "From <company>", else under a brand "From <brand name>" (no kicker when
   * it has no name), else the app's name. Under a brand, pro mail's <app> is "Rello".
   */
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
  /** More text links, after `secondaryLink`, for an email with more than two choices. */
  moreLinks?: ReadonlyArray<RelloEmailLink> | null;
  /** Writes the button's full URL under it ("Button not working? …"). Default true. */
  showLinkFallback?: boolean;
  signer?: RelloEmailSigner | null;
  footer?: RelloEmailFooter | null;
  /**
   * Consumer and pro mail: the sender's brand replaces the app's logo, name and
   * colors, so neither the app's name, logo nor color appears anywhere in the
   * email. Admin mail ignores it. Absent (or null), pro and admin mail are
   * exactly what they were at v2.33.0; consumer mail is too apart from the
   * v2.40.0 kicker and "Powered by Rello" footer line.
   */
  brand?: RelloEmailBrand | null;
}

export interface RenderedRelloEmail {
  subject: string;
  preheader: string;
  html: string;
  text: string;
}

export const RELLO_EMAIL_LOGO_BASE_URL = "https://hellorello.app/email/logos";

/** Where consumer mail's "Powered by Rello" footer line links (v2.40.0). */
export const RELLO_EMAIL_POWERED_BY_URL = "https://hellorello.app";

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

const FONT = "-apple-system,'Segoe UI',Helvetica,Arial,sans-serif";

export function escapeEmailHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * A very long unbroken run (a URL, an id, a pasted blob) cannot wrap, so an
 * auto-layout table grows to hold it and the whole email goes sideways. This
 * gives such a run somewhere to break and touches nothing else (TE-1043).
 *
 * A run (see RUN_SEPARATORS) of LONG_RUN or more user-perceived characters
 * gets a `<wbr>` between chunks of CHUNK of them. `<wbr>` is an element, not a
 * character: no text is added, a copy of the visible text equals the input, and
 * a run under the threshold renders exactly as `escapeEmailHtml` renders it.
 * A run holding a character from SELF_BREAKING_SCRIPTS is left whole (TE-1060):
 * a browser already breaks that text, at its own word boundaries.
 *
 * The split is on raw text, one chunk at a time, and each chunk is escaped on
 * its own, so a boundary can never fall inside an entity such as `&amp;`. The
 * split is on Intl.Segmenter graphemes, so an emoji, a flag or a family emoji
 * is never cut. Where Intl.Segmenter does not exist the text is escaped and left
 * whole (no `<wbr>`, as before this helper): a code-point split could cut a
 * joined emoji, and an unbroken run is the safer failure than a broken glyph.
 * Used only for text inside elements, never inside an attribute or a URL.
 */
const LONG_RUN = 40;
const CHUNK = 10;

interface GraphemeSegmenter {
  segment(input: string): Iterable<{ segment: string }>;
}

const graphemeSegmenter: GraphemeSegmenter | null = (() => {
  try {
    const ctor = (Intl as unknown as { Segmenter?: new (locale?: string, options?: { granularity: string }) => GraphemeSegmenter })
      .Segmenter;
    return typeof ctor === "function" ? new ctor(undefined, { granularity: "grapheme" }) : null;
  } catch {
    return null;
  }
})();

/**
 * The characters a run ends at: every space or line break a browser can already
 * wrap a line at (TE-1052). A sentence spaced with U+2003 is ordinary prose, not
 * one 40-character run, and a `<wbr>` inside "communications" would break the
 * word on a phone. Measured in headless Chromium (a 20-character word on each
 * side of the candidate in a 120 px box): a line wraps at all of these.
 *
 *   U+0009 tab, U+000A, U+000D, U+0020 space, U+0085 NEL (Unicode line-break
 *   classes BA/LF/CR/SP/NL), U+1680 Ogham space, U+2000-U+2006 and
 *   U+2008-U+200A (en, em ... hair spaces, class BA), U+200B zero-width space
 *   (ZW), U+2028 / U+2029 line and paragraph separators, U+205F medium
 *   mathematical space, U+3000 ideographic space.
 *
 * NOT separators, because Chromium cannot wrap at them either, so each belongs
 * to the run it holds together: U+00A0 no-break space, U+2007 figure space and
 * U+202F narrow no-break space (class GL), U+2060 word joiner and U+FEFF (WJ),
 * U+200C / U+200D (joiners), U+180E, and U+000B / U+000C. UAX #14 calls those
 * last two mandatory breaks, but Chromium does not wrap at either. An engine
 * that does wrap at one of them loses nothing: the run is still chunked, so it
 * gets an extra break point at each chunk boundary, as well as the one the
 * engine already had.
 *
 * The measurement was Chromium only, with Latin words around each character.
 * It says which characters end a run of Latin-script words; it does not say
 * where a browser breaks text with no spaces at all (see SELF_BREAKING_SCRIPTS).
 */
const RUN_SEPARATORS = /([\t\n\r \u0085\u1680\u2000-\u2006\u2008-\u200b\u2028\u2029\u205f\u3000]+)/;

/**
 * Scripts whose text a browser breaks by itself with no help from us (TE-1060).
 * Thai, Lao, Khmer and Myanmar are written without spaces between words, and
 * the browser finds the word boundaries from a dictionary; Han, Hiragana and
 * Katakana break between nearly any two characters, and Hangul between syllables
 * (measured in headless Chromium: a 200 px box, 44 to 121 spaceless characters of
 * each, no `<wbr>`: every one wraps onto 4 to 6 lines and none overflows). A
 * `<wbr>` every 10 characters there would cut words the browser keeps whole
 * (Thai "ข้อมูล" became "ข้" / "อมูล"), so a run holding any of these characters
 * is left exactly as it was before this helper existed. The test is the script
 * of the characters, not word segmentation: `Intl.Segmenter` treats a comma as a
 * word break and a browser does not.
 *
 * The test is per run, not per email: a long URL beside Thai text with a space
 * between them is its own run and still gets its `<wbr>`; one pasted straight
 * against Thai text with no space is one run and stays whole, as at v2.35.0
 * (accepted: never worse than before). Needs Unicode property escapes (ES2018).
 */
const SELF_BREAKING_SCRIPTS =
  /[\p{Script=Thai}\p{Script=Lao}\p{Script=Khmer}\p{Script=Myanmar}\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]/u;

/**
 * Web addresses stay whole (TE-1189). A mail client that auto-links a bare
 * address reads the text between elements, so a `<wbr>` inside one makes it
 * link a fragment: Gmail web linked only "nance.gov/" out of
 * "consumerfi<wbr>nance.gov/…" and only "https://ww" out of an https address
 * (KA read of three real sends, 2026-11-07). In a run the chunking below would
 * have cut, each address is emitted whole, escaped as one piece, and the whole
 * run (address and any text glued to it) goes inside one span carrying
 * WRAP_STYLE, so a phone can still break it where it must. Whole or nothing
 * (TE-1262): a span never covers part of a run and leaves the rest outside.
 *
 * What counts as an address (ADDRESS, then trimAddress). Every form must start
 * at the beginning of its run or right after a character that is not a letter,
 * a mark or a digit in any script, nor one of `. _ % + @ / \ -` (after one of
 * those it is the inside of something longer: "Visithttps://…", a Windows path,
 * a host inside a path). This is checked in code, not with a lookbehind, which
 * older engines reject at load time. The forms:
 *   - `http://` or `https://` (any case) followed by a letter or digit in any
 *     script, then every character up to whitespace, `<`, `>`, `"` or a control
 *     character: Unicode letters, marks and numbers included, so an IDN host
 *     (`https://bücher.de/…`) or path stays one piece (TE-1261);
 *   - `www.` followed the same way;
 *   - an email address: `local@` plus a host as below;
 *   - a bare host with no scheme, with or without a `:port` or `/path`: two or
 *     more dotted labels (letters, marks, digits and inner hyphens, any script)
 *     whose last label is 2-63 letters in any script, or a punycode `xn--`
 *     label (TE-1260: `….realestate/…`, `….xyz/…`, `xn--bcher-kva.de/…`).
 *     "Last" means last: the host takes in every `.label` that follows before
 *     its ending is judged, so `a.b.c.123` and `a.b.c.ref2026` are not
 *     addresses at all (TE-1262), and a full stop then a space, `/` or the end
 *     of the run still ends a host.
 * Trailing `. , ; : ! ? ' " *`, any opening or closing quotation mark, any
 * non-ASCII full stop, comma or closing bracket, and a closing `)`, `]` or `}`
 * with no opener inside the address are left out of it and stay exactly where
 * the caller wrote them, outside the span. A match followed by a combining mark
 * or a joiner is not an address (the span would cut a grapheme).
 *
 * Not addresses, so they keep TE-1043's `<wbr>` exactly as before: a run with
 * no dot (`tel:+1801…`), a dotted run whose last label is numeric or mixes
 * letters and digits (`v2.37.0`, `10.0.0.1`, `ref-2026.07a`), letters glued
 * onto a scheme, a Windows path, and `ftp:` or other schemes followed by a host
 * (the host follows a `/`). A long dotted file name (`…-final-version.pdf`)
 * does count, the accepted cost of rule 2: it is kept whole in the span.
 */
const HOST_LABEL = "[\\p{L}\\p{N}](?:[\\p{L}\\p{M}\\p{N}-]{0,61}[\\p{L}\\p{M}\\p{N}])?";
// The host ends only where no further ".label" follows (TE-1262): it takes in every dotted label before its
// ending is judged, so a.b.c.123 is not cut back to a.b.c. A full stop followed by anything but a label
// character (a sentence end, "/", the end of the run) still ends it.
const HOST_END = "(?:xn--[a-z0-9-]{1,59}|\\p{L}[\\p{L}\\p{M}]{1,62})(?![\\p{L}\\p{M}\\p{N}-]|\\.[\\p{L}\\p{M}\\p{N}])";
const RUN_ON = '[^\\s<>"\\p{Cc}]';
const HOST_TAIL = "(?::\\d{1,5})?(?:[/?#]" + RUN_ON + "*)?";
const ADDRESS = new RegExp(
  [
    "https?://[\\p{L}\\p{N}]" + RUN_ON + "*",
    "www\\.[\\p{L}\\p{N}]" + RUN_ON + "*",
    "[a-z0-9._%+-]+@(?:" + HOST_LABEL + "\\.)+" + HOST_END,
    "(?:" + HOST_LABEL + "\\.)+" + HOST_END + HOST_TAIL,
  ].join("|"),
  "giu",
);
/** A character an address cannot follow directly (it would be inside something else). */
const ADDRESS_BEFORE = /[\p{L}\p{M}\p{N}._%+@/\\-]/u;
/** A character that would join the address's last character into one grapheme. */
const GRAPHEME_EXTEND = /^[\p{M}\p{Join_Control}]/u;
/** Trailing characters that end a sentence or close a quote rather than belong to an address. */
const TRAILING_PUNCTUATION = /^(?:[.,;:!?'"*]|[\p{Pi}\p{Pf}]|(?![ -~])[\p{Po}\p{Pe}])$/u;

/** The CSS that lets a whole address (or a long name) break only where a line must. */
const WRAP_STYLE = "overflow-wrap:anywhere;word-break:break-word;";

function trimAddress(match: string): string {
  let out = match;
  for (;;) {
    const last = out.charAt(out.length - 1);
    if (TRAILING_PUNCTUATION.test(last)) {
      out = out.slice(0, -1);
      continue;
    }
    const pair = last === ")" ? "(" : last === "]" ? "[" : last === "}" ? "{" : "";
    if (pair && out.split(pair).length < out.split(last).length) {
      out = out.slice(0, -1);
      continue;
    }
    return out;
  }
}

/** The addresses in one run, as [start, end) offsets, in order. */
function findAddresses(run: string): Array<[number, number]> {
  const found: Array<[number, number]> = [];
  for (const m of run.matchAll(ADDRESS)) {
    const start = m.index ?? 0;
    if (start > 0 && ADDRESS_BEFORE.test(run.charAt(start - 1))) continue;
    const text = trimAddress(m[0]);
    if (/^https?:\/\/$/i.test(text) || text.length === 0) continue;
    const end = start + text.length;
    if (GRAPHEME_EXTEND.test(run.slice(end))) continue;
    found.push([start, end]);
  }
  return found;
}

/** TE-1043's chunking for one piece of a run: a `<wbr>` between every CHUNK graphemes of a long piece. */
function chunkRun(part: string): string {
  if (part.length < LONG_RUN || !graphemeSegmenter) return escapeEmailHtml(part);
  const graphemes = Array.from(graphemeSegmenter.segment(part), (g) => g.segment);
  if (graphemes.length < LONG_RUN) return escapeEmailHtml(part);
  const chunks: string[] = [];
  for (let at = 0; at < graphemes.length; at += CHUNK) {
    chunks.push(escapeEmailHtml(graphemes.slice(at, at + CHUNK).join("")));
  }
  return chunks.join("<wbr>");
}

function escapeEmailHtmlBreakable(value: string): string {
  return value
    .split(RUN_SEPARATORS)
    .map((part, i) => {
      // Odd parts are the separators the split kept; a part shorter than the
      // threshold in UTF-16 units has fewer graphemes than that, too.
      if (i % 2 === 1 || part.length < LONG_RUN || !graphemeSegmenter) return escapeEmailHtml(part);
      if (SELF_BREAKING_SCRIPTS.test(part)) return escapeEmailHtml(part);
      const chunked = chunkRun(part);
      // A run TE-1043 leaves alone, or one with no address, renders exactly as at v2.37.0.
      if (!chunked.includes("<wbr>")) return chunked;
      const addresses = findAddresses(part);
      if (addresses.length === 0) return chunked;
      // Whole or nothing (TE-1262): one span covers the entire run, so no part of a 40+ run is left
      // outside it unbroken. Each address inside is one escaped piece with no <wbr>; the text around
      // it is chunked as TE-1043 chunks it when that piece is itself 40+ graphemes, else left as is.
      let out = "";
      let at = 0;
      for (const [start, end] of addresses) {
        out += chunkRun(part.slice(at, start)) + escapeEmailHtml(part.slice(start, end));
        at = end;
      }
      return `<span style="${WRAP_STYLE}">${out}${chunkRun(part.slice(at))}</span>`;
    })
    .join("");
}

/**
 * The signer's name sits in a nested table cell beside the avatar, so an
 * unbroken name grows that table past a phone screen (TE-1187). Measured in
 * headless Chromium on v2.37.0: an unbroken name of 16 "W" overflows a 320 px
 * screen and 20 overflow 375 px. A name holding a piece of SIGNER_NAME_RUN or
 * more graphemes goes in a span with WRAP_STYLE, which breaks it only where the
 * line must. A piece ends where a run ends (RUN_SEPARATORS) and after a hyphen,
 * where a browser can already break, and counts that hyphen. Every other name
 * renders exactly as before.
 */
const SIGNER_NAME_RUN = 16;

function escapeSignerName(name: string): string {
  const html = escapeEmailHtmlBreakable(name);
  const longRun = name.split(RUN_SEPARATORS).some((part, i) => {
    if (i % 2 === 1) return false;
    // A browser can break after a hyphen, so "Montgomery-Smythe" is two short pieces.
    return (part.match(/[^-]*-|[^-]+/g) ?? []).some((piece) => {
      if (piece.length < SIGNER_NAME_RUN) return false;
      if (!graphemeSegmenter) return true;
      return Array.from(graphemeSegmenter.segment(piece)).length >= SIGNER_NAME_RUN;
    });
  });
  return longRun ? `<span style="${WRAP_STYLE}">${html}</span>` : html;
}

/** One line of text: trimmed, line breaks flattened, non-strings read as empty. */
function line(value: unknown): string {
  return typeof value === "string" ? value.replace(/[\r\n]+/g, " ").replace(/\s+/g, " ").trim() : "";
}

/** A block of text: trimmed, inner line breaks kept (normalised to \n). */
function block(value: unknown): string {
  return typeof value === "string" ? value.replace(/\r\n?/g, "\n").trim() : "";
}

/** Whitespace, C0/C1 controls and the Unicode line/paragraph separators. */
const URL_FORBIDDEN_CHARS = /[\s\u0000-\u001f\u007f-\u009f\u2028\u2029]/;

/**
 * The URL if it is an absolute http(s) URL, else null. A URL with whitespace,
 * a control character or a line separator inside it is refused: the URL parser
 * would quietly strip those, but the returned string is written as-is into the
 * plain-text part, where a line break would start a second, fake link line.
 */
export function safeEmailUrl(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const raw = value.trim();
  if (!raw || URL_FORBIDDEN_CHARS.test(raw)) return null;
  try {
    const url = new URL(raw);
    return url.protocol === "https:" || url.protocol === "http:" ? raw : null;
  } catch {
    return null;
  }
}

/**
 * tokens/app-overrides.json keys that are not the platform slug. Every other
 * slug reads the block under its own name; a slug with no block (the-oven,
 * the engines, …) reads `defaults`. The JSON's "conversations" block
 * is a Rello module, not a platform slug, so no email reads it.
 */
export const RELLO_EMAIL_TOKEN_KEY_FOR_SLUG: Readonly<Partial<Record<PlatformSlug, string>>> = {
  "home-stretch": "the-homestretch",
  "home-scout": "the-home-scout",
};

/** The colors one email is drawn with. All lowercase #rrggbb. */
export interface RelloEmailPalette {
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

type TokenField = "primary" | "accent" | "secondaryText" | "rowBackground" | "cardBorder";

/**
 * Only reached if tokens/app-overrides.json `defaults` itself holds a
 * malformed value, which a test refuses. A neutral slate, deliberately no
 * app's color, ≥ 4.5:1 against white both ways.
 */
const MALFORMED_TOKEN_FALLBACK = "#475569";

/** Card title and values; the card background must keep ≥ 7:1 with it. */
const CARD_VALUE_TEXT = "#111827";

const WHITE = "#ffffff";

function validHex(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const hex = value.trim().toLowerCase();
  return /^#[0-9a-f]{6}$/.test(hex) ? hex : null;
}

/** A brand color: #rrggbb, or #rgb expanded to it; anything else null. */
function brandHex(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const hex = value.trim().toLowerCase();
  if (/^#[0-9a-f]{3}$/.test(hex)) return `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`;
  return validHex(hex);
}

/**
 * A brand logo the header may draw: an https URL with no whitespace, control
 * characters or credentials, whose path ends .png, .jpg, .jpeg or .gif (the
 * formats every mail client shows; SVG and WebP are not). Else null.
 */
function brandLogoUrl(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const raw = value.trim();
  if (!raw || URL_FORBIDDEN_CHARS.test(raw)) return null;
  try {
    const url = new URL(raw);
    if (url.protocol !== "https:" || url.username || url.password) return null;
    return /\.(png|jpe?g|gif)$/i.test(url.pathname) ? raw : null;
  } catch {
    return null;
  }
}

/** apps.<key>.<field>, else defaults.<field>. Read on every call, never cached. */
function tokenColor(key: string, field: TokenField): string {
  const tokens = appOverrides as unknown as { defaults?: unknown; apps?: unknown };
  const apps = tokens.apps && typeof tokens.apps === "object" ? (tokens.apps as Record<string, unknown>) : {};
  const block = hasOwn(apps, key) ? apps[key] : null;
  const fromApp =
    block && typeof block === "object" && hasOwn(block as Record<string, unknown>, field)
      ? validHex((block as Record<string, unknown>)[field])
      : null;
  if (fromApp) return fromApp;
  const defaults = tokens.defaults && typeof tokens.defaults === "object" ? (tokens.defaults as Record<string, unknown>) : {};
  return (hasOwn(defaults, field) ? validHex(defaults[field]) : null) ?? MALFORMED_TOKEN_FALLBACK;
}

function channel(hex: string, i: number): number {
  const c = parseInt(hex.slice(i, i + 2), 16) / 255;
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

function luminance(hex: string): number {
  return 0.2126 * channel(hex, 1) + 0.7152 * channel(hex, 3) + 0.0722 * channel(hex, 5);
}

/** WCAG contrast ratio of two #rrggbb colors. */
export function relloEmailContrast(a: string, b: string): number {
  const la = luminance(a);
  const lb = luminance(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

/** `hex` moved the fraction `t` (0–1) of the way to `toward`. */
function mix(hex: string, toward: string, t: number): string {
  let out = "#";
  for (const i of [1, 3, 5]) {
    const a = parseInt(hex.slice(i, i + 2), 16);
    const b = parseInt(toward.slice(i, i + 2), 16);
    out += Math.round(a + (b - a) * t).toString(16).padStart(2, "0");
  }
  return out;
}

/** `color` as given if it reaches `min` against every color in `against`, else darkened toward black in 2% steps until it does. */
function darkenUntil(color: string, against: readonly string[], min: number): string {
  for (let step = 0; step <= 50; step++) {
    const c = step === 0 ? color : mix(color, "#000000", step / 50);
    if (against.every((bg) => relloEmailContrast(c, bg) >= min)) return c;
  }
  return "#000000";
}

/**
 * The colors for one email: the sending app's tokens (admin mail and an
 * unknown app: Rello's), each text color held to its contrast floor.
 */
export function resolveRelloEmailPalette(audience: RelloEmailAudience, app: unknown): RelloEmailPalette {
  const slug: PlatformSlug = audience !== "admin" && isKnownApp(app) ? app : "rello";
  const key = RELLO_EMAIL_TOKEN_KEY_FOR_SLUG[slug] ?? slug;
  const primaryToken = tokenColor(key, "primary");
  const accent = tokenColor(key, "accent");
  const rowBackground = tokenColor(key, "rowBackground");
  const cardBackground = relloEmailContrast(CARD_VALUE_TEXT, rowBackground) >= 7 ? rowBackground : WHITE;
  const primary = darkenUntil(primaryToken, [WHITE], 3);
  const badgeBackground = mix(accent, WHITE, 0.82);
  const avatarBackground = mix(primary, WHITE, 0.85);
  return {
    primary,
    link: darkenUntil(primaryToken, [WHITE], 4.5),
    badgeBackground,
    badgeText: darkenUntil(accent, [badgeBackground], 4.5),
    secondaryText: darkenUntil(tokenColor(key, "secondaryText"), [WHITE, cardBackground], 4.5),
    cardBackground,
    cardBorder: tokenColor(key, "cardBorder"),
    avatarBackground,
    avatarText: darkenUntil(primary, [avatarBackground], 4.5),
  };
}

/**
 * The neutral default with the brand color in place of `primary`: header band,
 * button, links and the signer's initials. Starting from the neutral default,
 * never the sending app's palette, is what keeps the app's color out of a
 * branded email. A missing or malformed brand color leaves the default as it is.
 */
function brandPalette(audience: RelloEmailAudience, primary: unknown): RelloEmailPalette {
  const neutral = resolveRelloEmailPalette(audience, "rello");
  const hex = brandHex(primary);
  if (!hex) return neutral;
  const band = darkenUntil(hex, [WHITE], 3);
  const avatarBackground = mix(band, WHITE, 0.85);
  return {
    ...neutral,
    primary: band,
    link: darkenUntil(hex, [WHITE], 4.5),
    avatarBackground,
    avatarText: darkenUntil(band, [avatarBackground], 4.5),
  };
}

function brandFact(value: unknown): string {
  return typeof value === "string" ? value.replace(/\s+/g, " ").trim() : "";
}

function nameWords(name: string): string[] {
  return name.toLowerCase().split(/[^\p{L}\p{N}]+/u).filter(Boolean);
}

/**
 * The same business under two spellings: one name's words are the leading words
 * of the other, so "ClearPath Utah" is "ClearPath Utah Mortgage" and "Sansom
 * Mortgage, LLC" is "Sansom Mortgage", while "Sansom Realty" is not.
 */
function sameBusiness(a: string, b: string): boolean {
  const [x, y] = [nameWords(a), nameWords(b)];
  const [short, long] = x.length <= y.length ? [x, y] : [y, x];
  return short.length > 0 && short.every((word, i) => word === long[i]);
}

/**
 * THE BRAND RULE, one rule for every app (KA amended 121, 2026-10-30). The
 * agent level wins as a whole: an agent with their own business uses its name,
 * logo and color, and a missing one stays missing, so an RE agent inside an MLO
 * tenant never carries the MLO's logo or color. Otherwise the tenant level. An
 * agent whose business is the tenant's is the tenant level. An own logo with no
 * business name is named by the agent. Nothing is gated: a missing fact is left
 * out and the shell shows the name as text, or the neutral default color.
 */
export function resolveRelloEmailBrand(args: {
  /** The agent's own name: the last resort for the brand's name. */
  agentName?: string | null;
  /** The agent's business. */
  business?: RelloEmailBrandLevelInput | null;
  tenant?: RelloEmailBrandLevelInput | null;
}): ResolvedRelloEmailBrand {
  const agentName = brandFact(args.agentName);
  const businessName = brandFact(args.business?.name);
  const businessLogo = brandFact(args.business?.logoUrl);
  const tenantName = brandFact(args.tenant?.name);
  const tenantLogo = brandFact(args.tenant?.logoUrl);
  const ownName = businessName !== "" && !sameBusiness(businessName, tenantName);
  const ownLogo = businessName === "" && businessLogo !== "" && businessLogo !== tenantLogo;
  if (ownName || ownLogo) {
    return {
      name: businessName || agentName,
      logoUrl: businessLogo || null,
      primary: brandFact(args.business?.primary) || null,
      level: "agent",
    };
  }
  return {
    name: tenantName || agentName,
    logoUrl: tenantLogo || null,
    primary: brandFact(args.tenant?.primary) || null,
    level: "tenant",
  };
}

function initialsOf(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w.charAt(0).toUpperCase())
    .join("");
}

/** Own keys only, so "constructor" or "__proto__" read as unknown, not as Object.prototype. */
function hasOwn<T extends object>(map: T, key: unknown): key is keyof T {
  return typeof key === "string" && Object.prototype.hasOwnProperty.call(map, key);
}

function isKnownApp(app: unknown): app is PlatformSlug {
  return hasOwn(RELLO_EMAIL_APP_NAMES, app);
}

function appName(app: unknown): string {
  return isKnownApp(app) ? RELLO_EMAIL_APP_NAMES[app] : "Rello";
}

export function renderRelloEmail(input: RelloEmailInput): RenderedRelloEmail {
  const e = escapeEmailHtml;
  // For text slots only: breaks a very long unbroken run (see escapeEmailHtmlBreakable).
  const ew = escapeEmailHtmlBreakable;
  const audience: RelloEmailAudience =
    input.audience === "pro" || input.audience === "admin" ? input.audience : "consumer";
  // The sender's brand, on consumer and pro mail. Null keeps every byte of v2.33.0.
  const brand = audience !== "admin" && input.brand && typeof input.brand === "object" ? input.brand : null;
  // Under a brand the app is never named; "Rello" is the platform's word in pro mail's default kicker.
  const app = brand ? "Rello" : appName(input.app);
  const company = line(input.companyName);
  const pal = brand ? brandPalette(audience, brand.primary) : resolveRelloEmailPalette(audience, input.app);
  const color = pal.primary;
  // The sending app's own logo on consumer and pro mail; Rello's on admin mail.
  // Under a brand: the brand's logo, else its name, else nothing.
  const logoSlug: PlatformSlug =
    audience !== "admin" && isKnownApp(input.app)
      ? input.app
      : "rello";
  const logoUrl = brand ? brandLogoUrl(brand.logoUrl) : relloEmailLogoUrl(logoSlug);
  const logoAlt = brand ? line(brand.name) : appName(logoSlug);
  // The TEXT part's name line only (the HTML keeps logoAlt exactly as before): the brand name with every
  // C0/C1 control removed after line()'s flattening (NUL, NEL and the rest can read as line breaks or
  // vanish in a client), then whitespace collapsed and trimmed. Nothing left = no name line.
  // eslint-disable-next-line no-control-regex
  const textName = brand ? line(brand.name).replace(/[\u0000-\u001f\u007f-\u009f]/g, "").replace(/\s+/g, " ").trim() : "";

  const subject = line(input.subject);
  const preheader = line(input.preheader);
  const headline = line(input.headline);
  const detail = line(input.detail);
  // v2.40.0 (Kelly 2026-11-10: "yes it should be branded for the MLO sending it but the footer could
  // mention rello as a small marketing piece"): consumer mail's default kicker names the sender, never
  // Rello. "From <company>"; with no company, under a brand, "From <brand>" (KA ruling a1-664; textName:
  // controls removed), and a nameless brand gets no kicker; with no brand, the app's name as before.
  // Pro and admin defaults are unchanged.
  const kicker =
    line(input.kicker) ||
    (audience === "admin"
      ? `${app} · Platform alert`
      : audience === "consumer"
        ? company
          ? `From ${company}`
          : brand
            ? textName && `From ${textName}`
            : app
        : company
          ? `${app} · ${company}`
          : app);

  const badgeLabel = line(input.badge?.label);
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
  const moreLinks = (input.moreLinks ?? [])
    .map((l) => ({ url: safeEmailUrl(l?.url), label: line(l?.label) }))
    .filter((l): l is { url: string; label: string } => l.url !== null && l.label !== "");
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
  // v2.40.0: consumer mail closes its footer with a small "Powered by Rello" line, unless the caller
  // passes footer.poweredBy === false. Pro and admin mail never carry it.
  const poweredByUrl = audience === "consumer" && f.poweredBy !== false ? safeEmailUrl(RELLO_EMAIL_POWERED_BY_URL) : null;

  // ── HTML ──────────────────────────────────────────────────────────────────
  const rows: string[] = [];

  rows.push(
    `<tr><td align="center" bgcolor="${color}" style="background:${color};padding:30px 32px 26px;color:#ffffff;border-radius:10px 10px 0 0;">` +
      (brand
        ? logoUrl
          ? // A brand logo's shape is unknown: a width attribute only (no height), so
            // Outlook scales it in proportion; the style caps it at 200×64 elsewhere.
            // A distorted logo is worse than a large one (KA ruling, prompt 110).
            `<img src="${e(logoUrl)}" width="200" alt="${e(logoAlt)}" style="display:block;margin:0 auto 12px;max-width:200px;max-height:64px;height:auto;border:0;outline:none;text-decoration:none;">`
          : logoAlt
            ? `<div style="font-size:22px;font-weight:700;color:#ffffff;margin:0 0 10px;">${ew(logoAlt)}</div>`
            : ""
        : logoUrl
          ? `<img src="${e(logoUrl)}" width="96" height="96" alt="${e(logoAlt)}" style="display:block;margin:0 auto 12px;width:96px;height:96px;border:0;outline:none;text-decoration:none;">`
          : `<div style="font-size:22px;font-weight:700;color:#ffffff;margin:0 0 10px;">${ew(logoAlt)}</div>`) +
      (kicker
        ? `<div style="font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:#ffffff;">${ew(kicker)}</div>`
        : "") +
      (headline
        ? `<div style="font-size:25px;font-weight:700;margin-top:10px;line-height:1.25;color:#ffffff;">${ew(headline)}</div>`
        : "") +
      `</td></tr>`,
  );

  if (badgeLabel || detail) {
    rows.push(
      `<tr><td style="padding:24px 32px 0;">` +
        (badgeLabel
          ? `<span style="display:inline-block;background:${pal.badgeBackground};color:${pal.badgeText};font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;padding:4px 10px;border-radius:999px;">${ew(badgeLabel)}</span>`
          : "") +
        (detail
          ? `<div style="font-size:14px;color:${pal.secondaryText};margin-top:${badgeLabel ? "8px" : "0"};">${ew(detail)}</div>`
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
              `<p style="margin:0 0 ${i === paragraphs.length - 1 ? "0" : "12px"};">${ew(p).replace(/\n/g, "<br>")}</p>`,
          )
          .join("") +
        `</td></tr>`,
    );
  }

  if (cardRows.length > 0) {
    rows.push(
      `<tr><td style="padding:18px 32px 4px;">` +
        `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${pal.cardBackground};border:1px solid ${pal.cardBorder};border-radius:8px;font-size:14px;line-height:1.5;">` +
        (cardTitle
          ? `<tr><td colspan="2" style="padding:14px 18px 2px;font-weight:700;color:${CARD_VALUE_TEXT};">${ew(cardTitle)}</td></tr>`
          : "") +
        cardRows
          .map((r, i) => {
            const top = i === 0 ? (cardTitle ? "8px" : "14px") : "4px";
            const bottom = i === cardRows.length - 1 ? "14px" : "4px";
            return (
              `<tr><td valign="top" style="padding:${top} 18px ${bottom};color:${pal.secondaryText};width:130px;">${ew(r.label)}</td>` +
              `<td valign="top" style="padding:${top} 18px ${bottom};color:${CARD_VALUE_TEXT};">${ew(r.value).replace(/\n/g, "<br>")}</td></tr>`
            );
          })
          .join("") +
        `</table></td></tr>`,
    );
  }

  if (button || secondary || moreLinks.length > 0) {
    rows.push(
      `<tr><td align="center" style="padding:24px 32px 6px;">` +
        (button
          ? `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;"><tr>` +
            `<td align="center" bgcolor="${color}" style="background:${color};border-radius:8px;">` +
            `<a href="${e(button.url)}" style="display:inline-block;background:${color};color:#ffffff;text-decoration:none;font-weight:600;font-size:16px;line-height:20px;padding:14px 32px;border-radius:8px;">${ew(button.label)}</a>` +
            `</td></tr></table>`
          : "") +
        (secondary
          ? `<div style="margin-top:${button ? "12px" : "0"};font-size:15px;"><a href="${e(secondary.url)}" style="color:${pal.link};font-weight:600;text-decoration:none;">${ew(secondary.label)}</a></div>`
          : "") +
        moreLinks
          .map(
            (l, i) =>
              `<div style="margin-top:${button || secondary || i > 0 ? "12px" : "0"};font-size:15px;"><a href="${e(l.url)}" style="color:${pal.link};font-weight:600;text-decoration:none;">${ew(l.label)}</a></div>`,
          )
          .join("") +
        (button && button.note
          ? `<div style="font-size:13px;color:${pal.secondaryText};margin-top:10px;">${ew(button.note)}</div>`
          : "") +
        `</td></tr>`,
    );
  }

  if (showFallback && button) {
    rows.push(
      `<tr><td style="padding:16px 32px 4px;font-size:13px;line-height:1.6;color:${pal.secondaryText};">` +
        `Button not working? Copy this link into your browser:<br>` +
        `<a href="${e(button.url)}" style="color:${pal.link};word-break:break-all;">${e(button.url)}</a>` +
        `</td></tr>`,
    );
  }

  if (signer) {
    rows.push(
      `<tr><td style="padding:20px 32px 22px;font-size:15px;line-height:1.6;color:#1f2937;">` +
        (signer.replyLine ? `<p style="margin:0 0 12px;">${ew(signer.replyLine)}</p>` : "") +
        `<table role="presentation" cellpadding="0" cellspacing="0"><tr>` +
        `<td width="52" valign="top"><div style="width:40px;height:40px;border-radius:20px;background:${pal.avatarBackground};text-align:center;line-height:40px;font-size:14px;font-weight:700;color:${pal.avatarText};">${e(signer.initials)}</div></td>` +
        `<td valign="top" style="font-size:14px;line-height:1.5;"><b>${escapeSignerName(signer.name)}</b>` +
        (signerMeta ? `<br><span style="color:${pal.secondaryText};">${ew(signerMeta)}</span>` : "") +
        (signer.phone ? `<br><span style="color:${pal.secondaryText};">${ew(signer.phone)}</span>` : "") +
        `</td></tr></table></td></tr>`,
    );
  }

  const footerParts = [
    footerLine1 ? ew(footerLine1) : "",
    footerLine2 ? ew(footerLine2) : "",
    footerReason ? ew(footerReason) : "",
    pref ? `<a href="${e(pref.url)}" style="color:${pal.secondaryText};">${ew(pref.label)}</a>` : "",
    poweredByUrl ? `<a href="${e(poweredByUrl)}" style="color:${pal.secondaryText};">Powered by Rello</a>` : "",
  ].filter(Boolean);
  if (footerParts.length > 0) {
    rows.push(
      `<tr><td style="border-top:1px solid #e5e7eb;padding:16px 32px;text-align:center;font-size:12px;color:${pal.secondaryText};line-height:1.6;">` +
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
  // TE-1207: under a brand the text part opens with the brand's name, the same name the HTML header
  // prints (its logo's alt text, or the name as header text), then the kicker as before. A brand with
  // no name names nobody, as in the header. With no brand every line is as it was at v2.36.0. The name
  // here is textName (TE-1222: C0/C1 controls removed), not logoAlt, so the HTML header is untouched.
  if (brand && textName) push(textName);
  // An empty kicker (a nameless brand, no company) adds only blank lines, which the trim below removes.
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
  for (const l of moreLinks) push("", `${l.label}: ${l.url}`);
  if (signer) {
    push("");
    if (signer.replyLine) push(signer.replyLine, "");
    push(signer.name);
    if (signerMeta) push(signerMeta);
    if (signer.phone) push(signer.phone);
  }
  const footerText = [
    footerLine1,
    footerLine2,
    footerReason,
    pref ? `${pref.label}: ${pref.url}` : "",
    poweredByUrl ? "Powered by Rello (hellorello.app)" : "",
  ].filter(Boolean);
  if (footerText.length > 0) push("", "—", ...footerText);
  const text = t
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  return { subject, preheader, html, text: `${text}\n` };
}
