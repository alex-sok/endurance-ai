import type { Metadata } from 'next';
import Image from 'next/image';
import type { ReactNode } from 'react';
import { SiteHeader, SiteFooter } from '../landing/site-chrome';
import LandingFrame from '../landing/landing-frame';
import { CALENDLY_URL as callUrl, CONTACT_EMAIL } from '@/lib/conversation-flows';
import { organizationNode } from '@/lib/site-schema';

const siteUrl = 'https://endurancelabs.ai';
const companyUrl = 'https://endurancelabs.ai';
const linkedIn = 'https://www.linkedin.com/company/endurance-ai-labs';
const alexLinkedIn = 'https://www.linkedin.com/in/alexsok';
const proofUrl = `${companyUrl}/margins/proof`;
const description = 'Meet endurance: the San Francisco AI research and engineering company behind BrainOS. Our work, people, approach, and company facts.';

export const metadata: Metadata = {
  title: 'About us | endurance',
  description,
  alternates: { canonical: `${siteUrl}/about` },
  openGraph: { title: 'About us | endurance', description, url: `${siteUrl}/about`, type: 'website' },
  twitter: { card: 'summary_large_image', title: 'About us | endurance', description },
};

const people = [
  { name: 'Alex Sok', role: 'Co-founder & CEO', bio: 'Alex is a three-time founder and angel investor with AI experience at Tetration and Cisco. He also held product leadership roles at Prospera.', social: alexLinkedIn },
  { name: 'Nick Maxwell', role: 'Co-founder & CTO', bio: 'Nick studied computer science at Cornell and is a three-time founder. His background includes an exit of Tala to Intuit.' },
  { name: 'Ramzy Azar', role: 'Co-founder & COO', bio: 'Ramzy brings a UC Berkeley background and experience in finance and investment. He leads operations, finance, and AI strategy.' },
];

const faqs = [
  { question: 'What is endurance?', answer: 'endurance is an AI research and engineering company based in San Francisco. It builds BrainOS, connected business software, and custom workflows that help operations teams recover time.' },
  { question: 'What is the difference between Brain and BrainOS?', answer: 'Brain compiles company knowledge into a source-backed institutional memory. BrainOS connects business knowledge with systems and routines so teams can act on that context as well as ask questions.' },
  { question: 'How is endurance different from Zapier or n8n?', answer: 'Zapier and n8n provide platforms for building automations, and both offer access to implementation partners. endurance combines its own products with a research and engineering team that works alongside operators to build the system around their workflows.', source: { href: 'https://n8n.io/expert-partners/', label: 'n8n partner program' } },
  { question: 'How long does it take to get started?', answer: 'The published Margins pilot runs for two to three days using your own load data, alongside the existing pay process. That is a product-specific pilot window; BrainOS and custom project delivery dates depend on the agreed scope.', source: { href: `${companyUrl}/margins`, label: 'How the Margins pilot works' } },
  { question: 'Do we need to replace our existing systems?', answer: 'No. BrainOS connects to the ERP or system of record your business already runs. Each system gets its own connector, and the rest of BrainOS carries over. Margins works with your transportation management system and existing payment process. The integrations for other projects are defined with your team.' },
  { question: 'How are data access and AI decisions controlled?', answer: 'We define which systems connect, what information each person can access, and which actions require approval. We also agree on data location, model providers, retention, and the responsibilities of your team and ours.' },
  { question: 'How do we contact the team?', answer: 'Email hello@endurancelabs.ai or book an introductory call with our team. A standard response-time guarantee is not publicly listed, so confirm support coverage and escalation arrangements when discussing your project.' },
];

