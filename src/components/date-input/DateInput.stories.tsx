import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { DateInput } from "./DateInput";

const meta = {
  title: "Components/Formatted inputs/DateInput",
  component: DateInput,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { label: "Closing date", onValueChange: (v) => action("onValueChange")(v) },
} satisfies Meta<typeof DateInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {};
export const WithValue: Story = { args: { defaultValue: "2026-12-31" } };
export const WithHint: Story = { args: { hint: "The date on your closing disclosure" } };
export const AriaLabelOnly: Story = { args: { label: undefined, "aria-label": "Closing date" } };
