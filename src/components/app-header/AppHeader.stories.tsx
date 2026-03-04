import type { Meta, StoryObj } from "@storybook/react";
import { Bell, Menu, Search } from "iconoir-react";
import { AppHeader, AppHeaderAction, AppHeaderDivider } from "./AppHeader";

const ICON = { width: 20, height: 20, strokeWidth: 1.5 };

const meta = {
  title: "Layout/AppHeader",
  component: AppHeader,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof AppHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <AppHeader
      logo={<span className="font-bold text-lg">Rello</span>}
      title="MLO Command Center"
    />
  ),
};

export const WithActions: Story = {
  render: () => (
    <AppHeader
      logo={<span className="font-bold text-lg">Rello</span>}
      rightSlot={
        <>
          <AppHeaderAction aria-label="Search">
            <Search {...ICON} />
          </AppHeaderAction>
          <AppHeaderAction aria-label="Notifications" dot>
            <Bell {...ICON} />
          </AppHeaderAction>
          <AppHeaderAction aria-label="Menu">
            <Menu {...ICON} />
          </AppHeaderAction>
        </>
      }
    />
  ),
};

export const WithSlots: Story = {
  name: "Logo + Left Slot + Right Slot",
  render: () => (
    <AppHeader
      logo={<span className="font-bold text-lg">Rello</span>}
      leftSlot={
        <>
          <AppHeaderDivider />
          <span className="text-sm text-[var(--neutral-500)]">Deal Room</span>
        </>
      }
      rightSlot={
        <div className="flex items-center gap-2 text-sm text-[var(--neutral-500)]">
          <span>Kelly Sansom</span>
          <AppHeaderAction aria-label="Menu">
            <Menu {...ICON} />
          </AppHeaderAction>
        </div>
      }
    />
  ),
};

export const NotificationDot: Story = {
  name: "Action with Notification Dot",
  render: () => (
    <div className="flex gap-2 p-4">
      <AppHeaderAction aria-label="No notifications">
        <Bell {...ICON} />
      </AppHeaderAction>
      <AppHeaderAction aria-label="Has notifications" dot>
        <Bell {...ICON} />
      </AppHeaderAction>
    </div>
  ),
  parameters: { layout: "centered" },
};
