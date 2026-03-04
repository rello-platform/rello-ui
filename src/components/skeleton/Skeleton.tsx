"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

/* ==========================================
   SKELETON BASE
   ========================================== */

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Shimmer animation duration in ms (default 1800) */
  shimmerDuration?: number;
  /** Base color (default "var(--neutral-100)") */
  baseColor?: string;
  /** Highlight color (default "var(--neutral-50)") */
  highlightColor?: string;
  /** Width — CSS value (default "100%") */
  width?: string | number;
  /** Height — CSS value (default "1rem") */
  height?: string | number;
  /** Border radius — CSS value (default "0.25rem") */
  radius?: string | number;
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      className,
      shimmerDuration = 1800,
      baseColor,
      highlightColor,
      width,
      height,
      radius,
      style,
      ...props
    },
    ref,
  ) => {
    const base = baseColor ?? "var(--neutral-200, #E1E4E8)";
    const highlight = highlightColor ?? "var(--neutral-50, #FAFBFC)";

    return (
      <div
        ref={ref}
        className={cn("animate-[skeleton-shimmer_var(--skeleton-duration)_infinite_ease-in-out]", className)}
        style={{
          width: width ?? "100%",
          height: height ?? "1rem",
          borderRadius: radius ?? "0.25rem",
          background: `linear-gradient(90deg, ${base} 25%, ${highlight} 50%, ${base} 75%)`,
          backgroundSize: "200% 100%",
          animationDuration: `${shimmerDuration}ms`,
          animationName: "skeleton-shimmer",
          ...style,
        }}
        {...props}
      />
    );
  },
);
Skeleton.displayName = "Skeleton";

/* ==========================================
   SKELETON CIRCLE (avatar placeholder)
   ========================================== */

export interface SkeletonCircleProps extends Omit<SkeletonProps, "width" | "height" | "radius"> {
  /** Diameter in pixels (default 40) */
  size?: number;
}

const SkeletonCircle = React.forwardRef<HTMLDivElement, SkeletonCircleProps>(
  ({ size = 40, ...props }, ref) => (
    <Skeleton ref={ref} width={size} height={size} radius="9999px" {...props} />
  ),
);
SkeletonCircle.displayName = "SkeletonCircle";

/* ==========================================
   SKELETON TEXT (multi-line text block)
   ========================================== */

export interface SkeletonTextProps extends Omit<SkeletonProps, "width" | "height"> {
  /** Number of text lines (default 3) */
  lines?: number;
  /** Line height in px (default 12) */
  lineHeight?: number;
  /** Gap between lines in px (default 8) */
  gap?: number;
  /** Width of the last line as percentage (default 60) */
  lastLineWidth?: number;
}

const SkeletonText = React.forwardRef<HTMLDivElement, SkeletonTextProps>(
  ({ lines = 3, lineHeight = 12, gap = 8, lastLineWidth = 60, className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col", className)} style={{ gap }}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          height={lineHeight}
          width={i === lines - 1 ? `${lastLineWidth}%` : "100%"}
          {...props}
        />
      ))}
    </div>
  ),
);
SkeletonText.displayName = "SkeletonText";

/* ==========================================
   GLOBAL KEYFRAMES STYLE
   Injected once via a hidden <style> tag
   ========================================== */

let injected = false;

export function SkeletonStyles() {
  React.useEffect(() => {
    if (injected || typeof document === "undefined") return;
    injected = true;
    const style = document.createElement("style");
    style.textContent = `@keyframes skeleton-shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }`;
    document.head.appendChild(style);
    return () => {
      // Don't remove on unmount — the keyframe should persist
    };
  }, []);
  return null;
}

export { Skeleton, SkeletonCircle, SkeletonText };
