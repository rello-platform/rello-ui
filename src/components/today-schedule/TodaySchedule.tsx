"use client";

import * as React from "react";
import { Calendar } from "iconoir-react";
import { Card } from "../card";
import { cn } from "../../lib/cn";

const ICON_PROPS = { width: 18, height: 18, strokeWidth: 1.5 };

export interface ScheduleItem {
  time: string;
  event: string;
}

export interface TodayScheduleProps {
  date?: string;
  items: ScheduleItem[];
  onViewAll?: () => void;
  className?: string;
}

function TodaySchedule({
  date,
  items,
  onViewAll,
  className,
}: TodayScheduleProps) {
  const displayDate =
    date ||
    new Date().toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });

  return (
    <Card padding="sm" className={className}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-md flex items-center justify-center"
            style={{ background: "var(--brand-accent-light)", color: "var(--brand-accent)" }}
          >
            <Calendar {...ICON_PROPS} />
          </div>
          <div>
            <h4 className="font-semibold text-sm text-[var(--neutral-900)]">
              Today&apos;s Schedule
            </h4>
            <p className="text-xs text-[var(--neutral-500)]">{displayDate}</p>
          </div>
        </div>
        {onViewAll && (
          <button
            onClick={onViewAll}
            className="text-xs font-medium text-[var(--brand-primary)] hover:underline"
          >
            View All
          </button>
        )}
      </div>

      {/* Schedule Items */}
      <div className="space-y-0">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-4 py-2 border-b border-[var(--card-border)] last:border-0"
          >
            <span className="text-xs font-medium text-[var(--neutral-400)] w-16">
              {item.time}
            </span>
            <span className="text-sm text-[var(--neutral-700)]">{item.event}</span>
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <p className="text-sm text-[var(--neutral-400)] text-center py-4">
          No events scheduled
        </p>
      )}
    </Card>
  );
}

export { TodaySchedule };
