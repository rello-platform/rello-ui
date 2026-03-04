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
  LEAD: 42,
  NURTURING: 28,
  APPLICATION: 15,
  PROCESSING: 8,
  CLOSED_WON: 12,
  CLOSED_LOST: 5,
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
      { value: "110", label: "Total Leads" },
      { value: "23", label: "Hot (80+)" },
      { value: "15", label: "Application" },
    ],
    totalLabel: "Total",
  },
};

export const Empty: Story = {
  args: {
    data: { LEAD: 0, NURTURING: 0, APPLICATION: 0, PROCESSING: 0, CLOSED_WON: 0, CLOSED_LOST: 0 },
  },
};

export const SingleStage: Story = {
  name: "Single Stage Dominant",
  args: {
    data: { LEAD: 85, NURTURING: 5, APPLICATION: 3, PROCESSING: 2, CLOSED_WON: 4, CLOSED_LOST: 1 },
    title: "New Pipeline",
  },
};
