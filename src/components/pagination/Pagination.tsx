"use client";

import * as React from "react";
import { NavArrowLeft, NavArrowRight } from "iconoir-react";
import { cn } from "../../lib/cn";

export interface PaginationProps {
  page: number;
  totalPages: number;
  total: number;
  onPageChange: (page: number) => void;
  className?: string;
  showTotal?: boolean;
}

function Pagination({ page, totalPages, total, onPageChange, className, showTotal = true }: PaginationProps) {
  if (totalPages <= 1) return null;
  const pages: (number | "...")[] = [1];
  if (page > 3) pages.push("...");
  for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) { if (!pages.includes(i)) pages.push(i); }
  if (page < totalPages - 2) pages.push("...");
  if (totalPages > 1 && !pages.includes(totalPages)) pages.push(totalPages);

  return (
    <div className={cn("flex items-center justify-between gap-4 px-4 py-3 bg-white border-t border-[var(--neutral-100)]", className)}>
      {showTotal && <p className="text-sm text-[var(--neutral-500)]">Showing page {page} of {totalPages} ({total} total)</p>}
      <div className={cn("flex items-center gap-1", !showTotal && "mx-auto")}>
        <button onClick={() => onPageChange(page - 1)} disabled={page === 1} className={cn("p-2 rounded-lg transition-colors", page === 1 ? "text-[var(--neutral-300)] cursor-not-allowed" : "text-[var(--neutral-600)] hover:bg-[var(--neutral-100)]")}>
          <NavArrowLeft width={16} height={16} />
        </button>
        {pages.map((p, i) => p === "..." ? (
          <span key={`ellipsis-${i}`} className="px-2 text-[var(--neutral-400)]">...</span>
        ) : (
          <button key={p} onClick={() => onPageChange(p)} className={cn("min-w-[32px] h-8 px-2 rounded-lg text-sm font-medium transition-colors", p === page ? "bg-[var(--brand-primary)] text-white" : "text-[var(--neutral-600)] hover:bg-[var(--neutral-100)]")}>{p}</button>
        ))}
        <button onClick={() => onPageChange(page + 1)} disabled={page === totalPages} className={cn("p-2 rounded-lg transition-colors", page === totalPages ? "text-[var(--neutral-300)] cursor-not-allowed" : "text-[var(--neutral-600)] hover:bg-[var(--neutral-100)]")}>
          <NavArrowRight width={16} height={16} />
        </button>
      </div>
    </div>
  );
}

export { Pagination };
