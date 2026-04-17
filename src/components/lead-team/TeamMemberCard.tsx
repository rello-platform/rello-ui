"use client";

import * as React from "react";
import { Phone, Mail } from "iconoir-react";
import { cn } from "../../lib/cn";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar/Avatar";
import { formatCopy, getTeamCopy } from "./catalog";
import type { TeamCopyOverride, TeamMember, TeamRosterVariant } from "./types";

export interface TeamMemberCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  member: TeamMember;
  copyOverride?: TeamCopyOverride;
  variant?: TeamRosterVariant;
}

export function TeamMemberCard({
  member,
  copyOverride,
  variant = "full",
  className,
  ...props
}: TeamMemberCardProps) {
  const copy = getTeamCopy(member.role, copyOverride);
  const fullName = `${member.firstName} ${member.lastName}`.trim();
  const initials = (
    member.avatarInitials ??
    `${member.firstName[0] ?? ""}${member.lastName[0] ?? ""}`
  ).toUpperCase();
  const title = formatCopy(copy.title, member.firstName, member.lastName);
  const shortTitle = copy.shortTitle;
  const bio = member.bio ?? formatCopy(copy.bio, member.firstName, member.lastName);

  if (variant === "header") {
    return (
      <div className={cn("flex items-center gap-3", className)} {...props}>
        <Avatar size="sm">
          {member.photoUrl ? <AvatarImage src={member.photoUrl} alt={fullName} /> : null}
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm text-[var(--neutral-900)] truncate">{fullName}</p>
          {member.brokerageLogoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={member.brokerageLogoUrl}
              alt={member.brokerage ?? "Brokerage"}
              className="h-4 mt-0.5 max-w-[120px] object-contain object-left"
            />
          ) : member.brokerage ? (
            <p className="text-[var(--neutral-500)] text-xs truncate">{member.brokerage}</p>
          ) : (
            <p className="text-[var(--neutral-500)] text-xs truncate">{shortTitle}</p>
          )}
        </div>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div
        className={cn(
          "flex items-start gap-3 p-3 rounded-lg bg-[var(--neutral-50)]",
          className,
        )}
        {...props}
      >
        <Avatar size="md">
          {member.photoUrl ? <AvatarImage src={member.photoUrl} alt={fullName} /> : null}
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-[var(--neutral-900)]">{fullName}</p>
          <p className="text-xs text-[var(--neutral-500)]">{shortTitle}</p>
          {member.brokerage ? (
            <p className="text-xs text-[var(--neutral-400)]">{member.brokerage}</p>
          ) : null}
          {member.showContactRow ? (
            <ContactRow phone={member.phone} email={member.email} className="mt-2" />
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex items-start gap-4", className)} {...props}>
      <Avatar size="lg">
        {member.photoUrl ? <AvatarImage src={member.photoUrl} alt={fullName} /> : null}
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      <div className="space-y-1 flex-1 min-w-0">
        <p className="font-semibold text-[var(--neutral-900)]">{title}</p>
        <p className="text-sm text-[var(--neutral-600)] leading-relaxed">{bio}</p>
        {member.brokerageLogoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={member.brokerageLogoUrl}
            alt={member.brokerage ?? "Brokerage"}
            className="h-5 mt-1 max-w-[120px] object-contain object-left"
          />
        ) : member.brokerage ? (
          <p className="text-xs text-[var(--neutral-500)]">{member.brokerage}</p>
        ) : null}
        {member.showContactRow ? (
          <ContactRow phone={member.phone} email={member.email} className="pt-1" />
        ) : null}
      </div>
    </div>
  );
}

function ContactRow({
  phone,
  email,
  className,
}: {
  phone: string | null;
  email: string | null;
  className?: string;
}) {
  if (!phone && !email) return null;
  return (
    <div className={cn("flex flex-wrap gap-4", className)}>
      {phone ? (
        <a
          href={`tel:${phone}`}
          className="inline-flex items-center gap-1.5 text-sm text-[var(--neutral-600)] hover:text-[var(--brand-primary)]"
        >
          <Phone width={16} height={16} />
          {phone}
        </a>
      ) : null}
      {email ? (
        <a
          href={`mailto:${email}`}
          className="inline-flex items-center gap-1.5 text-sm text-[var(--neutral-600)] hover:text-[var(--brand-primary)]"
        >
          <Mail width={16} height={16} />
          {email}
        </a>
      ) : null}
    </div>
  );
}
