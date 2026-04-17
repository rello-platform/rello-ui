/**
 * Pure pipeline stage constants.
 *
 * Kept in a dedicated file (no `"use client"` directive) so the constants
 * can be imported from RSC server components via the server-safe root
 * entry `@rello-platform/ui`. See the Option-D runtime-import fix in
 * DISCOVERED-RELLO-UI-RUNTIME-IMPORT-FAILURE-ON-RAILWAY-041726.
 */

export interface PipelineData {
  cold: number;
  warming: number;
  engaged: number;
  qualified: number;
  hot: number;
}

export const STAGES = ["cold", "warming", "engaged", "qualified", "hot"] as const;

export const STAGE_LABELS: Record<keyof PipelineData, string> = {
  cold: "Cold",
  warming: "Warming",
  engaged: "Engaged",
  qualified: "Qualified",
  hot: "Hot",
};

export const STAGE_COLORS: Record<keyof PipelineData, string> = {
  cold: "var(--cold)",
  warming: "var(--warming)",
  engaged: "var(--engaged)",
  qualified: "var(--qualified)",
  hot: "var(--hot)",
};
