/**
 * Pure slug helpers for structured addresses.
 *
 * Kept in a dedicated file (no `"use client"` directive) so the helpers
 * can be imported from RSC server components — e.g. server-side signal
 * writers that need to produce `location:` tag slugs. See the Option-D
 * runtime-import fix in DISCOVERED-RELLO-UI-RUNTIME-IMPORT-FAILURE-ON-RAILWAY-041726.
 */

/** Structured address shape returned by AddressAutocomplete on selection. */
export interface StructuredAddress {
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

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/**
 * Build a `location:` tag slug from structured address parts.
 *
 * Priority:
 *   1. city + state  -> `location:salt-lake-city-ut`
 *   2. zip           -> `location:84092`
 *   3. fallback      -> slugified formattedAddress
 */
export function buildLocationTagSlug(address: StructuredAddress): string {
  if (address.city && address.state) {
    return `location:${slugify(address.city)}-${address.state.toLowerCase()}`;
  }
  if (address.zip) {
    return `location:${address.zip}`;
  }
  return `location:${slugify(address.formattedAddress)}`;
}
