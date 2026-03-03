import { Router } from "express";
import { fetchFile, commitFiles } from "../lib/github.js";

export const appLayoutRoutes = Router();

appLayoutRoutes.get("/app-layouts", async (_req, res) => {
  try {
    const raw = await fetchFile("specs/app-layouts.json");
    res.json(JSON.parse(raw));
  } catch (err: unknown) {
    if (err && typeof err === "object" && "status" in err && (err as { status: number }).status === 404) {
      res.json({ apps: {} });
      return;
    }
    console.error("Failed to fetch app layouts:", err);
    res.status(500).json({ error: "Failed to fetch app layouts" });
  }
});

appLayoutRoutes.post("/app-layouts/commit", async (req, res) => {
  try {
    const { layouts, message } = req.body as { layouts: unknown; message?: string };
    if (!layouts) { res.status(400).json({ error: "Missing layouts" }); return; }
    const content = JSON.stringify(layouts, null, 2) + "\n";
    const result = await commitFiles(
      [{ path: "specs/app-layouts.json", content }],
      message || "Update app layouts via Configurator"
    );
    res.json({ success: true, sha: result.sha, url: result.url });
  } catch (err) {
    console.error("Failed to commit app layouts:", err);
    res.status(500).json({ error: "Failed to commit app layouts" });
  }
});
