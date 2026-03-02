import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "../label/Label";
import { Checkbox } from "./Checkbox";

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  argTypes: {
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  ),
};

export const Checked: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="checked" defaultChecked />
      <Label htmlFor="checked">Checked by default</Label>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Checkbox id="disabled-unchecked" disabled />
        <Label htmlFor="disabled-unchecked" className="opacity-50">Disabled unchecked</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="disabled-checked" disabled defaultChecked />
        <Label htmlFor="disabled-checked" className="opacity-50">Disabled checked</Label>
      </div>
    </div>
  ),
};

export const FormGroup: Story = {
  name: "Form Group",
  render: () => (
    <fieldset className="flex flex-col gap-3">
      <legend className="text-sm font-medium text-[var(--neutral-700)] mb-2">Notification Preferences</legend>
      <div className="flex items-center gap-2">
        <Checkbox id="email-notif" defaultChecked />
        <Label htmlFor="email-notif">Email notifications</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="sms-notif" />
        <Label htmlFor="sms-notif">SMS notifications</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="push-notif" defaultChecked />
        <Label htmlFor="push-notif">Push notifications</Label>
      </div>
    </fieldset>
  ),
};
