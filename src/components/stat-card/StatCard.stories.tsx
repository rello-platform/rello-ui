import type { Meta, StoryObj } from "@storybook/react";
import { User, FireFlame, GraphUp, Activity } from "iconoir-react";
import { StatCard } from "./StatCard";

const ICON = { width: 20, height: 20, strokeWidth: 1.5 };

const meta = {
  title: "Dashboard/StatCard",
  component: StatCard,
  tags: ["autodocs"],
} satisfies Meta<typeof StatCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Total Leads",
    value: 128,
    icon: <User {...ICON} />,
    color: "var(--brand-primary)",
  },
};

export const WithSubtitle: Story = {
  args: {
    label: "Hot Leads",
    value: 23,
    icon: <FireFlame {...ICON} />,
    color: "var(--hot)",
    subtitle: "Score 80+",
  },
};

export const StatsRow: Story = {
  name: "Dashboard Stats Row",
  render: () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <StatCard label="Total Leads" value={128} icon={<User {...ICON} />} color="var(--brand-primary)" />
      <StatCard label="Hot Leads" value={23} icon={<FireFlame {...ICON} />} color="var(--hot)" subtitle="Score 80+" />
      <StatCard label="Nurturing" value={45} icon={<GraphUp {...ICON} />} color="#F59E0B" />
      <StatCard label="Application" value={12} icon={<Activity {...ICON} />} color="#8B5CF6" />
    </div>
  ),
};
