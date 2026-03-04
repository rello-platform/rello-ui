"use client";

import * as React from "react";
import { OpenNewWindow } from "iconoir-react";
import { cn } from "../../lib/cn";

/* ─── Types ─── */

export type NewsTagType = "new" | "sold" | "price" | "update" | "alert" | "report";

export interface NewsItem {
  id: string;
  /** Tag label, e.g. "NEW", "SOLD" */
  tag: NewsTagType;
  /** Headline text */
  headline: string;
  /** Short summary */
  summary?: string;
  /** URL to open on click */
  href?: string;
  /** Timestamp string, e.g. "2h ago" */
  timestamp?: string;
}

export interface NewsRowProps {
  /** News items to display */
  items: NewsItem[];
  /** Called when an item is clicked */
  onItemClick?: (item: NewsItem) => void;
  /** Max number of items to show */
  maxItems?: number;
  /** Additional class names */
  className?: string;
}

/* ─── Constants ─── */

const TAG_COLORS: Record<NewsTagType, { bg: string; text: string }> = {
  new: { bg: "var(--info-light)", text: "var(--info)" },
  sold: { bg: "var(--success-light)", text: "var(--success)" },
  price: { bg: "var(--warning-light)", text: "var(--warning)" },
  update: { bg: "var(--brand-primary-light)", text: "var(--brand-primary)" },
  alert: { bg: "var(--error-light)", text: "var(--error)" },
  report: { bg: "var(--brand-accent-light)", text: "var(--brand-accent)" },
};

const TAG_LABELS: Record<NewsTagType, string> = {
  new: "NEW",
  sold: "SOLD",
  price: "PRICE",
  update: "UPDATE",
  alert: "ALERT",
  report: "REPORT",
};

/* ─── Component ─── */

function NewsRow({
  items,
  onItemClick,
  maxItems,
  className,
}: NewsRowProps) {
  const visibleItems = maxItems ? items.slice(0, maxItems) : items;

  return (
    <div className={cn("space-y-1", className)}>
      {visibleItems.map((item) => {
        const tagStyle = TAG_COLORS[item.tag];

        return (
          <div
            key={item.id}
            className={cn(
              "flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors",
              (item.href || onItemClick) && "cursor-pointer hover:opacity-80",
            )}
            style={{
              backgroundColor: "color-mix(in srgb, var(--neutral-500) 5%, transparent)",
            }}
            onClick={() => {
              if (onItemClick) {
                onItemClick(item);
              } else if (item.href) {
                window.open(item.href, "_blank", "noopener");
              }
            }}
          >
            {/* Tag */}
            <span
              className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shrink-0 mt-0.5"
              style={{
                backgroundColor: tagStyle.bg,
                color: tagStyle.text,
              }}
            >
              {TAG_LABELS[item.tag]}
            </span>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p
                className="text-sm font-medium leading-tight"
                style={{ color: "var(--foreground)" }}
              >
                {item.headline}
              </p>
              {item.summary && (
                <p
                  className="text-xs mt-0.5 line-clamp-2"
                  style={{ color: "var(--neutral-500)" }}
                >
                  {item.summary}
                </p>
              )}
            </div>

            {/* Timestamp + link indicator */}
            <div className="flex items-center gap-1.5 shrink-0">
              {item.timestamp && (
                <span
                  className="text-[10px]"
                  style={{ color: "var(--neutral-400)" }}
                >
                  {item.timestamp}
                </span>
              )}
              {item.href && (
                <OpenNewWindow
                  width={12}
                  height={12}
                  strokeWidth={1.5}
                  style={{ color: "var(--neutral-400)" }}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export { NewsRow };
