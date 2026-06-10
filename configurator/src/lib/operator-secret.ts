/**
 * Operator-secret store for Configurator write requests (SECURITY AUDIT PKG-H1).
 *
 * The Configurator server now requires an operator secret on every write
 * (commit / asset upload / asset delete) endpoint. Rather than baking the
 * secret into the published bundle, the operator enters it once per browser
 * session; it lives in sessionStorage and is attached to write requests via
 * `postJson` / the upload helper. Reads (GET) are unauthenticated and unchanged.
 */

const STORAGE_KEY = "configurator.operatorSecret";

export function getOperatorSecret(): string | null {
  try {
    return sessionStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

export function setOperatorSecret(secret: string): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, secret);
  } catch (err) {
    console.error("Failed to persist operator secret:", err);
  }
}

export function clearOperatorSecret(): void {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error("Failed to clear operator secret:", err);
  }
}

export function hasOperatorSecret(): boolean {
  return Boolean(getOperatorSecret());
}
