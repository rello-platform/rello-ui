"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface WasThisHelpfulProps extends React.HTMLAttributes<HTMLDivElement> {
  onFeedback: (helpful: boolean) => void;
  label?: string;
  variant?: "default" | "compact" | "inline";
}

type FeedbackState = "idle" | "selected-yes" | "selected-no" | "thanked";

function ThumbsUpIcon({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" className={className}>
      <path
        d="M16.472 20H4.1a.6.6 0 0 1-.6-.6V9.6a.6.6 0 0 1 .6-.6h2.768a2 2 0 0 0 1.715-.971l2.71-4.517a1.631 1.631 0 0 1 2.961.974v3.014a.6.6 0 0 0 .6.6h3.404c1.263 0 2.164 1.222 1.771 2.402l-1.904 5.711c-.26.782-.985 1.308-1.803 1.308Z"
        stroke="currentColor"
        strokeLinecap="round"
      />
      <path d="M7 20V9" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ThumbsDownIcon({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" className={className}>
      <path
        d="M7.528 4H19.9a.6.6 0 0 1 .6.6v9.8a.6.6 0 0 1-.6.6h-2.768a2 2 0 0 0-1.715.971l-2.71 4.517a1.631 1.631 0 0 1-2.961-.974v-3.014a.6.6 0 0 0-.6-.6H5.742c-1.263 0-2.164-1.222-1.771-2.402l1.904-5.711C6.135 6.005 6.86 5.479 7.678 5.479"
        stroke="currentColor"
        strokeLinecap="round"
      />
      <path d="M17 4v11" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" strokeWidth="2">
      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WasThisHelpful({
  onFeedback,
  label = "Was this helpful?",
  variant = "default",
  className,
  ...props
}: WasThisHelpfulProps) {
  const [state, setState] = React.useState<FeedbackState>("idle");

  const handleFeedback = (helpful: boolean) => {
    setState(helpful ? "selected-yes" : "selected-no");
    onFeedback(helpful);
    // Transition to thanked state after a short delay
    setTimeout(() => setState("thanked"), 1200);
  };

  const isCompact = variant === "compact";

  if (state === "thanked") {
    return (
      <div
        className={cn(
          "flex items-center gap-1.5 text-[var(--success)]",
          variant === "inline" && "border-t border-[var(--card-border)] mt-4 pt-3",
          className,
        )}
        {...props}
      >
        <CheckIcon />
        <span className="text-sm font-medium">Thanks for your feedback!</span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex items-center gap-2",
        variant === "inline" && "border-t border-[var(--card-border)] mt-4 pt-3",
        className,
      )}
      {...props}
    >
      {!isCompact && (
        <span className="text-sm text-[var(--neutral-500)] mr-1">{label}</span>
      )}
      <button
        type="button"
        onClick={() => handleFeedback(true)}
        disabled={state !== "idle"}
        className={cn(
          "inline-flex items-center justify-center gap-1.5 rounded-md border text-sm font-medium transition-all duration-200",
          isCompact ? "size-8" : "h-8 px-3",
          state === "idle" &&
            "border-[var(--neutral-200)] bg-white text-[var(--neutral-700)] hover:bg-[var(--neutral-50)]",
          state === "selected-yes" &&
            "bg-[var(--success-light)] border-[var(--success)] text-[var(--success)]",
          state === "selected-no" && "opacity-[0.35] border-[var(--neutral-200)] bg-white text-[var(--neutral-700)]",
        )}
        aria-label={isCompact ? "Helpful" : undefined}
      >
        <ThumbsUpIcon />
        {!isCompact && "Yes"}
      </button>
      <button
        type="button"
        onClick={() => handleFeedback(false)}
        disabled={state !== "idle"}
        className={cn(
          "inline-flex items-center justify-center gap-1.5 rounded-md border text-sm font-medium transition-all duration-200",
          isCompact ? "size-8" : "h-8 px-3",
          state === "idle" &&
            "border-[var(--neutral-200)] bg-white text-[var(--neutral-700)] hover:bg-[var(--neutral-50)]",
          state === "selected-no" &&
            "bg-[var(--error-light)] border-[var(--error)] text-[var(--error)]",
          state === "selected-yes" && "opacity-[0.35] border-[var(--neutral-200)] bg-white text-[var(--neutral-700)]",
        )}
        aria-label={isCompact ? "Not helpful" : undefined}
      >
        <ThumbsDownIcon />
        {!isCompact && "No"}
      </button>
    </div>
  );
}

export { WasThisHelpful };
