import type { Meta, StoryObj } from "@storybook/react";
import { DragHint } from "./DragHint";

const meta = {
  title: "Dashboard/DragHint",
  component: DragHint,
  tags: ["autodocs"],
} satisfies Meta<typeof DragHint>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomMessage: Story = {
  args: {
    message: "Hold and drag to reorder categories",
  },
};
