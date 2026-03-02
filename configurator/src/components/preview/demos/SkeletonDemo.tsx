import { useState } from "react";

interface SkeletonDemoProps {
  params: { shimmerDuration?: number; baseColor?: string; highlightColor?: string };
}

export function SkeletonDemo({ params }: SkeletonDemoProps) {
  const [loading, setLoading] = useState(true);
  const shimmerDuration = params.shimmerDuration ?? 1800;
  const baseColor = params.baseColor ?? "#E1E4E8";
  const highlightColor = params.highlightColor ?? "#FAFBFC";

  return (
    <div className="bg-[var(--neutral-50)] rounded-xl overflow-hidden border border-[var(--neutral-200)]">
      <div className="p-4 border-b border-[var(--neutral-100)] flex items-center justify-between">
        <span className="text-sm font-medium text-[var(--neutral-700)]">Skeleton Loader Preview</span>
        <button
          onClick={() => setLoading(!loading)}
          className="px-3 py-1.5 text-xs rounded-md bg-[var(--brand-primary)] text-white font-medium hover:opacity-90 transition-opacity"
        >
          {loading ? "Show Content" : "Show Skeleton"}
        </button>
      </div>
      <div className="p-4">
        <style>{`
          @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
          .skeleton-shimmer {
            background: linear-gradient(90deg, ${baseColor} 25%, ${highlightColor} 50%, ${baseColor} 75%);
            background-size: 200% 100%;
            animation: shimmer ${shimmerDuration}ms infinite ease-in-out;
          }
        `}</style>

        {loading ? (
          <div className="space-y-4">
            {/* Card skeleton */}
            <div className="bg-white rounded-lg border border-[var(--neutral-100)] p-4">
              <div className="flex items-start gap-3">
                <div className="skeleton-shimmer size-10 rounded-full shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="skeleton-shimmer h-4 rounded w-1/3" />
                  <div className="skeleton-shimmer h-3 rounded w-2/3" />
                </div>
                <div className="skeleton-shimmer h-5 w-16 rounded-full" />
              </div>
              <div className="mt-3 space-y-2">
                <div className="skeleton-shimmer h-3 rounded w-full" />
                <div className="skeleton-shimmer h-3 rounded w-4/5" />
              </div>
            </div>
            {/* Table skeleton */}
            <div className="bg-white rounded-lg border border-[var(--neutral-100)] overflow-hidden">
              <div className="p-3 border-b border-[var(--neutral-100)] flex gap-4">
                <div className="skeleton-shimmer h-3 rounded w-24" />
                <div className="skeleton-shimmer h-3 rounded w-32" />
                <div className="skeleton-shimmer h-3 rounded w-16" />
                <div className="skeleton-shimmer h-3 rounded w-12" />
              </div>
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-3 border-b border-[var(--neutral-100)] last:border-0 flex gap-4 items-center">
                  <div className="skeleton-shimmer size-8 rounded-full shrink-0" />
                  <div className="skeleton-shimmer h-3 rounded w-28" />
                  <div className="skeleton-shimmer h-3 rounded w-36" />
                  <div className="skeleton-shimmer h-5 w-16 rounded-full" />
                  <div className="skeleton-shimmer h-3 rounded w-10 ml-auto" />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4" style={{ animation: "stagger-in 300ms ease-out both" }}>
            <style>{`@keyframes stagger-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }`}</style>
            <div className="bg-white rounded-lg border border-[var(--neutral-100)] p-4">
              <div className="flex items-start gap-3">
                <div className="size-10 rounded-full bg-[var(--brand-primary-light)] flex items-center justify-center text-sm font-medium text-[var(--brand-primary)]">SJ</div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-[var(--foreground)]">Sarah Johnson</p>
                  <p className="text-xs text-[var(--neutral-500)]">sarah@example.com</p>
                </div>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full bg-[var(--hot-light)] text-[var(--hot)]">Hot</span>
              </div>
              <p className="mt-3 text-xs text-[var(--neutral-500)]">Last contacted 2 hours ago. Score: 92/100. Ready to close.</p>
            </div>
            <div className="bg-white rounded-lg border border-[var(--neutral-100)] p-3 text-center">
              <p className="text-sm text-[var(--neutral-600)]">Real content loaded</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
