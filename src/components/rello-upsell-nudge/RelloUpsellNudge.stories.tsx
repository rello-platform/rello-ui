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

/** v2.38.0: `{{monthlyPrice}}` / `{{roiCopy}}` filled from the spoke's Rello config, plus the detail panel (`engaged`). */
export const PriceAndRoiTokens: Story = {
  args: {
    seam: "lead-ready-threshold",
    headline: "This lead is ready. So is the door.",
    body: "Marcus in Sandy upgraded mid-call when his first READY_NOW lead came through and had Pathfinder Pro export the pre-qual before they hung up. {{monthlyPrice}}/mo after trial. {{roiCopy}}",
    ctaLabel: "Start your 14-day free trial",
    monthlyPrice: "$199",
    roiCopy: "One closed loan covers a full year of platform fees.",
    details: <p>Rello spins up Pathfinder Pro for your team and pre-fills this lead's pre-qual intake.</p>,
    onClick: () => {},
    onDismiss: () => {},
    onEngaged: () => {},
  },
};

/** v2.38.0: the config values are missing. Their sentences are omitted and the nudge still renders. */
export const TokensMissing: Story = {
  args: {
    ...PriceAndRoiTokens.args,
    seam: "lead-ready-threshold",
    headline: "This lead is ready. So is the door.",
    body: PriceAndRoiTokens.args?.body ?? "",
    onClick: () => {},
    onDismiss: () => {},
    monthlyPrice: null,
    roiCopy: null,
  },
};
