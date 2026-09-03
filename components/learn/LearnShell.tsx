"use client";

import { LandingNav } from "@/components/landing/LandingNav";

export function LearnShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="theme-learn relative min-h-svh">
      <div className="learn-canvas" aria-hidden="true" />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[var(--lp-ink)] focus:text-[var(--lp-snow)] focus:text-sm"
      >
        Skip to content
      </a>
      <LandingNav />
      <main id="main-content">{children}</main>
    </div>
  );
}
