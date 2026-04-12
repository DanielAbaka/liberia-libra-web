/**
 * Liberia national public holidays for calendar display (approximate rules).
 * Movable dates follow common published patterns; verify against official gazettes yearly.
 * @see https://www.officeholidays.com/countries/liberia
 */

function pad2(n) {
  return String(n).padStart(2, "0");
}

/**
 * @param {number} year
 * @param {number} monthIndex 0–11
 * @param {number} weekday 0 Sun … 6 Sat
 * @param {number} n 1 = first, 2 = second, …
 */
function nthWeekdayOfMonth(year, monthIndex, weekday, n) {
  let count = 0;
  const last = new Date(year, monthIndex + 1, 0).getDate();
  for (let d = 1; d <= last; d++) {
    const dt = new Date(year, monthIndex, d);
    if (dt.getDay() === weekday) {
      count++;
      if (count === n) return dt;
    }
  }
  return null;
}

/**
 * @param {number} year
 * @returns {Map<string, string>} ISO date → holiday label
 */
export function liberiaPublicHolidaysMapForYear(year) {
  const map = new Map();

  function add(month1to12, day, label) {
    const iso = `${year}-${pad2(month1to12)}-${pad2(day)}`;
    map.set(iso, label);
  }

  add(1, 1, "New Year's Day");
  add(1, 7, "Pioneers Day");
  add(2, 11, "Armed Forces Day");

  const decoration = nthWeekdayOfMonth(year, 2, 3, 2);
  if (decoration) add(3, decoration.getDate(), "Decoration Day");

  add(3, 15, "J.J. Roberts' Birthday");
  const jj = new Date(year, 2, 15);
  if (jj.getDay() === 0) add(3, 16, "J.J. Roberts' Birthday (observed)");

  const fastPray = nthWeekdayOfMonth(year, 3, 5, 2);
  if (fastPray) add(4, fastPray.getDate(), "Fast and Prayer Day");

  add(4, 12, "National Redemption Day");
  add(5, 14, "National Unification Day");

  add(7, 26, "Independence Day");
  const ind = new Date(year, 6, 26);
  if (ind.getDay() === 0) add(7, 27, "Independence Day (observed)");

  add(8, 24, "Flag Day");

  const thanks = nthWeekdayOfMonth(year, 10, 4, 1);
  if (thanks) add(11, thanks.getDate(), "National Thanksgiving Day");

  add(11, 29, "William V.S. Tubman's Birthday");
  const tub = new Date(year, 10, 29);
  if (tub.getDay() === 0) add(11, 30, "William V.S. Tubman's Birthday (observed)");

  add(12, 25, "Christmas Day");

  return map;
}

/**
 * @param {number} year
 * @param {number} monthIndex 0–11
 * @returns {Map<string, string>}
 */
export function liberiaPublicHolidaysInMonth(year, monthIndex) {
  const all = liberiaPublicHolidaysMapForYear(year);
  const prefix = `${year}-${pad2(monthIndex + 1)}-`;
  const out = new Map();
  for (const [iso, label] of all) {
    if (iso.startsWith(prefix)) out.set(iso, label);
  }
  return out;
}
