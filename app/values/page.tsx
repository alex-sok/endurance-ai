import type { Metadata } from 'next';
import { ArrowUpRight } from 'lucide-react';
import LandingFrame from '../landing/landing-frame';
import { SiteHeader, SiteFooter, callUrl } from '../landing/site-chrome';

const siteUrl = 'https://endurancelabs.ai';
const description = 'Three values, said plainly: always learning, be of service, finish the job.';

export const metadata: Metadata = {
  title: 'Core values | Endurance AI Labs',
  description,
  alternates: { canonical: `${siteUrl}/values` },
  openGraph: { title: 'Core values | Endurance AI Labs', description, url: `${siteUrl}/values`, type: 'website' },
  twitter: { card: 'summary_large_image', title: 'Core values | Endurance AI Labs', description },
};

/* The three values, in the About page's editorial frame: one section per
   value, heading on the left, the reasoning and the practice on the right. */

const VALUES = [
  {
    id: 'always-learning',
    n: '01',
    name: 'Always learning.',
    creed: 'Humility and curiosity, every day.',
    body: [
      'A freight desk, a law firm, and a kitchen each have rules that are easy to miss from the outside. We begin by listening to the people who work there. Their explanations, and especially their corrections, tell us what the software needs to do.',
      'We want to leave each conversation understanding something we did not understand before. The systems we build should make that learning useful: a documented rule or a corrected answer can help the next person who encounters the same problem.',
    ],
    practice: [
      'Ask more questions than you answer — a great second meeting is earned by the questions asked in the first.',
      '“I don’t know yet” is a complete sentence — followed by going and finding out.',
      'Listen before you build — what the operator says shapes the system.',
    ],
  },
  {
    id: 'be-of-service',
    n: '02',
    name: 'Be of service.',
    creed: 'Jump in. Make it happen.',
    body: [
      'Service begins with noticing what someone needs and taking responsibility for helping. Within the team, that means direct access to one another and a clear owner for the work.',
      'For a customer, it means knowing who is working on the problem, what happens next, and when they will hear from us. We aim to make those things clear, even while the answer is still taking shape.',
    ],
    practice: [
      'See it, own it — jump in without waiting to be asked.',
      'Direct access, no layers — when a teammate needs you, they get you.',
      'Acknowledge a partner’s question promptly, take ownership, and agree on the next update.',
    ],
  },
  {
    id: 'finish-the-job',
    n: '03',
    name: 'Finish the job.',
    creed: 'Shipped isn’t finished. Used is.',
    body: [
      'A demo shows what is possible. Daily use reveals what still needs work: messy data, an exception nobody mentioned, a report that almost fits. We keep working toward a system the operator can run their morning on without us in the room.',
      'That means reconciling the numbers, handling the exceptions, and finding the cause of a recurring problem. Our name recalls the Endurance expedition and the effort to bring its crew home. It is a reminder to keep responsibility for the people who depend on the work.',
    ],
    practice: [
      'Launch is the midpoint — we stay until the system runs the client’s day without us.',
      'The last 5% — edge cases, empty states, the awkward export — is the job, not extra credit.',
      'Reconcile to zero and fix the root cause — a patch that hides a problem is a debt, not a fix.',
    ],
  },
];

export default function ValuesPage() {
  return <LandingFrame>
    <SiteHeader current="values" />
    <main id="main" className="about-page values-page">
      <section className="about-hero values-hero wrap" aria-labelledby="values-title">
        <div className="about-hero-copy">
          <p className="eyebrow">OUR VALUES</p>
          <h1 id="values-title"><span>Three values,</span> <span>said plainly.</span></h1>
          <p className="about-intro">These values guide how we learn a business, work with its people, and see a project through to daily use.</p>
        </div>
        <nav className="values-index" aria-label="Our values">
          {VALUES.map(v => <a key={v.id} href={`#${v.id}`}><span>{v.n}</span><strong>{v.name}</strong><span>{v.creed}</span></a>)}
        </nav>
      </section>
      <div className="about-sections wrap">
        {VALUES.map(v => (
          <section key={v.id} id={v.id} className="about-section" aria-labelledby={`${v.id}-title`}>
            <div className="about-section-heading">
              <span className="about-chapter">{v.n} / CORE VALUE</span>
              <h2 id={`${v.id}-title`}>{v.name}</h2>
              <p className="about-heading-note">{v.creed}</p>
            </div>
            <div className="about-section-body">
              {v.body.map((b, i) => <p key={b.slice(0, 24)} className={i === 0 ? 'about-body-intro' : undefined}>{b}</p>)}
              <div className="about-origin values-practice">
                <h3>In practice</h3>
                <ul className="about-segments">{v.practice.map(x => <li key={x.slice(0, 24)}>{x}</li>)}</ul>
              </div>
            </div>
          </section>
        ))}
      </div>
      <section className="contact" aria-labelledby="values-close-title">
        <div className="contact-content wrap">
          <div className="contact-heading"><p className="eyebrow">LET’S BUILD WHAT’S NEXT</p><h2 id="values-close-title">We research. We build.<br />We ship.</h2></div>
          <div className="contact-actions">
            <p>Tell us where the work gets stuck.<br />Let’s make more room for what comes next.</p>
            <a className="primary-button" href={callUrl} target="_blank" rel="noreferrer"><span>Tell us about your work</span><ArrowUpRight size={17} /></a>
          </div>
        </div>
      </section>
    </main>
    <SiteFooter current="values" />
  </LandingFrame>;
}
