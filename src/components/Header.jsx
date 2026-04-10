import { useState } from "react";
import { NavLink } from "react-router-dom";

const nav = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/training", label: "Training" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

const linkClass = ({ isActive }) =>
  [
    "rounded-md px-2 py-1 text-sm font-medium transition-colors",
    isActive
      ? "bg-[var(--color-ll-surface)] text-white"
      : "text-[var(--color-ll-muted)] hover:text-white",
  ].join(" ");

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ll-bg/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1120px] items-center justify-between gap-2 px-3 py-3 min-[400px]:gap-3 min-[400px]:px-4 sm:gap-4 sm:px-6 sm:py-4">
        <NavLink
          to="/"
          className="min-w-0 max-w-[min(100%,11rem)] font-[family-name:var(--font-display)] text-xs font-bold leading-tight text-white no-underline hover:opacity-90 min-[360px]:max-w-[min(100%,14rem)] min-[360px]:text-sm sm:max-w-none sm:text-lg"
        >
          Liberia Libra Incorporated
        </NavLink>

        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Primary"
        >
          {nav.map(({ to, label, end }) => (
            <NavLink key={to} to={to} end={end} className={linkClass}>
              {label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-[var(--color-ll-surface)] text-white md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="h-0.5 w-5 bg-current" />
          <span className="h-0.5 w-5 bg-current" />
          <span className="h-0.5 w-5 bg-current" />
        </button>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          className="border-t border-white/10 bg-[var(--color-ll-bg)] px-3 py-3 sm:px-4 sm:py-4 md:hidden"
          aria-label="Mobile"
        >
          <div className="mx-auto flex max-w-[1120px] flex-col gap-0.5 sm:gap-1">
            {nav.map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-3 text-base no-underline ${
                    isActive
                      ? "bg-[var(--color-ll-surface)] text-[var(--color-ll-accent)]"
                      : "text-white/90 hover:bg-white/5"
                  }`
                }
                onClick={() => setOpen(false)}
              >
                {label}
              </NavLink>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
