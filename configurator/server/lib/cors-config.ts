import type { CorsOptions, CorsOptionsDelegate } from "cors";
import type { Request } from "express";

/**
 * Explicit CORS allowlist for the Configurator server (SECURITY AUDIT PKG-H1).
 *
 * The previous `app.use(cors())` echoed any Origin and enabled wildcard
 * cross-origin access, letting a drive-by request from any web origin an
 * operator visits hit the (now authenticated) write endpoints. The
 * Configurator UI is served same-origin in production, so cross-origin access
 * is only needed for local dev (Vite dev server on a different port).
 *
 * Allowed origins resolve from `CONFIGURATOR_ALLOWED_ORIGINS` (comma-separated)
 * plus a small set of localhost dev defaults, plus — structurally — the
 * request's OWN origin. Browsers send an `Origin` header on every CORS-mode
 * request even when it is same-origin: `<script type="module" crossorigin>`,
 * `<link crossorigin>`, and all `fetch()` calls (whose default mode is
 * "cors"). An allowlist that ignores this 403s the deployed SPA's own JS/CSS
 * bundle and API reads, blanking the page (prod outage 2026-06-11). Same-origin
 * is decided per-request against `Host` + `X-Forwarded-Proto` (Railway proxy;
 * `trust proxy` is set in index.ts), so no env var has to restate the deploy
 * URL. A forged Origin matching Host gains nothing: non-browser clients are
 * never CORS-constrained anyway, and writes are auth-gated regardless.
 */

const LOCALHOST_DEV_DEFAULTS = [
  "http://localhost:5180", // configurator Vite dev port (vite.config.ts)
  "http://localhost:5173", // Vite default dev port (fallback)
  "http://localhost:3001", // configurator server default port
  "http://127.0.0.1:5180",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:3001",
];

export function getAllowedOrigins(): string[] {
  const fromEnv = (process.env.CONFIGURATOR_ALLOWED_ORIGINS || "")
    .split(",")
    .map((o) => o.trim())
    .filter((o) => o.length > 0);
  // In production, prefer the explicit allowlist; in dev, fold in localhost.
  if (process.env.NODE_ENV === "production") {
    return fromEnv;
  }
  return [...new Set([...fromEnv, ...LOCALHOST_DEV_DEFAULTS])];
}

/**
 * True when the request's Origin header points back at this server — i.e. the
 * browser is loading the configurator's own assets / calling its own API.
 * Compares against `${req.protocol}://${Host}`; `req.protocol` honors
 * `X-Forwarded-Proto` because index.ts sets `trust proxy`.
 */
export function isSameOrigin(req: Request, origin: string): boolean {
  const host = req.headers.host;
  if (!host) {
    return false;
  }
  return origin.toLowerCase() === `${req.protocol}://${host}`.toLowerCase();
}

export function buildCorsOptionsDelegate(): CorsOptionsDelegate<Request> {
  const allowed = getAllowedOrigins();
  const base: Omit<CorsOptions, "origin"> = {
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "x-configurator-secret"],
    methods: ["GET", "POST", "OPTIONS"],
  };
  return (req, callback) => {
    const origin = req.headers.origin;
    // No Origin header ⇒ not a CORS-constrained client (curl, server-to-server,
    // non-CORS-mode browser loads). Allow; writes are still auth-gated.
    if (!origin || isSameOrigin(req, origin) || allowed.includes(origin)) {
      callback(null, { ...base, origin: true });
      return;
    }
    callback(new Error(`Origin ${origin} is not allowed by Configurator CORS policy`));
  };
}
