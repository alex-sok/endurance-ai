import { Exhibit } from "./Exhibit";

/* Section 04 — the bench the lab works at. Hybrid framing: the internal
   advantage first, early access for select clients second. */
export function LandingIDE() {
  return (
    <section className="lp-chapter" aria-labelledby="work-ide" id="ide" data-section="ide">
      <div className="lp-chapter-copy">
        <p className="lp-eyebrow">04 · IDE</p>
        <h2 id="work-ide">The bench the lab works at.</h2>
        <p className="lp-lead">
          Every engagement starts in the same environment: the brain, the data
          connections and the deploy path already wired.
        </p>
        <p className="lp-body">
          It is why a client system ships in weeks. A new build starts from a
          running start, not a blank repository — and the same bench keeps the
          system current after we hand it over. Today it is our advantage;
          select clients run it with us.
        </p>
        <a className="lp-feature-cta" href="#close">
          Ask about early access
        </a>
      </div>
      <Exhibit
        exhibit={{
          caption: "One engagement",
          head: "Week one, on the bench",
          meta: "New client system · from intake to running",
          rows: [
            { label: "Wire the sources", sub: "ledger, TMS, mail — read-only", value: "Day 1" },
            { label: "Compile the brain", sub: "92k passages, every claim cited", value: "Day 2" },
            { label: "Ship the first screen", sub: "against live data, behind auth", value: "Day 4" },
            { label: "First run held", sub: "blockers named, nothing sent", value: "Day 5" },
          ],
        }}
      />
    </section>
  );
}
