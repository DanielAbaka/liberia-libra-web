import { useCallback, useEffect, useState } from "react";

const SLIDE_INTERVAL_MS = 5000;

/** Single background image for every slide; change path to swap photo site-wide. */
const HERO_IMAGE_SRC = "/hero/slide-1.png";
const HERO_IMAGE_ALT =
  "Liberia Libra graduates and trainees with certificates in front of a branded banner.";

/** Copy-only slides; background image is shared (see HERO_IMAGE_SRC). */
export const HERO_SLIDES = [
  {
    id: "1",
    eyebrow: "Liberia Libra Incorporated",
    headline: "Clarity, capability, and growth for people and organizations.",
    subtext:
      "This site is built with React, Vite, and Tailwind CSS—ready for your content, forms, and integrations.",
  },
  {
    id: "2",
    eyebrow: "Liberia Libra Incorporated",
    headline: "ICT and vocational training that opens real career paths.",
    subtext:
      "Structured programs in technology and workplace skills—designed for students, professionals, and teams across Liberia.",
  },
  {
    id: "3",
    eyebrow: "Liberia Libra Incorporated",
    headline: "Consulting and media support for organizations that want to scale.",
    subtext:
      "From digital strategy to desktop publishing—we help you plan, produce, and deliver with confidence.",
  },
  {
    id: "4",
    eyebrow: "Liberia Libra Incorporated",
    headline: "Partnerships built on trust, delivery, and long-term impact.",
    subtext:
      "We work with schools, NGOs, and businesses to strengthen capacity and expand opportunity in the region.",
  },
  {
    id: "5",
    eyebrow: "Liberia Libra Incorporated",
    headline: "Ready when you are—start with services or say hello.",
    subtext:
      "Explore what we offer, browse training tracks, or reach out through the contact page to begin a conversation.",
  },
];

export function HeroSlider({ children }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const slide = HERO_SLIDES[index];

  const go = useCallback((delta) => {
    setIndex((i) => {
      const n = HERO_SLIDES.length;
      return (i + delta + n) % n;
    });
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches || paused) return undefined;
    const t = window.setInterval(() => {
      setIndex((i) => (i + 1) % HERO_SLIDES.length);
    }, SLIDE_INTERVAL_MS);
    return () => window.clearInterval(t);
  }, [paused]);

  return (
    <section
      className="relative flex min-h-[min(68svh,560px)] overflow-hidden min-[480px]:min-h-[min(80svh,720px)] sm:min-h-[min(85vh,760px)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="absolute inset-0 bg-[var(--color-ll-bg)]"
        aria-hidden
      >
        <img
          src={HERO_IMAGE_SRC}
          alt={HERO_IMAGE_ALT}
          className="absolute inset-0 h-full w-full object-contain object-center min-[480px]:object-cover min-[480px]:object-center"
          loading="eager"
          fetchPriority="high"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-[var(--color-ll-bg)]/85 from-0% via-[var(--color-ll-bg)]/48 via-[45%] to-[var(--color-ll-bg)]/10 to-[100%]"
          aria-hidden
        />
        <div className="absolute inset-0 bg-black/10" aria-hidden />
      </div>

      <div className="relative z-10 flex w-full flex-col justify-center px-3 py-8 min-[400px]:px-4 min-[480px]:py-12 sm:px-6 sm:py-24">
        <div className="mx-auto w-full min-w-0 max-w-[1120px]">
          <div
            key={slide.id}
            className="motion-reduce:animate-none [animation:hero-copy_0.35s_ease-out_both]"
            aria-live="polite"
          >
            <p className="text-[0.6rem] font-bold uppercase tracking-[0.1em] text-[var(--color-ll-accent-dim)] drop-shadow-[0_1px_8px_rgba(0,0,0,0.85)] min-[360px]:text-[0.65rem] min-[400px]:text-xs sm:tracking-[0.15em]">
              {slide.eyebrow}
            </p>
            <h1 className="mt-1.5 max-w-[20rem] font-[family-name:var(--font-display)] text-xl font-bold leading-tight text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.75)] min-[360px]:mt-2 min-[360px]:max-w-xl min-[360px]:text-2xl min-[360px]:leading-[1.15] min-[480px]:text-3xl sm:mt-3 sm:text-4xl md:text-5xl">
              {slide.headline}
            </h1>
            <p className="mt-3 max-w-lg text-xs leading-relaxed text-white/95 drop-shadow-[0_1px_10px_rgba(0,0,0,0.85)] min-[400px]:mt-4 min-[400px]:text-sm sm:mt-5 sm:text-base md:text-lg">
              {slide.subtext}
            </p>
          </div>
          {children}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-1 right-1 z-20 flex items-center justify-between min-[480px]:left-2 min-[480px]:right-2 sm:left-4 sm:right-4">
        <button
          type="button"
          onClick={() => go(-1)}
          className="pointer-events-auto rounded-full border border-white/20 bg-black/30 p-2 text-white backdrop-blur-sm transition hover:bg-black/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ll-accent)] min-[480px]:p-2.5"
          aria-label="Previous slide"
        >
          <Chevron className="h-4 w-4 rotate-180 min-[480px]:h-5 min-[480px]:w-5" />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          className="pointer-events-auto rounded-full border border-white/20 bg-black/30 p-2 text-white backdrop-blur-sm transition hover:bg-black/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ll-accent)] min-[480px]:p-2.5"
          aria-label="Next slide"
        >
          <Chevron className="h-4 w-4 min-[480px]:h-5 min-[480px]:w-5" />
        </button>
      </div>

      <div
        className="absolute bottom-4 left-1/2 z-20 flex max-w-[calc(100%-2rem)] -translate-x-1/2 flex-wrap justify-center gap-1.5 min-[480px]:bottom-5 min-[480px]:gap-2 sm:bottom-8"
        role="tablist"
        aria-label="Hero slides"
      >
        {HERO_SLIDES.map((s, i) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Slide ${i + 1} of ${HERO_SLIDES.length}`}
            onClick={() => setIndex(i)}
            className={`h-2.5 rounded-full transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ll-accent)] ${
              i === index
                ? "w-8 bg-[var(--color-ll-accent)]"
                : "w-2.5 bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

function Chevron({ className = "h-5 w-5" }) {
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
