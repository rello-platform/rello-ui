"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

/* ─── Types ─── */

export interface PipelineData {
  cold: number;
  warming: number;
  engaged: number;
  qualified: number;
  hot: number;
}

export interface QuickStat {
  value: string | number;
  label: string;
}

export interface PipelineThermometerProps {
  title?: string;
  data: PipelineData;
  stats?: QuickStat[];
  totalLabel?: string;
  className?: string;
  /** Callback when a pipeline stage segment is clicked */
  onSegmentClick?: (stage: keyof PipelineData) => void;
}

/* ─── Constants ─── */

const STAGES = ["cold", "warming", "engaged", "qualified", "hot"] as const;

const STAGE_LABELS: Record<keyof PipelineData, string> = {
  cold: "Cold",
  warming: "Warming",
  engaged: "Engaged",
  qualified: "Qualified",
  hot: "Hot",
};

const STAGE_COLORS: Record<keyof PipelineData, string> = {
  cold: "var(--cold)",
  warming: "var(--warming)",
  engaged: "var(--engaged)",
  qualified: "var(--qualified)",
  hot: "var(--hot)",
};

const GRADIENT = "linear-gradient(to right, var(--cold), var(--warming), var(--engaged), var(--qualified), var(--hot))";

/* ─── Component ─── */

function PipelineThermometer({
  title = "Lead Pipeline",
  data,
  stats,
  totalLabel = "Total Leads",
  className,
  onSegmentClick,
}: PipelineThermometerProps) {
  const total = STAGES.reduce((sum, stage) => sum + data[stage], 0);

  // Find the highest non-zero stage to determine fill level
  let highestActiveIndex = -1;
  for (let i = STAGES.length - 1; i >= 0; i--) {
    if (data[STAGES[i]] > 0) {
      highestActiveIndex = i;
      break;
    }
  }
  const fillPct = highestActiveIndex >= 0
    ? ((highestActiveIndex + 1) / STAGES.length) * 100
    : 0;

  return (
    <div
      className={cn("rounded-xl p-5", className)}
      style={{
        backgroundColor: "var(--card-background)",
        border: "1px solid var(--card-border)",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <span
          className="font-semibold text-sm"
          style={{ color: "var(--foreground)" }}
        >
          {title}
        </span>
        <span
          className="text-xs font-medium px-2.5 py-1 rounded-md"
          style={{
            backgroundColor: "var(--brand-primary-light)",
            color: "var(--brand-primary)",
          }}
        >
          {total} {totalLabel}
        </span>
      </div>

      {/* Thermometer Bar */}
      <div className="relative h-4 rounded-full overflow-hidden mb-3" style={{ backgroundColor: "var(--neutral-200)" }}>
        {fillPct > 0 && (
          <div
            className="absolute inset-y-0 left-0 rounded-full transition-all duration-500 ease-in-out"
            style={{
              width: `${fillPct}%`,
              backgroundImage: GRADIENT,
              backgroundSize: `${(100 / fillPct) * 100}% 100%`,
            }}
          />
        )}
      </div>

      {/* Stage labels + counts */}
      <div className="flex mb-4">
        {STAGES.map((stage, i) => {
          const isActive = i <= highestActiveIndex;
          const clickable = onSegmentClick && isActive && data[stage] > 0;
          return (
            <div
              key={stage}
              className={cn("flex-1 text-center", clickable && "cursor-pointer hover:opacity-80 transition-opacity")}
              onClick={clickable ? () => onSegmentClick(stage) : undefined}
              role={clickable ? "button" : undefined}
              tabIndex={clickable ? 0 : undefined}
              onKeyDown={clickable ? (e) => { if (e.key === "Enter" || e.key === " ") onSegmentClick(stage); } : undefined}
            >
              <p
                className="text-sm font-bold"
                style={{
                  color: isActive ? "var(--foreground)" : "var(--neutral-300)",
                  fontFamily: "var(--font-stat, var(--font-heading))",
                }}
              >
                {data[stage]}
              </p>
              <p
                className={cn("text-[10px] font-medium", clickable && "underline decoration-dotted underline-offset-2")}
                style={{
                  color: isActive ? STAGE_COLORS[stage] : "var(--neutral-300)",
                }}
              >
                {STAGE_LABELS[stage]}
              </p>
            </div>
          );
        })}
      </div>

      {/* Quick Stats */}
      {stats && stats.length > 0 && (
        <div
          className="flex items-center justify-around pt-4"
          style={{ borderTop: "1px solid var(--card-border)" }}
        >
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="text-center">
                <div
                  className="text-lg font-bold"
                  style={{
                    color: "var(--brand-primary)",
                    fontFamily: "var(--font-stat, var(--font-heading))",
                  }}
                >
                  {stat.value}
                </div>
                <div
                  className="text-xs"
                  style={{ color: "var(--neutral-500)" }}
                >
                  {stat.label}
                </div>
              </div>
              {index < stats.length - 1 && (
                <div
                  className="h-8 w-px"
                  style={{ backgroundColor: "var(--neutral-200)" }}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export { PipelineThermometer, STAGE_COLORS, STAGE_LABELS, STAGES };
