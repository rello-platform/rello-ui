import type { Meta, StoryObj } from "@storybook/react";
import { LockedBadge } from "./LockedBadge";

const meta = {
  title: "Components/Locked/LockedBadge",
  component: LockedBadge,
  tags: ["autodocs"],
  // Block flow, as on a real page (the global "centered" layout shrink-wraps a full-width banner).
  parameters: { layout: "padded" },
  args: { label: "Plan Y" },
} satisfies Meta<typeof LockedBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = { args: { size: "sm" } };
export const Medium: Story = { args: { size: "md" } };
export const AddOn: Story = { args: { size: "sm", label: "Add-on" } };
