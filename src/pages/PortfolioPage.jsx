import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const FILTERS = ["All", "ICT", "Media", "DTP"];

const PORTFOLIO_ITEMS = [
  { id: "1", cat: "ICT", title: "Sample ICT project" },
  { id: "2", cat: "Media", title: "Sample media project" },
  { id: "3", cat: "DTP", title: "Sample DTP project" },
];

export function PortfolioPage() {
  const [filter, setFilter] = useState("All");

  const visible = useMemo(
    () =>
      filter === "All"
        ? PORTFOLIO_ITEMS
        : PORTFOLIO_ITEMS.filter((p) => p.cat === filter),
    [filter]
  );

  return (
    <div className="min-h-[50vh] overflow-x-hidden px-3 py-10 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-[1120px]">
        <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold leading-tight text-[#1a1a4b] min-[400px]:text-3xl sm:text-4xl">
          Portfolio
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-600 sm:text-base">
          A curated view of Liberia Libra work across ICT, media, and desktop
          publishing. Use the category chips to scan what we do, preview each
          project below, and open <span className="font-medium text-neutral-800">View details</span>{" "}
          when you want to learn more. Training photos, student stories, and
          activity updates live on our{" "}
          <Link to="/blog" className="font-semibold text-[var(--color-ll-accent)] hover:underline">
            Blog
          </Link>
          .
        </p>
        <nav
          className="mt-6 flex flex-wrap gap-2 sm:mt-8"
          aria-label="Portfolio categories"
        >
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`min-h-9 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors sm:px-4 sm:text-sm ${
                filter === f
                  ? "border-[var(--color-ll-accent)] bg-[var(--color-ll-accent)] text-white"
                  : "border-neutral-300 bg-white text-neutral-800 hover:border-[var(--color-ll-accent)] hover:text-[var(--color-ll-accent)]"
              }`}
            >
              {f}
            </button>
          ))}
        </nav>
        <ul className="mt-6 grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 min-[480px]:gap-5 sm:mt-8 lg:grid-cols-3">
          {visible.map((p) => (
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
