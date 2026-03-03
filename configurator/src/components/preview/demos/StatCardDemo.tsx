const STAT_ICONS: Record<string, (c: string) => React.ReactNode> = {
  "Total Contacts": (c) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 4-7 8-7s8 3 8 7" /></svg>,
  "Active Flows": (c) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 20Q8 14 10 16Q12 18 14 12Q16 6 21 4" /><circle cx="17" cy="8" r="2" opacity="0.4" /></svg>,
  "GCI This Month": (c) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><text x="8.5" y="16" fontSize="11" fill={c} fontWeight="600" stroke="none">$</text></svg>,
  "Avg Open Rate": (c) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>,
  "Hot Leads": (c) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c-1 0-2-.5-2-2h4c0 1.5-1 2-2 2z" /><path d="M18 8c0-3.3-2.7-6-6-6S6 4.7 6 8c0 7-3 9-3 9h18s-3-2-3-9" /></svg>,
  "Calls Made": (c) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 4h4l2 5-2.5 1.5A11 11 0 0013.5 15L15 12.5l5 2v4a2 2 0 01-2 2A16 16 0 013 4.5 2 2 0 015 4z" /></svg>,
};

export function StatCardDemo() {
  const stats = [
    { label: "Total Contacts", value: "1,247", trend: "+12%", trendUp: true, color: "var(--brand-primary)" },
    { label: "Active Flows", value: "34", trend: "+3", trendUp: true, color: "var(--success)" },
    { label: "GCI This Month", value: "$42.5K", trend: "+8.2%", trendUp: true, color: "var(--brand-accent)" },
    { label: "Avg Open Rate", value: "34.7%", trend: "-2.1%", trendUp: false, color: "var(--info)" },
    { label: "Hot Leads", value: "12", trend: "+5", trendUp: true, color: "var(--hot)" },
    { label: "Calls Made", value: "89", trend: "0", trendUp: true, color: "var(--qualified)" },
  ];

  return (
    <div className="bg-[var(--neutral-50)] rounded-xl overflow-hidden border border-[var(--neutral-200)]">
      <div className="p-4 border-b border-[var(--neutral-100)]">
        <span className="text-sm font-medium text-[var(--neutral-700)]">Stat Cards / KPI — Hover for interaction</span>
      </div>
      <div className="p-4 grid grid-cols-3 gap-3">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl border border-[var(--neutral-100)] p-5 cursor-pointer hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
            style={{ animation: `stagger-in 350ms cubic-bezier(0,0,0.2,1) ${i * 75}ms both` }}
          >
            <style>{`@keyframes stagger-in { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }`}</style>
            {/* Top row: icon + label + trend */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="size-11 rounded-xl flex items-center justify-center" style={{ backgroundColor: `color-mix(in srgb, ${stat.color} 10%, transparent)` }}>
                  {STAT_ICONS[stat.label]?.(stat.color) || <div className="size-5 rounded" style={{ backgroundColor: stat.color, opacity: 0.4 }} />}
                </div>
                <span className="text-sm font-medium text-[var(--neutral-700)]">{stat.label}</span>
              </div>
              {stat.trend !== "0" && (
                <span className={`text-xs font-semibold ${stat.trendUp ? "text-[var(--success)]" : "text-[var(--error)]"}`}>
                  {stat.trendUp ? "↑" : "↓"} {stat.trend}
                </span>
              )}
            </div>
            {/* Large value */}
            <p className="font-stat text-3xl font-bold tracking-tight" style={{ color: stat.color }}>{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
