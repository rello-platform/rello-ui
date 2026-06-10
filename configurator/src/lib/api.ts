import { getOperatorSecret } from "./operator-secret";

/**
 * Write-request helpers that attach the operator secret header required by the
 * Configurator server's auth gate (SECURITY AUDIT PKG-H1).
 *
 * `MissingSecretError` is thrown when no secret is present so callers can prompt
 * the operator instead of firing an unauthenticated request that would 401.
 */

export class MissingSecretError extends Error {
  constructor() {
    super("Operator secret required to commit. Enter it to continue.");
    this.name = "MissingSecretError";
  }
}

function authHeaders(): Record<string, string> {
  const secret = getOperatorSecret();
  if (!secret) throw new MissingSecretError();
  return { "x-configurator-secret": secret };
}

/** POST a JSON body to a write endpoint with the operator secret attached. */
export async function postJson(url: string, body: unknown): Promise<Response> {
  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(body),
  });
}
