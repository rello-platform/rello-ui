import { useState } from "react";

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export function DatePickerDemo() {
  const [open, setOpen] = useState(true);
  const [selected, setSelected] = useState<number | null>(15);
  const [month] = useState(2); // March
  const [year] = useState(2026);
  const today = 2;

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = Array(firstDay).fill(null).concat(Array.from({ length: daysInMonth }, (_, i) => i + 1));

  return (
    <div className="bg-[var(--neutral-50)] rounded-xl overflow-hidden border border-[var(--neutral-200)]">
      <div className="p-4 border-b border-[var(--neutral-100)]">
        <span className="text-sm font-medium text-[var(--neutral-700)]">Date Picker — Click input to open calendar</span>
      </div>
      <div className="p-4">
        <label className="block text-sm font-medium text-[var(--neutral-700)] mb-1.5">Closing Date</label>
        <div className="relative w-64">
          <button onClick={() => setOpen(!open)} className="flex w-full items-center justify-between h-9 rounded-md border border-[var(--neutral-200)] bg-white px-3 text-sm shadow-xs outline-none focus:border-[var(--brand-primary)] focus:ring-2 focus:ring-[var(--brand-primary)]/20">
            <span className={selected ? "text-[var(--foreground)]" : "text-[var(--neutral-400)]"}>
              {selected ? `${MONTH_NAMES[month]} ${selected}, ${year}` : "Select a date..."}
            </span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--neutral-400)" strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
          </button>
          {open && (
            <div className="absolute top-full mt-1 bg-white border border-[var(--neutral-200)] rounded-lg shadow-lg p-3 z-10 w-72" style={{ animation: "dropdown-in 150ms ease-out" }}>
              <style>{`@keyframes dropdown-in { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }`}</style>
              <div className="flex items-center justify-between mb-3">
                <button className="size-8 rounded-md hover:bg-[var(--neutral-100)] flex items-center justify-center text-[var(--neutral-500)]">&larr;</button>
                <span className="text-sm font-semibold text-[var(--foreground)]">{MONTH_NAMES[month]} {year}</span>
                <button className="size-8 rounded-md hover:bg-[var(--neutral-100)] flex items-center justify-center text-[var(--neutral-500)]">&rarr;</button>
              </div>
              <div className="grid grid-cols-7 gap-0.5 mb-1">
                {DAYS.map(d => <div key={d} className="text-center text-[10px] font-medium text-[var(--neutral-400)] py-1">{d}</div>)}
              </div>
              <div className="grid grid-cols-7 gap-0.5">
                {cells.map((day, i) => (
                  <button
                    key={i}
                    disabled={!day}
                    onClick={() => { if (day) { setSelected(day); } }}
                    className={`h-8 rounded-md text-sm transition-colors ${!day ? "" : day === selected ? "bg-[var(--brand-primary)] text-white font-medium" : day === today ? "text-[var(--brand-primary)] font-medium hover:bg-[var(--neutral-100)]" : "text-[var(--foreground)] hover:bg-[var(--neutral-100)]"}`}
                  >
                    {day || ""}
                    {day === today && day !== selected && <div className="mx-auto mt-px size-1 rounded-full bg-[var(--brand-primary)]" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
