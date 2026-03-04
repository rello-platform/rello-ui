import type { Meta, StoryObj } from "@storybook/react";
import { AppShell } from "./AppShell";
import { AppHeader } from "../app-header/AppHeader";

const meta = {
  title: "Layout/AppShell",
  component: AppShell,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof AppShell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <AppShell
      header={
        <AppHeader
          logo={<span className="font-bold text-lg">Rello</span>}
          title="Dashboard"
        />
      }
    >
      <div className="p-8">
        <p className="text-[var(--neutral-500)]">Page content goes here.</p>
      </div>
    </AppShell>
  ),
};

export const WithoutHeader: Story = {
  render: () => (
    <AppShell>
      <div className="p-8">
        <p className="text-[var(--neutral-500)]">Shell without a header.</p>
      </div>
    </AppShell>
  ),
};
