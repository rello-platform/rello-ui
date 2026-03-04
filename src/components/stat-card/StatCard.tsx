"use client";

import * as React from "react";
import { Card } from "../card";
import { cn } from "../../lib/cn";

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  color?: string;
  subtitle?: string;
}

function StatCard({
  label,
  value,
  icon,
  color = "var(--brand-primary)",
  subtitle,
  className,
  ...props
}: StatCardProps) {
  return (
    <Card className={className} {...props}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-[var(--neutral-500)]">{label}</p>
          <p className="text-2xl font-bold stat-number" style={{ color }}>
            {value}
          </p>
          {subtitle && (
            <p className="text-xs text-[var(--neutral-400)] mt-0.5">
              {subtitle}
            </p>
          )}
        </div>
        {icon && (
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{
              background: `${color}15`,
              color,
            }}
          >
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
}

export { StatCard };
