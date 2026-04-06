import { useState } from "react";

export function ContactPage() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="min-h-[50vh] overflow-x-hidden px-3 py-10 sm:px-6 sm:py-16">
      <div className="mx-auto grid max-w-[1120px] grid-cols-1 gap-8 min-[480px]:gap-10 lg:grid-cols-2 lg:gap-12">
        <div className="min-w-0">
          <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold leading-tight text-[#1a1a4b] min-[400px]:text-3xl sm:text-4xl">
            Contact
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-neutral-600 sm:text-base">
            Replace placeholders with Liberia Libra Incorporated address, hours,
            department links, map embed, and form POST / Google Forms / API.
          </p>
          <ul className="mt-6 space-y-3 text-xs sm:mt-8 sm:space-y-4 sm:text-sm">
            <li>
              <strong className="text-neutral-900">Address</strong>
              <br />
              <span className="text-neutral-600">
                Adjacent Aminata Filling Station, Caldwell Road,
                <br />
                Monrovia Liberia
              </span>
            </li>
            <li>
              <strong className="text-neutral-900">Email</strong>
              <br />
              <a
                href="mailto:info@example.com"
                className="break-all text-[var(--color-ll-accent)] hover:underline sm:break-normal"
              >
                info@example.com
              </a>
            </li>
            <li>
              <strong className="text-neutral-900">Hours</strong>
              <br />
              <span className="text-neutral-600">
                Mon–Fri 8:00–17:00 · Sat 9:00–13:00
              </span>
            </li>
          </ul>
          <div className="mt-6 overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm sm:mt-8">
            <iframe
              title="Map"
              className="h-52 w-full border-0 min-[400px]:h-60 sm:h-64"
              loading="lazy"
              src="https://www.google.com/maps?q=Monrovia%20Liberia&output=embed"
            />
          </div>
        </div>

        <div className="min-w-0">
          <form
            onSubmit={handleSubmit}
            className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm sm:p-6"
          >
            <div className="space-y-3 sm:space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs font-medium text-neutral-900 sm:text-sm"
                >
                  Name *
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  className="mt-1 w-full min-h-11 rounded-lg border border-neutral-300 bg-neutral-50 px-3 py-2.5 text-base text-neutral-900 outline-none focus:border-[var(--color-ll-accent)] sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-medium text-neutral-900 sm:text-sm"
                >
                  Email *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="mt-1 w-full min-h-11 rounded-lg border border-neutral-300 bg-neutral-50 px-3 py-2.5 text-base text-neutral-900 outline-none focus:border-[var(--color-ll-accent)] sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-xs font-medium text-neutral-900 sm:text-sm"
                >
                  Phone *
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  className="mt-1 w-full min-h-11 rounded-lg border border-neutral-300 bg-neutral-50 px-3 py-2.5 text-base text-neutral-900 outline-none focus:border-[var(--color-ll-accent)] sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-xs font-medium text-neutral-900 sm:text-sm"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="mt-1 w-full rounded-lg border border-neutral-300 bg-neutral-50 px-3 py-2.5 text-base text-neutral-900 outline-none focus:border-[var(--color-ll-accent)] sm:text-sm"
                />
              </div>
            </div>
            {sent ? (
              <p className="mt-4 text-sm text-[var(--color-ll-accent)]" role="status">
                Demo: form submitted (connect your backend or form service).
              </p>
            ) : null}
            <button
              type="submit"
              className="mt-5 w-full min-h-11 rounded-lg bg-[var(--color-ll-accent)] py-3 text-sm font-semibold text-white hover:brightness-110 sm:mt-6 sm:w-auto sm:px-8"
            >
              Send message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
