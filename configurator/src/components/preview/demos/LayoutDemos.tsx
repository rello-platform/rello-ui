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

// === Branded illustration patterns (from branded card illustration system) ===
function ConcentricCircles({ accent }: { accent: string }) {
  return <>{[14, 24, 34].map(r => <circle key={r} cx="50%" cy="50%" r={r} fill="none" stroke={accent} strokeWidth="0.8" />)}</>;
}
function DotGrid({ accent }: { accent: string }) {
  return <>{Array.from({ length: 25 }).map((_, i) => <circle key={i} cx={14 + (i % 5) * 16} cy={14 + Math.floor(i / 5) * 16} r="1.8" fill={accent} />)}</>;
}
function OrbitalRings({ accent }: { accent: string }) {
  return <><circle cx="50%" cy="50%" r="20" fill="none" stroke={accent} strokeWidth="0.7" strokeDasharray="4 5" /><circle cx="50%" cy="50%" r="30" fill="none" stroke={accent} strokeWidth="0.7" strokeDasharray="3 6" /><circle cx="68" cy="22" r="2" fill={accent} opacity="0.4" /></>;
}
function DashedOrbits({ accent }: { accent: string }) {
  return <><ellipse cx="44" cy="44" rx="25" ry="18" fill="none" stroke={accent} strokeWidth="0.7" strokeDasharray="3 4" /><ellipse cx="44" cy="44" rx="18" ry="28" fill="none" stroke={accent} strokeWidth="0.7" strokeDasharray="3 4" /><circle cx="60" cy="24" r="2" fill={accent} opacity="0.3" /></>;
}

const CARD_PATTERNS: Record<string, ({ accent }: { accent: string }) => React.ReactNode> = {
  "concentric-circles": ConcentricCircles, "dot-grid": DotGrid, "orbital-rings": OrbitalRings, "dashed-orbits": DashedOrbits,
};

// === Metric visual helpers ===
function ProgressRing({ value, accent, size = 32 }: { value: number; accent: string; size?: number }) {
  const r = (size - 4) / 2;
  const circ = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} className="shrink-0">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={`${accent}20`} strokeWidth="3" />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={accent} strokeWidth="3" strokeDasharray={`${circ * value / 100} ${circ}`} strokeLinecap="round" transform={`rotate(-90 ${size / 2} ${size / 2})`} />
    </svg>
  );
}

function MiniBar({ value, max, accent }: { value: number; max: number; accent: string }) {
  return (
    <div className="h-1.5 rounded-full w-full" style={{ backgroundColor: `${accent}15` }}>
      <div className="h-full rounded-full" style={{ width: `${(value / max) * 100}%`, backgroundColor: accent }} />
    </div>
  );
}

function TrendArrow({ up }: { up: boolean }) {
  return <span className="text-[9px]" style={{ color: up ? "var(--success)" : "var(--error)" }}>{up ? "↑" : "↓"}</span>;
}

// === App definitions ===
interface AppCardDef {
  name: string;
  subtitle: string;
  accent: string;
  pattern: string;
  status: "Active" | "Pending" | "Inactive";
  icon: (s: number) => React.ReactNode;
  metrics: (accent: string) => React.ReactNode;
}

