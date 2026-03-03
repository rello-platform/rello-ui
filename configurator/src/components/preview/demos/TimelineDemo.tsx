const EVENTS = [
  { type: "success", icon: "✓", title: "Lead qualified", desc: "Score reached 78. Moved to Qualified stage.", time: "2h ago" },
  { type: "info", icon: "✉", title: "Email sent", desc: "Market update newsletter delivered successfully.", time: "4h ago" },
  { type: "default", icon: "☎", title: "Call completed", desc: "3 min call. Discussed pre-approval timeline.", time: "Yesterday" },
  { type: "warning", icon: "!", title: "Follow-up due", desc: "Scheduled follow-up is overdue by 1 day.", time: "2 days ago" },
  { type: "default", icon: "📝", title: "Note added", desc: "Interested in South Jordan area, $400K–$500K range.", time: "3 days ago" },
  { type: "success", icon: "★", title: "Lead created", desc: "Added from Home Ready intake form. Initial score: 45.", time: "1 week ago" },
];

const TYPE_STYLES: Record<string, string> = {
  success: "bg-[var(--success-light)] text-[var(--success)]",
  info: "bg-[var(--info-light)] text-[var(--info)]",
  warning: "bg-[var(--warning-light)] text-[var(--warning)]",
  default: "bg-[var(--neutral-100)] text-[var(--neutral-600)]",
};

export function TimelineDemo() {
  return (
    <div className="bg-[var(--neutral-50)] rounded-xl overflow-hidden border border-[var(--neutral-200)]">
      <div className="p-4 border-b border-[var(--neutral-100)]">
        <span className="text-sm font-medium text-[var(--neutral-700)]">Timeline / Activity Feed</span>
      </div>
      <div className="p-4">
        <div className="relative">
          {/* Vertical line — positioned to align with circle centers */}
          <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-[var(--neutral-200)]" />

          <div className="space-y-4">
            {EVENTS.map((event, i) => (
              <div
                key={i}
                className="relative flex items-start gap-3 pl-1"
                style={{ animation: `timeline-in 300ms ease-out ${i * 60}ms both` }}
              >
                <style>{`@keyframes timeline-in { from { opacity: 0; transform: translateX(-8px); } to { opacity: 1; transform: translateX(0); } }`}</style>
                {/* Icon circle — always aligned to top of content card */}
                <div className={`relative z-10 size-8 rounded-full flex items-center justify-center text-xs shrink-0 mt-2.5 ${TYPE_STYLES[event.type]}`}>
                  {event.icon}
                </div>
                {/* Content */}
                <div className="flex-1 bg-white rounded-lg border border-[var(--neutral-100)] p-3 hover:shadow-xs transition-shadow cursor-pointer">
                  <div className="flex items-center justify-between mb-0.5">
                    <p className="text-sm font-medium text-[var(--foreground)]">{event.title}</p>
                    <span className="text-[10px] text-[var(--neutral-400)]">{event.time}</span>
                  </div>
                  <p className="text-xs text-[var(--neutral-500)]">{event.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
