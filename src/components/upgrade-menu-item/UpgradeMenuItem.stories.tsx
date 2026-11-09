import type { Meta, StoryObj } from "@storybook/react";
import { UpgradeMenuItem } from "./UpgradeMenuItem";

const meta = {
  title: "Components/UpgradeMenuItem",
  component: UpgradeMenuItem,
  tags: ["autodocs"],
  args: { href: "/upgrade", isEntitled: false, isEmbed: false },
} satisfies Meta<typeof UpgradeMenuItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Active: Story = { args: { active: true } };

export const CustomLabelNoIcon: Story = { args: { label: "Upgrade to Rello", hideIcon: true } };

export const InNavBar: Story = {
  render: (args) => (
    <nav
      aria-label="Primary"
      className="flex items-center justify-between px-4 py-2 border-b"
      style={{ borderColor: "var(--card-border, #D1D5DB)" }}
    >
      <span className="text-sm font-semibold" style={{ color: "var(--foreground, #2D3339)" }}>
        Home Ready
      </span>
      <div className="flex items-center gap-2">
        <UpgradeMenuItem {...args} />
        <span
          aria-hidden="true"
          className="inline-flex size-9 rounded-full"
          style={{ backgroundColor: "var(--neutral-100, #D1D5DB)" }}
        />
      </div>
    </nav>
  ),
};

/** Renders nothing: entitled tenants and embed mode never see it. */
export const Entitled: Story = { args: { isEntitled: true } };
export const EmbedMode: Story = { args: { isEmbed: true } };
