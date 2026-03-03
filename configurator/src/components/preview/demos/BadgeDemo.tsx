export function BadgeDemo() {
  // Shared chip/badge style — thinner, tight bottom shadow, centered text
  const chipBase = "inline-flex items-center justify-center px-3.5 py-[5px] text-[13px] font-semibold font-ui leading-none";
  const chipRounded = "rounded-lg";
  const chipShadow = "shadow-[0_1px_1px_0.5px_rgba(0,0,0,0.4)]";

  return (
    <div className="bg-[var(--neutral-50)] rounded-xl overflow-hidden border border-[var(--neutral-200)]">
      <div className="p-4 border-b border-[var(--neutral-100)]">
        <span className="text-sm font-medium text-[var(--neutral-700)]">Badges & Chips — Filled + Outlined</span>
      </div>
      <div className="p-4 space-y-5">
        {/* Filled variant — tinted background, strong text */}
        <div>
          <p className="text-[10px] font-medium text-[var(--neutral-500)] uppercase tracking-wider mb-2.5">Status — Filled</p>
          <div className="flex flex-wrap gap-2.5">
            {[
              { label: "Success", color: "var(--success)", bg: "var(--success-light)" },
              { label: "Review", color: "var(--info)", bg: "var(--info-light)" },
              { label: "Pending", color: "var(--warning)", bg: "var(--warning-light)" },
              { label: "Failed", color: "var(--error)", bg: "var(--error-light)" },
              { label: "Expired", color: "var(--neutral-500)", bg: "var(--neutral-100)" },
            ].map((badge) => (
              <span key={badge.label} className={`${chipBase} ${chipRounded} ${chipShadow}`} style={{ backgroundColor: badge.bg, color: badge.color }}>
                {badge.label}
              </span>
            ))}
          </div>
        </div>

        {/* Outlined variant — white bg, colored border, strong text */}
        <div>
          <p className="text-[10px] font-medium text-[var(--neutral-500)] uppercase tracking-wider mb-2.5">Status — Outlined</p>
          <div className="flex flex-wrap gap-2.5">
            {[
              { label: "Success", color: "var(--success)" },
              { label: "Review", color: "var(--info)" },
              { label: "Pending", color: "var(--warning)" },
              { label: "Failed", color: "var(--error)" },
              { label: "Expired", color: "var(--neutral-500)" },
            ].map((badge) => (
              <span key={badge.label} className={`${chipBase} ${chipRounded} ${chipShadow} border bg-white`} style={{ color: badge.color, borderColor: "var(--neutral-200)" }}>
                {badge.label}
              </span>
            ))}
          </div>
        </div>

        {/* Pipeline stages — filled */}
        <div>
          <p className="text-[10px] font-medium text-[var(--neutral-500)] uppercase tracking-wider mb-2.5">Pipeline Stages</p>
          <div className="flex flex-wrap gap-2.5">
            {[
              { label: "Hot", color: "var(--hot)", bg: "var(--hot-light)" },
              { label: "Qualified", color: "var(--qualified)", bg: "var(--qualified-light)" },
              { label: "Engaged", color: "var(--engaged)", bg: "var(--engaged-light)" },
              { label: "Warming", color: "var(--warming)", bg: "var(--warming-light)" },
              { label: "Cold", color: "var(--cold)", bg: "var(--cold-light)" },
            ].map((badge) => (
              <span key={badge.label} className={`${chipBase} ${chipRounded} ${chipShadow}`} style={{ backgroundColor: badge.bg, color: badge.color }}>
                {badge.label}
              </span>
            ))}
          </div>
        </div>

        {/* Brand */}
        <div>
          <p className="text-[10px] font-medium text-[var(--neutral-500)] uppercase tracking-wider mb-2.5">Brand</p>
          <div className="flex flex-wrap gap-2.5">
            <span className={`${chipBase} ${chipRounded} ${chipShadow} bg-[var(--brand-primary-light)] text-[var(--brand-primary)]`}>Primary</span>
            <span className={`${chipBase} ${chipRounded} ${chipShadow} bg-[var(--brand-accent-light)] text-[var(--brand-accent)]`}>Accent</span>
            <span className={`${chipBase} ${chipRounded} ${chipShadow} bg-[var(--neutral-100)] text-[var(--neutral-600)]`}>Default</span>
          </div>
        </div>

        {/* Sizes */}
        <div>
          <p className="text-[10px] font-medium text-[var(--neutral-500)] uppercase tracking-wider mb-2.5">Sizes</p>
          <div className="flex items-center gap-2.5">
            <span className={`inline-flex items-center justify-center px-2 py-[3px] text-[10px] font-semibold font-ui leading-none rounded-md ${chipShadow} bg-[var(--brand-primary-light)] text-[var(--brand-primary)]`}>XS</span>
            <span className={`inline-flex items-center justify-center px-2.5 py-[4px] text-[11px] font-semibold font-ui leading-none rounded-md ${chipShadow} bg-[var(--brand-primary-light)] text-[var(--brand-primary)]`}>SM</span>
            <span className={`${chipBase} ${chipRounded} ${chipShadow} bg-[var(--brand-primary-light)] text-[var(--brand-primary)]`}>MD</span>
            <span className={`inline-flex items-center justify-center px-4 py-[6px] text-sm font-semibold font-ui leading-none rounded-lg ${chipShadow} bg-[var(--brand-primary-light)] text-[var(--brand-primary)]`}>LG</span>
          </div>
        </div>
      </div>
    </div>
  );
}
