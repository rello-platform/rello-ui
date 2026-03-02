import { useState } from "react";

const STAGES = [
  { id: "cold", label: "Cold", color: "var(--cold)", lightColor: "var(--cold-light)" },
  { id: "warming", label: "Warming", color: "var(--warming)", lightColor: "var(--warming-light)" },
  { id: "engaged", label: "Engaged", color: "var(--engaged)", lightColor: "var(--engaged-light)" },
  { id: "qualified", label: "Qualified", color: "var(--qualified)", lightColor: "var(--qualified-light)" },
  { id: "hot", label: "Hot", color: "var(--hot)", lightColor: "var(--hot-light)" },
];

export function PipelineThermometerDemo() {
  const [activeStage, setActiveStage] = useState(3);

  return (
    <div className="bg-[var(--neutral-50)] rounded-xl overflow-hidden border border-[var(--neutral-200)]">
      <div className="p-4 border-b border-[var(--neutral-100)]">
        <span className="text-sm font-medium text-[var(--neutral-700)]">Pipeline Thermometer — Click stages to change</span>
      </div>
      <div className="p-6 space-y-8">
        {/* Large variant */}
        <div>
          <p className="text-[10px] font-medium text-[var(--neutral-500)] uppercase tracking-wider mb-3">Large (Detail View)</p>
          <div className="flex rounded-full overflow-hidden h-5 bg-[var(--neutral-100)]">
            {STAGES.map((stage, i) => (
              <button
                key={stage.id}
                onClick={() => setActiveStage(i)}
                className="flex-1 relative transition-all duration-400 ease-in-out cursor-pointer"
                style={{
                  backgroundColor: i <= activeStage ? stage.color : stage.lightColor,
                  opacity: i <= activeStage ? 1 : 0.4,
                }}
                title={stage.label}
              >
                {i === activeStage && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="size-2.5 rounded-full bg-white shadow-sm" />
                  </div>
                )}
              </button>
            ))}
          </div>
          <div className="flex mt-2">
            {STAGES.map((stage, i) => (
              <div key={stage.id} className="flex-1 text-center">
                <span className={`text-[10px] font-medium ${i === activeStage ? "text-[var(--foreground)]" : "text-[var(--neutral-400)]"}`}>
                  {stage.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Standard variant */}
        <div>
          <p className="text-[10px] font-medium text-[var(--neutral-500)] uppercase tracking-wider mb-3">Standard (Card)</p>
          <div className="bg-white rounded-lg border border-[var(--neutral-100)] p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-[var(--foreground)]">Sarah Johnson</span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full font-medium" style={{ backgroundColor: STAGES[activeStage].lightColor, color: STAGES[activeStage].color }}>
                <span className="size-1.5 rounded-full" style={{ backgroundColor: STAGES[activeStage].color }} />
                {STAGES[activeStage].label}
              </span>
            </div>
            <div className="flex rounded-full overflow-hidden h-3 bg-[var(--neutral-100)]">
              {STAGES.map((stage, i) => (
                <div
                  key={stage.id}
                  className="flex-1 transition-all duration-400 ease-in-out"
                  style={{
                    backgroundColor: i <= activeStage ? stage.color : "transparent",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Compact variant */}
        <div>
          <p className="text-[10px] font-medium text-[var(--neutral-500)] uppercase tracking-wider mb-3">Compact (List Row)</p>
          <div className="bg-white rounded-lg border border-[var(--neutral-100)] divide-y divide-[var(--neutral-100)]">
            {["Sarah Johnson", "Mike Chen", "Emily Davis", "David Wilson"].map((name, idx) => {
              const stage = Math.min(4, 4 - idx);
              return (
                <div key={name} className="flex items-center gap-3 px-4 py-3">
                  <span className="text-sm text-[var(--foreground)] w-32">{name}</span>
                  <div className="flex rounded-full overflow-hidden h-2 bg-[var(--neutral-100)] flex-1">
                    {STAGES.map((s, i) => (
                      <div
                        key={s.id}
                        className="flex-1"
                        style={{ backgroundColor: i <= stage ? s.color : "transparent" }}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-medium w-16 text-right" style={{ color: STAGES[stage].color }}>
                    {STAGES[stage].label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
