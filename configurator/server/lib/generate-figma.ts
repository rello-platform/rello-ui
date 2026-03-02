import type { TokenState } from "../../src/types/tokens.js";

export function generateFigma(t: TokenState): string {
  const c = (hex: string) => ({ $value: hex, $type: "color" as const });
  const n = (val: number) => ({ $value: val, $type: "number" as const });

  const obj: Record<string, { $value: string | number; $type: string }> = {
    "brand/primary": c(t.brand.primary),
    "brand/accent": c(t.brand.accent),
    "brand/primary-light": c(hexWithAlpha(t.brand.primary, 0.15)),
    "brand/accent-light": c(hexWithAlpha(t.brand.accent, 0.15)),

    "pipeline/hot": c(t.pipeline.hot),
    "pipeline/qualified": c(t.pipeline.qualified),
    "pipeline/engaged": c(t.pipeline.engaged),
    "pipeline/warming": c(t.pipeline.warming),
    "pipeline/cold": c(t.pipeline.cold),
    "pipeline/hot-light": c(hexWithAlpha(t.pipeline.hot, 0.15)),
    "pipeline/qualified-light": c(hexWithAlpha(t.pipeline.qualified, 0.15)),
    "pipeline/engaged-light": c(hexWithAlpha(t.pipeline.engaged, 0.15)),
    "pipeline/warming-light": c(hexWithAlpha(t.pipeline.warming, 0.15)),
    "pipeline/cold-light": c(hexWithAlpha(t.pipeline.cold, 0.15)),

    "status/success": c(t.status.success),
    "status/success-light": c(hexWithAlpha(t.status.success, 0.15)),
    "status/warning": c(t.status.warning),
    "status/warning-light": c(hexWithAlpha(t.status.warning, 0.15)),
    "status/error": c(t.status.error),
    "status/error-light": c(hexWithAlpha(t.status.error, 0.15)),
    "status/info": c(t.status.info),
    "status/info-light": c(hexWithAlpha(t.status.info, 0.15)),

    "neutral/50": c(t.neutral["50"]),
    "neutral/100": c(t.neutral["100"]),
    "neutral/200": c(t.neutral["200"]),
    "neutral/300": c(t.neutral["300"]),
    "neutral/400": c(t.neutral["400"]),
    "neutral/500": c(t.neutral["500"]),
    "neutral/600": c(t.neutral["600"]),
    "neutral/700": c(t.neutral["700"]),
    "neutral/800": c(t.neutral["800"]),
    "neutral/900": c(t.neutral["900"]),

    "semantic/background": c(t.neutral["50"]),
    "semantic/foreground": c(t.neutral["900"]),
    "semantic/card-background": c("#FFFFFF"),
    "semantic/card-border": c(t.neutral["100"]),
    "semantic/muted": c(t.neutral["100"]),
    "semantic/muted-foreground": c(t.neutral["500"]),

    "spacing/1": n(t.spacing["1"]),
    "spacing/2": n(t.spacing["2"]),
    "spacing/3": n(t.spacing["3"]),
    "spacing/4": n(t.spacing["4"]),
    "spacing/5": n(t.spacing["5"]),
    "spacing/6": n(t.spacing["6"]),
    "spacing/8": n(t.spacing["8"]),
    "spacing/10": n(t.spacing["10"]),
    "spacing/12": n(t.spacing["12"]),

    "radius/xs": n(t.radius.xs),
    "radius/sm": n(t.radius.sm),
    "radius/md": n(t.radius.md),
    "radius/lg": n(t.radius.lg),
    "radius/xl": n(t.radius.xl),
    "radius/full": n(t.radius.full),
  };

  return JSON.stringify(obj, null, 2) + "\n";
}

function hexWithAlpha(hex: string, alpha: number): string {
  const clean = hex.replace("#", "");
  const a = Math.round(alpha * 255).toString(16).padStart(2, "0");
  return `#${clean}${a}`;
}
