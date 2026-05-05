import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  /** Rendered HTML element — defaults to span */
  as?: "span" | "p" | "div" | "label";
}

/**
 * MonoLabel — the 10px uppercase Space Mono eyebrow/label pattern used
 * throughout the site. Change tracking, size, or color once here.
 *
 * Usage:
 *   <MonoLabel>Mission Briefing</MonoLabel>
 *   <MonoLabel as="label" className="mb-2">Client Name</MonoLabel>
 */
export function MonoLabel({ children, className, style, as: Tag = "span" }: Props) {
  return (
    <Tag
      className={cn(
        "text-[10px] uppercase tracking-[0.25em] font-mono text-muted-ash",
        className
      )}
      style={style}
    >
      {children}
    </Tag>
  );
}
