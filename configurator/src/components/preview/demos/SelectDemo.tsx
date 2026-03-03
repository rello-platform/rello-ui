import { useState } from "react";

export function SelectDemo() {
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);

  const stages = ["All Stages", "Hot", "Qualified", "Engaged", "Warming", "Cold"];
  const agents = [{ group: "Team A", items: ["Sarah Johnson", "Mike Chen"] }, { group: "Team B", items: ["Emily Davis", "David Wilson"] }];

  return (
    <div className="bg-[var(--neutral-50)] rounded-xl border border-[var(--neutral-200)]">
      <div className="p-4 border-b border-[var(--neutral-100)]">
        <span className="text-sm font-medium text-[var(--neutral-700)]">Select / Dropdown — Click to open</span>
      </div>
      <div className="p-4 grid grid-cols-2 gap-6" style={{ minHeight: 300 }}>
        {/* Simple select */}
        <div>
          <label className="block text-sm font-medium text-[var(--neutral-700)] mb-1.5">Pipeline Stage</label>
          <div className="relative">
            <button onClick={() => { setOpen1(!open1); setOpen2(false); }} className="flex w-full items-center justify-between h-9 rounded-md border border-[var(--neutral-200)] bg-white px-3 text-sm shadow-xs focus:border-[var(--brand-primary)] focus:ring-2 focus:ring-[var(--brand-primary)]/20 outline-none">
              <span className={value1 ? "text-[var(--foreground)]" : "text-[var(--neutral-400)]"}>{value1 || "Select stage..."}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--neutral-400)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
            </button>
            {open1 && (
              <div className="absolute top-full mt-1 w-full bg-white border border-[var(--neutral-200)] rounded-md shadow-md z-10 py-1" style={{ animation: "dropdown-in 150ms ease-out" }}>
                <style>{`@keyframes dropdown-in { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }`}</style>
                {stages.map(s => (
                  <button key={s} onClick={() => { setValue1(s); setOpen1(false); }} className="w-full text-left px-3 py-1.5 text-sm hover:bg-[var(--neutral-100)] flex items-center justify-between">
                    {s}
                    {value1 === s && <span className="text-[var(--brand-primary)]">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* Grouped select */}
        <div>
          <label className="block text-sm font-medium text-[var(--neutral-700)] mb-1.5">Assign to Agent</label>
          <div className="relative">
            <button onClick={() => { setOpen2(!open2); setOpen1(false); }} className="flex w-full items-center justify-between h-9 rounded-md border border-[var(--neutral-200)] bg-white px-3 text-sm shadow-xs focus:border-[var(--brand-primary)] focus:ring-2 focus:ring-[var(--brand-primary)]/20 outline-none">
              <span className={value2 ? "text-[var(--foreground)]" : "text-[var(--neutral-400)]"}>{value2 || "Select agent..."}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--neutral-400)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
            </button>
            {open2 && (
              <div className="absolute top-full mt-1 w-full bg-white border border-[var(--neutral-200)] rounded-md shadow-md z-10 py-1" style={{ animation: "dropdown-in 150ms ease-out" }}>
                {agents.map(g => (
                  <div key={g.group}>
                    <p className="px-3 py-1 text-[10px] font-medium text-[var(--neutral-500)] uppercase">{g.group}</p>
                    {g.items.map(name => (
                      <button key={name} onClick={() => { setValue2(name); setOpen2(false); }} className="w-full text-left px-3 py-1.5 text-sm hover:bg-[var(--neutral-100)] flex items-center justify-between">
                        {name}
                        {value2 === name && <span className="text-[var(--brand-primary)]">✓</span>}
                      </button>
                    ))}
                    {g.group === "Team A" && <div className="my-1 h-px bg-[var(--neutral-100)]" />}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* Size comparison */}
        <div>
          <p className="text-[10px] font-medium text-[var(--neutral-500)] uppercase tracking-wider mb-1.5">Size: sm</p>
          <div className="flex w-full items-center justify-between h-8 rounded-md border border-[var(--neutral-200)] bg-white px-3 text-xs shadow-xs">
            <span className="text-[var(--neutral-400)]">Small trigger</span>
            <span className="text-[var(--neutral-400)] text-[10px]">▼</span>
          </div>
        </div>
        <div>
          <p className="text-[10px] font-medium text-[var(--neutral-500)] uppercase tracking-wider mb-1.5">Size: md (default)</p>
          <div className="flex w-full items-center justify-between h-9 rounded-md border border-[var(--neutral-200)] bg-white px-3 text-sm shadow-xs">
            <span className="text-[var(--neutral-400)]">Medium trigger</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--neutral-400)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
          </div>
        </div>
      </div>
    </div>
  );
}
