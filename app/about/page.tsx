/* Static pixel artwork is served unchanged with explicit dimensions. */
/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { SiteHeader, SiteFooter } from '../artfield/site-chrome';
import HomeFrame from '../artfield/home-frame';
import { CALENDLY_URL as callUrl, CONTACT_EMAIL } from '@/lib/conversation-flows';
import './about.css';

const siteUrl = 'https://endurancelabs.ai';
const companyUrl = 'https://endurancelabs.ai';
const linkedIn = 'https://www.linkedin.com/company/endurance-ai-labs';
const alexLinkedIn = 'https://www.linkedin.com/in/alexsok';
const pricingUrl = `${companyUrl}/margins/pricing`;
const proofUrl = `${companyUrl}/margins/proof`;
const description = 'Meet Endurance AI Labs: the San Francisco AI research and engineering company behind Brain OS. Our work, people, approach, and company facts.';

export const metadata: Metadata = {
  title: 'About us | Endurance AI Labs',
  description,
  alternates: { canonical: `${siteUrl}/about` },
  openGraph: { title: 'About us | Endurance AI Labs', description, url: `${siteUrl}/about`, type: 'website' },
  twitter: { card: 'summary_large_image', title: 'About us | Endurance AI Labs', description },
};

const people = [
  { name: 'Alex Sok', role: 'Co-founder & CEO', bio: 'Alex is a three-time founder and angel investor with AI experience at Tetration and Cisco. He also held product leadership roles at Prospera.', social: alexLinkedIn },
  { name: 'Nick Maxwell', role: 'Co-founder & CTO', bio: 'Nick studied computer science at Cornell and is a three-time founder. His background includes an exit of Tala to Intuit.' },
  { name: 'Ramzy Azar', role: 'Chief AI Strategy & Ops', bio: 'Ramzy brings a UC Berkeley background and experience in finance and investment. He leads operations, finance, and AI strategy.' },
  { name: 'Brennan Burks', role: 'Chief GTM Engineer', bio: 'Brennan brings an Indiana University background and experience in B2B technology and manufacturing. He leads marketing, go-to-market work, and client partnerships.' },
];

const faqs = [
  { question: 'What is Endurance AI Labs?', answer: 'Endurance AI Labs is an AI research and engineering company based in San Francisco. It builds Brain OS, connected business software, and custom workflows that help operations teams recover time.' },
  { question: 'What is the difference between Brain and Brain OS?', answer: 'Brain compiles company knowledge into a source-backed institutional memory. Brain OS connects business knowledge with systems and routines so teams can act on that context as well as ask questions.' },
  { question: 'How is Endurance different from Zapier or n8n?', answer: 'Zapier and n8n provide platforms for building automations, and both offer access to implementation partners. Endurance combines its own products with a research and engineering team that works alongside operators to build the system around their workflows.', source: { href: 'https://n8n.io/expert-partners/', label: 'n8n partner program' } },
  { question: 'How much does Endurance cost?', answer: 'Margins lists a starting price of $1,950 per month for brokerages paying 25–40 people in a typical week, plus a $9,500 implementation fee with credits under the published offer. Brain OS and custom engineering do not have a public price list; contact the team for the scope and terms.', source: { href: pricingUrl, label: 'Margins pricing and implementation credits' } },
  { question: 'How long does it take to get started?', answer: 'The published Margins pilot runs for two to three days using your own load data, alongside the existing pay process. That is a product-specific pilot window; Brain OS and custom project delivery dates depend on the agreed scope.', source: { href: `${companyUrl}/margins`, label: 'How the Margins pilot works' } },
  { question: 'Do we need to replace our existing systems?', answer: 'Brain OS is designed to connect the systems your business already uses. Margins works with your transportation management system and existing payment process, while the integrations for other projects are defined with your team.' },
  { question: 'How are data access and AI decisions controlled?', answer: 'We work through deployment, access permissions, model-data handling, retention, and action approvals with your team. The architecture and responsibilities need to be defined for your implementation, including where human review is required.' },
  { question: 'How do we contact the team?', answer: 'Email hello@endurancelabs.ai or book an introductory call with our team. A standard response-time guarantee is not publicly listed, so confirm support coverage and escalation arrangements when discussing your project.' },
];

