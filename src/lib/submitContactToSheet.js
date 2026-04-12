/**
 * POSTs contact form fields to a Google Apps Script web app that appends a row to your Sheet.
 * Uses URL-encoded body to avoid CORS preflight issues with script.google.com.
 *
 * URL resolution (first match wins):
 * 1) VITE_GOOGLE_SHEETS_WEBAPP_URL (Vite embed)
 * 2) window.__LL_CONTACT_SHEETS__ from index.html (vite.config inject — reliable on GitHub Pages)
 * 3) contact-sheet-config.json fetch (CI-written; may 404 → HTML on some hosts, so we validate JSON shape)
 *
 * Optional secret: VITE_CONTACT_FORM_SECRET, window config, or formSecret in JSON.
 */

function readWindowContactConfig() {
  if (typeof window === "undefined") return null;
  const raw = window["__LL_CONTACT_SHEETS__"];
  if (!raw || typeof raw !== "object") return null;
  const o = /** @type {Record<string, unknown>} */ (raw);
  if (typeof o.webAppUrl !== "string" || !o.webAppUrl.trim()) return null;
  return o;
}

/** @type {Promise<Record<string, unknown> | null> | null} */
let runtimeConfigPromise = null;

function getRuntimeConfig() {
  if (runtimeConfigPromise == null) {
    runtimeConfigPromise = (async () => {
      try {
        const baseRaw = import.meta.env.BASE_URL || "/";
        const base = baseRaw.endsWith("/") ? baseRaw : `${baseRaw}/`;
        const res = await fetch(`${base}contact-sheet-config.json`, { cache: "no-store" });
        if (!res.ok) return null;
        const text = await res.text();
        const t = text.trimStart();
        if (!t.startsWith("{")) return null;
        const j = JSON.parse(text);
        return j && typeof j === "object" ? j : null;
      } catch {
        return null;
      }
    })();
  }
  return runtimeConfigPromise;
}

/**
 * @param {{ name: string, email: string, phone: string, message: string }} fields
 * @returns {Promise<{ ok: true } | { ok: false, error: string }>}
 */
function normalizeSheetsWebAppUrl(raw) {
  let s = String(raw || "").trim();
  const wronglyPasted = "VITE_GOOGLE_SHEETS_WEBAPP_URL=";
  if (s.startsWith(wronglyPasted)) s = s.slice(wronglyPasted.length).trim();
  return s;
}

async function resolveWebAppUrl() {
  const fromEnv = normalizeSheetsWebAppUrl(import.meta.env.VITE_GOOGLE_SHEETS_WEBAPP_URL);
  if (fromEnv) return fromEnv;
  const win = readWindowContactConfig();
  if (win) return normalizeSheetsWebAppUrl(String(win.webAppUrl));
  const cfg = await getRuntimeConfig();
  return normalizeSheetsWebAppUrl(cfg?.webAppUrl);
}

async function resolveFormSecret() {
  const e = import.meta.env.VITE_CONTACT_FORM_SECRET;
  if (typeof e === "string" && e.trim()) return e.trim();
  const win = readWindowContactConfig();
  const ws = win?.formSecret;
  if (typeof ws === "string" && ws.trim()) return ws.trim();
  const cfg = await getRuntimeConfig();
  const s = cfg?.formSecret;
  return typeof s === "string" && s.trim() ? s.trim() : "";
}

export async function submitContactToSheet(fields) {
  const url = await resolveWebAppUrl();
  if (!url) {
    return { ok: false, error: "not_configured" };
  }

  const params = new URLSearchParams();
  params.set("name", fields.name);
  params.set("email", fields.email);
  params.set("phone", fields.phone);
  params.set("message", fields.message);

  const secret = await resolveFormSecret();
  if (secret) {
    params.set("secret", secret);
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
      body: params.toString(),
    });

    const text = await res.text();
    let data = null;
    try {
      data = JSON.parse(text);
    } catch {
      /* Apps Script sometimes returns HTML error pages */
    }

    if (data && data.ok === true) {
      return { ok: true };
    }
    if (data && data.error === "forbidden") {
      return { ok: false, error: "forbidden" };
    }
    if (data && data.error === "validation") {
      return { ok: false, error: "validation" };
    }
    if (!res.ok) {
      return { ok: false, error: "network" };
    }
    return { ok: false, error: "unknown" };
  } catch {
    return { ok: false, error: "network" };
  }
}
