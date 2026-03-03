import { Router } from "express";
import { Octokit } from "octokit";

const owner = process.env.GITHUB_OWNER || "kellydavidsansom";
const repo = process.env.GITHUB_REPO || "rello-ui";
const branch = process.env.GITHUB_BRANCH || "main";

function getOctokit() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error("GITHUB_TOKEN required");
  return new Octokit({ auth: token });
}

export const assetRoutes = Router();

// List all assets
assetRoutes.get("/assets", async (_req, res) => {
  try {
    const octokit = getOctokit();
    const { data: ref } = await octokit.rest.git.getRef({ owner, repo, ref: `heads/${branch}` });
    const { data: tree } = await octokit.rest.git.getTree({ owner, repo, tree_sha: ref.object.sha, recursive: "true" });

    const assetFiles = tree.tree
      .filter((f) => f.path?.startsWith("assets/") && f.type === "blob")
      .map((f) => {
        const path = f.path!;
        const parts = path.split("/");
        const fileName = parts[parts.length - 1];
        const ext = fileName.split(".").pop()?.toLowerCase() || "";
        const isImage = ["svg", "png", "webp", "jpg", "jpeg", "ico"].includes(ext);

        return {
          path,
          fileName,
          ext,
          isImage,
          // Proxy through our server instead of raw GitHub (private repo)
          rawUrl: `/api/assets/file/${encodeURIComponent(path)}`,
          category: parts[1] || "unknown",
          subcategory: parts.length > 3 ? parts[2] : null,
        };
      });

    res.json({ files: assetFiles });
  } catch (err) {
    console.error("Failed to fetch assets:", err);
    res.status(500).json({ error: "Failed to fetch assets" });
  }
});

// Proxy individual asset files from private repo
assetRoutes.get("/assets/file/:path(*)", async (req, res) => {
  try {
    const octokit = getOctokit();
    const filePath = req.params.path;

    const { data } = await octokit.rest.repos.getContent({ owner, repo, path: filePath, ref: branch });

    if (!("content" in data) || !data.encoding) {
      res.status(404).json({ error: "File not found" });
      return;
    }

    const buffer = Buffer.from(data.content, "base64");
    const ext = filePath.split(".").pop()?.toLowerCase() || "";

    const mimeTypes: Record<string, string> = {
      svg: "image/svg+xml",
      png: "image/png",
      webp: "image/webp",
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      ico: "image/x-icon",
    };

    res.setHeader("Content-Type", mimeTypes[ext] || "application/octet-stream");
    res.setHeader("Cache-Control", "public, max-age=3600");
    res.send(buffer);
  } catch (err) {
    console.error("Failed to fetch asset file:", err);
    res.status(500).json({ error: "Failed to fetch asset" });
  }
});
