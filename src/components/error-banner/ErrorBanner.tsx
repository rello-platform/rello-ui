"use client";

import * as React from "react";
import { WarningCircle } from "iconoir-react";
import { Button } from "../button/Button";
import { cn } from "../../lib/cn";

export interface ErrorBannerProps extends React.HTMLAttributes<HTMLDivElement> {
  message?: string;
  headline?: string;
  onRetry?: () => void;
  reason?: string;
  retryLabel?: string;
}

function ErrorBanner({
  message,
  headline = "Couldn't load this content",
  onRetry,
  reason,
  retryLabel = "Retry",
  className,
  ...props
}: ErrorBannerProps) {
  const isRetryMode = typeof onRetry === "function";
  const bodyText = isRetryMode ? message : reason ?? message;

  return (
    <div
      role="alert"
      className={cn(
        "rounded-lg border p-4 mb-4 flex flex-col sm:flex-row sm:items-center gap-3",
        className,
      )}
      style={{
        borderColor: "var(--error, #dc2626)",
        backgroundColor: "color-mix(in srgb, var(--error, #dc2626) 8%, transparent)",
      }}
      {...props}
    >
      <div className="flex items-start gap-2 flex-1">
        <WarningCircle
          width={18}
          height={18}
          style={{ color: "var(--error, #dc2626)", flexShrink: 0, marginTop: 2 }}
        />
        <div>
          <p className="text-sm font-medium" style={{ color: "var(--error, #dc2626)" }}>
            {headline}
          </p>
          {bodyText && (
            <p className="text-xs mt-1" style={{ color: "var(--neutral-700, #374151)" }}>
              {bodyText}
            </p>
          )}
        </div>
      </div>
      {isRetryMode && (
        <Button
          variant="secondary"
          size="sm"
          onClick={onRetry}
          aria-label={`${retryLabel} loading`}
        >
          {retryLabel}
        </Button>
      )}
    </div>
  );
}

export { ErrorBanner };
