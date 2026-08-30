export function LandingProducts() {
  return (
    <div id="work" data-section="work">
      <section className="lp-sheet" aria-label="Margins">
        <p className="lp-kicker">What we ship · Margins</p>
        <div className="lp-product">
          <div className="lp-feature-copy">
            <h2>Pay for the margin, not the load.</h2>
            <p className="lp-lede">
              Your TMS prices the load. It does not pay the people. That is a
              person and a spreadsheet. Margins is AI in the pay run: every
              split from what the load actually made, every exception before
              payday.
            </p>
            <a className="lp-feature-cta" href="/margins">
              Open Margins
            </a>
          </div>
          <a className="lp-feature-frame" href="/margins">
            <img src="/landing/margins.jpg" alt="Margins commissions run" />
          </a>
        </div>
      </section>

      <section className="lp-sheet" aria-label="Brain">
        <p className="lp-kicker">What we ship · Brain</p>
        <div className="lp-product is-flip">
          <a className="lp-feature-frame" href="/brain">
            <img src="/landing/brain.png" alt="Ask Brain console" />
          </a>
          <div className="lp-feature-copy">
            <h2>Institutional memory that cites its sources.</h2>
            <p className="lp-lede">
              Most AI cannot show its work. That is a rumor with a UI. Brain
              compiles what the firm already produced. Every claim has a source.
              Nothing is invented.
            </p>
            <a className="lp-feature-cta" href="/brain">
              Open Brain
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
