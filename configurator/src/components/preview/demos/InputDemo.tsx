export function InputDemo() {
  return (
    <div className="bg-[var(--neutral-50)] rounded-xl overflow-hidden border border-[var(--neutral-200)]">
      <div className="p-4 border-b border-[var(--neutral-100)]">
        <span className="text-sm font-medium text-[var(--neutral-700)]">Form Elements — All States</span>
      </div>
      <div className="p-4 grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[var(--neutral-700)] mb-1.5">Default</label>
          <input placeholder="Enter text..." className="h-9 w-full rounded-md border border-[var(--neutral-200)] bg-white px-3 text-sm shadow-xs outline-none focus:border-[var(--brand-primary)] focus:ring-2 focus:ring-[var(--brand-primary)]/20 placeholder:text-[var(--neutral-400)]" />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--neutral-700)] mb-1.5">With Hint</label>
          <input placeholder="you@example.com" className="h-9 w-full rounded-md border border-[var(--neutral-200)] bg-white px-3 text-sm shadow-xs outline-none focus:border-[var(--brand-primary)] focus:ring-2 focus:ring-[var(--brand-primary)]/20 placeholder:text-[var(--neutral-400)]" />
          <p className="mt-1.5 text-xs text-[var(--neutral-500)]">We'll never share your email</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--neutral-700)] mb-1.5">With Error</label>
          <input defaultValue="bad input" className="h-9 w-full rounded-md border border-[var(--error)] bg-white px-3 text-sm shadow-xs outline-none focus:ring-2 focus:ring-[var(--error)]/20" />
          <p className="mt-1.5 text-xs text-[var(--error)]">This field is required</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--neutral-700)] mb-1.5">Disabled</label>
          <input defaultValue="Read only" disabled className="h-9 w-full rounded-md border border-[var(--neutral-200)] bg-[var(--neutral-50)] px-3 text-sm shadow-xs outline-none opacity-50 cursor-not-allowed" />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--neutral-700)] mb-1.5">With Left Icon</label>
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--neutral-400)]" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
            <input placeholder="Search leads..." className="h-9 w-full rounded-md border border-[var(--neutral-200)] bg-white pl-10 pr-3 text-sm shadow-xs outline-none focus:border-[var(--brand-primary)] focus:ring-2 focus:ring-[var(--brand-primary)]/20 placeholder:text-[var(--neutral-400)]" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--neutral-700)] mb-1.5">Textarea</label>
          <textarea placeholder="Add notes..." rows={3} className="w-full rounded-md border border-[var(--neutral-200)] bg-white px-3 py-2 text-sm shadow-xs outline-none resize-y focus:border-[var(--brand-primary)] focus:ring-2 focus:ring-[var(--brand-primary)]/20 placeholder:text-[var(--neutral-400)]" />
        </div>
      </div>
    </div>
  );
}
