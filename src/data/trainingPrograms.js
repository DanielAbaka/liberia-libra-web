/** @typedef {{ label: string, date: string }} TrainingKeyDate */

/**
 * @typedef {Object} TrainingProgram
 * @property {string} id
 * @property {string} title
 * @property {string} category
 * @property {string} summary
 * @property {string[]} curriculum
 * @property {string} schedule
 * @property {string} cost
 * @property {TrainingKeyDate[]} keyDates
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
    schedule:
      "Runs as sequenced modules with evening lab blocks and project time; exact session pattern is confirmed at intake. Typical pace is several weeks per module with breaks between cohorts.",
    cost: "Track fee quoted per intake; group, NGO, and installment options available—contact for the current schedule and pricing.",
    keyDates: [
      { label: "Info session", date: "2026-05-10" },
      { label: "Orientation week begins", date: "2026-05-04" },
      { label: "First module start", date: "2026-05-06" },
      { label: "Next module intake", date: "2026-06-02" },
    ],
  },
  {
    id: "vocational-track",
    title: "Vocational Track",
    category: "Vocational Track",
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
    schedule:
      "Intensive workshop blocks on fixed weekdays with morning sessions; electrical units include mandatory safety briefings before tool use. Calendar aligns with tool and materials readiness—details at enrollment.",
    cost: "Materials fees and any toolkit deposits are confirmed at enrollment; scholarships and sponsor placements may apply.",
    keyDates: [
      { label: "Open house", date: "2026-04-18" },
      { label: "Workshop block begins", date: "2026-05-12" },
      { label: "Mid-track showcase", date: "2026-06-20" },
      { label: "Safety briefing (required)", date: "2026-05-30" },
      { label: "Electrical practice block", date: "2026-06-06" },
    ],
  },
  {
    id: "professional-track",
    title: "Professional Track",
    category: "Professional Track",
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
    schedule:
      "Blended Saturdays and weekday evenings with discussion, cases, and short assignments between sessions. Hybrid options where noted in the intake letter.",
    cost: "Per participant with team caps; in-house delivery for organizations optional. Alumni and partner pricing on request.",
    keyDates: [
      { label: "Kickoff webinar", date: "2026-05-15" },
      { label: "Cohort launch", date: "2026-05-21" },
      { label: "Registration closes", date: "2026-06-01" },
      { label: "Mid-track intensive", date: "2026-06-07" },
      { label: "Project presentations", date: "2026-06-25" },
      { label: "Track completion", date: "2026-06-28" },
    ],
  },
];

export const TRAINING_BROCHURE_HREF = "/assets/libra-training-brochure.pdf";

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
