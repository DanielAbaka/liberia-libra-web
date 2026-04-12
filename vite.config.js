import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

/** Injects Sheets web app URL into HTML so production works without a separate JSON fetch (avoids GH Pages SPA/404 serving HTML instead of JSON). */
function contactSheetsHeadInjection(mode) {
  return {
    name: "contact-sheets-head-injection",
    transformIndexHtml() {
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
      if (!webAppUrl) return [];
      const data = { webAppUrl };
      if (formSecret) data.formSecret = formSecret;
      const serialized = JSON.stringify(data).replace(/</g, "\\u003c");
      return [
        {
          tag: "script",
          children: `window.__LL_CONTACT_SHEETS__=${serialized}`,
          injectTo: "head-prepend",
        },
      ];
    },
  };
}

export default defineConfig(({ mode }) => ({
  // Only use a subpath when building in GitHub Actions. If VITE_BASE_PATH is set in your
  // shell from testing Pages, local dev would otherwise load scripts from the wrong URL → blank page.
  base:
    process.env.GITHUB_ACTIONS === "true"
      ? process.env.VITE_BASE_PATH || "/"
      : "/",
  plugins: [react(), tailwindcss(), contactSheetsHeadInjection(mode)],
  build: {
    /** No `.map` files in production — avoids exposing original source structure. */
    sourcemap: false,
  },
  server: {
    port: 3000,
  },
}));
