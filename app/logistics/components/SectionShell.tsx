import type { ReactNode } from "react";

interface SectionShellProps {
  id: string;
  index: string;
  eyebrow?: string;
  children: ReactNode;
  /** Optional class for per-section padding/background overrides. */
  className?: string;
}

/**
 * Wraps each of the 11 narrative beats with consistent rhythm: section
 * index ("01 — Hero"), max-width inner column, anchor id for jump nav
 * and scroll-depth analytics.
 *
 * The visible heading lives inside `children` (it's usually the visual
 * centerpiece of the section). The shell intentionally does NOT add a
 * second sr-only heading — that would duplicate the document outline.
 */
export function SectionShell({
  id,
  index,
  eyebrow,
  children,
  className,
}: SectionShellProps) {
  return (
    <section id={id} className={`logi-section ${className ?? ""}`}>
      <div className="logi-section__inner">
        <div className="logi-section__index">
          <span>{index}</span>
          {eyebrow ? ` — ${eyebrow}` : null}
        </div>
        {children}
      </div>
    </section>
  );
}
