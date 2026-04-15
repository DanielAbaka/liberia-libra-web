import { useState } from "react";
import { Link } from "react-router-dom";

/** Optional `photo` / `photoObjectPosition` (Tailwind classes, e.g. `object-[50%_18%]`) */
const TEAM = [
  {
    name: "Daniel Abaka",
    role: "Founder/Executive Director",
    photo: "/team/daniel-abaka.png",
    bio: "Sets strategic direction, stewards the organization's vision, and leads senior partnerships, governance, and long-term growth.",
  },
  {
    name: "Asalyne C. Browne",
    role: "Chief Executive Officer",
    photo: "/team/asalyne-browne.png",
    bio: "Leads executive strategy, organizational performance, and alignment across programs, teams, and external stakeholders.",
  },
  {
    name: "Israel Z. Kollie",
    role: "Chief Technology Officer",
    photo: "/team/israel-z-kollie.png?v=2",
    photoObjectPosition: "object-[50%_12%]",
    bio: "Leads technology strategy, architecture, and engineering across the organization's digital platforms.",
  },
  {
    name: "Tanu J. Kpedebah",
    role: "Chief Operation Officer",
    photo: "/team/tanu-j-kpedebah.png",
    bio: "Oversees day-to-day operations, cross-functional programs, and organizational execution.",
  },
  {
    name: "Peter Barclay",
    role: "Operations Coordinator",
    photo: "/team/peter-barclay.png",
    bio: "Coordinates logistics, vendor relationships, and day-to-day program delivery.",
  },
  {
    name: "Naomi Dweh",
    role: "Administrative Assistant",
    photo: "/team/naomi-dweh.png",
    photoObjectPosition: "object-[50%_18%]",
    bio: "Supports scheduling, records, and day-to-day administrative coordination across teams.",
  },
  {
    name: "Mark D. Wreh",
    role: "Office Technical Assistant",
    photo: "/team/mark-d-wreh.png",
    photoObjectPosition: "object-top",
    bio: "Supports office systems, devices, and day-to-day technical tasks for staff and programs.",
  },
  {
    name: "Francess J. Diah",
    role: "Office Assistant",
    photo: "/team/francess-j-diah.png",
    photoObjectPosition: "object-top",
    bio: "Supports front-desk coordination, office correspondence, and day-to-day administrative tasks for staff and visitors.",
  },
  {
    name: "Julie Siah Johnney",
    role: "Vocational Instructor - Cosmetology",
    photo: "/team/julie-siah-johnney.png",
    photoObjectPosition: "object-[50%_22%]",
    bio: "Leads practical cosmetology instruction and supports learners with salon-ready techniques, safety standards, and client care skills.",
  },
  {
    name: "Morris Jallah",
    role: "Vocational Instructor - Interior Decoration",
    photo: "/team/morris-jallah.png",
    photoObjectPosition: "object-[50%_16%]",
    bio: "Leads practical interior decoration training and supports learners in space styling, finishing techniques, and design presentation skills.",
  },
  {
    name: "Ruth Karbiah",
    role: "Vocational Instructor - General Catering",
    photo: "/team/ruth-karbiah.png",
    photoObjectPosition: "object-[50%_16%]",
    bio: "Leads practical general catering instruction and supports learners in food preparation, hygiene standards, and service delivery skills.",
  },
  {
    name: "Betty A.M Flahn",
    role: "Business Strategies Advisor",
    photo: "/team/betty-a-m-flahn.png",
    photoObjectPosition: "object-[50%_18%]",
    bio: "Advises on business strategy, growth planning, and program-market alignment to strengthen organizational impact and sustainability.",
  },
];

const teamMediaWrapClass =
  "mx-auto w-full max-w-[min(100%,14rem)] shrink-0 min-[480px]:mx-0 min-[480px]:max-w-none";

