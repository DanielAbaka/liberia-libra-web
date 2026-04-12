/**
 * POSTs contact form fields to a Google Apps Script web app that appends a row to your Sheet.
 * Uses URL-encoded body to avoid CORS preflight issues with script.google.com.
 *
 * Env (Vite): VITE_GOOGLE_SHEETS_WEBAPP_URL = deployment URL ending in /exec
 * Optional: VITE_CONTACT_FORM_SECRET = must match EXPECTED_SECRET in the Apps Script
 */

/**
 * @param {{ name: string, email: string, phone: string, message: string }} fields
 * @returns {Promise<{ ok: true } | { ok: false, error: string }>}
 */
export async function submitContactToSheet(fields) {
  const url = import.meta.env.VITE_GOOGLE_SHEETS_WEBAPP_URL;
  if (typeof url !== "string" || !url.trim()) {
    return { ok: false, error: "not_configured" };
  }

  const params = new URLSearchParams();
  params.set("name", fields.name);
  params.set("email", fields.email);
  params.set("phone", fields.phone);
  params.set("message", fields.message);

  const secret = import.meta.env.VITE_CONTACT_FORM_SECRET;
  if (typeof secret === "string" && secret.length > 0) {
    params.set("secret", secret);
  }

  try {
    const res = await fetch(url.trim(), {
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
