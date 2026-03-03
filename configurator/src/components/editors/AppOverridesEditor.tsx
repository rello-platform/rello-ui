import { useState, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { HexColorPicker } from "react-colorful";
import { COLOR_FIELDS, type AppOverride } from "../../hooks/useAppOverrides";

interface AppOverridesEditorProps {
  defaults: Record<string, string>;
  apps: Record<string, AppOverride>;
  onUpdate: (appId: string, field: string, value: string | null) => void;
}

const GROUPS = [
  { label: "Brand", keys: ["primary", "accent"] },
  { label: "App Title & Subtitle", keys: ["appTitleColor", "appSubtitleColor"] },
  { label: "Page & Cards", keys: ["pageBackground", "cardBackground", "cardBorder"] },
  { label: "Text", keys: ["primaryText", "secondaryText", "tertiaryText"] },
  { label: "Hero / Spotlight", keys: ["heroCardBackground", "heroCardBorder", "heroCardTitle", "heroCardBodyText"] },
  { label: "Rows", keys: ["rowBackground", "rowBorder"] },
];

export function AppOverridesEditor({ defaults, apps, onUpdate }: AppOverridesEditorProps) {
  const [expandedApp, setExpandedApp] = useState<string | null>(null);
  // Lifted picker state: "appId:fieldKey" or null
  const [activePicker, setActivePicker] = useState<string | null>(null);
  const [pickerColor, setPickerColor] = useState<string>("#000000");
  const [pickerLabel, setPickerLabel] = useState<string>("");
  const [pickerAppId, setPickerAppId] = useState<string>("");
  const [pickerFieldKey, setPickerFieldKey] = useState<string>("");

  const fieldMap = Object.fromEntries(COLOR_FIELDS.map(f => [f.key, f.label]));
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  const openPicker = (appId: string, fieldKey: string, color: string, label: string) => {
    setPickerAppId(appId);
    setPickerFieldKey(fieldKey);
    setPickerColor(color);
    setPickerLabel(label);
    setActivePicker(`${appId}:${fieldKey}`);
  };

  const closePicker = () => {
    // Flush any pending debounced update before closing
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
      debounceRef.current = undefined;
    }
    onUpdate(pickerAppId, pickerFieldKey, pickerColor);
    setActivePicker(null);
  };

  const handlePickerChange = useCallback((color: string) => {
    setPickerColor(color);
    // Debounce the expensive state update (structuredClone + JSON.stringify)
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      onUpdate(pickerAppId, pickerFieldKey, color);
    }, 150);
  }, [onUpdate, pickerAppId, pickerFieldKey]);

  return (
    <div className="flex flex-col gap-4">
      <div className="border-b border-[var(--neutral-200)] pb-2">
        <h3 className="text-sm font-semibold text-[var(--neutral-800)]">App Color Overrides</h3>
        <p className="text-[10px] text-[var(--neutral-400)]">
          Each app inherits defaults unless overridden. Click a swatch or "Default" to set a custom color.
        </p>
      </div>

      {/* Defaults reference */}
      <div className="bg-[var(--neutral-50)] rounded-lg p-3">
        <p className="text-[10px] font-medium text-[var(--neutral-500)] uppercase tracking-wider mb-1.5">Defaults</p>
        <div className="flex flex-wrap gap-2">
          {COLOR_FIELDS.map(f => (
            <div key={f.key} className="flex items-center gap-1">
              <div className="size-3.5 rounded" style={{ backgroundColor: defaults[f.key] || "#ccc" }} />
              <span className="text-[8px] text-[var(--neutral-500)]">{f.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Per-app */}
      {Object.entries(apps).map(([appId, app]) => {
        const isOpen = expandedApp === appId;
        const customCount = COLOR_FIELDS.filter(f => app[f.key] !== null && app[f.key] !== undefined).length;
        return (
          <div key={appId} className={`border rounded-lg bg-white overflow-hidden transition-colors ${isOpen ? "border-[var(--brand-primary)] ring-1 ring-[var(--brand-primary)]/20" : "border-[var(--neutral-200)]"}`}>
            <button
              onClick={() => setExpandedApp(isOpen ? null : appId)}
              className="w-full px-3 py-2.5 flex items-center justify-between text-left hover:bg-[var(--neutral-50)] transition-colors"
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-1">
                  <div className="size-4 rounded border border-white" style={{ backgroundColor: (app.primary as string) ?? defaults.primary }} />
                  <div className="size-4 rounded border border-white" style={{ backgroundColor: (app.accent as string) ?? defaults.accent }} />
                </div>
                <span className="text-sm font-semibold text-[var(--neutral-800)]">{app.name}</span>
                {customCount > 0 && <span className="text-[9px] px-1.5 py-0.5 rounded bg-[var(--brand-primary-light)] text-[var(--brand-primary)] font-medium">{customCount}</span>}
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--neutral-400)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200" style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0)" }}><path d="M6 9l6 6 6-6" /></svg>
            </button>
            {isOpen && (
              <div className="px-3 pb-3 border-t border-[var(--neutral-100)] pt-2.5 space-y-3">
                {app.notes && <p className="text-[9px] text-[var(--neutral-400)]">{app.notes}</p>}
                {GROUPS.map(group => (
                  <div key={group.label}>
                    <p className="text-[9px] font-medium text-[var(--neutral-500)] uppercase tracking-wider mb-1.5">{group.label}</p>
                    <div className="space-y-1.5">
                      {group.keys.map(key => {
                        const val = (app[key] as string | null) ?? null;
                        const isInherited = val === null;
                        const displayColor = val ?? defaults[key] ?? "#cccccc";
                        const label = fieldMap[key] || key;

                        return (
                          <div key={key} className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                if (isInherited) {
                                  onUpdate(appId, key, defaults[key] ?? "#cccccc");
                                }
                                openPicker(appId, key, displayColor, label);
                              }}
                              className="size-6 rounded border border-[var(--neutral-200)] shadow-xs shrink-0 cursor-pointer"
                              style={{ backgroundColor: displayColor, opacity: isInherited ? 0.4 : 1 }}
                            />
                            <span className="text-[10px] text-[var(--neutral-600)] flex-1 truncate">{label}</span>
                            <button
                              onClick={() => {
                                if (isInherited) {
                                  onUpdate(appId, key, defaults[key] ?? "#cccccc");
                                  openPicker(appId, key, defaults[key] ?? "#cccccc", label);
                                } else {
                                  onUpdate(appId, key, null);
                                  if (activePicker === `${appId}:${key}`) closePicker();
                                }
                              }}
                              className={`px-1.5 py-0.5 text-[8px] rounded font-medium shrink-0 ${isInherited ? "bg-[var(--neutral-100)] text-[var(--neutral-400)]" : "bg-[var(--brand-primary-light)] text-[var(--brand-primary)]"}`}
                            >
                              {isInherited ? "Default" : "Custom"}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}

      {/* Color picker modal — rendered via portal to escape sidebar stacking context */}
      {activePicker && createPortal(
        <>
          <div className="fixed inset-0" style={{ zIndex: 9998 }} onClick={closePicker} />
          <div className="fixed bg-white rounded-lg shadow-xl p-4 border border-[var(--neutral-200)]" style={{ zIndex: 9999, top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
            <p className="text-xs font-medium text-[var(--neutral-700)] mb-2">{pickerLabel}</p>
            <HexColorPicker color={pickerColor} onChange={handlePickerChange} />
            <input
              value={pickerColor}
              onChange={(e) => {
                if (/^#[0-9a-fA-F]{0,6}$/.test(e.target.value)) {
                  setPickerColor(e.target.value);
                  if (e.target.value.length === 7) {
                    clearTimeout(debounceRef.current);
                    onUpdate(pickerAppId, pickerFieldKey, e.target.value);
                  }
                }
              }}
              className="mt-2 w-full px-2 py-1 text-xs font-mono border border-[var(--neutral-200)] rounded text-center"
            />
            <button onClick={closePicker} className="mt-2 w-full px-2 py-1.5 text-xs font-medium rounded bg-[var(--brand-primary)] text-white">Done</button>
          </div>
        </>,
        document.body
      )}
    </div>
  );
}
