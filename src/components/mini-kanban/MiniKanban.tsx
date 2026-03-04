"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

/* ─── Types ─── */

export interface MiniKanbanItem {
  id: string;
  /** Primary label (e.g. contact name) */
  label: string;
  /** Secondary text (e.g. loan amount, status) */
  subtitle?: string;
  /** Optional color for the left accent */
  color?: string;
}

export interface MiniKanbanColumn {
  /** Column identifier */
  id: string;
  /** Column header label */
  title: string;
  /** Color for the column header accent */
  color: string;
  /** Items in this column */
  items: MiniKanbanItem[];
  /** Count override — if provided, shown instead of items.length */
  count?: number;
}

export interface MiniKanbanProps {
  /** Columns to display */
  columns: MiniKanbanColumn[];
  /** Called when an item is clicked */
  onItemClick?: (itemId: string, columnId: string) => void;
  /** Max items to show per column before truncating */
  maxItemsPerColumn?: number;
  /** Additional class names */
  className?: string;
}

/* ─── Component ─── */

function MiniKanban({
  columns,
  onItemClick,
  maxItemsPerColumn = 3,
  className,
}: MiniKanbanProps) {
  return (
    <div className={cn("flex gap-2 overflow-x-auto", className)}>
      {columns.map((col) => {
        const visibleItems = col.items.slice(0, maxItemsPerColumn);
        const hiddenCount = col.items.length - visibleItems.length;
        const displayCount = col.count ?? col.items.length;

        return (
          <div
            key={col.id}
            className="flex-1 min-w-[140px] rounded-lg overflow-hidden"
            style={{
              backgroundColor: "color-mix(in srgb, var(--neutral-500) 6%, var(--card-background))",
              border: "1px solid var(--card-border)",
            }}
          >
            {/* Column header */}
            <div
              className="px-3 py-2 flex items-center justify-between"
              style={{
                borderBottom: `2px solid ${col.color}`,
              }}
            >
              <span
                className="text-[11px] font-semibold uppercase tracking-wider truncate"
                style={{ color: "var(--foreground)" }}
              >
                {col.title}
              </span>
              <span
                className="text-[11px] font-bold ml-2 shrink-0"
                style={{ color: col.color }}
              >
                {displayCount}
              </span>
            </div>

            {/* Items */}
            <div className="p-1.5 space-y-1">
              {visibleItems.map((item) => (
                <div
                  key={item.id}
                  className={cn(
                    "rounded-md px-2.5 py-2 transition-colors",
                    onItemClick && "cursor-pointer hover:opacity-80",
                  )}
                  style={{
                    backgroundColor: "var(--card-background)",
                    borderLeft: item.color ? `3px solid ${item.color}` : undefined,
                  }}
                  onClick={() => onItemClick?.(item.id, col.id)}
                >
                  <p
                    className="text-xs font-medium truncate"
                    style={{ color: "var(--foreground)" }}
                  >
                    {item.label}
                  </p>
                  {item.subtitle && (
                    <p
                      className="text-[10px] truncate mt-0.5"
                      style={{ color: "var(--neutral-500)" }}
                    >
                      {item.subtitle}
                    </p>
                  )}
                </div>
              ))}

              {visibleItems.length === 0 && (
                <p
                  className="text-[10px] text-center py-3"
                  style={{ color: "var(--neutral-400)" }}
                >
                  No items
                </p>
              )}

              {hiddenCount > 0 && (
                <p
                  className="text-[10px] text-center py-1 font-medium"
                  style={{ color: "var(--brand-primary)" }}
                >
                  +{hiddenCount} more
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export { MiniKanban };
