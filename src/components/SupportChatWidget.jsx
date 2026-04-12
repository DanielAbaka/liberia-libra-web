import { useEffect, useId, useRef, useState } from "react";
import { Link } from "react-router-dom";

const SUPPORT_EMAIL = "liberialibrainc@gmail.com";

const INITIAL_BOT =
  "Hi — quick answers and links are below. For a detailed request, send us a message and we’ll follow up.";

const FAQ = [
  {
    id: "hours",
    prompt: "Office hours?",
    reply:
      "Office hours: Mon–Fri 8:00–17:00 · Sat 9:00–14:00. Use Contact for urgent requests.",
  },
  {
    id: "training",
    prompt: "Training programs?",
    reply:
      "We offer ICT, Vocational, and Professional tracks with curriculum and key dates on the Training page.",
    link: { to: "/training", label: "Open training" },
  },
  {
    id: "quote",
    prompt: "Request a quote?",
    reply:
      "Tell us what you need on the Services page (View details) or go straight to Contact.",
    link: { to: "/contact", label: "Contact us" },
  },
];

export function SupportChatWidget() {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [sent, setSent] = useState(false);
  const [messages, setMessages] = useState(() => [
    { role: "bot", text: INITIAL_BOT },
  ]);
  const panelId = useId();
  const listRef = useRef(null);
  const openBtnRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
    const t = window.setTimeout(() => inputRef.current?.focus(), 100);
    return () => window.clearTimeout(t);
  }, [open, messages]);

  function pushUser(text) {
    setMessages((m) => [...m, { role: "user", text }]);
  }

  function pushBot(text, link) {
    setMessages((m) => [...m, { role: "bot", text, link }]);
  }

  function handleFaq(item) {
    pushUser(item.prompt);
    pushBot(item.reply, item.link);
  }

  function handleSend(e) {
    e.preventDefault();
    const t = draft.trim();
    if (!t) return;
    const subject = encodeURIComponent("Liberia Libra — support chat");
    const body = encodeURIComponent(t);
    window.open(`mailto:${SUPPORT_EMAIL}?subject=${subject}&body=${body}`, "_blank");
    pushUser(t);
    pushBot("Thanks — your email app should open with this message. If it doesn’t, copy your note and use the Contact page.");
    setDraft("");
    setSent(true);
  }

  function close() {
    setOpen(false);
    openBtnRef.current?.focus();
  }

  return (
    <>
      <button
        ref={openBtnRef}
        type="button"
        onClick={() => {
          setOpen((o) => !o);
          if (open) setSent(false);
        }}
        className={`fixed bottom-4 right-4 z-[60] flex h-14 w-14 items-center justify-center rounded-full shadow-float ring-2 ring-white/90 transition hover:brightness-110 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ll-accent)] min-[400px]:bottom-6 min-[400px]:right-6 ${
          open ? "bg-neutral-800 ring-white/20" : "bg-[var(--color-ll-accent)]"
        } text-white`}
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        aria-label={open ? "Close support chat" : "Open support chat"}
      >
        {open ? <IconClose /> : <IconChat />}
      </button>

      {open ? (
        <>
          <button
            type="button"
            className="fixed inset-0 z-[55] bg-black/40 md:bg-transparent"
            aria-label="Close support chat"
            onClick={close}
          />
          <div
            id={panelId}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${panelId}-title`}
            className="fixed inset-x-0 bottom-0 z-[60] flex max-h-[min(88dvh,640px)] flex-col rounded-t-3xl border border-neutral-200/90 bg-white shadow-float ring-1 ring-black/[0.04] md:inset-auto md:bottom-6 md:right-6 md:w-[min(100vw-2rem,400px)] md:rounded-2xl"
          >
            <div className="flex items-center justify-between gap-2 border-b border-neutral-100 bg-neutral-50/50 px-4 py-3.5">
              <div className="min-w-0">
                <p
                  id={`${panelId}-title`}
                  className="font-[family-name:var(--font-display)] text-sm font-bold text-[#1a1a4b] sm:text-base"
                >
                  Quick support
                </p>
                <p className="text-xs text-neutral-500">Services · training · contact</p>
              </div>
              <button
                type="button"
                onClick={close}
                className="rounded-full p-2 text-neutral-500 transition hover:bg-neutral-200/80"
                aria-label="Close"
              >
                <IconClose className="h-5 w-5" />
              </button>
            </div>

            <div
              ref={listRef}
              className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-3"
            >
              {messages.map((msg, i) => (
                <div
                  key={`${msg.role}-${i}-${msg.text.slice(0, 12)}`}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[90%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-[var(--color-ll-accent)] text-white"
                        : "bg-neutral-100 text-neutral-800"
                    }`}
                  >
                    <p>{msg.text}</p>
                    {msg.role === "bot" && msg.link ? (
                      <Link
                        to={msg.link.to}
                        onClick={close}
                        className="mt-2 inline-flex text-sm font-semibold text-[var(--color-ll-accent)] underline"
                      >
                        {msg.link.label} →
                      </Link>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-neutral-200 px-4 py-3">
              <p className="mb-2 text-xs font-semibold text-neutral-600">Quick topics</p>
              <div className="flex flex-wrap gap-2">
                {FAQ.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleFaq(item)}
                    className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-xs font-medium text-neutral-800 hover:border-[var(--color-ll-accent)] hover:bg-white"
                  >
                    {item.prompt}
                  </button>
                ))}
              </div>
              <p className="mb-2 mt-4 text-xs font-semibold text-neutral-600">Jump to</p>
              <div className="flex flex-wrap gap-2">
                <Link
                  to="/services"
                  onClick={close}
                  className="rounded-full bg-[#1a1a4b] px-3 py-1.5 text-xs font-semibold text-white no-underline hover:brightness-110"
                >
                  Services
                </Link>
                <Link
                  to="/training"
                  onClick={close}
                  className="rounded-full bg-[#1a1a4b] px-3 py-1.5 text-xs font-semibold text-white no-underline hover:brightness-110"
                >
                  Training
                </Link>
                <Link
                  to="/gallery"
                  onClick={close}
                  className="rounded-full border border-[#1a1a4b] px-3 py-1.5 text-xs font-semibold text-[#1a1a4b] no-underline hover:bg-neutral-50"
                >
                  Gallery
                </Link>
                <Link
                  to="/blog"
                  onClick={close}
                  className="rounded-full border border-[#1a1a4b] px-3 py-1.5 text-xs font-semibold text-[#1a1a4b] no-underline hover:bg-neutral-50"
                >
                  Blog
                </Link>
                <Link
                  to="/contact"
                  onClick={close}
                  className="rounded-full border border-[var(--color-ll-accent)] px-3 py-1.5 text-xs font-semibold text-[var(--color-ll-accent)] no-underline hover:bg-red-50"
                >
                  Contact
                </Link>
              </div>

              <form onSubmit={handleSend} className="mt-4">
                <label htmlFor={`${panelId}-msg`} className="sr-only">
                  Message to support
                </label>
                <textarea
                  id={`${panelId}-msg`}
                  ref={inputRef}
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  rows={3}
                  placeholder="Type a short message… (opens your email)"
                  className="w-full resize-none rounded-xl border border-neutral-300 px-3 py-2 text-sm text-neutral-900 outline-none placeholder:text-neutral-400 focus:border-[var(--color-ll-accent)]"
                />
                <button
                  type="submit"
                  className="mt-2 w-full min-h-11 rounded-xl bg-[var(--color-ll-accent)] text-sm font-semibold text-white hover:brightness-110"
                >
                  Send via email
                </button>
                {sent ? (
                  <p className="mt-2 text-center text-xs text-neutral-500" role="status">
                    If your email app did not open, use the{" "}
                    <Link to="/contact" onClick={close} className="font-semibold text-[var(--color-ll-accent)]">
                      Contact
                    </Link>{" "}
                    page.
                  </p>
                ) : null}
              </form>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}

function IconChat() {
  return (
    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3C7.03 3 3 6.58 3 11c0 2.13 1.03 4.05 2.71 5.4L4 21l4.85-1.62A9.3 9.3 0 0012 19c4.97 0 9-3.58 9-8s-4.03-8-9-8z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="11" r="1" fill="currentColor" />
      <circle cx="12" cy="11" r="1" fill="currentColor" />
      <circle cx="15" cy="11" r="1" fill="currentColor" />
    </svg>
  );
}

function IconClose({ className = "h-6 w-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
      <path d="M18 6L6 18M6 6l12 12" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
