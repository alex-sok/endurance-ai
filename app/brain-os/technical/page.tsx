/* Static pixel artwork is intentionally served unchanged; dimensions and loading priority are explicit. */
/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next';
import { ArrowUpRight, ChartColumn, Clock, Eye, FileText, Inbox, Receipt } from 'lucide-react';
import HomeFrame from '@/app/artfield/home-frame';
import pages from '@/app/artfield/brain-pages.module.css';
import { SiteFooter, SiteHeader } from '@/app/artfield/site-chrome';
import { BarList, CadenceChart, ChartCard, IntegrationMap } from '../charts';
import { Heading } from '../heading';
import { Architecture, DeployDiagram, PageAnatomy, TierMatrix, WritePath } from './diagrams';
import { BRAIN, CLOSE, DESKS, GUARD, HERO, JOBS, NOT, RUNS, SHAPE, TECH_META, TOOLS, TRAVELS } from './content';

export const metadata: Metadata = {
  title: TECH_META.title,
  description: TECH_META.description,
  alternates: { canonical: TECH_META.canonical },
  openGraph: {
    title: TECH_META.title,
    description: TECH_META.description,
    url: TECH_META.canonical,
    siteName: 'Endurance AI Labs',
    type: 'website',
    locale: 'en_US',
  },
  twitter: { card: 'summary_large_image', title: TECH_META.title, description: TECH_META.description },
};

const jobIcons = { eye: Eye, clock: Clock, file: FileText, inbox: Inbox, receipt: Receipt, chart: ChartColumn } as const;

