import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div className="min-h-[50vh] px-3 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-lg text-center">
        <p className="text-sm font-semibold text-[var(--color-ll-accent)]">404</p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-bold text-[#1a1a4b] min-[400px]:text-3xl">
          Page not found
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-neutral-600 sm:text-base">
          That link may be outdated or the page was moved. Try the home page or
          contact us if you need help.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-[var(--color-ll-accent)] px-6 text-sm font-semibold text-white no-underline hover:brightness-110"
          >
            Back to home
          </Link>
          <Link
            to="/contact"
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-neutral-300 bg-white px-6 text-sm font-semibold text-[#1a1a4b] no-underline hover:bg-neutral-50"
          >
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
}
