"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface BrandColors {
  primary?: string | null;
  accent?: string | null;
}

export interface BrandColorPickerProps {
  /** Current color values (hex strings) */
  value: BrandColors;
  /** Called when either color changes */
  onChange: (value: BrandColors) => void;
  /** Group label rendered above the pickers */
  label?: string;
  /** Hint text rendered below */
  hint?: string;
  /** Error message rendered below */
  error?: string;
  /** Whether all inputs are disabled */
  disabled?: boolean;
  /** Additional class names on the wrapper */
  className?: string;
}

const HEX_PATTERN = /^#[0-9a-fA-F]{6}$/;

function ColorField({
  label,
  value,
  onChange,
  disabled,
}: {
  label: string;
  value: string;
  onChange: (hex: string) => void;
  disabled?: boolean;
}) {
  const id = label.toLowerCase().replace(/\s+/g, "-");

  function handleTextChange(e: React.ChangeEvent<HTMLInputElement>) {
    let hex = e.target.value;
    // Auto-prefix # if user types raw hex
    if (hex && !hex.startsWith("#")) {
      hex = `#${hex}`;
    }
    onChange(hex);
  }

  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium text-[var(--neutral-700,#374151)]">
        {label}
      </label>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={value || "#000000"}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={cn(
            "h-9 w-12 cursor-pointer rounded-md border border-[var(--neutral-200,#E5E7EB)] bg-white p-0.5",
            "disabled:cursor-not-allowed disabled:opacity-50"
          )}
          aria-label={`${label} color picker`}
        />
        <input
          id={id}
          type="text"
          value={value ?? ""}
          onChange={handleTextChange}
          disabled={disabled}
          maxLength={7}
          placeholder="#000000"
          aria-invalid={!!value && !HEX_PATTERN.test(value)}
          className={cn(
            "h-9 w-full rounded-md border bg-white px-3 py-1 text-sm font-mono shadow-xs transition-[color,box-shadow] outline-none",
            "border-[var(--neutral-200,#E5E7EB)] text-[var(--foreground,#111827)] placeholder:text-[var(--neutral-400,#9CA3AF)]",
            "focus-visible:border-[var(--brand-primary,#3B5998)] focus-visible:ring-2 focus-visible:ring-[var(--brand-primary,#3B5998)]/20",
            "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[var(--neutral-50,#F9FAFB)]",
            value && !HEX_PATTERN.test(value) && "border-[var(--error,#C9605D)]"
          )}
        />
        {value && HEX_PATTERN.test(value) && (
          <div
            className="h-9 w-9 shrink-0 rounded-md border border-[var(--neutral-200,#E5E7EB)]"
            style={{ backgroundColor: value }}
            aria-hidden="true"
          />
        )}
      </div>
    </div>
  );
}

function BrandColorPicker({
  value,
  onChange,
  label,
  hint,
  error,
  disabled,
  className,
}: BrandColorPickerProps) {
  function handleChange(key: keyof BrandColors, hex: string) {
    onChange({ ...value, [key]: hex || null });
  }

  return (
    <div className={cn("w-full space-y-3", className)}>
      {label && (
        <p className="text-sm font-medium text-[var(--neutral-700,#374151)]">{label}</p>
      )}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <ColorField
          label="Primary"
          value={value.primary ?? ""}
          onChange={(hex) => handleChange("primary", hex)}
          disabled={disabled}
        />
        <ColorField
          label="Accent"
          value={value.accent ?? ""}
          onChange={(hex) => handleChange("accent", hex)}
          disabled={disabled}
        />
      </div>
      {(error || hint) && (
        <p className={cn("text-xs", error ? "text-[var(--error,#C9605D)]" : "text-[var(--neutral-500,#6B7280)]")}>
          {error || hint}
        </p>
      )}
    </div>
  );
}

BrandColorPicker.displayName = "BrandColorPicker";

export { BrandColorPicker };
