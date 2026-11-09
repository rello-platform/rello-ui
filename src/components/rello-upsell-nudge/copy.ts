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

export interface UpsellCopyValues {
  /**
   * Display-ready monthly price from Rello's config, e.g. "$199". Treated as
   * missing when absent, blank, not a string, or carrying no non-zero digit
   * ("$0", "0.00", "TBD").
   */
  monthlyPrice?: string | null;
  /** Per-seam ROI line from Rello's config. Missing when absent, blank or not a string. */
  roiCopy?: string | null;
}

/** `{{ name }}` with optional inner whitespace. */
const TOKEN = /\{\{\s*([A-Za-z0-9_]+)\s*\}\}/g;

function usableValue(name: string, values: UpsellCopyValues): string | null {
  const raw = name === "monthlyPrice" ? values.monthlyPrice : name === "roiCopy" ? values.roiCopy : undefined;
  if (typeof raw !== "string") return null;
  const trimmed = raw.trim();
  if (trimmed === "") return null;
  if (name === "monthlyPrice" && !/[1-9]/.test(trimmed)) return null;
  return trimmed;
}

interface Piece {
  /** Sentence text, separator excluded. */
  text: string;
  /** Whitespace that followed it (may hold a paragraph break). */
  sep: string;
}

/**
 * Split into sentences. A sentence ends at `.`, `!`, `?` or the ellipsis `…`
 * (runs such as "..." or "?!" count as one end), optionally followed by
 * closing quotes or brackets (" ” ’ ' ) ]), and then whitespace or the end of
 * the string. A newline also ends one. The whitespace after a sentence is kept
 * as its separator so paragraph breaks survive. A full stop with no
 * whitespace after it ("$1.99") does not end a sentence.
 */
function splitSentences(template: string): Piece[] {
  const pieces: Piece[] = [];
  const re = /([\s\S]*?)(?:([.!?\u2026]+["\u201D\u2019')\]]*)(\s+|$)|(\n\s*)|$)/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(template)) !== null) {
    const [whole, body = "", stop = "", stopSep = "", lineSep = ""] = match;
    if (whole === "") break;
    pieces.push({ text: body + stop, sep: stop ? stopSep : lineSep });
    if (re.lastIndex >= template.length) break;
  }
  return pieces;
}

function newlineCount(s: string): number {
  return (s.match(/\n/g) ?? []).length;
}

/**
 * Render an upsell copy template. Copy with no `{{` is the caller's text and
 * is returned unchanged, byte for byte, literal or unbalanced braces included
 * ("Literal }} text" stays as written). Only copy that contains `{{` is
 * templated, and only there does a sentence with a leftover brace pair get
 * omitted.
 */
export function renderUpsellCopy(template: string, values: UpsellCopyValues = {}): string {
  if (typeof template !== "string") return "";
  if (!template.includes("{{")) return template;

  const pieces = splitSentences(template);
  const kept: Piece[] = [];
  let pendingSep = "";

  for (const piece of pieces) {
    let missing = false;
    // Single pass: a substituted value is never re-read as a template.
    const rendered = piece.text.replace(TOKEN, (_match, name: string) => {
      const value = usableValue(name, values);
      if (value === null) {
        missing = true;
        return "";
      }
      return value;
    });
    // Anything brace-shaped left over is an unclosed or nested token: omit.
    const leftover = missing ? false : /\{\{|\}\}/.test(rendered);
    if (missing || leftover) {
      // Carry the strongest break (most newlines) across the dropped sentence.
      if (kept.length > 0 && newlineCount(piece.sep) > newlineCount(pendingSep)) pendingSep = piece.sep;
      continue;
    }
    if (kept.length > 0) kept[kept.length - 1].sep = pendingSep;
    kept.push({ text: rendered, sep: piece.sep });
    pendingSep = piece.sep;
  }

  return kept
    .map((p, i) => (i < kept.length - 1 ? p.text + p.sep : p.text))
    .join("")
    .trim();
}
