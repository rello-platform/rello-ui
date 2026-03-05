"use client";

import * as React from "react";
import { useState } from "react";
import { Phone, Check, SendDiagonal, Mail, Eye } from "iconoir-react";
import { cn } from "../../lib/cn";
import { Badge } from "../badge";
import { SegmentedProgress, type ProgressSegment } from "../segmented-progress";

/* ─── Types ─── */

export type TaskTemperature = "hot" | "qualified" | "engaged" | "warming" | "cold" | "sphere";
export type TaskActionType = "call" | "text" | "email" | "review" | "send";

export interface HeroActionTask {
  id: string;
  contactName: string;
  contextLine: string;
  temperature: TaskTemperature;
  completed: boolean;
  actionType?: TaskActionType;
}

export interface HeroActionCardProps {
  /** Card title, e.g. "FIVE BEFORE 9" */
  title: string;
  /** Main heading, e.g. "Your calls today" */
  heading: string;
  /** Motivational subtitle */
  subtitle?: string;
  /** Progress: completed / total */
  completedCount: number;
  totalCount: number;
  /** The task items */
  tasks: HeroActionTask[];
  /** Called when a task is checked/unchecked */
  onTaskToggle?: (taskId: string, completed: boolean) => void;
  /** Called when a task row is clicked (e.g., open contact) */
  onTaskClick?: (taskId: string) => void;
  /** Footer action */
  onViewFullPlan?: () => void;
  /** Footer button text */
  footerText?: string;
  /** Optional branded illustration rendered next to the header */
  illustration?: React.ReactNode;
  className?: string;
}

/* ─── Constants ─── */

const TEMP_COLORS: Record<TaskTemperature, string> = {
  hot: "var(--hot)",
  qualified: "var(--qualified)",
  engaged: "var(--engaged)",
  warming: "var(--warming)",
  cold: "var(--cold)",
  sphere: "var(--neutral-400)",
};

const TEMP_LABELS: Record<TaskTemperature, string> = {
  hot: "HOT",
  qualified: "QUALIFIED",
  engaged: "ENGAGED",
  warming: "WARM",
  cold: "COLD",
  sphere: "SPHERE",
};

const ACTION_ICONS: Record<TaskActionType, React.ComponentType<{ width: number; height: number; strokeWidth: number }>> = {
  call: Phone,
  text: SendDiagonal,
  email: Mail,
  review: Eye,
  send: SendDiagonal,
};

/* ─── Component ─── */

