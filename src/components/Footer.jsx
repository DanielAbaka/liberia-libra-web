import { Link } from "react-router-dom";
import { COMPANY_CONTACT } from "../data/companyContact.js";
import { publicAsset } from "../lib/publicAsset.js";

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
              src={publicAsset(COMPANY_CONTACT.logoFile)}
              alt="Liberia Libra Incorporated"
              className="h-[5rem] w-auto max-w-[min(100%,340px)] object-contain object-left min-[400px]:h-[5.75rem] sm:h-28 sm:max-w-[min(100%,380px)]"
              width={380}
              height={120}
              decoding="async"
            />
          </Link>
          <p className="mt-3 max-w-sm text-xs leading-relaxed text-neutral-600 sm:text-sm">
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
                to="/scholarship"
                className="text-neutral-700 hover:text-[var(--color-ll-accent)]"
              >
                Scholarship
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
                href={`mailto:${COMPANY_CONTACT.email}`}
                className="text-neutral-700 hover:text-[var(--color-ll-accent)]"
              >
                {COMPANY_CONTACT.email}
              </a>
            </li>
            <li>
              <strong className="text-neutral-900">Phone</strong>
              <br />
              <span className="text-neutral-600">
                +231 777 000 031 / 888 716 659
              </span>
            </li>
            <li>
              <strong className="text-neutral-900">Address</strong>
              <br />
              <span className="text-neutral-600">
                {COMPANY_CONTACT.addressLine1} {COMPANY_CONTACT.addressLine2}
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
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-10 items-center gap-2 rounded-full border border-neutral-200/90 bg-white px-4 py-2 text-xs font-medium text-neutral-700 shadow-sm transition hover:border-[var(--color-ll-accent)]/40 hover:text-[var(--color-ll-accent)] hover:shadow-md"
            >
              <IconFacebook className="h-4 w-4 shrink-0" aria-hidden />
              Facebook
            </a>
            <a
              href="https://www.linkedin.com/company/lib-libra-incorporated/?viewAsMember=true"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-10 items-center gap-2 rounded-full border border-neutral-200/90 bg-white px-4 py-2 text-xs font-medium text-neutral-700 shadow-sm transition hover:border-[var(--color-ll-accent)]/40 hover:text-[var(--color-ll-accent)] hover:shadow-md"
            >
              <IconLinkedIn className="h-4 w-4 shrink-0" aria-hidden />
              LinkedIn
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

function IconLinkedIn({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
