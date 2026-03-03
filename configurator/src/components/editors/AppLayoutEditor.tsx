import { useState } from "react";
import type { AppLayout } from "../../hooks/useAppLayouts";

interface AppLayoutEditorProps {
  apps: Record<string, AppLayout>;
  selectedApp: string | null;
  onSelect: (appId: string) => void;
  onUpdate: (appId: string, field: string, value: unknown) => void;
}

export function AppLayoutEditor({ apps, selectedApp, onSelect, onUpdate }: AppLayoutEditorProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="border-b border-[var(--neutral-200)] pb-2">
        <h3 className="text-sm font-semibold text-[var(--neutral-800)]">App Layouts</h3>
        <p className="text-[10px] text-[var(--neutral-400)]">
          Configure the dashboard shell for each app — sidebar nav, hero area, and card arrangement.
        </p>
      </div>

      {/* App list */}
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
              <LayoutFields layout={layout} appId={appId} onUpdate={onUpdate} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function LayoutFields({ layout, appId, onUpdate }: { layout: AppLayout; appId: string; onUpdate: (id: string, field: string, val: unknown) => void }) {
  const [newNavLabel, setNewNavLabel] = useState("");

  return (
    <div className="px-3 pb-3 border-t border-[var(--neutral-100)] pt-2.5 space-y-3">
      {/* Subtitle */}
      <div>
        <label className="block text-[10px] font-medium text-[var(--neutral-600)] mb-1">Subtitle</label>
        <input value={layout.subtitle} onChange={(e) => onUpdate(appId, "subtitle", e.target.value)} className="w-full px-2 py-1.5 text-xs border border-[var(--neutral-200)] rounded-md outline-none focus:border-[var(--brand-primary)]" />
      </div>

      {/* Highlight text */}
      <div>
        <label className="block text-[10px] font-medium text-[var(--neutral-600)] mb-1">Highlight Paragraph</label>
        <textarea value={layout.highlightText} onChange={(e) => onUpdate(appId, "highlightText", e.target.value)} rows={2} className="w-full px-2 py-1.5 text-xs border border-[var(--neutral-200)] rounded-md outline-none resize-y focus:border-[var(--brand-primary)]" />
      </div>

      {/* Info note */}
      <div className="bg-[var(--neutral-50)] rounded-lg p-2.5">
        <p className="text-[9px] text-[var(--neutral-500)]">Hero area colors are set in the App Colors tab. The layout is always 50/50 split — hero left, right card right. Cards below are determined when the app is built.</p>
      </div>

      {/* Right card */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-[10px] font-medium text-[var(--neutral-600)]">Right Sidebar Card</label>
          <button onClick={() => onUpdate(appId, "rightCard", !layout.rightCard)}
            className={`relative w-8 h-4.5 rounded-full transition-colors ${layout.rightCard ? "bg-[var(--brand-primary)]" : "bg-[var(--neutral-200)]"}`}>
            <div className="absolute top-0.5 size-3.5 rounded-full bg-white shadow-xs transition-transform" style={{ transform: layout.rightCard ? "translateX(15px)" : "translateX(2px)" }} />
          </button>
        </div>
        {layout.rightCard && (
          <div className="space-y-1.5">
            <input value={layout.rightCardTitle} onChange={(e) => onUpdate(appId, "rightCardTitle", e.target.value)} placeholder="Card title" className="w-full px-2 py-1 text-[10px] border border-[var(--neutral-200)] rounded outline-none focus:border-[var(--brand-primary)]" />
            <textarea value={layout.rightCardContent} onChange={(e) => onUpdate(appId, "rightCardContent", e.target.value)} placeholder="Card content" rows={2} className="w-full px-2 py-1 text-[10px] border border-[var(--neutral-200)] rounded outline-none resize-y focus:border-[var(--brand-primary)]" />
          </div>
        )}
      </div>

      {/* Sidebar nav items */}
      <div>
        <label className="block text-[10px] font-medium text-[var(--neutral-600)] mb-1">Sidebar Navigation</label>
        {layout.sidebarGroups.map((group, gi) => (
          <div key={gi} className="mb-2">
            {group.label && <p className="text-[9px] text-[var(--neutral-400)] uppercase tracking-wider mb-1">{group.label}</p>}
            {group.items.map((item, ii) => (
              <div key={ii} className="flex items-center gap-1.5 mb-1">
                <div className="size-4 rounded bg-[var(--neutral-100)] shrink-0" />
                <span className="text-[10px] text-[var(--neutral-700)] flex-1">{item.label}</span>
                <button onClick={() => {
                  const groups = structuredClone(layout.sidebarGroups);
                  groups[gi].items.splice(ii, 1);
                  onUpdate(appId, "sidebarGroups", groups);
                }} className="text-[var(--neutral-400)] hover:text-[var(--error)] text-[10px]">&times;</button>
              </div>
            ))}
          </div>
        ))}
        <div className="flex gap-1">
          <input value={newNavLabel} onChange={(e) => setNewNavLabel(e.target.value)} placeholder="New nav item..." className="flex-1 px-2 py-1 text-[10px] border border-[var(--neutral-200)] rounded outline-none" />
          <button onClick={() => {
            if (!newNavLabel.trim()) return;
            const groups = structuredClone(layout.sidebarGroups);
            groups[0].items.push({ icon: "custom", label: newNavLabel.trim() });
            onUpdate(appId, "sidebarGroups", groups);
            setNewNavLabel("");
          }} className="px-2 py-1 text-[9px] font-medium rounded bg-[var(--brand-primary)] text-white">Add</button>
        </div>
      </div>
    </div>
  );
}
