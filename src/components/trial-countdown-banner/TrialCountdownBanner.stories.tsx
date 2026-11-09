import type { Meta, StoryObj } from "@storybook/react";
import { TrialCountdownBanner } from "./TrialCountdownBanner";

const HOUR = 3_600_000;
const DAY = 24 * HOUR;
const inFuture = (ms: number) => new Date(Date.now() + ms).toISOString();

const meta = {
  title: "Components/TrialCountdownBanner",
  component: TrialCountdownBanner,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof TrialCountdownBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FreshTrial: Story = {
  args: { trialEndsAt: inFuture(14 * DAY - 60_000), ctaHref: "/upgrade" },
};

export const LastTwoDaysUrgent: Story = {
  args: { trialEndsAt: inFuture(36 * HOUR), ctaHref: "/upgrade" },
};

export const LastDayHours: Story = {
  args: { trialEndsAt: inFuture(5 * HOUR), ctaHref: "/upgrade" },
};

export const LastHourMinutes: Story = {
  args: { trialEndsAt: inFuture(12 * 60_000), ctaHref: "/upgrade" },
};

export const ButtonCta: Story = {
  args: { trialEndsAt: inFuture(6 * DAY), onCtaClick: () => {}, ctaLabel: "See plans" },
};

export const NoCta: Story = {
  args: { trialEndsAt: inFuture(6 * DAY) },
};

export const MobileNarrow: Story = {
  parameters: { viewport: { defaultViewport: "mobile1" } },
  args: { trialEndsAt: inFuture(30 * HOUR), ctaHref: "/upgrade" },
};

/** Renders nothing: no trial. */
export const NoTrial: Story = {
  args: { trialEndsAt: null },
};
