import { useState } from "react";

const STEPS = [
  { label: "Contact Info", content: "Enter the lead's name, email, and phone number." },
  { label: "Property Prefs", content: "Select preferred area, price range, and property type." },
  { label: "Pre-Approval", content: "Upload pre-approval letter or connect to lender." },
  { label: "Schedule", content: "Pick available times for first showing." },
  { label: "Confirm", content: "Review all details and submit." },
];

export function StepperDemo() {
  const [current, setCurrent] = useState(2);

  return (
    <div className="bg-[var(--neutral-50)] rounded-xl overflow-hidden border border-[var(--neutral-200)]">
      <div className="p-4 border-b border-[var(--neutral-100)]">
        <span className="text-sm font-medium text-[var(--neutral-700)]">Stepper / Wizard — Click steps to navigate</span>
      </div>
      <div className="p-6">
        {/* Step indicators */}
        <div className="flex items-center mb-8">
          {STEPS.map((step, i) => (
            <div key={i} className="flex items-center flex-1 last:flex-none">
              <button
                onClick={() => i <= current + 1 && setCurrent(i)}
                className={`relative size-9 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 ${
                  i < current
                    ? "bg-[var(--brand-primary)] text-white cursor-pointer"
                    : i === current
                    ? "border-2 border-[var(--brand-primary)] text-[var(--brand-primary)] cursor-default"
                    : "border-2 border-[var(--neutral-200)] text-[var(--neutral-400)] cursor-not-allowed"
                }`}
              >
                {i < current ? "✓" : i + 1}
              </button>
              {i < STEPS.length - 1 && (
                <div className="flex-1 h-0.5 mx-2">
                  <div
                    className="h-full transition-all duration-300"
                    style={{
                      backgroundColor: i < current ? "var(--brand-primary)" : "var(--neutral-200)",
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Step labels */}
        <div className="flex mb-6">
          {STEPS.map((step, i) => (
            <div key={i} className="flex-1 last:flex-none last:w-9 text-center px-1">
              <span className={`text-[10px] ${i === current ? "text-[var(--brand-primary)] font-medium" : "text-[var(--neutral-400)]"}`}>
                {step.label}
              </span>
            </div>
          ))}
        </div>

        {/* Step content */}
        <div
          className="bg-white rounded-lg border border-[var(--neutral-100)] p-6 text-center"
          style={{ animation: "step-in 250ms ease-out both" }}
          key={current}
        >
          <style>{`@keyframes step-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }`}</style>
          <p className="font-heading text-base font-semibold text-[var(--foreground)] mb-2">
            Step {current + 1}: {STEPS[current].label}
          </p>
          <p className="text-sm text-[var(--neutral-500)] mb-4">{STEPS[current].content}</p>
          <div className="flex justify-center gap-2">
            {current > 0 && (
              <button
                onClick={() => setCurrent(current - 1)}
                className="px-4 py-2 text-sm rounded-md border border-[var(--neutral-200)] text-[var(--neutral-600)] hover:bg-[var(--neutral-50)] transition-colors"
              >
                Back
              </button>
            )}
            <button
              onClick={() => current < STEPS.length - 1 && setCurrent(current + 1)}
              className="px-4 py-2 text-sm rounded-md bg-[var(--brand-primary)] text-white font-medium hover:opacity-90 transition-opacity"
            >
              {current === STEPS.length - 1 ? "Submit" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
