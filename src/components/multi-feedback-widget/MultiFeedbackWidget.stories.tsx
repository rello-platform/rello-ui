import type { Meta, StoryObj } from "@storybook/react";
import { MultiFeedbackWidget, type MultiFeedbackOption } from "./MultiFeedbackWidget";

const VOICE_OPTIONS: ReadonlyArray<MultiFeedbackOption> = [
  { key: "spot-on", label: "👍 Spot on" },
  { key: "off", label: "👎 Doesn't sound like me", requiresCorrectionText: true },
  { key: "tweak", label: "✏ Tweak it", requiresCorrectionText: true },
];

const meta = {
  title: "Components/MultiFeedbackWidget",
  component: MultiFeedbackWidget,
  tags: ["autodocs"],
} satisfies Meta<typeof MultiFeedbackWidget>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    prompt: "How does this sound?",
    options: VOICE_OPTIONS,
    onSelect: (key, text) => alert(`${key}${text ? `: ${text}` : ""}`),
  },
};

export const Compact: Story = {
  args: {
    prompt: "How does this sound?",
    options: VOICE_OPTIONS,
    variant: "compact",
    onSelect: (key, text) => alert(`${key}${text ? `: ${text}` : ""}`),
  },
};

export const Inline: Story = {
  args: {
    prompt: "How does this sound?",
    options: VOICE_OPTIONS,
    variant: "inline",
    onSelect: (key, text) => alert(`${key}${text ? `: ${text}` : ""}`),
  },
};

export const Disabled: Story = {
  args: {
    prompt: "How does this sound?",
    options: VOICE_OPTIONS,
    disabled: true,
    onSelect: () => {},
  },
};

export const SimpleNoPrompt: Story = {
  args: {
    options: [
      { key: "yes", label: "Yes" },
      { key: "no", label: "No" },
    ],
    onSelect: (key) => alert(key),
  },
};
