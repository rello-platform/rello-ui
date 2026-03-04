import type { Meta, StoryObj } from "@storybook/react";
import { Mail, Phone, GraphUp, UserCircle } from "iconoir-react";
import { CategorySection } from "./CategorySection";
import { AppCard } from "./AppCard";

const ICON = { width: 20, height: 20, strokeWidth: 1.5 };

const meta = {
  title: "Dashboard/CategorySection",
  component: CategorySection,
  tags: ["autodocs"],
} satisfies Meta<typeof CategorySection>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleApps = [
  {
    icon: <Mail {...ICON} />,
    title: "Newsletter Studio",
    status: "Active",
    statusVariant: "success" as const,
    value: "2,450",
    valueLabel: "subscribers",
    description: "Automated email campaigns and nurture sequences",
  },
  {
    icon: <Phone {...ICON} />,
    title: "Call Tracker",
    status: "Active",
    statusVariant: "success" as const,
    value: "18",
    valueLabel: "calls this week",
    description: "Track and log all client calls and follow-ups",
  },
  {
    icon: <GraphUp {...ICON} />,
    title: "Market Intel",
    status: "Beta",
    statusVariant: "warning" as const,
    value: "3",
    valueLabel: "reports",
    description: "Neighborhood and market analysis reports",
    subtext: "New report available",
  },
];

export const Default: Story = {
  args: {
    id: "engagement",
    title: "Engagement Tools",
    subtitle: "Communicate and connect with leads",
    icon: <Mail {...ICON} />,
    iconBg: "var(--brand-primary-light)",
    iconColor: "var(--brand-primary)",
    apps: sampleApps,
  },
};

export const Expanded: Story = {
  args: {
    ...Default.args,
    defaultExpanded: true,
  },
};

export const AppCardStandalone: Story = {
  name: "AppCard (standalone)",
  render: () => (
    <div className="grid grid-cols-3 gap-3 max-w-3xl">
      <AppCard
        icon={<UserCircle {...ICON} />}
        title="Home Ready"
        status="Active"
        statusVariant="success"
        value={42}
        valueLabel="leads enrolled"
        description="Buyer readiness portal with milestone tracking"
      />
      <AppCard
        icon={<GraphUp {...ICON} />}
        title="Home Stretch"
        status="Coming Soon"
        statusVariant="info"
        value={0}
        valueLabel="leads"
        description="Post-close engagement and referral generation"
        subtext="Launching Q2"
      />
      <AppCard
        icon={<Mail {...ICON} />}
        title="Newsletter Studio"
        status="Active"
        statusVariant="success"
        value="1,200"
        valueLabel="subscribers"
        description="Automated drip campaigns"
        large={false}
      />
    </div>
  ),
};
