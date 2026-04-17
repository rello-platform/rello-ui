/**
 * Lead-team component barrel (client-bundle surface).
 *
 * Exports React components only. The pure-function helpers
 * (`DEFAULT_TEAM_COPY`, `agentRoleToTeamRole`, `formatCopy`, `getTeamCopy`)
 * live at `./catalog` and are re-exported from the server-safe root
 * entry `src/index.ts` — NOT from this barrel. Keeping value exports
 * out of the `/client` surface prevents a class of foot-gun where a
 * server component imports a pure util from `@rello-platform/ui/client`
 * and hits the client-reference-proxy crash the Option-D split fixed.
 *
 * Types are type-erased at build; re-exporting them here is free and
 * lets component consumers at `/client` type their props cleanly.
 *
 * See DISCOVERED-RELLO-UI-RUNTIME-IMPORT-FAILURE-ON-RAILWAY-041726.
 */

export type {
  AgentRole,
  TeamCopy,
  TeamCopyOverride,
  TeamMember,
  TeamRole,
  TeamRosterVariant,
} from "./types";

export { TeamMemberCard, type TeamMemberCardProps } from "./TeamMemberCard";
export { TeamRoster, type TeamRosterProps } from "./TeamRoster";
