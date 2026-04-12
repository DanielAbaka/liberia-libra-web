import { useCallback, useEffect, useState } from "react";

const SLIDE_INTERVAL_MS = 5000;

/** Default hero background when a slide has no `imageSrc`. */
const DEFAULT_HERO_IMAGE_SRC = "/hero/slide-1.png";
const DEFAULT_HERO_IMAGE_ALT =
  "Liberia Libra graduates and trainees with certificates in front of a branded banner.";

/** Optional per-slide `imageSrc` / `imageAlt` / `imageObjectClass` (Tailwind object-*). */
export const HERO_SLIDES = [
  {
    id: "1",
    eyebrow: "Liberia Libra Incorporated",
    headline: "Libra Training Cohort 5 certificates program",
    subtext:
      "Digital empowerment, vocational training, and technology solutions that help individuals, schools, and businesses across Liberia thrive.",
  },
  {
    id: "2",
    imageSrc: "/hero/slide-2.png",
    imageAlt:
      "Trainees in a computer lab during free ICT training, with desktop workstations and a monitor displaying the Liberia Libra Incorporated logo.",
    imageObjectClass:
      "object-cover object-[50%_42%] min-[480px]:object-[52%_40%] md:object-center",
    eyebrow: "Free ICT training programs",
    headline: "Build digital skills in the lab—structured, practical, and free for eligible participants.",
    subtext:
      "Hands-on sessions cover computer fundamentals, productivity software, and safe online practice so learners can study, work, and compete with confidence.",
  },
  {
    id: "3",
    imageSrc: "/hero/slide-3.png",
    imageAlt:
      "General Catering cohort 5 students in Liberia Libra shirts and caps smile with medals, branded mugs, and awards during graduation preparation.",
    imageObjectClass:
      "object-cover object-[50%_38%] min-[480px]:object-[50%_36%] md:object-center",
    eyebrow: "General Catering — cohort 5",
    headline: "Graduation preparation for students who earned every milestone.",
    subtext:
      "Cohort 5 wraps practical training with recognition, final assessments, and celebration—getting General Catering learners ready to step into work or their next chapter with pride.",
  },
  {
    id: "4",
    imageSrc: "/hero/slide-4.png",
    imageAlt:
      "Six women in General Catering uniforms and chef hats posing with baked cakes and cupcakes during a vocational training session.",
    imageObjectClass: "object-cover object-[50%_40%] min-[480px]:object-[50%_38%] md:object-center",
    eyebrow: "General Catering — vocational track",
    headline: "Hands-on catering training from kitchen basics to finished service.",
    subtext:
      "Build real skills in food preparation, baking, hygiene, and presentation—structured for learners who want to work in catering, hospitality, or start their own food business.",
  },
  {
    id: "5",
    imageSrc: "/hero/slide-5.png",
    imageAlt:
      "Liberia Libra students and partner representatives display signed Memorandum of Understanding documents for the internship program.",
    imageObjectClass:
      "object-cover object-[50%_40%] min-[480px]:object-[50%_38%] md:object-center",
    eyebrow: "Libra students — internship partnership",
    headline: "Partnership agreements that open real internship placements.",
    subtext:
      "Formal MOUs with trusted organizations give Libra learners structured workplace exposure—bridging training and employment through supervised, meaningful experience.",
  },
];

export function HeroSlider({ children }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const slide = HERO_SLIDES[index];
  const heroSrc = slide.imageSrc ?? DEFAULT_HERO_IMAGE_SRC;
  const heroAlt = slide.imageAlt ?? DEFAULT_HERO_IMAGE_ALT;
  const heroObjectClass =
    slide.imageObjectClass ??
    "object-cover object-[center_30%] min-[480px]:object-[center_35%] md:object-center";

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
      className="relative flex h-[min(60svh,520px)] overflow-hidden min-[480px]:h-[min(72svh,640px)] sm:h-[min(80svh,720px)] md:h-[min(85vh,760px)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="absolute inset-0 bg-[var(--color-ll-bg)]"
        aria-hidden
      >
        <img
          key={heroSrc}
          src={heroSrc}
          alt={heroAlt}
          className={`absolute inset-0 h-full w-full ${heroObjectClass}`}
          loading="eager"
          fetchPriority="high"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-[var(--color-ll-bg)]/85 from-0% via-[var(--color-ll-bg)]/48 via-[45%] to-[var(--color-ll-bg)]/10 to-[100%]"
          aria-hidden
        />
        <div className="absolute inset-0 bg-black/10" aria-hidden />
      </div>

      <div className="relative z-10 flex min-h-full w-full flex-col justify-center px-3 py-6 min-[400px]:px-4 min-[480px]:py-10 sm:px-6 sm:py-14 md:py-20">
        <div className="mx-auto w-full min-w-0 max-w-[1120px]">
          <div
            key={slide.id}
            className="motion-reduce:animate-none [animation:hero-copy_0.35s_ease-out_both]"
            aria-live="polite"
          >
            <p className="min-h-[2.75rem] text-[0.6rem] font-bold uppercase tracking-[0.1em] text-[var(--color-ll-accent-dim)] drop-shadow-[0_1px_8px_rgba(0,0,0,0.85)] min-[360px]:text-[0.65rem] min-[400px]:min-h-[3rem] min-[400px]:text-xs sm:min-h-[2.75rem] sm:tracking-[0.15em]">
              {slide.eyebrow}
            </p>
            <div className="mt-1.5 min-h-[6.25rem] min-[360px]:mt-2 min-[360px]:min-h-[7.25rem] min-[480px]:min-h-[8.25rem] sm:mt-3 sm:min-h-[8.75rem] md:min-h-[9.25rem]">
              <h1 className="max-w-[20rem] font-[family-name:var(--font-display)] text-lg font-bold leading-snug text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.75)] min-[360px]:max-w-xl min-[360px]:text-xl min-[360px]:leading-[1.2] min-[480px]:text-2xl sm:text-3xl md:text-4xl">
                {slide.headline}
              </h1>
            </div>
            <div className="mt-3 min-h-[8rem] min-[400px]:mt-4 min-[400px]:min-h-[8.5rem] sm:mt-5 sm:min-h-[9rem] md:min-h-[9.5rem]">
              <p className="max-w-lg text-xs leading-relaxed text-white/95 drop-shadow-[0_1px_10px_rgba(0,0,0,0.85)] min-[400px]:text-sm sm:text-base md:text-lg">
                {slide.subtext}
              </p>
            </div>
          </div>
          {children}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-1 right-1 z-20 flex items-center justify-between min-[480px]:left-2 min-[480px]:right-2 sm:left-4 sm:right-4">
        <button
          type="button"
          onClick={() => go(-1)}
          className="pointer-events-auto rounded-full border border-white/25 bg-black/35 p-2 text-white shadow-lg shadow-black/30 backdrop-blur-md transition hover:bg-black/50 hover:ring-2 hover:ring-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ll-accent)] min-[480px]:p-2.5"
          aria-label="Previous slide"
        >
          <Chevron className="h-4 w-4 rotate-180 min-[480px]:h-5 min-[480px]:w-5" />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          className="pointer-events-auto rounded-full border border-white/25 bg-black/35 p-2 text-white shadow-lg shadow-black/30 backdrop-blur-md transition hover:bg-black/50 hover:ring-2 hover:ring-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ll-accent)] min-[480px]:p-2.5"
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
                ? "w-8 bg-[var(--color-ll-accent)] shadow-md shadow-[var(--color-ll-accent)]/50"
                : "w-2.5 bg-white/45 hover:bg-white/70"
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
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}
