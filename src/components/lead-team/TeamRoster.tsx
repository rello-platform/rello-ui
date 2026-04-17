"use client";

import * as React from "react";
import { cn } from "../../lib/cn";
import { TeamMemberCard } from "./TeamMemberCard";
import type { TeamCopyOverride, TeamMember, TeamRosterVariant } from "./types";

export interface TeamRosterProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  roster: TeamMember[];
  copyOverride?: TeamCopyOverride;
  variant?: TeamRosterVariant;
  /** Heading rendered above the list. Pass null to suppress. */
  heading?: string | null;
}

export function TeamRoster({
  roster,
  copyOverride,
  variant = "full",
  heading = "Your home buying team",
  className,
  ...props
}: TeamRosterProps) {
  if (roster.length === 0) return null;

  const gap = variant === "header" ? "gap-3" : "gap-5";
  const dividers = variant === "full";

  return (
    <div className={cn("flex flex-col", gap, className)} {...props}>
      {heading ? (
        <h2 className="font-semibold text-[var(--neutral-900)]">{heading}</h2>
      ) : null}
      <div className={cn("flex flex-col", gap)}>
        {roster.map((member, i) => (
          <div
            key={`${member.role}-${member.email ?? i}`}
            className={cn(
              dividers && i < roster.length - 1
                ? "pb-5 border-b border-[var(--neutral-100)]"
                : null,
            )}
          >
            <TeamMemberCard
              member={member}
              copyOverride={copyOverride}
              variant={variant}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
