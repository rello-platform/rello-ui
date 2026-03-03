import { useState } from "react";

const QUESTIONS = [
  {
    icon: "home",
    question: "What price range are you thinking about?",
    helper: "This helps us find the right programs for you.",
    options: ["Under $400K", "$400K - $500K", "$500K - $600K", "$600K - $700K", "$700K - $800K", "$800K - $900K", "$900K - $1M", "$1M+"],
    columns: 2,
    accent: "#5B9EA6",
    pattern: "concentric-circles" as const,
  },
  {
    icon: "location",
    question: "Where are you looking to buy?",
    helper: "Select your preferred area.",
    options: ["Salt Lake City", "South Jordan", "Draper", "Sandy", "Lehi", "Provo", "Park City", "Other"],
    columns: 2,
    accent: "#D4943A",
    pattern: "orbital-rings" as const,
  },
  {
    icon: "calendar",
    question: "When are you looking to buy?",
    helper: "This helps us prioritize your timeline.",
    options: ["Within 30 days", "1-3 months", "3-6 months", "6-12 months", "Just exploring"],
    columns: 2,
    accent: "#5A7EB5",
    pattern: "dot-grid" as const,
  },
];

// Branded illustration icons — matching the card illustration system
const STEP_ICONS: Record<string, (accent: string) => React.ReactNode> = {
  home: (accent) => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <path d="M24 10L10 22v16h28V22z" stroke={accent} strokeWidth="2" />
      <rect x="18" y="26" width="12" height="12" rx="1" stroke={accent} strokeWidth="1.5" opacity="0.3" />
      <rect x="14" y="30" width="20" height="4" rx="1" fill={accent} opacity="0.08" />
      <rect x="14" y="34" width="20" height="4" rx="1" fill={accent} opacity="0.12" />
      <circle cx="24" cy="16" r="2" fill={accent} opacity="0.3" />
      <path d="M36 12l2-2" stroke={accent} strokeWidth="1" opacity="0.4" />
    </svg>
  ),
  location: (accent) => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <path d="M24 42c-6-6-12-11.5-12-18a12 12 0 1 1 24 0c0 6.5-6 12-12 18z" stroke={accent} strokeWidth="2" />
      <circle cx="24" cy="24" r="5" stroke={accent} strokeWidth="1.5" opacity="0.5" />
      <circle cx="24" cy="24" r="2" fill={accent} opacity="0.4" />
      <circle cx="16" cy="16" r="1.5" fill={accent} opacity="0.2" />
      <circle cx="32" cy="18" r="1" fill={accent} opacity="0.15" />
      <path d="M30 10l2-2" stroke={accent} strokeWidth="1" opacity="0.4" />
      <circle cx="33" cy="7" r="1" fill={accent} opacity="0.3" />
    </svg>
  ),
  calendar: (accent) => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <rect x="8" y="12" width="32" height="30" rx="3" stroke={accent} strokeWidth="2" />
      <line x1="18" y1="6" x2="18" y2="16" stroke={accent} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="30" y1="6" x2="30" y2="16" stroke={accent} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="8" y1="22" x2="40" y2="22" stroke={accent} strokeWidth="1" opacity="0.3" />
      <circle cx="16" cy="28" r="2" fill={accent} opacity="0.15" />
      <circle cx="24" cy="28" r="2" fill={accent} opacity="0.15" />
      <circle cx="32" cy="28" r="2" fill={accent} opacity="0.5" />
      <circle cx="16" cy="35" r="2" fill={accent} opacity="0.15" />
      <circle cx="24" cy="35" r="2" fill={accent} opacity="0.15" />
      <path d="M13 28l2 2 4-4" stroke={accent} strokeWidth="1" opacity="0.4" />
    </svg>
  ),
};

