import { useState } from "react";

export function SearchInputDemo() {
  const [query, setQuery] = useState("");
  const results = ["Sarah Johnson", "Sam Wilson", "Sandra Lee", "Stephen Park", "Sophia Chen"].filter(n => query.length >= 2 && n.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="bg-[var(--neutral-50)] rounded-xl overflow-hidden border border-[var(--neutral-200)]">
      <div className="p-4 border-b border-[var(--neutral-100)]">
        <span className="text-sm font-medium text-[var(--neutral-700)]">Search Input — Type to see autocomplete</span>
      </div>
      <div className="p-4">
        <div className="relative w-72">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--neutral-400)]" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search contacts..." className="h-9 w-full rounded-md border border-[var(--neutral-200)] bg-white pl-10 pr-8 text-sm shadow-xs outline-none focus:border-[var(--brand-primary)] focus:ring-2 focus:ring-[var(--brand-primary)]/20 placeholder:text-[var(--neutral-400)]" />
          {query && <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--neutral-400)] hover:text-[var(--neutral-600)] text-sm">&times;</button>}
          {results.length > 0 && (
            <div className="absolute top-full mt-1 w-full bg-white border border-[var(--neutral-200)] rounded-md shadow-md z-10 py-1">
              {results.map(r => (
                <button key={r} onClick={() => setQuery(r)} className="w-full text-left px-3 py-2 text-sm hover:bg-[var(--neutral-100)] flex items-center gap-2">
                  <div className="size-6 rounded-full bg-[var(--brand-primary-light)] flex items-center justify-center text-[9px] font-bold text-[var(--brand-primary)]">{r[0]}</div>
                  <span dangerouslySetInnerHTML={{ __html: r.replace(new RegExp(`(${query})`, "gi"), `<span style="color:var(--brand-primary);font-weight:600">$1</span>`) }} />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function TagChipDemo() {
  const [tags, setTags] = useState(["Buyer", "Pre-Approved", "South Jordan", "VIP", "Referral"]);

  return (
    <div className="bg-[var(--neutral-50)] rounded-xl overflow-hidden border border-[var(--neutral-200)]">
      <div className="p-4 border-b border-[var(--neutral-100)]">
        <span className="text-sm font-medium text-[var(--neutral-700)]">Tags / Chips — Click X to remove</span>
      </div>
      <div className="p-4">
        <p className="text-xs font-medium text-[var(--neutral-600)] mb-2">Contact Tags</p>
        <div className="flex flex-wrap gap-1.5">
          {tags.map(tag => (
            <span key={tag} className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-[var(--neutral-100)] text-[var(--neutral-600)]" style={{ animation: "tag-in 150ms ease-out" }}>
              <style>{`@keyframes tag-in { from { opacity: 0; transform: scale(0.8); } to { opacity: 1; transform: scale(1); } }`}</style>
              {tag}
              <button onClick={() => setTags(prev => prev.filter(t => t !== tag))} className="text-[var(--neutral-400)] hover:text-[var(--error)] ml-0.5">&times;</button>
            </span>
          ))}
          <button onClick={() => setTags(prev => [...prev, `Tag ${prev.length + 1}`])} className="inline-flex items-center px-2 py-1 text-xs rounded-full border border-dashed border-[var(--neutral-300)] text-[var(--neutral-500)] hover:bg-[var(--neutral-100)]">+ Add</button>
        </div>
        <p className="text-xs font-medium text-[var(--neutral-600)] mt-4 mb-2">Colored Tags</p>
        <div className="flex flex-wrap gap-1.5">
          {[
            { label: "Hot Lead", bg: "var(--hot-light)", text: "var(--hot)" },
            { label: "Active Flow", bg: "var(--success-light)", text: "var(--success)" },
            { label: "Needs Review", bg: "var(--warning-light)", text: "var(--warning)" },
          ].map(t => (
            <span key={t.label} className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full font-medium" style={{ backgroundColor: t.bg, color: t.text }}>
              {t.label} <button className="opacity-50 hover:opacity-100">&times;</button>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function AvatarDemo() {
  const users = [
    { name: "Sarah Johnson", initials: "SJ", img: true },
    { name: "Mike Chen", initials: "MC", img: true },
    { name: "Emily Davis", initials: "ED", img: false },
    { name: "David Wilson", initials: "DW", img: false },
  ];

  return (
    <div className="bg-[var(--neutral-50)] rounded-xl overflow-hidden border border-[var(--neutral-200)]">
      <div className="p-4 border-b border-[var(--neutral-100)]">
        <span className="text-sm font-medium text-[var(--neutral-700)]">Avatar / User Initials</span>
      </div>
      <div className="p-4 space-y-4">
        <div>
          <p className="text-[10px] font-medium text-[var(--neutral-500)] uppercase tracking-wider mb-2">Sizes</p>
          <div className="flex items-center gap-3">
            {[{ s: 24, l: "xs" }, { s: 32, l: "sm" }, { s: 40, l: "md" }, { s: 48, l: "lg" }, { s: 64, l: "xl" }].map(({ s, l }) => (
              <div key={l} className="flex flex-col items-center gap-1">
                <div className="rounded-full bg-[var(--neutral-100)] flex items-center justify-center text-[var(--neutral-600)] font-medium" style={{ width: s, height: s, fontSize: s * 0.35 }}>KS</div>
                <span className="text-[9px] text-[var(--neutral-400)]">{l}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-[10px] font-medium text-[var(--neutral-500)] uppercase tracking-wider mb-2">Avatar Group (stacked)</p>
          <div className="flex -space-x-2">
            {users.map(u => (
              <div key={u.name} className="size-10 rounded-full bg-[var(--brand-primary-light)] flex items-center justify-center text-xs font-medium text-[var(--brand-primary)] ring-2 ring-white" title={u.name}>
                {u.initials}
              </div>
            ))}
            <div className="size-10 rounded-full bg-[var(--neutral-100)] flex items-center justify-center text-xs font-medium text-[var(--neutral-500)] ring-2 ring-white">+3</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProgressBarDemo() {
  return (
    <div className="bg-[var(--neutral-50)] rounded-xl overflow-hidden border border-[var(--neutral-200)]">
      <div className="p-4 border-b border-[var(--neutral-100)]">
        <span className="text-sm font-medium text-[var(--neutral-700)]">Progress Bar — Variants & Sizes</span>
      </div>
      <div className="p-4 space-y-4">
        <div className="space-y-2">
          {[
            { label: "Default", value: 65, color: "var(--brand-primary)" },
            { label: "Success", value: 85, color: "var(--success)" },
            { label: "Warning", value: 45, color: "var(--warning)" },
            { label: "Hot", value: 92, color: "var(--hot)" },
            { label: "Cold", value: 20, color: "var(--cold)" },
          ].map(p => (
            <div key={p.label} className="flex items-center gap-3">
              <span className="text-xs text-[var(--neutral-500)] w-14">{p.label}</span>
              <div className="flex-1 h-2 bg-[var(--neutral-100)] rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-500" style={{ width: `${p.value}%`, backgroundColor: p.color }} />
              </div>
              <span className="text-xs text-[var(--neutral-600)] font-mono w-8 text-right">{p.value}%</span>
            </div>
          ))}
        </div>
        <div>
          <p className="text-[10px] font-medium text-[var(--neutral-500)] uppercase tracking-wider mb-2">Sizes</p>
          <div className="space-y-2">
            {[{ h: 6, label: "sm" }, { h: 8, label: "md" }, { h: 12, label: "lg" }].map(s => (
              <div key={s.label} className="flex items-center gap-3">
                <span className="text-xs text-[var(--neutral-500)] w-6">{s.label}</span>
                <div className="flex-1 bg-[var(--neutral-100)] rounded-full overflow-hidden" style={{ height: s.h }}>
                  <div className="h-full rounded-full bg-[var(--brand-primary)]" style={{ width: "60%" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