const facts: { label: string; value: ReactNode }[] = [
  { label: 'Company Name', value: 'endurance' },
  { label: 'Type', value: 'Privately held AI research and engineering company' },
  { label: 'Founded', value: <a href={linkedIn}>2025 · company LinkedIn profile</a> },
  { label: 'Founders', value: 'Alex Sok, Nick Maxwell, and Ramzy Azar' },
  { label: 'Headquarters', value: 'San Francisco, California, United States' },
  { label: 'Website', value: <a href={companyUrl}>endurancelabs.ai</a> },
  { label: 'Core Offering', value: 'BrainOS: company knowledge and operational workflows, connected on any ERP or system of record' },
  { label: 'Services', value: 'BrainOS implementation; institutional memory; freight commission operations; custom AI engineering; process mapping, workshops, and training' },
  { label: 'Communication', value: <><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> and <a href={callUrl}>booked introductory calls</a>. Project channels and response commitments: confirm with the team.</> },
  { label: 'Notable Clients', value: 'Client names are not publicly disclosed in the case study cited here.' },
  { label: 'Customers Served', value: <>Company-wide total not publicly disclosed. The <a href={proofUrl}>Margins case study</a> covers one brokerage.</> },
  { label: 'Projects Delivered', value: 'Company-wide total not publicly disclosed.' },
  { label: 'Competitors', value: <><a href="https://zapier.com/pricing">Zapier</a> and <a href="https://n8n.io/pricing/">n8n</a> are alternatives for workflow automation; product scope and implementation services differ.</> },
  { label: 'Social', value: <><a href={linkedIn}>endurance on LinkedIn</a> · <a href={alexLinkedIn}>Alex Sok on LinkedIn</a></> },
];

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    organizationNode(),
    { '@type': 'AboutPage', '@id': `${siteUrl}/about#page`, url: `${siteUrl}/about`, name: 'About us | endurance', description, about: { '@id': `${companyUrl}/#organization` } },
    { '@type': 'FAQPage', '@id': `${siteUrl}/about#faq`, mainEntity: faqs.map(faq => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) },
  ],
};

