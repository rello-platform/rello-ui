import { useState } from "react";
import type { ComponentSpec, ParamDef } from "../../hooks/useSpecs";

const FIELD_CONFIG: Array<{ key: keyof ComponentSpec; label: string; placeholder: string; rows: number }> = [
  { key: "description", label: "What is it?", placeholder: "A brief description of what this component is and its purpose in the platform...", rows: 2 },
  { key: "behavior", label: "How should it behave?", placeholder: "Describe interactions, animations, timing, triggers, close behavior...", rows: 3 },
  { key: "appearance", label: "How should it look?", placeholder: "Describe the visual style — colors, sizing, positioning, shape, typography...", rows: 3 },
  { key: "doUse", label: "When to use", placeholder: "List the scenarios where this component should be used...", rows: 2 },
  { key: "dontUse", label: "When NOT to use", placeholder: "List scenarios where a different pattern is better...", rows: 2 },
];

const CATEGORY_COLORS: Record<string, string> = {
  overlay: "bg-[var(--info-light)] text-[var(--info)]",
  feedback: "bg-[var(--warning-light)] text-[var(--warning)]",
  layout: "bg-[var(--brand-primary-light)] text-[var(--brand-primary)]",
  action: "bg-[var(--success-light)] text-[var(--success)]",
  "data-display": "bg-[var(--brand-accent-light)] text-[var(--brand-accent)]",
  form: "bg-[var(--engaged-light)] text-[var(--engaged)]",
  navigation: "bg-[var(--neutral-100)] text-[var(--neutral-600)]",
  motion: "bg-[var(--qualified-light)] text-[var(--qualified)]",
  rello: "bg-[var(--brand-primary-light)] text-[var(--brand-primary)]",
  feature: "bg-[var(--hot-light)] text-[var(--hot)]",
};

interface SpecEditorProps {
  componentId: string;
  spec: ComponentSpec;
  onUpdate: (componentId: string, field: keyof ComponentSpec, value: string) => void;
  onUpdateParam?: (componentId: string, paramKey: string, value: number | string) => void;
  isSelected?: boolean;
  onSelect?: (id: string) => void;
}

function ParamControl({ componentId, paramKey, param, onUpdate }: { componentId: string; paramKey: string; param: ParamDef; onUpdate: (id: string, key: string, val: number | string) => void }) {
  if (param.options) {
    return (
      <div className="flex items-center justify-between">
        <span className="text-xs text-[var(--neutral-600)]">{param.label}</span>
        <select
          value={String(param.value)}
          onChange={(e) => onUpdate(componentId, paramKey, e.target.value)}
          className="px-2 py-1 text-xs border border-[var(--neutral-200)] rounded bg-white outline-none focus:border-[var(--brand-primary)]"
        >
          {param.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      </div>
    );
  }
  if (typeof param.value === "number" && param.min !== undefined && param.max !== undefined) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-xs text-[var(--neutral-600)] w-24 shrink-0">{param.label}</span>
        <input
          type="range"
          min={param.min}
          max={param.max}
          step={param.max <= 1 ? 0.05 : 1}
          value={param.value}
          onChange={(e) => onUpdate(componentId, paramKey, parseFloat(e.target.value))}
          className="flex-1 h-1.5 accent-[var(--brand-primary)]"
        />
        <span className="text-xs text-[var(--neutral-600)] font-mono w-14 text-right">
          {typeof param.value === "number" && param.value < 1 ? param.value.toFixed(2) : param.value}{param.unit || ""}
        </span>
      </div>
    );
  }
  return null;
}