// Decorative background patterns — matching branded illustration system
function ConcentricCircles({ accent }: { accent: string }) {
  return <>{[14, 24, 34].map(r => <circle key={r} cx="50%" cy="50%" r={r} fill="none" stroke={accent} strokeWidth="0.8" />)}</>;
}
function DotGrid({ accent }: { accent: string }) {
  return <>{Array.from({ length: 25 }).map((_, i) => <circle key={i} cx={14 + (i % 5) * 16} cy={14 + Math.floor(i / 5) * 16} r="1.8" fill={accent} />)}</>;
}
function OrbitalRings({ accent }: { accent: string }) {
  return <><circle cx="50%" cy="50%" r="20" fill="none" stroke={accent} strokeWidth="0.7" strokeDasharray="4 5" /><circle cx="50%" cy="50%" r="30" fill="none" stroke={accent} strokeWidth="0.7" strokeDasharray="3 6" /><circle cx="68" cy="22" r="2" fill={accent} opacity="0.4" /></>;
}

const PATTERNS: Record<string, ({ accent }: { accent: string }) => React.ReactNode> = {
  "concentric-circles": ConcentricCircles,
  "dot-grid": DotGrid,
  "orbital-rings": OrbitalRings,
};

export function SurveyStepDemo() {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<Record<number, string>>({});
  const [animating, setAnimating] = useState(false);

  const q = QUESTIONS[step];
  const progress = ((step + (selected[step] ? 1 : 0)) / QUESTIONS.length) * 100;
  const score = Object.keys(selected).length * 29;
  const PatternComp = PATTERNS[q.pattern];

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
        <button onClick={reset} className="px-3 py-1.5 text-xs rounded-md bg-[var(--brand-primary)] text-white font-medium hover:opacity-90 transition-opacity">
          Reset
        </button>
      </div>

      <div className="flex flex-col items-center p-6">
        {/* App name — background context above the card */}
        <p className="text-lg font-bold text-[var(--neutral-300)] mb-4" style={{ fontFamily: "var(--font-heading)" }}>Home Ready</p>

        <div
          className="w-full max-w-lg bg-white rounded-2xl shadow-md border border-[var(--neutral-100)] overflow-hidden"
          style={{
            opacity: animating ? 0 : 1,
            transform: animating ? "translateY(8px)" : "translateY(0)",
            transition: "all 300ms ease-out",
          }}
        >
          {/* Back chevron + Progress bar */}
          <div className="px-6 pt-5">
            {step > 0 && (
              <button onClick={goBack} className="flex items-center gap-1 text-xs text-[var(--neutral-400)] hover:text-[var(--neutral-600)] transition-colors mb-3 -ml-0.5">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
                <span>Back</span>
              </button>
            )}
            <div className="h-2 bg-[var(--neutral-100)] rounded-full overflow-hidden mb-2">
              <div
                className="h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%`, background: `linear-gradient(90deg, ${q.accent}66 0%, ${q.accent} 100%)` }}
              />
            </div>
            <p className="text-xs text-[var(--neutral-400)] text-center">{Math.round(progress)}% complete</p>
          </div>

          {/* Illustration + Question — left illustration, right text */}
          <div className="px-6 pt-4 pb-2 flex items-start gap-5">
            {/* Branded illustration */}
            <div
              className="relative flex items-center justify-center overflow-hidden shrink-0"
              style={{ width: 88, height: 88, borderRadius: 18, backgroundColor: `${q.accent}14` }}
            >
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 88 88" style={{ opacity: 0.07 }}>
                {PatternComp && <PatternComp accent={q.accent} />}
              </svg>
              <div className="relative">{STEP_ICONS[q.icon]?.(q.accent)}</div>
            </div>
            {/* Title + helper */}
            <div className="flex-1 pt-1">
              <h3 className="font-heading text-xl font-bold text-[var(--foreground)] mb-1">{q.question}</h3>
              <p className="text-sm text-[var(--neutral-500)]">{q.helper}</p>
            </div>
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
                    borderColor: isSelected ? q.accent : "var(--neutral-200)",
                    backgroundColor: isSelected ? `${q.accent}14` : "white",
                    color: isSelected ? q.accent : "var(--neutral-700)",
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
              <p className="text-sm font-medium" style={{ color: q.accent }}>
                {score > 0 ? `Your score is building... ${score}%` : "Your score is building..."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
