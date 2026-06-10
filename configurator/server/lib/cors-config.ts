import type { CorsOptions } from "cors";

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
 * plus a small set of localhost dev defaults. Requests with no Origin header
 * (same-origin browser requests, curl, server-to-server) are allowed — CORS
 * only governs cross-origin browser reads; auth (requireOperator) governs
 * writes regardless of origin.
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

export function buildCorsOptions(): CorsOptions {
  const allowed = getAllowedOrigins();
  return {
    origin(origin, callback) {
      // No Origin header ⇒ not a cross-origin browser request (same-origin
      // fetch, curl, native). Allow; writes are still auth-gated.
      if (!origin) {
        callback(null, true);
        return;
      }
      if (allowed.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error(`Origin ${origin} is not allowed by Configurator CORS policy`));
    },
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "x-configurator-secret"],
    methods: ["GET", "POST", "OPTIONS"],
  };
}
