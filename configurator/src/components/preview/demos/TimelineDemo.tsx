const EVENTS = [
  { type: "success", title: "Lead qualified", desc: "Score reached 78. Moved to Qualified stage.", time: "2h ago",
    icon: (c: string) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5L20 7" /></svg> },
  { type: "info", title: "Email sent", desc: "Market update newsletter delivered successfully.", time: "4h ago",
    icon: (c: string) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg> },
  { type: "default", title: "Call completed", desc: "3 min call. Discussed pre-approval timeline.", time: "Yesterday",
    icon: (c: string) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 4h4l2 5-2.5 1.5A11 11 0 0013.5 15L15 12.5l5 2v4a2 2 0 01-2 2A16 16 0 013 4.5 2 2 0 015 4z" /></svg> },
  { type: "warning", title: "Follow-up due", desc: "Scheduled follow-up is overdue by 1 day.", time: "2 days ago",
    icon: (c: string) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><line x1="12" y1="7" x2="12" y2="13" /><circle cx="12" cy="16" r="0.5" fill={c} /></svg> },
  { type: "default", title: "Note added", desc: "Interested in South Jordan area, $400K–$500K range.", time: "3 days ago",
    icon: (c: string) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 3l4 4-10 10H4v-4L14 3z" /><line x1="11" y1="6" x2="15" y2="10" opacity="0.4" /></svg> },
  { type: "success", title: "Lead created", desc: "Added from Home Ready intake form. Initial score: 45.", time: "1 week ago",
    icon: (c: string) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 4-7 8-7s8 3 8 7" /><line x1="17" y1="4" x2="17" y2="8" opacity="0.5" /><line x1="15" y1="6" x2="19" y2="6" opacity="0.5" /></svg> },
];

const TYPE_COLORS: Record<string, { bg: string; text: string }> = {
  success: { bg: "var(--success-light)", text: "var(--success)" },
  info: { bg: "var(--info-light)", text: "var(--info)" },
  warning: { bg: "var(--warning-light)", text: "var(--warning)" },
  default: { bg: "var(--neutral-100)", text: "var(--neutral-600)" },
};

export function TimelineDemo() {
  return (
    <div className="bg-[var(--neutral-50)] rounded-xl overflow-hidden border border-[var(--neutral-200)]">
      <div className="p-4 border-b border-[var(--neutral-100)]">
        <span className="text-sm font-medium text-[var(--neutral-700)]">Timeline / Activity Feed</span>
      </div>
      <div className="p-4">
        <div className="relative pl-10">
          {/* Vertical line — solid, lighter color, behind circles */}
          <div className="absolute left-[15px] top-0 bottom-0 w-[2px] bg-[var(--neutral-100)]" />

          <div className="space-y-4">
            {EVENTS.map((event, i) => {
              const colors = TYPE_COLORS[event.type];
              return (
                <div
                  key={i}
                  className="relative"
                  style={{ animation: `timeline-in 300ms ease-out ${i * 60}ms both` }}
                >
                  <style>{`@keyframes timeline-in { from { opacity: 0; transform: translateX(-8px); } to { opacity: 1; transform: translateX(0); } }`}</style>
                  {/* Icon circle — positioned absolutely on the line, always above it */}
                  <div
                    className="absolute -left-10 top-3 z-10 size-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: colors.bg, color: colors.text, boxShadow: "0 0 0 5px white" }}
                  >
                    {event.icon(colors.text)}
                  </div>
                  {/* Content card */}
                  <div className="bg-white rounded-lg border border-[var(--neutral-100)] p-3 hover:shadow-xs transition-shadow cursor-pointer">
                    <div className="flex items-center justify-between mb-0.5">
                      <p className="text-sm font-medium text-[var(--foreground)]">{event.title}</p>
                      <span className="text-[10px] text-[var(--neutral-400)]">{event.time}</span>
                    </div>
                    <p className="text-xs text-[var(--neutral-500)]">{event.desc}</p>
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
