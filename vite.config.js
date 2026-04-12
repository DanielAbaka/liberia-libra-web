import fs from "node:fs";
import path from "node:path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

function pagesBase() {
  return process.env.GITHUB_ACTIONS === "true"
    ? process.env.VITE_BASE_PATH || "/"
    : "/";
}

/**
 * 1) If public/sheets-config.js exists (written in CI before build), inject <script src=…> — runs before the app bundle.
 * 2) Inline window.__LL_CONTACT_SHEETS__ from .env / process.env (local dev + CI backup).
 */
function contactSheetsHeadInjection(mode) {
  return {
    name: "contact-sheets-head-injection",
    transformIndexHtml() {
      const tags = [];
      const diskPath = path.join(process.cwd(), "public/sheets-config.js");
      if (fs.existsSync(diskPath)) {
        const base = pagesBase();
        const prefix = base.endsWith("/") ? base : `${base}/`;
        tags.push({
          tag: "script",
          attrs: { src: `${prefix}sheets-config.js` },
          injectTo: "head-prepend",
        });
      }

      const fileEnv = loadEnv(mode, process.cwd(), "");
      const webAppUrl = (
        process.env.VITE_GOOGLE_SHEETS_WEBAPP_URL ||
        fileEnv.VITE_GOOGLE_SHEETS_WEBAPP_URL ||
        ""
      ).trim();
      const formSecret = (
        process.env.VITE_CONTACT_FORM_SECRET ||
        fileEnv.VITE_CONTACT_FORM_SECRET ||
        ""
      ).trim();
      if (webAppUrl) {
        const data = { webAppUrl };
        if (formSecret) data.formSecret = formSecret;
        const serialized = JSON.stringify(data).replace(/</g, "\\u003c");
        tags.push({
          tag: "script",
          children: `window.__LL_CONTACT_SHEETS__=${serialized}`,
          injectTo: "head-prepend",
        });
      }
      return tags;
    },
  };
}

export default defineConfig(({ mode }) => ({
  // Only use a subpath when building in GitHub Actions. If VITE_BASE_PATH is set in your
  // shell from testing Pages, local dev would otherwise load scripts from the wrong URL → blank page.
  base: pagesBase(),
  plugins: [react(), tailwindcss(), contactSheetsHeadInjection(mode)],
  build: {
    /** No `.map` files in production — avoids exposing original source structure. */
    sourcemap: false,
  },
  server: {
    port: 3000,
  },
}));