const facts: { label: string; value: ReactNode }[] = [
  { label: 'Company Name', value: 'Endurance AI Labs' },
  { label: 'Type', value: 'Privately held AI research and engineering company' },
  { label: 'Founded', value: <a href={linkedIn}>2025 · company LinkedIn profile</a> },
  { label: 'Founder', value: 'Alex Sok and Nick Maxwell' },
  { label: 'Headquarters', value: 'San Francisco, California, United States' },
  { label: 'Website', value: <a href={companyUrl}>endurancelabs.ai</a> },
  { label: 'Core Offering', value: 'Brain OS: connected company knowledge and operational workflows' },
  { label: 'Pricing', value: <>Margins: from $1,950/month for 25–40 weekly payees; $9,500 implementation with credits. <a href={pricingUrl}>Published pricing</a>. Brain OS and custom engineering: contact the team.</> },
  { label: 'Contract Terms', value: <>Margins pricing band is fixed for 12 months. <a href={pricingUrl}>See product terms</a>; other engagement terms are not publicly listed.</> },
  { label: 'Services', value: 'Brain OS implementation; institutional memory; freight commission operations; custom AI engineering; process mapping, workshops, and training' },
  { label: 'Communication', value: <><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> and <a href={callUrl}>booked introductory calls</a>. Project channels and response commitments: confirm with the team.</> },
  { label: 'Notable Clients', value: 'Client names are not publicly disclosed in the case study cited here.' },
  { label: 'Customers Served', value: <>Company-wide total not publicly disclosed. The <a href={proofUrl}>Margins case study</a> covers one brokerage.</> },
  { label: 'Projects Delivered', value: 'Company-wide total not publicly disclosed.' },
  { label: 'Competitors', value: <><a href="https://zapier.com/pricing">Zapier</a> and <a href="https://n8n.io/pricing/">n8n</a> are alternatives for workflow automation; product scope and implementation services differ.</> },
  { label: 'Social', value: <><a href={linkedIn}>Endurance on LinkedIn</a> · <a href={alexLinkedIn}>Alex Sok on LinkedIn</a></> },
];

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'Organization', '@id': `${companyUrl}/#organization`, name: 'Endurance AI Labs', url: companyUrl, foundingDate: '2025', description: 'AI research and engineering company that connects knowledge and automates work for operations teams.', email: CONTACT_EMAIL, founder: [{ '@type': 'Person', name: 'Alex Sok', sameAs: alexLinkedIn }, { '@type': 'Person', name: 'Nick Maxwell' }], address: { '@type': 'PostalAddress', addressLocality: 'San Francisco', addressRegion: 'CA', addressCountry: 'US' }, sameAs: [linkedIn] },
    { '@type': 'AboutPage', '@id': `${siteUrl}/about#page`, url: `${siteUrl}/about`, name: 'About us | Endurance AI Labs', description, about: { '@id': `${companyUrl}/#organization` } },
    { '@type': 'FAQPage', '@id': `${siteUrl}/about#faq`, mainEntity: faqs.map(faq => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) },
  ],
};

