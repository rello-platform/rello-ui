/**
 * Pipeline thermometer barrel (client-bundle surface).
 *
 * Exports the component + its prop types. The pure stage constants
 * (`STAGES`, `STAGE_COLORS`, `STAGE_LABELS`, `PipelineData`) live at
 * `./stages` and are re-exported from the server-safe root entry
 * `src/index.ts`. Keeping the constants out of the `/client` surface
 * prevents the server-import foot-gun the Option-D split fixed.
 *
 * See DISCOVERED-RELLO-UI-RUNTIME-IMPORT-FAILURE-ON-RAILWAY-041726.
 */

export {
  PipelineThermometer,
  type QuickStat,
  type PipelineThermometerProps,
} from "./PipelineThermometer";

export type { PipelineData } from "./stages";
