"use client";

import * as React from "react";
import { GraphUp } from "iconoir-react";
import { Card } from "../card";
import { Badge } from "../badge";
import { cn } from "../../lib/cn";

const ICON_PROPS = { width: 20, height: 20, strokeWidth: 1.5 };

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
}

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

function PipelineThermometer({
  title = "Lead Pipeline",
  data,
  stats,
  totalLabel = "Total Leads",
  className,
}: PipelineThermometerProps) {
  const total = STAGES.reduce((sum, stage) => sum + data[stage], 0);

  return (
    <Card className={className}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-md flex items-center justify-center"
            style={{ background: "var(--brand-primary-light)", color: "var(--brand-primary)" }}
          >
            <GraphUp {...ICON_PROPS} />
          </div>
          <span className="font-semibold text-[var(--neutral-900)]">{title}</span>
        </div>
        <Badge variant="default">
          {total} {totalLabel}
        </Badge>
      </div>

      {/* Thermometer Bar */}
      <div className="flex h-3 rounded-full overflow-hidden bg-[var(--neutral-100)] mb-4">
        {STAGES.map((stage) => {
          const width = total > 0 ? (data[stage] / total) * 100 : 0;
          if (width === 0) return null;
          return (
            <div
              key={stage}
              className="transition-all duration-300"
              style={{ width: `${width}%`, backgroundColor: STAGE_COLORS[stage] }}
            />
          );
        })}
      </div>

      {/* Stage Cards */}
      <div className="grid grid-cols-5 gap-2 mb-4">
        {STAGES.map((stage) => (
          <div
            key={stage}
            className="flex items-center gap-2 p-2 rounded-md bg-[var(--neutral-50)]"
          >
            <div
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: STAGE_COLORS[stage] }}
            />
            <div>
              <div className="stat-number text-lg text-[var(--neutral-900)]">
                {data[stage]}
              </div>
              <div className="text-[10px] text-[var(--neutral-500)]">
                {STAGE_LABELS[stage]}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      {stats && stats.length > 0 && (
        <div className="flex items-center justify-around pt-4 border-t border-[var(--card-border)]">
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="text-center">
                <div className="stat-number text-lg text-[var(--brand-primary)]">
                  {stat.value}
                </div>
                <div className="text-xs text-[var(--neutral-500)]">{stat.label}</div>
              </div>
              {index < stats.length - 1 && (
                <div className="h-8 w-px bg-[var(--neutral-100)]" />
              )}
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

export { PipelineThermometer, STAGE_COLORS, STAGE_LABELS, STAGES };
