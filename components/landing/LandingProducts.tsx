import type { CSSProperties } from "react";
import { BAND } from "@/components/margins/content";
import { BRAIN } from "./product-content";

// Two figures from the Margins ledger stand behind the Margins card.
const MARGINS_RECEIPTS = [BAND[0], BAND[2]];

function wash(angle: number): CSSProperties {
  return { "--wash-angle": `${angle}deg` } as CSSProperties;
}

export function LandingProducts() {
  return (
    <div id="work" data-section="work">
      <div className="lp-chapter">
        <section className="lp-wash lp-split" style={wash(65)} aria-labelledby="work-margins">
          <div className="lp-split-copy">
            <p className="lp-kicker">What we ship · Margins</p>
            <h2 className="lp-h2" id="work-margins">
              Pay for the margin, not the load.
            </h2>
            <p className="lp-lede">
              TMS loads become a weekly pay run. Splits track what the load
              actually made.
            </p>
          </div>
          <div className="lp-split-shot">
            <div className="lp-bleed">
              <img
                src="/landing/margins-frag-deals.jpg"
                alt="Margins commissions run"
                width={1848}
                height={941}
                style={{ aspectRatio: "1848 / 941" }}
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </section>
        <div className="lp-proofrow">
          <article className="lp-proofcard">
            <ul className="lp-receipt is-card">
              {MARGINS_RECEIPTS.map((figure) => (
                <li key={figure.label}>
                  <p className="lp-figure">{figure.value}</p>
                  <p className="lp-fine">{figure.label}</p>
                </li>
              ))}
            </ul>
          </article>
          <a className="lp-proofcard lp-democard" href="/margins">
            <span className="lp-democard-kicker">Product</span>
            <span className="lp-democard-title">Open Margins</span>
            <span className="lp-democard-arrow" aria-hidden="true">
              ↗
            </span>
          </a>
        </div>
      </div>

      <div className="lp-chapter">
        <section className="lp-wash lp-split is-flip" style={wash(101)} aria-labelledby="work-brain">
          <div className="lp-split-copy">
            <p className="lp-kicker">What we ship · Brain</p>
            <h2 className="lp-h2" id="work-brain">
              Institutional memory that cites its sources.
            </h2>
            <p className="lp-lede">
              Everything the firm already produces, compiled. Every claim cites
              a source. Nothing is invented.
            </p>
          </div>
          <div className="lp-split-shot">
            <div className="lp-bleed">
              <img
                src="/landing/brain-frag.jpg"
                alt="Ask Brain console"
                width={1196}
                height={900}
                style={{ aspectRatio: "1196 / 900" }}
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </section>
        <div className="lp-proofrow">
          <article className="lp-proofcard">
            <ol className="lp-team lp-team-tight">
              {BRAIN.steps.map((step) => (
                <li key={step.n} className="lp-team-row is-index">
                  <p className="lp-num">{step.n}</p>
                  <h3>{step.title}</h3>
                  <p className="lp-bio">{step.body}</p>
                </li>
              ))}
            </ol>
          </article>
          <a className="lp-proofcard lp-democard" href="/brain">
            <span className="lp-democard-kicker">Product</span>
            <span className="lp-democard-title">Open Brain</span>
            <span className="lp-democard-arrow" aria-hidden="true">
              ↗
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
