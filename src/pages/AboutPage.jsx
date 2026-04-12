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

function TeamPhoto({ member }) {
  const wrap = (node) => <div className={teamMediaWrapClass}>{node}</div>;

  if (member.photo) {
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
          Meet the people behind Liberia Libra. Team photos live under{" "}
          <code className="break-all rounded bg-neutral-200 px-1.5 py-0.5 text-[0.7rem] text-neutral-800 sm:break-normal sm:text-sm">
            public/team/
          </code>
          .
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
