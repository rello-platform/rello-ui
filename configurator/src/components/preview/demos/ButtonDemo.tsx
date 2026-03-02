export function ButtonDemo({ params }: { params: { borderRadius?: number; hoverOpacity?: number; transitionDuration?: number } }) {
  const radius = params.borderRadius ?? 8;
  const transition = params.transitionDuration ?? 150;

  return (
    <div className="bg-[var(--neutral-50)] rounded-xl overflow-hidden border border-[var(--neutral-200)]">
      <div className="p-4 border-b border-[var(--neutral-100)]">
        <span className="text-sm font-medium text-[var(--neutral-700)]">Button Variants & States</span>
      </div>
      <div className="p-4 space-y-4">
        <div>
          <p className="text-[10px] font-medium text-[var(--neutral-500)] uppercase tracking-wider mb-2">Variants</p>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "Primary", bg: "var(--brand-primary)", text: "white" },
              { label: "Secondary", bg: "var(--neutral-100)", text: "var(--neutral-700)" },
              { label: "Accent", bg: "var(--brand-accent)", text: "white" },
              { label: "Ghost", bg: "transparent", text: "var(--neutral-600)", border: true },
              { label: "Danger", bg: "var(--error)", text: "white" },
              { label: "Outline", bg: "white", text: "var(--neutral-700)", border: true },
            ].map((btn) => (
              <button
                key={btn.label}
                className="px-4 py-2 text-sm font-medium hover:opacity-90"
                style={{
                  backgroundColor: btn.bg,
                  color: btn.text,
                  borderRadius: radius,
                  border: btn.border ? "1px solid var(--neutral-200)" : "none",
                  transition: `all ${transition}ms ease`,
                }}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
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
                className="font-medium text-white"
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
        <div>
          <p className="text-[10px] font-medium text-[var(--neutral-500)] uppercase tracking-wider mb-2">States</p>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 text-sm font-medium text-white" style={{ backgroundColor: "var(--brand-primary)", borderRadius: radius }}>Normal</button>
            <button className="px-4 py-2 text-sm font-medium text-white flex items-center gap-2" style={{ backgroundColor: "var(--brand-primary)", borderRadius: radius }}>
              <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Loading
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white opacity-50 cursor-not-allowed" style={{ backgroundColor: "var(--brand-primary)", borderRadius: radius }}>Disabled</button>
          </div>
        </div>
      </div>
    </div>
  );
}
