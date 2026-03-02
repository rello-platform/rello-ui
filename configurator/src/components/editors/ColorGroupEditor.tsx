import { useState } from "react";
import { ColorEditor } from "./ColorEditor";

interface ColorGroupEditorProps {
  title: string;
  description: string;
  colors: Array<{ label: string; path: string; value: string }>;
  onUpdate: (path: string, value: string) => void;
}

export function ColorGroupEditor({ title, description, colors, onUpdate }: ColorGroupEditorProps) {
  const [open, setOpen] = useState(true);

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-left mb-2"
      >
        <div>
          <h3 className="text-sm font-semibold text-[var(--neutral-800)]">{title}</h3>
          <p className="text-[10px] text-[var(--neutral-400)]">{description}</p>
        </div>
        <span className="text-[var(--neutral-400)] text-xs">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div className="flex flex-col gap-2 pl-1">
          {colors.map((c) => (
            <ColorEditor
              key={c.path}
              label={c.label}
              value={c.value}
              onChange={(v) => onUpdate(c.path, v)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
