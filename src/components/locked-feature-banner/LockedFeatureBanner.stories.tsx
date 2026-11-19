import type { Meta, StoryObj } from "@storybook/react";
import { LockedFeatureBanner } from "./LockedFeatureBanner";

// Placeholder words only: spokes pass their own (PFP reads them from @rello-platform/upgrade-content).
const meta = {
  title: "Components/Locked/LockedFeatureBanner",
  component: LockedFeatureBanner,
  tags: ["autodocs"],
  // Block flow, as on a real page (the global "centered" layout shrink-wraps a full-width banner).
  parameters: { layout: "padded" },
  args: {
    title: "Feature X is part of Plan Y.",
    body: "One sentence on what it does for you. Below is a preview.",
    primary: { label: "Primary action", href: "#" },
    learnMore: { label: "Learn more", href: "https://example.com/features/x" },
    seam: "story",
  },
} satisfies Meta<typeof LockedFeatureBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Page: Story = { args: { variant: "page" } };
export const Section: Story = { args: { variant: "section" } };
export const Card: Story = { args: { variant: "card" }, decorators: [(S) => <div style={{ maxWidth: 320 }}><S /></div>] };
export const HandlerPrimaryNoLearnMore: Story = {
  args: { variant: "section", primary: { label: "Primary action", onClick: () => {} }, learnMore: undefined },
};
