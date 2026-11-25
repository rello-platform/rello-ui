import { PLATFORM_BRAND } from "@rello-platform/slugs";

/**
 * v2.45.0 (RALLYROO Phase 3) changed the product name a render carries, and
 * nothing else. The frozen fixtures and hash baselines were captured while the
 * name was "Rello", so a test that pins an older render maps the current name
 * back to the legacy one before comparing: equality then proves the name is the
 * ONLY difference. The fixtures stay untouched, as the record of what those
 * versions rendered. The mapping is safe because no test input contains the
 * new name: callers' own strings (some still say "Rello") pass through as given.
 */
export function asLegacyBrand(value: string): string {
  if (typeof value !== "string") throw new TypeError("asLegacyBrand: expected a string");
  return value.split(PLATFORM_BRAND.name).join(PLATFORM_BRAND.legacyName);
}

/** Matches either product name, any case: for "the header names no platform" checks. */
export const ANY_PLATFORM_NAME = new RegExp(`${PLATFORM_BRAND.legacyName}|${PLATFORM_BRAND.name}`, "i");

/** A whole rendered email with the name mapped back in every part (for "equals the stored copy" checks). */
export function asLegacyRender<T extends { subject: string; preheader: string; html: string; text: string }>(r: T): T {
  return { ...r, subject: asLegacyBrand(r.subject), preheader: asLegacyBrand(r.preheader), html: asLegacyBrand(r.html), text: asLegacyBrand(r.text) };
}
