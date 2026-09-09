import { CALENDLY_URL } from '@/lib/conversation-flows';
import { ArrowRight, ArrowUpRight, Database, FileText, GitBranch, Layers3, ListChecks, MessageSquare, Users } from 'lucide-react';

// Product grounding: endurancelabs.ai/brain and endurancelabs.ai/brain-os.
// Security copy describes design commitments, not unverified infrastructure guarantees.
const sources = [
  { icon: Database, title: 'Business systems', detail: 'Customers, operations, finance' },
  { icon: FileText, title: 'Company knowledge', detail: 'Documents, email, conversations' },
  { icon: GitBranch, title: 'Ways of working', detail: 'Processes, policies, agreements' },
];

const outcomes = [
  { icon: MessageSquare, title: 'Answers with evidence', detail: 'See the record behind the answer.' },
  { icon: ListChecks, title: 'Work prepared', detail: 'Drafts, reconciliations, follow-ups.' },
  { icon: Users, title: 'People in control', detail: 'Judgment where it matters.' },
];

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
        <figure className="business-diagram" aria-label="Business systems, knowledge, and processes connect to Brain OS, which prepares source-linked answers and work for people.">
          <div className="diagram-column">
            <h3 className="diagram-stage-label">Connect what you know</h3>
            <div className="diagram-node-list">
              {sources.map(({ icon: Icon, title, detail }) => (
                <div className="diagram-node" key={title}>
                  <Icon size={20} strokeWidth={1.5} aria-hidden="true" />
                  <div><h4>{title}</h4><p>{detail}</p></div>
                </div>
              ))}
            </div>
            <p className="diagram-channel">APIs · MCP · Source documents</p>
          </div>
          <div className="diagram-connector" aria-hidden="true"><span /><ArrowRight size={19} /></div>
          <div className="diagram-core-column">
            <h3 className="diagram-stage-label">Build shared context</h3>
            <div className="diagram-core">
              <div className="diagram-core-heading"><Layers3 size={26} strokeWidth={1.4} aria-hidden="true" /><span>Brain OS</span></div>
              <p>The knowledge behind<br />the next step.</p>
              <ul>
                <li>Understand the context</li>
                <li>Find the source</li>
                <li>Prepare the work</li>
              </ul>
            </div>
            <p className="diagram-channel">Connected to your operation</p>
          </div>
          <div className="diagram-connector" aria-hidden="true"><span /><ArrowRight size={19} /></div>
          <div className="diagram-column">
            <h3 className="diagram-stage-label">Put it to work</h3>
            <div className="diagram-node-list">
              {outcomes.map(({ icon: Icon, title, detail }) => (
                <div className="diagram-node outcome-node" key={title}>
                  <Icon size={20} strokeWidth={1.5} aria-hidden="true" />
                  <div><h4>{title}</h4><p>{detail}</p></div>
                </div>
              ))}
            </div>
            <p className="diagram-channel">Useful to the people doing the work</p>
          </div>
          <figcaption>A simplified view: connect sources, build context, prepare work.</figcaption>
        </figure>
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
  { label: 'DATA', title: 'What comes in. Where it lives.', copy: 'Agree the sources, data location, retention, and model-data policies.' },
  { label: 'ACCESS', title: 'Who can see and do what.', copy: 'Define access for people, connected tools, and automated workflows.' },
  { label: 'ACTION', title: 'What needs a human decision.', copy: 'Set the authority to act—and the points where a person reviews.' },
];

export function SecurityArchitecture() {
  return (
    <section id="trust" className="trust-section" aria-labelledby="trust-title">
      <div className="wrap">
        <div className="trust-intro">
          <div className="trust-copy">
            <p className="eyebrow">SECURITY &amp; TRUST</p>
            <h2 id="trust-title">Trust is part of<br /><span className="text-accent">the architecture.</span></h2>
            <p>Your data stays yours. Your people stay in control. Those commitments shape how we build.</p>
          </div>
          <dl className="trust-commitments">
            {commitments.map(({ title, copy }) => (
              <div key={title}><dt>{title}</dt><dd>{copy}</dd></div>
            ))}
          </dl>
        </div>
        <div className="security-design" aria-labelledby="security-design-title">
          <div className="security-design-heading">
            <h3 id="security-design-title">Start with clear boundaries.</h3>
            <p>Security requirements shape the implementation.</p>
          </div>
          <div className="security-boundaries">
            {boundaries.map(({ label, title, copy }) => (
              <div className="security-boundary" key={label}>
                <p className="boundary-label">{label}</p><h4>{title}</h4><p>{copy}</p>
              </div>
            ))}
          </div>
          <div className="security-design-footer">
            <p>Let’s walk through the architecture with your team.</p>
            <a href={CALENDLY_URL} target="_blank" rel="noreferrer">Talk security with us <ArrowUpRight size={17} aria-hidden="true" /></a>
          </div>
        </div>
      </div>
    </section>
  );
}
