/* Section 03 — the work that does not fit an industry.
   Clients are described by what they run, not by name. */
export function LandingBuilds() {
  return (
    <section className="lp-block lp-split" id="builds" data-section="builds" aria-label="Micro SaaS">
      <div className="lp-split-copy">
        <p className="lp-eyebrow">03 · Micro SaaS</p>
        <h2 className="lp-h2">Not every operation is an industry.</h2>
        <p className="lp-lead">
          Some of what we ship exists once, for one operator, because nothing
          on the market does the job.
        </p>
        <p className="lp-body">
          The engagement is the same either way: sit in the operation, find
          the system it was missing, and ship it.
        </p>
      </div>
      <ul className="lp-split-list">
        <li>
          <b>A private golf club.</b> Member operations, tee sheet and guest
          policy in one system, built to the club&rsquo;s own rules rather
          than a vendor&rsquo;s.
        </li>
        <li>
          <b>A family-law practice.</b> An agreement drafted from an
          interview, assembled clause by clause against state law, returned as
          a document the firm can file.
        </li>
        <li>
          <b>A homebuilder.</b> A configurator that prices a house against the
          parcel it will sit on, so what a buyer designs is what the
          jurisdiction will approve.
        </li>
        <li>
          <b>A consumer marketplace.</b> Catalog, house brands and partner
          inventory under one storefront, launched from nothing.
        </li>
      </ul>
    </section>
  );
}
