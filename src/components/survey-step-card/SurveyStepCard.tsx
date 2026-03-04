"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

/* ==========================================
   TYPES
   ========================================== */

export interface SurveyQuestion {
  /** Unique key for the question (used for tracking selections) */
  key: string;
  /** Accent color hex for this step (e.g. "#5B9EA6") */
  accent: string;
  /** Question text displayed as the heading */
  question: string;
  /** Helper text below the question */
  helper?: string;
  /** Answer options */
  options: string[];
  /** Number of grid columns for options (default 2) */
  columns?: number;
  /** Illustration element rendered in the branded illustration box */
  illustration?: React.ReactNode;
  /** Decorative background pattern rendered behind the illustration */
  pattern?: React.ReactNode;
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
  /** Called when an option is selected */
  onSelect?: (questionKey: string, option: string) => void;
  /** Auto-advance to next step after selection (default true) */
  autoAdvance?: boolean;
  /** Delay in ms before auto-advancing (default 400) */
  advanceDelay?: number;
  /** Whether to show progress bar (default true) */
  showProgress?: boolean;
  /** Whether to show back button (default true) */
  showBack?: boolean;
  /** Footer content rendered below the options grid */
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

    const progress = ((step + (selections[q.key] ? 1 : 0)) / questions.length) * 100;

    const handleSelect = (option: string) => {
      onSelect?.(q.key, option);

      if (autoAdvance && step < questions.length - 1) {
        setAnimating(true);
        setTimeout(() => {
          onStepChange?.(step + 1);
          setAnimating(false);
        }, advanceDelay);
      }
    };

    const handleBack = () => {
      if (step > 0) {
        setAnimating(true);
        setTimeout(() => {
          onStepChange?.(step - 1);
          setAnimating(false);
        }, 300);
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
              className="text-xl font-bold text-[var(--foreground)] mb-1"
              style={{ fontFamily: "var(--font-heading, 'Montserrat', sans-serif)" }}
            >
              {q.question}
            </h3>
            {q.helper && <p className="text-sm text-[var(--neutral-500)]">{q.helper}</p>}
          </div>
        </div>

        {/* Options grid */}
        <div
          className="px-6 py-4"
          style={{ display: "grid", gridTemplateColumns: `repeat(${q.columns ?? 2}, 1fr)`, gap: 10 }}
        >
          {q.options.map((option) => (
            <OptionButton
              key={option}
              option={option}
              isSelected={selections[q.key] === option}
              accent={q.accent}
              onClick={() => handleSelect(option)}
            />
          ))}
        </div>

        {/* Optional footer */}
        {footer && <div className="px-6 pb-5">{footer}</div>}
      </div>
    );
  },
);
SurveyStepCard.displayName = "SurveyStepCard";

export { SurveyStepCard };
