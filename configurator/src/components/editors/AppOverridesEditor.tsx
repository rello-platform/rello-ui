import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import type { AppOverride } from "../../hooks/useAppOverrides";

interface AppOverridesEditorProps {
  defaults: { primary: string; accent: string };
  apps: Record<string, AppOverride>;
  onUpdate: (appId: string, field: "primary" | "accent" | "notes", value: string | null) => void;
}

function AppColorField({ label, value, defaultValue, onChange }: { label: string; value: string | null; defaultValue: string; onChange: (v: string | null) => void }) {
  const [pickerOpen, setPickerOpen] = useState(false);
  const isInherited = value === null;
  const displayColor = value ?? defaultValue;

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <button
          onClick={() => !isInherited && setPickerOpen(!pickerOpen)}
          className="size-7 rounded-md border border-[var(--neutral-200)] shadow-xs"
          style={{ backgroundColor: displayColor, opacity: isInherited ? 0.5 : 1 }}
        />
        {pickerOpen && !isInherited && (
          <>
            <div className="fixed inset-0 z-20" onClick={() => setPickerOpen(false)} />
            <div className="absolute top-9 left-0 z-30 bg-white rounded-lg shadow-lg p-3 border border-[var(--neutral-200)]">
              <HexColorPicker color={displayColor} onChange={onChange} />
              <input
                value={displayColor}
                onChange={(e) => /^#[0-9a-fA-F]{0,6}$/.test(e.target.value) && onChange(e.target.value)}
                className="mt-2 w-full px-2 py-1 text-xs font-mono border border-[var(--neutral-200)] rounded text-center"
              />
            </div>
          </>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <span className="text-[11px] text-[var(--neutral-600)]">{label}</span>
        <span className="text-[9px] text-[var(--neutral-400)] ml-1 font-mono">{displayColor}</span>
      </div>
      <button
        onClick={() => {
          if (isInherited) {
            onChange(defaultValue);
          } else {
            onChange(null);
          }
        }}
        className={`px-1.5 py-0.5 text-[9px] rounded font-medium transition-colors ${isInherited ? "bg-[var(--neutral-100)] text-[var(--neutral-500)]" : "bg-[var(--brand-primary-light)] text-[var(--brand-primary)]"}`}
      >
        {isInherited ? "Inherit" : "Custom"}
      </button>
    </div>
  );
}

export function AppOverridesEditor({ defaults, apps, onUpdate }: AppOverridesEditorProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="border-b border-[var(--neutral-200)] pb-2">
        <h3 className="text-sm font-semibold text-[var(--neutral-800)]">App Color Overrides</h3>
        <p className="text-[10px] text-[var(--neutral-400)]">
          Each app inherits the default colors unless overridden. Click "Inherit" to set a custom color.
        </p>
      </div>

      {/* Defaults reference */}
      <div className="bg-[var(--neutral-50)] rounded-lg p-3">
        <p className="text-[10px] font-medium text-[var(--neutral-500)] uppercase tracking-wider mb-2">Defaults (all apps)</p>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="size-5 rounded" style={{ backgroundColor: defaults.primary }} />
            <span className="text-[10px] text-[var(--neutral-600)] font-mono">{defaults.primary}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="size-5 rounded" style={{ backgroundColor: defaults.accent }} />
            <span className="text-[10px] text-[var(--neutral-600)] font-mono">{defaults.accent}</span>
          </div>
        </div>
      </div>

      {/* Per-app overrides */}
      {Object.entries(apps).map(([appId, app]) => (
        <div key={appId} className="border border-[var(--neutral-200)] rounded-lg bg-white p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-[var(--neutral-800)]">{app.name}</span>
            {(app.primary !== null || app.accent !== null) && (
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-[var(--brand-primary-light)] text-[var(--brand-primary)] font-medium">Custom</span>
            )}
          </div>
          {app.notes && <p className="text-[10px] text-[var(--neutral-400)] mb-2">{app.notes}</p>}
          <div className="flex flex-col gap-2">
            <AppColorField
              label="Primary"
              value={app.primary}
              defaultValue={defaults.primary}
              onChange={(v) => onUpdate(appId, "primary", v)}
            />
            <AppColorField
              label="Accent"
              value={app.accent}
              defaultValue={defaults.accent}
              onChange={(v) => onUpdate(appId, "accent", v)}
            />
          </div>
          {/* Mini preview */}
          <div className="mt-2 flex items-center gap-2">
            <button className="px-2.5 py-1 text-[10px] font-medium text-white rounded" style={{ backgroundColor: app.primary ?? defaults.primary }}>Button</button>
            <button className="px-2.5 py-1 text-[10px] font-medium text-white rounded" style={{ backgroundColor: app.accent ?? defaults.accent }}>Accent</button>
            <span className="text-[10px] font-medium" style={{ color: app.primary ?? defaults.primary }}>Link</span>
          </div>
        </div>
      ))}
    </div>
  );
}
