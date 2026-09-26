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
const brainPricingUrl = `${companyUrl}/brain/pricing`;
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
  { question: 'How much does Endurance cost?', answer: 'Brain starts at $1,250 per month for up to 25 people, with no setup fee; Brain OS actions and custom engineering are scoped separately. Margins starts at $1,950 per month for 25–40 weekly payees, plus a $9,500 implementation fee with credits under the published offer.', source: { href: brainPricingUrl, label: 'Brain pricing and scope' } },
  { question: 'How long does it take to get started?', answer: 'The published Margins pilot runs for two to three days using your own load data, alongside the existing pay process. That is a product-specific pilot window; Brain OS and custom project delivery dates depend on the agreed scope.', source: { href: `${companyUrl}/margins`, label: 'How the Margins pilot works' } },
  { question: 'Do we need to replace our existing systems?', answer: 'Brain OS is designed to connect the systems your business already uses. Margins works with your transportation management system and existing payment process, while the integrations for other projects are defined with your team.' },
  { question: 'How are data access and AI decisions controlled?', answer: 'We define which systems connect, what information each person can access, and which actions require approval. We also agree on data location, model providers, retention, and the responsibilities of your team and ours.' },
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
  { label: 'Pricing', value: <><a href={brainPricingUrl}>Brain: from $1,250/month</a> for up to 25 people, with no setup fee. <a href={pricingUrl}>Margins: from $1,950/month</a> for 25–40 weekly payees; $9,500 implementation with credits. Brain OS actions and custom engineering are scoped separately.</> },
  { label: 'Contract Terms', value: <>Brain and Margins pricing bands are fixed for 12 months. See <a href={brainPricingUrl}>Brain pricing</a> and <a href={pricingUrl}>Margins pricing</a>; confirm other engagement terms with the team.</> },
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
    <SiteHeader current="about" />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
    <main id="main" className="about-page">
      <section className="about-hero wrap" aria-labelledby="about-title">
        <div className="about-hero-copy">
          <p className="eyebrow">ABOUT ENDURANCE</p>
          <h1 id="about-title">Endurance AI Labs is an AI research and engineering company that <span className="text-accent">connects knowledge and automates work</span> for operations teams.</h1>
          <p className="about-intro">A business knows more than any one person can keep in mind. We build Brain OS to make that knowledge easier to find and use, giving people more time for the work that needs their judgment.</p>
          <a className="about-text-link" href="#team">Meet the people behind the work ↓</a>
        </div>
        <figure className="about-hero-image"><img src="/artfield/assets/hopeful-atelier-refined.png" alt="An illustrated garden workspace, with people collaborating in a sunlit glass pavilion" width="1660" height="948" fetchPriority="high" /><figcaption>A better business. A better working life.</figcaption></figure>
        <dl className="about-at-a-glance"><div><dt>Founded</dt><dd>2025</dd></div><div><dt>Based in</dt><dd>San Francisco</dd></div><div><dt>Built around</dt><dd>People’s time</dd></div></dl>
      </section>
      <div className="about-sections wrap">
        <section id="services" className="about-section" aria-labelledby="services-title">
          <div className="about-section-heading"><span className="about-chapter">01 / THE WORK</span><h2 id="services-title">What Endurance does</h2></div>
          <div className="about-section-body about-service-list">
            <article><h3>Brain OS: connected knowledge and workflows</h3><p>Brain OS connects company knowledge with the systems where work happens. Your team can ask a question, examine the supporting records, and prepare an action in the same conversation.</p></article>
            <article><h3>Brain: institutional memory</h3><p>Brain organizes company documents, messages, meetings, and code into a living knowledge base. A team member can ask in plain language and follow the answer back to its sources, making the knowledge easier to share and check.</p><a className="about-text-link" href="https://endurancelabs.ai/brain">Explore Brain ↗</a></article>
            <article><h3>Margins: freight commission operations</h3><p>Margins calculates broker commissions from transportation management system records, checks exceptions, and produces statements that trace back to each load. It helps freight teams review a pay run without depending on one person’s spreadsheet.</p><a className="about-text-link" href="https://endurancelabs.ai/margins">Explore Margins ↗</a></article>
            <article><h3>Custom AI engineering and adoption</h3><p>We learn how a process works from the people who run it, then build and test the software with them. Workshops and training help the system become part of daily work.</p></article>
          </div>
        </section>
        <section id="difference" className="about-section" aria-labelledby="difference-title">
          <div className="about-section-heading"><span className="about-chapter">02 / THE DIFFERENCE</span><h2 id="difference-title">What makes Endurance different</h2></div>
          <div className="about-section-body about-differentiators">
            <article><span className="about-proof-number">01</span><div><h3>One workflow first, built with your operators</h3><p>We start with one workflow and the systems involved, then build alongside the people doing the work. <a href="https://zapier.com/pricing">Zapier</a> offers a do-it-yourself automation platform and <a href="https://n8n.io/expert-partners/">n8n</a> connects buyers with expert partners; Endurance brings its products and engineering team into the engagement.</p></div></article>
            <article><span className="about-proof-number">02</span><div><h3>Truck planning: two hours to 30 seconds</h3><p>A Brain OS customer reported reducing truckload planning from two hours to 30 seconds while accounting for load limits. That result belongs to one workflow; the effect on another needs to be measured in its own setting.</p><a className="about-text-link" href={companyUrl}>Read the customer-reported result ↗</a></div></article>
            <article><span className="about-proof-number">03</span><div><h3>24,299 loads with an auditable record</h3><p>At one brokerage, Margins processed 24,299 loads across 20 closed weekly runs, backed by 38,015 audit lines. These figures cover March 29–August 16, 2026 and were queried on August 24, so the evidence has a clear scope and date.</p><a className="about-text-link" href={proofUrl}>See the production record ↗</a></div></article>
            <article><span className="about-proof-number">04</span><div><h3>A free, two-to-three-day Margins pilot</h3><p>The Margins pilot uses your own loads and runs alongside your existing spreadsheet, giving you a direct comparison before a rollout. This published pilot applies to Margins; custom Brain OS projects are scoped separately.</p><a className="about-text-link" href={pricingUrl}>See the pilot offer ↗</a></div></article>
            <article><span className="about-proof-number">05</span><div><h3>A Margins pricing band fixed for 12 months</h3><p>Margins bases its band on people paid in a typical week and holds that band for a year. <a href="https://zapier.com/pricing">Zapier</a> meters platform tasks and <a href="https://n8n.io/pricing/">n8n</a> meters workflow executions, so compare the work delivered as well as the billing unit.</p><a className="about-text-link" href={pricingUrl}>Read the Margins pricing model ↗</a></div></article>
          </div>
        </section>
        <section id="customers" className="about-section" aria-labelledby="customers-title">
          <div className="about-section-heading"><span className="about-chapter">03 / WHO WE BUILD FOR</span><h2 id="customers-title">Who uses Endurance</h2></div>
          <div className="about-section-body">
            <p className="about-body-intro">We build for teams whose work crosses documents, systems, and people. The strongest current Brain OS fit is freight operations using Microsoft Teams; the other segments below reflect the industry workflows we design for.</p>
            <ul className="about-segments">
              <li><strong>Freight brokerages, third-party logistics firms, and asset carriers</strong> with 25–140 people working in Microsoft Teams, the closest fit described in our <a href={`${companyUrl}/brain-os/use-cases`}>Brain OS use cases</a>.</li>
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
            <div className="about-origin"><h3>Why we started</h3><p>Founded in 2025, Endurance works on a practical question: how much of a working day could people reclaim if their tools helped them find and use what the business already knows? We pursue that question through research, engineering, and close work with the people who use the systems.</p><a className="about-text-link" href={linkedIn}>Our company story on LinkedIn ↗</a></div>
            <div className="about-team-list">{people.map(person => <article key={person.name}><div className="about-person-heading"><h3>{person.name}</h3><span>{person.role}</span></div><p>{person.bio}</p>{person.social && <a className="about-text-link" href={person.social}>Connect with Alex on LinkedIn ↗</a>}</article>)}</div>
            <div className="about-origin about-values"><h3>How we work as a team</h3><p>Our team brings together engineering, product, AI strategy, finance, and client partnerships. We keep learning from the work, take responsibility for helping, and see a project through to daily use.</p><a className="about-text-link" href={`${companyUrl}/values`}>Read our values ↗</a></div>
            <p className="about-source-note">Backgrounds and roles: <a href={`${companyUrl}/#team`}>Endurance’s published team profiles</a>.</p>
          </div>
        </section>
        <section id="process" className="about-section" aria-labelledby="process-title">
          <div className="about-section-heading"><span className="about-chapter">05 / WORKING TOGETHER</span><h2 id="process-title">How Endurance works</h2></div>
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
    <SiteFooter current="about" />
  </HomeFrame>;
}
