import { Router } from "express";
import { fetchFile, commitFiles } from "../lib/github.js";

export const appOverrideRoutes = Router();

appOverrideRoutes.get("/app-overrides", async (_req, res) => {
  try {
    const raw = await fetchFile("tokens/app-overrides.json");
    res.json(JSON.parse(raw));
  } catch (err: unknown) {
    if (err && typeof err === "object" && "status" in err && (err as { status: number }).status === 404) {
      res.json({ defaults: {}, apps: {} });
      return;
    }
    console.error("Failed to fetch app overrides:", err);
    res.status(500).json({ error: "Failed to fetch app overrides" });
  }
});

appOverrideRoutes.post("/app-overrides/commit", async (req, res) => {
  try {
    const { overrides, message } = req.body as { overrides: unknown; message?: string };
    if (!overrides) {
      res.status(400).json({ error: "Missing overrides in request body" });
      return;
    }
    const content = JSON.stringify(overrides, null, 2) + "\n";
    const result = await commitFiles(
      [{ path: "tokens/app-overrides.json", content }],
      message || "Update app color overrides via Configurator"
    );
    res.json({ success: true, sha: result.sha, url: result.url });
  } catch (err) {
    console.error("Failed to commit app overrides:", err);
    res.status(500).json({ error: "Failed to commit app overrides" });
  }
});
