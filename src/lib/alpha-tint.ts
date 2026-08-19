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
export function hexAlphaToPercent(byte: number): number {
  if (!Number.isFinite(byte)) return 0;
  const clamped = Math.min(255, Math.max(0, byte));
  return (clamped / 255) * 100;
}

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
export function alphaTint(color: string, percent: number): string {
  const pct = Number.isFinite(percent) ? Math.min(100, Math.max(0, percent)) : 0;
  // Trim the float so `7.843137254901961%` does not bloat every inline style;
  // 4 decimal places is far below one 8-bit alpha step (0.392%).
  const rounded = Math.round(pct * 10000) / 10000;
  return `color-mix(in srgb, ${color} ${rounded}%, transparent)`;
}
