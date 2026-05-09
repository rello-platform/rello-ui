import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { WizardShell, type WizardStep } from "./WizardShell";

const STEPS: ReadonlyArray<WizardStep> = [
  { id: "intro", label: "Tell us about you", description: "A few quick basics so we can personalize." },
  { id: "samples", label: "Add writing samples", description: "Paste 1–3 things you've written.", allowSkip: true },
  { id: "review", label: "Review and finish", description: "Looks good? You're done." },
];

function Controlled(args: React.ComponentProps<typeof WizardShell>) {
  const [step, setStep] = React.useState(args.currentStep ?? 0);
  return (
    <div className="max-w-xl">
      <WizardShell
        {...args}
        currentStep={step}
        onStepChange={setStep}
        onComplete={() => alert("complete")}
      >
        <div className="rounded-md border p-4 text-sm" style={{ borderColor: "var(--card-border, #e5e7eb)" }}>
          Step body for: <strong>{STEPS[step]?.label}</strong>
        </div>
      </WizardShell>
    </div>
  );
}

const meta = {
  title: "Components/WizardShell",
  component: WizardShell,
  tags: ["autodocs"],
} satisfies Meta<typeof WizardShell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    steps: STEPS,
    currentStep: 0,
    onStepChange: () => {},
    onComplete: () => {},
    children: null,
  },
  render: (args) => <Controlled {...args} />,
};

export const MidWizardWithSkip: Story = {
  args: {
    steps: STEPS,
    currentStep: 1,
    onStepChange: () => {},
    onComplete: () => {},
    children: null,
  },
  render: (args) => <Controlled {...args} />,
};

export const LastStep: Story = {
  args: {
    steps: STEPS,
    currentStep: 2,
    onStepChange: () => {},
    onComplete: () => {},
    children: null,
  },
  render: (args) => <Controlled {...args} />,
};

export const Saving: Story = {
  args: {
    steps: STEPS,
    currentStep: 0,
    autosaveStatus: "saving",
    onStepChange: () => {},
    onComplete: () => {},
    children: null,
  },
  render: (args) => <Controlled {...args} />,
};

export const Saved: Story = {
  args: {
    steps: STEPS,
    currentStep: 0,
    autosaveStatus: "saved",
    onStepChange: () => {},
    onComplete: () => {},
    children: null,
  },
  render: (args) => <Controlled {...args} />,
};

export const SaveFailed: Story = {
  args: {
    steps: STEPS,
    currentStep: 0,
    autosaveStatus: "error",
    onStepChange: () => {},
    onComplete: () => {},
    children: null,
  },
  render: (args) => <Controlled {...args} />,
};

export const ContinueDisabled: Story = {
  args: {
    steps: STEPS,
    currentStep: 0,
    disableContinue: true,
    onStepChange: () => {},
    onComplete: () => {},
    children: null,
  },
  render: (args) => <Controlled {...args} />,
};
