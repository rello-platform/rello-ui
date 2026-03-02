import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { tokenRoutes } from "./routes/tokens.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(cors());
app.use(express.json());

// API routes
app.use("/api", tokenRoutes);

// In production, serve the Vite-built frontend
if (process.env.NODE_ENV === "production") {
  const distPath = path.join(__dirname, "../dist");
  app.use(express.static(distPath));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Configurator API running on port ${port}`);
});
