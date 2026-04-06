import { useState } from "react";
import { BLOG_POSTS } from "../data/blogPosts.js";

export function BlogPage() {
  const [selectedPost, setSelectedPost] = useState(null);

  return (
    <div className="min-h-[50vh] overflow-x-hidden px-3 py-10 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-[1120px]">
        <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold leading-tight text-[#1a1a4b] min-[400px]:text-3xl sm:text-4xl">
          Student training activities blog
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-600 sm:text-base">
          Weekly highlights, practical milestones, and classroom outcomes from each
          training track.
        </p>

        <ul className="mt-6 grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 min-[480px]:gap-5 lg:grid-cols-3">
          {BLOG_POSTS.map((post) => (
            <li
              key={post.id}
              className="flex min-w-0 flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm"
            >
              <img
                src={post.image}
                alt={post.title}
                className="aspect-video w-full object-cover"
                loading="lazy"
              />
              <div className="p-4 min-[480px]:p-5">
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-neutral-700 min-[400px]:text-xs">
                  {post.track}
                </span>
                <time className="text-xs text-neutral-500" dateTime={post.date}>
                  {post.date}
                </time>
              </div>
              <h2 className="mt-3 text-base font-semibold leading-snug text-neutral-900 sm:text-lg">
                {post.title}
              </h2>
              <p className="mt-2 flex-1 text-xs leading-relaxed text-neutral-600 sm:text-sm">
                {post.summary}
              </p>
              <button
                type="button"
                onClick={() => setSelectedPost(post)}
                className="mt-4 inline-flex min-h-10 items-center text-sm font-semibold text-[var(--color-ll-accent)] hover:underline"
              >
                Read post →
              </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {selectedPost ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/55 p-0 sm:items-center sm:p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedPost(null);
          }}
          role="presentation"
        >
          <div className="w-full overflow-hidden rounded-t-2xl bg-white shadow-xl sm:max-w-2xl sm:rounded-2xl">
            <img src={selectedPost.image} alt={selectedPost.title} className="aspect-video w-full object-cover" />
            <div className="p-4 sm:p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-[#5a7a2e]">
                  {selectedPost.track}
                </p>
                <h3 className="mt-1 text-lg font-bold leading-tight text-[#1a1a4b] sm:text-xl">
                  {selectedPost.title}
                </h3>
                <p className="mt-1 text-xs text-neutral-500">{selectedPost.date}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPost(null)}
                className="rounded-md p-1 text-neutral-500 hover:bg-neutral-100"
                aria-label="Close post"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-neutral-700 sm:text-base">
              {selectedPost.details}
            </p>
            <div className="mt-5">
              <button
                type="button"
                onClick={() => setSelectedPost(null)}
                className="inline-flex min-h-11 items-center rounded-lg bg-[var(--color-ll-accent)] px-4 text-sm font-semibold text-white hover:brightness-110"
              >
                Close
              </button>
            </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
