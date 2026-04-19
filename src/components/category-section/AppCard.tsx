"use client";

import * as React from "react";
import { Badge, type BadgeVariant } from "../badge";
import { CardIllustration } from "../card-illustration";
import {
  AppCardIllustration,
  APP_ILLUSTRATIONS,
  type IllustrationKey,
} from "../card-illustration";
import { cn } from "../../lib/cn";

export interface AppCardProps {
  icon: React.ReactNode;
  title: string;
  status: string;
  statusVariant: BadgeVariant;
  value: string | number;
  valueLabel: string;
  description: string;
  subtext?: string;
  large?: boolean;
  /** Accent color for the branded icon illustration */
  accentColor?: string;
  /** Registry key for full branded illustration (pattern + custom icon) */
  illustrationKey?: IllustrationKey;
  onClick?: () => void;
  className?: string;
}

function AppCard({
  icon,
  title,
  status,
  statusVariant,
  value,
  valueLabel,
  description,
  subtext,
  large = false,
  accentColor,
  illustrationKey,
  onClick,
  className,
}: AppCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "bg-[var(--card-background)] border border-[var(--card-border)] rounded-lg p-4 text-left transition-all",
        "hover:shadow-md hover:border-[var(--neutral-200)]",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)]",
        large && "col-span-2",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        {illustrationKey && APP_ILLUSTRATIONS[illustrationKey] ? (
          <AppCardIllustration
            illustrationKey={illustrationKey}
            accentOverride={accentColor}
            size={36}
            radius={10}
            iconSize={20}
          />
        ) : accentColor ? (
          <CardIllustration
            accent={accentColor}
            size={36}
            radius={10}
            icon={icon}
          />
        ) : (
          <div
            className="w-8 h-8 rounded-md flex items-center justify-center text-[var(--neutral-600)]"
            style={{ background: "var(--neutral-100)" }}
          >
            {icon}
          </div>
        )}
        <Badge variant={statusVariant}>{status}</Badge>
      </div>

      {/* Title */}
      <h4 className="font-semibold text-sm text-[var(--neutral-900)] mb-2">
        {title}
      </h4>

      {/* Stat */}
      <div className="flex items-baseline gap-1.5 mb-2">
        <span className="stat-number text-2xl text-[var(--neutral-900)]">
          {value}
        </span>
        <span className="text-xs text-[var(--neutral-500)]">{valueLabel}</span>
      </div>

      {/* Description */}
      <p className="text-xs text-[var(--neutral-500)] line-clamp-2">{description}</p>

      {/* Subtext */}
      {subtext && (
        <p className="text-xs text-[var(--brand-primary)] mt-2 font-medium">
          {subtext}
        </p>
      )}
    </button>
  );
}

export { AppCard };
