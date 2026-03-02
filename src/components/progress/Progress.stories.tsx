import type { Meta, StoryObj } from "@storybook/react";
import { Progress } from "./Progress";

const meta = {
  title: "Components/Progress",
  component: Progress,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "success", "warning", "error", "hot", "cold"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    value: {
      control: { type: "range", min: 0, max: 100, step: 5 },
    },
  },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { value: 60 },
  decorators: [(Story) => <div className="w-64"><Story /></div>],
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-64">
      {(["default", "success", "warning", "error", "hot", "cold"] as const).map((variant) => (
        <div key={variant} className="flex flex-col gap-1">
          <span className="text-xs text-[var(--neutral-500)] capitalize">{variant}</span>
          <Progress variant={variant} value={65} />
        </div>
      ))}
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-64">
      {(["sm", "md", "lg"] as const).map((size) => (
        <div key={size} className="flex flex-col gap-1">
          <span className="text-xs text-[var(--neutral-500)]">size="{size}"</span>
          <Progress size={size} value={50} />
        </div>
      ))}
    </div>
  ),
};

export const ProgressValues: Story = {
  name: "Progress Values",
  render: () => (
    <div className="flex flex-col gap-3 w-64">
      {[0, 25, 50, 75, 100].map((val) => (
        <div key={val} className="flex items-center gap-3">
          <span className="text-xs text-[var(--neutral-500)] w-8 text-right">{val}%</span>
          <Progress value={val} className="flex-1" />
        </div>
      ))}
    </div>
  ),
};

export const LeadScore: Story = {
  name: "Lead Score Example",
  render: () => (
    <div className="flex flex-col gap-2 w-72">
      <div className="flex justify-between">
        <span className="text-sm font-medium text-[var(--foreground)]">Lead Score</span>
        <span className="text-sm font-medium text-[var(--hot)]">85/100</span>
      </div>
      <Progress variant="hot" value={85} size="lg" />
    </div>
  ),
};
