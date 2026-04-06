import { Link } from "react-router-dom";

export function PortfolioPage() {
  const items = [
    { id: "1", cat: "ICT", title: "Sample ICT project" },
    { id: "2", cat: "Media", title: "Sample media project" },
    { id: "3", cat: "DTP", title: "Sample DTP project" },
  ];

  return (
    <div className="min-h-[50vh] overflow-x-hidden px-3 py-10 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-[1120px]">
        <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold leading-tight text-[#1a1a4b] min-[400px]:text-3xl sm:text-4xl">
          Portfolio
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-600 sm:text-base">
          Add filter chips, image/video thumbnails, and project detail modals or
          routes. Student activity updates are now published under the dedicated{" "}
          <Link to="/blog" className="font-semibold text-[var(--color-ll-accent)] hover:underline">
            Blog
          </Link>{" "}
          page.
        </p>
        <div className="mt-6 flex flex-wrap gap-2 sm:mt-8">
          {["All", "ICT", "Media", "DTP"].map((f) => (
            <span
              key={f}
              className="rounded-full border border-neutral-300 bg-white px-2.5 py-1 text-[0.65rem] font-semibold text-neutral-700 min-[400px]:px-3 min-[400px]:text-xs"
            >
              {f}
            </span>
          ))}
        </div>
        <ul className="mt-6 grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 min-[480px]:gap-5 sm:mt-8 lg:grid-cols-3">
          {items.map((p) => (
            <li
              key={p.id}
              className="min-w-0 overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm"
            >
              <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-neutral-200 to-neutral-300 text-[0.65rem] font-bold uppercase tracking-widest text-neutral-500 min-[400px]:text-xs">
                {p.cat}
              </div>
              <div className="p-3 sm:p-4">
                <h2 className="text-sm font-semibold leading-snug text-neutral-900 sm:text-base">
                  {p.title}
                </h2>
                <button
                  type="button"
                  className="mt-2 inline-flex min-h-10 items-center text-sm font-semibold text-[var(--color-ll-accent)] hover:underline sm:mt-3"
                >
                  View details
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
