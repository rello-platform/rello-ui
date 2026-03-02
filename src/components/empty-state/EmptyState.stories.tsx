import type { Meta, StoryObj } from "@storybook/react";
import { Search, UserPlus, Archive } from "iconoir-react";
import { EmptyState } from "./EmptyState";

const meta = {
  title: "Components/EmptyState",
  component: EmptyState,
  tags: ["autodocs"],
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "No results found",
    description: "Try adjusting your search or filter criteria.",
  },
};

export const WithIcon: Story = {
  args: {
    icon: <Search width={24} height={24} />,
    title: "No leads found",
    description: "We couldn't find any leads matching your search.",
  },
};

export const WithAction: Story = {
  args: {
    icon: <UserPlus width={24} height={24} />,
    title: "No contacts yet",
    description: "Get started by adding your first contact.",
    action: { label: "Add Contact", onClick: () => alert("Add contact!") },
  },
};

export const ArchivedState: Story = {
  name: "Archived Empty State",
  args: {
    icon: <Archive width={24} height={24} />,
    title: "No archived leads",
    description: "Leads you archive will appear here for future reference.",
  },
};
