import type { ReactNode } from "react";

interface SectionShellProps {
  id: string;
  index: string;
  eyebrow?: string;
  children: ReactNode;
  className?: string;
}

export function SectionShell({
  id,
  index,
  eyebrow,
  children,
  className,
}: SectionShellProps) {
  return (
    <section id={id} className={`inv-section ${className ?? ""}`}>
      <div className="inv-section__inner">
        <div className="inv-section__index">
          <span>{index}</span>
          {eyebrow ? ` — ${eyebrow}` : null}
        </div>
        {children}
      </div>
    </section>
  );
}
