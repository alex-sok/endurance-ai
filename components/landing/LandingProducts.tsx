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
    <section className="lp-band-dark lp-on-dark" id="work" aria-label="What we ship">
      <div className="lp-section">
        <p className="lp-kicker">What we ship</p>
        <h2 className="lp-h2">Software, not a slide.</h2>
        <p className="lp-lede">
          Products first. Custom systems when the operation is too specific to
          force into a platform.
        </p>

        <article className="lp-product">
          <div className="lp-feature-copy">
            <p className="lp-kicker">Brain</p>
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
        </article>

        <article className="lp-product is-flip">
          <a className="lp-feature-frame" href="/margins">
            <img src="/landing/margins.jpg" alt="Margins commissions run" />
          </a>
          <div className="lp-feature-copy">
            <p className="lp-kicker">Margins</p>
            <h2>Commissions, settled to the penny.</h2>
            <p className="lp-lede">
              TMS loads become a proven pay run. Every split computed. Every
              exception surfaced before payday.
            </p>
            <a className="lp-feature-cta" href="/margins">
              Open Margins
            </a>
          </div>
        </article>

        <article className="lp-product is-solo">
          <div className="lp-feature-copy">
            <p className="lp-kicker">Vertical systems</p>
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
        </article>
      </div>
    </section>
  );
}
