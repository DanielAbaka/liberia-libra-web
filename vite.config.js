import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // Only use a subpath when building in GitHub Actions. If VITE_BASE_PATH is set in your
  // shell from testing Pages, local dev would otherwise load scripts from the wrong URL → blank page.
  base:
    process.env.GITHUB_ACTIONS === "true"
      ? process.env.VITE_BASE_PATH || "/"
      : "/",
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
  },
});
