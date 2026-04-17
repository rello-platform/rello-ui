import type { AgentRole, TeamCopy, TeamCopyOverride, TeamRole } from "./types";

/**
 * Default lead-facing copy per display role.
 * Tenant overrides merge over these via `getTeamCopy(role, override)`.
 */
export const DEFAULT_TEAM_COPY: Record<TeamRole, TeamCopy> = {
  LOAN_OFFICER: {
    title: "{firstName}, your loan officer",
    shortTitle: "Your loan officer",
    bio: "{firstName} specializes in helping people just like you get mortgage-ready. When it\u2019s time to pull the trigger on pre-approval, {firstName} will make the process painless.",
  },
  REAL_ESTATE_AGENT: {
    title: "{firstName}, your amazing real estate agent",
    shortTitle: "Your real estate agent",
    bio: "{firstName} will be with you from day one \u2014 helping you explore neighborhoods, understand the market, and find the perfect home when you\u2019re ready.",
  },
  MANAGING_BROKER: {
    title: "{firstName}, your managing broker",
    shortTitle: "Your managing broker",
    bio: "{firstName} oversees your team and is here to make sure your home-buying experience runs smoothly from start to finish.",
  },
  SMART_ASSISTANT: {
    title: "Milo, your smart assistant",
    shortTitle: "Smart assistant",
    bio: "He\u2019s small, blue, and weirdly passionate about helping you get into a home. Milo never sleeps, never forgets, and somehow makes budgeting feel less painful. We\u2019d promote him but he\u2019s already running the place.",
  },
};

/**
 * Resolve display copy for a role, merging tenant override over defaults.
 * Pure function — no I/O. Caller passes a tenant-scoped override map.
 */
export function getTeamCopy(role: TeamRole, override?: TeamCopyOverride): TeamCopy {
  const def = DEFAULT_TEAM_COPY[role];
  const o = override?.[role];
  if (!o) return def;
  return {
    title: o.title ?? def.title,
    shortTitle: o.shortTitle ?? def.shortTitle,
    bio: o.bio ?? def.bio,
  };
}

const AGENT_ROLE_TO_TEAM_ROLE: Record<AgentRole, TeamRole> = {
  AGENT: "REAL_ESTATE_AGENT",
  MLO: "LOAN_OFFICER",
  BROKER: "MANAGING_BROKER",
};

/** Map a Prisma `Agent.role` enum value to the shared `TeamRole` catalog key. */
export function agentRoleToTeamRole(role: AgentRole): TeamRole {
  return AGENT_ROLE_TO_TEAM_ROLE[role];
}

/** Replace {firstName} / {lastName} tokens in a copy template. */
export function formatCopy(template: string, firstName: string, lastName: string): string {
  return template.replace(/\{firstName\}/g, firstName).replace(/\{lastName\}/g, lastName);
}
