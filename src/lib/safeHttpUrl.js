/**
 * Returns the string if it is a safe http(s) URL for use in href; otherwise null.
 * Blocks javascript:, data:, etc.
 * @param {string | undefined} raw
 * @returns {string | null}
 */
export function safeHttpUrl(raw) {
  if (typeof raw !== "string") return null;
  const trimmed = raw.trim();
  if (!trimmed) return null;
  try {
    const u = new URL(trimmed);
    if (u.protocol === "https:" || u.protocol === "http:") return trimmed;
  } catch {
    /* invalid URL */
  }
  return null;
}
