const ICONS = [
  {
    id: "morning-brew",
    name: "Morning Brew",
    card: "Market Intel",
    accent: "#C9785D",
    bgPattern: "dots",
    render: (size: number) => (
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
        {/* Cup body */}
        <rect x="14" y="24" width="28" height="24" rx="4" stroke="#C9785D" strokeWidth="2.5" fill="none" />
        {/* Cup fill - cream top */}
        <rect x="16" y="26" width="24" height="10" rx="2" fill="#C9785D" opacity="0.12" />
        {/* Cup fill - warm bottom */}
        <rect x="16" y="36" width="24" height="10" rx="2" fill="#C9785D" opacity="0.25" />
        {/* Handle */}
        <path d="M42 30 C50 30 50 42 42 42" stroke="#C9785D" strokeWidth="2.5" fill="none" />
        {/* Steam */}
        <path d="M22 20 C22 16 26 16 26 12" stroke="#C9785D" strokeWidth="1.5" opacity="0.4" strokeLinecap="round" />
        <path d="M28 18 C28 14 32 14 32 10" stroke="#C9785D" strokeWidth="1.5" opacity="0.3" strokeLinecap="round" />
        <path d="M34 20 C34 16 38 16 38 12" stroke="#C9785D" strokeWidth="1.5" opacity="0.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "todays-agenda",
    name: "Today's Agenda",
    card: "Schedule",
    accent: "#6C5CE7",
    bgPattern: "grid",
    render: (size: number) => (
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
        {/* Calendar body */}
        <rect x="12" y="16" width="40" height="36" rx="4" stroke="#6C5CE7" strokeWidth="2.5" />
        {/* Top clips */}
        <line x1="24" y1="10" x2="24" y2="22" stroke="#6C5CE7" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="40" y1="10" x2="40" y2="22" stroke="#6C5CE7" strokeWidth="2.5" strokeLinecap="round" />
        {/* Date dots */}
        {[0,1,2,3,4].map(row => [0,1,2,3,4].map(col => (
          <circle key={`${row}-${col}`} cx={20 + col * 6} cy={30 + row * 5} r="1.5" fill="#6C5CE7" opacity={row === 2 && col === 2 ? 0.8 : 0.15} />
        )))}
      </svg>
    ),
  },
  {
    id: "the-scoreboard",
    name: "The Scoreboard",
    card: "Performance",
    accent: "#C9785D",
    bgPattern: "orbits",
    render: (size: number) => (
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
        {/* Star */}
        <path d="M32 12 L36.5 24.5 L50 25.5 L39.5 34 L42.5 47 L32 40 L21.5 47 L24.5 34 L14 25.5 L27.5 24.5 Z" stroke="#C9785D" strokeWidth="2.5" fill="none" />
        {/* Orbital sparkles */}
        <circle cx="32" cy="32" r="22" stroke="#C9785D" strokeWidth="0.75" strokeDasharray="3 5" opacity="0.25" />
        <circle cx="48" cy="18" r="2" fill="#C9785D" opacity="0.3" />
        <circle cx="18" cy="44" r="1.5" fill="#C9785D" opacity="0.2" />
        <circle cx="32" cy="32" r="2.5" fill="#C9785D" opacity="0.15" />
      </svg>
    ),
  },
  {
    id: "pipeline-rocket",
    name: "Pipeline",
    card: "Discovery",
    accent: "#6C5CE7",
    bgPattern: "matrix",
    render: (size: number) => (
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
        {/* Rocket body */}
        <path d="M32 12 C32 12 24 24 24 38 L32 44 L40 38 C40 24 32 12 32 12Z" stroke="#6C5CE7" strokeWidth="2.5" fill="none" />
        {/* Window */}
        <circle cx="32" cy="28" r="4" stroke="#6C5CE7" strokeWidth="1.5" opacity="0.5" />
        {/* Fins */}
        <path d="M24 38 L18 44 L24 42" stroke="#6C5CE7" strokeWidth="1.5" opacity="0.4" />
        <path d="M40 38 L46 44 L40 42" stroke="#6C5CE7" strokeWidth="1.5" opacity="0.4" />
        {/* Exhaust */}
        <circle cx="32" cy="48" r="2" fill="#6C5CE7" opacity="0.2" />
        <circle cx="32" cy="52" r="1" fill="#6C5CE7" opacity="0.1" />
      </svg>
    ),
  },
  {
    id: "five-before-9",
    name: "Five Before 9",
    card: "Calls",
    accent: "#D9534F",
    bgPattern: "circles",
    render: (size: number) => (
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
        {/* Phone body */}
        <rect x="22" y="14" width="20" height="36" rx="4" stroke="#D9534F" strokeWidth="2.5" />
        {/* Screen */}
        <rect x="26" y="20" width="12" height="18" rx="1" fill="#D9534F" opacity="0.1" />
        {/* Pulse rings */}
        <circle cx="32" cy="29" r="10" stroke="#D9534F" strokeWidth="1" opacity="0.15" />
        <circle cx="32" cy="29" r="16" stroke="#D9534F" strokeWidth="0.75" opacity="0.08" />
        {/* Home button */}
        <circle cx="32" cy="44" r="2" stroke="#D9534F" strokeWidth="1.5" opacity="0.3" />
      </svg>
    ),
  },
  {
    id: "the-vault",
    name: "The Vault",
    card: "Contacts",
    accent: "#6B9080",
    bgPattern: "rings",
    render: (size: number) => (
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
        {/* Target rings */}
        <circle cx="32" cy="32" r="20" stroke="#6B9080" strokeWidth="2" opacity="0.3" />
        <circle cx="32" cy="32" r="13" stroke="#6B9080" strokeWidth="2" opacity="0.5" />
        <circle cx="32" cy="32" r="6" stroke="#6B9080" strokeWidth="2" opacity="0.7" />
        {/* Center dot */}
        <circle cx="32" cy="32" r="2" fill="#6B9080" />
        {/* Crosshairs */}
        <line x1="32" y1="8" x2="32" y2="18" stroke="#6B9080" strokeWidth="1.5" opacity="0.3" />
        <line x1="32" y1="46" x2="32" y2="56" stroke="#6B9080" strokeWidth="1.5" opacity="0.3" />
        <line x1="8" y1="32" x2="18" y2="32" stroke="#6B9080" strokeWidth="1.5" opacity="0.3" />
        <line x1="46" y1="32" x2="56" y2="32" stroke="#6B9080" strokeWidth="1.5" opacity="0.3" />
      </svg>
    ),
  },
];

const PATTERNS: Record<string, (accent: string, opacity: number) => React.ReactNode> = {
  dots: (accent, op) => (
    <>{Array.from({ length: 36 }).map((_, i) => (
      <circle key={i} cx={12 + (i % 6) * 16} cy={12 + Math.floor(i / 6) * 16} r="1.5" fill={accent} opacity={op} />
    ))}</>
  ),
  grid: (accent, op) => (
    <>{Array.from({ length: 36 }).map((_, i) => (
      <circle key={i} cx={12 + (i % 6) * 16} cy={12 + Math.floor(i / 6) * 16} r="2" fill={accent} opacity={op * 0.6} />
    ))}</>
  ),
  circles: (accent, op) => (
    <>{[15, 25, 35].map(r => <circle key={r} cx="50" cy="50" r={r} fill="none" stroke={accent} strokeWidth="1" opacity={op} />)}</>
  ),
  orbits: (accent, op) => (
    <>{[20, 30].map(r => <circle key={r} cx="50" cy="50" r={r} fill="none" stroke={accent} strokeWidth="0.75" strokeDasharray="4 6" opacity={op} />)}
    <circle cx="70" cy="25" r="2" fill={accent} opacity={op * 2} />
    <circle cx="25" cy="70" r="1.5" fill={accent} opacity={op * 1.5} /></>
  ),
  matrix: (accent, op) => (
    <>{Array.from({ length: 49 }).map((_, i) => (
      <circle key={i} cx={8 + (i % 7) * 14} cy={8 + Math.floor(i / 7) * 14} r="1.5" fill={accent} opacity={i === 24 ? op * 3 : op} />
    ))}</>
  ),
  rings: (accent, op) => (
    <><ellipse cx="50" cy="50" rx="25" ry="35" fill="none" stroke={accent} strokeWidth="0.75" opacity={op} />
    <ellipse cx="50" cy="50" rx="35" ry="25" fill="none" stroke={accent} strokeWidth="0.75" opacity={op} /></>
  ),
};

export function IconCatalogDemo() {
  return (
    <div className="bg-[var(--neutral-50)] rounded-xl overflow-hidden border border-[var(--neutral-200)]">
      <div className="p-4 border-b border-[var(--neutral-100)]">
        <span className="text-sm font-medium text-[var(--neutral-700)]">Branded Card Illustration Catalog</span>
        <p className="text-xs text-[var(--neutral-400)] mt-0.5">Each icon is permanently assigned to its section. 3 layers: tinted container + decorative pattern + custom icon.</p>
      </div>
      <div className="p-4 grid grid-cols-3 gap-4">
        {ICONS.map((icon) => (
          <div key={icon.id} className="bg-white rounded-xl border border-[var(--neutral-100)] p-4 flex flex-col items-center">
            {/* 3-layer illustration */}
            <div
              className="relative flex items-center justify-center mb-3 overflow-hidden"
              style={{
                width: 96,
                height: 96,
                borderRadius: 18,
                backgroundColor: `${icon.accent}10`,
              }}
            >
              {/* Layer 2: Pattern */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 96 96">
                {PATTERNS[icon.bgPattern]?.(icon.accent, 0.07)}
              </svg>
              {/* Layer 3: Icon */}
              <div className="relative">
                {icon.render(56)}
              </div>
            </div>
            <p className="text-xs font-semibold text-[var(--foreground)] text-center">{icon.name}</p>
            <p className="text-[10px] text-[var(--neutral-500)] text-center">{icon.card}</p>
            <div className="flex items-center gap-1.5 mt-2">
              <div className="size-3 rounded-full" style={{ backgroundColor: icon.accent }} />
              <span className="text-[9px] text-[var(--neutral-400)] font-mono">{icon.accent}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Dark variant row */}
      <div className="px-4 pb-4">
        <p className="text-[10px] font-medium text-[var(--neutral-500)] uppercase tracking-wider mb-2">Dark Background Variant</p>
        <div className="bg-gradient-to-br from-[var(--neutral-800)] to-[var(--neutral-900)] rounded-xl p-4 flex gap-4 justify-center">
          {ICONS.slice(0, 4).map((icon) => (
            <div
              key={icon.id}
              className="relative flex items-center justify-center overflow-hidden"
              style={{ width: 72, height: 72, borderRadius: 16, backgroundColor: "rgba(255,255,255,0.05)" }}
            >
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 72 72" opacity="0.12">
                {PATTERNS[icon.bgPattern]?.(icon.accent, 0.3)}
              </svg>
              <div className="relative" style={{ opacity: 0.5 }}>
                {icon.render(40)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
