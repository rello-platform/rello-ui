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
        <span className="text-sm font-medium text-[var(--neutral-700)]">Stat Cards / KPI Pills — Tier 3</span>
      </div>
      <div className="p-4 grid grid-cols-3 gap-3">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl border border-[var(--neutral-100)] p-4"
            style={{ animation: `stagger-in 350ms cubic-bezier(0,0,0.2,1) ${i * 75}ms both` }}
          >
            <style>{`@keyframes stagger-in { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }`}</style>
            <div className="flex items-start justify-between mb-2">
              <div className="size-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `color-mix(in srgb, ${stat.color} 8%, transparent)` }}>
                <div className="size-5 rounded" style={{ backgroundColor: stat.color, opacity: 0.4 }} />
              </div>
              {stat.trend !== "0" && (
                <span className={`text-[10px] font-medium ${stat.trendUp ? "text-[var(--success)]" : "text-[var(--error)]"}`}>
                  {stat.trendUp ? "↑" : "↓"} {stat.trend}
                </span>
              )}
            </div>
            <p className="font-stat text-xl font-bold" style={{ color: stat.color }}>{stat.value}</p>
            <p className="text-[11px] text-[var(--neutral-500)] mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
