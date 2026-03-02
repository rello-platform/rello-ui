import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "./Textarea";

const meta = {
  title: "Components/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    error: { control: "text" },
    hint: { control: "text" },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Enter your message...",
  },
  decorators: [(Story) => <div className="w-80"><Story /></div>],
};

export const WithLabel: Story = {
  args: {
    label: "Notes",
    placeholder: "Add notes about this lead...",
  },
  decorators: [(Story) => <div className="w-80"><Story /></div>],
};

export const WithHint: Story = {
  args: {
    label: "Description",
    placeholder: "Describe the property...",
    hint: "Maximum 500 characters",
  },
  decorators: [(Story) => <div className="w-80"><Story /></div>],
};

export const WithError: Story = {
  args: {
    label: "Notes",
    defaultValue: "x",
    error: "Notes must be at least 10 characters",
  },
  decorators: [(Story) => <div className="w-80"><Story /></div>],
};

export const Disabled: Story = {
  args: {
    label: "Comments",
    defaultValue: "This field is read-only",
    disabled: true,
  },
  decorators: [(Story) => <div className="w-80"><Story /></div>],
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <Textarea label="Default" placeholder="Enter text..." />
      <Textarea label="With Hint" placeholder="Enter text..." hint="Helper text" />
      <Textarea label="With Error" defaultValue="bad" error="Field is invalid" />
      <Textarea label="Disabled" defaultValue="Read only" disabled />
    </div>
  ),
};
