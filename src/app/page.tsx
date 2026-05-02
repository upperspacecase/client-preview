"use client";

import { useState } from "react";
import { ScribbleUnderline, ScribbleBox, Arrow } from "@/components/scribble";
import {
  IconBolt,
  IconSwap,
  IconFloppy,
  IconLock,
  IconCode,
  IconHeart,
} from "@/components/icons";
import { ClientPreview, useVariant, type Control } from "@/lib/ClientPreview";

const controls: Control[] = [
  {
    label: "Headline",
    options: [
      { value: "looming", label: "Looming" },
      { value: "screenshots", label: "Screenshots" },
      { value: "staging", label: "Staging URLs" },
    ],
  },
  {
    label: "Theme",
    options: [
      { value: "light", label: "Light" },
      { value: "dark", label: "Dark" },
    ],
    apply: (v) => {
      document.documentElement.dataset.theme = v;
    },
  },
];

export default function Home() {
  const [slot, setSlot] = useState<HTMLElement | null>(null);
  return (
    <ClientPreview
      controls={controls}
      storageKey="cp-landing:v1"
      defaultVisibility="show"
      target={slot}
    >
      <Landing onSlotMount={setSlot} />
    </ClientPreview>
  );
}

function Landing({ onSlotMount }: { onSlotMount: (el: HTMLElement | null) => void }) {
  const headline = useVariant("Headline");

  return (
    <main className="min-h-screen px-6 md:px-12 lg:px-20 py-8 md:py-12">
      <div className="mx-auto max-w-[1280px]">
        {/* Top bar */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span
              aria-hidden
              className="inline-block w-5 h-5 rounded-full bg-[var(--color-yellow)]"
            />
            <span className="marker text-[26px] tracking-wide uppercase">
              Client Preview
            </span>
          </div>
          <ScribbleBox>
            <span className="marker text-[18px] uppercase tracking-wide px-1">
              5KB. Zero dependencies.
            </span>
          </ScribbleBox>
        </header>

        {/* Hero */}
        <section className="mt-14 md:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <Headline variant={headline} />
            <p className="mt-8 text-[20px] md:text-[22px] max-w-[640px] leading-snug">
              Drop a 5KB widget on the{" "}
              <ScribbleUnderline thin>live site</ScribbleUnderline> and let
              them toggle the options themselves.
            </p>
            <div className="mt-12 flex items-center gap-10 flex-wrap">
              <a
                href="https://github.com/upperspacecase/client-preview"
                className="inline-flex items-center gap-3 bg-[var(--color-yellow)] text-[#15151c] px-7 py-4 marker text-[22px] uppercase tracking-wide shadow-[3px_3px_0_var(--color-ink)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_var(--color-ink)] transition-all"
              >
                Get on GitHub
                <Arrow />
              </a>
            </div>
            <p className="mt-10 marker uppercase text-[20px] tracking-wide opacity-80">
              <span>
                That widget? Real. Drag it, toggle it, or hit{" "}
                <kbd className="inline-block border-2 border-current rounded px-2 py-0.5 marker text-[16px] tracking-wide align-middle">
                  Esc
                </kbd>{" "}
                to hide.
              </span>
            </p>
          </div>

          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <WidgetSlot onMount={onSlotMount} />
          </div>
        </section>

        {/* Divider */}
        <div className="mt-20 md:mt-28 border-t-2 border-[var(--color-ink)]" />

        {/* Features */}
        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-10 py-12">
          <Feature
            icon={<IconBolt />}
            title="Drop in"
            body={["One component.", "One config.", "Zero setup."]}
          />
          <Feature
            icon={<IconSwap />}
            title="Toggle"
            body={["Clients switch", "options right on", "the live site."]}
          />
          <Feature
            icon={<IconFloppy />}
            title="Persists"
            body={["Remembers their", "selections with", "localStorage."]}
          />
          <Feature
            icon={<IconLock />}
            title="Dev by default"
            body={[
              "Automatically on",
              "locally. Gate in prod",
              <>
                with{" "}
                <code className="font-mono text-[15px] bg-[var(--color-yellow-soft)] text-[var(--color-ink)] px-1.5 py-0.5 rounded">
                  ?preview=1
                </code>
                .
              </>,
            ]}
          />
          <Feature
            icon={<IconCode />}
            title="Flexible API"
            body={[
              "Apply callback",
              <>
                or{" "}
                <code className="font-mono text-[15px] bg-[var(--color-lavender-soft)] text-[var(--color-violet-deep)] px-1.5 py-0.5 rounded">
                  useVariant()
                </code>
              </>,
              "hook. Or both.",
            ]}
          />
          <Feature
            icon={<IconHeart />}
            title="Built for humans"
            body={["~140 lines.", "Zero deps.", "MIT licensed."]}
          />
        </section>

        {/* Divider */}
        <div className="border-t-2 border-[var(--color-ink)]" />

        {/* Bottom banner */}
        <section className="mt-10 bg-[var(--color-lavender)] rounded-md px-8 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <p className="marker text-[26px] md:text-[30px] uppercase leading-tight">
            "Let clients explore.{" "}
            <ScribbleUnderline thin>You get your time back.</ScribbleUnderline>
            "
          </p>
          <div className="flex items-center gap-5">
            <p className="marker text-[22px] uppercase leading-tight">
              Free today.
              <br />
              Team features coming.
            </p>
            <Arrow size={36} />
          </div>
        </section>

        <footer className="mt-12 mb-6 flex items-center justify-between text-sm opacity-60">
          <span className="marker text-[16px] uppercase tracking-wide">
            Client Preview · MIT
          </span>
          <span className="marker text-[16px] uppercase tracking-wide">
            Built by upperspacecase
          </span>
        </footer>
      </div>
    </main>
  );
}

function Headline({ variant }: { variant: string | undefined }) {
  const cls =
    "display text-[56px] md:text-[76px] lg:text-[88px] xl:text-[100px]";
  if (variant === "screenshots") {
    return (
      <h1 className={cls}>
        Stop emailing
        <br />
        <ScribbleUnderline>screenshots</ScribbleUnderline>.
      </h1>
    );
  }
  if (variant === "staging") {
    return (
      <h1 className={cls}>
        Stop deploying
        <br />
        <ScribbleUnderline>staging URLs</ScribbleUnderline>.
      </h1>
    );
  }
  return (
    <h1 className={cls}>
      Stop <ScribbleUnderline>Looming</ScribbleUnderline>
      <br />
      your clients.
    </h1>
  );
}

function WidgetSlot({
  onMount,
}: {
  onMount: (el: HTMLElement | null) => void;
}) {
  return (
    <div
      ref={onMount}
      className="cp-slot relative w-full max-w-[360px] h-[480px] rounded-3xl border-[2.5px] border-dashed border-emerald-600 bg-emerald-600/5 grid place-items-center"
    >
      <span className="marker uppercase text-[44px] tracking-wide text-emerald-700/80">
        Nice one.
      </span>
    </div>
  );
}

function Feature({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: React.ReactNode[];
}) {
  return (
    <div className="flex flex-col items-start">
      <div className="w-9 h-9 mb-3 text-[var(--color-ink)]">{icon}</div>
      <h3 className="marker uppercase text-[20px] tracking-wide leading-tight">
        {title}
      </h3>
      <div className="mt-2 text-[15px] leading-snug">
        {body.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>
    </div>
  );
}
