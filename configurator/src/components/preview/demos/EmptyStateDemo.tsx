import { useState } from "react";

export function EmptyStateDemo() {
  const [hasData, setHasData] = useState(false);

  return (
    <div className="bg-[var(--neutral-50)] rounded-xl overflow-hidden border border-[var(--neutral-200)]">
      <div className="p-4 border-b border-[var(--neutral-100)] flex items-center justify-between">
        <span className="text-sm font-medium text-[var(--neutral-700)]">Empty State Preview</span>
        <button
          onClick={() => setHasData(!hasData)}
          className="px-3 py-1.5 text-xs rounded-md bg-[var(--brand-primary)] text-white font-medium hover:opacity-90 transition-opacity"
        >
          {hasData ? "Clear Data" : "Add Data"}
        </button>
      </div>
      <div className="bg-white rounded-lg m-4 border border-[var(--neutral-100)]">
        {hasData ? (
          <div className="divide-y divide-[var(--neutral-100)]" style={{ animation: "stagger-in 300ms ease-out both" }}>
            <style>{`@keyframes stagger-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }`}</style>
            {["Sarah Johnson — Hot", "Mike Chen — Qualified", "Emily Davis — Engaged"].map((name, i) => (
              <div key={i} className="px-4 py-3 flex items-center justify-between">
                <span className="text-sm text-[var(--foreground)]">{name}</span>
                <span className="text-xs text-[var(--neutral-400)]">Score: {92 - i * 14}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <div className="size-16 rounded-full bg-[var(--neutral-100)] flex items-center justify-center mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--neutral-400)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[var(--foreground)] mb-1">No leads found</h3>
            <p className="text-sm text-[var(--neutral-500)] max-w-xs mb-4">We couldn't find any leads matching your search. Try adjusting your filters.</p>
            <button className="px-4 py-2 text-sm rounded-md bg-[var(--brand-primary)] text-white font-medium hover:opacity-90 transition-opacity">
              Add Lead
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
