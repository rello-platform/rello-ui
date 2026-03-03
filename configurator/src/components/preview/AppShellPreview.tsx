import { useState } from "react";
import type { AppLayout } from "../../hooks/useAppLayouts";

interface AppShellPreviewProps {
  layout: AppLayout;
  appId: string;
  colors: { primary: string; accent: string; pageBackground: string; cardBackground: string; cardBorder: string; primaryText: string; secondaryText: string; tertiaryText: string; heroCardBackground: string; heroCardBorder: string; heroCardTitle: string; heroCardBodyText: string; appTitleColor?: string; appSubtitleColor?: string };
}

export function AppShellPreview({ layout, colors }: AppShellPreviewProps) {
  const [activeNav, setActiveNav] = useState(0);
  const [sidebarHovered, setSidebarHovered] = useState(false);

  const p = colors.primary;
  const pLight = p + "1A";
  const titleColor = colors.appTitleColor || colors.primaryText;
  const subtitleColor = colors.appSubtitleColor || colors.secondaryText;

  const defaultMessage = `Welcome to ${layout.name}! Get started using the app by moving through the menu items to the left.`;
  const navItems = ["Dashboard", "Section 2", "Section 3", "Section 4"];

  return (
    <div className="rounded-xl overflow-hidden border" style={{ borderColor: colors.cardBorder, minHeight: 540, backgroundColor: colors.pageBackground }}>
      {/* === TOP ROW: Logo + Title on left, Agent card on right === */}
      <div className="flex items-start justify-between px-6 pt-6">
        {/* Left: Logo + Title + Subtitle + Welcome message (all stacked, message aligned with subtitle) */}
        <div className="flex items-start gap-4 max-w-xl">
          {/* Large logo */}
          <div className="size-16 rounded-2xl flex items-center justify-center shrink-0" style={{ backgroundColor: colors.accent + "20" }}>
            <div className="size-9 rounded-xl" style={{ backgroundColor: colors.accent, opacity: 0.5 }} />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight leading-tight" style={{ color: titleColor, fontFamily: "var(--font-app-title)" }}>{layout.name}</h1>
            <p className="text-base" style={{ color: subtitleColor, fontFamily: "var(--font-app-subtitle)" }}>{layout.subtitle}</p>
            {/* Welcome/highlight message — aligned with subtitle, not under logo */}
            <p className="text-sm leading-relaxed mt-1.5" style={{ color: colors.secondaryText }}>
              {defaultMessage.split(/(\d+%?)/g).map((part, i) =>
                /\d+%?/.test(part) ? <span key={i} className="font-bold" style={{ color: p }}>{part}</span> : part
              )}
            </p>
          </div>
        </div>

        {/* Right: Agent card — aligned with title */}
        <div className="rounded-xl px-4 py-2.5 flex items-center gap-3 shrink-0" style={{ backgroundColor: colors.cardBackground, border: `1px solid ${colors.cardBorder}` }}>
          <div className="text-right">
            <p className="text-xs font-medium" style={{ color: colors.primaryText }}>Robyn Nykaza</p>
            <p className="text-[10px]" style={{ color: colors.tertiaryText }}>robyn@example.com</p>
          </div>
          <div className="size-9 rounded-full flex items-center justify-center text-xs font-semibold" style={{ backgroundColor: pLight, color: p }}>RN</div>
        </div>
      </div>

      {/* === MAIN AREA: Sidebar + Hero (50%) + Right Card (50%) === */}
      <div className="flex px-6 pt-4 pb-6 gap-4" style={{ minHeight: 320 }}>
        {/* Sidebar — carded, below title block, collapses to icons */}
        <div
          className="rounded-xl flex-shrink-0 overflow-hidden transition-all duration-300"
          style={{
            width: sidebarHovered ? 190 : 60,
            backgroundColor: colors.cardBackground,
            border: `1px solid ${colors.cardBorder}`,
          }}
          onMouseEnter={() => setSidebarHovered(true)}
          onMouseLeave={() => setSidebarHovered(false)}
        >
          <div className="py-2">
            {navItems.map((label, i) => {
              const isActive = i === activeNav;
              return (
                <button
                  key={i}
                  onClick={() => setActiveNav(i)}
                  className="w-full flex items-center gap-2.5 py-2.5 transition-colors"
                  style={{
                    paddingLeft: sidebarHovered ? 14 : 16,
                    paddingRight: 14,
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
                  {sidebarHovered && <span className="text-xs font-medium whitespace-nowrap">{label}</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Hero area — 50% */}
        <div className="flex-1 rounded-xl p-5" style={{ backgroundColor: colors.heroCardBackground, border: `1px solid ${colors.heroCardBorder}` }}>
          <p className="text-[10px] font-semibold uppercase tracking-wider mb-3" style={{ color: colors.heroCardTitle }}>Hero / Stats Area</p>
          <div className="flex gap-6 mb-4">
            {["56%", "35%", "32%"].map((val, i) => (
              <div key={i}>
                <p className="text-3xl font-bold" style={{ color: i === 0 ? p : colors.heroCardTitle, fontFamily: "var(--font-stat)" }}>{val}</p>
                <p className="text-[10px]" style={{ color: colors.heroCardBodyText }}>{["Click rate", "Open rate", "30-day avg"][i]}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-6">
            {[{ l: "Metric A", v: "52%" }, { l: "Metric B", v: "423" }].map((s, i) => (
              <div key={i}>
                <p className="text-xl font-bold" style={{ color: colors.heroCardTitle, fontFamily: "var(--font-stat)" }}>{s.v}</p>
                <p className="text-[9px]" style={{ color: colors.heroCardBodyText }}>{s.l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right card — 50% */}
        <div className="flex-1 rounded-xl p-5" style={{ backgroundColor: colors.cardBackground, border: `1px solid ${colors.cardBorder}` }}>
          <p className="text-[9px] font-semibold uppercase tracking-wider mb-2" style={{ color: p }}>Right Card Area</p>
          <p className="text-xl font-bold mb-1" style={{ color: colors.primaryText, fontFamily: "var(--font-heading)" }}>Content Here</p>
          <p className="text-sm mb-4" style={{ color: colors.secondaryText }}>This area is configured during app design. 50/50 split with the hero area.</p>
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-lg p-3" style={{ backgroundColor: colors.accent + "12", border: `1px solid ${colors.accent}25` }}>
                <div className="h-2 rounded w-3/4 mb-1" style={{ backgroundColor: colors.accent + "30" }} />
                <div className="h-2 rounded w-1/2" style={{ backgroundColor: colors.accent + "20" }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
