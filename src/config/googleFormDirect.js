/**
 * Custom Contact fields → Google Forms backend (Responses tab can link to a Sheet).
 * POSTs to …/formResponse with entry.XXXXX field names (fetch mode: "no-cors").
 *
 * ---------------------------------------------------------------------------
 * SETUP — Part A: Find your form ID and set `actionUrl`
 * ---------------------------------------------------------------------------
 * 1. Sign in to the Google account that owns the form.
 * 2. Open the public form link (short link works), e.g. https://forms.gle/xxxx
 *    Wait for the page to load; the address bar should change to a long URL.
 * 3. Look at the address bar. You need this shape:
 *    https://docs.google.com/forms/d/e/THIS_LONG_STRING_IS_YOUR_FORM_ID/viewform
 *    Copy only the middle part (between /e/ and /viewform) — that is the form ID.
 * 4. In this file, set:
 *    actionUrl: "https://docs.google.com/forms/d/e/PASTE_FORM_ID_HERE/formResponse"
 *    Rules:
 *    - Must end with exactly `/formResponse` (not `/viewform`).
 *    - Use `https://` — no spaces before or after the URL.
 *
 * ---------------------------------------------------------------------------
 * SETUP — Part B: Find each question’s `entry.########` and fill `entries`
 * ---------------------------------------------------------------------------
 * Google does not show entry IDs on the normal form page; use “Get pre-filled link”.
 *
 * 5. While editing the form in Google Forms (forms.google.com), open your form.
 * 6. Top-right: click the three dots **⋮** (More) → **Get pre-filled link**.
 * 7. A preview opens with your questions. For each field that maps to this site:
 *    - Name  → type any test text (e.g. "Test Name")
 *    - Email → type a test email
 *    - Phone → type a test phone
 *    - Message → type a test message
 *    (If your form has different or extra questions, match them in code later.)
 * 8. Click **Get link** (or **Copy link**). You get a very long URL.
 * 9. Paste that URL into a text editor or the address bar. Find query parameters like:
 *    ...?entry.1234567890=Test+Name&entry.9876543210=test%40email.com&...
 *    Each `entry.NNNNNNNNNN` is the ID for one question, in the same order you filled.
 * 10. Map them into this object (use the exact strings, including `entry.`):
 *     entries.name    → the entry.* for your “Name” question
 *     entries.email   → the entry.* for your “Email” question
 *     entries.phone   → the entry.* for your “Phone” question
 *     entries.message → the entry.* for your “Message” question
 * 11. Save the file. Run the site and submit the contact form once; check **Responses**
 *     in Google Forms (or the linked Sheet). If a column is wrong, swap entry IDs.
 *
 * ---------------------------------------------------------------------------
 * Notes
 * ---------------------------------------------------------------------------
 * - If `actionUrl`, `entries.name`, `entries.email`, and `entries.message` are set,
 *   the Contact page uses this path instead of Apps Script (see ContactPage.jsx).
 * - Optional `entries.phone`: leave "" if the Google form has no Phone field; the site
 *   still collects phone and appends it under the message body.
 * - `no-cors` means the browser cannot read Google’s response; we assume success
 *   if the request does not throw.
 * - Duplicate questions in the form (e.g. two “Email” fields) each have their own
 *   entry.* — use the one that matches the field you want.
 */

export const GOOGLE_FORM_DIRECT_POST = {
  actionUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLSd5i4Pfd8QU4HCgQVUyNZw1LwehwmWUsZz0L7Offxkym4nXNA/formResponse",
  entries: {
    name: "entry.222194705",
    email: "entry.1614693902",
    phone: "entry.214850024",
    message: "entry.255019433",
  },
};

function isEntryId(v) {
  return typeof v === "string" && v.startsWith("entry.");
}

export function isGoogleFormDirectConfigured() {
  const { actionUrl, entries } = GOOGLE_FORM_DIRECT_POST;
  if (typeof actionUrl !== "string" || !actionUrl.includes("/formResponse")) return false;
  if (!isEntryId(entries.name) || !isEntryId(entries.email) || !isEntryId(entries.message)) {
    return false;
  }
  if (entries.phone && !isEntryId(entries.phone)) return false;
  return true;
}

/**
 * @param {{ name: string, email: string, phone: string, message: string }} fields
 */
export async function submitGoogleFormDirect(fields) {
  const { actionUrl, entries } = GOOGLE_FORM_DIRECT_POST;
  const fd = new FormData();
  fd.set(entries.name, fields.name);
  fd.set(entries.email, fields.email);
  if (isEntryId(entries.phone)) {
    fd.set(entries.phone, fields.phone);
  }
  let messageBody = fields.message;
  if (!isEntryId(entries.phone) && String(fields.phone || "").trim()) {
    messageBody = `${fields.message}\n\nPhone: ${fields.phone.trim()}`;
  }
  fd.set(entries.message, messageBody);
  await fetch(actionUrl, {
    method: "POST",
    body: fd,
    mode: "no-cors",
  });
  return { ok: true };
}