const APP_CARDS: AppCardDef[] = [
  {
    name: "Rello", subtitle: "Command Center", accent: "#7B8EC2", pattern: "orbital-rings", status: "Active",
    icon: (s) => <svg width={s} height={s} viewBox="0 0 48 48" fill="none"><path d="M6 26h8l4-14 6 28 5-14h8" stroke="#7B8EC2" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /><circle cx="37" cy="14" r="3" fill="#7B8EC2" opacity="0.5" /><circle cx="37" cy="14" r="1.5" fill="#7B8EC2" /></svg>,
    metrics: (a) => (
      <div className="flex items-center gap-3 mt-3">
        <div className="flex-1"><p className="text-lg font-bold" style={{ color: a, fontFamily: "var(--font-stat)" }}>12</p><p className="text-[9px] text-[var(--neutral-500)]">Hot Leads <TrendArrow up /></p></div>
        <div className="flex-1"><p className="text-lg font-bold" style={{ color: a, fontFamily: "var(--font-stat)" }}>3</p><p className="text-[9px] text-[var(--neutral-500)]">Pending Close</p></div>
        <div className="flex-1 flex flex-col items-center gap-1"><ProgressRing value={87} accent={a} /><p className="text-[8px] text-[var(--neutral-500)]">Pipeline</p></div>
      </div>
    ),
  },
  {
    name: "The Drumbeat", subtitle: "Daily Action Plan", accent: "#D4943A", pattern: "orbital-rings", status: "Active",
    icon: (s) => <svg width={s} height={s} viewBox="0 0 48 48" fill="none"><path d="M24 8c0 0-8 8-8 20l8 8 8-8c0-12-8-20-8-20z" stroke="#D4943A" strokeWidth="2.5" /><circle cx="24" cy="22" r="3" stroke="#D4943A" strokeWidth="1.5" opacity="0.5" /><path d="M16 28l-4 4 4-1" stroke="#D4943A" strokeWidth="1.5" opacity="0.4" /><path d="M32 28l4 4-4-1" stroke="#D4943A" strokeWidth="1.5" opacity="0.4" /><circle cx="24" cy="40" r="1.5" fill="#D4943A" opacity="0.3" /></svg>,
    metrics: (a) => (
      <div className="mt-3 space-y-2">
        <div className="flex items-center justify-between"><span className="text-[10px] text-[var(--neutral-500)]">4 of 9 actions</span><span className="text-xs font-bold" style={{ color: a }}>44%</span></div>
        <MiniBar value={4} max={9} accent={a} />
        <div className="flex gap-3 pt-1">
          <div><p className="text-sm font-bold" style={{ color: a, fontFamily: "var(--font-stat)" }}>6</p><p className="text-[8px] text-[var(--neutral-500)]">Day Streak</p></div>
          <div><p className="text-sm font-bold" style={{ color: a, fontFamily: "var(--font-stat)" }}>78%</p><p className="text-[8px] text-[var(--neutral-500)]">Consistency</p></div>
        </div>
      </div>
    ),
  },
  {
    name: "Conversations", subtitle: "Unified Comms", accent: "#D4943A", pattern: "orbital-rings", status: "Active",
    icon: (s) => <svg width={s} height={s} viewBox="0 0 48 48" fill="none"><rect x="16" y="8" width="16" height="32" rx="4" stroke="#D4943A" strokeWidth="2" /><rect x="20" y="14" width="8" height="14" rx="1" fill="#D4943A" opacity="0.1" /><circle cx="24" cy="36" r="2" stroke="#D4943A" strokeWidth="1.5" opacity="0.3" /><path d="M34 18 Q38 18 38 22" stroke="#D4943A" strokeWidth="1.5" opacity="0.3" /><path d="M34 14 Q42 14 42 22" stroke="#D4943A" strokeWidth="1.5" opacity="0.2" /></svg>,
    metrics: (a) => (
      <div className="flex items-center gap-3 mt-3">
        <div className="flex-1 rounded-lg p-2 text-center" style={{ backgroundColor: `${a}12` }}><p className="text-lg font-bold" style={{ color: a, fontFamily: "var(--font-stat)" }}>5</p><p className="text-[8px] text-[var(--neutral-500)]">Unread</p></div>
        <div className="flex-1 rounded-lg p-2 text-center" style={{ backgroundColor: `${a}12` }}><p className="text-lg font-bold" style={{ color: a, fontFamily: "var(--font-stat)" }}>2</p><p className="text-[8px] text-[var(--neutral-500)]">Missed</p></div>
        <div className="flex-1 flex flex-col items-center gap-1"><ProgressRing value={94} accent={a} /><p className="text-[8px] text-[var(--neutral-500)]">Response</p></div>
      </div>
    ),
  },
  {
    name: "Home Ready", subtitle: "Buyer Qualification", accent: "#5B9EA6", pattern: "concentric-circles", status: "Active",
    icon: (s) => <svg width={s} height={s} viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="16" stroke="#5B9EA6" strokeWidth="2" /><circle cx="24" cy="24" r="12" stroke="#5B9EA6" strokeWidth="1" opacity="0.3" /><polygon points="24,10 28,22 24,26 20,22" fill="#5B9EA6" opacity="0.3" /><polygon points="24,38 20,26 24,22 28,26" fill="#5B9EA6" opacity="0.15" /><circle cx="24" cy="24" r="2" fill="#5B9EA6" /></svg>,
    metrics: (a) => (
      <div className="mt-3 space-y-2">
        <div className="flex gap-3">
          <div><p className="text-lg font-bold" style={{ color: a, fontFamily: "var(--font-stat)" }}>1,247</p><p className="text-[8px] text-[var(--neutral-500)]">Assessments <TrendArrow up /></p></div>
          <div><p className="text-lg font-bold" style={{ color: a, fontFamily: "var(--font-stat)" }}>342</p><p className="text-[8px] text-[var(--neutral-500)]">Qualified</p></div>
        </div>
        <div className="h-2 rounded-full overflow-hidden" style={{ background: "linear-gradient(to right, #93c5fd, #06b6d4, #22d3ee, #facc15, #fb923c, #ef4444)" }} />
        <p className="text-[8px] text-[var(--neutral-500)]">Pipeline Temperature</p>
      </div>
    ),
  },
  {
    name: "The HomeStretch", subtitle: "Education & Closing", accent: "#5E8C6A", pattern: "concentric-circles", status: "Active",
    icon: (s) => <svg width={s} height={s} viewBox="0 0 48 48" fill="none"><path d="M10 38 Q16 28 20 30 Q24 32 28 24 Q32 16 38 12" stroke="#5E8C6A" strokeWidth="2.5" fill="none" strokeLinecap="round" /><circle cx="16" cy="32" r="2" fill="#5E8C6A" opacity="0.2" /><circle cx="24" cy="26" r="2" fill="#5E8C6A" opacity="0.3" /><circle cx="32" cy="18" r="2" fill="#5E8C6A" opacity="0.4" /><path d="M38 8v8h-4" stroke="#5E8C6A" strokeWidth="2" fill="none" /></svg>,
    metrics: (a) => (
      <div className="flex items-center gap-3 mt-3">
        <div className="flex-1"><p className="text-lg font-bold" style={{ color: a, fontFamily: "var(--font-stat)" }}>127</p><p className="text-[8px] text-[var(--neutral-500)]">Active Journeys</p></div>
        <div className="flex-1 flex flex-col items-center gap-1"><ProgressRing value={73} accent={a} /><p className="text-[8px] text-[var(--neutral-500)]">Completion</p></div>
        <div className="flex-1"><p className="text-lg font-bold" style={{ color: a, fontFamily: "var(--font-stat)" }}>89</p><p className="text-[8px] text-[var(--neutral-500)]">Graduated <TrendArrow up /></p></div>
      </div>
    ),
  },
  {
    name: "Open House Hub", subtitle: "Capture Every Visitor", accent: "#A67B8A", pattern: "orbital-rings", status: "Pending",
    icon: (s) => <svg width={s} height={s} viewBox="0 0 48 48" fill="none"><rect x="14" y="12" width="16" height="26" rx="2" stroke="#A67B8A" strokeWidth="2" /><path d="M14 24h16" stroke="#A67B8A" strokeWidth="1" opacity="0.2" /><rect x="22" y="24" width="3" height="10" rx="1.5" fill="#A67B8A" opacity="0.3" /><path d="M14 18 Q6 24 14 30" stroke="#A67B8A" strokeWidth="1.2" opacity="0.3" /><path d="M14 20 Q8 24 14 28" stroke="#A67B8A" strokeWidth="1.2" opacity="0.2" /></svg>,
    metrics: (a) => (
      <div className="mt-3 space-y-2">
        <div className="flex gap-3">
          <div className="flex-1 rounded-lg p-2 text-center" style={{ backgroundColor: `${a}12` }}><p className="text-lg font-bold" style={{ color: a, fontFamily: "var(--font-stat)" }}>23</p><p className="text-[8px] text-[var(--neutral-500)]">Sign-ins</p></div>
          <div className="flex-1 rounded-lg p-2 text-center" style={{ backgroundColor: `${a}12` }}><p className="text-lg font-bold" style={{ color: a, fontFamily: "var(--font-stat)" }}>8</p><p className="text-[8px] text-[var(--neutral-500)]">Qualified</p></div>
        </div>
        <div className="flex items-center gap-1.5"><span className="size-1.5 rounded-full bg-[var(--warning)]" /><span className="text-[9px] text-[var(--neutral-500)]">3 upcoming events</span></div>
      </div>
    ),
  },
  {
    name: "Newsletter Studio", subtitle: "Build Newsletters", accent: "#6E6EA8", pattern: "dot-grid", status: "Active",
    icon: (s) => <svg width={s} height={s} viewBox="0 0 48 48" fill="none"><path d="M8 16l16 10 16-10" stroke="#6E6EA8" strokeWidth="2" /><rect x="8" y="16" width="32" height="22" rx="3" stroke="#6E6EA8" strokeWidth="2" /><rect x="14" y="10" width="20" height="8" rx="2" stroke="#6E6EA8" strokeWidth="1.5" opacity="0.3" /></svg>,
    metrics: (a) => (
      <div className="flex items-center gap-3 mt-3">
        <div className="flex-1 flex flex-col items-center gap-1"><ProgressRing value={34.7} accent={a} size={36} /><p className="text-[8px] text-[var(--neutral-500)]">Open Rate</p></div>
        <div className="flex-1"><p className="text-lg font-bold" style={{ color: a, fontFamily: "var(--font-stat)" }}>423</p><p className="text-[8px] text-[var(--neutral-500)]">Subscribers <TrendArrow up /></p></div>
        <div className="flex-1"><p className="text-lg font-bold" style={{ color: a, fontFamily: "var(--font-stat)" }}>12</p><p className="text-[8px] text-[var(--neutral-500)]">Sent</p></div>
      </div>
    ),
  },
  {
    name: "Market Intel", subtitle: "Broadcast What Matters", accent: "#4A7B94", pattern: "dot-grid", status: "Active",
    icon: (s) => <svg width={s} height={s} viewBox="0 0 48 48" fill="none"><path d="M8 38l8-12 6 6 8-14 10 8" stroke="#4A7B94" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /><circle cx="40" cy="26" r="3" stroke="#4A7B94" strokeWidth="1.5" opacity="0.4" /><line x1="8" y1="38" x2="40" y2="38" stroke="#4A7B94" strokeWidth="1" opacity="0.2" /></svg>,
    metrics: (a) => (
      <div className="mt-3 space-y-2">
        <div className="flex gap-3">
          <div className="flex-1 flex flex-col items-center gap-1"><ProgressRing value={65} accent={a} /><p className="text-[8px] text-[var(--neutral-500)]">Open Rate</p></div>
          <div className="flex-1 flex flex-col items-center gap-1"><ProgressRing value={75} accent={a} /><p className="text-[8px] text-[var(--neutral-500)]">Listen Rate</p></div>
        </div>
        <div className="flex items-center justify-between"><span className="text-[9px] text-[var(--neutral-500)]">8 broadcasts sent</span><TrendArrow up /></div>
      </div>
    ),
  },
  {
    name: "Harvest Home", subtitle: "Find Leads First", accent: "#C27052", pattern: "dashed-orbits", status: "Active",
    icon: (s) => <svg width={s} height={s} viewBox="0 0 48 48" fill="none"><circle cx="20" cy="20" r="10" stroke="#C27052" strokeWidth="2" /><line x1="27" y1="27" x2="38" y2="38" stroke="#C27052" strokeWidth="2.5" strokeLinecap="round" /><circle cx="18" cy="18" r="2" fill="#C27052" opacity="0.4" /><circle cx="24" cy="16" r="1.5" fill="#C27052" opacity="0.3" /><circle cx="16" cy="22" r="1.5" fill="#C27052" opacity="0.3" /></svg>,
    metrics: (a) => (
      <div className="flex items-center gap-3 mt-3">
        <div className="flex-1"><p className="text-lg font-bold" style={{ color: a, fontFamily: "var(--font-stat)" }}>47</p><p className="text-[8px] text-[var(--neutral-500)]">New Expired <TrendArrow up /></p></div>
        <div className="flex-1"><p className="text-lg font-bold" style={{ color: a, fontFamily: "var(--font-stat)" }}>12</p><p className="text-[8px] text-[var(--neutral-500)]">Matched</p></div>
        <div className="flex-1"><p className="text-lg font-bold" style={{ color: a, fontFamily: "var(--font-stat)" }}>5</p><p className="text-[8px] text-[var(--neutral-500)]">Contacted</p></div>
      </div>
    ),
  },
];

