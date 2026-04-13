/**
 * Normalizes a Google Forms share URL for an iframe (?embedded=true).
 * Accepts https://docs.google.com/forms/.../viewform or short links https://forms.gle/...
 */

export function toGoogleFormEmbedUrl(raw) {
  const s = String(raw || "").trim();
  if (!s) return "";
  try {
    const u = new URL(s);
    const isDocsForm =
      u.hostname.endsWith("docs.google.com") && u.pathname.includes("/forms/");
    const isFormsGle = u.hostname === "forms.gle" || u.hostname.endsWith(".forms.gle");
    if (!isDocsForm && !isFormsGle) return "";
    u.searchParams.set("embedded", "true");
    return u.toString();
  } catch {
    return "";
  }
}

/** Same form, full-page (new tab) — strips embedded mode */
export function toGoogleFormFullPageUrl(embedOrAnyUrl) {
  const s = String(embedOrAnyUrl || "").trim();
  if (!s) return "";
  try {
    const u = new URL(s);
    u.searchParams.delete("embedded");
    return u.toString();
  } catch {
    return "";
  }
}
