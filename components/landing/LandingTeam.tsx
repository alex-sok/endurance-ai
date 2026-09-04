const FOUNDERS = [
  {
    name: "Nick Maxwell",
    role: "CTO",
    bio: "Computer Science, Cornell. Three-time founder. Exited Tala to Intuit.",
  },
  {
    name: "Alex Sok",
    role: "CEO",
    bio: "Three-time founder and angel investor. Started in AI at Tetration and Cisco in 2018. Chief Product Officer at Prospera, an AI wealth-management startup.",
  },
  {
    name: "Ramzy Azar",
    role: "Chief AI Strategy & Ops",
    bio: "UC Berkeley. Wells Fargo, then principal at a real estate investment group. Leads operations, finance, and AI strategy.",
  },
  {
    name: "Brennan Burks",
    role: "Chief GTM Engineer",
    bio: "Indiana University. Brand, marketing, and commercialization for multinational manufacturers and B2B technology startups. Leads marketing, GTM, and client partnerships.",
  },
];

export function LandingTeam() {
  return (
    <section className="lp-block" id="team" data-section="team" aria-label="The team">
        <p className="lp-eyebrow">06 · The team</p>
        <h2 className="lp-h2">Built by people who ship.</h2>
        <p className="lp-lede">
          Research, engineering, and the operating reality of the industries we
          build for. Small on purpose.
        </p>
        <div className="lp-team">
          {FOUNDERS.map((f) => (
            <div key={f.name} className="lp-team-row is-person">
              <h3>{f.name}</h3>
              <p className="lp-role">{f.role}</p>
              <p className="lp-bio">{f.bio}</p>
            </div>
          ))}
        </div>
    </section>
  );
}
