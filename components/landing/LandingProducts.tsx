"use client";

const VERTICALS = [
  "Construction",
  "Freight & logistics",
  "Capital markets",
  "Legal",
  "Multi-unit operations",
  "Commissions & brokerage",
];

interface Props {
  onNavigate?: (id: string) => void;
}

export function LandingProducts({ onNavigate }: Props) {
  return (
    <div id="work" data-section="work">
      <section className="lp-sheet" aria-label="Brain">
        <p className="lp-kicker">What we ship · Brain</p>
        <div className="lp-product">
          <div className="lp-feature-copy">
            <h2>Institutional memory that cites its sources.</h2>
            <p className="lp-lede">
              Everything the firm already produces, compiled into a living
              knowledge base. Every claim cites a source. Nothing is invented.
            </p>
            <a className="lp-feature-cta" href="/brain">
              Open Brain
            </a>
          </div>
          <a className="lp-feature-frame" href="/brain">
            <img src="/landing/brain.png" alt="Ask Brain console" />
          </a>
        </div>
      </section>

      <section className="lp-sheet" aria-label="Margins">
        <p className="lp-kicker">What we ship · Margins</p>
        <div className="lp-product is-flip">
          <a className="lp-feature-frame" href="/margins">
            <img src="/landing/margins.jpg" alt="Margins commissions run" />
          </a>
          <div className="lp-feature-copy">
            <h2>Commissions, settled to the penny.</h2>
            <p className="lp-lede">
              TMS loads become a proven pay run. Every split computed. Every
              exception surfaced before payday.
            </p>
            <a className="lp-feature-cta" href="/margins">
              Open Margins
            </a>
          </div>
        </div>
      </section>

      <section className="lp-sheet" aria-label="Vertical systems">
        <p className="lp-kicker">What we ship · Vertical systems</p>
        <div className="lp-product is-solo">
          <div className="lp-feature-copy">
            <h2>Built for the operation.</h2>
            <p className="lp-lede">
              Custom operating layers for construction, capital markets, legal,
              and commissions-heavy businesses. Same research method. Software
              that fits how you already run.
            </p>
            <ul className="lp-chips">
              {VERTICALS.map((v) => (
                <li key={v}>{v}</li>
              ))}
            </ul>
            <a
              className="lp-feature-cta"
              href="#cta"
              onClick={(e) => {
                if (onNavigate) {
                  e.preventDefault();
                  onNavigate("cta");
                }
              }}
            >
              Talk about yours
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
