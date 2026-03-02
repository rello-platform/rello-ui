import { Router } from "express";
import { fetchFile, commitFiles } from "../lib/github.js";
import { parseCssTokens } from "../lib/parse-css-tokens.js";
import { generateCss } from "../lib/generate-css.js";
import { generateDtcg } from "../lib/generate-dtcg.js";
import { generateFigma } from "../lib/generate-figma.js";
import type { TokenState } from "../../src/types/tokens.js";

export const tokenRoutes = Router();

tokenRoutes.get("/tokens", async (_req, res) => {
  try {
    const css = await fetchFile("src/styles/design-tokens.css");
    const tokens = parseCssTokens(css);
    res.json({ tokens });
  } catch (err) {
    console.error("Failed to fetch tokens:", err);
    res.status(500).json({ error: "Failed to fetch tokens from GitHub" });
  }
});

tokenRoutes.post("/tokens/commit", async (req, res) => {
  try {
    const { tokens, message } = req.body as { tokens: TokenState; message?: string };
    if (!tokens) {
      res.status(400).json({ error: "Missing tokens in request body" });
      return;
    }

    const css = generateCss(tokens);
    const dtcg = generateDtcg(tokens);
    const figma = generateFigma(tokens);

    const commitMessage = message || "Update design tokens via Configurator";
    const result = await commitFiles(
      [
        { path: "src/styles/design-tokens.css", content: css },
        { path: "tokens/tokens.json", content: dtcg },
        { path: "tokens/figma-variables.json", content: figma },
      ],
      commitMessage
    );

    res.json({ success: true, sha: result.sha, url: result.url });
  } catch (err) {
    console.error("Failed to commit tokens:", err);
    res.status(500).json({ error: "Failed to commit changes to GitHub" });
  }
});
