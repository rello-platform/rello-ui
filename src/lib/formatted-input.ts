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
export function digitsOnly(raw: string): string {
  return raw.replace(/\D/g, "");
}

/**
 * The national (10-digit) part of a US number. An 11-digit string that starts
 * with the country code 1 drops that 1; anything longer is cut at 10 digits.
 */
function usNationalDigits(raw: string): string {
  let d = digitsOnly(raw);
  if (d.length === 11 && d.startsWith("1")) d = d.slice(1);
  return d.slice(0, 10);
}

/** `(801) 555-0123`, built progressively so it can be shown while typing. */
export function formatUsPhone(raw: string): string {
  const d = usNationalDigits(raw);
  if (d.length === 0) return "";
  if (d.length <= 3) return `(${d}`;
  if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

/** `+18015550123` for a complete US number; `null` for anything incomplete. */
export function usPhoneToE164(raw: string): string | null {
  const d = usNationalDigits(raw);
  return d.length === 10 ? `+1${d}` : null;
}

/** `MM/DD/YYYY`, built progressively from up to 8 digits. */
export function formatDateDigits(raw: string): string {
  const d = digitsOnly(raw).slice(0, 8);
  if (d.length <= 2) return d;
  if (d.length <= 4) return `${d.slice(0, 2)}/${d.slice(2)}`;
  return `${d.slice(0, 2)}/${d.slice(2, 4)}/${d.slice(4)}`;
}

/**
 * `MM/DD/YYYY` → `YYYY-MM-DD` when it is a real calendar date (leap years
 * included); `null` when partial or impossible (13/40/2026).
 */
export function parseUsDate(raw: string): string | null {
  const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(raw.trim());
  if (!m) return null;
  const month = Number(m[1]);
  const day = Number(m[2]);
  const year = Number(m[3]);
  if (month < 1 || month > 12 || day < 1 || year < 1) return null;
  const leap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  const days = [31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1];
  if (day > days) return null;
  return `${m[3]}-${m[1]}-${m[2]}`;
}

/** `YYYY-MM-DD` → `MM/DD/YYYY`; anything else → "" (shown as an empty field). */
export function isoDateToUs(iso: string | null | undefined): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso ?? "");
  return m ? `${m[2]}/${m[3]}/${m[1]}` : "";
}

/** Lowercased and trimmed. */
export function normalizeEmail(raw: string): string {
  return raw.trim().toLowerCase();
}

/**
 * Trimmed; `https://` added when the text has no scheme. An empty field stays
 * empty (never `https://` on its own).
 */
export function normalizeUrl(raw: string): string {
  const t = raw.trim();
  if (t === "") return "";
  return /^[a-z][a-z0-9+.-]*:\/\//i.test(t) ? t : `https://${t}`;
}

/**
 * Digits and at most one decimal point, with at most `maxDecimals` digits after
 * it. A minus sign is dropped (these fields hold non-negative amounts). With
 * `maxDecimals` 0 the point itself is dropped.
 */
export function sanitizeDecimal(raw: string, maxDecimals: number): string {
  const kept = raw.replace(/[^\d.]/g, "");
  const point = kept.indexOf(".");
  if (point === -1 || maxDecimals <= 0) return kept.replace(/\./g, "");
  const whole = kept.slice(0, point);
  const frac = kept.slice(point + 1).replace(/\./g, "").slice(0, maxDecimals);
  return `${whole}.${frac}`;
}

/** `$1,234.5` from a sanitized decimal string; a typed trailing point is kept. */
export function formatCurrencyDisplay(sanitized: string): string {
  if (sanitized === "") return "";
  const point = sanitized.indexOf(".");
  const whole = point === -1 ? sanitized : sanitized.slice(0, point);
  const rest = point === -1 ? "" : sanitized.slice(point);
  const trimmed = whole.replace(/^0+(?=\d)/, "");
  const grouped = (trimmed === "" ? "0" : trimmed).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `$${grouped}${rest}`;
}

/** A finite number from a sanitized decimal string, or `null` (never NaN). */
export function parseDecimal(sanitized: string): number | null {
  if (!/\d/.test(sanitized)) return null;
  const n = Number(sanitized.endsWith(".") ? sanitized.slice(0, -1) : sanitized);
  return Number.isFinite(n) ? n : null;
}

/**
 * Where the caret belongs after re-formatting: just after the same count of
 * significant characters (by default digits) that preceded it before. Keeps the
 * caret in place when a separator is inserted or a character is dropped.
 */
export function caretAfterFormat(
  rawBefore: string,
  caret: number,
  formatted: string,
  isSignificant: (c: string) => boolean = (c) => /\d/.test(c),
): number {
  let sig = 0;
  for (let i = 0; i < Math.min(caret, rawBefore.length); i += 1) if (isSignificant(rawBefore[i])) sig += 1;
  if (sig === 0) {
    const first = [...formatted].findIndex(isSignificant);
    return first === -1 ? formatted.length : first;
  }
  let seen = 0;
  for (let i = 0; i < formatted.length; i += 1) {
    if (isSignificant(formatted[i])) {
      seen += 1;
      if (seen === sig) return i + 1;
    }
  }
  return formatted.length;
}
