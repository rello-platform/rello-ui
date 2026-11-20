import type { Meta, StoryObj } from "@storybook/react";
import { SetupProgressCard } from "./SetupProgressCard";

const steps = [
  { id: "one", label: "Step one", where: "Settings › Place one", rule: "Done when one is saved there.", done: true, href: "#one" },
  { id: "two", label: "Step two", where: "Settings › Place two", rule: "Done when two is saved there.", done: false, href: "#two" },
  { id: "three", label: "Step three", where: "Place three", rule: "Done when three is saved there.", done: false, href: "#three" },
  { id: "four", label: "Step four", where: "Place four", rule: "Done when four is saved there.", done: true, href: "#four" },
];

const meta = {
  title: "Components/Locked/SetupProgressCard",
  component: SetupProgressCard,
  tags: ["autodocs"],
  // Block flow, as on a real page (the global "centered" layout shrink-wraps a full-width banner).
  parameters: { layout: "padded" },
  args: { title: "Card title", steps },
} satisfies Meta<typeof SetupProgressCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Full: Story = {};
export const Compact: Story = { args: { compact: true }, decorators: [(S) => <div style={{ maxWidth: 360 }}><S /></div>] };
/** hideWhenComplete={false}: the finished card stays. With the default it renders nothing. */
export const AllDoneKept: Story = { args: { steps: steps.map((s) => ({ ...s, done: true })), hideWhenComplete: false } };
