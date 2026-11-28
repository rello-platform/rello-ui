import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { UrlInput } from "./UrlInput";

const meta = {
  title: "Components/Formatted inputs/UrlInput",
  component: UrlInput,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { label: "Website", onValueChange: (v) => action("onValueChange")(v) },
} satisfies Meta<typeof UrlInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = { args: { placeholder: "example.com" } };
export const WithValue: Story = { args: { defaultValue: "https://example.com" } };
export const AriaLabelOnly: Story = { args: { label: undefined, "aria-label": "Website" } };
