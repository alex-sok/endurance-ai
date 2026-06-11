"use client";

import { useEffect, useRef } from "react";
import { SectionShell } from "../components/SectionShell";
import { Marquee } from "../components/Marquee";
import { founders, advisors } from "../data/team";
import { isPlaceholder } from "../lib/placeholders";
import { gsap, blockReveal } from "../lib/v2-motion";

/**
 * §8 — Team. QUIET (DESIGN-V2.md).
 *
 * Exactly one staggered `blockReveal` across headline → founder cards →
 * advisor row. No tilt, no rim light, no scramble. Monogram portrait
 * placeholders get a static amber-duotone treatment (pure CSS — see
 * styles/v2/team.css). The advisor marquee renders only when at least
 * one advisor name passes `isPlaceholder()` — with today's TODO data it
 * disappears entirely; real names later just work.
 *
 * Client component: the section IS the animating island and file
 * ownership doesn't allow a separate reveal client — data is static, so
 * SSR markup is identical either way.
 */
export function Team() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      // The section's single entrance (quiet-section budget).
      blockReveal(root.querySelectorAll(".v2-team__block"));
    }, root);
    return () => ctx.revert();
  }, []);

  const realAdvisors = advisors.filter((a) => !isPlaceholder(a.name));

  return (
    <SectionShell
      id="team"
      index="08"
      eyebrow="The team"
    >
      <div ref={rootRef} className="v2-team">
        <h2 className="logi-display-md v2-team__headline v2-team__block">
          The <span className="v2-team__accent">operators</span>.
        </h2>

        <div className="v2-team__grid">
          {founders.map((f) => (
            <article
              key={f.name}
              className="logi-panel v2-team__card v2-team__block"
            >
              <div className="v2-team__portrait" aria-hidden="true">
                {f.headshot ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={f.headshot} alt="" />
                ) : (
                  <div className="v2-team__monogram">
                    <span className="v2-team__monogram-glyph">
                      {f.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                )}
              </div>
              <div className="v2-team__meta">
                <div className="logi-display-sm v2-team__name">{f.name}</div>
                <div className="logi-mono v2-team__role">{f.role}</div>
                <p className="logi-body logi-body-muted v2-team__hook">
                  {f.hook}
                </p>
              </div>
            </article>
          ))}
        </div>

        {realAdvisors.length > 0 ? (
          <div className="v2-team__advisors v2-team__block">
            <div className="logi-tag">Advisors &amp; backers</div>
            <Marquee duration={45}>
              {realAdvisors.map((a, i) => (
                <span
                  key={`${a.name}-${i}`}
                  className="logi-mono v2-team__advisor-chip"
                >
                  {a.logo ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={a.logo} alt={a.name} />
                  ) : (
                    a.name
                  )}
                </span>
              ))}
            </Marquee>
          </div>
        ) : null}
      </div>
    </SectionShell>
  );
}
