/** Optional `photo` / `linkedinQr`: paths under public, e.g. "/team/daniel-abaka.png" */
const TEAM = [
  {
    name: "Daniel Abaka",
    role: "Founder/Executive Director",
    photo: "/team/daniel-abaka.png",
    linkedinQr: "/team/daniel-abaka-linkedin.png",
  },
  {
    name: "Asalyne C. Browne",
    role: "Chief Executive Officer",
    photo: "/team/asalyne-browne.png",
    linkedinQr: "/team/asalyne-browne-linkedin.png",
  },
  {
    name: "Michael Johnson",
    role: "ICT Lead",
    bio: "Oversees digital projects, systems integration, and technical consultancy.",
  },
  {
    name: "Patience Weah",
    role: "Media & Communications",
    bio: "Guides campaigns, creative production, and public-facing content.",
  },
  {
    name: "Samuel Kromah",
    role: "Operations Manager",
    bio: "Coordinates logistics, vendor relationships, and day-to-day program delivery.",
  },
  {
    name: "Ellen Cooper",
    role: "Finance & Administration",
    bio: "Manages budgets, reporting, and internal systems for the organization.",
  },
  {
    name: "David Massaquoi",
    role: "Desktop Publishing Lead",
    bio: "Produces print-ready layouts, branding assets, and publication quality control.",
  },
  {
    name: "Rose Howard",
    role: "Programs Coordinator",
    bio: "Supports enrollment, scheduling, and participant success across training cohorts.",
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
    <div
      className="flex aspect-square w-full items-center justify-center rounded-full bg-neutral-100 text-xl font-bold tracking-tight text-[#1a1a4b] ring-2 ring-neutral-200 min-[480px]:text-3xl sm:text-4xl"
      aria-hidden
    >
      {initials}
    </div>
  );
}

function TeamPhoto({ member }) {
  const wrap = (node) => <div className={teamMediaWrapClass}>{node}</div>;

  if (member.photo) {
    return wrap(
      <img
        src={member.photo}
        alt={member.name}
        className="aspect-square w-full rounded-full bg-white object-cover object-center ring-2 ring-neutral-200"
        loading="lazy"
        decoding="async"
      />,
    );
  }
  return wrap(<TeamAvatar name={member.name} />);
}

export function AboutPage() {
  return (
    <div className="min-h-[50vh] overflow-x-hidden px-3 py-10 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <p className="text-[0.65rem] font-bold uppercase tracking-wider text-[#5a7a2e] sm:text-xs">
          About
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-bold leading-tight text-[#1a1a4b] min-[400px]:text-3xl sm:text-4xl">
          Company overview
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-neutral-600 sm:mt-4 sm:text-base">
          Liberia Libra Incorporated is an innovation driven African organization
          dedicated to digital empowerment, vocational training, and technology
          solutions that help individuals and businesses thrive.
          <br />
          <br />
          We also offer free training programs that equip individuals with essential
          technology skills, promoting continuous learning.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-3 sm:mt-10 sm:grid-cols-3 sm:gap-4">
          {[
            {
              title: "Our Goal",
              text: "To drive innovation, boost capacity, and create lasting impact across Africa.",
            },
            {
              title: "Our Mission",
              text: "To empower individuals, institutions, and communities across Africa by providing high-quality ICT, vocational, and professional training, along with innovative digital solutions that promote growth, close the digital gap, and support sustainable development.",
            },
            {
              title: "Our Vision",
              text: "To lead Africa's digital transformation by building a future where technology empowers every individual and organization to achieve their full potential.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-neutral-200 bg-white p-3 shadow-sm sm:p-4"
            >
              <h2 className="text-sm font-semibold text-[var(--color-ll-accent)]">
                {item.title}
              </h2>
              <p className="mt-2 text-xs leading-relaxed text-neutral-600 sm:text-sm">
                {item.text}
              </p>
            </div>
          ))}
        </div>
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
          Meet the people behind Liberia Libra. Add headshots and optional LinkedIn QR
          images under{" "}
          <code className="break-all rounded bg-neutral-200 px-1.5 py-0.5 text-[0.7rem] text-neutral-800 sm:break-normal sm:text-sm">
            public/team/
          </code>{" "}
          using the <code className="rounded bg-neutral-200 px-1 py-0.5 text-[0.7rem]">linkedinQr</code> field on each member.
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
              {"linkedinQr" in member && member.linkedinQr ? (
                <div className="mt-2 flex-1">
                  <img
                    src={member.linkedinQr}
                    alt={`${member.name} — LinkedIn`}
                    className="mx-auto mt-1 w-full max-w-[min(100%,14rem)] rounded-lg border border-neutral-200 bg-white object-contain p-2 shadow-sm min-[480px]:mx-0 min-[480px]:max-w-[220px]"
                    loading="lazy"
                  />
                </div>
              ) : (
                <p className="mt-2 flex-1 text-xs leading-relaxed text-neutral-600 sm:text-sm">
                  {member.bio}
                </p>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
