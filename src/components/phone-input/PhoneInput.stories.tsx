import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { PhoneInput } from "./PhoneInput";

const meta = {
  title: "Components/Formatted inputs/PhoneInput",
  component: PhoneInput,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { label: "Mobile phone", onValueChange: (v) => action("onValueChange")(v) },
} satisfies Meta<typeof PhoneInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {};
export const WithValue: Story = { args: { defaultValue: "+18015550123" } };
export const WithError: Story = { args: { defaultValue: "+18015550123", error: "This number can't receive texts" } };
export const AriaLabelOnly: Story = { args: { label: undefined, "aria-label": "Mobile phone" } };