function HeroActionCard({
  title,
  heading,
  subtitle,
  completedCount,
  totalCount,
  tasks,
  onTaskToggle,
  onTaskClick,
  onViewFullPlan,
  footerText = "View Full Action Plan",
  illustration,
  className,
}: HeroActionCardProps) {
  // Build segments for the progress bar
  const segments: ProgressSegment[] = [];
  let completedSoFar = 0;
  for (const task of tasks) {
    if (task.completed) {
      segments.push({ value: 1, color: "var(--success)" });
      completedSoFar++;
    }
  }
  // Add in-progress segment (next uncompleted)
  const nextUncompleted = tasks.find((t) => !t.completed);
  if (nextUncompleted) {
    segments.push({ value: 1, color: TEMP_COLORS[nextUncompleted.temperature] });
  }

  return (
    <div
      className={cn("rounded-xl overflow-hidden", className)}
      style={{
        backgroundColor: "var(--hero-card-background, var(--card-background))",
        border: "1px solid var(--hero-card-border, var(--card-border))",
      }}
    >
      {/* Header */}
      <div className="px-5 pt-5 pb-3">
        <div className="flex items-start justify-between mb-1">
          <div className="flex items-center gap-3">
            {illustration && <div className="shrink-0">{illustration}</div>}
            <div>
              <p
                className="text-[11px] font-semibold uppercase tracking-wider mb-1"
                style={{ color: "var(--brand-primary)" }}
              >
                {title}
              </p>
              <h2
                className="text-xl font-bold"
                style={{ color: "var(--hero-card-title, var(--foreground))" }}
              >
                {heading}
              </h2>
              {subtitle && (
                <p
                  className="text-sm mt-0.5"
                  style={{ color: "var(--hero-card-body-text, var(--neutral-500))" }}
                >
                  {subtitle}
                </p>
              )}
            </div>
          </div>
          <div className="text-right shrink-0 ml-4">
            <p
              className="text-3xl font-bold"
              style={{
                color: "var(--brand-primary)",
                fontFamily: "var(--font-stat, var(--font-heading))",
              }}
            >
              {completedCount}/{totalCount}
            </p>
            <p
              className="text-xs"
              style={{ color: "var(--hero-card-body-text, var(--neutral-500))" }}
            >
              completed
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-3">
          <SegmentedProgress
            segments={segments}
            total={totalCount}
            size="md"
          />
        </div>
      </div>

      {/* Task list */}
      <div className="px-5 pb-5 space-y-2 mt-2">
        {tasks.map((task) => {
          const isCompleted = task.completed;
          const isNext = !isCompleted && task.id === nextUncompleted?.id;
          const ActionIcon = task.actionType ? ACTION_ICONS[task.actionType] : Phone;
          const tempColor = TEMP_COLORS[task.temperature];

          return (
            <div
              key={task.id}
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-3 transition-all cursor-pointer",
                isCompleted && "opacity-60",
              )}
              style={{
                backgroundColor: isNext
                  ? `color-mix(in srgb, ${tempColor} 12%, var(--hero-card-background, var(--card-background)))`
                  : `color-mix(in srgb, var(--neutral-500) 8%, var(--hero-card-background, var(--card-background)))`,
                border: isNext ? `1px solid color-mix(in srgb, ${tempColor} 30%, transparent)` : "1px solid transparent",
              }}
              onClick={() => onTaskClick?.(task.id)}
            >
              {/* Status icon */}
              <button
                className={cn(
                  "size-9 rounded-full flex items-center justify-center shrink-0 transition-colors",
                )}
                style={{
                  backgroundColor: isCompleted
                    ? "color-mix(in srgb, var(--success) 20%, transparent)"
                    : "color-mix(in srgb, var(--neutral-400) 15%, transparent)",
                  color: isCompleted
                    ? "var(--success)"
                    : "var(--hero-card-body-text, var(--neutral-500))",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  onTaskToggle?.(task.id, !isCompleted);
                }}
                aria-label={isCompleted ? "Mark incomplete" : "Mark complete"}
              >
                {isCompleted ? (
                  <Check width={18} height={18} strokeWidth={2} />
                ) : (
                  <ActionIcon width={18} height={18} strokeWidth={1.5} />
                )}
              </button>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p
                  className={cn("font-semibold text-sm", isCompleted && "line-through")}
                  style={{ color: "var(--hero-card-title, var(--foreground))" }}
                >
                  {task.contactName}
                </p>
                <p
                  className="text-xs truncate"
                  style={{ color: "var(--hero-card-body-text, var(--neutral-500))" }}
                >
                  {task.contextLine}
                </p>
              </div>

              {/* Temperature badge */}
              <span
                className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md shrink-0"
                style={{
                  backgroundColor: `color-mix(in srgb, ${tempColor} 15%, transparent)`,
                  color: tempColor,
                }}
              >
                {TEMP_LABELS[task.temperature]}
              </span>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      {onViewFullPlan && (
        <div
          className="px-5 py-3 text-center"
          style={{
            borderTop: "1px solid var(--hero-card-border, var(--card-border))",
          }}
        >
          <button
            onClick={onViewFullPlan}
            className="text-xs font-medium transition-opacity hover:opacity-80"
            style={{ color: "var(--brand-primary)" }}
          >
            {footerText}
          </button>
        </div>
      )}
    </div>
  );
}

export { HeroActionCard };
