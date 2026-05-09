"use client";

import * as React from "react";
import { Button } from "../button/Button";
import { Badge } from "../badge/Badge";
import { SegmentedProgress } from "../segmented-progress/SegmentedProgress";
import { cn } from "../../lib/cn";

export interface WizardStep {
  id: string;
  label: string;
  description?: string;
  allowSkip?: boolean;
}

export type WizardAutosaveStatus = "idle" | "saving" | "saved" | "error";

export interface WizardShellProps {
  steps: ReadonlyArray<WizardStep>;
  currentStep: number;
  onStepChange: (nextStep: number) => void;
  onComplete: () => void;
  autosaveStatus?: WizardAutosaveStatus;
  children: React.ReactNode;
  backLabel?: string;
  continueLabel?: string;
  skipLabel?: string;
  completeLabel?: string;
  disableContinue?: boolean;
  className?: string;
}

function clampStep(currentStep: number, total: number): number {
  if (total <= 0) return 0;
  if (currentStep < 0) return 0;
  if (currentStep >= total) return total - 1;
  return currentStep;
}

function AutosaveBadge({ status }: { status: WizardAutosaveStatus }) {
  if (status === "idle") return null;
  if (status === "saving") {
    return (
      <Badge variant="default" size="sm">
        Saving…
      </Badge>
    );
  }
  if (status === "saved") {
    return (
      <Badge variant="success" size="sm">
        Saved
      </Badge>
    );
  }
  return (
    <Badge variant="error" size="sm">
      Save failed — retry
    </Badge>
  );
}

function WizardShell({
  steps,
  currentStep,
  onStepChange,
  onComplete,
  autosaveStatus = "idle",
  children,
  backLabel = "Back",
  continueLabel = "Continue",
  skipLabel = "Skip",
  completeLabel = "Finish",
  disableContinue = false,
  className,
}: WizardShellProps) {
  const total = steps.length;
  const safeStep = clampStep(currentStep, total);
  const isLastStep = total > 0 && safeStep === total - 1;
  const activeStep = total > 0 ? steps[safeStep] : undefined;
  const allowSkip = activeStep?.allowSkip === true;

  const handleBack = React.useCallback(() => {
    if (safeStep > 0) {
      onStepChange(safeStep - 1);
    }
  }, [safeStep, onStepChange]);

  const handleContinue = React.useCallback(() => {
    if (total === 0 || isLastStep) {
      onComplete();
      return;
    }
    onStepChange(safeStep + 1);
  }, [total, isLastStep, onComplete, onStepChange, safeStep]);

  const handleSkip = React.useCallback(() => {
    if (isLastStep) {
      onComplete();
      return;
    }
    onStepChange(safeStep + 1);
  }, [isLastStep, onComplete, onStepChange, safeStep]);

  return (
    <div
      className={cn(
        "flex flex-col gap-6 w-full",
        className,
      )}
    >
      {total > 0 && (
        <div className="flex items-center gap-3">
          <SegmentedProgress
            segments={[{ value: safeStep + 1, color: "var(--brand-primary, #2563eb)" }]}
            total={total}
            size="sm"
            className="flex-1"
          />
          <span
            className="text-xs whitespace-nowrap"
            style={{ color: "var(--neutral-500, #6b7280)" }}
            aria-live="polite"
          >
            Step {safeStep + 1} of {total}
          </span>
          <AutosaveBadge status={autosaveStatus} />
        </div>
      )}

      {activeStep && (
        <div className="flex flex-col gap-1">
          <h2
            className="text-lg font-semibold"
            style={{ color: "var(--foreground, #111827)" }}
          >
            {activeStep.label}
          </h2>
          {activeStep.description && (
            <p
              className="text-sm"
              style={{ color: "var(--neutral-500, #6b7280)" }}
            >
              {activeStep.description}
            </p>
          )}
        </div>
      )}

      <div className="min-h-[120px]">{children}</div>

      <div className="flex items-center justify-between gap-3 pt-4 border-t" style={{ borderColor: "var(--card-border, #e5e7eb)" }}>
        <div>
          {safeStep > 0 && (
            <Button variant="ghost" onClick={handleBack}>
              {backLabel}
            </Button>
          )}
        </div>
        <div className="flex items-center gap-2">
          {allowSkip && !isLastStep && (
            <Button variant="ghost" onClick={handleSkip}>
              {skipLabel}
            </Button>
          )}
          <Button
            variant="primary"
            onClick={handleContinue}
            disabled={disableContinue}
          >
            {isLastStep || total === 0 ? completeLabel : continueLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}

export { WizardShell };
