import { useState } from "react";

export function DividerDemo() {
  return (
    <div className="bg-[var(--neutral-50)] rounded-xl overflow-hidden border border-[var(--neutral-200)]">
      <div className="p-4 border-b border-[var(--neutral-100)]">
        <span className="text-sm font-medium text-[var(--neutral-700)]">Divider / Separator</span>
      </div>
      <div className="p-4 space-y-6">
        <div className="bg-white rounded-lg border border-[var(--neutral-100)] p-4">
          <p className="text-sm text-[var(--foreground)] mb-3">Section above divider</p>
          <div className="h-px bg-[var(--neutral-100)] my-3" />
          <p className="text-sm text-[var(--foreground)]">Section below divider</p>
        </div>
        <div className="bg-white rounded-lg border border-[var(--neutral-100)] p-4">
          <p className="text-sm text-[var(--foreground)] mb-3">Content block</p>
          <div className="flex items-center gap-3 my-3">
            <div className="flex-1 h-px bg-[var(--neutral-200)]" />
            <span className="text-xs text-[var(--neutral-400)]">or</span>
            <div className="flex-1 h-px bg-[var(--neutral-200)]" />
          </div>
          <p className="text-sm text-[var(--foreground)]">Alternative content</p>
        </div>
        <div className="bg-white rounded-lg border border-[var(--neutral-100)] p-4">
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-[var(--neutral-200)]" />
            <span className="text-xs text-[var(--neutral-400)] font-medium uppercase tracking-wider">Section Title</span>
            <div className="flex-1 h-px bg-[var(--neutral-200)]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function AccordionDemo() {
  const [openItems, setOpenItems] = useState<string[]>(["faq1"]);
  const items = [
    { id: "faq1", title: "How does lead scoring work?", content: "Rello uses a combination of engagement metrics, response time, and property interest signals to calculate a 0–100 lead score. The score updates in real-time as the lead interacts with your content." },
    { id: "faq2", title: "Can I customize my pipeline stages?", content: "The five pipeline stages (Cold, Warming, Engaged, Qualified, Hot) are universal across the platform. This ensures consistency in reporting and cross-team visibility." },
    { id: "faq3", title: "How do I set up white-label branding?", content: "Navigate to Settings > Branding. You can customize your primary brand color and accent color. These changes propagate to all consumer-facing apps automatically." },
    { id: "faq4", title: "What integrations are available?", content: "Rello integrates with major MLS systems, CRMs (Follow Up Boss, kvCORE), email providers (Mailgun), and social platforms. Check Settings > Integrations for the full list." },
  ];

  const toggle = (id: string) => setOpenItems(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);

  return (
    <div className="bg-[var(--neutral-50)] rounded-xl overflow-hidden border border-[var(--neutral-200)]">
      <div className="p-4 border-b border-[var(--neutral-100)]">
        <span className="text-sm font-medium text-[var(--neutral-700)]">Accordion / Collapsible — Click to expand</span>
      </div>
      <div className="p-4">
        <div className="bg-white rounded-lg border border-[var(--neutral-100)] divide-y divide-[var(--neutral-100)] overflow-hidden">
          {items.map(item => (
            <div key={item.id}>
              <button onClick={() => toggle(item.id)} className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-[var(--neutral-50)] transition-colors">
                <span className={`text-sm ${openItems.includes(item.id) ? "text-[var(--brand-primary)] font-bold" : "text-[var(--foreground)] font-medium"}`}>{item.title}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--neutral-400)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 shrink-0" style={{ transform: openItems.includes(item.id) ? "rotate(180deg)" : "rotate(0)" }}><path d="M6 9l6 6 6-6" /></svg>
              </button>
              <div style={{ maxHeight: openItems.includes(item.id) ? 200 : 0, overflow: "hidden", transition: "max-height 200ms ease-out" }}>
                <div className="px-4 pb-3">
                  <p className="text-sm text-[var(--neutral-600)]">{item.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ListItemDemo() {
  return (
    <div className="bg-[var(--neutral-50)] rounded-xl overflow-hidden border border-[var(--neutral-200)]">
      <div className="p-4 border-b border-[var(--neutral-100)]">
        <span className="text-sm font-medium text-[var(--neutral-700)]">List Item / Row — Hover and click</span>
      </div>
      <div className="m-4 bg-white rounded-lg border border-[var(--neutral-100)] divide-y divide-[var(--neutral-100)] overflow-hidden">
        {[
          { name: "Sarah Johnson", sub: "sarah@example.com", stage: "hot", time: "2h ago" },
          { name: "Mike Chen", sub: "mike@example.com", stage: "qualified", time: "4h ago" },
          { name: "Emily Davis", sub: "emily@example.com", stage: "engaged", time: "Yesterday" },
          { name: "David Wilson", sub: "david@example.com", stage: "warming", time: "2 days ago" },
        ].map(item => (
          <div key={item.name} className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-[var(--neutral-50)] transition-colors group">
            <div className="size-9 rounded-full bg-[var(--brand-primary-light)] flex items-center justify-center text-xs font-medium text-[var(--brand-primary)]">
              {item.name.split(" ").map(n => n[0]).join("")}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[var(--foreground)]">{item.name}</p>
              <p className="text-xs text-[var(--neutral-500)] truncate">{item.sub}</p>
            </div>
            <span className="inline-flex items-center justify-center px-2.5 py-[4px] text-[11px] font-semibold font-ui leading-none rounded-lg shadow-[0_1px_1px_0.5px_rgba(0,0,0,0.4)] capitalize" style={{ backgroundColor: `var(--${item.stage}-light)`, color: `var(--${item.stage})` }}>
              {item.stage}
            </span>
            <span className="text-[10px] text-[var(--neutral-400)]">{item.time}</span>
            <button className="size-7 rounded-md flex items-center justify-center text-[var(--neutral-400)] opacity-0 group-hover:opacity-100 hover:bg-[var(--neutral-100)] transition-all text-xs">⋯</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AppCardDemo() {
  const apps = [
    { name: "Home Ready", status: "Active", metric: "1,247", metricLabel: "Leads", color: "var(--success)" },
    { name: "Newsletter Studio", status: "Active", metric: "34", metricLabel: "Active Flows", color: "var(--success)" },
    { name: "Open House Hub", status: "Pending", metric: "0", metricLabel: "Events", color: "var(--warning)" },
  ];

  return (
    <div className="bg-[var(--neutral-50)] rounded-xl overflow-hidden border border-[var(--neutral-200)]">
      <div className="p-4 border-b border-[var(--neutral-100)]">
        <span className="text-sm font-medium text-[var(--neutral-700)]">App Card — Platform application cards</span>
      </div>
      <div className="p-4 grid grid-cols-3 gap-3">
        {apps.map(app => (
          <div key={app.name} className="bg-white rounded-xl border border-[var(--neutral-100)] p-4 cursor-pointer hover:shadow-sm transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="size-10 rounded-lg bg-[var(--brand-primary-light)] flex items-center justify-center">
                <div className="size-5 rounded bg-[var(--brand-primary)] opacity-40" />
              </div>
              <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-medium rounded-full" style={{ backgroundColor: `color-mix(in srgb, ${app.color} 15%, transparent)`, color: app.color }}>
                {app.status}
              </span>
            </div>
            <p className="text-sm font-semibold text-[var(--foreground)]">{app.name}</p>
            <p className="font-stat text-lg font-bold text-[var(--brand-primary)] mt-1">{app.metric}</p>
            <p className="text-[10px] text-[var(--neutral-500)]">{app.metricLabel}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function WhiteLabelPreviewDemo() {
  return (
    <div className="bg-[var(--neutral-50)] rounded-xl overflow-hidden border border-[var(--neutral-200)]">
      <div className="p-4 border-b border-[var(--neutral-100)]">
        <span className="text-sm font-medium text-[var(--neutral-700)]">White-Label Preview — Live branding mockup</span>
      </div>
      <div className="p-4">
        <p className="text-[10px] text-[var(--neutral-400)] mb-2 uppercase tracking-wider font-medium">Preview</p>
        <div className="border-2 border-dashed border-[var(--neutral-200)] rounded-xl overflow-hidden" style={{ transform: "scale(0.85)", transformOrigin: "top left", width: "117.6%" }}>
          {/* Mini app mockup */}
          <div className="bg-[var(--brand-primary)] px-4 py-3 flex items-center justify-between">
            <span className="text-white text-sm font-bold">Your Brand</span>
            <div className="size-7 rounded-full bg-white/20" />
          </div>
          <div className="bg-white p-4">
            <h3 className="font-heading text-lg font-bold text-[var(--foreground)] mb-1">Welcome to Home Ready</h3>
            <p className="text-xs text-[var(--neutral-500)] mb-3">Find out how ready you are to buy a home.</p>
            <button className="px-4 py-2 text-sm rounded-md bg-[var(--brand-primary)] text-white font-medium">Get Started</button>
            <a className="ml-3 text-sm text-[var(--brand-primary)]">Learn more</a>
            <div className="mt-4 p-3 rounded-lg" style={{ backgroundColor: "var(--brand-accent-light)" }}>
              <p className="text-xs" style={{ color: "var(--brand-accent)" }}>Accent color section — highlights and secondary actions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
