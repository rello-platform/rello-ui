import { useState } from "react";

const QUESTIONS = [
  {
    icon: "home",
    question: "What price range are you thinking about?",
    helper: "This helps us find the right programs for you.",
    options: ["Under $400K", "$400K - $500K", "$500K - $600K", "$600K - $700K", "$700K - $800K", "$800K - $900K", "$900K - $1M", "$1M+"],
    columns: 2,
  },
  {
    icon: "location",
    question: "Where are you looking to buy?",
    helper: "Select your preferred area.",
    options: ["Salt Lake City", "South Jordan", "Draper", "Sandy", "Lehi", "Provo", "Park City", "Other"],
    columns: 2,
  },
  {
    icon: "calendar",
    question: "When are you looking to buy?",
    helper: "This helps us prioritize your timeline.",
    options: ["Within 30 days", "1-3 months", "3-6 months", "6-12 months", "Just exploring"],
    columns: 2,
  },
];

const ICONS: Record<string, React.ReactNode> = {
  home: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 10.182V22h18V10.182L12 2z" /><path d="M9 22V14h6v8" />
    </svg>
  ),
  location: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22c-4-4-8-7.582-8-12a8 8 0 1 1 16 0c0 4.418-4 8-8 12z" /><circle cx="12" cy="10" r="3" />
    </svg>
  ),
  calendar: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /><circle cx="12" cy="16" r="1" fill="currentColor" />
    </svg>
  ),
};

export function SurveyStepDemo() {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<Record<number, string>>({});
  const [animating, setAnimating] = useState(false);

  const q = QUESTIONS[step];
  const progress = ((step + (selected[step] ? 1 : 0)) / QUESTIONS.length) * 100;
  const score = Object.keys(selected).length * 29;

  const selectOption = (option: string) => {
    setSelected((prev) => ({ ...prev, [step]: option }));
    if (step < QUESTIONS.length - 1) {
      setAnimating(true);
      setTimeout(() => {
        setStep(step + 1);
        setAnimating(false);
      }, 400);
    }
  };

  const goBack = () => {
    if (step > 0) {
      setAnimating(true);
      setTimeout(() => {
        setStep(step - 1);
        setAnimating(false);
      }, 300);
    }
  };

  const reset = () => {
    setStep(0);
    setSelected({});
  };

  return (
    <div className="bg-[var(--neutral-50)] rounded-xl overflow-hidden border border-[var(--neutral-200)]">
      <div className="p-4 border-b border-[var(--neutral-100)] flex items-center justify-between">
        <span className="text-sm font-medium text-[var(--neutral-700)]">Survey Step Card — Click options to advance</span>
        <div className="flex gap-2">
          {step > 0 && (
            <button onClick={goBack} className="px-3 py-1.5 text-xs rounded-md border border-[var(--neutral-200)] text-[var(--neutral-600)] hover:bg-[var(--neutral-50)] transition-colors">
              Back
            </button>
          )}
          <button onClick={reset} className="px-3 py-1.5 text-xs rounded-md bg-[var(--brand-primary)] text-white font-medium hover:opacity-90 transition-opacity">
            Reset
          </button>
        </div>
      </div>

      <div className="flex justify-center p-6">
        <div
          className="w-full max-w-md bg-white rounded-2xl shadow-md border border-[var(--neutral-100)] overflow-hidden"
          style={{
            opacity: animating ? 0 : 1,
            transform: animating ? "translateY(8px)" : "translateY(0)",
            transition: "all 300ms ease-out",
          }}
        >
          {/* Progress bar */}
          <div className="px-6 pt-5">
            <div className="h-2 bg-[var(--neutral-100)] rounded-full overflow-hidden mb-2">
              <div
                className="h-full bg-[var(--brand-primary)] rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-[var(--neutral-400)] text-center">{Math.round(progress)}% complete</p>
          </div>

          {/* Question */}
          <div className="px-6 pt-4 pb-2 text-center">
            <div className="inline-flex items-center justify-center size-12 rounded-xl bg-[var(--neutral-50)] text-[var(--neutral-500)] mb-3">
              {ICONS[q.icon]}
            </div>
            <h3 className="font-heading text-xl font-bold text-[var(--foreground)] mb-1">{q.question}</h3>
            <p className="text-sm text-[var(--neutral-500)]">{q.helper}</p>
          </div>

          {/* Options grid */}
          <div className="px-6 py-4" style={{ display: "grid", gridTemplateColumns: `repeat(${q.columns}, 1fr)`, gap: 10 }}>
            {q.options.map((option) => {
              const isSelected = selected[step] === option;
              return (
                <button
                  key={option}
                  onClick={() => selectOption(option)}
                  className="py-3 px-4 text-left rounded-xl border-2 transition-all duration-150 text-sm font-medium"
                  style={{
                    borderColor: isSelected ? "var(--brand-primary)" : "var(--neutral-200)",
                    backgroundColor: isSelected ? "var(--brand-primary-light)" : "white",
                    color: isSelected ? "var(--brand-primary)" : "var(--neutral-700)",
                  }}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {/* Score footer */}
          <div className="px-6 pb-5">
            <div className="py-3 rounded-xl border border-[var(--neutral-200)] text-center">
              <p className="text-sm text-[var(--brand-primary)] font-medium">
                {score > 0 ? `Your score is building... ${score}%` : "Your score is building..."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
