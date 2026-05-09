"use client";

import * as React from "react";
import { Button } from "../button/Button";
import { Textarea } from "../textarea/Textarea";
import { cn } from "../../lib/cn";

export interface MultiFeedbackOption {
  key: string;
  label: string;
  requiresCorrectionText?: boolean;
  icon?: React.ReactNode;
}

export type MultiFeedbackVariant = "default" | "compact" | "inline";

export interface MultiFeedbackWidgetProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  prompt?: string;
  options: ReadonlyArray<MultiFeedbackOption>;
  onSelect: (key: string, correctionText?: string) => void;
  variant?: MultiFeedbackVariant;
  disabled?: boolean;
  thanksLabel?: string;
}

type WidgetState =
  | { kind: "idle" }
  | { kind: "awaiting-correction"; option: MultiFeedbackOption }
  | { kind: "submitted"; key: string };

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" strokeWidth="2">
      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MultiFeedbackWidget({
  prompt,
  options,
  onSelect,
  variant = "default",
  disabled = false,
  thanksLabel = "Thanks for your feedback!",
  className,
  ...props
}: MultiFeedbackWidgetProps) {
  const [state, setState] = React.useState<WidgetState>({ kind: "idle" });
  const [correctionText, setCorrectionText] = React.useState("");

  const handleOptionClick = React.useCallback(
    (option: MultiFeedbackOption) => {
      if (disabled) return;
      if (option.requiresCorrectionText) {
        setState({ kind: "awaiting-correction", option });
        setCorrectionText("");
        return;
      }
      onSelect(option.key);
      setState({ kind: "submitted", key: option.key });
    },
    [disabled, onSelect],
  );

  const handleCancel = React.useCallback(() => {
    setState({ kind: "idle" });
    setCorrectionText("");
  }, []);

  const handleSubmit = React.useCallback(() => {
    if (state.kind !== "awaiting-correction") return;
    onSelect(state.option.key, correctionText);
    setState({ kind: "submitted", key: state.option.key });
  }, [state, correctionText, onSelect]);

  const isCompact = variant === "compact";
  const containerClass = cn(
    "flex flex-col gap-3",
    variant === "inline" && "border-t mt-4 pt-3",
    className,
  );
  const containerStyle =
    variant === "inline"
      ? { borderColor: "var(--card-border, #e5e7eb)" }
      : undefined;

  if (state.kind === "submitted") {
    return (
      <div
        className={cn("flex items-center gap-1.5", className)}
        style={{ color: "var(--success, #10b981)" }}
        {...props}
      >
        <CheckIcon />
        <span className="text-sm font-medium">{thanksLabel}</span>
      </div>
    );
  }

  if (state.kind === "awaiting-correction") {
    return (
      <div className={containerClass} style={containerStyle} {...props}>
        {prompt && !isCompact && (
          <p className="text-sm" style={{ color: "var(--neutral-600, #4b5563)" }}>
            {prompt}
          </p>
        )}
        <div className="flex flex-col gap-2">
          <p
            className="text-xs font-medium"
            style={{ color: "var(--neutral-700, #374151)" }}
          >
            {state.option.label}
          </p>
          <Textarea
            value={correctionText}
            onChange={(e) => setCorrectionText(e.target.value)}
            placeholder="Tell us more (optional)"
            aria-label="Correction text"
          />
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={containerClass} style={containerStyle} {...props}>
      {prompt && !isCompact && (
        <p className="text-sm" style={{ color: "var(--neutral-600, #4b5563)" }}>
          {prompt}
        </p>
      )}
      <div
        className={cn(
          "flex flex-wrap gap-2",
          variant === "inline" && "items-center",
        )}
        role="group"
        aria-label={prompt ?? "Feedback options"}
      >
        {options.map((option) => (
          <Button
            key={option.key}
            variant="outline"
            size={isCompact ? "sm" : "md"}
            disabled={disabled}
            onClick={() => handleOptionClick(option)}
            leftIcon={option.icon}
          >
            {option.label}
          </Button>
        ))}
      </div>
    </div>
  );
}

export { MultiFeedbackWidget };
