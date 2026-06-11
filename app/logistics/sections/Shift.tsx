import { SectionShell } from "../components/SectionShell";
import { ShiftRevealClient } from "../components/ShiftRevealClient";
import { shiftPillars } from "../data/shift";
import { isPlaceholder } from "../lib/placeholders";

/**
 * §3 — The shift. Quiet section (DESIGN-V2.md §3).
 *
 * The dimmed incumbent stack vs the full-strength Endurance stack IS
 * the design — static CSS contrast, one blockReveal per column (inside
 * ShiftRevealClient). Headline and pillars render with no animation:
 * this section is the silence between §2 and §4.
 */
export function Shift() {
  const pillars = shiftPillars.filter(
    (p) => !isPlaceholder(p.title) && !isPlaceholder(p.body),
  );

  return (
    <SectionShell
      id="shift"
      index="03"
      eyebrow="Why now"
    >
      <h2 className="logi-display-md v2-shift__headline">
        Why <em className="v2-shift__em">now</em>.
      </h2>

      <ShiftRevealClient />

      <div className="v2-shift__pillars">
        {pillars.map((p, i) => (
          <article className="v2-shift__pillar" key={p.title}>
            <div className="logi-mono v2-shift__pillar-num">
              0{i + 1}
            </div>
            <h3 className="logi-display-sm">{p.title}</h3>
            <p className="logi-body logi-body-muted">{p.body}</p>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
