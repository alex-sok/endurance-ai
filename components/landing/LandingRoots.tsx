const ROOTS = [
  {
    n: "01",
    title: "Research",
    body: "We start in the operation, not the model catalog. Interviews, artifacts, systems of record, the Tuesday that never matches the org chart. The software is only as good as that reading.",
  },
  {
    n: "02",
    title: "Engineering",
    body: "We write production software. Deterministic where it must be, model-powered where it should be. Traceable to your sources of truth. Your data stays on your side of the line.",
  },
  {
    n: "03",
    title: "Vertical software",
    body: "Not a horizontal copilot. Operating systems for one industry at a time: freight, construction, capital markets, legal, and the functions that actually run them.",
  },
];

export function LandingRoots() {
  return (
    <section className="lp-sheet" id="research" data-section="research" aria-label="The lab">
        <p className="lp-kicker">The lab</p>
        <h2 className="lp-h2">How we are built.</h2>
        <p className="lp-lede">
          Three disciplines, held in one small team. Research without a product is
          a paper. A product without research is a guess.
        </p>
        <div className="lp-grid-3">
          {ROOTS.map((root) => (
            <article key={root.n} className="lp-card">
              <p className="lp-num">{root.n}</p>
              <h3>{root.title}</h3>
              <p>{root.body}</p>
            </article>
          ))}
        </div>
    </section>
  );
}
