import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { SurveyStepCard, type SurveyQuestion } from "./SurveyStepCard";
import { ConcentricCircles, DotGrid, OrbitalRings } from "./patterns";

/* ==========================================
   DEMO ICONS (branded illustration style)
   ========================================== */

function HomeIcon({ accent }: { accent: string }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <path d="M24 10L10 22v16h28V22z" stroke={accent} strokeWidth="2" />
      <rect x="18" y="26" width="12" height="12" rx="1" stroke={accent} strokeWidth="1.5" opacity="0.3" />
      <rect x="14" y="30" width="20" height="4" rx="1" fill={accent} opacity="0.08" />
      <rect x="14" y="34" width="20" height="4" rx="1" fill={accent} opacity="0.12" />
      <circle cx="24" cy="16" r="2" fill={accent} opacity="0.3" />
      <path d="M36 12l2-2" stroke={accent} strokeWidth="1" opacity="0.4" />
    </svg>
  );
}

function LocationIcon({ accent }: { accent: string }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <path d="M24 42c-6-6-12-11.5-12-18a12 12 0 1 1 24 0c0 6.5-6 12-12 18z" stroke={accent} strokeWidth="2" />
      <circle cx="24" cy="24" r="5" stroke={accent} strokeWidth="1.5" opacity="0.5" />
      <circle cx="24" cy="24" r="2" fill={accent} opacity="0.4" />
      <circle cx="16" cy="16" r="1.5" fill={accent} opacity="0.2" />
      <circle cx="32" cy="18" r="1" fill={accent} opacity="0.15" />
    </svg>
  );
}

function CalendarIcon({ accent }: { accent: string }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <rect x="8" y="12" width="32" height="30" rx="3" stroke={accent} strokeWidth="2" />
      <line x1="18" y1="6" x2="18" y2="16" stroke={accent} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="30" y1="6" x2="30" y2="16" stroke={accent} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="8" y1="22" x2="40" y2="22" stroke={accent} strokeWidth="1" opacity="0.3" />
      <circle cx="16" cy="28" r="2" fill={accent} opacity="0.15" />
      <circle cx="24" cy="28" r="2" fill={accent} opacity="0.15" />
      <circle cx="32" cy="28" r="2" fill={accent} opacity="0.5" />
    </svg>
  );
}

/* ==========================================
   DEMO DATA
   ========================================== */

const DEMO_QUESTIONS: SurveyQuestion[] = [
  {
    key: "price-range",
    accent: "#5B9EA6",
    question: "What price range are you thinking about?",
    helper: "This helps us find the right programs for you.",
    options: ["Under $400K", "$400K - $500K", "$500K - $600K", "$600K - $700K", "$700K - $800K", "$800K - $900K", "$900K - $1M", "$1M+"],
    columns: 2,
    illustration: <HomeIcon accent="#5B9EA6" />,
    pattern: <ConcentricCircles accent="#5B9EA6" />,
  },
  {
    key: "location",
    accent: "#D4943A",
    question: "Where are you looking to buy?",
    helper: "Select your preferred area.",
    options: ["Salt Lake City", "South Jordan", "Draper", "Sandy", "Lehi", "Provo", "Park City", "Other"],
    columns: 2,
    illustration: <LocationIcon accent="#D4943A" />,
    pattern: <OrbitalRings accent="#D4943A" />,
  },
  {
    key: "timeline",
    accent: "#5A7EB5",
    question: "When are you looking to buy?",
    helper: "This helps us prioritize your timeline.",
    options: ["Within 30 days", "1-3 months", "3-6 months", "6-12 months", "Just exploring"],
    columns: 2,
    illustration: <CalendarIcon accent="#5A7EB5" />,
    pattern: <DotGrid accent="#5A7EB5" />,
  },
];

/* ==========================================
   STORYBOOK CONFIG
   ========================================== */

const meta = {
  title: "Components/SurveyStepCard",
  component: SurveyStepCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof SurveyStepCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ==========================================
   STORIES
   ========================================== */

/** Interactive multi-step survey with auto-advance and branded illustrations */
export const Interactive: Story = {
  render: () => {
    const [step, setStep] = useState(0);
    const [selections, setSelections] = useState<Record<string, string>>({});

    const score = Object.keys(selections).length * 29;

    return (
      <div className="flex flex-col items-center gap-4">
        <SurveyStepCard
          questions={DEMO_QUESTIONS}
          step={step}
          onStepChange={setStep}
          selections={selections}
          onSelect={(key, option) => setSelections((prev) => ({ ...prev, [key]: option }))}
          footer={
            <div className="py-3 rounded-xl border border-[var(--neutral-200)] text-center">
              <p className="text-sm font-medium" style={{ color: DEMO_QUESTIONS[step]?.accent }}>
                {score > 0 ? `Your score is building... ${score}%` : "Your score is building..."}
              </p>
            </div>
          }
        />
        <button
          onClick={() => { setStep(0); setSelections({}); }}
          className="px-3 py-1.5 text-xs rounded-md bg-[var(--brand-primary)] text-white font-medium hover:opacity-90 transition-opacity"
        >
          Reset
        </button>
      </div>
    );
  },
};

/** Single step with no auto-advance */
export const SingleStep: Story = {
  render: () => {
    const [selections, setSelections] = useState<Record<string, string>>({});
    const question: SurveyQuestion = {
      key: "timeline",
      accent: "#5A7EB5",
      question: "When are you looking to buy?",
      helper: "This helps us prioritize your timeline.",
      options: ["Within 30 days", "1-3 months", "3-6 months", "6-12 months", "Just exploring"],
      columns: 2,
      illustration: <CalendarIcon accent="#5A7EB5" />,
      pattern: <DotGrid accent="#5A7EB5" />,
    };

    return (
      <SurveyStepCard
        questions={[question]}
        step={0}
        selections={selections}
        onSelect={(key, option) => setSelections((prev) => ({ ...prev, [key]: option }))}
        autoAdvance={false}
        showProgress={false}
      />
    );
  },
};

/** Without illustrations — minimal version */
export const NoIllustrations: Story = {
  render: () => {
    const [step, setStep] = useState(0);
    const [selections, setSelections] = useState<Record<string, string>>({});

    const questions: SurveyQuestion[] = [
      {
        key: "experience",
        accent: "#7C3AED",
        question: "Have you bought a home before?",
        options: ["First-time buyer", "Previous homeowner"],
        columns: 2,
      },
      {
        key: "credit",
        accent: "#059669",
        question: "How would you describe your credit?",
        helper: "Be honest - we're here to help!",
        options: ["Excellent (750+)", "Good (700-749)", "Fair (650-699)", "Needs work (<650)", "Not sure"],
        columns: 2,
      },
    ];

    return (
      <SurveyStepCard
        questions={questions}
        step={step}
        onStepChange={setStep}
        selections={selections}
        onSelect={(key, option) => setSelections((prev) => ({ ...prev, [key]: option }))}
      />
    );
  },
};
