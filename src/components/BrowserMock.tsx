export function BrowserMock() {
  return (
    <div className="rounded-lg border-2 border-[var(--color-ink)] bg-white shadow-[6px_6px_0_var(--color-ink)] overflow-hidden">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-4 py-3 border-b-2 border-[var(--color-ink)] bg-[var(--color-paper)]">
        <span className="w-3 h-3 rounded-full bg-[var(--color-ink)]/15" />
        <span className="w-3 h-3 rounded-full bg-[var(--color-ink)]/15" />
        <span className="w-3 h-3 rounded-full bg-[var(--color-ink)]/15" />
      </div>

      {/* Body */}
      <div className="px-8 py-10 md:px-12 md:py-14">
        {/* Image placeholder */}
        <div className="w-28 md:w-36 aspect-[4/3] mb-6 rounded-md bg-[var(--color-lavender)] grid place-items-center">
          <svg viewBox="0 0 60 50" className="w-2/3 h-2/3" aria-hidden>
            <path
              d="M6 38 L20 20 L30 30 L38 24 L54 38 Z"
              fill="var(--color-violet)"
              opacity="0.55"
            />
            <circle cx="42" cy="14" r="5" fill="var(--color-violet)" opacity="0.55" />
            <rect
              x="3"
              y="6"
              width="54"
              height="38"
              stroke="var(--color-violet-deep)"
              strokeWidth="1.5"
              fill="none"
              rx="2"
            />
          </svg>
        </div>

        <h2 className="display text-[36px] md:text-[44px] leading-[0.95] mb-6">
          Your site
          <br />
          either way.
        </h2>

        <button
          type="button"
          className="bg-[var(--color-lavender)] text-[var(--color-violet-deep)] font-medium px-5 py-2 rounded-md text-[14px]"
        >
          Learn more
        </button>
      </div>
    </div>
  );
}
