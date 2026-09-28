import Image from "next/image";
import {
  annualHours,
  proofLibrary,
  type Proposal,
} from "@/lib/mission-proposals/model";
import "./proposal.css";

export function ProposalDocument({
  content: p,
  revision,
  pdfUrl,
  draft = false,
}: {
  content: Proposal;
  revision: number;
  pdfUrl?: string;
  draft?: boolean;
}) {
  const sourceLabel = (id: string) =>
    p.sources.find((s) => s.id === id)?.label ?? id;
  return (
    <article className="mission-document">
      <header className="mission-masthead">
        <Image
          src="/logo-endurance.svg"
          alt="Endurance"
          width={164}
          height={24}
          unoptimized
        />
        <span>BRAIN OS / MISSION BRIEFING</span>
        {pdfUrl && <a href={pdfUrl}>Download deck ↗</a>}
      </header>
      <section className="mission-cover">
        <p className="mission-eyebrow">
          PREPARED FOR {p.clientName}{" "}
          <span>
            {draft ? "DRAFT" : ""} · V{revision}
          </span>
        </p>
        <h1>{p.title}</h1>
        <p className="mission-lede">{p.summary}</p>
        <div className="mission-cover-foot">
          <span>Give people back their time.</span>
          <a href="#mission-workflows">Explore the possibilities ↓</a>
        </div>
        <div className="mission-orbits" aria-hidden="true">
          <i />
          <i />
          <i />
          <b>Brain OS</b>
        </div>
      </section>
      <section className="mission-chapter" id="mission-context">
        <p className="mission-eyebrow">01 / YOUR OPERATION</p>
        <h2>Built around the way you work.</h2>
        <div className="mission-context">
          <p>{p.context}</p>
          <div className="mission-facts">
            {p.facts.map((f, i) => (
              <div key={i}>
                <p>{f.text}</p>
                <small>{sourceLabel(f.sourceId)}</small>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="mission-chapter" id="mission-workflows">
        <p className="mission-eyebrow">02 / POSSIBILITIES TO EXPLORE</p>
        <h2>Brain OS in your working day.</h2>
        <p className="mission-intro">
          Proposed workflows to validate together, shaped around your people and
          systems.
        </p>
        {p.workflows.map((w, i) => (
          <div className="mission-workflow" key={i}>
            <div>
              <span className="mission-number">0{i + 1}</span>
              <h3>{w.title}</h3>
              <p className="mission-question">“{w.question}”</p>
            </div>
            <div>
              <small>THE WORK TODAY · TO VALIDATE</small>
              <p>{w.today}</p>
              <small>WITH BRAIN OS · PROPOSED</small>
              <p>{w.withBrain}</p>
              <div className="mission-needs">
                Together, we confirm: {w.needs}
              </div>
            </div>
          </div>
        ))}
      </section>
      <section className="mission-chapter mission-proof">
        <p className="mission-eyebrow">03 / EXPERIENCE TO BUILD ON</p>
        <h2>Real work. A useful starting point.</h2>
        <div className="mission-proof-grid">
          {p.proofIds.map((id, i) => {
            const v = proofLibrary[id];
            return (
              <div key={`${id}-${i}`}>
                <span>↗</span>
                <h3>{v.title}</h3>
                <p>{v.body}</p>
                <small>{v.qualifier}</small>
                <a href={v.url} target="_blank" rel="noreferrer">
                  Read the evidence ↗
                </a>
              </div>
            );
          })}
        </div>
      </section>
      <section className="mission-chapter">
        <p className="mission-eyebrow">04 / THE OPPORTUNITY</p>
        <h2>
          {p.impact
            ? "Small moments. Meaningful capacity."
            : "Measure the work before the promise."}
        </h2>
        {p.impact ? (
          <div className="mission-impact">
            <div>
              <strong>
                {Math.round(annualHours(p.impact)).toLocaleString("en-US")}
              </strong>
              <p>potential team-hours returned per year</p>
              <small>
                Illustrative scenario. Not measured savings or a forecast.
              </small>
            </div>
            <dl>
              {[
                ["Annual loads", p.impact.annualLoads.toLocaleString("en-US")],
                ["Eligible loads (assumed)", `${p.impact.eligiblePercent}%`],
                ["Adoption (assumed)", `${p.impact.adoptionPercent}%`],
                ["Net minutes saved (assumed)", p.impact.minutesSaved],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
              <p>
                Loads × eligibility × adoption × net minutes ÷ 60. Net minutes
                include review and corrections. Avoid counting the same savings
                twice. Volume source: {sourceLabel(p.impact.volumeSourceId)}.
              </p>
            </dl>
          </div>
        ) : (
          <p className="mission-intro">{p.pilot.success}</p>
        )}
      </section>
      <section className="mission-chapter" id="mission-start">
        <p className="mission-eyebrow">05 / WHERE WE START</p>
        <h2>{p.pilot.title}</h2>
        <p className="mission-intro">{p.pilot.description}</p>
        <div className="mission-steps">
          {p.pilot.steps.map((s, i) => (
            <div key={i}>
              <span>0{i + 1}</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </div>
          ))}
        </div>
        <p className="mission-success">
          <b>What success looks like</b> {p.pilot.success}
        </p>
        <details className="mission-details">
          <summary>What we’ll confirm together</summary>
          <ul>
            {p.questions.map((q, i) => (
              <li key={i}>{q}</li>
            ))}
          </ul>
        </details>
        <div className="mission-next">
          <p>{p.nextStep}</p>
          <a
            href="https://calendar.notion.so/meet/alexsok/endurance-intro"
            target="_blank"
            rel="noreferrer"
          >
            Let’s talk ↗
          </a>
        </div>
      </section>
      <footer className="mission-footer">
        <details>
          <summary>Sources & context</summary>
          <ul>
            {p.sources.map((s) => (
              <li key={s.id}>
                <b>{s.id}</b> ·{" "}
                {s.url ? (
                  <a href={s.url} target="_blank" rel="noreferrer">
                    {s.label} ↗
                  </a>
                ) : (
                  s.label
                )}
              </li>
            ))}
          </ul>
        </details>
        <p>
          ENDURANCE LABS · PREPARED FOR {p.clientName.toUpperCase()} · V
          {revision}
        </p>
      </footer>
    </article>
  );
}
