/**
 * Professional Track — Course pre-enrollment → Google Forms (`…/formResponse`, `no-cors`).
 *
 * Published link may use `/forms/d/1vl3oRHnvT3XF_d405QkoFuZGaRl-JGkMJcA88m-w-F4/viewform` (redirects to `/d/e/…`).
 *
 * Fields (order): Program, Course, Full name, Email, Phone, Message.
 */

export const GOOGLE_FORM_PROFESSIONAL_ENROLLMENT = {
  actionUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLSd6GGXLYRo5V1vVQXHo2osagdfyQJxyp5GQRwpBI6nzmY71pA/formResponse",
  entries: {
    program: "entry.947810546",
    course: "entry.353251713",
    fullName: "entry.1299772928",
    email: "entry.1817748786",
    phone: "entry.2135375622",
    message: "entry.1913697547",
  },
};

function isEntryId(v) {
  return typeof v === "string" && v.startsWith("entry.");
}

export function isGoogleProfessionalEnrollmentConfigured() {
  const { actionUrl, entries } = GOOGLE_FORM_PROFESSIONAL_ENROLLMENT;
  if (typeof actionUrl !== "string" || !actionUrl.includes("/formResponse")) return false;
  const required = [
    entries.program,
    entries.course,
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
 *   course: string,
 *   fullName: string,
 *   email: string,
 *   phone: string,
 *   message: string,
 * }} fields
 */
export async function submitGoogleProfessionalEnrollmentDirect(fields) {
  const { actionUrl, entries } = GOOGLE_FORM_PROFESSIONAL_ENROLLMENT;
  const fd = new FormData();
  fd.set(entries.program, fields.program);
  fd.set(entries.course, fields.course);
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
