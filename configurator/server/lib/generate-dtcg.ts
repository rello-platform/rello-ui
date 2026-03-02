import type { TokenState } from "../../src/types/tokens.js";

export function generateDtcg(t: TokenState): string {
  const obj = {
    brand: {
      $description: "Customizable per tenant — only these values change for white-label theming",
      primary: { $value: t.brand.primary, $type: "color", $description: "Primary brand color — buttons, links, focus rings" },
      accent: { $value: t.brand.accent, $type: "color", $description: "Accent brand color — secondary actions, highlights" },
      "primary-light": { $value: t.brand.primaryLight, $type: "color", $description: "Primary at 15% opacity — light backgrounds, badges" },
      "accent-light": { $value: t.brand.accentLight, $type: "color", $description: "Accent at 15% opacity — light backgrounds, badges" },
    },
    pipeline: {
      $description: "Pipeline stage colors — universal across all tenants, never customized",
      hot: { $value: t.pipeline.hot, $type: "color" },
      qualified: { $value: t.pipeline.qualified, $type: "color" },
      engaged: { $value: t.pipeline.engaged, $type: "color" },
      warming: { $value: t.pipeline.warming, $type: "color" },
      cold: { $value: t.pipeline.cold, $type: "color" },
      "hot-light": { $value: t.pipeline.hotLight, $type: "color" },
      "qualified-light": { $value: t.pipeline.qualifiedLight, $type: "color" },
      "engaged-light": { $value: t.pipeline.engagedLight, $type: "color" },
      "warming-light": { $value: t.pipeline.warmingLight, $type: "color" },
      "cold-light": { $value: t.pipeline.coldLight, $type: "color" },
    },
    status: {
      $description: "Status feedback colors — universal across all tenants",
      success: { $value: t.status.success, $type: "color" },
      "success-light": { $value: t.status.successLight, $type: "color" },
      warning: { $value: t.status.warning, $type: "color" },
      "warning-light": { $value: t.status.warningLight, $type: "color" },
      error: { $value: t.status.error, $type: "color" },
      "error-light": { $value: t.status.errorLight, $type: "color" },
      info: { $value: t.status.info, $type: "color" },
      "info-light": { $value: t.status.infoLight, $type: "color" },
    },
    neutral: {
      $description: "10-step neutral grayscale — universal",
      "50": { $value: t.neutral["50"], $type: "color", $description: "Snow" },
      "100": { $value: t.neutral["100"], $type: "color", $description: "Cloud" },
      "200": { $value: t.neutral["200"], $type: "color" },
      "300": { $value: t.neutral["300"], $type: "color", $description: "Mist" },
      "400": { $value: t.neutral["400"], $type: "color" },
      "500": { $value: t.neutral["500"], $type: "color", $description: "Slate" },
      "600": { $value: t.neutral["600"], $type: "color" },
      "700": { $value: t.neutral["700"], $type: "color", $description: "Storm" },
      "800": { $value: t.neutral["800"], $type: "color" },
      "900": { $value: t.neutral["900"], $type: "color", $description: "Charcoal" },
    },
    semantic: {
      $description: "Semantic color aliases — reference other tokens",
      background: { $value: "{neutral.50}", $type: "color" },
      foreground: { $value: "{neutral.900}", $type: "color" },
      "card-background": { $value: "#FFFFFF", $type: "color" },
      "card-border": { $value: "{neutral.100}", $type: "color" },
      muted: { $value: "{neutral.100}", $type: "color" },
      "muted-foreground": { $value: "{neutral.500}", $type: "color" },
    },
    spacing: {
      $description: "4px base spacing scale",
      "1": { $value: `${t.spacing["1"]}px`, $type: "dimension" },
      "2": { $value: `${t.spacing["2"]}px`, $type: "dimension" },
      "3": { $value: `${t.spacing["3"]}px`, $type: "dimension" },
      "4": { $value: `${t.spacing["4"]}px`, $type: "dimension" },
      "5": { $value: `${t.spacing["5"]}px`, $type: "dimension" },
      "6": { $value: `${t.spacing["6"]}px`, $type: "dimension" },
      "8": { $value: `${t.spacing["8"]}px`, $type: "dimension" },
      "10": { $value: `${t.spacing["10"]}px`, $type: "dimension" },
      "12": { $value: `${t.spacing["12"]}px`, $type: "dimension" },
    },
    radius: {
      $description: "Border radius scale",
      xs: { $value: `${t.radius.xs}px`, $type: "dimension" },
      sm: { $value: `${t.radius.sm}px`, $type: "dimension" },
      md: { $value: `${t.radius.md}px`, $type: "dimension" },
      lg: { $value: `${t.radius.lg}px`, $type: "dimension" },
      xl: { $value: `${t.radius.xl}px`, $type: "dimension" },
      full: { $value: `${t.radius.full}px`, $type: "dimension" },
    },
    shadow: {
      $description: "Elevation shadow scale",
      xs: { $value: parseShadow(t.shadow.xs), $type: "shadow" },
      sm: { $value: parseShadow(t.shadow.sm), $type: "shadow" },
      md: { $value: parseShadow(t.shadow.md), $type: "shadow" },
      lg: { $value: parseShadow(t.shadow.lg), $type: "shadow" },
      xl: { $value: parseShadow(t.shadow.xl), $type: "shadow" },
    },
    fontFamily: {
      $description: "Four-font family system",
      heading: { $value: t.fontFamily.heading, $type: "fontFamily", $description: "Headings & titles" },
      body: { $value: t.fontFamily.body, $type: "fontFamily", $description: "Body text & descriptions" },
      ui: { $value: t.fontFamily.ui, $type: "fontFamily", $description: "UI labels, buttons & badges" },
      stat: { $value: t.fontFamily.stat, $type: "fontFamily", $description: "Statistics, scores & metrics" },
    },
    typography: {
      $description: "Type scale composites",
      h1: { $value: { fontFamily: "{fontFamily.heading}", fontWeight: t.typography.h1.fontWeight, fontSize: t.typography.h1.fontSize, lineHeight: t.typography.h1.lineHeight }, $type: "typography" },
      h2: { $value: { fontFamily: "{fontFamily.heading}", fontWeight: t.typography.h2.fontWeight, fontSize: t.typography.h2.fontSize, lineHeight: t.typography.h2.lineHeight }, $type: "typography" },
      h3: { $value: { fontFamily: "{fontFamily.heading}", fontWeight: t.typography.h3.fontWeight, fontSize: t.typography.h3.fontSize, lineHeight: t.typography.h3.lineHeight }, $type: "typography" },
      h4: { $value: { fontFamily: "{fontFamily.heading}", fontWeight: t.typography.h4.fontWeight, fontSize: t.typography.h4.fontSize, lineHeight: t.typography.h4.lineHeight }, $type: "typography" },
      body: { $value: { fontFamily: "{fontFamily.body}", fontWeight: t.typography.body.fontWeight, fontSize: t.typography.body.fontSize, lineHeight: t.typography.body.lineHeight }, $type: "typography" },
      small: { $value: { fontFamily: "{fontFamily.body}", fontWeight: t.typography.small.fontWeight, fontSize: t.typography.small.fontSize, lineHeight: t.typography.small.lineHeight }, $type: "typography" },
      label: { $value: { fontFamily: "{fontFamily.ui}", fontWeight: t.typography.label.fontWeight, fontSize: t.typography.label.fontSize, lineHeight: t.typography.label.lineHeight }, $type: "typography" },
      stat: { $value: { fontFamily: "{fontFamily.stat}", fontWeight: t.typography.stat.fontWeight, fontSize: t.typography.stat.fontSize, lineHeight: t.typography.stat.lineHeight }, $type: "typography" },
    },
  };

  return JSON.stringify(obj, null, 2) + "\n";
}

function parseShadow(css: string): object[] {
  return css.split(/,\s*(?=\d)/).map((layer) => {
    const m = layer.trim().match(/^([\d.-]+)px\s+([\d.-]+)px\s+([\d.-]+)px\s+([\d.-]+px)?\s*(rgba?\([^)]+\))$/);
    if (!m) return { offsetX: "0px", offsetY: "0px", blur: "0px", spread: "0px", color: "rgba(0,0,0,0)" };
    return {
      offsetX: `${m[1]}px`,
      offsetY: `${m[2]}px`,
      blur: `${m[3]}px`,
      spread: m[4] || "0px",
      color: m[5],
    };
  });
}
