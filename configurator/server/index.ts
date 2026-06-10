import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { tokenRoutes } from "./routes/tokens.js";
import { specRoutes } from "./routes/specs.js";
import { appOverrideRoutes } from "./routes/app-overrides.js";
import { assetRoutes } from "./routes/assets.js";
import { appLayoutRoutes } from "./routes/app-layouts.js";
import { buildCorsOptions } from "./lib/cors-config.js";
import { requireOperator } from "./lib/auth.js";
import { rateLimit } from "./lib/rate-limit.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

// Trust the proxy (Railway) so req.ip is the real client for rate limiting.
app.set("trust proxy", 1);

// Explicit CORS allowlist (PKG-H1) — wildcard cors() removed.
app.use(cors(buildCorsOptions()));

// Default JSON body limit lowered to 1mb (PKG-L2). Asset uploads carry base64
// image payloads, so that single route is parsed with a dedicated 8mb limit.
// The default parser SKIPS the asset-upload path so it doesn't reject the
// larger payload at 1mb before the route-specific parser runs.
const defaultJson = express.json({ limit: "1mb" });
const assetUploadJson = express.json({ limit: "8mb" });
app.use((req, res, next) => {
  if (req.method === "POST" && req.path === "/api/assets/upload") {
    next();
    return;
  }
  defaultJson(req, res, next);
});

// Write-route protection (PKG-H1 + PKG-L2): operator auth + rate limit.
// Reads stay open; only mutations are gated.
const writeGuards = [
  rateLimit({ windowMs: 60_000, max: 30 }),
  requireOperator,
];

// Health endpoint for deploy verification (axis-3).
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    commit: process.env.RAILWAY_GIT_COMMIT_SHA || process.env.GIT_COMMIT_SHA || null,
    writeAuthConfigured: Boolean(process.env.CONFIGURATOR_SECRET),
  });
});

// Mount write guards BEFORE the route modules so every POST under these
// prefixes is auth-gated. GET reads on the same routers remain ungated.
app.post(["/api/tokens/commit"], ...writeGuards);
app.post(["/api/specs/commit"], ...writeGuards);
app.post(["/api/app-overrides/commit"], ...writeGuards);
app.post(["/api/app-layouts/commit"], ...writeGuards);
app.post(["/api/assets/upload"], ...writeGuards, assetUploadJson);
// (assetUploadJson parses the body for the upload route; the default 1mb
// parser above skips this path.)
app.post(["/api/assets/delete"], ...writeGuards);

// API routes
app.use("/api", tokenRoutes);
app.use("/api", specRoutes);
app.use("/api", appOverrideRoutes);
app.use("/api", assetRoutes);
app.use("/api", appLayoutRoutes);

// Surface CORS / body-limit / unsafe-path rejections as JSON instead of HTML.
app.use((err: unknown, _req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (res.headersSent) {
    next(err);
    return;
  }
  const message = err instanceof Error ? err.message : "Request rejected";
  console.error("[configurator] request error:", message);
  const status = /not allowed by Configurator CORS/.test(message)
    ? 403
    : /request entity too large/i.test(message)
      ? 413
      : 400;
  res.status(status).json({ error: message });
});

// In production, serve the Vite-built frontend
if (process.env.NODE_ENV === "production") {
  const distPath = path.join(__dirname, "../../dist");
  app.use(express.static(distPath));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Configurator API running on port ${port}`);
});
