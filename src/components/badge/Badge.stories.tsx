import type { Meta, StoryObj } from "@storybook/react";
import { FireFlame, CheckCircle, WarningTriangle } from "iconoir-react";
import { Badge } from "./Badge";

const meta = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default", "primary", "accent", "success", "warning", "error", "info",
        "hot", "qualified", "engaged", "warming", "cold",
      ],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg"],
    },
    dot: { control: "boolean" },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Badge",
    variant: "default",
    size: "md",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="accent">Accent</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="info">Info</Badge>
    </div>
  ),
};

export const PipelineStages: Story = {
  name: "Pipeline Stages",
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="hot">Hot</Badge>
      <Badge variant="qualified">Qualified</Badge>
      <Badge variant="engaged">Engaged</Badge>
      <Badge variant="warming">Warming</Badge>
      <Badge variant="cold">Cold</Badge>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge size="xs">Extra Small</Badge>
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  ),
};

export const WithDot: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="success" dot>Active</Badge>
      <Badge variant="warning" dot>Pending</Badge>
      <Badge variant="error" dot>Overdue</Badge>
      <Badge variant="cold" dot>Inactive</Badge>
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="hot" icon={<FireFlame width={12} height={12} />}>Hot Lead</Badge>
      <Badge variant="success" icon={<CheckCircle width={12} height={12} />}>Verified</Badge>
      <Badge variant="warning" icon={<WarningTriangle width={12} height={12} />}>Needs Review</Badge>
    </div>
  ),
};

export const PipelineStagesWithDot: Story = {
  name: "Pipeline with Dot Indicators",
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Badge variant="hot" dot size="sm">Hot</Badge>
        <span className="text-sm text-[var(--neutral-500)]">— Ready to close, immediate follow-up</span>
      </div>
      <div className="flex items-center gap-2">
        <Badge variant="qualified" dot size="sm">Qualified</Badge>
        <span className="text-sm text-[var(--neutral-500)]">— Meets criteria, active conversations</span>
      </div>
      <div className="flex items-center gap-2">
        <Badge variant="engaged" dot size="sm">Engaged</Badge>
        <span className="text-sm text-[var(--neutral-500)]">— Responding, needs nurturing</span>
      </div>
      <div className="flex items-center gap-2">
        <Badge variant="warming" dot size="sm">Warming</Badge>
        <span className="text-sm text-[var(--neutral-500)]">— Early interest, building rapport</span>
      </div>
      <div className="flex items-center gap-2">
        <Badge variant="cold" dot size="sm">Cold</Badge>
        <span className="text-sm text-[var(--neutral-500)]">— No recent activity, re-engagement needed</span>
      </div>
    </div>
  ),
};
