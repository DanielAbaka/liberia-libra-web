import { useState } from "react";
import { Link } from "react-router-dom";
import { SCHOLARSHIP_DONORS } from "../data/scholarshipDonors.js";
import { LIBERIA_COUNTIES } from "../data/liberiaCounties.js";
import { publicAsset } from "../lib/publicAsset.js";

const inputClass =
  "mt-1 w-full min-h-11 rounded-xl border border-neutral-200 bg-neutral-50/80 px-3 py-2.5 text-base text-neutral-900 outline-none transition focus:border-[var(--color-ll-accent)] focus:ring-2 focus:ring-[var(--color-ll-accent)]/20 sm:text-sm";

const labelClass = "block text-xs font-medium text-neutral-900 sm:text-sm";

function DonorAvatar({ donor }) {
  const [imgFailed, setImgFailed] = useState(false);
  const showInitials = !donor.photo || imgFailed;
  return showInitials ? (
    <div
      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--color-ll-surface)]/15 to-[var(--color-ll-accent-dim)]/25 font-[family-name:var(--font-display)] text-lg font-bold text-[#1a1a4b]"
      aria-hidden
    >
      {donor.initials}
    </div>
  ) : (
    <img
      src={publicAsset(donor.photo)}
      alt=""
      width={56}
      height={56}
      decoding="async"
      className={
        donor.photoFit === "contain"
          ? "h-14 w-14 shrink-0 rounded-2xl border border-neutral-200/80 bg-white object-contain p-1.5"
          : "h-14 w-14 shrink-0 rounded-2xl object-cover object-top"
      }
      onError={() => setImgFailed(true)}
    />
  );
}

