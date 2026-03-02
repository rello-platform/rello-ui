import { addons } from "@storybook/manager-api";
import { create } from "@storybook/theming/create";

const relloTheme = create({
  base: "light",
  brandTitle: "@rello/ui Design System",
  brandUrl: "https://hellorello.app",
  colorPrimary: "#3B5998",
  colorSecondary: "#C9785D",
  fontBase: '"Open Sans", sans-serif',
  fontCode: "monospace",
  appBg: "#FAFBFC",
  appContentBg: "#FFFFFF",
  appBorderColor: "#E1E4E8",
  textColor: "#2D3339",
  textMutedColor: "#646F77",
  barTextColor: "#646F77",
  barSelectedColor: "#3B5998",
  barBg: "#FFFFFF",
});

addons.setConfig({ theme: relloTheme });
