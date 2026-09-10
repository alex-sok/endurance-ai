import { CALENDLY_URL } from '@/lib/conversation-flows';
import { ArrowUpRight } from 'lucide-react';
import { BrainFlow } from './brain-flow';

// Product grounding: endurancelabs.ai/brain and endurancelabs.ai/brain-os.
// Security copy describes design commitments, not unverified infrastructure guarantees.
export function BusinessArchitecture() {
  return (
    <section id="how-it-works" className="architecture-section" aria-labelledby="architecture-title">
      <div className="wrap">
        <div className="architecture-heading">
          <div>
            <p className="eyebrow">HOW BRAIN OS WORKS</p>
            <h2 id="architecture-title">Your systems.<br /><span className="text-accent">Working together.</span></h2>
          </div>
          <p>Brain OS connects the tools, knowledge, and routines your business already runs—then turns that context into useful work.</p>
        </div>
        <BrainFlow />
      </div>
    </section>
  );
}

const commitments = [
  { title: 'Ownership', copy: 'The value created from your business’s knowledge should belong to your business.' },
  { title: 'Traceability', copy: 'Answers connected to their source, so your team can examine what supports them.' },
  { title: 'Human authority', copy: 'Keep important decisions with the people responsible for them.' },
];

const boundaries = [
  { title: 'Deployment & data location', copy: 'Which systems connect? Where will the service run, and where will your data reside?' },
  { title: 'Access & permissions', copy: 'Which people and tools can read information, change records, or initiate work?' },
  { title: 'Model-data handling', copy: 'Which providers are involved? What information reaches them, and what are their training and retention terms?' },
  { title: 'Retention & deletion', copy: 'What is stored, for how long, and who is responsible for deletion?' },
  { title: 'Actions & accountability', copy: 'What can run automatically? Where is approval required, and what activity records does your team need?' },
];

export function SecurityArchitecture() {
  return (
    <section id="trust" className="trust-section" aria-labelledby="trust-title">
      <div className="wrap">
        <div className="trust-intro">
          <div className="trust-copy">
            <p className="eyebrow">SECURITY &amp; TRUST</p>
            <h2 id="trust-title">Trust is part of<br /><span className="text-accent">the architecture.</span></h2>
            <p>Trust needs clear answers—about your data, access, and authority. We work through those details with your team.</p>
          </div>
          <dl className="trust-commitments">
            {commitments.map(({ title, copy }) => (
              <div key={title}><dt>{title}</dt><dd>{copy}</dd></div>
            ))}
          </dl>
        </div>
        <div className="security-design" aria-labelledby="security-design-title">
          <div className="security-design-heading">
            <h3 id="security-design-title">The architecture conversation.</h3>
            <p>Defined for your implementation, not left to assumption.</p>
          </div>
          <dl className="security-review">
            {boundaries.map(({ title, copy }) => (
              <div key={title}><dt>{title}</dt><dd>{copy}</dd></div>
            ))}
          </dl>
          <div className="security-design-footer">
            <p>Let’s walk through the architecture with your team.</p>
            <a href={CALENDLY_URL} target="_blank" rel="noreferrer">Talk security with us <ArrowUpRight size={17} aria-hidden="true" /></a>
          </div>
        </div>
      </div>
    </section>
  );
}
