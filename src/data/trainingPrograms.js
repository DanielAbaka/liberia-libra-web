/** @typedef {{ label: string, date: string }} TrainingKeyDate */

/**
 * @typedef {{ src: string, alt: string }} TrainingCoverImage
 * @typedef {Object} TrainingProgram
 * @property {string} id
 * @property {string} title
 * @property {string} category
 * @property {string} summary
 * @property {TrainingCoverImage} coverImage
 * @property {string[]} curriculum
 * @property {string} [schedule] Session-timing copy; shown under Duration and Schedule (and PDF) when no durationBlock.
 * @property {string} cost
 * @property {TrainingKeyDate[]} keyDates
 * @property {{ headline: string, summary: string, calendarWeekdays?: number[] }} [durationBlock] When set, Duration and Schedule tab shows headline + summary instead of dated milestones. `calendarWeekdays` uses `Date.getDay()` (0 Sun … 6 Sat) for month-grid highlights.
 */

/** @type {string[]} */
export const TRAINING_CATEGORIES = [
  "ICT Track",
  "Vocational Track",
  "Professional Track",
];

/** @type {TrainingProgram[]} */
export const TRAINING_PROGRAMS = [
  {
    id: "ict-track",
    title: "ICT Track",
    category: "ICT Track",
    coverImage: {
      src: "gallery/ict-track-cover.png",
      alt: "Students in a computer lab working at desktops with Liberia Libra on screen during ICT training",
    },
    summary:
      "One track covering everyday digital productivity and a practical web presence—labs, guided projects, and cohort-based milestones.",
    curriculum: [
      "Beginner Certificate Courses:",
      "Computer Fundamentals & Office Productivity",
      "Introduction to Programming",
      "Graphics Design Fundamentals",
      "Computer Networking Basics",
      "Cybersecurity Fundamentals",
      "Data Modeling & Access Basics",
      "Web Design Fundamentals (HTML & CSS)",
      "Digital Marketing Basics",
      "Video Editing Fundamentals",
      "Introduction to Artificial Intelligence (AI Basics)",
      "Intermediate Certificate Courses:",
      "Intermediate Office Productivity & Data Management",
      "Programming with Python or JavaScript",
      "Advanced Graphics Design & Branding",
      "Computer Networking (Routing & Switching Basics)",
      "Cybersecurity Operations & Threat Management",
      "Database Design & Advanced Access & SQL",
      "Web Development (Frontend Development)",
      "Digital Marketing Strategy & Analytics",
      "Professional Video Editing & Motion Graphics",
      "Data Analysis & Visualization",
      "Advanced Certificate Courses:",
      "Advanced Programming & Software Development",
      "Full-Stack Web Application Development",
      "Network Engineering & Infrastructure Management",
      "Advanced Cybersecurity & Ethical Hacking",
      "Data Engineering & Advanced SQL Optimization",
      "Cloud Computing & DevOps Practices",
      "Artificial Intelligence & Machine Learning",
      "Advanced Data Analytics & Business Intelligence",
      "UI/UX Design & Product Design",
      "IT Project Management & Digital Transformation",
    ],
    cost: `Materials fees and any toolkit deposits are confirmed at enrollment; scholarships and sponsor placements may apply.

Registrations: US$15.00
Fees: Beginner = US$60/ Intermediate = US$75/ Advanced = US$90
Open to beginners and professionals needing foundational or advanced skills.
First Installment Payment: 50% of course fees to start`,
    keyDates: [],
    durationBlock: {
      headline: "12 Weeks/24 Training Sessions",
      summary:
        "Intensive workshop blocks on Monday, Wednesday, and Friday / Tuesday and Thursday with afternoon sessions; Calendar aligns with tool and materials readiness—details at enrollment.",
    },
  },
  {
    id: "vocational-track",
    title: "Vocational Track",
    category: "Vocational Track",
    coverImage: {
      src: "gallery/cosmetology-training-01.png",
      alt: "Cosmetology trainees practicing beauty skills during an outdoor vocational session",
    },
    summary:
      "Hands-on trades training in the workshop: garment work from tools to small-batch output, plus supervised electrical fundamentals.",
    curriculum: [
      "Vocational Certificate Courses:",
      "Cosmetology & Beauty Therapy",
      "Interior Decoration & Space Styling",
      "Pastry & General Catering Services",
      "Fashion Design & Garment Making",
      "Tailoring & Textile Production",
      "Photography & Videography",
      "Shoe Making & Leather Works",
      "Soap Making & TieDie Making",
    ],
    cost: `Materials fees and any toolkit deposits are confirmed at enrollment; scholarships and sponsor placements may apply.

Registrations: US$15.00
Fees: US$100.00
Open to beginners and professionals developing core foundational skills.
First Installment Payment: 50% of course fees to start`,
    keyDates: [],
    durationBlock: {
      headline: "24 Weeks/52 Training Sessions",
      summary:
        "Intensive workshop blocks on Monday, Wednesday, and Friday with afternoon sessions; mandatory safety briefings before tool use. Calendar aligns with tool and materials readiness—details at enrollment.",
      calendarWeekdays: [1, 3, 5],
    },
  },
  {
    id: "professional-track",
    title: "Professional Track",
    category: "Professional Track",
    coverImage: {
      src: "gallery/professional-track-cover.png",
      alt: "Team of Liberia Libra staff and partners posing in front of a branded banner at an outdoor event",
    },
    summary:
      "Build supervisor confidence and delivery discipline in one track—people leadership plus practical project habits for non-specialists.",
    curriculum: [
      "Professional Certificate Courses:",
      "Customer Service & Communication Skills",
      "Entrepreneurship & Business Development Skills",
      "Job Readiness & Employability Skills",
      "Project Management Fundamentals",
      "Digital Literacy for Professionals",
      "Leadership & Team Management Skills",
      "Time Management & Workplace Productivity",
      "Financial Literacy & Budgeting Skills",
      "Public Speaking & Presentation Skills",
      "Workplace Ethics & Professional Conduct",
    ],
    cost: `Materials fees and any toolkit deposits are confirmed at enrollment; scholarships and sponsor placements may apply.

Registrations: US$15.00
Fees: US$100.00
Open to beginners and professionals seeking professional skill development.
First Installment Payment: 50% of course fees to start`,
    keyDates: [],
    durationBlock: {
      headline: "12 Weeks/24 Training Sessions",
      summary:
        "Intensive workshop blocks on Tuesday and Thursday with afternoon sessions; Calendar aligns with tool and materials readiness—details at enrollment.",
    },
  },
];

