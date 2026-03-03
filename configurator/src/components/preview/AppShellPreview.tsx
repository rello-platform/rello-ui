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
    <div className="rounded-xl overflow-hidden border" style={{ borderColor: colors.cardBorder, height: 520 }}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-3 border-b" style={{ backgroundColor: colors.cardBackground, borderColor: colors.cardBorder }}>
        <div className="flex items-center gap-3">
          {/* Logo placeholder */}
          <div className="size-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: pLight }}>
            <div className="size-5 rounded-lg" style={{ backgroundColor: p, opacity: 0.5 }} />
          </div>
          <div>
            <h1 className="text-lg font-bold" style={{ color: colors.primaryText, fontFamily: "var(--font-heading)" }}>{layout.name}</h1>
            <p className="text-xs" style={{ color: colors.secondaryText }}>{layout.subtitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-40 h-8 rounded-md border px-3 flex items-center" style={{ borderColor: colors.cardBorder, backgroundColor: colors.pageBackground }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={colors.tertiaryText} strokeWidth="1.5"><circle cx="11" cy="11" r="7" /><line x1="16.5" y1="16.5" x2="21" y2="21" /></svg>
            <span className="text-xs ml-2" style={{ color: colors.tertiaryText }}>Search...</span>
          </div>
          <div className="size-8 rounded-full flex items-center justify-center text-xs font-semibold" style={{ backgroundColor: pLight, color: p }}>KS</div>
        </div>
      </div>

      <div className="flex" style={{ height: "calc(100% - 52px)" }}>
        {/* Sidebar */}
        <div
          className="border-r flex-shrink-0 overflow-y-auto transition-all duration-300"
          style={{
            width: sidebarHovered ? 200 : 56,
            backgroundColor: colors.cardBackground,
            borderColor: colors.cardBorder,
          }}
          onMouseEnter={() => setSidebarHovered(true)}
          onMouseLeave={() => setSidebarHovered(false)}
        >
          <div className="py-2">
            {layout.sidebarGroups.map((group, gi) => (
              <div key={gi}>
                {group.label && sidebarHovered && (
                  <p className="px-4 pt-3 pb-1 text-[9px] font-medium uppercase tracking-wider" style={{ color: colors.tertiaryText }}>{group.label}</p>
                )}
                {group.items.map((item, ii) => {
                  const globalIdx = layout.sidebarGroups.slice(0, gi).reduce((a, g) => a + g.items.length, 0) + ii;
                  const isActive = globalIdx === activeNav;
                  return (
                    <button
                      key={ii}
                      onClick={() => setActiveNav(globalIdx)}
                      className="w-full flex items-center gap-2.5 py-2 transition-colors"
                      style={{
                        paddingLeft: 16,
                        paddingRight: 16,
                        backgroundColor: isActive ? pLight : "transparent",
                        color: isActive ? p : colors.secondaryText,
                        borderRadius: 0,
                      }}
                    >
                      <div className="size-5 rounded flex items-center justify-center shrink-0" style={{ backgroundColor: isActive ? p + "30" : "transparent" }}>
                        <div className="size-2.5 rounded-sm" style={{ backgroundColor: isActive ? p : colors.tertiaryText, opacity: isActive ? 0.7 : 0.4 }} />
                      </div>
                      {sidebarHovered && <span className="text-xs font-medium whitespace-nowrap">{item.label}</span>}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-y-auto p-5" style={{ backgroundColor: colors.pageBackground }}>
          {/* Highlight text */}
          <p className="text-sm mb-4" style={{ color: colors.secondaryText }}>
            {layout.highlightText.split(/(\d+%?)/g).map((part, i) =>
              /\d+%?/.test(part) ? <span key={i} className="font-bold" style={{ color: p }}>{part}</span> : part
            )}
          </p>

          <div className="flex gap-4">
            {/* Hero area */}
            <div className="flex-1">
              <div
                className="rounded-xl p-5 mb-4"
                style={{
                  backgroundColor: layout.heroStyle === "dark" ? colors.heroCardBackground : colors.pageBackground,
                  border: layout.heroStyle === "dark" ? `1px solid ${colors.heroCardBorder}` : `1px solid ${colors.cardBorder}`,
                }}
              >
                <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: layout.heroStyle === "dark" ? colors.heroCardTitle : p }}>Latest Activity</p>
                {/* Stat row */}
                <div className="flex gap-4 mt-3">
                  {["56%", "35%", "32%"].map((val, i) => (
                    <div key={i}>
                      <p className="text-2xl font-bold" style={{ color: layout.heroStyle === "dark" ? colors.heroCardTitle : (i === 0 ? p : colors.primaryText), fontFamily: "var(--font-stat)" }}>{val}</p>
                      <p className="text-[10px]" style={{ color: layout.heroStyle === "dark" ? colors.heroCardBodyText : colors.tertiaryText }}>{["Click rate", "Open rate", "30-day avg"][i]}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stat pills */}
              <div className="grid grid-cols-4 gap-2 mb-4">
                {[{ l: "Active Rate", v: "52%" }, { l: "Subscribers", v: "423" }, { l: "Growth", v: "+8%" }, { l: "Sessions", v: "1.2K" }].map((s) => (
                  <div key={s.l} className="rounded-lg p-3" style={{ backgroundColor: colors.cardBackground, border: `1px solid ${colors.cardBorder}` }}>
                    <p className="text-lg font-bold" style={{ color: colors.primaryText, fontFamily: "var(--font-stat)" }}>{s.v}</p>
                    <p className="text-[9px]" style={{ color: colors.tertiaryText }}>{s.l}</p>
                  </div>
                ))}
              </div>

              {/* Card placeholders */}
              <div className="grid grid-cols-2 gap-3">
                {[1, 2].map((i) => (
                  <div key={i} className="rounded-xl p-4 h-28" style={{ backgroundColor: colors.cardBackground, border: `1px solid ${colors.cardBorder}` }}>
                    <div className="h-3 rounded w-1/2 mb-2" style={{ backgroundColor: colors.cardBorder }} />
                    <div className="h-2 rounded w-3/4 mb-1.5" style={{ backgroundColor: colors.cardBorder, opacity: 0.5 }} />
                    <div className="h-2 rounded w-2/3" style={{ backgroundColor: colors.cardBorder, opacity: 0.3 }} />
                  </div>
                ))}
              </div>
            </div>

            {/* Right card */}
            {layout.rightCard && (
              <div className="w-52 shrink-0">
                <div className="rounded-xl p-4" style={{ backgroundColor: colors.cardBackground, border: `1px solid ${colors.cardBorder}` }}>
                  <p className="text-[9px] font-semibold uppercase tracking-wider mb-2" style={{ color: p }}>{layout.rightCardTitle}</p>
                  <p className="text-xs" style={{ color: colors.secondaryText }}>{layout.rightCardContent}</p>
                </div>
                {/* Additional right-side cards */}
                {[1, 2, 3].map((i) => (
                  <div key={i} className="rounded-xl p-3 mt-2 h-16" style={{ backgroundColor: colors.cardBackground, border: `1px solid ${colors.cardBorder}` }}>
                    <div className="h-2 rounded w-3/4 mb-1.5" style={{ backgroundColor: colors.cardBorder }} />
                    <div className="h-2 rounded w-1/2" style={{ backgroundColor: colors.cardBorder, opacity: 0.5 }} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
