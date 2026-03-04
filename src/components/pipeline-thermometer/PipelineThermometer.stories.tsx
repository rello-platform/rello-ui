import type { Meta, StoryObj } from "@storybook/react";
import { PipelineThermometer } from "./PipelineThermometer";

const meta = {
  title: "Dashboard/PipelineThermometer",
  component: PipelineThermometer,
  tags: ["autodocs"],
} satisfies Meta<typeof PipelineThermometer>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleData = {
  cold: 14,
  warming: 8,
  engaged: 23,
  qualified: 11,
  hot: 6,
};

export const Default: Story = {
  args: {
    data: sampleData,
  },
};

export const WithStats: Story = {
  args: {
    title: "Pipeline Overview",
    data: sampleData,
    stats: [
      { value: "62", label: "Total Leads" },
      { value: "6", label: "Hot" },
      { value: "72%", label: "Engagement" },
    ],
    totalLabel: "Total",
  },
};

export const Empty: Story = {
  args: {
    data: { cold: 0, warming: 0, engaged: 0, qualified: 0, hot: 0 },
  },
};

export const MostlyHot: Story = {
  name: "Mostly Hot Pipeline",
  args: {
    data: { cold: 2, warming: 3, engaged: 8, qualified: 15, hot: 22 },
    title: "Top Performer",
  },
};

export const MostlyCold: Story = {
  name: "Mostly Cold Pipeline",
  args: {
    data: { cold: 35, warming: 12, engaged: 5, qualified: 2, hot: 1 },
    title: "Needs Attention",
  },
};
