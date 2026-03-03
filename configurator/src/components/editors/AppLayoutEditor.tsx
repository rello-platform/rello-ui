import type { AppLayout } from "../../hooks/useAppLayouts";

const SHELL_SPEC_FIELDS = [
  { key: "behavior", label: "Behavior" },
  { key: "appearance", label: "Appearance" },
  { key: "doUse", label: "Do Use" },
  { key: "dontUse", label: "Don't Use" },
  { key: "otherPages", label: "Other Pages" },
];

interface AppLayoutEditorProps {
  apps: Record<string, AppLayout>;
  shellSpec: Record<string, string>;
  selectedApp: string | null;
  onSelect: (appId: string) => void;
  onUpdate: (appId: string, field: string, value: unknown) => void;
  onUpdateShellSpec: (field: string, value: string) => void;
}

export function AppLayoutEditor({ apps, shellSpec, selectedApp, onSelect, onUpdate, onUpdateShellSpec }: AppLayoutEditorProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="border-b border-[var(--neutral-200)] pb-2">
        <h3 className="text-sm font-semibold text-[var(--neutral-800)]">App Layouts</h3>
        <p className="text-[10px] text-[var(--neutral-400)]">
          Set the subtitle for each app. Sidebar nav, right card, and content cards are determined during app design.
        </p>
      </div>

      <div className="bg-[var(--neutral-50)] rounded-lg p-3 text-[9px] text-[var(--neutral-500)] space-y-1">
        <p className="font-semibold text-[var(--neutral-700)] text-[10px]">Universal Shell Rules</p>
        <p>Logo + App Title (large) + Subtitle sits top-left, larger than all nav</p>
        <p>Highlight paragraph is dynamic from app stats. Default: "Welcome to [App Name]!"</p>
        <p>Agent name + avatar top-right, aligned with app title</p>
        <p>Sidebar below the title block, carded, collapses to icons</p>
        <p>Hero area (50%) + Right card (50%) — always 50/50 split</p>
        <p>Cards below determined per-app during design</p>
        <p className="pt-1 border-t border-[var(--neutral-200)]">App Title/Subtitle fonts set in Design Tokens. Title/subtitle colors set in App Colors.</p>
      </div>

      {Object.entries(apps).map(([appId, layout]) => {
        const isSelected = selectedApp === appId;
        return (
          <div key={appId} className={`border rounded-lg bg-white overflow-hidden transition-colors ${isSelected ? "border-[var(--brand-primary)] ring-1 ring-[var(--brand-primary)]/20" : "border-[var(--neutral-200)]"}`}>
            <button onClick={() => onSelect(appId)} className="w-full px-3 py-2.5 flex items-center justify-between text-left hover:bg-[var(--neutral-50)] transition-colors">
              <div>
                <span className="text-sm font-semibold text-[var(--neutral-800)]">{layout.name}</span>
                <p className="text-[10px] text-[var(--neutral-400)]">{layout.subtitle}</p>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--neutral-400)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200" style={{ transform: isSelected ? "rotate(180deg)" : "rotate(0)" }}><path d="M6 9l6 6 6-6" /></svg>
            </button>
            {isSelected && (
              <div className="px-3 pb-3 border-t border-[var(--neutral-100)] pt-2.5 space-y-3">
                <div>
                  <label className="block text-[10px] font-medium text-[var(--neutral-600)] mb-1">App Subtitle</label>
                  <input value={layout.subtitle} onChange={(e) => onUpdate(appId, "subtitle", e.target.value)} className="w-full px-2 py-1.5 text-xs border border-[var(--neutral-200)] rounded-md outline-none focus:border-[var(--brand-primary)]" />
                </div>
                <div className="bg-[var(--neutral-50)] rounded-lg p-2.5">
                  <p className="text-[9px] text-[var(--neutral-400)]">Default welcome message: "Welcome to {layout.name}! Get started using the app by moving through the menu items to the left."</p>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Shell Spec — behavior, appearance, usage, and other-pages rules */}
      <div className="border-t border-[var(--neutral-200)] pt-4 mt-2">
        <h3 className="text-sm font-semibold text-[var(--neutral-800)] mb-1">App Shell Spec</h3>
        <p className="text-[10px] text-[var(--neutral-400)] mb-3">
          The structural frame every app is built on — sidebar, header, content area.
        </p>
        <div className="space-y-3">
          {SHELL_SPEC_FIELDS.map(({ key, label }) => (
            <div key={key}>
              <label className="block text-[10px] font-medium text-[var(--neutral-600)] mb-1">{label}</label>
              <textarea
                value={shellSpec[key] ?? ""}
                onChange={(e) => onUpdateShellSpec(key, e.target.value)}
                rows={3}
                className="w-full px-2 py-1.5 text-xs border border-[var(--neutral-200)] rounded-md outline-none focus:border-[var(--brand-primary)] resize-y"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
