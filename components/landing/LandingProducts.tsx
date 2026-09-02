import { Exhibit } from "./Exhibit";
import { BRAIN_ANSWERS } from "./product-content";

export function LandingProducts() {
  return (
    <div id="work" data-section="work">
      <section className="lp-chapter" aria-labelledby="work-margins">
        <div className="lp-chapter-copy">
          <p className="lp-eyebrow">01 · Margins</p>
          <h2 id="work-margins">Commission settlement for freight brokerages.</h2>
          <p className="lp-lead">Pay for the margin, not the load.</p>
          <p className="lp-body">
            TMS loads become a weekly pay run. Splits track what the load
            actually made. Margins is in production inside a freight brokerage,
            running the weekly pay run from their TMS.
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
          <p className="lp-eyebrow">02 · Brain</p>
          <h2 id="work-brain">Institutional memory that cites its sources.</h2>
          <p className="lp-lead">Everything the firm already produces, compiled.</p>
          <p className="lp-body">
            Every claim cites a source. Nothing is invented. Ask in plain
            language, and every figure points at a document.
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