export default function AboutPage() {
  return <LandingFrame>
    <SiteHeader about />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
    <main id="main" className="about-page">
      <section className="about-hero wrap" aria-labelledby="about-title">
        <div className="about-hero-copy">
          <p className="eyebrow">ABOUT endurance</p>
          <h1 id="about-title">endurance is an AI research and engineering company that <span className="text-accent">connects knowledge and automates work</span> for operations teams in construction, manufacturing, logistics and energy.</h1>
          <p className="about-intro">A business knows more than any one person can keep in mind. We build BrainOS to make that knowledge easier to find and use. It connects to the ERP or system of record you already run, and gives people more time for the work that needs their judgment.</p>
          <a className="about-text-link" href="#team">Meet the people behind the work ↓</a>
        </div>
        <figure className="about-hero-image"><Image src="/modern-city.png" alt="A concept of a modern city with industry, renewable energy, and green neighborhoods" width={1672} height={941} priority sizes="(max-width: 760px) 100vw, 50vw" style={{ position: "absolute", width: "100%", height: "100%", objectFit: "cover" }} /><figcaption>A better business. A better working life.</figcaption></figure>
        <dl className="about-at-a-glance"><div><dt>Founded</dt><dd>2025</dd></div><div><dt>Based in</dt><dd>San Francisco</dd></div><div><dt>Built around</dt><dd>People’s time</dd></div></dl>
      </section>
      <div className="about-sections wrap">
        <section id="services" className="about-section" aria-labelledby="services-title">
          <div className="about-section-heading"><span className="about-chapter">01 / THE WORK</span><h2 id="services-title">What endurance does</h2></div>
          <div className="about-section-body about-service-list">
            <article><h3>BrainOS: connected knowledge and workflows</h3><p>BrainOS connects company knowledge with the ERP or system of record where work happens. Your team can ask a question, examine the supporting records, and prepare an action in the same conversation.</p></article>
            <article><h3>Brain: institutional memory</h3><p>Brain organizes company documents, messages, meetings, and code into a living knowledge base. A team member can ask in plain language and follow the answer back to its sources, making the knowledge easier to share and check.</p><a className="about-text-link" href="https://endurancelabs.ai/brain">Explore Brain ↗</a></article>
            <article><h3>Margins: freight commission operations</h3><p>Margins calculates broker commissions from transportation management system records, checks exceptions, and produces statements that trace back to each load. It helps freight teams review a pay run without depending on one person’s spreadsheet.</p><a className="about-text-link" href="https://endurancelabs.ai/margins">Explore Margins ↗</a></article>
            <article><h3>Custom AI engineering and adoption</h3><p>We learn how a process works from the people who run it, then build and test the software with them. Workshops and training help the system become part of daily work.</p></article>
          </div>
        </section>
        <section id="difference" className="about-section" aria-labelledby="difference-title">
          <div className="about-section-heading"><span className="about-chapter">02 / THE DIFFERENCE</span><h2 id="difference-title">What makes endurance different</h2></div>
          <div className="about-section-body about-differentiators">
            <article><span className="about-proof-number">01</span><div><h3>One workflow first, built with your operators</h3><p>We start with one workflow and the systems involved, then build alongside the people doing the work. <a href="https://zapier.com/pricing">Zapier</a> offers a do-it-yourself automation platform and <a href="https://n8n.io/expert-partners/">n8n</a> connects buyers with expert partners; endurance brings its products and engineering team into the engagement.</p></div></article>
            <article><span className="about-proof-number">02</span><div><h3>Truck planning: two hours to 30 seconds</h3><p>A BrainOS customer reported reducing truckload planning from two hours to 30 seconds while accounting for load limits. That result belongs to one workflow; the effect on another needs to be measured in its own setting.</p><a className="about-text-link" href={companyUrl}>Read the customer-reported result ↗</a></div></article>
            <article><span className="about-proof-number">03</span><div><h3>24,299 loads with an auditable record</h3><p>At one brokerage, Margins processed 24,299 loads across 20 closed weekly runs, backed by 38,015 audit lines. These figures cover March 29–August 16, 2026 and were queried on August 24, so the evidence has a clear scope and date.</p><a className="about-text-link" href={proofUrl}>See the production record ↗</a></div></article>
            <article><span className="about-proof-number">04</span><div><h3>A two-to-three-day Margins pilot</h3><p>The Margins pilot uses your own loads and runs alongside your existing spreadsheet, giving you a direct comparison before a rollout. This published pilot applies to Margins; custom BrainOS projects are scoped separately.</p><a className="about-text-link" href={`${companyUrl}/margins`}>See how the pilot works ↗</a></div></article>
          </div>
        </section>
        <section id="customers" className="about-section" aria-labelledby="customers-title">
          <div className="about-section-heading"><span className="about-chapter">03 / WHO WE BUILD FOR</span><h2 id="customers-title">Who uses endurance</h2></div>
          <div className="about-section-body">
            <p className="about-body-intro">We build for operations teams in construction, manufacturing, logistics and energy: businesses whose work crosses a system of record, documents and people. Logistics is where BrainOS has run longest in production. A construction deployment is in build.</p>
            <ul className="about-segments">
              <li><strong>Construction contractors and project teams</strong> working across job costing, project records, field service and contracts, with one BrainOS deployment in build for autumn 2026.</li>
              <li><strong>Manufacturers</strong> whose orders, inventory, purchasing and maintenance live in an ERP and whose operating rules live in a few people’s heads.</li>
              <li><strong>Logistics operations: freight brokerages, third-party logistics firms and asset carriers</strong> with 25–140 people working in Microsoft Teams, the deployment described in our <a href={`${companyUrl}/brain-os/use-cases`}>BrainOS use cases</a>.</li>
              <li><strong>Freight brokerage owners and finance teams</strong> managing complex commissions, including brokerages paying 25–275 people per week.</li>
              <li><strong>Energy operators and service companies</strong> coordinating field crews, work orders, assets and inspections across the systems they already run.</li>
              <li><strong>Professional services, hospitality, real estate and wealth management teams</strong>, where the <a href={`${companyUrl}/brain-os`}>BrainOS console</a> shows the same pattern applied to matters, units, listings and portfolios.</li>
            </ul>
            <p className="about-source-note">Explore the <a href={`${companyUrl}/brain-os`}>BrainOS industry workflows</a> and <a href={`${companyUrl}/margins`}>how Margins works</a>. These segments describe product fit, not a named client roster.</p>
          </div>
        </section>
        <section id="team" className="about-section" aria-labelledby="team-title">
          <div className="about-section-heading"><span className="about-chapter">04 / THE PEOPLE</span><h2 id="team-title">The team behind endurance</h2><p className="about-heading-note">Research, engineering, strategy, and the operating reality of the industries we build for.</p></div>
          <div className="about-section-body">
            <div className="about-origin"><h3>Why we started</h3><p>Founded in 2025, endurance works on a practical question: how much of a working day could people reclaim if their tools helped them find and use what the business already knows? We pursue that question through research, engineering, and close work with the people who use the systems.</p><a className="about-text-link" href={linkedIn}>Our company story on LinkedIn ↗</a></div>
            <div className="about-team-list">{people.map(person => <article key={person.name}><div className="about-person-heading"><h3>{person.name}</h3><span>{person.role}</span></div><p>{person.bio}</p>{person.social && <a className="about-text-link" href={person.social}>Connect with Alex on LinkedIn ↗</a>}</article>)}</div>
            <div className="about-origin about-values"><h3>How we work as a team</h3><p>Our team brings together engineering, product, AI strategy, finance, and client partnerships. We keep learning from the work, take responsibility for helping, and see a project through to daily use.</p><a className="about-text-link" href={`${companyUrl}/values`}>Read our values ↗</a></div>
            <p className="about-source-note">Backgrounds and roles: <a href="#team">endurance’s published team profiles</a>.</p>
          </div>
        </section>
        <section id="process" className="about-section" aria-labelledby="process-title">
          <div className="about-section-heading"><span className="about-chapter">05 / WORKING TOGETHER</span><h2 id="process-title">How endurance works</h2></div>
          <div className="about-section-body about-service-list">
            <article><h3>Start with the work</h3><p>We begin with one workflow and the people who know it. Together, we look at the systems, decisions, and exceptions involved, then choose a useful first step.</p></article>
            <article><h3>Meet the team and define the boundaries</h3><p>You will work with people from our engineering, strategy, operations, and client partnership team as the project requires. At the outset, agree on your day-to-day lead, required integrations, access rules, and approval points.</p></article>
            <article><h3>Build, compare, and put it to work</h3><p>The Margins pilot takes two to three days, comparing a pay run with your current process using your own loads. For other projects, delivery timing depends on the workflow, data, and integrations; we agree on the scope and schedule with your team.</p></article>
            <article><h3>Stay in direct contact</h3><p>Reach us at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> or through a <a href={callUrl}>booked call</a>. Agree on project channels, update cadence, support hours, and response times with your delivery lead so everyone knows how to stay in touch.</p></article>
          </div>
        </section>
        <section id="facts" className="about-section about-facts-section" aria-labelledby="facts-title">
          <div className="about-section-heading"><span className="about-chapter">06 / AT A GLANCE</span><h2 id="facts-title">Key facts</h2><p className="about-heading-note">Company information in one place, with product-specific details kept in context.</p></div>
          <div className="about-section-body"><table className="about-facts-table" aria-labelledby="facts-title"><caption>Company and product details reviewed September 26, 2026. Undisclosed figures are not estimates.</caption><tbody>{facts.map(fact => <tr key={fact.label}><th scope="row">{fact.label}</th><td>{fact.value}</td></tr>)}</tbody></table></div>
        </section>
        <section id="faq" className="about-section about-faq-section" aria-labelledby="faq-title">
          <div className="about-section-heading"><span className="about-chapter">07 / A FEW MORE ANSWERS</span><h2 id="faq-title">Frequently asked questions</h2></div>
          <div className="about-section-body about-faq-list">{faqs.map(faq => <article key={faq.question}><h3>{faq.question}</h3><p>{faq.answer}</p>{faq.source && <a className="about-text-link" href={faq.source.href}>{faq.source.label} ↗</a>}</article>)}</div>
        </section>
      </div>
    </main>
    <SiteFooter about />
  </LandingFrame>;
}
