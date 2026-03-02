export function BadgeDemo() {
  return (
    <div className="bg-[var(--neutral-50)] rounded-xl overflow-hidden border border-[var(--neutral-200)]">
      <div className="p-4 border-b border-[var(--neutral-100)]">
        <span className="text-sm font-medium text-[var(--neutral-700)]">Badge Variants & Pipeline Stages</span>
      </div>
      <div className="p-4 space-y-4">
        <div>
          <p className="text-[10px] font-medium text-[var(--neutral-500)] uppercase tracking-wider mb-2">Pipeline Stages</p>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "Hot", color: "var(--hot)", lightColor: "var(--hot-light)" },
              { label: "Qualified", color: "var(--qualified)", lightColor: "var(--qualified-light)" },
              { label: "Engaged", color: "var(--engaged)", lightColor: "var(--engaged-light)" },
              { label: "Warming", color: "var(--warming)", lightColor: "var(--warming-light)" },
              { label: "Cold", color: "var(--cold)", lightColor: "var(--cold-light)" },
            ].map((badge) => (
              <span key={badge.label} className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full" style={{ backgroundColor: badge.lightColor, color: badge.color }}>
                <span className="size-1.5 rounded-full" style={{ backgroundColor: badge.color }} />
                {badge.label}
              </span>
            ))}
          </div>
        </div>
        <div>
          <p className="text-[10px] font-medium text-[var(--neutral-500)] uppercase tracking-wider mb-2">Status</p>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "Active", color: "var(--success)", lightColor: "var(--success-light)" },
              { label: "Pending", color: "var(--warning)", lightColor: "var(--warning-light)" },
              { label: "Overdue", color: "var(--error)", lightColor: "var(--error-light)" },
              { label: "New", color: "var(--info)", lightColor: "var(--info-light)" },
            ].map((badge) => (
              <span key={badge.label} className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full" style={{ backgroundColor: badge.lightColor, color: badge.color }}>
                {badge.label}
              </span>
            ))}
          </div>
        </div>
        <div>
          <p className="text-[10px] font-medium text-[var(--neutral-500)] uppercase tracking-wider mb-2">Brand & Default</p>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full bg-[var(--brand-primary-light)] text-[var(--brand-primary)]">Primary</span>
            <span className="inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full bg-[var(--brand-accent-light)] text-[var(--brand-accent)]">Accent</span>
            <span className="inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full bg-[var(--neutral-100)] text-[var(--neutral-600)]">Default</span>
          </div>
        </div>
        <div>
          <p className="text-[10px] font-medium text-[var(--neutral-500)] uppercase tracking-wider mb-2">Sizes</p>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-1.5 py-0.5 text-[10px] font-medium rounded-full bg-[var(--brand-primary-light)] text-[var(--brand-primary)]">XS</span>
            <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-[var(--brand-primary-light)] text-[var(--brand-primary)]">SM</span>
            <span className="inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full bg-[var(--brand-primary-light)] text-[var(--brand-primary)]">MD</span>
            <span className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full bg-[var(--brand-primary-light)] text-[var(--brand-primary)]">LG</span>
          </div>
        </div>
      </div>
    </div>
  );
}
