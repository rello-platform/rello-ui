import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { tokenRoutes } from "./routes/tokens.js";
import { specRoutes } from "./routes/specs.js";
import { appOverrideRoutes } from "./routes/app-overrides.js";
import { assetRoutes } from "./routes/assets.js";
import { appLayoutRoutes } from "./routes/app-layouts.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));

// API routes
app.use("/api", tokenRoutes);
app.use("/api", specRoutes);
app.use("/api", appOverrideRoutes);
app.use("/api", assetRoutes);
app.use("/api", appLayoutRoutes);

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
