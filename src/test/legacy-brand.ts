import { PLATFORM_BRAND } from "@rello-platform/slugs";

/**
 * RALLYROO Level 2 (U3) then moved the three addresses the shell itself writes
 * to the new domain. Each is mapped back only in the place the shell writes it,
 * never as a bare string (RH-380), so a caller's own address on the new domain
 * stays as written and still fails a frozen comparison:
 *   - the header logo: the shell's 96×96 image (a brand logo is 200 wide);
 *   - the "Powered by" link: only as the last item of the footer row;
 *   - the text footer: only as the last line of the block under the "—" rule.
 * Caller text is escaped in the html, so it cannot write those tags. The limit
 * is caller input that makes output identical to the shell's own, in the same
 * place (with footer.poweredBy off: a last footer line, or a footer link, worded
 * and addressed exactly like the shell's).
 * src/test/legacy-brand.test.ts pins both sides.
 */
const APP_URL = literal(PLATFORM_BRAND.appUrl);
const SHELL_ADDRESSES: readonly (readonly [shellForm: RegExp, legacy: string])[] = [
  [
    new RegExp(`(<img src=")${APP_URL}(/email/logos/[a-z-]+\\.png" width="96" height="96" alt=")`, "g"),
    "$1https://hellorello.app$2",
  ],
  [
    new RegExp(
      `(<tr><td style="border-top:1px solid #e5e7eb;padding:16px 32px;[^"]*">(?:(?!</td>)[\\s\\S])*<a href=")${APP_URL}(" style="color:#[0-9a-f]{6};">Powered by ${PLATFORM_BRAND.name}</a></td></tr>)`,
      "g",
    ),
    "$1https://hellorello.app$2",
  ],
  [
    new RegExp(`(\\n\\n—\\n(?:[^\\n]+\\n)*Powered by ${PLATFORM_BRAND.name} \\()${literal(PLATFORM_BRAND.domain)}(\\)\\n)$`),
    "$1hellorello.app$2",
  ],
];

/** A string as a pattern that matches only itself. */
function literal(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * v2.45.0 (RALLYROO Phase 3) changed the product name a render carries, and
 * nothing else. The frozen fixtures and hash baselines were captured while the
 * name was "Rello", so a test that pins an older render maps the current name
 * back to the legacy one before comparing: equality then proves the name is the
 * ONLY difference. The fixtures stay untouched, as the record of what those
 * versions rendered. The NAME mapping is not tied to a place; it is safe for the
 * recordings because none of their inputs contains the new name, so callers' own
 * strings (some still say "Rello") pass through as given.
 */
export function asLegacyBrand(value: string): string {
  if (typeof value !== "string") throw new TypeError("asLegacyBrand: expected a string");
  let out = value;
  for (const [shellForm, legacy] of SHELL_ADDRESSES) out = out.replace(shellForm, legacy);
  return out.split(PLATFORM_BRAND.name).join(PLATFORM_BRAND.legacyName);
}

/** Matches either product name, any case: for "the header names no platform" checks. */
export const ANY_PLATFORM_NAME = new RegExp(`${PLATFORM_BRAND.legacyName}|${PLATFORM_BRAND.name}`, "i");

/** A whole rendered email with the name mapped back in every part (for "equals the stored copy" checks). */
export function asLegacyRender<T extends { subject: string; preheader: string; html: string; text: string }>(r: T): T {
  return { ...r, subject: asLegacyBrand(r.subject), preheader: asLegacyBrand(r.preheader), html: asLegacyBrand(r.html), text: asLegacyBrand(r.text) };
}
