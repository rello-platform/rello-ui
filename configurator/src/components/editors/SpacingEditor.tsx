import { useState } from "react";

interface SpacingEditorProps {
  title: string;
  values: Record<string, number>;
  onUpdate: (path: string, value: number) => void;
  prefix: string;
}

export function SpacingEditor({ title, values, onUpdate, prefix }: SpacingEditorProps) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-left mb-2"
      >
        <div>
          <h3 className="text-sm font-semibold text-[var(--neutral-800)]">{title}</h3>
          <p className="text-[10px] text-[var(--neutral-400)]">4px base scale</p>
        </div>
        <span className="text-[var(--neutral-400)] text-xs">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div className="flex flex-col gap-2.5 pl-1">
          {Object.entries(values).map(([key, val]) => (
            <div key={key} className="flex items-center gap-2">
              <span className="text-xs text-[var(--neutral-500)] w-6 text-right font-mono">{key}</span>
              <input
                type="range"
                min={0}
                max={64}
                value={val}
                onChange={(e) => onUpdate(`${prefix}.${key}`, parseInt(e.target.value))}
                className="flex-1 h-1.5 accent-[var(--brand-primary)]"
              />
              <span className="text-xs text-[var(--neutral-600)] font-mono w-10 text-right">{val}px</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