const STATUS_COLORS: Record<string, string> = { Active: "var(--success)", Pending: "var(--warning)", Inactive: "var(--neutral-400)" };

export function AppCardDemo() {
  return (
    <div className="bg-[var(--neutral-50)] rounded-xl overflow-hidden border border-[var(--neutral-200)]">
      <div className="p-4 border-b border-[var(--neutral-100)]">
        <span className="text-sm font-medium text-[var(--neutral-700)]">App Card — Platform application cards (click to open dashboard)</span>
      </div>
      <div className="p-4 grid grid-cols-3 gap-3">
        {APP_CARDS.map(app => {
          const PatternComp = CARD_PATTERNS[app.pattern];
          const statusColor = STATUS_COLORS[app.status];
          return (
            <div key={app.name} className="bg-white rounded-xl border border-[var(--neutral-100)] overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
              {/* Branded illustration header */}
              <div className="relative flex items-center justify-center overflow-hidden" style={{ height: 72, backgroundColor: `${app.accent}0A` }}>
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 88 88" preserveAspectRatio="xMidYMid slice" style={{ opacity: 0.05 }}>
                  {PatternComp && <PatternComp accent={app.accent} />}
                </svg>
                <div className="relative">{app.icon(40)}</div>
              </div>
              {/* Card body */}
              <div className="px-4 pb-4 pt-3">
                <div className="flex items-start justify-between mb-0.5">
                  <p className="text-sm font-semibold text-[var(--foreground)]" style={{ fontFamily: "var(--font-heading)" }}>{app.name}</p>
                  <span className="inline-flex items-center px-2 py-0.5 text-[9px] font-medium rounded-full shrink-0" style={{ backgroundColor: `color-mix(in srgb, ${statusColor} 15%, transparent)`, color: statusColor }}>
                    {app.status}
                  </span>
                </div>
                <p className="text-[10px] text-[var(--neutral-400)]">{app.subtitle}</p>
                {app.metrics(app.accent)}
              </div>
            </div>
          );
        })}
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
