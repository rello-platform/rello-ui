"use client";

import * as React from "react";
import { useState } from "react";
import { DragHandGesture, NavArrowDown } from "iconoir-react";
import { AppCard, type AppCardProps } from "./AppCard";
import { cn } from "../../lib/cn";

const ICON_SM = { width: 16, height: 16, strokeWidth: 1.5 };
const ICON_PROPS = { width: 20, height: 20, strokeWidth: 1.5 };

export interface CategoryApp {
  icon: React.ReactNode;
  title: string;
  status: string;
  statusVariant: AppCardProps["statusVariant"];
  value: string | number;
  valueLabel: string;
  description: string;
  subtext?: string;
  large?: boolean;
  href?: string;
  /** Override accent color for this app's icon illustration */
  accentColor?: string;
}

export interface CategorySectionProps {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  apps: CategoryApp[];
  defaultExpanded?: boolean;
  onAppClick?: (app: CategoryApp) => void;
  className?: string;
}

function CategorySection({
  id,
  title,
  subtitle,
  icon,
  iconBg,
  iconColor,
  apps,
  defaultExpanded = false,
  onAppClick,
  className,
}: CategorySectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div
      data-category={id}
      className={cn(
        "bg-[var(--card-background)] border border-[var(--card-border)] rounded-xl overflow-hidden",
        className
      )}
    >
      {/* Category Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-[var(--neutral-50)] transition-colors"
      >
        <div className="flex items-center gap-3">
          {/* Drag Handle */}
          <div className="text-[var(--neutral-300)] hover:text-[var(--neutral-500)] cursor-grab active:cursor-grabbing transition-colors">
            <DragHandGesture {...ICON_SM} />
          </div>

          {/* Icon */}
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ background: iconBg, color: iconColor }}
          >
            {icon}
          </div>

          {/* Title */}
          <div className="text-left">
            <h3 className="font-semibold text-[var(--neutral-900)]">{title}</h3>
            <p className="text-sm text-[var(--neutral-500)]">{subtitle}</p>
          </div>
        </div>

        {/* Chevron */}
        <NavArrowDown
          {...ICON_PROPS}
          className={cn(
            "text-[var(--neutral-400)] transition-transform duration-200",
            isExpanded && "rotate-180"
          )}
        />
      </button>

      {/* Category Content */}
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-in-out"
        style={{ gridTemplateRows: isExpanded ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="px-4 pb-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {apps.map((app, index) => (
                <AppCard
                  key={index}
                  icon={app.icon}
                  title={app.title}
                  status={app.status}
                  statusVariant={app.statusVariant}
                  value={app.value}
                  valueLabel={app.valueLabel}
                  description={app.description}
                  subtext={app.subtext}
                  large={app.large}
                  accentColor={app.accentColor ?? iconColor}
                  onClick={() => onAppClick?.(app)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { CategorySection };
