/**
 * ICT Track — Course pre-enrollment → Google Forms (`…/formResponse`, `no-cors`).
 *
 * The share link may use `/forms/d/199cpPsOVQLfKzamWVb1gg16_W96W21ilysvniBrLVGM/viewform`;
 * submissions must POST to the `/forms/d/e/…/formResponse` URL (resolved long id below).
 *
 * Fields (order): Program, Training level, Training course, Full name, Email, Phone, Message.
 * Entry IDs: from the form HTML embedded question model (or “Get pre-filled link” if Google changes the page).
 */

export const GOOGLE_FORM_ICT_ENROLLMENT = {
  actionUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLSdu9Qi91o8KiQKbPcPFXRiB87KBZQZZQH9SrX_QqxDvihh6zw/formResponse",
  entries: {
    program: "entry.1921371236",
    trainingLevel: "entry.620281169",
    trainingCourse: "entry.139638709",
    fullName: "entry.607094626",
    email: "entry.1155704004",
    phone: "entry.1019640438",
    message: "entry.1533482186",
  },
};

function isEntryId(v) {
  return typeof v === "string" && v.startsWith("entry.");
}

export function isGoogleIctEnrollmentConfigured() {
  const { actionUrl, entries } = GOOGLE_FORM_ICT_ENROLLMENT;
  if (typeof actionUrl !== "string" || !actionUrl.includes("/formResponse")) return false;
  const required = [
    entries.program,
    entries.trainingLevel,
    entries.trainingCourse,
    entries.fullName,
    entries.email,
    entries.message,
  ];
  if (!required.every(isEntryId)) return false;
  if (entries.phone && !isEntryId(entries.phone)) return false;
  return true;
}

/**
 * @param {{
 *   program: string,
 *   trainingLevel: string,
 *   trainingCourse: string,
 *   fullName: string,
 *   email: string,
 *   phone: string,
 *   message: string,
 * }} fields
 */
export async function submitGoogleIctEnrollmentDirect(fields) {
  const { actionUrl, entries } = GOOGLE_FORM_ICT_ENROLLMENT;
  const fd = new FormData();
  fd.set(entries.program, fields.program);
  fd.set(entries.trainingLevel, fields.trainingLevel);
  fd.set(entries.trainingCourse, fields.trainingCourse);
  fd.set(entries.fullName, fields.fullName);
  fd.set(entries.email, fields.email);
  if (isEntryId(entries.phone)) {
    fd.set(entries.phone, fields.phone || "");
  }
  fd.set(entries.message, fields.message.trim());
  await fetch(actionUrl, {
    method: "POST",
    body: fd,
    mode: "no-cors",
  });
  return { ok: true };
}
