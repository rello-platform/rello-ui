import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { TrialStartModal, type TrialStartModalProps } from "./TrialStartModal";
import type { TrialStartResult } from "./types";

const later = (days: number) => new Date(Date.now() + days * 86_400_000).toISOString();
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function Demo(props: Omit<TrialStartModalProps, "open" | "onClose">) {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="min-h-[44px] px-4 rounded-md text-sm font-medium"
        style={{ backgroundColor: "var(--brand-primary, #3B5998)", color: "var(--brand-primary-foreground, #FFFFFF)" }}
      >
        Start your 14-day free trial
      </button>
      <TrialStartModal {...props} open={open} onClose={() => setOpen(false)} />
    </>
  );
}

const meta = {
  title: "Components/TrialStartModal",
  component: TrialStartModal,
  tags: ["autodocs"],
  args: { open: false, onClose: () => {}, onConfirm: async () => ({ status: "started" }), upgradeHref: "/upgrade" },
} satisfies Meta<typeof TrialStartModal>;

export default meta;
type Story = StoryObj<typeof meta>;

const started = async (): Promise<TrialStartResult> => {
  await wait(1200);
  return { status: "started", trialEndsAt: later(14) };
};

export const Success: Story = {
  render: () => (
    <Demo
      onConfirm={started}
      upgradeHref="/upgrade"
      description="You'll have full Rello free for 14 days. We'll spin up Pathfinder Pro and pre-fill Jordan's pre-qual intake right now."
      successAction={{ label: "Open Pathfinder Pro intake", href: "#pfp-intake" }}
    />
  ),
};

export const AlreadyUsed409: Story = {
  render: () => (
    <Demo
      onConfirm={async () => {
        await wait(800);
        return { status: "already-used", trialEndsAt: "2026-10-01T18:00:00.000Z" };
      }}
      upgradeHref="/billing/upgrade"
    />
  ),
};

export const ErrorThenRetry: Story = {
  render: () => {
    let calls = 0;
    return (
      <Demo
        onConfirm={async () => {
          calls += 1;
          await wait(800);
          if (calls === 1) throw new Error("network down");
          return { status: "started", trialEndsAt: later(14) };
        }}
        upgradeHref="/upgrade"
      />
    );
  },
};

export const ErrorMessage: Story = {
  render: () => (
    <Demo
      onConfirm={async () => ({ status: "error", message: "Rello is down for maintenance." })}
      upgradeHref="/upgrade"
    />
  ),
};
