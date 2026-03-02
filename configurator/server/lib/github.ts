import { Octokit } from "octokit";

const owner = process.env.GITHUB_OWNER || "kellydavidsansom";
const repo = process.env.GITHUB_REPO || "rello-ui";
const branch = process.env.GITHUB_BRANCH || "main";

function getOctokit() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error("GITHUB_TOKEN environment variable is required");
  return new Octokit({ auth: token });
}

export async function fetchFile(path: string): Promise<string> {
  const octokit = getOctokit();
  const { data } = await octokit.rest.repos.getContent({ owner, repo, path, ref: branch });
  if ("content" in data && data.encoding === "base64") {
    return Buffer.from(data.content, "base64").toString("utf-8");
  }
  throw new Error(`Could not read file: ${path}`);
}

export async function commitFiles(
  files: Array<{ path: string; content: string }>,
  message: string
): Promise<{ sha: string; url: string }> {
  const octokit = getOctokit();

  // Get the current commit SHA for the branch
  const { data: ref } = await octokit.rest.git.getRef({ owner, repo, ref: `heads/${branch}` });
  const baseSha = ref.object.sha;

  // Get the tree SHA of the current commit
  const { data: baseCommit } = await octokit.rest.git.getCommit({ owner, repo, commit_sha: baseSha });
  const baseTreeSha = baseCommit.tree.sha;

  // Create blobs for each file
  const blobs = await Promise.all(
    files.map(async (f) => {
      const { data: blob } = await octokit.rest.git.createBlob({
        owner, repo,
        content: Buffer.from(f.content).toString("base64"),
        encoding: "base64",
      });
      return { path: f.path, mode: "100644" as const, type: "blob" as const, sha: blob.sha };
    })
  );

  // Create a new tree
  const { data: newTree } = await octokit.rest.git.createTree({
    owner, repo,
    base_tree: baseTreeSha,
    tree: blobs,
  });

  // Create a new commit
  const { data: newCommit } = await octokit.rest.git.createCommit({
    owner, repo,
    message,
    tree: newTree.sha,
    parents: [baseSha],
  });

  // Update the branch reference
  await octokit.rest.git.updateRef({
    owner, repo,
    ref: `heads/${branch}`,
    sha: newCommit.sha,
  });

  return { sha: newCommit.sha, url: newCommit.html_url };
}
