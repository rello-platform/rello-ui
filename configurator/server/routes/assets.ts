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

assetRoutes.get("/assets", async (_req, res) => {
  try {
    const octokit = getOctokit();

    // Get the full tree recursively
    const { data: ref } = await octokit.rest.git.getRef({ owner, repo, ref: `heads/${branch}` });
    const { data: tree } = await octokit.rest.git.getTree({ owner, repo, tree_sha: ref.object.sha, recursive: "true" });

    // Filter to assets/ directory, only files
    const assetFiles = tree.tree
      .filter((f) => f.path?.startsWith("assets/") && f.type === "blob")
      .map((f) => {
        const path = f.path!;
        const parts = path.split("/");
        const fileName = parts[parts.length - 1];
        const ext = fileName.split(".").pop()?.toLowerCase() || "";
        const isImage = ["svg", "png", "webp", "jpg", "jpeg", "ico"].includes(ext);

        // Build raw GitHub URL for images
        const rawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path}`;

        return {
          path,
          fileName,
          ext,
          isImage,
          rawUrl,
          category: parts[1] || "unknown", // logos or milo
          subcategory: parts.length > 3 ? parts[2] : null, // rello, home-ready, etc.
        };
      });

    res.json({ files: assetFiles });
  } catch (err) {
    console.error("Failed to fetch assets:", err);
    res.status(500).json({ error: "Failed to fetch assets" });
  }
});
