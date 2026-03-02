import type { Meta, StoryObj } from "@storybook/react";
import { Mail, Plus, ArrowRight } from "iconoir-react";
import { Button } from "./Button";

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "accent", "ghost", "danger", "outline", "link"],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl", "icon", "icon-sm", "icon-lg"],
    },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
    fullWidth: { control: "boolean" },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Button",
    variant: "primary",
    size: "md",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="accent">Accent</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="xs">Extra Small</Button>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
    </div>
  ),
};

export const IconSizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Button size="icon-sm" variant="ghost"><Plus /></Button>
      <Button size="icon" variant="ghost"><Plus /></Button>
      <Button size="icon-lg" variant="ghost"><Plus /></Button>
    </div>
  ),
};

export const WithLeftIcon: Story = {
  args: {
    children: "Send Email",
    leftIcon: <Mail width={16} height={16} />,
  },
};

export const WithRightIcon: Story = {
  args: {
    children: "Continue",
    rightIcon: <ArrowRight width={16} height={16} />,
  },
};

export const Loading: Story = {
  args: {
    children: "Saving...",
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    children: "Disabled",
    disabled: true,
  },
};

export const FullWidth: Story = {
  args: {
    children: "Full Width Button",
    fullWidth: true,
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
};

export const AllVariantsDisabled: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="primary" disabled>Primary</Button>
      <Button variant="secondary" disabled>Secondary</Button>
      <Button variant="accent" disabled>Accent</Button>
      <Button variant="ghost" disabled>Ghost</Button>
      <Button variant="danger" disabled>Danger</Button>
      <Button variant="outline" disabled>Outline</Button>
    </div>
  ),
};
