import { Router } from "express";
import { fetchFile, commitFiles } from "../lib/github.js";

export const specRoutes = Router();

specRoutes.get("/specs", async (_req, res) => {
  try {
    const raw = await fetchFile("specs/component-specs.json");
    const specs = JSON.parse(raw);
    res.json(specs);
  } catch (err: unknown) {
    // If file doesn't exist yet, return the default structure
    if (err && typeof err === "object" && "status" in err && (err as { status: number }).status === 404) {
      res.json({ components: {} });
      return;
    }
    console.error("Failed to fetch specs:", err);
    res.status(500).json({ error: "Failed to fetch component specs" });
  }
});

specRoutes.post("/specs/commit", async (req, res) => {
  try {
    const { specs, message } = req.body as { specs: unknown; message?: string };
    if (!specs) {
      res.status(400).json({ error: "Missing specs in request body" });
      return;
    }

    const content = JSON.stringify(specs, null, 2) + "\n";
    const commitMessage = message || "Update component specs via Configurator";

    const result = await commitFiles(
      [{ path: "specs/component-specs.json", content }],
      commitMessage
    );

    res.json({ success: true, sha: result.sha, url: result.url });
  } catch (err) {
    console.error("Failed to commit specs:", err);
    res.status(500).json({ error: "Failed to commit specs to GitHub" });
  }
});
