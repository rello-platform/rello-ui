import type { Meta, StoryObj } from "@storybook/react";
import { SessionRetryBanner } from "./SessionRetryBanner";

const meta = {
  title: "Components/SessionRetryBanner",
  component: SessionRetryBanner,
  tags: ["autodocs"],
  argTypes: {
    visible: { control: "boolean" },
  },
} satisfies Meta<typeof SessionRetryBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    headline: "Couldn't load your session",
    message: "Connection issue — some features may be limited.",
    onRetry: () => alert("retry"),
  },
};

export const CustomHeadline: Story = {
  args: {
    headline: "Couldn't load campaigns",
    message: "We hit a snag fetching the campaign list. Try again?",
    onRetry: () => alert("retry"),
  },
};

export const LongMessage: Story = {
  args: {
    headline: "Couldn't load your session",
    message:
      "We had trouble reaching the server and could not complete the request. Some features may be limited until the connection is restored. You can retry now or refresh the page in a moment.",
    onRetry: () => alert("retry"),
  },
};

export const Hidden: Story = {
  args: {
    headline: "You should not see this",
    message: "visible=false hides the banner entirely.",
    onRetry: () => alert("retry"),
    visible: false,
  },
};

export const CustomRetryLabel: Story = {
  args: {
    headline: "Couldn't reload feed",
    message: "The feed didn't refresh. Reload it to try again.",
    onRetry: () => alert("retry"),
    retryLabel: "Reload",
  },
};
