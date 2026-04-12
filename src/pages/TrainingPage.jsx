import { useEffect, useId, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import {
  splitCostForBoldSegments,
  splitScheduleForBoldSegments,
} from "../lib/trainingCostBold.js";
import {
  ICT_TRACK_COURSES_BY_LEVEL,
  ICT_TRAINING_LEVEL_OPTIONS,
  PROFESSIONAL_TRACK_COURSES,
  TRAINING_CATEGORIES,
  TRAINING_PROGRAMS,
  VOCATIONAL_TRACK_COURSES,
  flattenTrainingDates,
} from "../data/trainingPrograms.js";
import { publicAsset } from "../lib/publicAsset.js";

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  message: "",
  trainingLevel: "",
  trainingCourse: "",
  vocationalCourse: "",
};

const DETAIL_TABS = [
  { id: "curriculum", label: "Curriculum" },
  { id: "cost", label: "Cost" },
  { id: "dates", label: "Duration and Schedule" },
];

function formatLongDate(iso) {
  try {
    return new Date(`${iso}T12:00:00`).toLocaleDateString(undefined, {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

function pad2(n) {
  return String(n).padStart(2, "0");
}

function MonthCalendar({ year, month, highlightSet }) {
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  const startPad = first.getDay();
  const totalDays = last.getDate();
  const cells = [];
  for (let i = 0; i < startPad; i++) cells.push(null);
  for (let d = 1; d <= totalDays; d++) cells.push(d);
  const label = first.toLocaleDateString(undefined, { month: "long", year: "numeric" });

  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-3 shadow-sm sm:p-4">
      <p className="text-center text-sm font-semibold text-[#1a1a4b]">{label}</p>
      <div className="mt-3 grid grid-cols-7 gap-1 text-center text-[0.65rem] font-medium text-neutral-500 sm:text-xs">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
          <div key={d} className="py-1">
            {d}
          </div>
        ))}
        {cells.map((day, i) => {
          if (day == null) {
            return <div key={`e-${i}`} className="min-h-8 sm:min-h-9" />;
          }
          const key = `${year}-${pad2(month + 1)}-${pad2(day)}`;
          const hit = highlightSet.has(key);
          return (
            <div
              key={key}
              className={`flex min-h-8 items-center justify-center rounded-md text-xs sm:min-h-9 sm:text-sm ${
                hit
                  ? "bg-[var(--color-ll-accent)] font-semibold text-white"
                  : "text-neutral-800"
              }`}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ModalChrome({ children, titleId, onClose, wide }) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:p-4 sm:items-center"
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"
        aria-label="Close dialog"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={`relative z-10 max-h-[min(92dvh,100vh)] w-full overflow-y-auto rounded-t-2xl border border-neutral-200 border-b-0 bg-white p-4 shadow-xl sm:max-h-[90vh] sm:rounded-xl sm:border-b sm:p-6 ${wide ? "max-w-2xl" : "max-w-lg"}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export function TrainingPage() {
  const enrollTitleId = useId();
  const detailsTitleId = useId();
  const searchId = useId();

  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");

  const [detailsProgram, setDetailsProgram] = useState(null);
  const [detailTab, setDetailTab] = useState("curriculum");

  const [enrollOpen, setEnrollOpen] = useState(false);
  const [enrollLabel, setEnrollLabel] = useState("");
  const [enrollProgramId, setEnrollProgramId] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [sent, setSent] = useState(false);

  const [calYear, setCalYear] = useState(() => new Date().getFullYear());
  const [calMonth, setCalMonth] = useState(() => new Date().getMonth());

  const filteredPrograms = useMemo(() => {
    const q = query.trim().toLowerCase();
    return TRAINING_PROGRAMS.filter((p) => {
      if (category !== "all" && p.category !== category) return false;
      if (!q) return true;
      const blob = `${p.title} ${p.category} ${p.summary} ${p.curriculum.join(" ")}`.toLowerCase();
      return blob.includes(q);
    });
  }, [category, query]);

  const allFlatDates = useMemo(() => flattenTrainingDates(TRAINING_PROGRAMS), []);

  const highlightSet = useMemo(() => {
    const s = new Set();
    for (const row of allFlatDates) {
      s.add(row.date);
    }
    return s;
  }, [allFlatDates]);

  const upcomingList = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    return allFlatDates.filter((r) => r.date >= today).slice(0, 12);
  }, [allFlatDates]);

  const modalOpen = enrollOpen || detailsProgram != null;

  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        setDetailsProgram(null);
        setEnrollOpen(false);
        setSent(false);
        setEnrollProgramId(null);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [modalOpen]);

  useEffect(() => {
    if (!modalOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [modalOpen]);

  function openDetails(p) {
    setDetailTab("curriculum");
    setDetailsProgram(p);
  }

  function openEnroll(programTitle, programId = null) {
    setEnrollLabel(programTitle);
    setEnrollProgramId(programId);
    setForm({ ...initialForm });
    setSent(false);
    setEnrollOpen(true);
  }

  function closeEnroll() {
    setEnrollOpen(false);
    setSent(false);
    setEnrollProgramId(null);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
  }

  function updateField(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function shiftMonth(delta) {
    const d = new Date(calYear, calMonth + delta, 1);
    setCalYear(d.getFullYear());
    setCalMonth(d.getMonth());
  }

  return (
    <div className="min-h-[50vh] overflow-x-hidden px-3 py-10 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-[1120px]">
        <p className="text-[0.65rem] font-bold uppercase tracking-wider text-[#5a7a2e] sm:text-xs">
          Programs
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-bold leading-tight text-[#1a1a4b] min-[400px]:text-3xl sm:text-4xl">
          Training programs
        </h1>
        <span
          className="mt-4 inline-block h-1 w-14 rounded-full bg-[var(--color-ll-accent)]"
          aria-hidden
        />
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-neutral-600 sm:text-base">
          Each card is a full training track. Filter or search, open a track for
          curriculum, cost, and duration and session timing, review the calendar, and
          download the brochure.
        </p>

        <div className="mt-8 rounded-2xl border border-neutral-200/90 bg-gradient-to-br from-white to-neutral-50/80 p-4 shadow-card sm:mt-10 sm:p-5">
          <div className="flex flex-col gap-4 min-[480px]:flex-row min-[480px]:items-stretch min-[480px]:gap-4">
            <div className="min-w-0 flex-1">
              <label htmlFor={searchId} className="sr-only">
                Search tracks
              </label>
              <input
                id={searchId}
                type="search"
                placeholder="Search tracks…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full min-h-11 rounded-xl border border-neutral-200 bg-white px-3 py-2.5 text-base text-neutral-900 shadow-sm outline-none ring-[var(--color-ll-accent)]/0 transition placeholder:text-neutral-400 focus:border-[var(--color-ll-accent)] focus:ring-2 focus:ring-[var(--color-ll-accent)]/20 sm:text-sm"
                autoComplete="off"
              />
            </div>
            <button
              type="button"
              onClick={async () => {
                const { downloadLiberiaLibraBrochurePdf } = await import(
                  "../lib/generateLiberiaLibraBrochurePdf.js"
                );
                await downloadLiberiaLibraBrochurePdf();
              }}
              className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-xl border border-neutral-200 bg-white px-5 text-sm font-semibold text-[#1a1a4b] shadow-sm transition hover:border-[var(--color-ll-accent)]/40 hover:text-[var(--color-ll-accent)]"
            >
              Download brochure (PDF)
            </button>
          </div>
        </div>

        <nav
          className="mt-6 flex flex-wrap gap-2"
          aria-label="Filter by track type"
        >
          <button
            type="button"
            onClick={() => setCategory("all")}
            className={`min-h-9 rounded-full border px-3 py-1.5 text-xs font-semibold transition sm:px-4 sm:text-sm ${
              category === "all"
                ? "border-[var(--color-ll-accent)] bg-[var(--color-ll-accent)] text-white shadow-md shadow-[var(--color-ll-accent)]/25"
                : "border-neutral-300 bg-white text-neutral-800 hover:border-[var(--color-ll-accent)] hover:text-[var(--color-ll-accent)]"
            }`}
          >
            All
          </button>
          {TRAINING_CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={`min-h-9 rounded-full border px-3 py-1.5 text-xs font-semibold transition sm:px-4 sm:text-sm ${
                category === c
                  ? "border-[var(--color-ll-accent)] bg-[var(--color-ll-accent)] text-white shadow-md shadow-[var(--color-ll-accent)]/25"
                  : "border-neutral-300 bg-white text-neutral-800 hover:border-[var(--color-ll-accent)] hover:text-[var(--color-ll-accent)]"
              }`}
            >
              {c}
            </button>
          ))}
        </nav>

        <p className="mt-4 text-xs font-medium text-neutral-500 sm:text-sm" aria-live="polite">
          Showing {filteredPrograms.length} of {TRAINING_PROGRAMS.length} tracks
        </p>

        <ul className="mt-6 grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 min-[480px]:gap-6 lg:grid-cols-3">
          {filteredPrograms.map((p) => (
            <li key={p.id} className="flex min-h-0 min-w-0">
              <article className="group flex min-h-full w-full min-w-0 flex-col overflow-hidden rounded-2xl border border-neutral-200/90 bg-white shadow-card transition duration-300 hover:-translate-y-0.5 hover:border-[var(--color-ll-accent)]/25 hover:shadow-lg">
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-200">
                  <img
                    src={publicAsset(p.coverImage.src)}
                    alt={p.coverImage.alt}
                    width={640}
                    height={400}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent"
                    aria-hidden
                  />
                </div>
                <div className="flex flex-1 flex-col p-4 min-[480px]:p-5">
                  <p className="text-[0.65rem] font-bold uppercase tracking-wider text-[#5a7a2e]">
                    {p.category}
                  </p>
                  <h2 className="mt-1 font-[family-name:var(--font-display)] text-lg font-bold leading-snug text-[#1a1a4b] sm:text-xl">
                    {p.title}
                  </h2>
                  <span
                    className="mt-2 inline-block h-1 w-10 rounded-full bg-[var(--color-ll-accent)]"
                    aria-hidden
                  />
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-neutral-600">
                    {p.summary}
                  </p>
                  <div className="mt-5 flex flex-col gap-2 min-[400px]:flex-row min-[400px]:flex-wrap min-[400px]:items-center">
                    <button
                      type="button"
                      onClick={() => openDetails(p)}
                      className="inline-flex min-h-10 items-center justify-center rounded-full border border-neutral-200 bg-white px-4 text-sm font-semibold text-[#1a1a4b] shadow-sm transition hover:border-[var(--color-ll-accent)]/40 hover:bg-neutral-50"
                    >
                      View details
                    </button>
                    <button
                      type="button"
                      onClick={() => openEnroll(p.title, p.id)}
                      className="inline-flex min-h-10 items-center gap-1 text-sm font-semibold text-[var(--color-ll-accent)] transition hover:gap-2 hover:underline min-[400px]:px-2"
                    >
                      Register interest <span aria-hidden>→</span>
                    </button>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>

        {filteredPrograms.length === 0 ? (
          <p className="mt-8 rounded-lg border border-dashed border-neutral-300 bg-neutral-50 p-6 text-center text-sm text-neutral-600">
            No tracks match your filters. Try &quot;All&quot; or clear the search.
          </p>
        ) : null}

        <section
          className="mt-12 border-t border-neutral-200 pt-10 sm:mt-16 sm:pt-12"
          aria-labelledby="cal-heading"
        >
          <h2
            id="cal-heading"
            className="font-[family-name:var(--font-display)] text-xl font-bold text-[#1a1a4b] sm:text-2xl"
          >
            Training calendar
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-neutral-600">
            Month view highlights any day with a scheduled milestone across tracks.
            Use the arrows to browse months.
          </p>
          <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-start">
            <div className="w-full max-w-md shrink-0">
              <div className="mb-3 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => shiftMonth(-1)}
                  className="rounded-lg border border-neutral-300 px-3 py-1.5 text-sm font-medium text-neutral-800 hover:bg-neutral-50"
                >
                  ← Prev
                </button>
                <button
                  type="button"
                  onClick={() => shiftMonth(1)}
                  className="rounded-lg border border-neutral-300 px-3 py-1.5 text-sm font-medium text-neutral-800 hover:bg-neutral-50"
                >
                  Next →
                </button>
              </div>
              <MonthCalendar year={calYear} month={calMonth} highlightSet={highlightSet} />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-semibold text-neutral-900">Upcoming milestones</h3>
              <ul className="mt-3 divide-y divide-neutral-200 rounded-xl border border-neutral-200 bg-white">
                {upcomingList.length === 0 ? (
                  <li className="p-4 text-sm text-neutral-500">No upcoming dates on file.</li>
                ) : (
                  upcomingList.map((row) => (
                    <li
                      key={`${row.programId}-${row.date}-${row.label}`}
                      className="flex flex-col gap-0.5 p-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:p-4"
                    >
                      <div>
                        <p className="text-sm font-medium text-neutral-900">{row.label}</p>
                        <p className="text-xs text-neutral-600">{row.programTitle}</p>
                      </div>
                      <time
                        dateTime={row.date}
                        className="shrink-0 text-sm font-semibold text-[var(--color-ll-accent)]"
                      >
                        {formatLongDate(row.date)}
                      </time>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>
        </section>

      </div>

      {detailsProgram
        ? createPortal(
            <ModalChrome titleId={detailsTitleId} wide onClose={() => setDetailsProgram(null)}>
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h2
                id={detailsTitleId}
                className="font-[family-name:var(--font-display)] text-lg font-bold leading-tight text-[#1a1a4b] sm:text-xl"
              >
                {detailsProgram.title}
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setDetailsProgram(null)}
              className="shrink-0 rounded-md p-1 text-neutral-500 hover:bg-neutral-100"
              aria-label="Close"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div
            role="tablist"
            aria-label="Track details"
            className="mt-4 flex flex-wrap gap-1 border-b border-neutral-200 pb-2"
          >
            {DETAIL_TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={detailTab === t.id}
                onClick={() => setDetailTab(t.id)}
                className={`rounded-md px-3 py-1.5 text-xs font-semibold sm:text-sm ${
                  detailTab === t.id
                    ? "bg-[var(--color-ll-accent)] text-white"
                    : "text-neutral-700 hover:bg-neutral-100"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="mt-4 text-sm text-neutral-700">
            {detailTab === "curriculum" ? (
              <ul className="space-y-2">
                {detailsProgram.curriculum.map((line) => (
                  <li
                    key={line}
                    className={
                      line === "Beginner Certificate Courses:" ||
                      line === "Intermediate Certificate Courses:" ||
                      line === "Advanced Certificate Courses:" ||
                      line === "Professional Certificate Courses:" ||
                      line === "Vocational Certificate Courses:"
                        ? "mt-4 text-base font-bold text-[#1a1a4b] first:mt-0 sm:text-lg"
                        : "ml-5 list-item list-disc"
                    }
                  >
                    {line}
                  </li>
                ))}
              </ul>
            ) : null}
            {detailTab === "cost" ? (
              <div className="leading-relaxed">
                {detailsProgram.cost.split("\n").map((line, i) =>
                  line === "" ? (
                    <br key={`e-${i}`} />
                  ) : (
                    <p key={i} className="mb-1 last:mb-0">
                      {splitCostForBoldSegments(line).map((seg, j) =>
                        seg.bold ? (
                          <strong key={j} className="font-semibold text-neutral-900">
                            {seg.text}
                          </strong>
                        ) : (
                          <span key={j}>{seg.text}</span>
                        )
                      )}
                    </p>
                  )
                )}
              </div>
            ) : null}
            {detailTab === "dates" ? (
              detailsProgram.durationBlock ? (
                <div className="space-y-4">
                  <p className="text-base font-semibold text-neutral-900 sm:text-lg">
                    {detailsProgram.durationBlock.headline}
                  </p>
                  <p className="leading-relaxed text-neutral-700">
                    {splitScheduleForBoldSegments(detailsProgram.durationBlock.summary).map(
                      (seg, j) =>
                        seg.bold ? (
                          <strong key={j} className="font-semibold text-neutral-900">
                            {seg.text}
                          </strong>
                        ) : (
                          <span key={j}>{seg.text}</span>
                        )
                    )}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {detailsProgram.schedule ? (
                    <p className="leading-relaxed text-neutral-700">
                      {splitScheduleForBoldSegments(detailsProgram.schedule).map((seg, j) =>
                        seg.bold ? (
                          <strong key={j} className="font-semibold text-neutral-900">
                            {seg.text}
                          </strong>
                        ) : (
                          <span key={j}>{seg.text}</span>
                        )
                      )}
                    </p>
                  ) : null}
                  <ul className="space-y-3">
                    {detailsProgram.keyDates.map((kd) => (
                      <li
                        key={`${kd.date}-${kd.label}`}
                        className="flex flex-col gap-0.5 border-b border-neutral-100 pb-3 last:border-0 sm:flex-row sm:justify-between"
                      >
                        <span className="font-medium text-neutral-900">{kd.label}</span>
                        <time className="text-[var(--color-ll-accent)]" dateTime={kd.date}>
                          {formatLongDate(kd.date)}
                        </time>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            ) : null}
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => {
                openEnroll(detailsProgram.title, detailsProgram.id);
                setDetailsProgram(null);
              }}
              className="min-h-11 rounded-lg bg-[var(--color-ll-accent)] px-4 py-2 text-sm font-semibold text-white hover:brightness-110"
            >
              Register interest
            </button>
            <button
              type="button"
              onClick={() => setDetailsProgram(null)}
              className="min-h-11 rounded-lg border border-neutral-300 px-4 py-2 text-sm font-semibold text-neutral-800 hover:bg-neutral-50"
            >
              Close
            </button>
          </div>
            </ModalChrome>,
            document.body,
          )
        : null}

      {enrollOpen
        ? createPortal(
            <ModalChrome titleId={enrollTitleId} onClose={closeEnroll}>
          <div className="flex items-start justify-between gap-3">
            <h2
              id={enrollTitleId}
              className="font-[family-name:var(--font-display)] text-lg font-bold leading-tight text-[#1a1a4b] sm:text-xl"
            >
              Course pre-enrollment
            </h2>
            <button
              type="button"
              onClick={closeEnroll}
              className="rounded-md p-1 text-neutral-500 hover:bg-neutral-100"
              aria-label="Close"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="mt-1 text-xs text-neutral-600 sm:text-sm">
            Tell us how to reach you—we’ll follow up with schedule and next steps.
          </p>

          {sent ? (
            <>
              <p
                className="mt-5 rounded-lg border border-neutral-200 bg-neutral-50 p-3 text-sm leading-relaxed text-neutral-800 sm:p-4"
                role="status"
              >
                Thank you, <strong>{form.fullName || "there"}</strong>. Your interest in{" "}
                <strong>{enrollLabel}</strong> has been recorded (demo—connect to your
                backend or form service).
                {enrollProgramId === "ict-track" && form.trainingLevel ? (
                  <>
                    {" "}
                    Training level:{" "}
                    <strong>
                      {ICT_TRAINING_LEVEL_OPTIONS.find((o) => o.value === form.trainingLevel)
                        ?.label ?? form.trainingLevel}
                    </strong>
                    . Course: <strong>{form.trainingCourse}</strong>.
                  </>
                ) : null}
                {enrollProgramId === "vocational-track" && form.vocationalCourse ? (
                  <> Course: <strong>{form.vocationalCourse}</strong>.</>
                ) : null}
                {enrollProgramId === "professional-track" && form.professionalCourse ? (
                  <> Course: <strong>{form.professionalCourse}</strong>.</>
                ) : null}
              </p>
              <button
                type="button"
                onClick={closeEnroll}
                className="mt-5 w-full min-h-11 rounded-lg bg-[var(--color-ll-accent)] py-2.5 text-sm font-semibold text-white hover:brightness-110 sm:w-auto sm:px-8"
              >
                Close
              </button>
            </>
          ) : (
            <form className="mt-5 space-y-3 sm:space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="pre-course" className="block text-xs font-medium sm:text-sm">
                  Program
                </label>
                <input
                  id="pre-course"
                  readOnly
                  value={enrollLabel}
                  className="mt-1 w-full min-h-11 cursor-default rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2.5 text-sm text-neutral-800"
                />
              </div>
              {enrollProgramId === "ict-track" ? (
                <>
                  <div>
                    <label htmlFor="pre-ict-level" className="block text-xs font-medium sm:text-sm">
                      Training level *
                    </label>
                    <select
                      id="pre-ict-level"
                      name="trainingLevel"
                      required
                      value={form.trainingLevel}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          trainingLevel: e.target.value,
                          trainingCourse: "",
                        }))
                      }
                      className="mt-1 w-full min-h-11 rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-base outline-none focus:border-[var(--color-ll-accent)] sm:text-sm"
                    >
                      <option value="">Select level…</option>
                      {ICT_TRAINING_LEVEL_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="pre-ict-course" className="block text-xs font-medium sm:text-sm">
                      Training course *
                    </label>
                    <select
                      id="pre-ict-course"
                      name="trainingCourse"
                      required
                      disabled={!form.trainingLevel}
                      value={form.trainingCourse}
                      onChange={(e) => updateField("trainingCourse", e.target.value)}
                      className="mt-1 w-full min-h-11 rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-base outline-none focus:border-[var(--color-ll-accent)] disabled:cursor-not-allowed disabled:bg-neutral-50 disabled:text-neutral-500 sm:text-sm"
                    >
                      <option value="">
                        {form.trainingLevel ? "Select a course…" : "Select training level first"}
                      </option>
                      {(ICT_TRACK_COURSES_BY_LEVEL[form.trainingLevel] ?? []).map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              ) : null}
              {enrollProgramId === "vocational-track" ? (
                <div>
                  <label htmlFor="pre-voc-course" className="block text-xs font-medium sm:text-sm">
                    Course *
                  </label>
                  <select
                    id="pre-voc-course"
                    name="vocationalCourse"
                    required
                    value={form.vocationalCourse}
                    onChange={(e) => updateField("vocationalCourse", e.target.value)}
                    className="mt-1 w-full min-h-11 rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-base outline-none focus:border-[var(--color-ll-accent)] sm:text-sm"
                  >
                    <option value="">Select a course…</option>
                    {VOCATIONAL_TRACK_COURSES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              ) : null}
              {enrollProgramId === "professional-track" ? (
                <div>
                  <label htmlFor="pre-prof-course" className="block text-xs font-medium sm:text-sm">
                    Course *
                  </label>
                  <select
                    id="pre-prof-course"
                    name="professionalCourse"
                    required
                    value={form.professionalCourse}
                    onChange={(e) => updateField("professionalCourse", e.target.value)}
                    className="mt-1 w-full min-h-11 rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-base outline-none focus:border-[var(--color-ll-accent)] sm:text-sm"
                  >
                    <option value="">Select a course…</option>
                    {PROFESSIONAL_TRACK_COURSES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              ) : null}
              <div>
                <label htmlFor="pre-name" className="block text-xs font-medium sm:text-sm">
                  Full name *
                </label>
                <input
                  id="pre-name"
                  name="fullName"
                  required
                  autoComplete="name"
                  value={form.fullName}
                  onChange={(e) => updateField("fullName", e.target.value)}
                  className="mt-1 w-full min-h-11 rounded-lg border border-neutral-300 px-3 py-2.5 text-base outline-none focus:border-[var(--color-ll-accent)] sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="pre-email" className="block text-xs font-medium sm:text-sm">
                  Email *
                </label>
                <input
                  id="pre-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className="mt-1 w-full min-h-11 rounded-lg border border-neutral-300 px-3 py-2.5 text-base outline-none focus:border-[var(--color-ll-accent)] sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="pre-phone" className="block text-xs font-medium sm:text-sm">
                  Phone
                </label>
                <input
                  id="pre-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  className="mt-1 w-full min-h-11 rounded-lg border border-neutral-300 px-3 py-2.5 text-base outline-none focus:border-[var(--color-ll-accent)] sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="pre-message" className="block text-xs font-medium sm:text-sm">
                  Message <span className="font-normal text-neutral-500">(optional)</span>
                </label>
                <textarea
                  id="pre-message"
                  name="message"
                  rows={3}
                  value={form.message}
                  onChange={(e) => updateField("message", e.target.value)}
                  className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-base outline-none focus:border-[var(--color-ll-accent)] sm:text-sm"
                />
              </div>
              <div className="flex flex-col gap-2 pt-2 min-[400px]:flex-row">
                <button
                  type="submit"
                  className="min-h-11 w-full rounded-lg bg-[var(--color-ll-accent)] px-5 py-2.5 text-sm font-semibold text-white hover:brightness-110 min-[400px]:w-auto"
                >
                  Submit registration
                </button>
                <button
                  type="button"
                  onClick={closeEnroll}
                  className="min-h-11 w-full rounded-lg border border-neutral-300 px-5 py-2.5 text-sm font-semibold hover:bg-neutral-50 min-[400px]:w-auto"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
            </ModalChrome>,
            document.body,
          )
        : null}
    </div>
  );
}
