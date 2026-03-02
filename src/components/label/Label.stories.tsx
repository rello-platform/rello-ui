import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "../checkbox/Checkbox";
import { Input } from "../input/Input";
import { Label } from "./Label";

const meta = {
  title: "Components/Label",
  component: Label,
  tags: ["autodocs"],
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Label>Email Address</Label>,
};

export const WithCheckbox: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="label-checkbox" />
      <Label htmlFor="label-checkbox">Remember me</Label>
    </div>
  ),
};

export const Required: Story = {
  render: () => (
    <div className="w-72">
      <Label htmlFor="required-field">
        Full Name <span className="text-[var(--error)]">*</span>
      </Label>
    </div>
  ),
};
