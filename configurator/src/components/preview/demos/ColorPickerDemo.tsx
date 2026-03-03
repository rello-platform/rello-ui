import { useState } from "react";
import { HexColorPicker } from "react-colorful";

export function ColorPickerDemo() {
  const [color, setColor] = useState("#3B5998");
  const [color2, setColor2] = useState("#C9785D");

  return (
    <div className="bg-[var(--neutral-50)] rounded-xl overflow-hidden border border-[var(--neutral-200)]">
      <div className="p-4 border-b border-[var(--neutral-100)]">
        <span className="text-sm font-medium text-[var(--neutral-700)]">Color Picker — Click swatches or use the picker</span>
      </div>
      <div className="p-6 flex gap-8">
        {/* Primary color */}
        <div>
          <label className="block text-xs font-medium text-[var(--neutral-600)] mb-2">Primary Brand Color</label>
          <div className="bg-white rounded-lg border border-[var(--neutral-200)] shadow-sm p-4">
            <HexColorPicker color={color} onChange={setColor} />
            <div className="flex items-center gap-2 mt-3">
              <div className="size-8 rounded-md border border-[var(--neutral-200)]" style={{ backgroundColor: color }} />
              <input
                value={color}
                onChange={(e) => /^#[0-9a-fA-F]{0,6}$/.test(e.target.value) && setColor(e.target.value)}
                className="flex-1 px-2 py-1 text-xs font-mono border border-[var(--neutral-200)] rounded text-center outline-none focus:border-[var(--brand-primary)]"
              />
            </div>
          </div>
        </div>

        {/* Accent color */}
        <div>
          <label className="block text-xs font-medium text-[var(--neutral-600)] mb-2">Accent Brand Color</label>
          <div className="bg-white rounded-lg border border-[var(--neutral-200)] shadow-sm p-4">
            <HexColorPicker color={color2} onChange={setColor2} />
            <div className="flex items-center gap-2 mt-3">
              <div className="size-8 rounded-md border border-[var(--neutral-200)]" style={{ backgroundColor: color2 }} />
              <input
                value={color2}
                onChange={(e) => /^#[0-9a-fA-F]{0,6}$/.test(e.target.value) && setColor2(e.target.value)}
                className="flex-1 px-2 py-1 text-xs font-mono border border-[var(--neutral-200)] rounded text-center outline-none focus:border-[var(--brand-primary)]"
              />
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="flex-1">
          <label className="block text-xs font-medium text-[var(--neutral-600)] mb-2">Live Preview</label>
          <div className="bg-white rounded-lg border border-[var(--neutral-200)] shadow-sm p-4 space-y-3">
            <button className="px-4 py-2 text-sm font-medium text-white rounded-lg" style={{ backgroundColor: color }}>Primary Button</button>
            <button className="px-4 py-2 text-sm font-medium text-white rounded-lg" style={{ backgroundColor: color2 }}>Accent Button</button>
            <div className="p-3 rounded-lg" style={{ backgroundColor: color + "1A" }}>
              <p className="text-sm font-medium" style={{ color }}>Primary tint card</p>
            </div>
            <div className="p-3 rounded-lg" style={{ backgroundColor: color2 + "1A" }}>
              <p className="text-sm font-medium" style={{ color: color2 }}>Accent tint card</p>
            </div>
            <a className="text-sm font-medium underline cursor-pointer" style={{ color }}>Primary link</a>
          </div>
        </div>
      </div>
    </div>
  );
}
