import { useState } from "react";
import { Link } from "react-router-dom";
import { IconIct, IconLayout, IconMedia, IconTraining } from "../components/ServiceIcons.jsx";
import { SERVICES_CATALOG } from "../data/servicesCatalog.js";

const SERVICE_ICONS = {
  ict: IconIct,
  media: IconMedia,
  dtp: IconLayout,
  training: IconTraining,
};

export function ServicesPage() {
  const [selectedService, setSelectedService] = useState(null);

  const services = SERVICES_CATALOG.map((s) => ({
    ...s,
    Icon: SERVICE_ICONS[s.id],
  }));

  return (
    <div className="min-h-[50vh] overflow-x-hidden px-3 py-10 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-[1120px]">
        <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold leading-tight text-[#1a1a4b] min-[400px]:text-3xl sm:text-4xl">
          Services
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-600 sm:text-base">
          Explore our consulting and training offerings—each card summarizes what we
          deliver and the activities we can take on with your team.
        </p>
        <ul className="mt-8 grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 min-[480px]:gap-6 sm:mt-12">
          {services.map((s) => (
            <li
              key={s.id}
              id={s.id}
              className="group flex min-w-0 scroll-mt-24 flex-col overflow-hidden rounded-2xl border border-neutral-200/90 bg-white shadow-card transition duration-300 hover:border-neutral-300 hover:shadow-lg"
            >
              <div
                className="flex aspect-video w-full items-center justify-center bg-gradient-to-br from-[var(--color-ll-surface)]/[0.08] via-neutral-50 to-[var(--color-ll-accent-dim)]/[0.14]"
                aria-hidden
              >
                <s.Icon className="h-12 w-12 text-[var(--color-ll-surface)] opacity-90 transition duration-300 group-hover:scale-105 sm:h-14 sm:w-14" />
              </div>
              <div className="p-4 sm:p-6">
                <h2 className="text-lg font-semibold leading-snug text-neutral-900 sm:text-xl">
                  {s.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600 sm:text-base">
                  {s.summary}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedService(s)}
                  className="inline-flex min-h-11 items-center rounded-lg border border-neutral-300 bg-neutral-50 px-4 py-2 text-sm font-semibold text-neutral-900 hover:bg-neutral-100"
                >
                  View details
                </button>
                <Link
                  to="/contact"
                  className="inline-flex min-h-11 items-center rounded-lg bg-[var(--color-ll-accent)] px-4 py-2 text-sm font-semibold text-white no-underline hover:brightness-110"
                >
                  Request a quote
                </Link>
              </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {selectedService ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4"
          role="presentation"
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"
            aria-label="Close dialog"
            onClick={() => setSelectedService(null)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="service-details-title"
            className="relative z-10 max-h-[min(92dvh,100vh)] w-full max-w-2xl overflow-y-auto rounded-t-2xl border border-neutral-200 border-b-0 bg-white p-4 shadow-xl sm:max-h-[90vh] sm:rounded-xl sm:border-b sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <h2
                id="service-details-title"
                className="font-[family-name:var(--font-display)] text-lg font-bold leading-tight text-[#1a1a4b] sm:text-xl"
              >
                {selectedService.title} activities
              </h2>
              <button
                type="button"
                onClick={() => setSelectedService(null)}
                className="rounded-md p-1 text-neutral-500 hover:bg-neutral-100"
                aria-label="Close"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600">{selectedService.summary}</p>
            <ul className="mt-4 ml-5 list-disc space-y-2 text-sm text-neutral-700 sm:text-base">
              {selectedService.activities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-2">
              <Link
                to="/contact"
                onClick={() => setSelectedService(null)}
                className="inline-flex min-h-11 items-center rounded-lg bg-[var(--color-ll-accent)] px-4 py-2 text-sm font-semibold text-white no-underline hover:brightness-110"
              >
                Request a quote
              </Link>
              <button
                type="button"
                onClick={() => setSelectedService(null)}
                className="inline-flex min-h-11 items-center rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-semibold text-neutral-900 hover:bg-neutral-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
