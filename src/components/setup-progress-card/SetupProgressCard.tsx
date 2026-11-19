"use client";

import * as React from "react";
import { Check } from "iconoir-react";
import { cn } from "../../lib/cn";

export interface SetupProgressStep {
  /** Stable id (the React key). */
  id: string;
  /** What to set up. */
  label: string;
  /** Where in the app the data is saved. */
  where: string;
  /** What makes it count as done, in plain words. */
  rule: string;
  /** Read from saved data by the spoke. Only `true` counts. Never set by a click here. */
  done: boolean;
  /** Link to where the data is saved. */
  href: string;
}

export interface SetupProgressCardProps {
  title: string;
  steps: SetupProgressStep[];
  /** A smaller card (e.g. on a home page): the step list without the where/rule lines. */
  compact?: boolean;
  /** Render nothing once every step is done. Default true. */
  hideWhenComplete?: boolean;
  /** The progress line. Defaults to "N of M done". */
  progressText?: (done: number, total: number) => string;
  /** Accessible name of a done step's mark. Defaults to "done". */
  doneLabel?: string;
  /** Accessible name of a not-done step's mark. Defaults to "not done". */
  notDoneLabel?: string;
  className?: string;
}

const defaultProgressText = (done: number, total: number) => `${done} of ${total} done`;

/**
 * "Get set up N of M" (PFP GATEWAY D58–D60). There is deliberately NO toggle or onCheck prop (Kelly, K-750): a step
 * is done only when the spoke reads its data saved in its place. Each step is a link to that place; its mark is a
 * status (role="img"), never a control.
 */
function SetupProgressCard({
  title,
  steps,
  compact = false,
  hideWhenComplete = true,
  progressText = defaultProgressText,
  doneLabel = "done",
  notDoneLabel = "not done",
  className,
}: SetupProgressCardProps) {
  const titleId = React.useId();
  const list = Array.isArray(steps) ? steps : [];
  const total = list.length;
  const done = list.filter((s) => s.done === true).length;
  if (hideWhenComplete && done === total) return null;
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);

  return (
    <section
      aria-labelledby={titleId}
      data-compact={compact ? "true" : undefined}
      className={cn("w-full min-w-0 rounded-2xl border", compact ? "p-4" : "p-5", className)}
      style={{
        backgroundColor: "var(--card-background, #FFFFFF)",
        borderColor: "var(--card-border, #D1D5DB)",
        color: "var(--foreground, #2D3339)",
      }}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <h3 id={titleId} className={cn("m-0 font-bold", compact ? "text-base" : "text-lg")}>
          {title}
        </h3>
        <p aria-live="polite" className="m-0 text-sm font-semibold" style={{ color: "var(--neutral-700, #434B52)" }}>
          {progressText(done, total)}
        </p>
      </div>
      <div
        role="progressbar"
        aria-labelledby={titleId}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={done}
        className="mt-3 h-2 w-full overflow-hidden rounded-full"
        style={{ backgroundColor: "var(--neutral-200, #BCC3CA)" }}
      >
        <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: "var(--success, #6B9080)" }} />
      </div>
      <ul className={cn("m-0 mt-2 grid list-none grid-cols-1 p-0", compact ? "" : "md:grid-cols-2 md:gap-x-7")}>
        {list.map((step, i) => {
          const isDone = step.done === true;
          return (
            <li
              key={step.id || `step-${i}`}
              data-done={isDone ? "true" : "false"}
              className="flex min-w-0 items-start gap-3 border-b py-3"
              style={{ borderColor: "var(--neutral-100, #D1D5DB)" }}
            >
              <span
                role="img"
                aria-label={isDone ? doneLabel : notDoneLabel}
                data-setup-mark=""
                className="mt-2 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2"
                style={
                  isDone
                    ? { backgroundColor: "var(--success, #6B9080)", borderColor: "var(--success, #6B9080)", color: "var(--brand-primary-foreground, #FFFFFF)" }
                    : { backgroundColor: "var(--card-background, #FFFFFF)", borderColor: "var(--neutral-400, #98A1AA)" }
                }
              >
                {isDone ? <Check aria-hidden="true" width={16} height={16} /> : null}
              </span>
              <div className="min-w-0 flex-1">
                <a
                  href={step.href}
                  className={cn(
                    "inline-flex min-h-[44px] max-w-full items-center font-semibold no-underline hover:underline [overflow-wrap:anywhere] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary,#3B5998)] rounded-sm",
                    isDone ? "line-through" : "",
                  )}
                  style={{ color: isDone ? "var(--neutral-600, #525B62)" : "var(--brand-primary, #3B5998)" }}
                >
                  {step.label}
                </a>
                {compact ? null : (
                  <>
                    <p className="m-0 text-sm [overflow-wrap:anywhere]" style={{ color: "var(--neutral-600, #525B62)" }}>
                      {step.where}
                    </p>
                    <p className="m-0 mt-1 text-xs [overflow-wrap:anywhere]" style={{ color: "var(--neutral-500, #646F77)" }}>
                      {step.rule}
                    </p>
                  </>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export { SetupProgressCard };
