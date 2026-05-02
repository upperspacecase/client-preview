import type { ReactNode } from "react";

export function ScribbleUnderline({
  children,
  color = "var(--color-yellow)",
  thin = false,
}: {
  children: ReactNode;
  color?: string;
  thin?: boolean;
}) {
  return (
    <span className="scribble-underline">
      {children}
      <svg viewBox="0 0 200 14" preserveAspectRatio="none" aria-hidden>
        <path
          d="M2 9 C 30 3, 60 13, 95 7 S 160 3, 198 8"
          stroke={color}
          strokeWidth={thin ? 3.5 : 7}
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </span>
  );
}

export function ScribbleBox({ children }: { children: ReactNode }) {
  return (
    <span className="scribble-box">
      <span className="px-3 py-2">{children}</span>
      <svg viewBox="0 0 300 60" preserveAspectRatio="none" aria-hidden>
        <path
          d="M6 8 C 30 5, 100 4, 160 6 S 280 4, 294 9 C 296 22, 295 44, 293 52 C 250 55, 120 56, 60 53 S 8 54, 5 50 C 4 36, 5 18, 6 8 Z"
          stroke="var(--color-ink)"
          strokeWidth="2.5"
          fill="none"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export function Squiggle({
  width = 80,
  color = "var(--color-yellow)",
}: {
  width?: number;
  color?: string;
}) {
  return (
    <svg width={width} height="10" viewBox="0 0 80 10" aria-hidden>
      <path
        d="M2 6 C 12 1, 22 9, 32 5 S 52 1, 62 6 S 78 4, 78 5"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function Arrow({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size * 0.6}
      viewBox="0 0 50 30"
      fill="none"
      aria-hidden
    >
      <path
        d="M2 15 H44 M30 4 L44 15 L30 26"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
