export function BrandedIllustrationDemo({ params }: { params: { iconSize?: number; containerSize?: number; containerOpacity?: number; patternOpacity?: number } }) {
  const iconSize = params.iconSize ?? 84;
  const containerSize = params.containerSize ?? 88;
  const containerOpacity = params.containerOpacity ?? 0.08;
  const patternOpacity = params.patternOpacity ?? 0.07;

  const illustrations = [
    { title: "Five Before 9", subtitle: "Calls", accent: "var(--hot)", pattern: "circles" },
    { title: "The Pulse", subtitle: "Active Deals", accent: "var(--brand-primary)", pattern: "waves" },
    { title: "Morning Brew", subtitle: "Market Intel", accent: "var(--brand-accent)", pattern: "dots" },
    { title: "The Vault", subtitle: "Contacts", accent: "var(--success)", pattern: "rings" },
  ];

  return (
    <div className="bg-[var(--neutral-50)] rounded-xl overflow-hidden border border-[var(--neutral-200)]">
      <div className="p-4 border-b border-[var(--neutral-100)]">
        <span className="text-sm font-medium text-[var(--neutral-700)]">Branded Card Illustration — 3 Layers</span>
      </div>
      <div className="p-4 grid grid-cols-2 gap-4">
        {illustrations.map((item) => (
          <div key={item.title} className="bg-white rounded-xl border border-[var(--neutral-100)] p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-heading text-sm font-semibold text-[var(--foreground)]">{item.title}</p>
                <p className="text-xs text-[var(--neutral-500)]">{item.subtitle}</p>
              </div>
              {/* The 3-layer illustration */}
              <div
                className="relative flex items-center justify-center overflow-hidden"
                style={{
                  width: containerSize,
                  height: containerSize,
                  borderRadius: 18,
                  backgroundColor: `color-mix(in srgb, ${item.accent} ${containerOpacity * 100}%, transparent)`,
                }}
              >
                {/* Layer 2: Decorative pattern */}
                <svg className="absolute inset-0 w-full h-full" style={{ opacity: patternOpacity }}>
                  {item.pattern === "circles" && (
                    <>
                      <circle cx="50%" cy="50%" r="15" fill="none" stroke={item.accent} strokeWidth="1" />
                      <circle cx="50%" cy="50%" r="25" fill="none" stroke={item.accent} strokeWidth="1" />
                      <circle cx="50%" cy="50%" r="35" fill="none" stroke={item.accent} strokeWidth="1" />
                    </>
                  )}
                  {item.pattern === "dots" && (
                    <>
                      {Array.from({ length: 25 }).map((_, i) => (
                        <circle key={i} cx={16 + (i % 5) * 15} cy={16 + Math.floor(i / 5) * 15} r="2" fill={item.accent} />
                      ))}
                    </>
                  )}
                  {item.pattern === "waves" && (
                    <path d={`M0,${containerSize / 2} Q${containerSize / 4},${containerSize / 4} ${containerSize / 2},${containerSize / 2} T${containerSize},${containerSize / 2}`} fill="none" stroke={item.accent} strokeWidth="1.5" />
                  )}
                  {item.pattern === "rings" && (
                    <>
                      <ellipse cx="50%" cy="50%" rx="20" ry="30" fill="none" stroke={item.accent} strokeWidth="1" />
                      <ellipse cx="50%" cy="50%" rx="30" ry="20" fill="none" stroke={item.accent} strokeWidth="1" />
                    </>
                  )}
                </svg>
                {/* Layer 3: Primary icon */}
                <div
                  className="relative rounded-xl flex items-center justify-center"
                  style={{ width: iconSize * 0.5, height: iconSize * 0.5 }}
                >
                  <svg width={iconSize * 0.4} height={iconSize * 0.4} viewBox="0 0 24 24" fill="none" stroke={item.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.7 }}>
                    {item.pattern === "circles" && <><path d="M18.118 14.702L14 16.5V7.5l4.118 1.798a1 1 0 0 1 .582.808v3.788a1 1 0 0 1-.582.808zM14 16.5l-8.5 2A1 1 0 0 1 4 17.56V6.44a1 1 0 0 1 1.5-.94L14 7.5" /></>}
                    {item.pattern === "waves" && <><path d="M3 12h2l3-9 4 18 3-9h2" /><circle cx="19" cy="6" r="2" fill={item.accent} /></>}
                    {item.pattern === "dots" && <><path d="M17 12a5 5 0 1 0-3.584 4.775" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" strokeWidth="2" /><line x1="15" y1="9" x2="15.01" y2="9" strokeWidth="2" /></>}
                    {item.pattern === "rings" && <><circle cx="12" cy="12" r="3" /><circle cx="12" cy="12" r="8" /><line x1="12" y1="1" x2="12" y2="4" /><line x1="12" y1="20" x2="12" y2="23" /></>}
                  </svg>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Dark background variant */}
      <div className="p-4 pt-0">
        <p className="text-[10px] font-medium text-[var(--neutral-500)] uppercase tracking-wider mb-1.5">Dark Background Variant</p>
        <div className="bg-gradient-to-br from-[var(--neutral-800)] to-[var(--neutral-900)] rounded-xl p-4 flex items-start justify-between">
          <div>
            <p className="font-heading text-sm font-semibold text-white">Five Before 9</p>
            <p className="text-xs text-white/50">3 calls remaining</p>
          </div>
          <div
            className="relative flex items-center justify-center overflow-hidden"
            style={{ width: containerSize, height: containerSize, borderRadius: 18, backgroundColor: "rgba(255,255,255,0.06)" }}
          >
            <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.15 }}>
              <circle cx="50%" cy="50%" r="15" fill="none" stroke="var(--brand-accent)" strokeWidth="1" />
              <circle cx="50%" cy="50%" r="25" fill="none" stroke="var(--brand-accent)" strokeWidth="1" />
            </svg>
            <svg width={iconSize * 0.4} height={iconSize * 0.4} viewBox="0 0 24 24" fill="none" stroke="var(--brand-accent)" strokeWidth="1.5" style={{ opacity: 0.5 }}>
              <path d="M18.118 14.702L14 16.5V7.5l4.118 1.798a1 1 0 0 1 .582.808v3.788a1 1 0 0 1-.582.808zM14 16.5l-8.5 2A1 1 0 0 1 4 17.56V6.44a1 1 0 0 1 1.5-.94L14 7.5" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
