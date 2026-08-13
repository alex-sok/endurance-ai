const CASES = [
  {
    before: "A year, twenty engineers.",
    after: "Two weeks.",
    body: "A Fortune 500 travel team had been on one problem for a year. We shipped the system in two weeks. That pattern has held.",
  },
  {
    before: "Six months of waiting.",
    after: "Four days.",
    body: "A CEO had been waiting half a year for an agentic commerce experience. We built it in four days. He is using it to open doors at retailers and financial institutions.",
  },
];

export function LandingProof() {
  return (
    <section className="lp-on-light" id="proof" aria-label="In the field">
      <div className="lp-section">
        <p className="lp-kicker">In the field</p>
        <h2 className="lp-h2">Time, compressed.</h2>
        <div className="lp-proof-grid">
          {CASES.map((c) => (
            <article key={c.after}>
              <p className="lp-proof-before">{c.before}</p>
              <p className="lp-proof-after">{c.after}</p>
              <p className="lp-card-body">{c.body}</p>
            </article>
          ))}
        </div>
        <p className="lp-note">
          Active work with Fortune 500 enterprises and mid-market operators.
          Detail under NDA.
        </p>
      </div>
    </section>
  );
}
