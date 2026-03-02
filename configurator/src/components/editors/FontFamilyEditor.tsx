import { useState, useCallback } from "react";

const FONT_OPTIONS: Record<string, string[]> = {
  heading: ["Montserrat", "Poppins", "Inter", "Raleway", "Playfair Display", "DM Sans", "Nunito", "Lora", "Outfit", "Plus Jakarta Sans"],
  body: ["Open Sans", "Inter", "Roboto", "Lato", "Source Sans 3", "Nunito Sans", "DM Sans", "Work Sans", "IBM Plex Sans", "Noto Sans"],
  ui: ["Hind", "Inter", "Roboto", "DM Sans", "Source Sans 3", "Nunito", "Open Sans", "Work Sans", "IBM Plex Sans", "Outfit"],
  stat: ["Mina", "Roboto Mono", "JetBrains Mono", "Space Mono", "Fira Code", "IBM Plex Mono", "DM Mono", "Inter", "Outfit", "Poppins"],
};

const ROLE_LABELS: Record<string, string> = {
  heading: "Headings",
  body: "Body Text",
  ui: "UI / Buttons",
  stat: "Stats / Numbers",
};

interface FontFamilyEditorProps {
  title: string;
  fonts: Record<string, string>;
  onUpdate: (path: string, value: string) => void;
}

export function FontFamilyEditor({ title, fonts, onUpdate }: FontFamilyEditorProps) {
  const [open, setOpen] = useState(false);
  const [loadedFonts, setLoadedFonts] = useState<Set<string>>(new Set());

  const loadFont = useCallback((fontName: string) => {
    if (loadedFonts.has(fontName)) return;
    const encoded = fontName.replace(/ /g, "+");
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `https://fonts.googleapis.com/css2?family=${encoded}:wght@400;500;600;700&display=swap`;
    document.head.appendChild(link);
    setLoadedFonts((prev) => new Set(prev).add(fontName));
  }, [loadedFonts]);

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-left mb-2"
      >
        <div>
          <h3 className="text-sm font-semibold text-[var(--neutral-800)]">{title}</h3>
          <p className="text-[10px] text-[var(--neutral-400)]">4 font roles</p>
        </div>
        <span className="text-[var(--neutral-400)] text-xs">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div className="flex flex-col gap-3 pl-1">
          {Object.entries(fonts).map(([role, current]) => (
            <div key={role}>
              <label className="text-[10px] text-[var(--neutral-500)] font-medium uppercase tracking-wider">
                {ROLE_LABELS[role] || role}
              </label>
              <select
                value={current}
                onChange={(e) => {
                  loadFont(e.target.value);
                  onUpdate(`fontFamily.${role}`, e.target.value);
                }}
                className="mt-0.5 w-full px-2 py-1.5 text-sm border border-[var(--neutral-200)] rounded-md bg-white outline-none focus:border-[var(--brand-primary)]"
              >
                {(FONT_OPTIONS[role] || []).map((f) => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
              <p className="mt-1 text-sm" style={{ fontFamily: `"${current}", sans-serif` }}>
                The quick brown fox jumps over the lazy dog
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
