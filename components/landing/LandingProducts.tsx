import { Exhibit } from "./Exhibit";
import { BRAIN_ANSWERS } from "./product-content";

export function LandingProducts() {
  return (
    <div id="work" data-section="work">
      <section className="lp-chapter" aria-labelledby="work-margins">
        <div className="lp-chapter-copy">
          <p className="lp-eyebrow">01 · Margins</p>
          <h2 id="work-margins">Commission settlement for freight brokerages.</h2>
          <p className="lp-lead">
            One person knows the spreadsheet. Everyone is paid from it.
          </p>
          <p className="lp-body">
            Margins computes every split off the TMS, holds the loads that would
            pay wrong, and hands each broker a statement that traces to the
            load. It has run the weekly pay run inside a freight brokerage since
            March, which means you can add agents without adding another person
            who knows the sheet.
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

      <section className="lp-chapter" aria-labelledby="work-brain">
        <div className="lp-chapter-copy">
          <p className="lp-eyebrow">02 · Brain powered operating systems (BPOS)</p>
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
          <a className="lp-feature-cta" href="/brain">
            Open Brain
          </a>
        </div>
        <Exhibit
          exhibit={{
            caption: "Recent answers",
            head: "Ask Brain",
            meta: "Last 24 hours · documents behind each answer",
            rows: BRAIN_ANSWERS,
          }}
        />
      </section>
    </div>
  );
}
