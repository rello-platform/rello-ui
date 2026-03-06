"use client";

import * as React from "react";
import { Card } from "../card";
import { Badge } from "../badge";
import { cn } from "../../lib/cn";

export type FactorVariant = "hot" | "qualified" | "engaged" | "warming" | "cold" | "success";

export interface DecisionFactor {
  label: string;
  weight: number;
  variant?: FactorVariant;
}

export interface DecisionExplanationCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  explanation: string;
  factors: DecisionFactor[];
  confidence?: { level: string; score: number };
  illustration?: React.ReactNode;
  showMiloBadge?: boolean;
}

const factorGradients: Record<FactorVariant, [string, string]> = {
  hot: ["#E8915A", "#D9534F"],
  qualified: ["#D4A84B", "#E8915A"],
  engaged: ["#C4B84B", "#D4A84B"],
  warming: ["#7BB5C8", "#6A9FB5"],
  cold: ["#7BAFD4", "#5B8DB8"],
  success: ["#7BB59A", "#6B9080"],
};

function FactorBar({ label, weight, variant = "hot" }: DecisionFactor) {
  const gradientId = React.useId();
  const [start, end] = factorGradients[variant];
  const clampedWeight = Math.max(0, Math.min(100, weight));

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-[var(--neutral-600)] w-24 shrink-0 truncate">{label}</span>
      <div className="relative flex-1 h-2 rounded-full bg-[var(--neutral-100)] overflow-hidden">
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={start} />
              <stop offset="100%" stopColor={end} />
            </linearGradient>
          </defs>
          <rect
            x="0"
            y="0"
            width={`${clampedWeight}%`}
            height="100%"
            rx="4"
            fill={`url(#${gradientId})`}
            className="transition-all duration-300 ease-out"
          />
        </svg>
      </div>
      <span className="text-xs font-medium text-[var(--neutral-500)] w-8 text-right shrink-0">
        {clampedWeight}%
      </span>
    </div>
  );
}

function DecisionExplanationCard({
  title,
  subtitle,
  explanation,
  factors,
  confidence,
  illustration,
  showMiloBadge = true,
  className,
  ...props
}: DecisionExplanationCardProps) {
  return (
    <Card className={cn("flex flex-col gap-4", className)} {...props}>
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1.5 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold leading-none text-[var(--foreground)] truncate">
              {title}
            </h3>
            {showMiloBadge && (
              <Badge variant="primary" size="xs">
                Milo
              </Badge>
            )}
          </div>
          {subtitle && (
            <p className="text-sm text-[var(--neutral-500)]">{subtitle}</p>
          )}
        </div>
        {illustration && <div className="shrink-0 ml-4">{illustration}</div>}
      </div>

      {/* Explanation */}
      <p className="text-sm text-[var(--neutral-700)]" style={{ fontFamily: "var(--font-body)" }}>
        {explanation}
      </p>

      {/* Factors */}
      {factors.length > 0 && (
        <div className="flex flex-col gap-2.5">
          {factors.map((factor) => (
            <FactorBar key={factor.label} {...factor} />
          ))}
        </div>
      )}

      {/* Confidence footer */}
      {confidence && (
        <div className="flex items-center justify-between pt-4 border-t border-[var(--card-border)]">
          <span className="text-xs text-[var(--neutral-500)]">Confidence</span>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-[var(--neutral-700)]">
              {confidence.level}
            </span>
            <span className="text-xs text-[var(--neutral-400)]">
              {(confidence.score * 100).toFixed(0)}%
            </span>
          </div>
        </div>
      )}
    </Card>
  );
}

export { DecisionExplanationCard };
