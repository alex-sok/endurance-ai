const STEPS = [
  {
    n: "01",
    title: "Study the operation",
    body: "We sit with the people who run the work.",
  },
  {
    n: "02",
    title: "Design the system",
    body: "Architecture before interface.",
  },
  {
    n: "03",
    title: "Ship and leave it running",
    body: "Production software, in your environment.",
  },
];

export function LandingMethod() {
  return (
    <section className="lp-sheet" id="method" data-section="method" aria-label="How we work">
      <p className="lp-kicker">Method</p>
      <h2 className="lp-h2">From the floor to production.</h2>
      <p className="lp-lede">
        No six-month discovery. No deck that outlives the engagement. Field
        research, then software.
      </p>
      <ol className="lp-team">
        {STEPS.map((step) => (
          <li key={step.n} className="lp-team-row is-index">
            <p className="lp-num">{step.n}</p>
            <h3>{step.title}</h3>
            <p className="lp-bio">{step.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
