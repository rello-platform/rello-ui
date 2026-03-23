"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

/* ==========================================
   LIVE FORMATTERS
   ========================================== */

/**
 * Format a raw string into a display value based on input type.
 * Returns { display, raw } — display is shown in the input, raw is stored.
 */
function formatLive(value: string, inputType: SurveyInputType): { display: string; raw: string } {
  switch (inputType) {
    case "currency": {
      const digits = value.replace(/[^\d]/g, "");
      if (!digits) return { display: "", raw: "" };
      const num = parseInt(digits, 10);
      const display = `$${num.toLocaleString("en-US")}`;
      return { display, raw: digits };
    }
    case "percentage": {
      const digits = value.replace(/[^\d.]/g, "");
      if (!digits) return { display: "", raw: "" };
      // Allow one decimal point
      const parts = digits.split(".");
      const cleaned = parts.length > 1 ? `${parts[0]}.${parts[1].slice(0, 2)}` : parts[0];
      const display = cleaned ? `${cleaned}%` : "";
      return { display, raw: cleaned };
    }
    case "phone": {
      const digits = value.replace(/[^\d]/g, "").slice(0, 10);
      if (!digits) return { display: "", raw: "" };
      if (digits.length <= 3) return { display: `(${digits}`, raw: digits };
      if (digits.length <= 6) return { display: `(${digits.slice(0, 3)}) ${digits.slice(3)}`, raw: digits };
      return { display: `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`, raw: digits };
    }
    case "number": {
      const digits = value.replace(/[^\d.]/g, "");
      if (!digits) return { display: "", raw: "" };
      // Format with commas if it's a whole number
      if (!digits.includes(".")) {
        const num = parseInt(digits, 10);
        return { display: num.toLocaleString("en-US"), raw: digits };
      }
      return { display: digits, raw: digits };
    }
    default:
      return { display: value, raw: value };
  }
}

/** Get the appropriate HTML input type for mobile keyboards */
function getHtmlInputType(inputType: SurveyInputType): string {
  switch (inputType) {
    case "currency":
    case "percentage":
    case "number":
      return "text"; // text with inputMode for better formatting control
    case "phone":
      return "tel";
    case "email":
      return "email";
    default:
      return "text";
  }
}

/** Get inputMode for mobile keyboard optimization */
function getInputMode(inputType: SurveyInputType): React.HTMLAttributes<HTMLInputElement>["inputMode"] {
  switch (inputType) {
    case "currency":
    case "percentage":
    case "number":
      return "decimal";
    case "phone":
      return "tel";
    case "email":
      return "email";
    default:
      return "text";
  }
}

/* ==========================================
   TYPES
   ========================================== */

/** Input types that determine live formatting behavior */
export type SurveyInputType = "text" | "textarea" | "currency" | "percentage" | "phone" | "number" | "email";

export interface SurveyQuestion {
  /** Unique key for the question (used for tracking selections) */
  key: string;
  /** Accent color hex for this step (e.g. "#5B9EA6") */
  accent: string;
  /** Question text displayed as the heading */
  question: string;
  /** Helper text below the question */
  helper?: string;
  /** Answer options — if empty/omitted, renders a text input instead */
  options?: string[];
  /** Number of grid columns for options (default 2) */
  columns?: number;
  /** Illustration element rendered in the branded illustration box */
  illustration?: React.ReactNode;
  /** Decorative background pattern rendered behind the illustration */
  pattern?: React.ReactNode;
  /** Input type for text steps — determines live formatting (default "text") */
  inputType?: SurveyInputType;
  /** Placeholder text for text input steps */
  placeholder?: string;
  /** Hint text shown below the input (e.g. "Just a rough number") */
  inputHint?: string;
  /** Label for the submit button on text input steps (default "Next", last step: "See Results") */
  submitLabel?: string;
}

export interface SurveyStepCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  /** Array of survey questions/steps */
  questions: SurveyQuestion[];
  /** Currently active step index (controlled) */
  step: number;
  /** Called when step changes (via option select or back navigation) */
  onStepChange?: (step: number) => void;
  /** Record of selections keyed by question key */
  selections?: Record<string, string>;
  /** Called when an option is selected or text input is submitted */
  onSelect?: (questionKey: string, value: string) => void;
  /** Auto-advance to next step after option selection (default true). Text inputs always require explicit submit. */
  autoAdvance?: boolean;
  /** Delay in ms before auto-advancing (default 400) */
  advanceDelay?: number;
  /** Whether to show progress bar (default true) */
  showProgress?: boolean;
  /** Whether to show back button (default true) */
  showBack?: boolean;
  /** Footer content rendered below the options/input area */
  footer?: React.ReactNode;
}

