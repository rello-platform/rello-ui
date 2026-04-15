"use client";

import * as React from "react";
import { Facebook, Instagram, Linkedin, Youtube } from "iconoir-react";
import { Input } from "../input/Input";
import { cn } from "../../lib/cn";

export interface SocialLinks {
  facebook?: string | null;
  instagram?: string | null;
  linkedin?: string | null;
  youtube?: string | null;
}

export interface SocialLinksInputProps {
  /** Current social link values */
  value: SocialLinks;
  /** Called when any platform URL changes */
  onChange: (value: SocialLinks) => void;
  /** Group label rendered above all fields */
  label?: string;
  /** Hint text rendered below all fields */
  hint?: string;
  /** Error message rendered below all fields */
  error?: string;
  /** Whether all fields are disabled */
  disabled?: boolean;
  /** Additional class names on the wrapper */
  className?: string;
}

const PLATFORMS = [
  { key: "facebook" as const, label: "Facebook", placeholder: "https://facebook.com/yourpage", icon: Facebook },
  { key: "instagram" as const, label: "Instagram", placeholder: "https://instagram.com/yourhandle", icon: Instagram },
  { key: "linkedin" as const, label: "LinkedIn", placeholder: "https://linkedin.com/in/you", icon: Linkedin },
  { key: "youtube" as const, label: "YouTube", placeholder: "https://youtube.com/@yourchannel", icon: Youtube },
] as const;

function SocialLinksInput({
  value,
  onChange,
  label,
  hint,
  error,
  disabled,
  className,
}: SocialLinksInputProps) {
  function handleChange(platform: keyof SocialLinks, url: string) {
    onChange({ ...value, [platform]: url || null });
  }

  return (
    <div className={cn("w-full space-y-3", className)}>
      {label && (
        <p className="text-sm font-medium text-[var(--neutral-700,#374151)]">{label}</p>
      )}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {PLATFORMS.map(({ key, label: platformLabel, placeholder, icon: Icon }) => (
          <Input
            key={key}
            type="url"
            label={platformLabel}
            placeholder={placeholder}
            value={value[key] ?? ""}
            onChange={(e) => handleChange(key, e.target.value)}
            leftIcon={<Icon className="size-4" />}
            disabled={disabled}
          />
        ))}
      </div>
      {(error || hint) && (
        <p className={cn("text-xs", error ? "text-[var(--error,#C9605D)]" : "text-[var(--neutral-500,#6B7280)]")}>
          {error || hint}
        </p>
      )}
    </div>
  );
}

SocialLinksInput.displayName = "SocialLinksInput";

export { SocialLinksInput };
