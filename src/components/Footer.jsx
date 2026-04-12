import { Link } from "react-router-dom";

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-auto border-t border-neutral-200/80 bg-[var(--color-ll-page)]">
      <div className="mx-auto grid max-w-[1120px] grid-cols-1 gap-8 px-3 py-8 min-[480px]:grid-cols-2 min-[480px]:gap-8 sm:px-6 sm:py-10 md:grid-cols-4 md:gap-8">
        <div>
          <Link
            to="/"
            className="inline-block focus-visible:rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ll-accent)]"
          >
            <img
              src="/libra-logo.png"
              alt="Liberia Libra Incorporated"
              className="h-14 w-auto max-w-[min(100%,260px)] object-contain object-left min-[400px]:h-16 sm:h-[4.5rem] sm:max-w-[min(100%,280px)]"
            />
          </Link>
          <p className="mt-3 text-xs leading-relaxed text-neutral-600 sm:text-sm">
            Driving Digital Transformation Across Africa
          </p>
        </div>
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-ll-accent-dim)]">
            Explore
          </h3>
          <ul className="mt-3 space-y-1.5 text-xs sm:space-y-2 sm:text-sm">
            <li>
              <Link
                to="/about"
                className="text-neutral-700 hover:text-[var(--color-ll-accent)]"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                className="text-neutral-700 hover:text-[var(--color-ll-accent)]"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                to="/training"
                className="text-neutral-700 hover:text-[var(--color-ll-accent)]"
              >
                Training
              </Link>
            </li>
            <li>
              <Link
                to="/gallery"
                className="text-neutral-700 hover:text-[var(--color-ll-accent)]"
              >
                Gallery
              </Link>
            </li>
            <li>
              <Link
                to="/portfolio"
                className="text-neutral-700 hover:text-[var(--color-ll-accent)]"
              >
                Portfolio
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-ll-accent-dim)]">
            Contact
          </h3>
          <ul className="mt-3 space-y-1.5 text-xs sm:space-y-2 sm:text-sm">
            <li>
              <Link
                to="/contact"
                className="text-neutral-700 hover:text-[var(--color-ll-accent)]"
              >
                Contact form
              </Link>
            </li>
            <li>
              <a
                href="mailto:liberialibrainc@gmail.com"
                className="text-neutral-700 hover:text-[var(--color-ll-accent)]"
              >
                liberialibrainc@gmail.com
              </a>
            </li>
            <li>
              <strong className="text-neutral-900">Phone</strong>
              <br />
              <span className="text-neutral-600">
                +231 777 000 000 031
              </span>
            </li>
            <li>
              <strong className="text-neutral-900">Address</strong>
              <br />
              <span className="text-neutral-600">
                Caldwell Road, Monrovia Liberia      
              </span>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-ll-accent-dim)]">
            Social
          </h3>
          <div className="mt-3 flex flex-wrap gap-2">
            <a
              href="https://www.facebook.com/libraincorporated"
              className="inline-flex min-h-10 items-center gap-2 rounded-full border border-neutral-200/90 bg-white px-4 py-2 text-xs font-medium text-neutral-700 shadow-sm transition hover:border-[var(--color-ll-accent)]/40 hover:text-[var(--color-ll-accent)] hover:shadow-md"
            >
              <IconFacebook className="h-4 w-4 shrink-0" aria-hidden />
              Facebook
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 bg-[var(--color-ll-footer)] px-3 py-3 sm:px-6 sm:py-4">
        <div className="mx-auto flex max-w-[1120px] items-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex shrink-0 min-h-9 items-center gap-1.5 rounded-full border border-white/25 bg-white/[0.08] px-3 py-1.5 text-[0.65rem] font-semibold text-white shadow-md shadow-black/20 backdrop-blur-sm transition hover:border-white/40 hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:min-h-10 sm:gap-2 sm:px-4 sm:py-2 sm:text-xs"
            aria-label="Back to top of page"
          >
            <ArrowUpIcon className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" aria-hidden />
            Back to top
          </button>
          <p className="min-w-0 flex-1 text-center text-xs leading-snug text-white sm:text-sm">
            © {year} Liberia Libra Incorporated. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

function ArrowUpIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 19V5M5 12l7-7 7 7" />
    </svg>
  );
}

function IconFacebook({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}
