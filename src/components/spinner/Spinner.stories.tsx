import type { Meta, StoryObj } from "@storybook/react";
import { Spinner, InlineLoading, PageLoader, CardLoader, ButtonSpinner } from "./Spinner";
import { Button } from "../button/Button";

const meta = {
  title: "Components/Spinner",
  component: Spinner,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { size: "md" },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
        <div key={size} className="flex flex-col items-center gap-2">
          <Spinner size={size} />
          <span className="text-xs text-[var(--neutral-500)]">{size}</span>
        </div>
      ))}
    </div>
  ),
};

export const InlineLoadingStory: Story = {
  name: "Inline Loading",
  render: () => (
    <div className="w-80 border border-[var(--neutral-100)] rounded-lg">
      <InlineLoading message="Loading leads..." />
    </div>
  ),
};

export const CardLoaderStory: Story = {
  name: "Card Loader",
  render: () => (
    <div className="w-80 border border-[var(--neutral-100)] rounded-lg">
      <CardLoader message="Fetching data..." />
    </div>
  ),
};

export const PageLoaderStory: Story = {
  name: "Page Loader",
  render: () => (
    <div className="w-full h-96 border border-[var(--neutral-100)] rounded-lg overflow-hidden">
      <PageLoader message="Loading dashboard..." />
    </div>
  ),
};

export const InButton: Story = {
  name: "Button Spinner",
  render: () => (
    <div className="flex gap-3">
      <Button loading>Saving...</Button>
      <Button variant="accent" loading>Processing...</Button>
    </div>
  ),
};
