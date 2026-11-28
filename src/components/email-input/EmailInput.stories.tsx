import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { EmailInput } from "./EmailInput";

const meta = {
  title: "Components/Formatted inputs/EmailInput",
  component: EmailInput,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { label: "Email", onValueChange: (v) => action("onValueChange")(v) },
} satisfies Meta<typeof EmailInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {};
export const WithValue: Story = { args: { defaultValue: "dave@example.com" } };
export const WithError: Story = { args: { error: "Enter an email address" } };
export const AriaLabelOnly: Story = { args: { label: undefined, "aria-label": "Email" } };
