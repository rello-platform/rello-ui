import { useState } from "react";

export function PaginationDemo() {
  const [page, setPage] = useState(5);
  const totalPages = 12;

  const pages: (number | "...")[] = [1];
  if (page > 3) pages.push("...");
  for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) {
    if (!pages.includes(i)) pages.push(i);
  }
  if (page < totalPages - 2) pages.push("...");
  if (!pages.includes(totalPages)) pages.push(totalPages);

  return (
    <div className="bg-[var(--neutral-50)] rounded-xl overflow-hidden border border-[var(--neutral-200)]">
      <div className="p-4 border-b border-[var(--neutral-100)]">
        <span className="text-sm font-medium text-[var(--neutral-700)]">Pagination — Click to navigate</span>
      </div>
      <div className="bg-white m-4 rounded-lg border border-[var(--neutral-100)]">
        <div className="flex items-center justify-between px-4 py-3">
          <p className="text-sm text-[var(--neutral-500)]">Showing page {page} of {totalPages} (115 total)</p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className={`p-2 rounded-lg transition-colors ${page === 1 ? "text-[var(--neutral-300)] cursor-not-allowed" : "text-[var(--neutral-600)] hover:bg-[var(--neutral-100)]"}`}
            >
              &larr;
            </button>
            {pages.map((p, i) =>
              p === "..." ? (
                <span key={`e${i}`} className="px-2 text-[var(--neutral-400)]">...</span>
              ) : (
                <button
                  key={p}
                  onClick={() => setPage(p as number)}
                  className={`min-w-[32px] h-8 px-2 rounded-lg text-sm font-medium transition-colors ${p === page ? "bg-[var(--brand-primary)] text-white" : "text-[var(--neutral-600)] hover:bg-[var(--neutral-100)]"}`}
                >
                  {p}
                </button>
              )
            )}
            <button
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className={`p-2 rounded-lg transition-colors ${page === totalPages ? "text-[var(--neutral-300)] cursor-not-allowed" : "text-[var(--neutral-600)] hover:bg-[var(--neutral-100)]"}`}
            >
              &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
