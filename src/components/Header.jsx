import { useState } from "react";
import { NavLink } from "react-router-dom";
import { publicAsset } from "../lib/publicAsset.js";

const nav = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/training", label: "Training" },
  { to: "/scholarship", label: "Scholarship" },
  { to: "/gallery", label: "Gallery" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

const linkClass = ({ isActive }) =>
  [
    "rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-200",
    isActive
      ? "bg-white/12 text-white shadow-sm ring-1 ring-white/15"
      : "text-white/70 hover:bg-white/[0.06] hover:text-white",
  ].join(" ");

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.07] bg-[color-mix(in_srgb,var(--color-ll-bg)_88%,transparent)] shadow-sm shadow-black/15 backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto flex max-w-[1120px] items-center justify-between gap-2 px-3 py-2 min-[400px]:gap-3 min-[400px]:px-4 sm:gap-4 sm:px-6 sm:py-2.5">
        <NavLink
          to="/"
          className="flex min-w-0 shrink items-center no-underline hover:opacity-95"
          aria-label="Liberia Libra Incorporated — Home"
        >
          <img
            src={publicAsset("libra-logo.png")}
            alt="Liberia Libra Incorporated"
            width={280}
            height={70}
            className="h-10 w-auto max-w-[min(16rem,calc(100vw-5rem))] object-contain object-left drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)] sm:h-11 sm:max-w-[19rem]"
            decoding="async"
            fetchPriority="high"
            loading="eager"
          />
        </NavLink>

        <nav
          className="hidden items-center gap-0.5 md:flex"
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
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border border-white/15 bg-white/[0.08] text-white shadow-md shadow-black/20 transition hover:bg-white/[0.12] md:hidden"
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
          className="border-t border-white/[0.07] bg-[color-mix(in_srgb,var(--color-ll-bg)_96%,transparent)] px-3 py-4 backdrop-blur-md sm:px-4 md:hidden"
          aria-label="Mobile"
        >
          <div className="mx-auto flex max-w-[1120px] flex-col gap-1">
            {nav.map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3.5 text-base font-medium no-underline transition-colors ${
                    isActive
                      ? "bg-white/12 text-white ring-1 ring-white/15"
                      : "text-white/85 hover:bg-white/[0.06]"
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
