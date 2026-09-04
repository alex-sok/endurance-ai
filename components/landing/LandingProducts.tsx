import { Exhibit } from "./Exhibit";
import { BRAIN_ANSWERS } from "./product-content";

/* The first two verticals. Brain OS leads because it is the claim the
   company makes; Foundations follows as the vertical where that claim has
   been running in production since March. */
export function LandingProducts() {
  return (
    <div id="work" data-section="work">
      <section className="lp-chapter" aria-labelledby="work-brain">
        <div className="lp-chapter-copy">
          <p className="lp-eyebrow">01 · Brain OS</p>
          <h2 id="work-brain">
            Your whole company&rsquo;s operations - automated before anybody
            asks.
          </h2>
          <p className="lp-lead">
            A brain is where it starts. The operating system is what we ship,
            wired into the systems you already run.
          </p>
          <p className="lp-body">
            Deterministic by design: ask twice, get the same answer. Every
            output traces back to a source of truth. Nothing is invented.
          </p>
          <a className="lp-feature-cta" href="/brain-os">
            Open Brain OS
          </a>
        </div>
        <Exhibit
          exhibit={{
            caption: "Example use cases",
            head: "Ask Brain",
            meta: "Ask in plain language · documents behind each answer",
            rows: BRAIN_ANSWERS,
          }}
        />
      </section>

      <section className="lp-chapter" aria-labelledby="work-foundations">
        <div className="lp-chapter-copy">
          <p className="lp-eyebrow">02 · Foundations</p>
          <h2 id="work-foundations">The freight back office, tender to cash.</h2>
          <p className="lp-lead">
            One platform where the money moves: commission settlement, carrier
            invoice audit, and the handoff from delivered to billed.
          </p>
          <p className="lp-body">
            Margins computes every split off the TMS and holds the loads that
            would pay wrong. The carrier audit matches every invoice to its
            rate confirmation before it pays. It has run a brokerage&rsquo;s
            weekly pay since March.
          </p>
          <p className="lp-proofline">
            <b>$4.02M</b> settled in 20 closed weeks · <b>20</b> duplicate loads
            stopped before they paid twice
          </p>
          <a className="lp-feature-cta" href="/margins">
            Open Margins
          </a>
        </div>
        <Exhibit
          exhibit={{
            caption: "One week, held",
            head: "Week ending Jun 20",
            meta: "Step 3 · Run pay for the week — locked",
            rows: [
              { label: "Blockers", sub: "must fix to run", value: "1" },
              { label: "Warnings", sub: "worth a look", value: "15" },
              { label: "At stake", sub: "across 16 exceptions", value: "$3,442.33" },
              { label: "Resolved", sub: "this session", value: "0 / 16" },
            ],
          }}
        />
      </section>
    </div>
  );
}
