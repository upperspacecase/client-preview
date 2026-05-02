"use client";

import Link from "next/link";
import { ClientPreview, useVariant, type Control } from "@/lib/ClientPreview";

const controls: Control[] = [
  {
    label: "Hero",
    options: [
      { value: "a", label: "Variant A" },
      { value: "b", label: "Variant B" },
      { value: "c", label: "Variant C" },
    ],
  },
  {
    label: "Theme",
    options: [
      { value: "light", label: "Light" },
      { value: "dark", label: "Dark" },
    ],
    apply: (v) => {
      document.documentElement.dataset.demoTheme = v;
    },
  },
  {
    label: "CTA",
    options: [
      { value: "book", label: "Book a call" },
      { value: "trial", label: "Start free trial" },
    ],
  },
];

export function DemoSite() {
  return (
    <ClientPreview controls={controls} storageKey="cp-demo:v1">
      <Page />
    </ClientPreview>
  );
}

function Page() {
  const hero = useVariant("Hero");
  const theme = useVariant("Theme");
  const cta = useVariant("CTA");

  const isDark = theme === "dark";

  return (
    <main
      data-demo-theme={theme}
      className={
        "min-h-screen px-6 md:px-12 py-10 transition-colors " +
        (isDark
          ? "bg-[#0e0e12] text-white"
          : "bg-[var(--color-paper)] text-[var(--color-ink)]")
      }
    >
      <div className="mx-auto max-w-[1100px]">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span
              aria-hidden
              className="inline-block w-4 h-4 rounded-full bg-[var(--color-yellow)]"
            />
            <span className="marker text-[22px] uppercase tracking-wide">
              Acme Solar
            </span>
          </div>
          <Link
            href="/"
            className={
              "text-[14px] underline " +
              (isDark ? "text-white/70 hover:text-white" : "text-black/60 hover:text-black")
            }
          >
            ← Back to home
          </Link>
        </header>

        <section className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Hero variant={hero} />
            <CTA variant={cta} dark={isDark} />
            <p className={"mt-6 text-sm " + (isDark ? "text-white/50" : "text-black/55")}>
              Toggle the widget on the right →. Press{" "}
              <kbd className="px-1.5 py-0.5 rounded border border-current text-[11px]">
                Esc
              </kbd>{" "}
              to hide.
            </p>
          </div>

          <div
            className={
              "rounded-2xl aspect-[4/3] border-2 grid place-items-center " +
              (isDark
                ? "bg-white/5 border-white/15"
                : "bg-[var(--color-lavender-soft)] border-[var(--color-violet)]/30")
            }
          >
            <svg viewBox="0 0 80 60" className="w-1/2" aria-hidden>
              <path
                d="M6 48 L26 22 L40 36 L52 26 L74 48 Z"
                fill={isDark ? "white" : "var(--color-violet)"}
                opacity={isDark ? "0.18" : "0.55"}
              />
              <circle
                cx="58"
                cy="14"
                r="5"
                fill={isDark ? "white" : "var(--color-violet)"}
                opacity={isDark ? "0.18" : "0.55"}
              />
            </svg>
          </div>
        </section>

        <section className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={
                "rounded-xl p-6 border " +
                (isDark ? "border-white/10 bg-white/[0.04]" : "border-black/10 bg-white")
              }
            >
              <div className="display text-[28px] mb-2">{20 + i * 11}%</div>
              <div className="text-sm opacity-70">
                Lorem ipsum metric for stat block number {i}.
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}

function Hero({ variant }: { variant: string | undefined }) {
  if (variant === "b") {
    return (
      <h1 className="display text-[56px] md:text-[72px]">
        Cut your power bill
        <br />
        by half.
      </h1>
    );
  }
  if (variant === "c") {
    return (
      <h1 className="display text-[56px] md:text-[72px]">
        Solar that pays
        <br />
        for itself.
      </h1>
    );
  }
  return (
    <h1 className="display text-[56px] md:text-[72px]">
      Power your home
      <br />
      with the sun.
    </h1>
  );
}

function CTA({ variant, dark }: { variant: string | undefined; dark: boolean }) {
  const label = variant === "trial" ? "Start free trial" : "Book a call";
  return (
    <button
      type="button"
      className={
        "mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-md font-semibold " +
        (dark
          ? "bg-[var(--color-yellow)] text-black"
          : "bg-[var(--color-ink)] text-white")
      }
    >
      {label} →
    </button>
  );
}
