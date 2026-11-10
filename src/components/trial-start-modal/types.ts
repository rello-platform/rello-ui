/**
 * Trial-start outcome contract for `<TrialStartModal>`. Pure types,
 * server-safe (root entry).
 *
 * The modal is transport-agnostic: it never calls Rello. The spoke's
 * `onConfirm` calls Rello's `POST /api/v1/billing/trial-start` and maps the
 * response to one of these:
 *
 *   2xx                     → { status: "started", trialEndsAt }
 *   409 (one trial per tenant lifetime) → { status: "already-used", trialEndsAt: <existing end> }
 *   a known refusal         → { status: "error", message? }   (or reject / throw)
 *   an outcome nobody knows → { status: "unknown", message? }  (v2.39.0)
 *
 * "unknown" is for a request that may or may not have started the trial: the
 * response was lost or timed out, a gateway 5xx, or Rello said it could not
 * tell. The modal says "We couldn't confirm whether your trial started." and
 * offers "Check my plan", which calls `onConfirm` again: the spoke should read
 * the tenant's plan FIRST on that call and post a new start only when the plan
 * says the tenant is definitely not entitled (the platform's send rule: after
 * an unknown outcome, read the provider's record before any retry).
 *
 * A rejected or thrown `onConfirm`, or a value that is none of the four, is
 * shown as the error state with a retry. It is never shown as a success.
 */

export type TrialStartEndsAt = Date | string | number | null | undefined;

export interface TrialStartStarted {
  status: "started";
  /** New trial end, when Rello returns it. Missing/unreadable → the date sentence is omitted. */
  trialEndsAt?: TrialStartEndsAt;
}

export interface TrialStartAlreadyUsed {
  status: "already-used";
  /** The EXISTING trial's end date from the 409 body. Missing/unreadable → the date sentence is omitted. */
  trialEndsAt?: TrialStartEndsAt;
}

export interface TrialStartError {
  status: "error";
  /** Shown after "We couldn't start your trial." Defaults to a connection hint. */
  message?: string;
}

export interface TrialStartUnknown {
  status: "unknown";
  /** Shown after "We couldn't confirm whether your trial started." Defaults to a check-your-plan hint. */
  message?: string;
}

export type TrialStartResult = TrialStartStarted | TrialStartAlreadyUsed | TrialStartError | TrialStartUnknown;