function initialsFromName(name) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function TeamAvatar({ name }) {
  const initials = initialsFromName(name);
  return (
    <div className="aspect-square w-full rounded-full bg-neutral-200 p-[3px]" aria-hidden>
      <div className="flex h-full w-full items-center justify-center rounded-full bg-neutral-100 text-xl font-bold tracking-tight text-[#1a1a4b] min-[480px]:text-3xl sm:text-4xl">
        {initials}
      </div>
    </div>
  );
}

function PillarIconGoal({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v2M12 19v2M3 12h2M19 12h2" />
    </svg>
  );
}

function PillarIconMission({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function PillarIconVision({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function OverviewOrgIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M6 22V4a2 2 0 012-2h8a2 2 0 012 2v18" />
      <path d="M6 12H4a2 2 0 00-2 2v6a2 2 0 002 2h2" />
      <path d="M18 9h2a2 2 0 012 2v9a2 2 0 01-2 2h-2" />
      <path d="M10 6h4M10 10h4M10 14h4M10 18h4" />
    </svg>
  );
}

const ABOUT_PILLARS = [
  {
    title: "Our Goal",
    text: "To drive innovation, boost capacity, and create lasting impact across Africa.",
    Icon: PillarIconGoal,
  },
  {
    title: "Our Mission",
    text: "To empower individuals, institutions, and communities across Africa by providing high-quality ICT, vocational, and professional training, along with innovative digital solutions that promote growth, close the digital gap, and support sustainable development.",
    Icon: PillarIconMission,
  },
  {
    title: "Our Vision",
    text: "To lead Africa's digital transformation by building a future where technology empowers every individual and organization to achieve their full potential.",
    Icon: PillarIconVision,
  },
];

function TeamPhoto({ member }) {
  const [imgError, setImgError] = useState(false);
  const wrap = (node) => <div className={teamMediaWrapClass}>{node}</div>;

  if (member.photo && !imgError) {
    const objectPos = member.photoObjectPosition ?? "object-center";
    return wrap(
      <div className="aspect-square w-full rounded-full bg-neutral-200 p-[3px]">
        <div className="h-full w-full overflow-hidden rounded-full bg-white">
          <img
            src={member.photo}
            alt={member.name}
            className={`block h-full w-full object-cover ${objectPos}`}
            loading="lazy"
            decoding="async"
            onError={() => setImgError(true)}
          />
        </div>
      </div>,
    );
  }
  return wrap(<TeamAvatar name={member.name} />);
}

export function AboutPage() {
  return (
    <div className="min-h-[50vh] overflow-x-hidden px-3 py-10 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-[1120px]">
        <div className="overflow-hidden rounded-2xl border border-neutral-200/90 bg-gradient-to-br from-white via-white to-neutral-50/90 p-6 shadow-card sm:p-8 lg:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:gap-10">
            <div
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--color-ll-accent)]/[0.12] to-[var(--color-ll-accent-dim)]/20 text-[var(--color-ll-accent)] lg:h-16 lg:w-16"
              aria-hidden
            >
              <OverviewOrgIcon className="h-7 w-7 lg:h-8 lg:w-8" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[0.65rem] font-bold uppercase tracking-wider text-[#5a7a2e] sm:text-xs">
                About
              </p>
              <h1 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-bold leading-tight text-[#1a1a4b] min-[400px]:text-3xl sm:text-4xl">
                Company overview
              </h1>
              <span
                className="mt-4 inline-block h-1 w-14 rounded-full bg-[var(--color-ll-accent)]"
                aria-hidden
              />
              <p className="mt-5 text-sm leading-relaxed text-neutral-600 sm:text-base">
                Liberia Libra Incorporated is an innovation driven African organization
                dedicated to digital empowerment, vocational training, and technology
                solutions that help individuals and businesses thrive.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-neutral-600 sm:text-base">
                We also offer free training programs that equip individuals with essential
                technology skills, promoting continuous learning.
              </p>
              <nav
                className="mt-8 flex flex-wrap gap-3"
                aria-label="Explore programs and contact"
              >
                <Link
                  to="/training"
                  className="inline-flex min-h-10 items-center justify-center rounded-full bg-[var(--color-ll-accent)] px-5 py-2 text-xs font-semibold text-white shadow-lg shadow-[var(--color-ll-accent)]/25 transition hover:brightness-110 sm:text-sm"
                >
                  View training
                </Link>
                <Link
                  to="/scholarship"
                  className="inline-flex min-h-10 items-center justify-center rounded-full border border-neutral-300 bg-white px-5 py-2 text-xs font-semibold text-[#1a1a4b] transition hover:border-[var(--color-ll-accent)] hover:text-[var(--color-ll-accent)] sm:text-sm"
                >
                  Scholarships
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex min-h-10 items-center justify-center rounded-full border border-neutral-300 bg-white px-5 py-2 text-xs font-semibold text-[#1a1a4b] transition hover:border-[var(--color-ll-accent)] hover:text-[var(--color-ll-accent)] sm:text-sm"
                >
                  Contact us
                </Link>
              </nav>
            </div>
          </div>
        </div>

        <ul
          className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 sm:grid-cols-3 sm:gap-6"
          aria-label="Goal, mission, and vision"
        >
          {ABOUT_PILLARS.map((item) => (
            <li key={item.title} className="flex h-full min-h-0">
              <div className="group flex h-full w-full flex-col rounded-2xl border border-neutral-200/90 bg-white p-5 shadow-card transition duration-300 hover:-translate-y-0.5 hover:border-[var(--color-ll-accent)]/30 hover:shadow-lg sm:p-6">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--color-ll-accent)]/[0.12] to-[var(--color-ll-accent-dim)]/20 text-[var(--color-ll-accent)] transition group-hover:from-[var(--color-ll-accent)]/15 group-hover:to-[var(--color-ll-accent-dim)]/25"
                  aria-hidden
                >
                  <item.Icon className="h-6 w-6" />
                </div>
                <h2 className="mt-4 font-[family-name:var(--font-display)] text-lg font-bold leading-snug text-[#1a1a4b] sm:text-xl">
                  {item.title}
                </h2>
                <span
                  className="mt-2 inline-block h-1 w-11 rounded-full bg-[var(--color-ll-accent)]"
                  aria-hidden
                />
                <p className="mt-4 flex-1 text-sm leading-relaxed text-neutral-600">
                  {item.text}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <section
        className="mx-auto mt-12 max-w-[1120px] border-t border-neutral-200 pt-12 sm:mt-16 sm:pt-16"
        aria-labelledby="team-heading"
      >
        <p className="text-[0.65rem] font-bold uppercase tracking-wider text-[#5a7a2e] sm:text-xs">
          Team
        </p>
        <h2
          id="team-heading"
          className="mt-2 font-[family-name:var(--font-display)] text-xl font-bold leading-tight text-[#1a1a4b] min-[400px]:text-2xl sm:text-3xl"
        >
          Our team
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-600 sm:text-base">
          Meet the people behind Liberia Libra.
        </p>

        <ul className="mt-8 grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 min-[480px]:gap-5 lg:gap-8 xl:grid-cols-4">
          {TEAM.map((member) => (
            <li
              key={member.name}
              className="flex min-w-0 flex-col rounded-xl border border-neutral-200 bg-white p-3 shadow-sm min-[480px]:p-4"
            >
              <TeamPhoto member={member} />
              <h3 className="mt-3 font-[family-name:var(--font-display)] text-base font-semibold leading-snug text-neutral-900 min-[480px]:mt-4 min-[480px]:text-lg">
                {member.name}
              </h3>
              <p className="mt-1 text-xs font-medium leading-snug text-[var(--color-ll-accent)] sm:text-sm">
                {member.role}
              </p>
              <p className="mt-2 flex-1 text-xs leading-relaxed text-neutral-600 sm:text-sm">
                {member.bio}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
