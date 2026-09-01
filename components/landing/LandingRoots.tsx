const ROOTS = [
  {
    n: "01",
    title: "Research",
    body: "We start in the operation, not the model catalog.",
  },
  {
    n: "02",
    title: "Engineering",
    body: "We write production software.",
  },
  {
    n: "03",
    title: "Vertical software",
    body: "Not a horizontal copilot.",
  },
];

export function LandingRoots() {
  return (
    <section className="lp-sheet is-wide" id="research" data-section="research" aria-label="The lab">
      <p className="lp-kicker">The lab</p>
      <h2 className="lp-h2">How we are built.</h2>
      <p className="lp-lede">
        Three disciplines, held in one small team. Research without a product is
        a paper. A product without research is a guess.
      </p>
      <div className="lp-team">
        {ROOTS.map((root) => (
          <article key={root.n} className="lp-team-row is-index">
            <p className="lp-num">{root.n}</p>
            <h3>{root.title}</h3>
            <p className="lp-bio">{root.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
