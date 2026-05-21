import { SectionShell } from "../components/SectionShell";
import { Marquee } from "../components/Marquee";
import { founders, advisors } from "../data/team";

/**
 * §8 — Team.
 *
 * Phase 1: Static portrait grid + advisor logo row (CSS marquee).
 * Phase 3: Hover/tap on a portrait expands the bio inline via Framer
 * Motion layoutId.
 */
export function Team() {
  return (
    <SectionShell
      id="team"
      index="08"
      eyebrow="The team"
    >
      <h2 className="logi-display-md logi-team__headline">
        The <span className="logi-team__accent">operators</span>.
      </h2>

      <div className="logi-team__grid">
        {founders.map((f) => (
          <article key={f.name} className="logi-panel logi-team__card">
            <div className="logi-team__portrait" aria-hidden="true">
              {f.headshot ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={f.headshot} alt="" />
              ) : (
                <div className="logi-team__portrait-placeholder logi-mono">
                  {f.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
              )}
            </div>
            <div className="logi-team__meta">
              <div className="logi-display-sm logi-team__name">{f.name}</div>
              <div className="logi-mono logi-team__role">{f.role}</div>
              <p className="logi-body logi-body-muted logi-team__hook">
                {f.hook}
              </p>
            </div>
          </article>
        ))}
      </div>

      <div className="logi-team__advisors">
        <div className="logi-tag">Advisors &amp; backers</div>
        <Marquee duration={45}>
          {advisors.map((a, i) => (
            <span
              key={`${a.name}-${i}`}
              className="logi-mono logi-team__advisor-chip"
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
    </SectionShell>
  );
}
