// Customer quote, workflow, and timing supplied directly by Endurance.
export function CustomerProof() {
  return (
    <section id="customer-story" className="customer-proof" aria-labelledby="customer-quote">
      <div className="proof-grid wrap">
        <div className="proof-voice">
          <p className="eyebrow">A MOMENT FROM THE REAL WORLD</p>
          <blockquote><h2 id="customer-quote">“Where have you been all my life?”</h2></blockquote>
          <p className="proof-attribution">A Brain OS customer, after planning a truck load.</p>
        </div>
        <div className="proof-result">
          <p className="eyebrow">TRUCK-LOAD PLANNING</p>
          <div className="proof-timing">
            <dl><dt>Manual process</dt><dd>2 <span>hours</span></dd></dl>
            <span className="proof-arrow" aria-hidden="true">→</span>
            <dl><dt>With Brain OS</dt><dd>30 <span>seconds</span></dd></dl>
          </div>
          <p className="proof-description">Plan how packages fit on a truck to make the most of the space, while accounting for legal load limits.</p>
          <p className="proof-footnote">Customer-reported result for this workflow.</p>
        </div>
      </div>
    </section>
  );
}

// Names, roles, and background come from the existing published team copy.
const team = [
  { name: 'Nick Maxwell', role: 'CTO', bio: 'Computer Science, Cornell. Three-time founder. Exited Tala to Intuit.' },
  { name: 'Alex Sok', role: 'CEO', bio: 'Three-time founder and angel investor. AI at Tetration and Cisco; product leadership at Prospera.' },
  { name: 'Ramzy Azar', role: 'Chief AI Strategy & Ops', bio: 'UC Berkeley. Finance and investment experience. Leads operations, finance, and AI strategy.' },
  { name: 'Brennan Burks', role: 'Chief GTM Engineer', bio: 'Indiana University. B2B technology and manufacturing. Leads marketing, GTM, and client partnerships.' },
];

export function TeamSection() {
  return (
    <section id="team" className="team-section" aria-labelledby="team-title">
      <div className="wrap">
        <div className="team-heading">
          <div><p className="eyebrow">THE PEOPLE BEHIND THE WORK</p><h2 id="team-title">A small team.<br /><span className="text-accent">Close to the work.</span></h2></div>
          <p>Research, engineering, and the operating reality of the industries we build for. We work alongside your team, from the first workflow to the next.</p>
        </div>
        <div className="team-directory">
          {team.map(person => (
            <article className="team-person" key={person.name}>
              <h3>{person.name}</h3><p className="team-role">{person.role}</p><p className="team-bio">{person.bio}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
