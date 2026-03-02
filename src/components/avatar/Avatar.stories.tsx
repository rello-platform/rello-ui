import type { Meta, StoryObj } from "@storybook/react";
import { Avatar, AvatarImage, AvatarFallback } from "./Avatar";

const meta = {
  title: "Components/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src="https://i.pravatar.cc/150?u=sarah" alt="Sarah Johnson" />
      <AvatarFallback>SJ</AvatarFallback>
    </Avatar>
  ),
  args: { size: "md" },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
        <div key={size} className="flex flex-col items-center gap-1">
          <Avatar size={size}>
            <AvatarImage src={`https://i.pravatar.cc/150?u=${size}`} alt={size} />
            <AvatarFallback>AB</AvatarFallback>
          </Avatar>
          <span className="text-xs text-[var(--neutral-500)]">{size}</span>
        </div>
      ))}
    </div>
  ),
};

export const WithFallback: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Avatar>
        <AvatarFallback>SK</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>MJ</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>ED</AvatarFallback>
      </Avatar>
    </div>
  ),
};

export const FallbackSizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
        <Avatar key={size} size={size}>
          <AvatarFallback>KS</AvatarFallback>
        </Avatar>
      ))}
    </div>
  ),
};

export const Group: Story = {
  name: "Avatar Group",
  render: () => (
    <div className="flex -space-x-2">
      {["sarah", "mike", "emily", "david"].map((name) => (
        <Avatar key={name} className="ring-2 ring-white">
          <AvatarImage src={`https://i.pravatar.cc/150?u=${name}`} alt={name} />
          <AvatarFallback>{name[0].toUpperCase()}</AvatarFallback>
        </Avatar>
      ))}
      <Avatar className="ring-2 ring-white">
        <AvatarFallback className="text-xs">+3</AvatarFallback>
      </Avatar>
    </div>
  ),
};
