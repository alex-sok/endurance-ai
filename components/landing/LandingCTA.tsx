"use client";

/* The closing offer, in the row-card grammar: kicker, claim, one line, then
   the three ways an engagement starts — each a numbered row with the name
   left and what it gets you right. Straight from the manifesto's ladder. */

const STEPS = [
  {
    n: "01",
    name: "AI Masterclass",
    desc: "Your team starts using the public tools in a safe, compliant environment — value before we build anything.",
  },
  {
    n: "02",
    name: "Discovery Sessions",
    desc: "We sit in the operation, find the bottlenecks, and surface where the data needs hygiene before it can be rewired.",
  },
  {
    n: "03",
    name: "Integrated Systems",
    desc: "Your data sources connected securely, automations that systematize good habits into higher margins and profits.",
  },
];

export function LandingCTA({ onOpenChat }: { onOpenChat: () => void }) {
  return (
    <section className="lp-ctaband" aria-label="Working with Endurance">
      <div className="lp-ctacard">
        <p className="lp-ctakick">Working with Endurance</p>
        <h2 className="lp-ctahead">Your business can&rsquo;t shut down for a rebuild.</h2>
        <p className="lp-ctasub">
          So we build in parallel: small steps that deliver value every step
          of the way, starting wherever you are.
        </p>
        <ul className="lp-ctarows">
          {STEPS.map((s) => (
            <li key={s.n}>
              <span className="lp-ctanum">{s.n}</span>
              <span className="lp-ctaname">{s.name}</span>
              <span className="lp-ctadesc">{s.desc}</span>
            </li>
          ))}
        </ul>
        <div className="lp-ctafoot">
          <button type="button" className="lp-feature-cta" onClick={onOpenChat}>
            See what we&rsquo;d build for you
          </button>
        </div>
      </div>
    </section>
  );
}