/**
 * ICT Track curriculum lines grouped for pre-enrollment (must match section headers in `curriculum`).
 * @type {{ beginner: string[], intermediate: string[], advanced: string[] }}
 */
export const ICT_TRACK_COURSES_BY_LEVEL = (() => {
  const ict = TRAINING_PROGRAMS.find((p) => p.id === "ict-track");
  const out = { beginner: [], intermediate: [], advanced: [] };
  if (!ict) return out;
  /** @type {"beginner"|"intermediate"|"advanced"|null} */
  let bucket = null;
  for (const line of ict.curriculum) {
    if (line === "Beginner Certificate Courses:") {
      bucket = "beginner";
      continue;
    }
    if (line === "Intermediate Certificate Courses:") {
      bucket = "intermediate";
      continue;
    }
    if (line === "Advanced Certificate Courses:") {
      bucket = "advanced";
      continue;
    }
    if (bucket && !line.endsWith(":")) {
      out[bucket].push(line);
    }
  }
  return out;
})();

/** @type {{ value: "beginner"|"intermediate"|"advanced", label: string }[]} */
export const ICT_TRAINING_LEVEL_OPTIONS = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
];

/** Vocational Track course titles for pre-enrollment (from curriculum, excluding section header). */
export const VOCATIONAL_TRACK_COURSES = (() => {
  const v = TRAINING_PROGRAMS.find((p) => p.id === "vocational-track");
  if (!v) return [];
  const out = [];
  for (const line of v.curriculum) {
    if (line === "Vocational Certificate Courses:") continue;
    if (!line.endsWith(":")) out.push(line);
  }
  return out;
})();

/** Professional Track course titles for pre-enrollment (from curriculum, excluding section header). */
export const PROFESSIONAL_TRACK_COURSES = (() => {
  const p = TRAINING_PROGRAMS.find((pr) => pr.id === "professional-track");
  if (!p) return [];
  const out = [];
  for (const line of p.curriculum) {
    if (line === "Professional Certificate Courses:") continue;
    if (!line.endsWith(":")) out.push(line);
  }
  return out;
})();

/**
 * @param {TrainingProgram[]} programs
 * @returns {{ date: string, label: string, programTitle: string, programId: string }[]}
 */
export function flattenTrainingDates(programs) {
  const rows = [];
  for (const p of programs) {
    for (const kd of p.keyDates) {
      rows.push({
        date: kd.date,
        label: kd.label,
        programTitle: p.title,
        programId: p.id,
      });
    }
  }
  rows.sort((a, b) => a.date.localeCompare(b.date) || a.programTitle.localeCompare(b.programTitle));
  return rows;
}

/**
 * Workshop-day summary per track (from `durationBlock`) for calendar sidebar / overview.
 * @param {TrainingProgram[]} programs
 * @returns {{ programId: string, programTitle: string, headline: string, workshopLine: string }[]}
 */
export function trainingSessionPatternsByTrack(programs) {
  const out = [];
  for (const p of programs) {
    if (!p.durationBlock) continue;
    const workshopLine = p.durationBlock.summary.split(";")[0].trim();
    out.push({
      programId: p.id,
      programTitle: p.title,
      headline: p.durationBlock.headline,
      workshopLine,
    });
  }
  return out;
}

/**
 * Union of weekday indices (0 Sun … 6 Sat) when any track runs workshops.
 * @param {TrainingProgram[]} programs
 * @returns {Set<number>}
 */
export function unionTrainingCalendarWeekdays(programs) {
  const u = new Set();
  for (const p of programs) {
    const days = p.durationBlock?.calendarWeekdays;
    if (!days?.length) continue;
    for (const d of days) u.add(d);
  }
  return u;
}
