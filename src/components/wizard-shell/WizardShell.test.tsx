import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { WizardShell, type WizardStep } from "./WizardShell";

const STEPS: ReadonlyArray<WizardStep> = [
  { id: "a", label: "Step A" },
  { id: "b", label: "Step B", allowSkip: true },
  { id: "c", label: "Step C" },
];

describe("WizardShell", () => {
  it("renders the active step's label and description", () => {
    render(
      <WizardShell
        steps={[{ id: "a", label: "Step A", description: "first step" }]}
        currentStep={0}
        onStepChange={() => {}}
        onComplete={() => {}}
      >
        <div>body</div>
      </WizardShell>,
    );
    expect(screen.getByText("Step A")).toBeInTheDocument();
    expect(screen.getByText("first step")).toBeInTheDocument();
  });

  it("Continue advances to next step via onStepChange", async () => {
    const user = userEvent.setup();
    const onStepChange = vi.fn();
    render(
      <WizardShell
        steps={STEPS}
        currentStep={0}
        onStepChange={onStepChange}
        onComplete={() => {}}
      >
        <div>body</div>
      </WizardShell>,
    );
    await user.click(screen.getByRole("button", { name: "Continue" }));
    expect(onStepChange).toHaveBeenCalledWith(1);
  });

  it("renders Finish (not Continue) on last step and fires onComplete", async () => {
    const user = userEvent.setup();
    const onComplete = vi.fn();
    render(
      <WizardShell
        steps={STEPS}
        currentStep={2}
        onStepChange={() => {}}
        onComplete={onComplete}
      >
        <div>body</div>
      </WizardShell>,
    );
    expect(screen.queryByRole("button", { name: "Continue" })).toBeNull();
    await user.click(screen.getByRole("button", { name: "Finish" }));
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it("Skip button only renders when allowSkip is true and not last step", () => {
    const { rerender } = render(
      <WizardShell
        steps={STEPS}
        currentStep={0}
        onStepChange={() => {}}
        onComplete={() => {}}
      >
        <div>body</div>
      </WizardShell>,
    );
    expect(screen.queryByRole("button", { name: "Skip" })).toBeNull();

    rerender(
      <WizardShell
        steps={STEPS}
        currentStep={1}
        onStepChange={() => {}}
        onComplete={() => {}}
      >
        <div>body</div>
      </WizardShell>,
    );
    expect(screen.getByRole("button", { name: "Skip" })).toBeInTheDocument();

    rerender(
      <WizardShell
        steps={STEPS}
        currentStep={2}
        onStepChange={() => {}}
        onComplete={() => {}}
      >
        <div>body</div>
      </WizardShell>,
    );
    expect(screen.queryByRole("button", { name: "Skip" })).toBeNull();
  });

  it("Back not rendered on first step", () => {
    render(
      <WizardShell
        steps={STEPS}
        currentStep={0}
        onStepChange={() => {}}
        onComplete={() => {}}
      >
        <div>body</div>
      </WizardShell>,
    );
    expect(screen.queryByRole("button", { name: "Back" })).toBeNull();
  });

  it("clamps negative currentStep to 0", () => {
    render(
      <WizardShell
        steps={STEPS}
        currentStep={-5}
        onStepChange={() => {}}
        onComplete={() => {}}
      >
        <div>body</div>
      </WizardShell>,
    );
    expect(screen.getByText("Step A")).toBeInTheDocument();
    expect(screen.getByText(/Step 1 of 3/)).toBeInTheDocument();
  });

  it("clamps overflow currentStep to last step", () => {
    render(
      <WizardShell
        steps={STEPS}
        currentStep={99}
        onStepChange={() => {}}
        onComplete={() => {}}
      >
        <div>body</div>
      </WizardShell>,
    );
    expect(screen.getByText("Step C")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Finish" })).toBeInTheDocument();
  });

  it("empty steps renders without crashing; Finish button completes", async () => {
    const user = userEvent.setup();
    const onComplete = vi.fn();
    render(
      <WizardShell
        steps={[]}
        currentStep={0}
        onStepChange={() => {}}
        onComplete={onComplete}
      >
        <div>body</div>
      </WizardShell>,
    );
    await user.click(screen.getByRole("button", { name: "Finish" }));
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it("disableContinue blocks the continue button", () => {
    render(
      <WizardShell
        steps={STEPS}
        currentStep={0}
        onStepChange={() => {}}
        onComplete={() => {}}
        disableContinue
      >
        <div>body</div>
      </WizardShell>,
    );
    expect(screen.getByRole("button", { name: "Continue" })).toBeDisabled();
  });

  it("autosaveStatus saving renders Saving… badge", () => {
    render(
      <WizardShell
        steps={STEPS}
        currentStep={0}
        autosaveStatus="saving"
        onStepChange={() => {}}
        onComplete={() => {}}
      >
        <div>body</div>
      </WizardShell>,
    );
    expect(screen.getByText("Saving…")).toBeInTheDocument();
  });

  it("autosaveStatus error renders Save failed — retry badge", () => {
    render(
      <WizardShell
        steps={STEPS}
        currentStep={0}
        autosaveStatus="error"
        onStepChange={() => {}}
        onComplete={() => {}}
      >
        <div>body</div>
      </WizardShell>,
    );
    expect(screen.getByText(/Save failed/)).toBeInTheDocument();
  });
});