export default function TechnicalPage() {
  return (
    <HomeFrame className={pages.pages}>
      <SiteHeader current="technical" />
      <main id="main">
        <section className="bp-hero scene" aria-labelledby="hero-title">
          <img className="scene-art bp-hero-art" src="/artfield/assets/hopeful-atelier-refined.png" alt="" width="1660" height="948" loading="lazy" decoding="async" />
          <div className="bp-hero-shade" />
          <div className="wrap">
            <p className="eyebrow"><span className="status-light" /> {HERO.eyebrow}</p>
            <h1 id="hero-title">{HERO.h1[0]}<br /><span className="text-accent">{HERO.h1[1]}</span></h1>
            <p className="bp-hero-lede">{HERO.lede}</p>
            <div className="bp-hero-actions">
              <a className="primary-button" href={HERO.primary.href} target="_blank" rel="noreferrer"><span>{HERO.primary.label}</span><ArrowUpRight size={20} /></a>
              <a className="bp-quiet-link" href={HERO.secondary.href}>{HERO.secondary.label} <ArrowUpRight size={14} /></a>
            </div>
          </div>
        </section>

        <section id="shape" className="bp-section is-sky" aria-labelledby="shape-title">
          <div className="wrap">
            <Heading kicker={SHAPE.kicker} title={SHAPE.title} lede={SHAPE.lede} id="shape-title" />
            <Architecture />
            <p className="bp-diagram-cap">{SHAPE.caption}</p>
          </div>
        </section>

        <section id="brain" className="bp-section is-white" aria-labelledby="brain-title">
          <div className="wrap">
            <Heading kicker={BRAIN.kicker} title={BRAIN.title} lede={BRAIN.lede} id="brain-title" />
            <div className="bp-layers">
              {BRAIN.layers.map(l => (
                <div className="bp-layer" key={l.code}>
                  <div><code>{l.code}</code><span className="bp-arch-label">{l.owner}</span></div>
                  <div><h4>{l.title}</h4><p>{l.body}</p></div>
                  <ul>{l.points.map(p => <li key={p}>{p}</li>)}</ul>
                </div>
              ))}
            </div>
            <div className="bp-split">
              <div>
                <PageAnatomy />
                <p className="bp-code-cap">{BRAIN.pageCaption}</p>
              </div>
              <div className="bp-charts is-stack">
                <ChartCard
                  title={BRAIN.pages.title}
                  note={BRAIN.pages.note}
                  source={BRAIN.pages.source}
                  columns={['Kind', 'Pages']}
                  rows={BRAIN.pages.rows.map(r => [r.label, r.value])}
                >
                  <BarList rows={BRAIN.pages.rows} />
                </ChartCard>
                <ChartCard
                  title={BRAIN.taught.title}
                  note={BRAIN.taught.note}
                  source={BRAIN.taught.source}
                  columns={['Window', 'Rules']}
                  rows={BRAIN.taught.rows.map(r => [r.label, r.value])}
                >
                  <BarList rows={BRAIN.taught.rows} />
                </ChartCard>
              </div>
            </div>
            <figure className="bp-chart is-wide bp-split-gap">
              <figcaption className="bp-chart-head"><div><p className="bp-chart-title">{BRAIN.cadence.title}</p><p className="bp-chart-note">{BRAIN.cadence.note}</p></div></figcaption>
              <CadenceChart rows={BRAIN.cadence.rows} label="One week of writers to the brain: mail every two minutes, ids hourly, rollups daily and weekly, and rules taught in chat as they happen" />
              <p className="bp-source">{BRAIN.cadence.source}</p>
            </figure>
          </div>
        </section>

        <section id="tools" className="bp-section is-mist" aria-labelledby="tools-title">
          <div className="wrap">
            <Heading kicker={TOOLS.kicker} title={TOOLS.title} lede={TOOLS.lede} id="tools-title" />
            {TOOLS.body.map(p => <p className="bp-prose" key={p}>{p}</p>)}
            <figure className="bp-chart is-wide bp-split-gap">
              <figcaption className="bp-chart-head"><div><p className="bp-chart-title">Every system Brain OS touches, and which way the data moves</p><p className="bp-chart-note">Tools read live records and preview changes before a confirmation call. Email uses a draft-first instruction; its limits are described below.</p></div></figcaption>
              <IntegrationMap spokes={TOOLS.spokes} label="Brain OS at the centre with nine systems on spokes: the TMS, Teams, mail and Twilio read and write; Truckstop writes; Highway, the federal carrier register and OpenStreetMap read; Entra signs in" />
            </figure>
            <table className="bp-spec">
              <thead><tr><th scope="col">System</th><th scope="col">What Brain OS does with it</th><th scope="col">Access</th></tr></thead>
              <tbody>
                {TOOLS.integrations.map(i => (
                  <tr key={i.system}><th scope="row">{i.system}</th><td>{i.what}</td><td>{i.access}</td></tr>
                ))}
              </tbody>
            </table>
            <p className="bp-source">{TOOLS.notConnected}</p>
          </div>
        </section>

        <section id="guard" className="bp-section is-sky" aria-labelledby="guard-title">
          <div className="wrap">
            <Heading kicker={GUARD.kicker} title={GUARD.title} lede={GUARD.lede} id="guard-title" />
            <WritePath steps={GUARD.path} brake={GUARD.brake} />
            <p className="eyebrow is-gap">REFUSALS BUILT INTO THE TOOLS</p>
            <ul className="bp-refusals">
              {GUARD.refusals.map(r => <li key={r.ask}><span>{r.ask}</span><span>{r.rule}</span></li>)}
            </ul>
            <p className="eyebrow is-gap">ACCESS TIERS</p>
            <p className="bp-prose">{GUARD.tiers.lede}</p>
            <TierMatrix columns={GUARD.tiers.columns} rows={GUARD.tiers.rows} note={GUARD.tiers.note} />
            <p className="eyebrow is-gap">ALSO IN THE LAYER</p>
            <ul className="bp-refusals">
              {GUARD.also.map(a => <li key={a.what}><span>{a.what}</span><span>{a.how}</span></li>)}
            </ul>
          </div>
        </section>

        <section id="desks" className="bp-section is-white" aria-labelledby="desks-title">
          <div className="wrap">
            <Heading kicker={DESKS.kicker} title={DESKS.title} lede={DESKS.lede} id="desks-title" />
            <ol className="bp-ladder">
              {DESKS.ladder.map(l => (
                <li key={l.n} className={l.now ? 'is-now' : undefined}>
                  <p className="bp-step-n">{l.n}</p>
                  <h4>{l.title}</h4>
                  <p>{l.body}</p>
                  <p className="bp-status"><i aria-hidden="true" />{l.status}</p>
                </li>
              ))}
            </ol>
            <div className="bp-split">
              <div>
                <p className="eyebrow">{DESKS.testing.title.toUpperCase()}</p>
                {DESKS.testing.body.map(p => <p className="bp-prose" key={p}>{p}</p>)}
              </div>
            </div>
          </div>
        </section>

        <section id="jobs" className="bp-section is-mist" aria-labelledby="jobs-title">
          <div className="wrap">
            <Heading kicker={JOBS.kicker} title={JOBS.title} lede={JOBS.lede} id="jobs-title" />
            <ul className="bp-jobs">
              {JOBS.groups.map(g => {
                const Icon = jobIcons[g.icon as keyof typeof jobIcons];
                return <li key={g.title}><h3><Icon size={18} aria-hidden="true" />{g.title}</h3><p>{g.body}</p></li>;
              })}
            </ul>
          </div>
        </section>

        <section id="runs" className="bp-section is-deep" aria-labelledby="runs-title">
          <div className="wrap">
            <Heading kicker={RUNS.kicker} title={RUNS.title} lede={RUNS.lede} id="runs-title" />
            <DeployDiagram columns={RUNS.deploy} />
            <p className="bp-diagram-cap">Credentials are kept on the server, outside the knowledge base. Brain OS does not train models on customer data; provider handling and retention are part of the architecture review.</p>
            <table className="bp-spec">
              <thead><tr><th scope="col">Part</th><th scope="col">What it is</th><th scope="col">Note</th></tr></thead>
              <tbody>
                {RUNS.spec.map(s => <tr key={s.part}><th scope="row">{s.part}</th><td>{s.what}</td><td>{s.note}</td></tr>)}
              </tbody>
            </table>
            <div className="bp-split is-gap">
              <div>
                <p className="eyebrow">{RUNS.conversation.title.toUpperCase()}</p>
                <p className="bp-prose">{RUNS.conversation.lede}</p>
                <dl className="security-review is-plain">
                  {RUNS.conversation.rows.map(r => <div key={r.title}><dt>{r.title}</dt><dd>{r.body}</dd></div>)}
                </dl>
              </div>
              <div className="bp-callout">
                <span className="small-label">A CONTROL SHAPED BY USE</span>
                <p>{RUNS.conversation.story}</p>
              </div>
            </div>
          </div>
        </section>

        <section id="travels" className="bp-section is-white" aria-labelledby="travels-title">
          <div className="wrap">
            <Heading kicker={TRAVELS.kicker} title={TRAVELS.title} lede={TRAVELS.lede} id="travels-title" />
            <ul className="bp-deploys">
              {TRAVELS.deployments.map(d => (
                <li key={d.name}>
                  <h3>{d.name}</h3>
                  <p className="bp-status"><i aria-hidden="true" />{d.status}</p>
                  <p>{d.body}</p>
                  <dl>{d.facts.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="limits" className="bp-section is-sky" aria-labelledby="limits-title">
          <div className="wrap">
            <Heading kicker={NOT.kicker} title={NOT.title} lede={NOT.lede} id="limits-title" />
            <ul className="bp-limits">
              {NOT.rows.map(r => <li key={r.assume}><span>{r.assume}</span><span>{r.truth}</span></li>)}
            </ul>
          </div>
        </section>

        <section id="contact" className="bp-close scene" aria-labelledby="close-title">
          <img className="scene-art bp-close-art" src="/artfield/assets/hopeful-sunrise.png" alt="" width="1659" height="948" loading="lazy" />
          <div className="bp-close-shade" />
          <div className="wrap">
            <p className="eyebrow">{CLOSE.kicker}</p>
            <h2 id="close-title">{CLOSE.title[0]}<br /><span className="text-accent">{CLOSE.title[1]}</span></h2>
            <p>{CLOSE.body}</p>
            <a className="primary-button" href={CLOSE.primary.href} target="_blank" rel="noreferrer"><span>{CLOSE.primary.label}</span><ArrowUpRight size={20} /></a>
            <div className="bp-close-links">
              {CLOSE.links.map(l => <a key={l.href} href={l.href}>{l.label} <ArrowUpRight size={14} /></a>)}
            </div>
            <p className="bp-colophon">{CLOSE.colophon}</p>
          </div>
        </section>
      </main>
      <SiteFooter current="technical" />
    </HomeFrame>
  );
}
