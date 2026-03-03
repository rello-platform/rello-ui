import { useState } from "react";

const GRADIENT = "linear-gradient(to right, #93c5fd, #06b6d4, #22d3ee, #facc15, #fb923c, #ef4444)";

const STAGES = [
  { id: "cold", label: "Cold", count: 14 },
  { id: "warming", label: "Warming", count: 8 },
  { id: "engaged", label: "Engaged", count: 23 },
  { id: "qualified", label: "Qualified", count: 11 },
  { id: "hot", label: "Hot", count: 6 },
];

function ThermometerBar({ activeStage, height = "h-5" }: { activeStage: number; height?: string }) {
  // Fill percentage based on active stage position (each stage = 20%)
  const fillPct = ((activeStage + 1) / STAGES.length) * 100;
  return (
    <div className={`relative ${height} rounded-full overflow-hidden bg-[var(--neutral-100)]`}>
      <div
        className="absolute inset-y-0 left-0 rounded-full transition-all duration-500 ease-in-out"
        style={{
          width: `${fillPct}%`,
          backgroundImage: GRADIENT,
          backgroundSize: `${(100 / fillPct) * 100}% 100%`,
        }}
      />
      {/* Current position marker */}
      <div
        className="absolute top-1/2 -translate-y-1/2 transition-all duration-500 ease-in-out"
        style={{ left: `${fillPct - 2}%` }}
      >
        <div className="size-2.5 rounded-full bg-white shadow-sm" />
      </div>
    </div>
  );
}

export function PipelineThermometerDemo() {
  const [activeStage, setActiveStage] = useState(3);
  const total = STAGES.reduce((sum, s) => sum + s.count, 0);

  return (
    <div className="bg-[var(--neutral-50)] rounded-xl overflow-hidden border border-[var(--neutral-200)]">
      <div className="p-4 border-b border-[var(--neutral-100)]">
        <span className="text-sm font-medium text-[var(--neutral-700)]">Pipeline Thermometer — Click stages to change</span>
      </div>
      <div className="p-6 space-y-8">
        {/* Large variant */}
        <div>
          <p className="text-[10px] font-medium text-[var(--neutral-500)] uppercase tracking-wider mb-3">Large (Detail View)</p>
          <ThermometerBar activeStage={activeStage} height="h-5" />
          <div className="flex mt-2">
            {STAGES.map((stage, i) => (
              <button
                key={stage.id}
                onClick={() => setActiveStage(i)}
                className="flex-1 text-center cursor-pointer"
              >
                <span className={`text-[10px] font-medium ${i <= activeStage ? "text-[var(--foreground)]" : "text-[var(--neutral-400)]"}`}>
                  {stage.label}
                </span>
                <p className={`text-[9px] ${i <= activeStage ? "text-[var(--neutral-600)]" : "text-[var(--neutral-300)]"}`}>
                  ({stage.count})
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Standard variant */}
        <div>
          <p className="text-[10px] font-medium text-[var(--neutral-500)] uppercase tracking-wider mb-3">Standard (Card)</p>
          <div className="bg-white rounded-lg border border-[var(--neutral-100)] p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-[var(--foreground)]">Sarah Johnson</span>
              <span className="text-xs font-medium text-[var(--neutral-600)]">{STAGES[activeStage].label}</span>
            </div>
            <ThermometerBar activeStage={activeStage} height="h-3" />
            <div className="flex mt-1.5">
              {STAGES.map((stage, i) => (
                <div key={stage.id} className="flex-1 text-center">
                  <span className={`text-[8px] ${i <= activeStage ? "text-[var(--neutral-500)]" : "text-[var(--neutral-300)]"}`}>
                    {stage.label} ({stage.count})
                  </span>
                </div>
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
                  <div className="flex-1">
                    <ThermometerBar activeStage={stage} height="h-2" />
                  </div>
                  <span className="text-xs font-medium w-16 text-right text-[var(--neutral-600)]">
                    {STAGES[stage].label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Distribution variant */}
        <div>
          <p className="text-[10px] font-medium text-[var(--neutral-500)] uppercase tracking-wider mb-3">Distribution (Dashboard)</p>
          <div className="bg-white rounded-lg border border-[var(--neutral-100)] p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-[var(--foreground)]">{total} Total Leads</span>
            </div>
            <div className="h-4 rounded-full overflow-hidden" style={{ backgroundImage: GRADIENT }} />
            <div className="flex mt-2 gap-1">
              {STAGES.map((stage) => (
                <div key={stage.id} className="flex-1 text-center">
                  <p className="text-xs font-bold text-[var(--foreground)]" style={{ fontFamily: "var(--font-stat)" }}>{stage.count}</p>
                  <p className="text-[8px] text-[var(--neutral-500)]">{stage.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
