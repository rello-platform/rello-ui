import type { Meta, StoryObj } from "@storybook/react";
import { TodaySchedule } from "./TodaySchedule";

const meta = {
  title: "Dashboard/TodaySchedule",
  component: TodaySchedule,
  tags: ["autodocs"],
} satisfies Meta<typeof TodaySchedule>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { time: "9:00 AM", event: "Team standup" },
      { time: "10:30 AM", event: "Call with Sarah Johnson" },
      { time: "1:00 PM", event: "Loan review — Martinez file" },
      { time: "3:30 PM", event: "Follow up with new leads" },
    ],
  },
};

export const WithViewAll: Story = {
  args: {
    items: [
      { time: "9:00 AM", event: "Morning pipeline review" },
      { time: "11:00 AM", event: "Client meeting" },
      { time: "2:00 PM", event: "Training session" },
    ],
    onViewAll: () => alert("View all clicked"),
  },
};

export const CustomDate: Story = {
  args: {
    date: "Friday, March 7",
    items: [
      { time: "10:00 AM", event: "Closing — Thompson residence" },
      { time: "2:00 PM", event: "Open house prep" },
    ],
  },
};

export const Empty: Story = {
  args: {
    items: [],
  },
};
