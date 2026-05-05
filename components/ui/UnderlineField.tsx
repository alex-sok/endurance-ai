import { cn } from "@/lib/utils";

/**
 * UnderlineField — borderless input/textarea with a bottom rule only.
 * Used consistently in all forms (admin, portal password gate).
 *
 * Accepts an optional label (rendered as MonoLabel above) and hint.
 * Pass `as="textarea"` for multiline. All other props forward to the element.
 *
 * Change the underline color, font size, or placeholder once here.
 *
 * Usage:
 *   <UnderlineField label="Client Name" hint="Full display name" placeholder="Acme Corp" />
 *   <UnderlineField as="textarea" label="Overview" className="h-20 resize-none" />
 */

type BaseProps = {
  label?: string;
  hint?: string;
  error?: string;
  className?: string;
};

type InputProps  = BaseProps & { as?: "input"    } & React.InputHTMLAttributes<HTMLInputElement>;
type TextareaProps = BaseProps & { as: "textarea" } & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export function UnderlineField(props: InputProps | TextareaProps) {
  const { label, hint, error, className, as: Tag = "input", ...rest } = props;

  const baseClass = cn(
    "w-full bg-transparent py-2.5 text-sm text-ink",
    "placeholder:text-subtle",
    "border-b border-subtle focus:border-ink",
    "outline-none transition-colors duration-150",
    error && "border-b-destructive",
    className
  );

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-[10px] uppercase tracking-[0.25em] font-mono text-muted-ash">
          {label}
        </label>
      )}
      {hint && <p className="text-xs text-muted-ash/60">{hint}</p>}

      {Tag === "textarea" ? (
        <textarea
          className={baseClass}
          {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          className={baseClass}
          {...(rest as React.InputHTMLAttributes<HTMLInputElement>)}
        />
      )}

      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
