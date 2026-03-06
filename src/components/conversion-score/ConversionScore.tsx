"use client";

import * as React from "react";
import { Card } from "../card";
import { Badge } from "../badge";
import { cn } from "../../lib/cn";

export interface ConversionScoreProps extends React.HTMLAttributes<HTMLDivElement> {
  score: number;
  temperature: "hot" | "warm" | "cold";
  trend?: { direction: "up" | "down"; value: string };
  label?: string;
}

const gradients: Record<ConversionScoreProps["temperature"], [string, string]> = {
  hot: ["#E8915A", "#D9534F"],
  warm: ["#E8915A", "#D4A84B"],
  cold: ["#7BAFD4", "#5B8DB8"],
};

const temperatureColors: Record<ConversionScoreProps["temperature"], string> = {
  hot: "#D9534F",
  warm: "#D4A84B",
  cold: "#5B8DB8",
};

const temperatureBadgeVariant: Record<ConversionScoreProps["temperature"], "hot" | "warming" | "cold"> = {
  hot: "hot",
  warm: "warming",
  cold: "cold",
};

const RING_SIZE = 96;
const STROKE_WIDTH = 6;
const RADIUS = (RING_SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function ConversionScore({
  score,
  temperature,
  trend,
  label = "Conversion Score",
  className,
  ...props
}: ConversionScoreProps) {
  const clampedScore = Math.max(0, Math.min(100, score));
  const offset = CIRCUMFERENCE - (clampedScore / 100) * CIRCUMFERENCE;
  const [start, end] = gradients[temperature];
  const gradientId = React.useId();

  return (
    <Card className={cn("inline-flex flex-col items-center gap-3", className)} {...props}>
      {/* Ring gauge */}
      <div className="relative" style={{ width: RING_SIZE, height: RING_SIZE }}>
        <svg width={RING_SIZE} height={RING_SIZE} viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`}>
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={start} />
              <stop offset="100%" stopColor={end} />
            </linearGradient>
          </defs>
          {/* Track */}
          <circle
            cx={RING_SIZE / 2}
            cy={RING_SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke="var(--neutral-100)"
            strokeWidth={STROKE_WIDTH}
          />
          {/* Progress */}
          <circle
            cx={RING_SIZE / 2}
            cy={RING_SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth={STROKE_WIDTH}
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
            transform={`rotate(-90 ${RING_SIZE / 2} ${RING_SIZE / 2})`}
            className="transition-all duration-500 ease-out"
          />
        </svg>
        {/* Score number */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="text-2xl font-bold"
            style={{ fontFamily: "var(--font-stat)", color: temperatureColors[temperature] }}
          >
            {clampedScore}
          </span>
        </div>
      </div>

      {/* Label */}
      <p className="text-xs text-[var(--neutral-500)]">{label}</p>

      {/* Temperature badge */}
      <Badge variant={temperatureBadgeVariant[temperature]} size="sm" dot>
        {temperature.charAt(0).toUpperCase() + temperature.slice(1)}
      </Badge>

      {/* Trend */}
      {trend && (
        <div className="flex items-center gap-1 text-xs text-[var(--neutral-500)]">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            className={cn(
              trend.direction === "up" ? "text-[var(--success)]" : "text-[var(--error)]",
              trend.direction === "down" && "rotate-180",
            )}
          >
            <path
              d="M6 2.5V9.5M6 2.5L3 5.5M6 2.5L9 5.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>{trend.value}</span>
        </div>
      )}
    </Card>
  );
}

export { ConversionScore };
