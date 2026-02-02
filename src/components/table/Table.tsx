"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface Column<T> { key: string; header: string; sortable?: boolean; className?: string; render?: (item: T) => React.ReactNode; }

export interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyField: keyof T;
  onRowClick?: (item: T) => void;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  onSort?: (key: string) => void;
  isLoading?: boolean;
  emptyMessage?: string;
  className?: string;
}

function Table<T>({ columns, data, keyField, onRowClick, sortBy, sortOrder, onSort, isLoading, emptyMessage = "No data found", className }: TableProps<T>) {
  if (isLoading) {
    return (
      <div className={cn("bg-white rounded-xl border border-[var(--neutral-100)] overflow-hidden", className)}>
        <div className="animate-pulse">
          <div className="h-12 bg-[var(--neutral-50)] border-b border-[var(--neutral-100)]" />
          {[...Array(5)].map((_, i) => <div key={i} className="h-16 border-b border-[var(--neutral-100)] last:border-b-0"><div className="h-4 bg-[var(--neutral-100)] rounded m-4 w-3/4" /></div>)}
        </div>
      </div>
    );
  }
  if (data.length === 0) {
    return <div className={cn("bg-white rounded-xl border border-[var(--neutral-100)] p-12 text-center", className)}><p className="text-[var(--neutral-500)]">{emptyMessage}</p></div>;
  }
  return (
    <div className={cn("bg-white rounded-xl border border-[var(--neutral-100)] overflow-hidden", className)}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-[var(--neutral-50)] border-b border-[var(--neutral-100)]">
              {columns.map((column) => (
                <th key={column.key} className={cn("px-4 py-3 text-left text-xs font-semibold text-[var(--neutral-600)] uppercase tracking-wider", column.sortable && "cursor-pointer hover:bg-[var(--neutral-100)] select-none", column.className)} onClick={() => column.sortable && onSort?.(column.key)}>
                  <div className="flex items-center gap-1">{column.header}{column.sortable && sortBy === column.key && <span className="text-[var(--brand-primary)]">{sortOrder === "asc" ? "↑" : "↓"}</span>}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--neutral-100)]">
            {data.map((item) => (
              <tr key={String(item[keyField])} onClick={() => onRowClick?.(item)} className={cn("hover:bg-[var(--neutral-50)] transition-colors", onRowClick && "cursor-pointer")}>
                {columns.map((column) => <td key={column.key} className={cn("px-4 py-3 text-sm text-[var(--foreground)]", column.className)}>{column.render ? column.render(item) : String((item as Record<string, unknown>)[column.key] ?? "")}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export { Table };
