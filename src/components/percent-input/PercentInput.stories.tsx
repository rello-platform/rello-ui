import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { PercentInput } from "./PercentInput";

const meta = {
  title: "Components/Formatted inputs/PercentInput",
  component: PercentInput,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { label: "Interest rate", onValueChange: (v) => action("onValueChange")(v) },
} satisfies Meta<typeof PercentInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {};
export const WithValue: Story = { args: { defaultValue: 6.875 } };
export const OutOfRange: Story = { args: { label: "Down payment", defaultValue: 120 } };
export const AriaLabelOnly: Story = { args: { label: undefined, "aria-label": "Interest rate" } };
