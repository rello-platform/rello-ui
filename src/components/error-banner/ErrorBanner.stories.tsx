import type { Meta, StoryObj } from "@storybook/react";
import { ErrorBanner } from "./ErrorBanner";

const meta = {
  title: "Components/ErrorBanner",
  component: ErrorBanner,
  tags: ["autodocs"],
} satisfies Meta<typeof ErrorBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const RetryMode: Story = {
  args: {
    headline: "Couldn't load campaigns",
    message: "We hit a snag fetching the campaign list.",
    onRetry: () => alert("retry"),
  },
};

export const ReasonMode: Story = {
  args: {
    headline: "Lead conversion data unavailable",
    reason: "This metric requires at least 7 days of activity. Check back tomorrow.",
  },
};

export const NoActionFallback: Story = {
  args: {
    headline: "Something went wrong",
  },
};

export const RetryModeCustomLabel: Story = {
  args: {
    headline: "Couldn't load enrollments",
    message: "Network timed out.",
    onRetry: () => alert("reload"),
    retryLabel: "Reload",
  },
};

export const RetryWinsWhenBothPassed: Story = {
  args: {
    headline: "Both onRetry and reason passed",
    message: "Retry mode wins (button visible).",
    reason: "This reason should not be shown.",
    onRetry: () => alert("retry"),
  },
};