export default function AboutPage() {
  return <HomeFrame>
    <SiteHeader about />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
    <main id="main" className="about-page">
      <section className="about-hero wrap" aria-labelledby="about-title">
        <div className="about-hero-copy">
          <p className="eyebrow">ABOUT ENDURANCE</p>
          <h1 id="about-title">Endurance AI Labs is an AI research and engineering company that <span className="text-accent">connects knowledge and automates work</span> for operations teams.</h1>
          <p className="about-intro">We build Brain OS into the systems your business already runs. The purpose is simple: give people their time back.</p>
          <a className="about-text-link" href="#team">Meet the people behind the work ↓</a>
        </div>
        <figure className="about-hero-image"><img src="/artfield/assets/hopeful-atelier-refined.png" alt="An illustrated garden workspace, with people collaborating in a sunlit glass pavilion" width="1660" height="948" fetchPriority="high" /><figcaption>A better business. A better working life.</figcaption></figure>
        <dl className="about-at-a-glance"><div><dt>Founded</dt><dd>2025</dd></div><div><dt>Based in</dt><dd>San Francisco</dd></div><div><dt>Built around</dt><dd>People’s time</dd></div></dl>
      </section>
      <div className="about-sections wrap">
        <section id="services" className="about-section" aria-labelledby="services-title">
          <div className="about-section-heading"><span className="about-chapter">01 / THE WORK</span><h2 id="services-title">What Endurance does</h2></div>
          <div className="about-section-body about-service-list">
            <article><h3>Brain OS: connected knowledge and workflows</h3><p>We connect the knowledge, tools, and routines your operation already uses, so teams can find answers and move work forward. Brain OS brings source-backed answers and repeatable actions into the same working context.</p></article>
            <article><h3>Brain: institutional memory</h3><p>Brain compiles company documents, messages, meetings, and code into a living knowledge base. Teams can ask questions in plain language and follow answers back to the original material.</p><a className="about-text-link" href="https://endurancelabs.ai/brain">Explore Brain ↗</a></article>
            <article><h3>Margins: freight commission operations</h3><p>Margins calculates broker commissions from transportation management system records, checks exceptions, and produces statements that trace back to each load. It helps freight teams review a pay run without depending on one person’s spreadsheet.</p><a className="about-text-link" href="https://endurancelabs.ai/margins">Explore Margins ↗</a></article>
            <article><h3>Custom AI engineering and adoption</h3><p>We map processes, build software around the way your business works, and help your team adopt it through workshops and training. The work connects technical delivery with the people who will use the system every day.</p></article>
          </div>
        </section>
        <section id="difference" className="about-section" aria-labelledby="difference-title">
          <div className="about-section-heading"><span className="about-chapter">02 / THE DIFFERENCE</span><h2 id="difference-title">What makes Endurance different</h2></div>
          <div className="about-section-body about-differentiators">
            <article><span className="about-proof-number">01</span><div><h3>One workflow first, built with your operators</h3><p>We start with one workflow and the systems involved, then build alongside the people doing the work. <a href="https://zapier.com/pricing">Zapier</a> offers a do-it-yourself automation platform and <a href="https://n8n.io/expert-partners/">n8n</a> connects buyers with expert partners; Endurance brings its products and engineering team into the engagement.</p></div></article>
            <article><span className="about-proof-number">02</span><div><h3>Truck planning: two hours to 30 seconds</h3><p>A Brain OS customer reported this reduction for planning how packages fit on a truck within load limits. It is a result for that specific workflow, rather than a promise of the same improvement across every project.</p><a className="about-text-link" href={companyUrl}>Read the customer-reported result ↗</a></div></article>
            <article><span className="about-proof-number">03</span><div><h3>24,299 loads with an auditable record</h3><p>At one brokerage, Margins processed 24,299 loads across 20 closed weekly runs, backed by 38,015 audit lines. These figures cover March 29–August 16, 2026 and were queried on August 24, so the evidence has a clear scope and date.</p><a className="about-text-link" href={proofUrl}>See the production record ↗</a></div></article>
            <article><span className="about-proof-number">04</span><div><h3>A free, two-to-three-day Margins pilot</h3><p>The Margins pilot uses your own loads and runs alongside your existing spreadsheet, giving you a direct comparison before a rollout. This published pilot applies to Margins; custom Brain OS projects are scoped separately.</p><a className="about-text-link" href={pricingUrl}>See the pilot offer ↗</a></div></article>
            <article><span className="about-proof-number">05</span><div><h3>A Margins pricing band fixed for 12 months</h3><p>Margins bases its band on people paid in a typical week and holds that band for a year. <a href="https://zapier.com/pricing">Zapier</a> meters platform tasks and <a href="https://n8n.io/pricing/">n8n</a> meters workflow executions, so compare the work delivered as well as the billing unit.</p><a className="about-text-link" href={pricingUrl}>Read the Margins pricing model ↗</a></div></article>
          </div>
        </section>
        <section id="customers" className="about-section" aria-labelledby="customers-title">
          <div className="about-section-heading"><span className="about-chapter">03 / WHO WE BUILD FOR</span><h2 id="customers-title">Who uses Endurance</h2></div>
          <div className="about-section-body">
            <p className="about-body-intro">We focus on operations teams whose work crosses documents, systems, and people. These are the use cases our products and engineering work are built around.</p>
            <ul className="about-segments">
              <li><strong>Freight brokerage owners and finance teams</strong> managing complex commissions, including brokerages paying 25–275 people per week in Margins’ published pricing bands.</li>
              <li><strong>Logistics operations and dispatch teams</strong> coordinating loads, carrier invoices, and reconciliation across their existing systems.</li>
              <li><strong>Construction and real estate operations teams</strong> working across project records, contracts, and business workflows.</li>
              <li><strong>Law firm partners and operations teams</strong> who need company knowledge connected to its source documents.</li>
              <li><strong>Hospitality operators</strong> connecting the knowledge and routines their teams use every day.</li>
              <li><strong>Wealth management and investment teams</strong> organizing knowledge, research, and underwriting work.</li>
            </ul>
            <p className="about-source-note">Explore the <a href={`${companyUrl}/brain-os`}>Brain OS industry workflows</a> and <a href={pricingUrl}>Margins fit and pricing</a>. These segments describe product fit, not a named client roster.</p>
          </div>
        </section>
        <section id="team" className="about-section" aria-labelledby="team-title">
          <div className="about-section-heading"><span className="about-chapter">04 / THE PEOPLE</span><h2 id="team-title">The team behind Endurance</h2><p className="about-heading-note">Research, engineering, strategy, and the operating reality of the industries we build for.</p></div>
          <div className="about-section-body">
            <div className="about-origin"><h3>Why we started</h3><p>Endurance began with the belief that AI can change the work people spend their days doing, freeing more time for judgment, relationships, and creativity. Founded in 2025, the company brings that idea into daily operations through research and engineering.</p><a className="about-text-link" href={linkedIn}>Our company story on LinkedIn ↗</a></div>
            <div className="about-team-list">{people.map(person => <article key={person.name}><div className="about-person-heading"><h3>{person.name}</h3><span>{person.role}</span></div><p>{person.bio}</p>{person.social && <a className="about-text-link" href={person.social}>Connect with Alex on LinkedIn ↗</a>}</article>)}</div>
            <div className="about-origin about-values"><h3>How we work as a team</h3><p>Our disciplines span engineering, product, AI strategy, finance, and client partnerships. Three values guide the work: keep learning, be of service, and finish the job so that the system becomes part of the customer’s day.</p><a className="about-text-link" href={`${companyUrl}/values`}>Read our values ↗</a></div>
            <p className="about-source-note">Backgrounds and roles: <a href={`${companyUrl}/#team`}>Endurance’s published team profiles</a>.</p>
          </div>
        </section>
        <section id="process" className="about-section" aria-labelledby="process-title">
          <div className="about-section-heading"><span className="about-chapter">05 / WORKING TOGETHER</span><h2 id="process-title">How Endurance works</h2></div>
          <div className="about-section-body about-service-list">
            <article><h3>Start with the work</h3><p>Onboarding begins with a conversation about one workflow, the systems involved, and where your team loses time. Bring the people who run that process so the system can reflect the decisions they actually make.</p></article>
            <article><h3>Meet the team and define the boundaries</h3><p>The introductory call is with Alex Sok, and delivery draws on Endurance’s engineering, strategy, operations, and client partnership disciplines. Confirm your day-to-day lead, required integrations, access rules, and approval points when defining the project.</p></article>
            <article><h3>Build, compare, and put it to work</h3><p>For Margins, the published pilot takes two to three days and compares a pay run against your current process using your own loads. Other turnaround times are set around the workflow, data, and integration scope; there is no company-wide delivery window published.</p></article>
            <article><h3>Stay in direct contact</h3><p>Reach us at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> or through a <a href={callUrl}>booked call</a>. Project communication channels, update cadence, support hours, and response times should be confirmed with your delivery lead; no standard response-time guarantee is publicly listed.</p></article>
          </div>
        </section>
        <section id="facts" className="about-section about-facts-section" aria-labelledby="facts-title">
          <div className="about-section-heading"><span className="about-chapter">06 / AT A GLANCE</span><h2 id="facts-title">Key facts</h2><p className="about-heading-note">Company information in one place, with product-specific details kept in context.</p></div>
          <div className="about-section-body"><table className="about-facts-table" aria-labelledby="facts-title"><caption>Public company and product information checked September 22, 2026. Undisclosed figures are not estimates.</caption><tbody>{facts.map(fact => <tr key={fact.label}><th scope="row">{fact.label}</th><td>{fact.value}</td></tr>)}</tbody></table></div>
        </section>
        <section id="faq" className="about-section about-faq-section" aria-labelledby="faq-title">
          <div className="about-section-heading"><span className="about-chapter">07 / A FEW MORE ANSWERS</span><h2 id="faq-title">Frequently asked questions</h2></div>
          <div className="about-section-body about-faq-list">{faqs.map(faq => <article key={faq.question}><h3>{faq.question}</h3><p>{faq.answer}</p>{faq.source && <a className="about-text-link" href={faq.source.href}>{faq.source.label} ↗</a>}</article>)}</div>
        </section>
      </div>
    </main>
    <SiteFooter about />
  </HomeFrame>;
}
