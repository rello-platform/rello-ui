import type { TokenState } from "../../src/types/tokens.js";

export function generateCss(t: TokenState): string {
  return `/* ==========================================
   RELLO DESIGN SYSTEM - Design Tokens
   Shared across all Rello applications
   ========================================== */

:root {
  /* Brand Colors (customizable per tenant via CSS variables) */
  --brand-primary: ${t.brand.primary};
  --brand-accent: ${t.brand.accent};
  --brand-primary-light: ${t.brand.primaryLight};
  --brand-accent-light: ${t.brand.accentLight};

  /* Pipeline Stage Colors (universal across apps) */
  --hot: ${t.pipeline.hot};
  --qualified: ${t.pipeline.qualified};
  --engaged: ${t.pipeline.engaged};
  --warming: ${t.pipeline.warming};
  --cold: ${t.pipeline.cold};

  /* Pipeline Stage Light Backgrounds */
  --hot-light: ${t.pipeline.hotLight};
  --qualified-light: ${t.pipeline.qualifiedLight};
  --engaged-light: ${t.pipeline.engagedLight};
  --warming-light: ${t.pipeline.warmingLight};
  --cold-light: ${t.pipeline.coldLight};

  /* Status Colors */
  --success: ${t.status.success};
  --success-light: ${t.status.successLight};
  --warning: ${t.status.warning};
  --warning-light: ${t.status.warningLight};
  --error: ${t.status.error};
  --error-light: ${t.status.errorLight};
  --info: ${t.status.info};
  --info-light: ${t.status.infoLight};

  /* Neutrals */
  --neutral-50: ${t.neutral["50"]};
  --neutral-100: ${t.neutral["100"]};
  --neutral-200: ${t.neutral["200"]};
  --neutral-300: ${t.neutral["300"]};
  --neutral-400: ${t.neutral["400"]};
  --neutral-500: ${t.neutral["500"]};
  --neutral-600: ${t.neutral["600"]};
  --neutral-700: ${t.neutral["700"]};
  --neutral-800: ${t.neutral["800"]};
  --neutral-900: ${t.neutral["900"]};

  /* Semantic Colors */
  --background: var(--neutral-50);
  --foreground: var(--neutral-900);
  --card-background: #FFFFFF;
  --card-border: var(--neutral-100);
  --muted: var(--neutral-100);
  --muted-foreground: var(--neutral-500);

  /* Spacing Scale (8px base) */
  --space-1: ${t.spacing["1"]}px;
  --space-2: ${t.spacing["2"]}px;
  --space-3: ${t.spacing["3"]}px;
  --space-4: ${t.spacing["4"]}px;
  --space-5: ${t.spacing["5"]}px;
  --space-6: ${t.spacing["6"]}px;
  --space-8: ${t.spacing["8"]}px;
  --space-10: ${t.spacing["10"]}px;
  --space-12: ${t.spacing["12"]}px;

  /* Border Radius */
  --radius-xs: ${t.radius.xs}px;
  --radius-sm: ${t.radius.sm}px;
  --radius-md: ${t.radius.md}px;
  --radius-lg: ${t.radius.lg}px;
  --radius-xl: ${t.radius.xl}px;
  --radius-full: ${t.radius.full}px;

  /* Shadows */
  --shadow-xs: ${t.shadow.xs};
  --shadow-sm: ${t.shadow.sm};
  --shadow-md: ${t.shadow.md};
  --shadow-lg: ${t.shadow.lg};
  --shadow-xl: ${t.shadow.xl};

  /* Font Families */
  --font-heading: ${t.fontFamily.heading};
  --font-body: ${t.fontFamily.body};
  --font-ui: ${t.fontFamily.ui};
  --font-stat: ${t.fontFamily.stat};

  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-normal: 200ms ease;
  --transition-slow: 300ms ease;

  /* Z-Index Scale */
  --z-dropdown: 10;
  --z-sticky: 20;
  --z-fixed: 30;
  --z-overlay: 40;
  --z-modal: 50;
  --z-popover: 60;
  --z-tooltip: 70;
}
`;
}
