import { useState } from "react";
import type { AppLayout } from "../../hooks/useAppLayouts";

interface AppShellPreviewProps {
  layout: AppLayout;
  appId: string;
  colors: { primary: string; accent: string; pageBackground: string; cardBackground: string; cardBorder: string; primaryText: string; secondaryText: string; tertiaryText: string; heroCardBackground: string; heroCardBorder: string; heroCardTitle: string; heroCardBodyText: string };
}

export function AppShellPreview({ layout, colors }: AppShellPreviewProps) {
  const [activeNav, setActiveNav] = useState(0);
  const [sidebarHovered, setSidebarHovered] = useState(false);

  const p = colors.primary;
  const pLight = p + "1A";

  return (
    <div className="rounded-xl overflow-hidden border" style={{ borderColor: colors.cardBorder, minHeight: 560, backgroundColor: colors.pageBackground }}>
      {/* === TOP SECTION: Logo + Title + Subtitle + Agent card (same row) === */}
      <div className="flex items-start justify-between px-6 pt-6 pb-2">
        {/* Left: Logo + App name + subtitle */}
        <div className="flex items-start gap-4">
          {/* Large logo */}
          <div className="size-16 rounded-2xl flex items-center justify-center shrink-0" style={{ backgroundColor: colors.accent + "20" }}>
            <div className="size-9 rounded-xl" style={{ backgroundColor: colors.accent, opacity: 0.5 }} />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight" style={{ color: colors.primaryText, fontFamily: "var(--font-heading)" }}>{layout.name.toUpperCase()}</h1>
            <p className="text-base mt-0.5" style={{ color: colors.secondaryText, fontFamily: "var(--font-body)" }}>{layout.subtitle}</p>
          </div>
        </div>

        {/* Right: Agent card (aligned with app title, not with subtitle) */}
        <div className="rounded-xl px-4 py-2.5 flex items-center gap-3 mt-1" style={{ backgroundColor: colors.cardBackground, border: `1px solid ${colors.cardBorder}` }}>
          <div className="text-right">
            <p className="text-xs font-medium" style={{ color: colors.primaryText }}>Robyn Nykaza</p>
            <p className="text-[10px]" style={{ color: colors.tertiaryText }}>robyn@example.com</p>
          </div>
          <div className="size-9 rounded-full flex items-center justify-center text-xs font-semibold" style={{ backgroundColor: pLight, color: p }}>RN</div>
        </div>
      </div>

      {/* === HIGHLIGHT PARAGRAPH (below title, above sidebar + content) === */}
      <div className="px-6 pb-4">
        <p className="text-sm leading-relaxed max-w-2xl" style={{ color: colors.secondaryText }}>
          {layout.highlightText.split(/(\d+%?)/g).map((part, i) =>
            /\d+%?/.test(part) ? <span key={i} className="font-bold" style={{ color: p }}>{part}</span> : part
          )}
        </p>
      </div>

      {/* === MAIN AREA: Sidebar + Hero (50%) + Right Card (50%) === */}
      <div className="flex px-6 pb-6 gap-4" style={{ minHeight: 340 }}>
        {/* Sidebar — below everything above, carded */}
        <div
          className="rounded-xl flex-shrink-0 overflow-hidden transition-all duration-300"
          style={{
            width: sidebarHovered ? 200 : 64,
            backgroundColor: colors.cardBackground,
            border: `1px solid ${colors.cardBorder}`,
          }}
          onMouseEnter={() => setSidebarHovered(true)}
          onMouseLeave={() => setSidebarHovered(false)}
        >
          <div className="py-2">
            {layout.sidebarGroups.map((group, gi) => (
              <div key={gi}>
                {group.label && sidebarHovered && (
                  <p className="px-4 pt-3 pb-1 text-[8px] font-semibold uppercase tracking-widest" style={{ color: colors.tertiaryText }}>{group.label}</p>
                )}
                {group.items.map((item, ii) => {
                  const globalIdx = layout.sidebarGroups.slice(0, gi).reduce((a, g) => a + g.items.length, 0) + ii;
                  const isActive = globalIdx === activeNav;
                  return (
                    <button
                      key={ii}
                      onClick={() => setActiveNav(globalIdx)}
                      className="w-full flex items-center gap-2.5 py-2.5 transition-colors"
                      style={{
                        paddingLeft: sidebarHovered ? 16 : 18,
                        paddingRight: 16,
                        backgroundColor: isActive ? p : "transparent",
                        color: isActive ? "#fff" : colors.secondaryText,
                        borderRadius: isActive ? 10 : 0,
                        margin: isActive ? "2px 6px" : "0",
                        width: isActive ? "calc(100% - 12px)" : "100%",
                      }}
                    >
                      <div className="size-5 rounded flex items-center justify-center shrink-0">
                        <div className="size-3 rounded-sm" style={{ backgroundColor: isActive ? "#fff" : colors.tertiaryText, opacity: isActive ? 0.8 : 0.4 }} />
                      </div>
                      {sidebarHovered && <span className="text-xs font-medium whitespace-nowrap">{item.label}</span>}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Hero area — 50% */}
        <div className="flex-1 rounded-xl p-5" style={{ backgroundColor: colors.heroCardBackground, border: `1px solid ${colors.heroCardBorder}` }}>
          <p className="text-[10px] font-semibold uppercase tracking-wider mb-3" style={{ color: colors.heroCardTitle }}>Latest Activity</p>

          {/* Large stats */}
          <div className="flex gap-6 mb-4">
            {["56%", "35%", "32%"].map((val, i) => (
              <div key={i}>
                <p className="text-3xl font-bold" style={{ color: i === 0 ? p : colors.heroCardTitle, fontFamily: "var(--font-stat)" }}>{val}</p>
                <p className="text-[10px]" style={{ color: colors.heroCardBodyText }}>{["Click rate", "Open rate", "30-day avg"][i]}</p>
              </div>
            ))}
          </div>

          {/* Secondary stats row */}
          <div className="flex gap-6">
            {[{ l: "Active Rate", v: "52%" }, { l: "Subscriber total", v: "423" }, { l: "Active Rate", v: "52%" }, { l: "Subscriber total", v: "423" }].map((s, i) => (
              <div key={i}>
                <p className="text-xl font-bold" style={{ color: colors.heroCardTitle, fontFamily: "var(--font-stat)" }}>{s.v}</p>
                <p className="text-[9px]" style={{ color: colors.heroCardBodyText }}>{s.l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right card — 50% */}
        <div className="flex-1 flex flex-col gap-3">
          <div className="rounded-xl p-5 flex-shrink-0" style={{ backgroundColor: colors.cardBackground, border: `1px solid ${colors.cardBorder}` }}>
            <p className="text-[9px] font-semibold uppercase tracking-wider mb-2" style={{ color: p }}>{layout.rightCardTitle || "Today's Quick Take"}</p>
            <p className="text-xl font-bold mb-1" style={{ color: colors.primaryText, fontFamily: "var(--font-heading)" }}>TL;DR:</p>
            <p className="text-sm" style={{ color: colors.secondaryText }}>{layout.rightCardContent || "Here are the latest hot stories of the day."}</p>
          </div>
          {/* Placeholder cards stacked below */}
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="rounded-xl p-3 flex-1" style={{ backgroundColor: colors.accent + "18", border: `1px solid ${colors.accent}30` }}>
              <div className="h-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
