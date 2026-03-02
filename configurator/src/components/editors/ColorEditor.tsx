import { useState } from "react";
import { HexColorPicker } from "react-colorful";

interface ColorEditorProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export function ColorEditor({ label, value, onChange }: ColorEditorProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="size-8 rounded-md border border-[var(--neutral-200)] shadow-xs cursor-pointer"
          style={{ backgroundColor: value }}
          title={label}
        />
        {open && (
          <>
            <div className="fixed inset-0 z-20" onClick={() => setOpen(false)} />
            <div className="absolute top-10 left-0 z-30 bg-white rounded-lg shadow-lg p-3 border border-[var(--neutral-200)]">
              <HexColorPicker color={value} onChange={onChange} />
              <input
                value={value}
                onChange={(e) => {
                  const v = e.target.value;
                  if (/^#[0-9a-fA-F]{0,6}$/.test(v)) onChange(v);
                }}
                className="mt-2 w-full px-2 py-1 text-xs font-mono border border-[var(--neutral-200)] rounded text-center"
              />
            </div>
          </>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <span className="text-xs text-[var(--neutral-700)] font-medium">{label}</span>
        <span className="text-[10px] text-[var(--neutral-400)] ml-1.5 font-mono">{value}</span>
      </div>
    </div>
  );
}
