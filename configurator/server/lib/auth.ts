import { timingSafeEqual } from "crypto";
import type { Request, Response, NextFunction } from "express";

/**
 * Operator-auth gate for every write endpoint in the Configurator server.
 *
 * The Configurator commits arbitrary content directly to the `rello-ui` repo
 * `main` branch via the server's GITHUB_TOKEN. `@rello-platform/ui` is consumed
 * by every Rello frontend, so an unauthenticated write endpoint is a
 * supply-chain write primitive (SECURITY AUDIT PKG-H1). Every mutating route
 * MUST sit behind this middleware.
 *
 * Auth shape: a shared operator secret supplied by the caller as either
 *   - `x-configurator-secret: <secret>`, or
 *   - `Authorization: Bearer <secret>`
 * compared in constant time against `process.env.CONFIGURATOR_SECRET`.
 *
 * Fail-closed: if `CONFIGURATOR_SECRET` is unset the gate returns 503 and NO
 * write is possible — a misconfigured deploy is locked down, not wide open.
 */

function extractProvidedSecret(req: Request): string | null {
  const headerSecret = req.header("x-configurator-secret");
  if (typeof headerSecret === "string" && headerSecret.length > 0) {
    return headerSecret;
  }
  const auth = req.header("authorization");
  if (typeof auth === "string" && auth.startsWith("Bearer ")) {
    const token = auth.slice("Bearer ".length).trim();
    if (token.length > 0) return token;
  }
  return null;
}

/** Constant-time string compare that does not leak length via early return. */
function secretsMatch(provided: string, expected: string): boolean {
  const a = Buffer.from(provided, "utf-8");
  const b = Buffer.from(expected, "utf-8");
  // timingSafeEqual requires equal-length buffers; hash-free length guard via a
  // fixed-size compare so a length mismatch still costs a comparison.
  if (a.length !== b.length) {
    // Compare expected against itself to keep timing uniform, then fail.
    timingSafeEqual(b, b);
    return false;
  }
  return timingSafeEqual(a, b);
}

export function requireOperator(req: Request, res: Response, next: NextFunction): void {
  const expected = process.env.CONFIGURATOR_SECRET;
  if (!expected || expected.length === 0) {
    // Fail-closed: no secret configured ⇒ no writes. Never default-open.
    console.error(
      "[configurator] CONFIGURATOR_SECRET is not set — refusing write request to %s",
      req.originalUrl
    );
    res.status(503).json({
      error:
        "Configurator write auth is not configured (CONFIGURATOR_SECRET unset). Writes are disabled.",
    });
    return;
  }

  const provided = extractProvidedSecret(req);
  if (!provided) {
    res.status(401).json({
      error:
        "Missing operator secret. Send 'x-configurator-secret' header or 'Authorization: Bearer <secret>'.",
    });
    return;
  }

  if (!secretsMatch(provided, expected)) {
    console.error("[configurator] Rejected write request with invalid secret to %s", req.originalUrl);
    res.status(401).json({ error: "Invalid operator secret." });
    return;
  }

  next();
}
