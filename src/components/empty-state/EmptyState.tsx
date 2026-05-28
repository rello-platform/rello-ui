"use client";

import * as React from "react";
import { cn } from "../../lib/cn";
import { Button } from "../button/Button";

type EmptyStateActionWithOnClick = {
  label: string;
  onClick: () => void;
  href?: never;
};

type EmptyStateActionWithHref = {
  label: string;
  href: string;
  onClick?: never;
};

export type EmptyStateAction =
  | EmptyStateActionWithOnClick
  | EmptyStateActionWithHref;

export type EmptyStateLinkProps = {
  href: string;
  className?: string;
  children: React.ReactNode;
};

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: EmptyStateAction;
  /**
   * Optional component used to render the action when `action.href` is set.
   * Default = native `<a>`. Pass a spoke's router-aware link (e.g. Next.js
   * `Link` or PFP's subdomain-aware `AppLink`) to preserve client-side
   * navigation + middle-click affordance.
   */
  linkAs?: React.ComponentType<EmptyStateLinkProps>;
  className?: string;
}

function EmptyState({
  icon,
  title,
  description,
  action,
  linkAs,
  className,
}: EmptyStateProps) {
  const LinkComp = linkAs;
  return (
    <div
      role="status"
      className={cn(
        "flex flex-col items-center justify-center py-12 px-4 text-center",
        className,
      )}
    >
      {icon && (
        <div className="size-16 rounded-full bg-[var(--neutral-100,#F3F4F6)] flex items-center justify-center mb-4">
          <div className="text-[var(--neutral-400,#9CA3AF)]">{icon}</div>
        </div>
      )}
      <h3 className="text-lg font-semibold text-[var(--foreground,#111827)] mb-1">
        {title}
      </h3>
      {description && (
        <p className="text-sm text-[var(--neutral-500,#6B7280)] max-w-sm mb-4">
          {description}
        </p>
      )}
      {action && action.href ? (
        <Button asChild>
          {LinkComp ? (
            <LinkComp href={action.href}>{action.label}</LinkComp>
          ) : (
            <a href={action.href}>{action.label}</a>
          )}
        </Button>
      ) : action ? (
        <Button onClick={action.onClick}>{action.label}</Button>
      ) : null}
    </div>
  );
}

export { EmptyState };
