export function CardTiersDemo({ params }: { params: { borderRadius?: number; shadowLevel?: string } }) {
  const radius = params.borderRadius ?? 12;

  return (
    <div className="bg-[var(--neutral-50)] rounded-xl overflow-hidden border border-[var(--neutral-200)]">
      <div className="p-4 border-b border-[var(--neutral-100)]">
        <span className="text-sm font-medium text-[var(--neutral-700)]">Card Visual Hierarchy — 4 Tiers</span>
      </div>
      <div className="p-4 space-y-4">
        {/* Tier 1 — Hero */}
        <div>
          <p className="text-[10px] font-medium text-[var(--neutral-500)] uppercase tracking-wider mb-1.5">Tier 1 — Hero Card</p>
          <div className="bg-gradient-to-br from-[var(--neutral-800)] to-[var(--neutral-900)] p-5 text-white" style={{ borderRadius: radius + 8 }}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-white/60 mb-1">Five Before 9</p>
                <p className="font-heading text-xl font-bold mb-1">3 calls remaining</p>
                <p className="text-xs text-white/50">Your morning call list is waiting</p>
              </div>
              <div className="size-16 rounded-2xl bg-white/8 flex items-center justify-center">
                <div className="size-10 rounded-xl bg-[var(--brand-accent)]/20 flex items-center justify-center text-[var(--brand-accent)]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18.118 14.702L14 16.5V7.5l4.118 1.798a1 1 0 0 1 .582.808v3.788a1 1 0 0 1-.582.808zM14 16.5l-8.5 2A1 1 0 0 1 4 17.56V6.44a1 1 0 0 1 1.5-.94L14 7.5" /></svg>
                </div>
              </div>
            </div>
            <button className="mt-3 px-4 py-2 text-xs rounded-lg bg-white/15 text-white font-medium hover:bg-white/20 transition-colors">Start Calling</button>
          </div>
        </div>

        {/* Tier 3 — Stat Pills */}
        <div>
          <p className="text-[10px] font-medium text-[var(--neutral-500)] uppercase tracking-wider mb-1.5">Tier 3 — Stat Pills</p>
          <div className="grid grid-cols-4 gap-2">
            {[
              { label: "GCI", value: "$42.5K", color: "var(--brand-primary)" },
              { label: "Calls", value: "127", color: "var(--success)" },
              { label: "Appts", value: "18", color: "var(--info)" },
              { label: "Listings", value: "6", color: "var(--brand-accent)" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white border border-[var(--neutral-100)] p-3" style={{ borderRadius: radius }}>
                <div className="flex items-center gap-2 mb-1">
                  <div className="size-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `color-mix(in srgb, ${stat.color} 10%, transparent)` }}>
                    <div className="size-4 rounded" style={{ backgroundColor: stat.color, opacity: 0.5 }} />
                  </div>
                </div>
                <p className="font-stat text-lg font-bold" style={{ color: stat.color }}>{stat.value}</p>
                <p className="text-[10px] text-[var(--neutral-500)]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tier 2 — Feature Cards */}
        <div>
          <p className="text-[10px] font-medium text-[var(--neutral-500)] uppercase tracking-wider mb-1.5">Tier 2 — Feature Cards</p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { title: "Morning Brew", subtitle: "Market intel update ready", color: "var(--brand-accent)" },
              { title: "Today's Agenda", subtitle: "6 items scheduled", color: "var(--info)" },
            ].map((card) => (
              <div key={card.title} className="bg-white border border-[var(--neutral-100)] shadow-xs p-4" style={{ borderRadius: radius }}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-heading text-sm font-semibold text-[var(--foreground)]">{card.title}</p>
                    <p className="text-xs text-[var(--neutral-500)]">{card.subtitle}</p>
                  </div>
                  <div className="size-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `color-mix(in srgb, ${card.color} 8%, transparent)` }}>
                    <div className="size-5 rounded-lg" style={{ backgroundColor: card.color, opacity: 0.4 }} />
                  </div>
                </div>
                <div className="h-1 bg-[var(--neutral-100)] rounded-full">
                  <div className="h-full rounded-full w-3/5" style={{ backgroundColor: card.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tier 4 — Utility */}
        <div>
          <p className="text-[10px] font-medium text-[var(--neutral-500)] uppercase tracking-wider mb-1.5">Tier 4 — Utility Cards</p>
          <div className="grid grid-cols-5 gap-2">
            {["CMA Tool", "Scripts", "Drip Campaigns", "Reports", "Settings"].map((label, i) => {
              const colors = ["var(--hot)", "var(--qualified)", "var(--engaged)", "var(--warming)", "var(--cold)"];
              return (
                <div key={label} className="bg-white border border-[var(--neutral-100)] overflow-hidden cursor-pointer hover:shadow-sm transition-shadow" style={{ borderRadius: radius }}>
                  <div className="h-14 flex items-center justify-center" style={{ backgroundColor: `color-mix(in srgb, ${colors[i]} 8%, transparent)` }}>
                    <div className="size-8 rounded-lg" style={{ backgroundColor: colors[i], opacity: 0.3 }} />
                  </div>
                  <div className="p-2">
                    <p className="text-[10px] font-medium text-[var(--foreground)] text-center">{label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