/* ==========================================
   BRANDED ILLUSTRATION BOX
   ========================================== */

function IllustrationBox({
  accent,
  illustration,
  pattern,
}: {
  accent: string;
  illustration?: React.ReactNode;
  pattern?: React.ReactNode;
}) {
  return (
    <div
      className="relative flex items-center justify-center overflow-hidden shrink-0"
      style={{ width: 88, height: 88, borderRadius: 18, backgroundColor: `${accent}14` }}
    >
      {pattern && (
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 88 88" style={{ opacity: 0.07 }}>
          {pattern}
        </svg>
      )}
      {illustration && <div className="relative">{illustration}</div>}
    </div>
  );
}

/* ==========================================
   BACK BUTTON
   ========================================== */

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-1 text-xs text-[var(--neutral-400)] hover:text-[var(--neutral-600)] transition-colors mb-3 -ml-0.5"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 18l-6-6 6-6" />
      </svg>
      <span>Back</span>
    </button>
  );
}

/* ==========================================
   GRADIENT PROGRESS BAR
   ========================================== */

function GradientProgress({
  value,
  accent,
}: {
  value: number;
  accent: string;
}) {
  return (
    <div>
      <div className="h-2 bg-[var(--neutral-100)] rounded-full overflow-hidden mb-2">
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${value}%`,
            background: `linear-gradient(90deg, ${accent}66 0%, ${accent} 100%)`,
          }}
        />
      </div>
      <p className="text-xs text-[var(--neutral-400)] text-center">{Math.round(value)}% complete</p>
    </div>
  );
}

/* ==========================================
   OPTION BUTTON
   ========================================== */

function OptionButton({
  option,
  isSelected,
  accent,
  onClick,
}: {
  option: string;
  isSelected: boolean;
  accent: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="py-3 px-4 text-left rounded-xl border-2 transition-all duration-150 text-sm font-medium"
      style={{
        borderColor: isSelected ? accent : "var(--neutral-200)",
        backgroundColor: isSelected ? `${accent}14` : "white",
        color: isSelected ? accent : "var(--neutral-700)",
      }}
    >
      {option}
    </button>
  );
}

/* ==========================================
   TEXT INPUT AREA
   ========================================== */

function TextInputArea({
  question,
  value,
  onSubmit,
  isLastStep,
}: {
  question: SurveyQuestion;
  value: string;
  onSubmit: (value: string) => void;
  isLastStep: boolean;
}) {
  const inputType = question.inputType ?? "text";
  const isTextarea = inputType === "textarea";
  const needsFormatting = !isTextarea && inputType !== "text" && inputType !== "email";
  const inputRef = React.useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  // Format display value from raw stored value (e.g., "7000" → "$7,000")
  const toDisplay = (raw: string): string => {
    if (!raw || !needsFormatting) return raw;
    return formatLive(raw, inputType).display;
  };

  const [localValue, setLocalValue] = React.useState(() => toDisplay(value));

  // Sync external value (re-format on back-navigation)
  React.useEffect(() => {
    setLocalValue(toDisplay(value));
  }, [value]);

  // Auto-focus on mount
  React.useEffect(() => {
    const timer = setTimeout(() => inputRef.current?.focus(), 100);
    return () => clearTimeout(timer);
  }, [question.key]);

  const handleChange = (raw: string) => {
    if (isTextarea || inputType === "text" || inputType === "email") {
      setLocalValue(raw);
    } else {
      const formatted = formatLive(raw, inputType);
      setLocalValue(formatted.display);
    }
  };

  const getRawValue = (): string => {
    if (isTextarea || inputType === "text" || inputType === "email") {
      return localValue.trim();
    }
    return formatLive(localValue, inputType).raw;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const raw = getRawValue();
    if (!raw) return;
    onSubmit(raw);
  };

  const btnLabel =
    question.submitLabel ?? (isLastStep ? "See Results →" : "Next");

  const inputClasses =
    "w-full py-3 px-4 rounded-xl border-2 text-sm font-medium outline-none transition-colors duration-150";

  return (
    <form onSubmit={handleSubmit} className="px-6 py-4 space-y-3">
      {isTextarea ? (
        <textarea
          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
          value={localValue}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={question.placeholder ?? "Type your answer..."}
          rows={3}
          className={inputClasses}
          style={{
            borderColor: localValue ? question.accent : "var(--neutral-200)",
            backgroundColor: localValue ? `${question.accent}14` : "white",
            color: "var(--neutral-700)",
            resize: "none",
          }}
        />
      ) : (
        <input
          ref={inputRef as React.RefObject<HTMLInputElement>}
          type={getHtmlInputType(inputType)}
          inputMode={getInputMode(inputType)}
          value={localValue}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={question.placeholder ?? "Type your answer..."}
          className={inputClasses}
          style={{
            borderColor: localValue ? question.accent : "var(--neutral-200)",
            backgroundColor: localValue ? `${question.accent}14` : "white",
            color: "var(--neutral-700)",
          }}
        />
      )}

      {question.inputHint && (
        <p className="text-xs text-[var(--neutral-400)]">{question.inputHint}</p>
      )}

      <button
        type="submit"
        disabled={!getRawValue()}
        className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-opacity duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
        style={{ backgroundColor: question.accent }}
      >
        {btnLabel}
      </button>
    </form>
  );
}

/* ==========================================
   MAIN COMPONENT
   ========================================== */

const SurveyStepCard = React.forwardRef<HTMLDivElement, SurveyStepCardProps>(
  (
    {
      className,
      questions,
      step,
      onStepChange,
      selections = {},
      onSelect,
      autoAdvance = true,
      advanceDelay = 400,
      showProgress = true,
      showBack = true,
      footer,
      ...props
    },
    ref,
  ) => {
    const [animating, setAnimating] = React.useState(false);
    const q = questions[step];

    if (!q) return null;

    const isTextStep = !q.options || q.options.length === 0;
    const isLastStep = step >= questions.length - 1;
    const progress = ((step + (selections[q.key] ? 1 : 0)) / questions.length) * 100;

    const animateTransition = (callback: () => void, delay = 300) => {
      setAnimating(true);
      setTimeout(() => {
        callback();
        setAnimating(false);
      }, delay);
    };

    const handleSelect = (option: string) => {
      onSelect?.(q.key, option);

      if (autoAdvance && !isLastStep) {
        animateTransition(() => onStepChange?.(step + 1), advanceDelay);
      }
    };

    const handleTextSubmit = (value: string) => {
      onSelect?.(q.key, value);

      if (!isLastStep) {
        animateTransition(() => onStepChange?.(step + 1), advanceDelay);
      }
    };

    const handleBack = () => {
      if (step > 0) {
        animateTransition(() => onStepChange?.(step - 1));
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          "w-full max-w-lg bg-white rounded-2xl shadow-md border border-[var(--neutral-100)] overflow-hidden",
          className,
        )}
        style={{
          opacity: animating ? 0 : 1,
          transform: animating ? "translateY(8px)" : "translateY(0)",
          transition: "all 300ms ease-out",
        }}
        {...props}
      >
        {/* Progress bar + back */}
        {(showProgress || showBack) && (
          <div className="px-6 pt-5">
            {showBack && step > 0 && <BackButton onClick={handleBack} />}
            {showProgress && <GradientProgress value={progress} accent={q.accent} />}
          </div>
        )}

        {/* Illustration + Question */}
        <div className="px-6 pt-4 pb-2 flex items-start gap-5">
          {(q.illustration || q.pattern) && (
            <IllustrationBox accent={q.accent} illustration={q.illustration} pattern={q.pattern} />
          )}
          <div className="flex-1 pt-1">
            <h3
              className="text-xl font-bold mb-1"
              style={{ color: "var(--foreground, #111827)", fontFamily: "var(--font-heading, 'Montserrat', sans-serif)" }}
            >
              {q.question}
            </h3>
            {q.helper && <p className="text-sm text-[var(--neutral-500)]">{q.helper}</p>}
          </div>
        </div>

        {/* Answer area — options grid OR text input */}
        {isTextStep ? (
          <TextInputArea
            question={q}
            value={selections[q.key] ?? ""}
            onSubmit={handleTextSubmit}
            isLastStep={isLastStep}
          />
        ) : (
          <div
            className="px-6 py-4"
            style={{ display: "grid", gridTemplateColumns: `repeat(${q.columns ?? 2}, 1fr)`, gap: 10 }}
          >
            {q.options!.map((option) => (
              <OptionButton
                key={option}
                option={option}
                isSelected={selections[q.key] === option}
                accent={q.accent}
                onClick={() => handleSelect(option)}
              />
            ))}
          </div>
        )}

        {/* Optional footer */}
        {footer && <div className="px-6 pb-5">{footer}</div>}
      </div>
    );
  },
);
SurveyStepCard.displayName = "SurveyStepCard";

export { SurveyStepCard };
