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
assetRoutes.get("/assets/file/*", async (req, res) => {
  try {
    const octokit = getOctokit();
    const filePath = (req.params as unknown as Record<string, string>)["0"];

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

// Upload an asset — expects JSON with base64 content
assetRoutes.post("/assets/upload", async (req, res) => {
  try {
    const { folder, fileName, content, message } = req.body as {
      folder: string; // e.g. "logos/home-ready" or "milo"
      fileName: string;
      content: string; // base64 encoded file content
      message?: string;
    };

    if (!folder || !fileName || !content) {
      res.status(400).json({ error: "Missing folder, fileName, or content" });
      return;
    }

    const ext = fileName.split(".").pop()?.toLowerCase() || "";
    const allowed = ["svg", "png", "webp", "jpg", "jpeg"];
    if (!allowed.includes(ext)) {
      res.status(400).json({ error: `File type .${ext} not allowed. Use: ${allowed.join(", ")}` });
      return;
    }

    const filePath = `assets/${folder}/${fileName}`;
    const commitMessage = message || `Add ${fileName} to ${folder} via Configurator`;

    const octokit = getOctokit();

    // Check if file already exists (to get its SHA for overwrite)
    let existingSha: string | undefined;
    try {
      const { data } = await octokit.rest.repos.getContent({ owner, repo, path: filePath, ref: branch });
      if ("sha" in data) existingSha = data.sha;
    } catch {
      // File doesn't exist yet — that's fine
    }

    // Use Contents API — handles binary files correctly
    const { data: result } = await octokit.rest.repos.createOrUpdateFileContents({
      owner, repo, branch,
      path: filePath,
      message: commitMessage,
      content, // already base64
      ...(existingSha ? { sha: existingSha } : {}),
    });

    res.json({ success: true, path: filePath, sha: result.commit.sha });
  } catch (err) {
    console.error("Failed to upload asset:", err);
    res.status(500).json({ error: "Failed to upload asset" });
  }
});

// Delete an asset
assetRoutes.post("/assets/delete", async (req, res) => {
  try {
    const { path, message } = req.body as { path: string; message?: string };
    if (!path || !path.startsWith("assets/")) {
      res.status(400).json({ error: "Invalid asset path" });
      return;
    }

    const octokit = getOctokit();

    // Get the file's SHA first
    const { data } = await octokit.rest.repos.getContent({ owner, repo, path, ref: branch });
    if (!("sha" in data)) {
      res.status(404).json({ error: "File not found" });
      return;
    }

    await octokit.rest.repos.deleteFile({
      owner, repo, path,
      message: message || `Delete ${path.split("/").pop()} via Configurator`,
      sha: data.sha,
      branch,
    });

    res.json({ success: true });
  } catch (err) {
    console.error("Failed to delete asset:", err);
    res.status(500).json({ error: "Failed to delete asset" });
  }
});
