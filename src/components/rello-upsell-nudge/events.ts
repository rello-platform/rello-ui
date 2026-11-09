/**
 * Upsell telemetry vocabulary. Pure data, server-safe (root entry).
 *
 * ANSWERS Q-CS-5: five events per seam. The component reports `engaged`
 * (`onEngaged`), `dismissed` (`onDismiss`) and `clicked` (`onClick`); the
 * spoke's wrapper reports `shown` when it mounts the nudge; Rello's
 * trial-start / upgrade handler emits `converted`. Signal types are
 * `<spoke>.upsell.<seam>.<event>`, typed with `UpsellEvent` so the event half
 * cannot be misspelled.
 */
export const UPSELL_EVENTS = ["shown", "engaged", "dismissed", "clicked", "converted"] as const;

export type UpsellEvent = (typeof UPSELL_EVENTS)[number];

/**
 * How long the pointer (or keyboard focus) must stay on a nudge before it
 * counts as `engaged` ("hover >= 3s OR detail-panel-expand").
 */
export const UPSELL_ENGAGED_DWELL_MS = 3000;
