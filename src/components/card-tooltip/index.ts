export {
  CardTooltip,
  CardTooltipIcon,
  type CardTooltipProps,
  type CardTooltipIconProps,
} from "./CardTooltip";

// Re-export Radix Tooltip namespace so spokes mount <Tooltip.Provider> at their
// admin layout root WITHOUT taking a direct dependency on @radix-ui/react-tooltip.
// SPEC §11 FP-1: no Rello-root Radix tooltip import.
export * as Tooltip from "@radix-ui/react-tooltip";
