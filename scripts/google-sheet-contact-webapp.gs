/**
 * GOOGLE SHEETS + APPS SCRIPT — CONTACT FORM
 * --------------------------------------------
 * 1. Create a new Google Sheet. Row 1 headers (exact order):
 *    Timestamp | Name | Email | Phone | Message
 * 2. Extensions → Apps Script → paste this file → Save.
 * 3. Set EXPECTED_SECRET below to a long random string, OR leave '' to disable the check
 *    (not recommended for public sites — use Script Properties instead for production).
 * 4. Deploy → New deployment → Type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Copy the Web app URL (ends with /exec) into your site .env:
 *    VITE_GOOGLE_SHEETS_WEBAPP_URL=https://script.google.com/macros/s/.../exec
 *    VITE_CONTACT_FORM_SECRET=same_as_EXPECTED_SECRET_if_used
 * 6. Redeploy the script after edits (Manage deployments → Edit → Version: New).
 */

var EXPECTED_SECRET = ""; // e.g. "paste-a-long-random-string"; leave "" to skip check

function doPost(e) {
  try {
    var lock = LockService.getScriptLock();
    if (!lock.tryLock(15000)) {
      return jsonOut({ ok: false, error: "busy" });
    }
    try {
      var p = e.parameter || {};

      if (EXPECTED_SECRET && String(p.secret || "") !== EXPECTED_SECRET) {
        return jsonOut({ ok: false, error: "forbidden" });
      }

      var name = trimLimit(p.name, 500);
      var email = trimLimit(p.email, 320);
      var phone = trimLimit(p.phone, 80);
      var message = trimLimit(p.message, 8000);

      if (!name || !email) {
        return jsonOut({ ok: false, error: "validation" });
      }

      var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
      sheet.appendRow([new Date(), name, email, phone, message]);

      return jsonOut({ ok: true });
    } finally {
      lock.releaseLock();
    }
  } catch (err) {
    return jsonOut({ ok: false, error: "server" });
  }
}

function trimLimit(s, max) {
  s = String(s || "").trim();
  return s.length > max ? s.substring(0, max) : s;
}

function jsonOut(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
