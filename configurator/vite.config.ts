import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@rello-ui": path.resolve(__dirname, "../src"),
    },
  },
  server: {
    port: 5180,
    proxy: {
      "/api": "http://localhost:3001",
    },
  },
});