export function ScholarshipPage() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="min-h-[50vh] overflow-x-hidden bg-[var(--color-ll-page)] px-3 py-10 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-[1120px]">
        <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold leading-tight text-[#1a1a4b] min-[400px]:text-3xl sm:text-4xl">
          Scholarships
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-neutral-600 sm:text-base">
          Limited awards help cover training fees and materials for eligible learners.
          Review our supporters below, then submit an application—we review requests in
          the order received and follow up by email or phone.
        </p>
        <div className="mt-6 flex flex-wrap gap-2 sm:mt-8 sm:gap-3">
          <a
            href="#donors"
            className="inline-flex min-h-10 items-center rounded-full border border-neutral-300 bg-white px-4 py-2 text-xs font-semibold text-[#1a1a4b] no-underline transition hover:border-[var(--color-ll-accent)] hover:text-[var(--color-ll-accent)] sm:text-sm"
          >
            Scholarship donors
          </a>
          <a
            href="#apply"
            className="inline-flex min-h-10 items-center rounded-full bg-[var(--color-ll-accent)] px-4 py-2 text-xs font-semibold text-white no-underline shadow-lg shadow-[var(--color-ll-accent)]/30 transition hover:brightness-110 sm:text-sm"
          >
            Apply now
          </a>
          <Link
            to="/training"
            className="inline-flex min-h-10 items-center rounded-full border border-neutral-300 bg-white px-4 py-2 text-xs font-semibold text-[#1a1a4b] no-underline transition hover:border-[var(--color-ll-accent)] sm:text-sm"
          >
            View training tracks
          </Link>
        </div>

        <section
          id="donors"
          className="scroll-mt-24 border-t border-neutral-200/80 pt-12 sm:pt-16"
          aria-labelledby="donors-heading"
        >
          <h2
            id="donors-heading"
            className="font-[family-name:var(--font-display)] text-xl font-bold text-[#1a1a4b] min-[400px]:text-2xl"
          >
            Scholarship donors &amp; partners
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-neutral-600 sm:text-base">
            With heartfelt thanks, we recognize the donors and partners below. Their
            generosity and trust make these awards possible—we are grateful for every
            gift that helps Liberian learners train, grow, and thrive.
          </p>
          <ul className="mt-8 grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {SCHOLARSHIP_DONORS.map((d) => (
              <li
                key={d.id}
                className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-neutral-200/90 bg-white p-5 shadow-card"
              >
                <DonorAvatar donor={d} />
                <h3 className="mt-4 font-[family-name:var(--font-display)] text-base font-semibold leading-snug text-neutral-900">
                  {d.name}
                </h3>
                <p className="mt-1 text-xs font-medium text-[var(--color-ll-accent-dim)]">
                  {d.role}
                </p>
                <p className="mt-3 flex-1 text-xs leading-relaxed text-neutral-600 sm:text-sm">
                  {d.bio}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section
          id="apply"
          className="scroll-mt-24 border-t border-neutral-200/80 pt-12 sm:pt-16"
          aria-labelledby="apply-heading"
        >
          <h2
            id="apply-heading"
            className="font-[family-name:var(--font-display)] text-xl font-bold text-[#1a1a4b] min-[400px]:text-2xl"
          >
            Scholarship application
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-neutral-600 sm:text-base">
            Complete all required fields. Submitting this form does not guarantee an
            award. For questions, email{" "}
            <a
              href="mailto:liberialibrainc@gmail.com?subject=Scholarship%20inquiry"
              className="font-medium text-[var(--color-ll-accent)] hover:underline"
            >
              liberialibrainc@gmail.com
            </a>
            .
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 max-w-2xl rounded-2xl border border-neutral-200/90 bg-white p-4 shadow-card sm:p-6"
          >
            <div className="space-y-3 sm:space-y-4">
              <div>
                <label htmlFor="sch-name" className={labelClass}>
                  Full name *
                </label>
                <input id="sch-name" name="name" required className={inputClass} />
              </div>
              <div className="grid gap-3 min-[480px]:grid-cols-2 min-[480px]:gap-4">
                <div>
                  <label htmlFor="sch-email" className={labelClass}>
                    Email *
                  </label>
                  <input
                    id="sch-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="sch-phone" className={labelClass}>
                    Phone *
                  </label>
                  <input
                    id="sch-phone"
                    name="phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    className={inputClass}
                  />
                </div>
              </div>
              <div className="grid gap-3 min-[480px]:grid-cols-2 min-[480px]:gap-4">
                <div>
                  <label htmlFor="sch-dob" className={labelClass}>
                    Date of birth
                  </label>
                  <input
                    id="sch-dob"
                    name="dateOfBirth"
                    type="date"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="sch-gender" className={labelClass}>
                    Gender *
                  </label>
                  <select
                    id="sch-gender"
                    name="gender"
                    required
                    className={inputClass}
                    defaultValue=""
                    autoComplete="sex"
                  >
                    <option value="" disabled>
                      Select gender
                    </option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                    <option value="non-binary">Non-binary</option>
                    <option value="prefer-not">Prefer not to say</option>
                    <option value="self-describe">Self-describe (see statement)</option>
                  </select>
                </div>
              </div>
              <div className="grid gap-3 min-[480px]:grid-cols-2 min-[480px]:gap-4">
                <div>
                  <label htmlFor="sch-county" className={labelClass}>
                    County of residence *
                  </label>
                  <select
                    id="sch-county"
                    name="county"
                    required
                    className={inputClass}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select county
                    </option>
                    {LIBERIA_COUNTIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="sch-community" className={labelClass}>
                    Community of residence *
                  </label>
                  <input
                    id="sch-community"
                    name="community"
                    type="text"
                    required
                    autoComplete="address-level3"
                    placeholder="e.g. Caldwell, Paynesville, Ganta"
                    className={inputClass}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="sch-track" className={labelClass}>
                  Program of interest *
                </label>
                <select
                  id="sch-track"
                  name="program"
                  required
                  className={inputClass}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select a track
                  </option>
                  <option value="ict">ICT training</option>
                  <option value="vocational">Vocational (e.g. catering, cosmetology)</option>
                  <option value="professional">Professional development</option>
                  <option value="general">General / not sure yet</option>
                </select>
              </div>
              <div>
                <label htmlFor="sch-education" className={labelClass}>
                  Current education level *
                </label>
                <select
                  id="sch-education"
                  name="education"
                  required
                  className={inputClass}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select level
                  </option>
                  <option value="secondary">Secondary / high school</option>
                  <option value="some-college">Some college or technical study</option>
                  <option value="graduate">Graduate or professional</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="sch-need" className={labelClass}>
                  Financial need summary *
                </label>
                <textarea
                  id="sch-need"
                  name="financialNeed"
                  required
                  rows={4}
                  placeholder="Briefly describe your situation and what costs you need help with (fees, materials, etc.)."
                  className={`${inputClass} min-h-[6rem]`}
                />
              </div>
              <div>
                <label htmlFor="sch-statement" className={labelClass}>
                  Why this program? *
                </label>
                <textarea
                  id="sch-statement"
                  name="statement"
                  required
                  rows={5}
                  placeholder="Goals, relevant experience, and how training at Liberia Libra fits your plans."
                  className={`${inputClass} min-h-[7rem]`}
                />
              </div>
            </div>
            {sent ? (
              <p className="mt-4 text-sm text-[var(--color-ll-accent)]" role="status">
                Thank you—your application has been recorded (demo: connect a backend or
                form service to process submissions).
              </p>
            ) : null}
            <button
              type="submit"
              className="mt-6 w-full min-h-11 rounded-xl bg-[var(--color-ll-accent)] py-3 text-sm font-semibold text-white shadow-lg shadow-[var(--color-ll-accent)]/30 transition hover:brightness-110 hover:shadow-xl active:scale-[0.99] sm:w-auto sm:px-8"
            >
              Submit application
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
