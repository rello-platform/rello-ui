import { useState } from "react";

/* ─── Dashboard Shell Demo ─── */

export function DashboardShellDemo() {
  const [sidebarHovered, setSidebarHovered] = useState(false);
  const [activeNav, setActiveNav] = useState(0);

  const navItems = [
    { label: "Dashboard", icon: "grid" },
    { label: "Pipeline", icon: "bar" },
    { label: "Contacts", icon: "people" },
    { label: "Settings", icon: "gear" },
  ];

  return (
    <div className="bg-[var(--neutral-50)] rounded-xl overflow-hidden border border-[var(--neutral-200)]">
      <div className="p-4 border-b border-[var(--neutral-100)]">
        <span className="text-sm font-medium text-[var(--neutral-700)]">Dashboard Shell — Full app layout with collapsible sidebar, title area, and 50/50 hero split</span>
      </div>
      <div className="p-4">
        {/* Shell preview */}
        <div className="rounded-xl overflow-hidden border border-[var(--card-border)]" style={{ backgroundColor: "var(--background)", minHeight: 400 }}>
          {/* Top row: Logo + Title + Agent card */}
          <div className="flex items-start justify-between px-5 pt-5">
            <div className="flex items-start gap-3 max-w-md">
              <div className="size-14 rounded-2xl flex items-center justify-center shrink-0" style={{ backgroundColor: "color-mix(in srgb, var(--brand-accent) 15%, transparent)" }}>
                <div className="size-8 rounded-xl" style={{ backgroundColor: "var(--brand-accent)", opacity: 0.5 }} />
              </div>
              <div>
                <h2 className="text-2xl font-bold tracking-tight" style={{ color: "var(--app-title-color, var(--foreground))", fontFamily: "var(--font-app-title, var(--font-heading))" }}>Rello</h2>
                <p className="text-sm" style={{ color: "var(--app-subtitle-color, var(--neutral-500))", fontFamily: "var(--font-app-subtitle, var(--font-body))" }}>Your real estate command center</p>
                <p className="text-xs mt-1" style={{ color: "var(--neutral-600)" }}>
                  You have <span className="font-bold" style={{ color: "var(--brand-primary)" }}>12</span> hot leads that need follow-up.
                </p>
              </div>
            </div>
            {/* Agent card */}
            <div className="rounded-xl px-3 py-2 flex items-center gap-2.5 shrink-0" style={{ backgroundColor: "var(--card-background)", border: "1px solid var(--card-border)" }}>
              <div className="text-right">
                <p className="text-[11px] font-medium" style={{ color: "var(--neutral-900)" }}>Susan Johnson</p>
                <p className="text-[9px]" style={{ color: "var(--neutral-400)" }}>susan@example.com</p>
              </div>
              <div className="size-8 rounded-full flex items-center justify-center text-[10px] font-semibold" style={{ backgroundColor: "color-mix(in srgb, var(--brand-primary) 15%, transparent)", color: "var(--brand-primary)" }}>SJ</div>
            </div>
          </div>

          {/* Main area: Sidebar + Hero + Right card */}
          <div className="flex px-5 pt-3 pb-5 gap-3" style={{ minHeight: 250 }}>
            {/* Sidebar */}
            <div
              className="rounded-xl flex-shrink-0 overflow-hidden transition-all duration-300 cursor-pointer"
              style={{
                width: sidebarHovered ? 160 : 48,
                backgroundColor: "var(--card-background)",
                border: "1px solid var(--card-border)",
              }}
              onMouseEnter={() => setSidebarHovered(true)}
              onMouseLeave={() => setSidebarHovered(false)}
            >
              <div className="py-2">
                {navItems.map((item, i) => {
                  const isActive = i === activeNav;
                  return (
                    <button
                      key={i}
                      onClick={() => setActiveNav(i)}
                      className="w-full flex items-center gap-2 py-2 transition-colors"
                      style={{
                        paddingLeft: sidebarHovered ? 12 : 13,
                        paddingRight: 12,
                        backgroundColor: isActive ? "var(--brand-primary)" : "transparent",
                        color: isActive ? "#fff" : "var(--neutral-600)",
                        borderRadius: isActive ? 8 : 0,
                        margin: isActive ? "2px 5px" : "0",
                        width: isActive ? "calc(100% - 10px)" : "100%",
                      }}
                    >
                      <div className="size-4 rounded flex items-center justify-center shrink-0">
                        <div className="size-2.5 rounded-sm" style={{ backgroundColor: isActive ? "#fff" : "var(--neutral-400)", opacity: isActive ? 0.8 : 0.4 }} />
                      </div>
                      {sidebarHovered && <span className="text-[11px] font-medium whitespace-nowrap">{item.label}</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Hero area (50%) — spotlight styling */}
            <div className="flex-1 rounded-xl p-4" style={{ backgroundColor: "var(--hero-card-background, var(--card-background))", border: "1px solid var(--hero-card-border, var(--card-border))" }}>
              <p className="text-[9px] font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--hero-card-title, var(--foreground))" }}>Pipeline / Stats</p>
              <div className="flex gap-4 mb-3">
                {["24", "18", "6"].map((val, i) => (
                  <div key={i}>
                    <p className="text-xl font-bold" style={{ color: i === 0 ? "var(--brand-primary)" : "var(--hero-card-title, var(--foreground))", fontFamily: "var(--font-stat)" }}>{val}</p>
                    <p className="text-[9px]" style={{ color: "var(--hero-card-body-text, var(--neutral-500))" }}>{["Active", "Nurturing", "Closed"][i]}</p>
                  </div>
                ))}
              </div>
              {/* Mini schedule */}
              <div className="space-y-1.5">
                {[{ t: "9:00 AM", e: "Team standup" }, { t: "11:00 AM", e: "Showing" }].map((s, i) => (
                  <div key={i} className="flex items-center gap-3 text-[10px]" style={{ color: "var(--hero-card-body-text, var(--neutral-500))" }}>
                    <span className="font-medium w-12" style={{ color: "var(--hero-card-title, var(--neutral-400))" }}>{s.t}</span>
                    <span>{s.e}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right card (50%) */}
            <div className="flex-1 rounded-xl p-4" style={{ backgroundColor: "var(--card-background)", border: "1px solid var(--card-border)" }}>
              <p className="text-[9px] font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--brand-primary)" }}>Milo&apos;s Daily Brief</p>
              <p className="text-sm font-semibold mb-1" style={{ color: "var(--neutral-900)" }}>Today&apos;s Focus</p>
              <p className="text-xs mb-3" style={{ color: "var(--neutral-600)" }}>3 high-priority tasks need your attention.</p>
              <div className="space-y-1.5">
                {[
                  { p: "var(--hot)", text: "Call Sarah M." },
                  { p: "var(--hot)", text: "Send John to MLO" },
                  { p: "var(--warming)", text: "Follow up with leads" },
                ].map((task, i) => (
                  <div key={i} className="flex items-center gap-2 text-[10px] rounded-lg px-2.5 py-1.5" style={{ backgroundColor: "var(--neutral-50)", border: "1px solid var(--neutral-100)" }}>
                    <div className="size-1.5 rounded-full shrink-0" style={{ backgroundColor: task.p }} />
                    <span style={{ color: "var(--neutral-700)" }}>{task.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Feature callouts */}
        <div className="grid grid-cols-3 gap-3 mt-4">
          <div className="bg-white rounded-lg border border-[var(--neutral-100)] p-3 text-center">
            <p className="text-xs font-semibold text-[var(--neutral-700)] mb-0.5">Collapsible Sidebar</p>
            <p className="text-[9px] text-[var(--neutral-400)]">60px → 190px on hover</p>
          </div>
          <div className="bg-white rounded-lg border border-[var(--neutral-100)] p-3 text-center">
            <p className="text-xs font-semibold text-[var(--neutral-700)] mb-0.5">App Title Fonts</p>
            <p className="text-[9px] text-[var(--neutral-400)]">Playfair Display + Nunito Sans</p>
          </div>
          <div className="bg-white rounded-lg border border-[var(--neutral-100)] p-3 text-center">
            <p className="text-xs font-semibold text-[var(--neutral-700)] mb-0.5">Spotlight Hero</p>
            <p className="text-[9px] text-[var(--neutral-400)]">Dark card with heroCard tokens</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── App Header Demo ─── */

export function AppHeaderDemo() {
  return (
    <div className="bg-[var(--neutral-50)] rounded-xl overflow-hidden border border-[var(--neutral-200)]">
      <div className="p-4 border-b border-[var(--neutral-100)]">
        <span className="text-sm font-medium text-[var(--neutral-700)]">App Header — Sticky top bar with logo, title, and actions</span>
      </div>
      <div className="p-4 space-y-4">
        {/* Variant 1: Full header */}
        <div>
          <p className="text-[10px] font-medium text-[var(--neutral-400)] uppercase tracking-wider mb-2">Full Header</p>
          <div className="bg-[var(--card-background)] border border-[var(--card-border)] rounded-lg px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-md bg-[var(--brand-primary)] flex items-center justify-center">
                  <span className="text-white text-xs font-bold">R</span>
                </div>
                <div className="h-5 w-px bg-[var(--neutral-200)]" />
                <span className="text-sm text-[var(--neutral-500)]">MLO Command Center</span>
              </div>
              <div className="flex items-center gap-1">
                {/* Action with notification dot */}
                <div className="relative p-2 rounded-lg hover:bg-[var(--neutral-50)] cursor-pointer transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--neutral-500)" strokeWidth="1.5"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 01-3.46 0" /></svg>
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[var(--hot)] rounded-full" />
                </div>
                {/* Divider */}
                <div className="h-5 w-px bg-[var(--neutral-200)] mx-1" />
                {/* Action without dot */}
                <div className="p-2 rounded-lg hover:bg-[var(--neutral-50)] cursor-pointer transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--neutral-500)" strokeWidth="1.5"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Variant 2: Minimal header */}
        <div>
          <p className="text-[10px] font-medium text-[var(--neutral-400)] uppercase tracking-wider mb-2">Minimal (logo only)</p>
          <div className="bg-[var(--card-background)] border border-[var(--card-border)] rounded-lg px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-md bg-[var(--brand-accent)] flex items-center justify-center">
                  <span className="text-white text-xs font-bold">HR</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <div className="p-2 rounded-lg hover:bg-[var(--neutral-50)] cursor-pointer">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--neutral-500)" strokeWidth="1.5"><circle cx="12" cy="12" r="3" /><path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" /></svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sub-component callouts */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-lg border border-[var(--neutral-100)] p-3 text-center">
            <div className="relative inline-flex p-2 rounded-lg bg-[var(--neutral-50)] mb-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--neutral-500)" strokeWidth="1.5"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" /></svg>
              <span className="absolute top-1 right-1 w-2 h-2 bg-[var(--hot)] rounded-full" />
            </div>
            <p className="text-[10px] font-medium text-[var(--neutral-700)]">AppHeaderAction</p>
            <p className="text-[9px] text-[var(--neutral-400)]">dot=true</p>
          </div>
          <div className="bg-white rounded-lg border border-[var(--neutral-100)] p-3 text-center">
            <div className="inline-flex p-2 rounded-lg bg-[var(--neutral-50)] mb-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--neutral-500)" strokeWidth="1.5"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
            </div>
            <p className="text-[10px] font-medium text-[var(--neutral-700)]">AppHeaderAction</p>
            <p className="text-[9px] text-[var(--neutral-400)]">dot=false</p>
          </div>
          <div className="bg-white rounded-lg border border-[var(--neutral-100)] p-3 flex flex-col items-center justify-center">
            <div className="h-5 w-px bg-[var(--neutral-200)] mb-2" />
            <p className="text-[10px] font-medium text-[var(--neutral-700)]">AppHeaderDivider</p>
            <p className="text-[9px] text-[var(--neutral-400)]">vertical separator</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Page Container Demo ─── */

export function PageContainerDemo() {
  const [activeWidth, setActiveWidth] = useState<string>("xl");
  const [activePadding, setActivePadding] = useState<string>("md");

  const widths: Record<string, { label: string; max: string; pct: number }> = {
    sm: { label: "sm (max-w-3xl)", max: "768px", pct: 55 },
    md: { label: "md (max-w-5xl)", max: "1024px", pct: 70 },
    lg: { label: "lg (max-w-6xl)", max: "1152px", pct: 80 },
    xl: { label: "xl (max-w-7xl)", max: "1280px", pct: 90 },
    full: { label: "full", max: "100%", pct: 100 },
  };

  const paddings: Record<string, { label: string; css: string }> = {
    sm: { label: "sm", css: "px-3 py-4" },
    md: { label: "md", css: "px-4 py-6" },
    lg: { label: "lg", css: "px-6 py-8" },
  };

  return (
    <div className="bg-[var(--neutral-50)] rounded-xl overflow-hidden border border-[var(--neutral-200)]">
      <div className="p-4 border-b border-[var(--neutral-100)]">
        <span className="text-sm font-medium text-[var(--neutral-700)]">Page Container — Centered content wrapper with width + padding variants</span>
      </div>
      <div className="p-4 space-y-4">
        {/* Width selector */}
        <div>
          <p className="text-[10px] font-medium text-[var(--neutral-400)] uppercase tracking-wider mb-2">Max Width</p>
          <div className="flex gap-1.5">
            {Object.entries(widths).map(([key, w]) => (
              <button
                key={key}
                onClick={() => setActiveWidth(key)}
                className={`px-3 py-1.5 text-xs rounded-md transition-colors ${activeWidth === key ? "bg-[var(--brand-primary)] text-white font-medium" : "bg-white border border-[var(--neutral-200)] text-[var(--neutral-600)] hover:bg-[var(--neutral-50)]"}`}
              >
                {key}
              </button>
            ))}
          </div>
        </div>

        {/* Padding selector */}
        <div>
          <p className="text-[10px] font-medium text-[var(--neutral-400)] uppercase tracking-wider mb-2">Padding</p>
          <div className="flex gap-1.5">
            {Object.entries(paddings).map(([key, p]) => (
              <button
                key={key}
                onClick={() => setActivePadding(key)}
                className={`px-3 py-1.5 text-xs rounded-md transition-colors ${activePadding === key ? "bg-[var(--brand-primary)] text-white font-medium" : "bg-white border border-[var(--neutral-200)] text-[var(--neutral-600)] hover:bg-[var(--neutral-50)]"}`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Visual preview */}
        <div className="bg-[var(--background)] border border-[var(--neutral-200)] rounded-lg overflow-hidden" style={{ height: 160 }}>
          <div className="h-full flex items-center justify-center relative">
            {/* Full width backdrop */}
            <div className="absolute inset-0 bg-[var(--neutral-100)]" style={{ opacity: 0.3 }} />
            {/* Container visualization */}
            <div
              className="relative bg-white border border-dashed border-[var(--brand-primary)] rounded-md transition-all duration-300"
              style={{ width: `${widths[activeWidth].pct}%`, height: "80%" }}
            >
              {/* Padding indicator */}
              <div
                className="absolute inset-0 border border-[var(--brand-primary-light)] rounded transition-all duration-300"
                style={{
                  margin: activePadding === "sm" ? "12px 12px" : activePadding === "md" ? "16px 16px" : "24px 24px",
                  backgroundColor: "color-mix(in srgb, var(--brand-primary) 5%, transparent)",
                }}
              />
              {/* Label */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-xs font-medium text-[var(--brand-primary)]">{widths[activeWidth].max}</p>
                  <p className="text-[9px] text-[var(--neutral-400)]">padding: {paddings[activePadding].css}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Today's Schedule Demo ─── */

export function TodayScheduleDemo() {
  const items = [
    { time: "9:00 AM", event: "Team standup" },
    { time: "10:30 AM", event: "Call with Sarah Johnson" },
    { time: "1:00 PM", event: "Loan review — Martinez file" },
    { time: "3:30 PM", event: "Follow up with new leads" },
  ];

  return (
    <div className="bg-[var(--neutral-50)] rounded-xl overflow-hidden border border-[var(--neutral-200)]">
      <div className="p-4 border-b border-[var(--neutral-100)]">
        <span className="text-sm font-medium text-[var(--neutral-700)]">Today&apos;s Schedule — Daily agenda card</span>
      </div>
      <div className="p-4 grid grid-cols-2 gap-4">
        {/* With items */}
        <div className="bg-white rounded-xl border border-[var(--neutral-100)] p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-md flex items-center justify-center" style={{ background: "var(--brand-accent-light)", color: "var(--brand-accent)" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
              </div>
              <div>
                <h4 className="font-semibold text-sm text-[var(--neutral-900)]">Today&apos;s Schedule</h4>
                <p className="text-xs text-[var(--neutral-500)]">Tuesday, March 4</p>
              </div>
            </div>
            <span className="text-xs font-medium text-[var(--brand-primary)] cursor-pointer hover:underline">View All</span>
          </div>
          <div className="space-y-0">
            {items.map((item, index) => (
              <div key={index} className="flex items-center gap-4 py-2 border-b border-[var(--card-border)] last:border-0">
                <span className="text-xs font-medium text-[var(--neutral-400)] w-16">{item.time}</span>
                <span className="text-sm text-[var(--neutral-700)]">{item.event}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Empty state */}
        <div className="bg-white rounded-xl border border-[var(--neutral-100)] p-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-md flex items-center justify-center" style={{ background: "var(--brand-accent-light)", color: "var(--brand-accent)" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-[var(--neutral-900)]">Today&apos;s Schedule</h4>
              <p className="text-xs text-[var(--neutral-500)]">Saturday, March 8</p>
            </div>
          </div>
          <p className="text-sm text-[var(--neutral-400)] text-center py-6">No events scheduled</p>
        </div>
      </div>
    </div>
  );
}

/* ─── Category Section Demo ─── */

export function CategorySectionDemo() {
  const [expanded, setExpanded] = useState<string[]>(["engagement"]);

  const categories = [
    {
      id: "engagement",
      title: "Engagement Tools",
      subtitle: "Communicate and connect with leads",
      iconBg: "var(--brand-primary-light)",
      iconColor: "var(--brand-primary)",
      apps: [
        { title: "Newsletter Studio", status: "Active", statusColor: "var(--success)", value: "2,450", valueLabel: "subscribers", desc: "Automated email campaigns and nurture sequences" },
        { title: "Call Tracker", status: "Active", statusColor: "var(--success)", value: "18", valueLabel: "calls this week", desc: "Track and log all client calls and follow-ups" },
        { title: "Market Intel", status: "Beta", statusColor: "var(--warning)", value: "3", valueLabel: "reports", desc: "Neighborhood and market analysis reports" },
      ],
    },
    {
      id: "analytics",
      title: "Analytics & Insights",
      subtitle: "Track performance and pipeline health",
      iconBg: "color-mix(in srgb, var(--info) 12%, transparent)",
      iconColor: "var(--info)",
      apps: [
        { title: "Pipeline View", status: "Active", statusColor: "var(--success)", value: "110", valueLabel: "total leads", desc: "Full pipeline visualization and management" },
        { title: "Performance", status: "Active", statusColor: "var(--success)", value: "87%", valueLabel: "conversion", desc: "Agent performance metrics and trends" },
      ],
    },
  ];

  const toggle = (id: string) => setExpanded(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);

  return (
    <div className="bg-[var(--neutral-50)] rounded-xl overflow-hidden border border-[var(--neutral-200)]">
      <div className="p-4 border-b border-[var(--neutral-100)]">
        <span className="text-sm font-medium text-[var(--neutral-700)]">Category Section — Collapsible app groups with drag handle (click to expand/collapse)</span>
      </div>
      <div className="p-4 space-y-3">
        {categories.map(cat => (
          <div key={cat.id} className="bg-[var(--card-background)] border border-[var(--card-border)] rounded-xl overflow-hidden">
            {/* Header */}
            <button
              onClick={() => toggle(cat.id)}
              className="w-full flex items-center justify-between p-4 hover:bg-[var(--neutral-50)] transition-colors"
            >
              <div className="flex items-center gap-3">
                {/* Drag handle */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--neutral-300)" strokeWidth="1.5" className="cursor-grab"><circle cx="9" cy="6" r="1" fill="var(--neutral-300)" /><circle cx="15" cy="6" r="1" fill="var(--neutral-300)" /><circle cx="9" cy="12" r="1" fill="var(--neutral-300)" /><circle cx="15" cy="12" r="1" fill="var(--neutral-300)" /><circle cx="9" cy="18" r="1" fill="var(--neutral-300)" /><circle cx="15" cy="18" r="1" fill="var(--neutral-300)" /></svg>
                {/* Icon */}
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: cat.iconBg, color: cat.iconColor }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>
                </div>
                {/* Title */}
                <div className="text-left">
                  <h3 className="font-semibold text-[var(--neutral-900)]">{cat.title}</h3>
                  <p className="text-sm text-[var(--neutral-500)]">{cat.subtitle}</p>
                </div>
              </div>
              {/* Chevron */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--neutral-400)" strokeWidth="1.5" className="transition-transform duration-200 shrink-0" style={{ transform: expanded.includes(cat.id) ? "rotate(180deg)" : "rotate(0)" }}><path d="M6 9l6 6 6-6" /></svg>
            </button>

            {/* Content */}
            <div style={{ display: "grid", gridTemplateRows: expanded.includes(cat.id) ? "1fr" : "0fr", transition: "grid-template-rows 300ms ease-in-out" }}>
              <div style={{ overflow: "hidden" }}>
                <div className="px-4 pb-4">
                  <div className="grid grid-cols-3 gap-3">
                    {cat.apps.map(app => (
                      <div key={app.title} className="bg-[var(--card-background)] border border-[var(--card-border)] rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                        <div className="flex items-center justify-between mb-3">
                          <div className="w-8 h-8 rounded-md flex items-center justify-center bg-[var(--neutral-100)]">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--neutral-600)" strokeWidth="1.5"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>
                          </div>
                          <span className="inline-flex items-center px-2.5 py-[4px] text-[11px] font-semibold leading-none rounded-lg" style={{ backgroundColor: `color-mix(in srgb, ${app.statusColor} 15%, transparent)`, color: app.statusColor }}>{app.status}</span>
                        </div>
                        <h4 className="font-semibold text-sm text-[var(--neutral-900)] mb-2">{app.title}</h4>
                        <div className="flex items-baseline gap-1.5 mb-2">
                          <span className="text-2xl font-bold text-[var(--neutral-900)]" style={{ fontFamily: "var(--font-stat)" }}>{app.value}</span>
                          <span className="text-xs text-[var(--neutral-500)]">{app.valueLabel}</span>
                        </div>
                        <p className="text-xs text-[var(--neutral-500)] line-clamp-2">{app.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Drag Hint Demo ─── */

export function DragHintDemo() {
  return (
    <div className="bg-[var(--neutral-50)] rounded-xl overflow-hidden border border-[var(--neutral-200)]">
      <div className="p-4 border-b border-[var(--neutral-100)]">
        <span className="text-sm font-medium text-[var(--neutral-700)]">Drag Hint — Instructional banner for reorderable sections</span>
      </div>
      <div className="p-4 space-y-4">
        {/* Default message */}
        <div className="bg-white rounded-lg border border-[var(--neutral-100)] p-4">
          <p className="text-[10px] font-medium text-[var(--neutral-400)] uppercase tracking-wider mb-3">Default</p>
          <div className="flex items-center justify-center gap-2 text-xs text-[var(--neutral-400)] py-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 6h.01M8 12h.01M8 18h.01M16 6h.01M16 12h.01M16 18h.01" /><path d="M12 2 C6 8 6 16 12 22" opacity="0.3" /></svg>
            <span>Drag sections to rearrange your dashboard</span>
          </div>
        </div>

        {/* Custom message */}
        <div className="bg-white rounded-lg border border-[var(--neutral-100)] p-4">
          <p className="text-[10px] font-medium text-[var(--neutral-400)] uppercase tracking-wider mb-3">Custom message</p>
          <div className="flex items-center justify-center gap-2 text-xs text-[var(--neutral-400)] py-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 6h.01M8 12h.01M8 18h.01M16 6h.01M16 12h.01M16 18h.01" /><path d="M12 2 C6 8 6 16 12 22" opacity="0.3" /></svg>
            <span>Hold and drag to reorder categories</span>
          </div>
        </div>

        {/* In context */}
        <div className="bg-white rounded-lg border border-[var(--neutral-100)] p-4">
          <p className="text-[10px] font-medium text-[var(--neutral-400)] uppercase tracking-wider mb-3">In context (between category sections)</p>
          <div className="space-y-2">
            {/* Mini category mockup */}
            <div className="bg-[var(--neutral-50)] border border-[var(--neutral-200)] rounded-lg px-3 py-2 flex items-center gap-2">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--neutral-300)" strokeWidth="1.5"><circle cx="9" cy="6" r="1" fill="var(--neutral-300)" /><circle cx="15" cy="6" r="1" fill="var(--neutral-300)" /><circle cx="9" cy="12" r="1" fill="var(--neutral-300)" /><circle cx="15" cy="12" r="1" fill="var(--neutral-300)" /></svg>
              <div className="size-6 rounded bg-[var(--brand-primary-light)]" />
              <span className="text-xs text-[var(--neutral-600)] font-medium">Engagement Tools</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--neutral-400)" strokeWidth="1.5" className="ml-auto"><path d="M6 9l6 6 6-6" /></svg>
            </div>
            {/* The hint */}
            <div className="flex items-center justify-center gap-2 text-xs text-[var(--neutral-400)] py-1">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 6h.01M8 12h.01M8 18h.01M16 6h.01M16 12h.01M16 18h.01" /><path d="M12 2 C6 8 6 16 12 22" opacity="0.3" /></svg>
              <span>Drag sections to rearrange your dashboard</span>
            </div>
            {/* Another mini category */}
            <div className="bg-[var(--neutral-50)] border border-[var(--neutral-200)] rounded-lg px-3 py-2 flex items-center gap-2">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--neutral-300)" strokeWidth="1.5"><circle cx="9" cy="6" r="1" fill="var(--neutral-300)" /><circle cx="15" cy="6" r="1" fill="var(--neutral-300)" /><circle cx="9" cy="12" r="1" fill="var(--neutral-300)" /><circle cx="15" cy="12" r="1" fill="var(--neutral-300)" /></svg>
              <div className="size-6 rounded" style={{ background: "color-mix(in srgb, var(--info) 12%, transparent)" }} />
              <span className="text-xs text-[var(--neutral-600)] font-medium">Analytics & Insights</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--neutral-400)" strokeWidth="1.5" className="ml-auto"><path d="M6 9l6 6 6-6" /></svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
