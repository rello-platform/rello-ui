import type { TokenState } from "../../src/types/tokens.js";

export function parseCssTokens(css: string): TokenState {
  const vars: Record<string, string> = {};
  const re = /--([\w-]+)\s*:\s*(.+?)\s*;/g;
  let match;
  while ((match = re.exec(css)) !== null) {
    vars[match[1]] = match[2];
  }

  return {
    brand: {
      primary: vars["brand-primary"] || "#3B5998",
      accent: vars["brand-accent"] || "#C9785D",
      primaryLight: vars["brand-primary-light"] || "rgba(59, 89, 152, 0.15)",
      accentLight: vars["brand-accent-light"] || "rgba(201, 120, 93, 0.15)",
    },
    pipeline: {
      hot: vars["hot"] || "#D9534F",
      qualified: vars["qualified"] || "#E8915A",
      engaged: vars["engaged"] || "#D4A84B",
      warming: vars["warming"] || "#6A9FB5",
      cold: vars["cold"] || "#939CA3",
      hotLight: vars["hot-light"] || "rgba(217, 83, 79, 0.15)",
      qualifiedLight: vars["qualified-light"] || "rgba(232, 145, 90, 0.15)",
      engagedLight: vars["engaged-light"] || "rgba(212, 168, 75, 0.15)",
      warmingLight: vars["warming-light"] || "rgba(106, 159, 181, 0.15)",
      coldLight: vars["cold-light"] || "rgba(147, 156, 163, 0.15)",
    },
    status: {
      success: vars["success"] || "#6B9080",
      successLight: vars["success-light"] || "rgba(107, 144, 128, 0.15)",
      warning: vars["warning"] || "#D4A84B",
      warningLight: vars["warning-light"] || "rgba(212, 168, 75, 0.15)",
      error: vars["error"] || "#C9605D",
      errorLight: vars["error-light"] || "rgba(201, 96, 93, 0.15)",
      info: vars["info"] || "#3298DC",
      infoLight: vars["info-light"] || "rgba(50, 152, 220, 0.15)",
    },
    neutral: {
      "50": vars["neutral-50"] || "#FAFBFC",
      "100": vars["neutral-100"] || "#E1E4E8",
      "200": vars["neutral-200"] || "#C8CED3",
      "300": vars["neutral-300"] || "#B0B7BF",
      "400": vars["neutral-400"] || "#98A1AA",
      "500": vars["neutral-500"] || "#646F77",
      "600": vars["neutral-600"] || "#525B62",
      "700": vars["neutral-700"] || "#434B52",
      "800": vars["neutral-800"] || "#353C42",
      "900": vars["neutral-900"] || "#2D3339",
    },
    spacing: {
      "1": parsePx(vars["space-1"], 4),
      "2": parsePx(vars["space-2"], 8),
      "3": parsePx(vars["space-3"], 12),
      "4": parsePx(vars["space-4"], 16),
      "5": parsePx(vars["space-5"], 20),
      "6": parsePx(vars["space-6"], 24),
      "8": parsePx(vars["space-8"], 32),
      "10": parsePx(vars["space-10"], 40),
      "12": parsePx(vars["space-12"], 48),
    },
    radius: {
      xs: parsePx(vars["radius-xs"], 4),
      sm: parsePx(vars["radius-sm"], 6),
      md: parsePx(vars["radius-md"], 8),
      lg: parsePx(vars["radius-lg"], 12),
      xl: parsePx(vars["radius-xl"], 16),
      full: parsePx(vars["radius-full"], 9999),
    },
    shadow: {
      xs: vars["shadow-xs"] || "0 1px 2px rgba(0, 0, 0, 0.04)",
      sm: vars["shadow-sm"] || "0 1px 2px rgba(0, 0, 0, 0.05)",
      md: vars["shadow-md"] || "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
      lg: vars["shadow-lg"] || "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
      xl: vars["shadow-xl"] || "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
    },
    fontFamily: {
      heading: vars["font-heading"] || "Montserrat",
      body: vars["font-body"] || "Open Sans",
      ui: vars["font-ui"] || "Hind",
      stat: vars["font-stat"] || "Mina",
      appTitle: vars["font-app-title"] || "Montserrat",
      appSubtitle: vars["font-app-subtitle"] || "Open Sans",
    },
    typography: {
      h1: { fontFamily: "heading", fontWeight: "700", fontSize: "32px", lineHeight: "1.2" },
      h2: { fontFamily: "heading", fontWeight: "600", fontSize: "24px", lineHeight: "1.3" },
      h3: { fontFamily: "heading", fontWeight: "600", fontSize: "20px", lineHeight: "1.4" },
      h4: { fontFamily: "heading", fontWeight: "600", fontSize: "16px", lineHeight: "1.4" },
      body: { fontFamily: "body", fontWeight: "400", fontSize: "14px", lineHeight: "1.5" },
      small: { fontFamily: "body", fontWeight: "400", fontSize: "12px", lineHeight: "1.4" },
      label: { fontFamily: "ui", fontWeight: "500", fontSize: "11px", lineHeight: "1.3" },
      stat: { fontFamily: "stat", fontWeight: "600", fontSize: "32px", lineHeight: "1.2" },
    },
  };
}

function parsePx(val: string | undefined, fallback: number): number {
  if (!val) return fallback;
  return parseInt(val.replace("px", ""), 10) || fallback;
}
