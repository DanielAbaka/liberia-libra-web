import { Link } from "react-router-dom";
import { HeroSlider } from "../components/HeroSlider.jsx";
import { BLOG_POSTS } from "../data/blogPosts.js";

const btnPrimary =
  "inline-flex min-h-11 min-w-[44px] items-center justify-center rounded-full bg-[var(--color-ll-accent)] px-5 py-2.5 text-sm font-semibold text-white no-underline hover:brightness-110 sm:px-6";
const btnGhost =
  "inline-flex min-h-11 min-w-[44px] items-center justify-center rounded-full border border-white/25 bg-black/20 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm no-underline hover:bg-white/10 sm:px-6";

export function HomePage() {
  return (
    <div className="overflow-x-hidden">
      <HeroSlider>
        <div className="mt-6 flex flex-wrap gap-3 sm:mt-8">
          <Link to="/services" className={btnPrimary}>
            View services
          </Link>
          <Link to="/contact" className={btnGhost}>
            Contact us
          </Link>
        </div>
      </HeroSlider>

      <section className="border-t border-neutral-200 bg-white px-3 py-12 sm:px-6 sm:py-16">
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
            <div className="min-w-0 rounded-xl border border-neutral-200 bg-neutral-50 p-4 shadow-sm sm:p-6">
              <p className="text-xs leading-relaxed text-neutral-600 sm:text-sm">
                We also offer free training programs that equip individuals with
                essential technology skills, promoting continuous learning.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-neutral-200 bg-white px-3 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-[1120px]">
          <h2 className="font-[family-name:var(--font-display)] text-xl font-bold leading-tight text-[#1a1a4b] min-[400px]:text-2xl sm:text-3xl">
            Featured services
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-600 sm:text-base">
            Replace with your real offerings; routing is wired for full pages.
          </p>
          <ul className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 min-[480px]:grid-cols-2 min-[480px]:gap-5 lg:gap-6 xl:grid-cols-4">
            {[
              {
                title: "ICT consultancy",
                text: "Technology planning and implementation support.",
                to: "/services",
              },
              {
                title: "Media consultancy",
                text: "Creative and campaign guidance.",
                to: "/services",
              },
              {
                title: "Desktop publishing",
                text: "Professional layouts and print-ready files.",
                to: "/services",
              },
              {
                title: "Training programs",
                text: "Structured learning paths for teams and individuals.",
                to: "/training",
              },
            ].map((c) => (
              <li
                key={c.title}
                className="flex min-w-0 flex-col rounded-xl border border-neutral-200 bg-neutral-50 p-4 shadow-sm min-[480px]:p-5"
              >
                <h3 className="text-base font-semibold leading-snug text-neutral-900">
                  {c.title}
                </h3>
                <p className="mt-2 flex-1 text-xs leading-relaxed text-neutral-600 sm:text-sm">
                  {c.text}
                </p>
                <Link
                  to={c.to}
                  className="mt-4 inline-flex min-h-10 items-center text-sm font-semibold text-[var(--color-ll-accent)] no-underline hover:underline"
                >
                  Learn more →
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-neutral-200 bg-white px-3 py-12 sm:px-6 sm:py-16">
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
                className="flex min-w-0 flex-col overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50 shadow-sm"
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
