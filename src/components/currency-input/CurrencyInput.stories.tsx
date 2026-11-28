import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { CurrencyInput } from "./CurrencyInput";

const meta = {
  title: "Components/Formatted inputs/CurrencyInput",
  component: CurrencyInput,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { label: "Monthly limit", onValueChange: (v) => action("onValueChange")(v) },
} satisfies Meta<typeof CurrencyInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {};
export const WithValue: Story = { args: { defaultValue: 1234.5 } };
export const WholeDollars: Story = { args: { label: "Price", cents: false, defaultValue: 450000 } };
export const AriaLabelOnly: Story = { args: { label: undefined, "aria-label": "Amount" } };
