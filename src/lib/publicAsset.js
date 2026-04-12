/** Public folder URL — respects Vite `base` (e.g. GitHub Pages subpath). */
export function publicAsset(filename) {
  const base = import.meta.env.BASE_URL || "/";
  const name = filename.startsWith("/") ? filename.slice(1) : filename;
  return `${base}${name}`;
}
