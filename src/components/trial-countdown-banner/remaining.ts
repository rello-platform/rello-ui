/**
 * Trial countdown arithmetic. Pure and server-safe (root entry), so a spoke
 * can decide in a server component whether to mount the banner at all, and
 * so the banner's thresholds are tested without a DOM.
 *
 * ANSWERS Q-CS-12: days, then hours inside the last 24 hours, then minutes
 * inside the last hour; the last 48 hours are urgent.
 */

export type TrialEndsAtInput = Date | string | number | null | undefined;

export type TrialTimeUnit = "days" | "hours" | "minutes";

export interface TrialTimeRemaining {
  unit: TrialTimeUnit;
  /** Whole units left, rounded up (a trial with 13.2 days left shows 14). */
  value: number;
  msRemaining: number;
  /** True inside the last 48 hours. */
  isUrgent: boolean;
}

const MINUTE_MS = 60_000;
const HOUR_MS = 60 * MINUTE_MS;
const DAY_MS = 24 * HOUR_MS;
export const TRIAL_URGENT_WINDOW_MS = 48 * HOUR_MS;

/** Epoch ms of the trial end, or null when the input is not a readable instant. */
export function parseTrialEndsAt(trialEndsAt: TrialEndsAtInput): number | null {
  let ms: number;
  if (trialEndsAt instanceof Date) ms = trialEndsAt.getTime();
  else if (typeof trialEndsAt === "number") ms = trialEndsAt;
  else if (typeof trialEndsAt === "string" && trialEndsAt.trim() !== "") ms = Date.parse(trialEndsAt);
  else return null;
  return Number.isFinite(ms) ? ms : null;
}

/**
 * Time left on a trial, or null when there is no trial, the date is
 * unreadable, or the trial has ended.
 */
export function getTrialTimeRemaining(trialEndsAt: TrialEndsAtInput, now: number = Date.now()): TrialTimeRemaining | null {
  const end = parseTrialEndsAt(trialEndsAt);
  if (end === null || !Number.isFinite(now)) return null;
  const msRemaining = end - now;
  if (msRemaining <= 0) return null;
  const isUrgent = msRemaining <= TRIAL_URGENT_WINDOW_MS;
  if (msRemaining >= DAY_MS) return { unit: "days", value: Math.ceil(msRemaining / DAY_MS), msRemaining, isUrgent };
  if (msRemaining >= HOUR_MS) return { unit: "hours", value: Math.ceil(msRemaining / HOUR_MS), msRemaining, isUrgent };
  return { unit: "minutes", value: Math.ceil(msRemaining / MINUTE_MS), msRemaining, isUrgent };
}

const UNIT_SINGULAR: Record<TrialTimeUnit, string> = { days: "day", hours: "hour", minutes: "minute" };

/** "5 days", "1 hour", "12 minutes". */
export function formatTrialTimeRemaining(remaining: TrialTimeRemaining): string {
  return `${remaining.value} ${remaining.value === 1 ? UNIT_SINGULAR[remaining.unit] : remaining.unit}`;
}
