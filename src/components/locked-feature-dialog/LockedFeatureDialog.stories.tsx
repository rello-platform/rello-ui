import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { LockedFeatureDialog } from "./LockedFeatureDialog";

const meta = {
  title: "Components/Locked/LockedFeatureDialog",
  component: LockedFeatureDialog,
  tags: ["autodocs"],
  // Block flow, as on a real page (the global "centered" layout shrink-wraps a full-width banner).
  parameters: { layout: "padded" },
  args: {
    open: true,
    onClose: () => {},
    eyebrow: "Plan Y",
    title: "Feature X is part of Plan Y",
    body: "One sentence on what it does for you.",
    primary: { label: "Primary action", onClick: () => {} },
    learnMore: { label: "Learn more", href: "https://example.com/features/x" },
    seam: "story",
  },
} satisfies Meta<typeof LockedFeatureDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {};

/** Opened from a button: Escape, × or the backdrop closes it and focus returns to the button. */
export const FromOpener: Story = {
  render: (args) => {
    const [open, setOpen] = React.useState(false);
    return (
      <>
        <button type="button" style={{ minHeight: 44 }} onClick={() => setOpen(true)}>
          Locked menu item
        </button>
        <LockedFeatureDialog {...args} open={open} onClose={() => setOpen(false)} />
      </>
    );
  },
};
