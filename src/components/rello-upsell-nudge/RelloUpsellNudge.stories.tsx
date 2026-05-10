import type { Meta, StoryObj } from "@storybook/react";
import { Sparks } from "iconoir-react";
import { RelloUpsellNudge } from "./RelloUpsellNudge";

const meta = {
  title: "Components/RelloUpsellNudge",
  component: RelloUpsellNudge,
  tags: ["autodocs"],
  argTypes: {
    seam: { control: "text" },
    headline: { control: "text" },
    body: { control: "text" },
    ctaLabel: { control: "text" },
  },
} satisfies Meta<typeof RelloUpsellNudge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const StandaloneLight: Story = {
  args: {
    seam: "pages-create-custom",
    headline: "Upgrade to Rello to create custom landing pages",
    body: "Drumbeat surfaces your Home Scout landing-page library. Building net-new custom landing pages with full pipeline tracking and revenue attribution lives in Rello.",
    ctaLabel: "Upgrade to Rello",
    onClick: () => alert("upgrade clicked"),
    onDismiss: () => alert("dismissed"),
  },
};

export const StandaloneDark: Story = {
  parameters: {
    backgrounds: { default: "dark" },
  },
  args: {
    seam: "revenue-attribution",
    headline: "Tie sends to closed-loan revenue",
    body: "Rello adds closed-loan revenue attribution + ROI per channel + per-source LTV on top of Drumbeat's touch counts.",
    ctaLabel: "Upgrade to Rello",
    onClick: () => alert("upgrade clicked"),
    onDismiss: () => alert("dismissed"),
  },
};

export const MobileNarrow: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
  args: {
    seam: "multi-channel-nurture",
    headline: "Build multi-step, multi-channel nurture",
    body: "Drip composers live in Rello + Journey Engine. Upgrade to design email + SMS + direct-mail cadences that branch on lead behavior.",
    ctaLabel: "Upgrade to Rello",
    onClick: () => alert("upgrade clicked"),
    onDismiss: () => alert("dismissed"),
  },
};

export const WithIcon: Story = {
  args: {
    seam: "full-timeline",
    headline: "See the full lead timeline",
    body: "Rello stitches your Drumbeat sends into the complete cross-app lead history — HH score, OHH check-ins, Newsletter Studio nurture, ad clicks, landing-page visits, and your manual notes — all on one timeline.",
    ctaLabel: "Upgrade to Rello",
    onClick: () => alert("upgrade clicked"),
    onDismiss: () => alert("dismissed"),
    icon: <Sparks width={20} height={20} />,
  },
};
