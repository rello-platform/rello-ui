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
 *   anything else           → { status: "error", message? }   (or reject / throw)
 *
 * A rejected or thrown `onConfirm`, or a value that is none of the three, is
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

export type TrialStartResult = TrialStartStarted | TrialStartAlreadyUsed | TrialStartError;
