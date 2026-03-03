import { useState } from "react";

export function ButtonDemo({ params }: { params: { borderRadius?: number; hoverOpacity?: number; transitionDuration?: number } }) {
  const radius = params.borderRadius ?? 8;
  const transition = params.transitionDuration ?? 300;
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const variants = [
    { id: "primary", label: "Primary", bg: "var(--brand-primary)", hoverBg: "var(--brand-primary)", text: "white" },
    { id: "secondary", label: "Secondary", bg: "var(--neutral-100)", hoverBg: "var(--neutral-200)", text: "var(--neutral-700)" },
    { id: "accent", label: "Accent", bg: "var(--brand-accent)", hoverBg: "var(--brand-accent)", text: "white" },
    { id: "ghost", label: "Ghost", bg: "transparent", hoverBg: "var(--neutral-100)", text: "var(--neutral-600)", border: true },
    { id: "danger", label: "Danger", bg: "var(--error)", hoverBg: "var(--error)", text: "white" },
    { id: "outline", label: "Outline", bg: "white", hoverBg: "var(--neutral-50)", text: "var(--neutral-700)", border: true },
  ];

  return (
    <div className="bg-[var(--neutral-50)] rounded-xl overflow-hidden border border-[var(--neutral-200)]">
      <div className="p-4 border-b border-[var(--neutral-100)]">
        <span className="text-sm font-medium text-[var(--neutral-700)]">Button Variants & States — Hover to see transitions</span>
      </div>
      <div className="p-4 space-y-5">
        {/* Variants with live hover */}
        <div>
          <p className="text-[10px] font-medium text-[var(--neutral-500)] uppercase tracking-wider mb-2">Variants (hover to preview transition)</p>
          <div className="flex flex-wrap gap-2">
            {variants.map((btn) => {
              const isHovered = hoveredId === btn.id;
              const isSolid = !btn.border;
              return (
                <button
                  key={btn.id}
                  onMouseEnter={() => setHoveredId(btn.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="px-4 py-2 text-sm font-medium"
                  style={{
                    backgroundColor: isHovered ? btn.hoverBg : btn.bg,
                    color: btn.text,
                    borderRadius: radius,
                    border: btn.border ? "1px solid var(--neutral-200)" : "none",
                    opacity: isHovered && isSolid ? 0.85 : 1,
                    transform: isHovered ? "translateY(-1px)" : "translateY(0)",
                    boxShadow: isHovered ? "0 4px 8px -2px rgba(0,0,0,0.12)" : "none",
                    transition: `all ${transition}ms ease`,
                  }}
                >
                  {btn.label}
                </button>
              );
            })}
          </div>
          {hoveredId && (
            <p className="mt-2 text-[10px] text-[var(--neutral-400)]">
              Hovering: <span className="text-[var(--brand-primary)] font-medium">{hoveredId}</span> — {transition}ms ease transition, slight lift + shadow
            </p>
          )}
        </div>

        {/* Transition speed comparison */}
        <div>
          <p className="text-[10px] font-medium text-[var(--neutral-500)] uppercase tracking-wider mb-2">Transition Speed Preview</p>
          <div className="flex items-center gap-3">
            {[
              { label: "Fast (150ms)", dur: 150 },
              { label: `Current (${transition}ms)`, dur: transition },
              { label: "Slow (500ms)", dur: 500 },
            ].map((speed) => (
              <button
                key={speed.label}
                className="px-4 py-2 text-sm font-medium text-white hover:opacity-85 hover:-translate-y-0.5 hover:shadow-md"
                style={{
                  backgroundColor: "var(--brand-primary)",
                  borderRadius: radius,
                  transition: `all ${speed.dur}ms ease`,
                }}
              >
                {speed.label}
              </button>
            ))}
          </div>
          <p className="mt-1.5 text-[10px] text-[var(--neutral-400)]">Hover each to feel the difference in transition speed</p>
        </div>

        {/* Sizes */}
        <div>
          <p className="text-[10px] font-medium text-[var(--neutral-500)] uppercase tracking-wider mb-2">Sizes</p>
          <div className="flex items-center gap-2">
            {[
              { label: "XS", h: 28, px: 8, text: 11 },
              { label: "SM", h: 32, px: 12, text: 12 },
              { label: "MD", h: 36, px: 16, text: 14 },
              { label: "LG", h: 40, px: 20, text: 14 },
              { label: "XL", h: 48, px: 24, text: 16 },
            ].map((size) => (
              <button
                key={size.label}
                className="font-medium text-white hover:opacity-85 hover:-translate-y-0.5 hover:shadow-md"
                style={{
                  backgroundColor: "var(--brand-primary)",
                  height: size.h,
                  paddingLeft: size.px,
                  paddingRight: size.px,
                  fontSize: size.text,
                  borderRadius: radius,
                  transition: `all ${transition}ms ease`,
                }}
              >
                {size.label}
              </button>
            ))}
          </div>
        </div>

        {/* States */}
        <div>
          <p className="text-[10px] font-medium text-[var(--neutral-500)] uppercase tracking-wider mb-2">States</p>
          <div className="flex items-center gap-2">
            <button
              className="px-4 py-2 text-sm font-medium text-white hover:opacity-85 hover:-translate-y-0.5 hover:shadow-md"
              style={{ backgroundColor: "var(--brand-primary)", borderRadius: radius, transition: `all ${transition}ms ease` }}
            >
              Normal
            </button>
            <button
              className="px-4 py-2 text-sm font-medium text-white flex items-center gap-2"
              style={{ backgroundColor: "var(--brand-primary)", borderRadius: radius }}
            >
              <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Loading
            </button>
            <button
              className="px-4 py-2 text-sm font-medium text-white opacity-50 cursor-not-allowed"
              style={{ backgroundColor: "var(--brand-primary)", borderRadius: radius }}
            >
              Disabled
            </button>
            <button
              className="px-4 py-2 text-sm font-medium text-white ring-2 ring-offset-2"
              style={{ backgroundColor: "var(--brand-primary)", borderRadius: radius, ringColor: "var(--brand-primary)" }}
            >
              Focused
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
