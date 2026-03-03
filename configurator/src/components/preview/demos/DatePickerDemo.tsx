import { useState } from "react";

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export function DatePickerDemo() {
  const [selected, setSelected] = useState<number | null>(15);
  const [month] = useState(2); // March
  const [year] = useState(2026);
  const today = 3;

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = Array(firstDay).fill(null).concat(Array.from({ length: daysInMonth }, (_, i) => i + 1));

  return (
    <div className="bg-[var(--neutral-50)] rounded-xl overflow-hidden border border-[var(--neutral-200)]">
      <div className="p-4 border-b border-[var(--neutral-100)]">
        <span className="text-sm font-medium text-[var(--neutral-700)]">Date Picker — Click dates to select</span>
      </div>
      <div className="p-6 flex gap-6">
        {/* Input field */}
        <div className="w-64">
          <label className="block text-sm font-medium text-[var(--neutral-700)] mb-1.5">Closing Date</label>
          <div className="flex w-full items-center justify-between h-9 rounded-md border border-[var(--brand-primary)] bg-white px-3 text-sm shadow-xs ring-2 ring-[var(--brand-primary)]/20">
            <span className="text-[var(--foreground)]">
              {selected ? `${MONTH_NAMES[month]} ${selected}, ${year}` : "Select a date..."}
            </span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--brand-primary)" strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
          </div>
          <p className="mt-1.5 text-xs text-[var(--neutral-500)]">Calendar is open for preview</p>
        </div>

        {/* Calendar — shown inline, not as dropdown */}
        <div className="bg-white border border-[var(--neutral-200)] rounded-lg shadow-lg p-4 w-72">
          <div className="flex items-center justify-between mb-3">
            <button className="size-8 rounded-md hover:bg-[var(--neutral-100)] flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--neutral-500)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 6l-6 6 6 6" /></svg>
            </button>
            <span className="text-sm font-semibold text-[var(--foreground)]">{MONTH_NAMES[month]} {year}</span>
            <button className="size-8 rounded-md hover:bg-[var(--neutral-100)] flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--neutral-500)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg>
            </button>
          </div>
          <div className="grid grid-cols-7 gap-0.5 mb-1">
            {DAYS.map(d => <div key={d} className="text-center text-[10px] font-medium text-[var(--neutral-400)] py-1">{d}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-0.5">
            {cells.map((day, i) => (
              <button
                key={i}
                disabled={!day}
                onClick={() => { if (day) setSelected(day); }}
                className={`h-8 rounded-md text-sm transition-colors ${!day ? "" : day === selected ? "bg-[var(--brand-primary)] text-white font-medium" : day === today ? "text-[var(--brand-primary)] font-medium hover:bg-[var(--neutral-100)]" : "text-[var(--foreground)] hover:bg-[var(--neutral-100)]"}`}
              >
                {day || ""}
                {day === today && day !== selected && <div className="mx-auto mt-px size-1 rounded-full bg-[var(--brand-primary)]" />}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
