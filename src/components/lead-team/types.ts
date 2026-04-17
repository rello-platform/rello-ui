/**
 * Shared lead-team composition model — see audit
 * DISCOVERED-HR-TEAM-COMPOSITION-MODEL-041626.md
 *
 * Display vocabulary (TeamRole) is intentionally semantic and decoupled from
 * the apps' Prisma `Agent.role` enum (AgentRole). Use `agentRoleToTeamRole`
 * to map between them in each app's `getLeadTeam(leadId)` resolver.
 */

export type TeamRole =
  | "LOAN_OFFICER"
  | "REAL_ESTATE_AGENT"
  | "MANAGING_BROKER"
  | "SMART_ASSISTANT";

/** Mirror of the Prisma `AgentRole` enum used across consumer-facing apps. */
export type AgentRole = "AGENT" | "MLO" | "BROKER";

export interface TeamMember {
  role: TeamRole;
  firstName: string;
  lastName: string;
  photoUrl: string | null;
  /** Override avatar initials. When null, derived from first/last name. */
  avatarInitials?: string | null;
  phone: string | null;
  email: string | null;
  brokerage: string | null;
  brokerageLogoUrl: string | null;
  /** Per-member bio override. Falls back to catalog bio when null. */
  bio: string | null;
  nmlsNumber: string | null;
  licenseNumber: string | null;
  /** Whether to render the phone/email contact row (full + compact variants). */
  showContactRow: boolean;
}

export interface TeamCopy {
  /** Long title with {firstName} / {lastName} tokens. */
  title: string;
  /** Short title for header/compact rows. No tokens. */
  shortTitle: string;
  /** Long bio with {firstName} / {lastName} tokens. */
  bio: string;
}

/** Tenant-scoped per-role copy overrides. Caller resolves for the active tenant. */
export type TeamCopyOverride = Partial<Record<TeamRole, Partial<TeamCopy>>>;

export type TeamRosterVariant = "full" | "compact" | "header";
