import path from "path";

/**
 * Path-traversal guards for the Configurator asset routes (SECURITY AUDIT PKG-M1).
 *
 * `folder`/`fileName`/`path` arrive straight from the request body. The GitHub
 * Contents API normalizes `..` segments, so an un-validated `folder` of
 * `../../src/styles` (with an allowed image extension on `fileName`) writes
 * outside `assets/` into the published package. We reject any segment that can
 * escape, then re-assert the POSIX-normalized final path is still under
 * `assets/` before any GitHub call.
 */

const FORBIDDEN = /(\.\.|\0|\\)/; // parent-dir, NUL byte, backslash

export class UnsafePathError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UnsafePathError";
  }
}

function assertSegmentSafe(label: string, value: string): void {
  if (typeof value !== "string" || value.length === 0) {
    throw new UnsafePathError(`${label} is required`);
  }
  if (FORBIDDEN.test(value)) {
    throw new UnsafePathError(`${label} contains an illegal sequence (.., NUL, or backslash)`);
  }
  if (value.startsWith("/")) {
    throw new UnsafePathError(`${label} must not be absolute`);
  }
}

/**
 * Build and validate an `assets/<folder>/<fileName>` write path.
 * Throws UnsafePathError if the inputs could escape `assets/`.
 */
export function buildSafeAssetPath(folder: string, fileName: string): string {
  assertSegmentSafe("folder", folder);
  assertSegmentSafe("fileName", fileName);

  const candidate = `assets/${folder}/${fileName}`;
  // POSIX-normalize and confirm the result is still under assets/.
  const normalized = path.posix.normalize(candidate);
  if (normalized !== candidate || !isUnderAssets(normalized)) {
    throw new UnsafePathError("Resolved path escapes the assets/ directory");
  }
  return normalized;
}

/**
 * Validate a caller-supplied asset path (delete route). Must already be under
 * `assets/` AND normalize to itself (no `..`/`.` segments that the GitHub API
 * would collapse).
 */
export function assertSafeAssetPath(p: string): string {
  if (typeof p !== "string" || p.length === 0) {
    throw new UnsafePathError("path is required");
  }
  if (FORBIDDEN.test(p) || p.startsWith("/")) {
    throw new UnsafePathError("path contains an illegal sequence or is absolute");
  }
  const normalized = path.posix.normalize(p);
  if (normalized !== p || !isUnderAssets(normalized)) {
    throw new UnsafePathError("path must be a normalized location under assets/");
  }
  return normalized;
}

function isUnderAssets(normalized: string): boolean {
  return normalized === "assets" || normalized.startsWith("assets/");
}
