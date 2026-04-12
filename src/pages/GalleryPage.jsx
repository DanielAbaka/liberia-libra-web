import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  GALLERY_CATEGORIES,
  TRAINING_GALLERY_ITEMS,
} from "../data/trainingGallery.js";

export function GalleryPage() {
  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState(null);

  const filtered =
    filter === "All"
      ? TRAINING_GALLERY_ITEMS
      : TRAINING_GALLERY_ITEMS.filter((item) => item.category === filter);

  const closeLightbox = useCallback(() => setLightbox(null), []);

  const goNext = useCallback(() => {
    if (!lightbox || filtered.length <= 1) return;
    const i = filtered.findIndex((x) => x.id === lightbox.id);
    if (i < 0) return;
    setLightbox(filtered[(i + 1) % filtered.length]);
  }, [lightbox, filtered]);

  const goPrev = useCallback(() => {
    if (!lightbox || filtered.length <= 1) return;
    const i = filtered.findIndex((x) => x.id === lightbox.id);
    if (i < 0) return;
    setLightbox(filtered[(i - 1 + filtered.length) % filtered.length]);
  }, [lightbox, filtered]);

  useEffect(() => {
    if (!lightbox) return undefined;
    if (!filtered.some((x) => x.id === lightbox.id)) {
      setLightbox(null);
      return undefined;
    }
    return undefined;
  }, [filter, filtered, lightbox]);

  useEffect(() => {
    if (!lightbox) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, closeLightbox, goPrev, goNext]);

  const lightboxIndex =
    lightbox && filtered.length > 0
      ? filtered.findIndex((x) => x.id === lightbox.id)
      : -1;

  return (
    <div className="min-h-[50vh] overflow-x-hidden px-3 py-10 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-[1120px]">
        <p className="text-[0.65rem] font-bold uppercase tracking-wider text-[#5a7a2e] sm:text-xs">
          Media
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-bold leading-tight text-[#1a1a4b] min-[400px]:text-3xl sm:text-4xl">
          Training gallery
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-600 sm:text-base">
          Photos from Liberia Libra training across ICT, vocational, and professional
          programs.
        </p>

        <nav
          className="mt-6 flex flex-wrap gap-2 sm:mt-8"
          aria-label="Gallery categories"
        >
          {GALLERY_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className={`min-h-9 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors sm:px-4 sm:text-sm ${
                filter === cat
                  ? "border-[var(--color-ll-accent)] bg-[var(--color-ll-accent)] text-white"
                  : "border-neutral-300 bg-white text-neutral-800 hover:border-[var(--color-ll-accent)] hover:text-[var(--color-ll-accent)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </nav>

        {filtered.length === 0 ? (
          <p className="mt-10 text-center text-sm text-neutral-600">
            No photos in this category yet.{" "}
            <Link
              to="/training"
              className="font-semibold text-[var(--color-ll-accent)] hover:underline"
            >
              View training programs
            </Link>
          </p>
        ) : (
          <ul className="mt-8 grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 min-[480px]:gap-5 sm:mt-10 lg:grid-cols-3">
            {filtered.map((item) => (
              <li key={item.id} className="min-w-0">
                <button
                  type="button"
                  onClick={() => setLightbox(item)}
                  className="group w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ll-accent)]"
                >
                  <div className="overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50 shadow-sm ring-1 ring-black/5 transition group-hover:border-[var(--color-ll-accent)]/40 group-hover:shadow-md">
                    <div className="aspect-video w-full overflow-hidden bg-neutral-100">
                      <img
                        src={item.src}
                        alt={item.alt}
                        className="h-full w-full object-cover object-center transition duration-300 group-hover:scale-[1.02]"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="border-t border-neutral-100 px-3 py-2.5 sm:px-4 sm:py-3">
                      <p className="text-[0.65rem] font-semibold uppercase tracking-wide text-[var(--color-ll-accent)]">
                        {item.category}
                      </p>
                      <p className="mt-1 text-sm font-medium leading-snug text-neutral-900">
                        {item.caption}
                      </p>
                      <p className="mt-1 text-xs text-neutral-500">Click to enlarge</p>
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}

        <p className="mt-10 text-center text-sm text-neutral-600 sm:mt-12">
          Interested in joining a cohort?{" "}
          <Link
            to="/training"
            className="font-semibold text-[var(--color-ll-accent)] hover:underline"
          >
            Explore training
          </Link>{" "}
          or{" "}
          <Link
            to="/contact"
            className="font-semibold text-[var(--color-ll-accent)] hover:underline"
          >
            contact us
          </Link>
          .
        </p>
      </div>

      {lightbox ? (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Enlarged photo"
          onClick={closeLightbox}
        >
          <button
            type="button"
            className="absolute right-3 top-3 z-[72] rounded-full bg-white/10 px-3 py-1.5 text-sm font-semibold text-white hover:bg-white/20 min-[480px]:right-6 min-[480px]:top-6"
            onClick={closeLightbox}
          >
            Close
          </button>

          {filtered.length > 1 ? (
            <>
              <button
                type="button"
                className="absolute left-1 top-1/2 z-[72] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white min-[480px]:left-4 min-[480px]:h-12 min-[480px]:w-12"
                aria-label="Previous image"
                onClick={(e) => {
                  e.stopPropagation();
                  goPrev();
                }}
              >
                <ChevronIcon className="h-6 w-6 rotate-180" />
              </button>
              <button
                type="button"
                className="absolute right-1 top-1/2 z-[72] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white min-[480px]:right-4 min-[480px]:h-12 min-[480px]:w-12"
                aria-label="Next image"
                onClick={(e) => {
                  e.stopPropagation();
                  goNext();
                }}
              >
                <ChevronIcon className="h-6 w-6" />
              </button>
            </>
          ) : null}

          <div
            className="relative max-h-[90vh] max-w-[min(100%,960px)] overflow-auto rounded-xl bg-white p-2 shadow-2xl min-[480px]:p-3"
            onClick={(e) => e.stopPropagation()}
          >
            {lightboxIndex >= 0 && filtered.length > 1 ? (
              <p className="mb-2 text-center text-xs text-neutral-500">
                {lightboxIndex + 1} / {filtered.length}
              </p>
            ) : null}
            <img
              src={lightbox.src}
              alt={lightbox.alt}
              className="max-h-[min(75vh,720px)] w-full rounded-lg object-contain"
            />
            <p className="mt-2 px-1 text-center text-sm font-medium text-neutral-900 sm:mt-3">
              {lightbox.caption}
            </p>
            <p className="pb-1 text-center text-xs text-neutral-500">{lightbox.category}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function ChevronIcon({ className = "h-6 w-6" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}
