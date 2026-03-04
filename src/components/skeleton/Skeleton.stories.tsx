import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton, SkeletonCircle, SkeletonText, SkeletonStyles } from "./Skeleton";

const meta = {
  title: "Components/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <>
        <SkeletonStyles />
        <Story />
      </>
    ),
  ],
  parameters: { layout: "centered" },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Base skeleton element */
export const Default: Story = {
  render: () => (
    <div className="w-64">
      <Skeleton height="1rem" />
    </div>
  ),
};

/** Circle placeholder for avatars */
export const Circle: Story = {
  render: () => (
    <div className="flex gap-3">
      <SkeletonCircle size={32} />
      <SkeletonCircle size={40} />
      <SkeletonCircle size={48} />
    </div>
  ),
};

/** Multi-line text placeholder */
export const TextBlock: Story = {
  render: () => (
    <div className="w-64">
      <SkeletonText lines={3} lastLineWidth={60} />
    </div>
  ),
};

/** Card skeleton — typical lead card loading state */
export const CardSkeleton: Story = {
  name: "Card Loading",
  render: () => (
    <div className="w-80 bg-white rounded-lg border border-[var(--neutral-100)] p-4">
      <div className="flex items-start gap-3">
        <SkeletonCircle size={40} />
        <div className="flex-1 space-y-2">
          <Skeleton height={16} width="33%" />
          <Skeleton height={12} width="66%" />
        </div>
        <Skeleton height={20} width={64} radius="9999px" />
      </div>
      <div className="mt-3">
        <SkeletonText lines={2} lineHeight={12} gap={8} lastLineWidth={80} />
      </div>
    </div>
  ),
};

/** Table skeleton — loading rows */
export const TableSkeleton: Story = {
  name: "Table Loading",
  render: () => (
    <div className="w-[500px] bg-white rounded-lg border border-[var(--neutral-100)] overflow-hidden">
      {/* Header */}
      <div className="p-3 border-b border-[var(--neutral-100)] flex gap-4">
        <Skeleton height={12} width={96} />
        <Skeleton height={12} width={128} />
        <Skeleton height={12} width={64} />
        <Skeleton height={12} width={48} />
      </div>
      {/* Rows */}
      {[1, 2, 3].map((i) => (
        <div key={i} className="p-3 border-b border-[var(--neutral-100)] last:border-0 flex gap-4 items-center">
          <SkeletonCircle size={32} />
          <Skeleton height={12} width={112} />
          <Skeleton height={12} width={144} />
          <Skeleton height={20} width={64} radius="9999px" />
          <Skeleton height={12} width={40} className="ml-auto" />
        </div>
      ))}
    </div>
  ),
};

/** Toggle between skeleton and real content */
export const LoadingToggle: Story = {
  name: "Loading → Content",
  render: () => {
    const [loading, setLoading] = useState(true);

    return (
      <div className="w-80">
        <button
          onClick={() => setLoading(!loading)}
          className="mb-4 px-3 py-1.5 text-xs rounded-md bg-[var(--brand-primary)] text-white font-medium hover:opacity-90 transition-opacity"
        >
          {loading ? "Show Content" : "Show Skeleton"}
        </button>

        {loading ? (
          <div className="bg-white rounded-lg border border-[var(--neutral-100)] p-4">
            <div className="flex items-start gap-3">
              <SkeletonCircle size={40} />
              <div className="flex-1 space-y-2">
                <Skeleton height={16} width="33%" />
                <Skeleton height={12} width="66%" />
              </div>
            </div>
            <div className="mt-3">
              <SkeletonText lines={2} />
            </div>
          </div>
        ) : (
          <div
            className="bg-white rounded-lg border border-[var(--neutral-100)] p-4"
            style={{ animation: "stagger-fade 300ms ease-out both" }}
          >
            <style>{`@keyframes stagger-fade { from { opacity: 0; transform: translateY(8px); } }`}</style>
            <div className="flex items-start gap-3">
              <div className="size-10 rounded-full bg-[var(--brand-primary-light)] flex items-center justify-center text-sm font-medium text-[var(--brand-primary)]">
                SJ
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-[var(--foreground)]">Sarah Johnson</p>
                <p className="text-xs text-[var(--neutral-500)]">sarah@example.com</p>
              </div>
            </div>
            <p className="mt-3 text-xs text-[var(--neutral-500)]">
              Last contacted 2 hours ago. Score: 92/100. Ready to close.
            </p>
          </div>
        )}
      </div>
    );
  },
};
