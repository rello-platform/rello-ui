"use client";

import * as React from "react";
import { useState } from "react";
import { Check, Xmark, NavArrowDown, NavArrowUp } from "iconoir-react";
import { cn } from "../../lib/cn";

export interface InsightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Insight title / label */
  title: string;
  /** Confidence score from 0 to 1 */
  confidence: number;
  /** Explanatory reasoning text */
  reasoning?: string;
  /** Key factors that contributed to the insight */
  keyFactors?: string[];
  /** Called when the user confirms the insight */
  onConfirm?: () => void;
  /** Called when the user dismisses the insight */
  onDismiss?: () => void;
  /** Whether the details section starts expanded */
  defaultExpanded?: boolean;
}

/**
 * Displays a smart-assistant-generated insight with confidence bar,
 * reasoning, and confirm/dismiss actions.
 *
 * Generic presentational component -- no data-fetching or app-specific logic.
 */
function InsightCard({
  title,
  confidence,
  reasoning,
  keyFactors = [],
  onConfirm,
  onDismiss,
  defaultExpanded = false,
  className,
  ...props
}: InsightCardProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const pct = Math.round(confidence * 100);

  // Color based on confidence level
  const barColor =
    confidence >= 0.8
      ? "var(--success, #10B981)"
      : confidence >= 0.6
        ? "var(--warning, #F59E0B)"
        : "var(--neutral-400, #9CA3AF)";

  return (
    <div
      className={cn(
        "rounded-lg border border-[var(--neutral-100)] bg-[var(--neutral-50)] px-3 py-2",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2">
        {/* Title */}
        <span className="flex-1 text-sm font-medium text-[var(--neutral-800)] truncate">
          {title}
        </span>

        {/* Confidence bar */}
        <div className="flex items-center gap-1.5 shrink-0">
          <div className="w-20 h-1.5 rounded-full bg-[var(--neutral-200)] overflow-hidden">
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${pct}%`, backgroundColor: barColor }}
            />
          </div>
          <span className="text-[10px] font-mono text-[var(--neutral-500)] w-8 text-right">
            {confidence.toFixed(2)}
          </span>
        </div>

        {/* Confirm / Dismiss buttons */}
        {onConfirm && (
          <button
            type="button"
            onClick={onConfirm}
            className="p-1 rounded hover:bg-green-100 text-green-600 transition-colors"
            aria-label="Confirm insight"
            title="Confirm"
          >
            <Check width={14} height={14} />
          </button>
        )}
        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            className="p-1 rounded hover:bg-red-100 text-red-500 transition-colors"
            aria-label="Dismiss insight"
            title="Dismiss"
          >
            <Xmark width={14} height={14} />
          </button>
        )}

        {/* Expand reasoning toggle */}
        {(reasoning || keyFactors.length > 0) && (
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="p-1 rounded hover:bg-[var(--neutral-200)] text-[var(--neutral-400)] transition-colors"
            aria-label={expanded ? "Collapse details" : "Expand details"}
          >
            {expanded ? (
              <NavArrowUp width={14} height={14} />
            ) : (
              <NavArrowDown width={14} height={14} />
            )}
          </button>
        )}
      </div>

      {/* Expanded reasoning section */}
      {expanded && (reasoning || keyFactors.length > 0) && (
        <div className="mt-2 pt-2 border-t border-[var(--neutral-200)]">
          {reasoning && (
            <p className="text-xs text-[var(--neutral-600)] leading-relaxed">
              {reasoning}
            </p>
          )}
          {keyFactors.length > 0 && (
            <div className="mt-1.5 flex flex-wrap gap-1">
              {keyFactors.map((factor, i) => (
                <span
                  key={i}
                  className="inline-block px-1.5 py-0.5 text-[10px] bg-[var(--neutral-200)] text-[var(--neutral-600)] rounded"
                >
                  {factor}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export { InsightCard };
