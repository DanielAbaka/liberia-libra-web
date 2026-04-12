import { Link } from "react-router-dom";
import { HeroSlider } from "../components/HeroSlider.jsx";
import { IconIct, IconLayout, IconMedia, IconTraining } from "../components/ServiceIcons.jsx";
import { BLOG_POSTS } from "../data/blogPosts.js";

const btnPrimary =
  "inline-flex min-h-10 min-w-[44px] items-center justify-center rounded-full bg-[var(--color-ll-accent)] px-4 py-2 text-xs font-semibold text-white no-underline shadow-lg shadow-[var(--color-ll-accent)]/35 transition hover:brightness-110 hover:shadow-xl hover:shadow-[var(--color-ll-accent)]/40 active:scale-[0.98] min-[400px]:min-h-11 min-[400px]:px-5 min-[400px]:py-2.5 min-[400px]:text-sm sm:px-6";
const btnGhost =
  "inline-flex min-h-10 min-w-[44px] items-center justify-center rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-black/10 backdrop-blur-md no-underline transition hover:bg-white/18 active:scale-[0.98] min-[400px]:min-h-11 min-[400px]:px-5 min-[400px]:py-2.5 min-[400px]:text-sm sm:px-6";

export function HomePage() {
  return (
    <div className="overflow-x-hidden">
      <HeroSlider>
        <div className="mt-4 flex flex-wrap gap-2 min-[400px]:mt-6 min-[400px]:gap-3 sm:mt-8">
          <Link to="/services" className={btnPrimary}>
            View services
          </Link>
          <Link to="/contact" className={btnGhost}>
            Contact us
          </Link>
        </div>
      </HeroSlider>

      <section className="border-t border-neutral-200/80 bg-[var(--color-ll-page)] px-3 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-[1120px]">
          <div className="grid gap-8 min-[480px]:gap-10 lg:grid-cols-2 lg:items-center">
            <div className="min-w-0">
              <h2 className="font-[family-name:var(--font-display)] text-xl font-bold leading-tight text-[#1a1a4b] min-[400px]:text-2xl">
                About Liberia Libra
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600 sm:mt-4 sm:text-base">
                Liberia Libra Incorporated is an innovation driven African
                organization dedicated to digital empowerment, vocational training,
                and technology solutions that help individuals and businesses thrive.
              </p>
              <Link to="/about" className={`${btnPrimary} mt-5 sm:mt-6`}>
                About us
              </Link>
            </div>
            <div className="min-w-0 rounded-2xl border border-neutral-200/90 bg-white p-4 shadow-card sm:p-6">
              <p className="text-xs leading-relaxed text-neutral-600 sm:text-sm">
                We also offer free training programs that equip individuals with
                essential technology skills, promoting continuous learning.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-neutral-200/80 bg-[var(--color-ll-page)] px-3 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-[1120px]">
          <h2 className="font-[family-name:var(--font-display)] text-xl font-bold leading-tight text-[#1a1a4b] min-[400px]:text-2xl sm:text-3xl">
            Featured services
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-600 sm:text-base">
            From ICT and media consultancy to desktop publishing and training—we
            help you plan, deliver, and grow.
          </p>
          <ul className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 min-[480px]:grid-cols-2 min-[480px]:gap-5 lg:gap-6 xl:grid-cols-4">
            {[
              {
                title: "ICT consultancy",
                text: "Technology planning and implementation support.",
                to: "/services",
                Icon: IconIct,
              },
              {
                title: "Media consultancy",
                text: "Creative and campaign guidance.",
                to: "/services",
                Icon: IconMedia,
              },
              {
                title: "Desktop publishing",
                text: "Professional layouts and print-ready files.",
                to: "/services",
                Icon: IconLayout,
              },
              {
                title: "Training programs",
                text: "Structured learning paths for teams and individuals.",
                to: "/training",
                Icon: IconTraining,
              },
            ].map((c) => (
              <li
                key={c.title}
                className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-neutral-200/90 bg-white shadow-card transition duration-300 hover:border-neutral-300 hover:shadow-lg"
              >
                <div
                  className="relative flex aspect-video w-full items-center justify-center bg-gradient-to-br from-[var(--color-ll-surface)]/[0.08] via-neutral-50 to-[var(--color-ll-accent-dim)]/[0.14]"
                  aria-hidden
                >
                  <c.Icon className="h-12 w-12 text-[var(--color-ll-surface)] opacity-90 transition duration-300 group-hover:scale-105 sm:h-14 sm:w-14" />
                </div>
                <div className="flex flex-1 flex-col p-4 min-[480px]:p-5">
                  <h3 className="text-base font-semibold leading-snug text-neutral-900">
                    {c.title}
                  </h3>
                  <p className="mt-2 flex-1 text-xs leading-relaxed text-neutral-600 sm:text-sm">
                    {c.text}
                  </p>
                  <Link
                    to={c.to}
                    className="mt-4 inline-flex min-h-10 items-center gap-1 text-sm font-semibold text-[var(--color-ll-accent)] no-underline transition hover:gap-2 hover:underline"
                  >
                    Learn more <span aria-hidden>→</span>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-neutral-200/80 bg-[var(--color-ll-page)] px-3 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-[1120px]">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-xl font-bold leading-tight text-[#1a1a4b] min-[400px]:text-2xl sm:text-3xl">
                Latest blog posts
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-600 sm:text-base">
                Recent student training activities across ICT, Vocational, and
                Professional tracks.
              </p>
            </div>
            <Link
              to="/blog"
              className="inline-flex min-h-10 items-center text-sm font-semibold text-[var(--color-ll-accent)] no-underline hover:underline"
            >
              View all blog posts →
            </Link>
          </div>

          <ul className="mt-8 grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 min-[480px]:gap-5 lg:grid-cols-3">
            {BLOG_POSTS.slice(0, 3).map((post) => (
              <li
                key={post.id}
                className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-neutral-200/90 bg-white shadow-card transition duration-300 hover:border-neutral-300 hover:shadow-lg"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="aspect-video w-full object-cover"
                  loading="lazy"
                />
                <div className="p-4 min-[480px]:p-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-white px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-neutral-700 min-[400px]:text-xs">
                    {post.track}
                  </span>
                  <span className="text-xs text-neutral-500">{post.date}</span>
                </div>
                <h3 className="mt-3 text-base font-semibold leading-snug text-neutral-900">
                  {post.title}
                </h3>
                <p className="mt-2 flex-1 text-xs leading-relaxed text-neutral-600 sm:text-sm">
                  {post.summary}
                </p>
                <Link
                  to="/blog"
                  className="mt-4 inline-flex min-h-10 items-center text-sm font-semibold text-[var(--color-ll-accent)] no-underline hover:underline"
                >
                  Read more →
                </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
