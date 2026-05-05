import { cn } from "@/lib/utils";

/**
 * Btn — site-standard button with the two variants used everywhere.
 *
 * primary  — inkwell fill (#262510 bg, bone text). Main CTAs.
 * signal   — orange outlined (#f54e00 border + text). Secondary CTAs.
 * outline  — neutral outlined (surface border, ink text). Tertiary.
 * ghost    — no border (muted text, surface hover). Subtle actions.
 *
 * Works as <button> or <a> — pass `as="a"` with href/target/rel.
 *
 * Change a variant's visual once here; every instance updates.
 */

const variants = {
  primary: "bg-ink text-bone hover:bg-[#141414] border-transparent",
  signal:  "text-signal border border-signal hover:bg-signal/5 bg-transparent",
  outline: "text-ink border border-surface hover:bg-surface bg-transparent",
  ghost:   "text-muted-ash hover:text-ink hover:bg-surface border-transparent bg-transparent",
} as const;

type Variant = keyof typeof variants;

type BtnProps<T extends "button" | "a"> = {
  variant?: Variant;
  as?: T;
  className?: string;
  children?: React.ReactNode;
} & (T extends "a"
  ? React.AnchorHTMLAttributes<HTMLAnchorElement>
  : React.ButtonHTMLAttributes<HTMLButtonElement>);

export function Btn<T extends "button" | "a" = "button">({
  variant = "primary",
  as,
  className,
  children,
  ...props
}: BtnProps<T>) {
  const Tag = (as ?? "button") as React.ElementType;

  return (
    <Tag
      className={cn(
        // Base
        "inline-flex items-center justify-center shrink-0",
        "px-4 py-2 text-xs font-medium uppercase font-mono tracking-[0.1em]",
        "transition-all duration-150",
        "disabled:opacity-30 disabled:pointer-events-none",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal/50",
        variants[variant],
        className
      )}
      style={{ borderRadius: "4px" }}
      {...props}
    >
      {children}
    </Tag>
  );
}
