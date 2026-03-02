import type { Meta, StoryObj } from "@storybook/react";
import { Search, Mail, Eye } from "iconoir-react";
import { Input } from "./Input";

const meta = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    error: { control: "text" },
    hint: { control: "text" },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Enter text...",
  },
  decorators: [(Story) => <div className="w-72"><Story /></div>],
};

export const WithLabel: Story = {
  args: {
    label: "Email Address",
    placeholder: "you@example.com",
    type: "email",
  },
  decorators: [(Story) => <div className="w-72"><Story /></div>],
};

export const WithHint: Story = {
  args: {
    label: "Username",
    placeholder: "johndoe",
    hint: "Must be at least 3 characters",
  },
  decorators: [(Story) => <div className="w-72"><Story /></div>],
};

export const WithError: Story = {
  args: {
    label: "Email Address",
    placeholder: "you@example.com",
    defaultValue: "not-an-email",
    error: "Please enter a valid email address",
  },
  decorators: [(Story) => <div className="w-72"><Story /></div>],
};

export const WithLeftIcon: Story = {
  args: {
    placeholder: "Search leads...",
    leftIcon: <Search width={16} height={16} />,
  },
  decorators: [(Story) => <div className="w-72"><Story /></div>],
};

export const WithRightIcon: Story = {
  args: {
    label: "Password",
    type: "password",
    placeholder: "Enter password",
    rightIcon: <Eye width={16} height={16} />,
  },
  decorators: [(Story) => <div className="w-72"><Story /></div>],
};

export const WithBothIcons: Story = {
  args: {
    placeholder: "you@example.com",
    leftIcon: <Mail width={16} height={16} />,
  },
  decorators: [(Story) => <div className="w-72"><Story /></div>],
};

export const Disabled: Story = {
  args: {
    label: "Read Only",
    defaultValue: "Cannot edit this",
    disabled: true,
  },
  decorators: [(Story) => <div className="w-72"><Story /></div>],
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-72">
      <Input label="Default" placeholder="Enter text..." />
      <Input label="With Hint" placeholder="Enter text..." hint="Helper text goes here" />
      <Input label="With Error" defaultValue="bad input" error="This field is invalid" />
      <Input label="Disabled" defaultValue="Cannot edit" disabled />
      <Input placeholder="With icon" leftIcon={<Search width={16} height={16} />} />
    </div>
  ),
};