function SpecCard({ componentId, spec, onUpdate, onUpdateParam, isSelected, onSelect }: SpecEditorProps) {
  const [open, setOpen] = useState(false);
  const hasContent = FIELD_CONFIG.some((f) => spec[f.key]?.trim());
  const hasParams = spec.parameters && Object.keys(spec.parameters).length > 0;

  return (
    <div className={`border rounded-lg bg-white overflow-hidden transition-colors ${isSelected ? "border-[var(--brand-primary)] ring-1 ring-[var(--brand-primary)]/20" : "border-[var(--neutral-200)]"}`}>
      <button
        onClick={() => { setOpen(!open); onSelect?.(componentId); }}
        className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-[var(--neutral-50)] transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-[var(--neutral-800)]">{spec.name}</span>
          <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${CATEGORY_COLORS[spec.category] || "bg-[var(--neutral-100)] text-[var(--neutral-500)]"}`}>
            {spec.category}
          </span>
          {hasContent && <span className="size-1.5 rounded-full bg-[var(--success)]" />}
          {hasParams && <span className="text-[9px] text-[var(--neutral-400)]">⚙</span>}
        </div>
        <span className="text-[var(--neutral-400)] text-xs">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div className="px-4 pb-4 flex flex-col gap-3 border-t border-[var(--neutral-100)] pt-3">
          {/* Parameters — sliders and dropdowns */}
          {hasParams && onUpdateParam && (
            <div className="bg-[var(--neutral-50)] rounded-lg p-3 flex flex-col gap-2.5">
              <p className="text-[10px] font-medium text-[var(--neutral-500)] uppercase tracking-wider">Adjustable Parameters</p>
              {Object.entries(spec.parameters!).map(([key, param]) => (
                <ParamControl key={key} componentId={componentId} paramKey={key} param={param} onUpdate={onUpdateParam} />
              ))}
            </div>
          )}
          {/* Text fields */}
          {FIELD_CONFIG.map((field) => (
            <div key={field.key}>
              <label className="block text-xs font-medium text-[var(--neutral-600)] mb-1">
                {field.label}
              </label>
              <textarea
                value={spec[field.key] || ""}
                onChange={(e) => onUpdate(componentId, field.key, e.target.value)}
                placeholder={field.placeholder}
                rows={field.rows}
                className="w-full px-3 py-2 text-sm border border-[var(--neutral-200)] rounded-md outline-none resize-y focus:border-[var(--brand-primary)] focus:ring-1 focus:ring-[var(--brand-primary)]/20 placeholder:text-[var(--neutral-400)]"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

interface SpecSectionProps {
  specs: Record<string, ComponentSpec>;
  onUpdate: (componentId: string, field: keyof ComponentSpec, value: string) => void;
  onUpdateParam?: (componentId: string, paramKey: string, value: number | string) => void;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function SpecSection({ specs, onUpdate, onUpdateParam, selectedId, onSelect }: SpecSectionProps) {
  const categories = [
    { id: "overlay", label: "Overlays" },
    { id: "feedback", label: "Feedback & Loading" },
    { id: "layout", label: "Layout" },
    { id: "action", label: "Actions" },
    { id: "data-display", label: "Data Display" },
    { id: "form", label: "Forms" },
    { id: "navigation", label: "Navigation" },
    { id: "motion", label: "Motion & Animation" },
    { id: "rello", label: "Rello-Specific" },
    { id: "feature", label: "Features" },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="border-b border-[var(--neutral-200)] pb-2">
        <h3 className="text-sm font-semibold text-[var(--neutral-800)]">Component Specs</h3>
        <p className="text-[10px] text-[var(--neutral-400)]">
          Describe how each component should look and behave. These specs are saved to the repo and used as build instructions for new apps.
        </p>
      </div>
      {categories.map((cat) => {
        const items = Object.entries(specs).filter(([, s]) => s.category === cat.id);
        if (items.length === 0) return null;
        return (
          <div key={cat.id}>
            <p className="text-[10px] font-medium text-[var(--neutral-500)] uppercase tracking-wider mb-1.5">{cat.label}</p>
            <div className="flex flex-col gap-2">
              {items.map(([id, spec]) => (
                <SpecCard key={id} componentId={id} spec={spec} onUpdate={onUpdate} onUpdateParam={onUpdateParam} isSelected={selectedId === id} onSelect={onSelect} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
