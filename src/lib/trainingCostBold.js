/** Substrings to emphasize in training cost copy (modal + PDF). */
const BOLD_COST_RE =
  /(US\$15\.00|US\$100\.00|US\$60|US\$75|US\$90|50%)/g;

/** Weekday blocks to emphasize in schedule / duration copy (modal + PDF). */
const SCHEDULE_DAYS_RE =
  /(Monday, Wednesday, and Friday|Tuesday and Thursday)/g;

/**
 * @param {string} str
 * @param {RegExp} pattern
 * @returns {{ bold: boolean, text: string }[]}
 */
function splitBoldSegments(str, pattern) {
  const out = [];
  let last = 0;
  let m;
  const re = new RegExp(pattern.source, "g");
  while ((m = re.exec(str)) !== null) {
    if (m.index > last) {
      out.push({ bold: false, text: str.slice(last, m.index) });
    }
    out.push({ bold: true, text: m[0] });
    last = m.index + m[0].length;
  }
  if (last < str.length) {
    out.push({ bold: false, text: str.slice(last) });
  }
  if (out.length === 0) {
    out.push({ bold: false, text: str });
  }
  return out;
}

/**
 * @returns {{ bold: boolean, text: string }[]}
 */
export function splitCostForBoldSegments(str) {
  return splitBoldSegments(str, BOLD_COST_RE);
}

/**
 * @returns {{ bold: boolean, text: string }[]}
 */
export function splitScheduleForBoldSegments(str) {
  return splitBoldSegments(str, SCHEDULE_DAYS_RE);
}
