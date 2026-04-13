/**
 * Scholarship application → Google Forms (`…/formResponse`, `no-cors`).
 *
 * The share id must include the letter **O** before `Q` at the end:
 * `1K1WiNo5Ol6nZGI4-6_SZs6TgO-sKHoCr29hiuVJb0OQ` (not `…Jb0Q`).
 * Short `/forms/d/…/viewform` redirects to `/d/e/1FAIpQLS…/formResponse` below.
 */

export const GOOGLE_FORM_SCHOLARSHIP = {
  actionUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLSc-raSipReB_9Zglfyf95BGjJABI7X_WqQik2lx1ChOIpcPoA/formResponse",
  entries: {
    fullName: "entry.947810546",
    email: "entry.353251713",
    phone: "entry.1299772928",
    dateOfBirth: "entry.1817748786",
    gender: "entry.2135375622",
    county: "entry.1913697547",
    community: "entry.984681220",
    program: "entry.539381921",
    education: "entry.1856079",
    financialNeed: "entry.1691470051",
    whyProgram: "entry.250301817",
  },
};

/** Map `<select value>` → exact Google Form choice text (must match form options). */
export const SCHOLARSHIP_GENDER_FOR_GOOGLE = {
  female: "Female",
  male: "Male",
  "non-binary": "Non-binary",
  "prefer-not": "Prefer not to say",
  "self-describe": "Self-describe (see statement)",
};

export const SCHOLARSHIP_PROGRAM_FOR_GOOGLE = {
  ict: "ICT training",
  vocational: "Vocational (e.g. catering, cosmetology)",
  professional: "Professional development",
  general: "General / not sure yet",
};

export const SCHOLARSHIP_EDUCATION_FOR_GOOGLE = {
  secondary: "Secondary / high school",
  "some-college": "Some college or technical study",
  graduate: "Graduate or professional",
  other: "Other",
};

function isEntryId(v) {
  return typeof v === "string" && v.startsWith("entry.");
}

export function isGoogleScholarshipConfigured() {
  const { actionUrl, entries } = GOOGLE_FORM_SCHOLARSHIP;
  if (typeof actionUrl !== "string" || !actionUrl.includes("/formResponse")) return false;
  const required = [
    entries.fullName,
    entries.email,
    entries.phone,
    entries.gender,
    entries.county,
    entries.community,
    entries.program,
    entries.education,
    entries.financialNeed,
    entries.whyProgram,
  ];
  if (!required.every(isEntryId)) return false;
  if (entries.dateOfBirth && !isEntryId(entries.dateOfBirth)) return false;
  return true;
}

/**
 * @param {{
 *   fullName: string,
 *   email: string,
 *   phone: string,
 *   dateOfBirth: string,
 *   gender: string,
 *   county: string,
 *   community: string,
 *   program: string,
 *   education: string,
 *   financialNeed: string,
 *   whyProgram: string,
 * }} fields — `gender` / `program` / `education` are Google choice labels, not `<option value>` keys.
 */
export async function submitGoogleScholarshipDirect(fields) {
  const { actionUrl, entries } = GOOGLE_FORM_SCHOLARSHIP;
  const fd = new FormData();
  fd.set(entries.fullName, fields.fullName);
  fd.set(entries.email, fields.email);
  fd.set(entries.phone, fields.phone);
  if (isEntryId(entries.dateOfBirth)) {
    fd.set(entries.dateOfBirth, fields.dateOfBirth || "");
  }
  fd.set(entries.gender, fields.gender);
  fd.set(entries.county, fields.county);
  fd.set(entries.community, fields.community);
  fd.set(entries.program, fields.program);
  fd.set(entries.education, fields.education);
  fd.set(entries.financialNeed, fields.financialNeed);
  fd.set(entries.whyProgram, fields.whyProgram);
  await fetch(actionUrl, {
    method: "POST",
    body: fd,
    mode: "no-cors",
  });
  return { ok: true };
}
