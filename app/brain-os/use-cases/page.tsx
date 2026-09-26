/* Static pixel artwork is intentionally served unchanged; dimensions and loading priority are explicit. */
/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next';
import { ArrowUpRight } from 'lucide-react';
import HomeFrame from '@/app/artfield/home-frame';
import pages from '@/app/artfield/brain-pages.module.css';
import { SiteFooter, SiteHeader } from '@/app/artfield/site-chrome';
import { BarList, ChartCard, ColumnChart, PairedColumnChart, RatioBar, StepsStrip, TimelineChart } from '../charts';
import { Heading } from '../heading';
import { ImpactCalculator } from './calculator';
import { RoleTabs } from './roles';
import {
  ACTIONS, ADOPTION, BEFORE_AFTER, CALC, CLOSE, FIT, HEADLINE, HERO, REVENUE, ROLES, ROLLOUT, TOPICS, USE_CASES_META,
} from './content';

export const metadata: Metadata = {
  title: USE_CASES_META.title,
  description: USE_CASES_META.description,
  alternates: { canonical: USE_CASES_META.canonical },
  openGraph: {
    title: USE_CASES_META.title,
    description: USE_CASES_META.description,
    url: USE_CASES_META.canonical,
    siteName: 'Endurance AI Labs',
    type: 'website',
    locale: 'en_US',
  },
  twitter: { card: 'summary_large_image', title: USE_CASES_META.title, description: USE_CASES_META.description },
};

export default function UseCasesPage() {
  const weekdayRows = ADOPTION.weekdays.labels.map((d, i) => [d, ADOPTION.weekdays.lastWeek[i], ADOPTION.weekdays.thisWeek[i]]);
  return (
    <HomeFrame className={pages.pages}>
      <SiteHeader current="use-cases" />
      <main id="main">
        <section className="bp-hero scene" aria-labelledby="hero-title">
          <img className="scene-art bp-hero-art" src="/artfield/assets/hopeful-sunrise.png" alt="" width="1659" height="948" loading="lazy" decoding="async" />
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

        <section className="bp-section is-white" aria-label="The headline figures">
          <div className="wrap">
            <div className="bp-tiles">
              {HEADLINE.map(t => (
                <div className="bp-tile" key={t.label}>
                  <p className={`bp-tile-value${t.blue ? ' is-blue' : ''}`}>
                    {t.before ? <><span className="bp-was">{t.before}</span><span className="sr-only">to</span><span className="bp-arrow" aria-hidden="true">→</span></> : null}
                    {t.value}{t.unit ? <small>{t.unit}</small> : null}
                  </p>
                  <p className="bp-tile-label">{t.label}</p>
                  <p className="bp-tile-source">{t.source}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="before-after" className="bp-section is-mist" aria-labelledby="ba-title">
          <div className="wrap">
            <Heading kicker={BEFORE_AFTER.kicker} title={BEFORE_AFTER.title} lede={BEFORE_AFTER.lede} id="ba-title" />
            <ul className="bp-ba">
              {BEFORE_AFTER.rows.map(row => (
                <li key={row.ask}>
                  <div className="bp-ba-ask">
                    <h3>{row.ask}</h3>
                    <p>{row.who}</p>
                    {row.ratio ? <RatioBar beforeLabel={row.ratio.before} afterLabel={row.ratio.after} ratio={row.ratio.value} /> : null}
                    <p className="bp-ba-receipt"><b>{row.receipt.figure}</b> {row.receipt.label}</p>
                  </div>
                  <div className="bp-before">
                    <p className="bp-ba-tag"><i aria-hidden="true" />THE USUAL</p>
                    <p>{row.before}</p>
                    <StepsStrip steps={row.beforeSteps} unit="steps" />
                    <p className="bp-ba-meta">{row.beforeMeta.map(m => <span key={m}>{m}</span>)}</p>
                  </div>
                  <div className="bp-after">
                    <p className="bp-ba-tag"><i aria-hidden="true" />WITH BRAIN OS</p>
                    <p>{row.after}</p>
                    <StepsStrip steps={row.afterSteps} unit="asks" />
                    <p className="bp-ba-meta">{row.afterMeta.map(m => <span key={m}>{m}</span>)}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="adoption" className="bp-section is-white" aria-labelledby="adoption-title">
          <div className="wrap">
            <Heading kicker={ADOPTION.kicker} title={ADOPTION.title} lede={ADOPTION.lede} id="adoption-title" />
            <div className="bp-charts">
              <ChartCard
                title={ADOPTION.people.title}
                note={ADOPTION.people.note}
                source={ADOPTION.people.source}
                columns={['Week to', 'People']}
                rows={ADOPTION.people.points.map(p => [p.label, p.value])}
              >
                <ColumnChart points={ADOPTION.people.points} unit="people" label="People who asked Brain OS something each week, rising from 12 to 35 over six weeks" />
              </ChartCard>
              <ChartCard
                title={ADOPTION.weekdays.title}
                note={ADOPTION.weekdays.note}
                source={ADOPTION.weekdays.source}
                columns={['Day', 'Week of 14 Sep', 'Week of 21 Sep']}
                rows={weekdayRows}
              >
                <PairedColumnChart
                  labels={ADOPTION.weekdays.labels}
                  series={[
                    { name: 'Week of 14 September', color: '#8fb0e8', values: ADOPTION.weekdays.lastWeek },
                    { name: 'Week of 21 September', color: '#3b66ce', values: ADOPTION.weekdays.thisWeek, partialLast: true },
                  ]}
                  label="Questions per weekday for two consecutive weeks; Monday through Thursday are higher in the second week, peaking at 335 on Thursday. The second Friday is partial."
                />
              </ChartCard>
              <ChartCard
                wide
                title={ADOPTION.ranked.title}
                note={ADOPTION.ranked.note}
                source={ADOPTION.ranked.source}
                columns={['Person, by rank', 'Questions']}
                rows={ADOPTION.ranked.points.map(p => [p.label, p.value])}
              >
                <ColumnChart points={ADOPTION.ranked.points} unit="questions" label="Questions per person in one week, ranked from 254 down to 10 across nineteen people" />
              </ChartCard>
            </div>
            <div className="bp-tiles is-proof">
              {ADOPTION.proof.map(p => (
                <div className="bp-tile" key={p.label}>
                  <p className="bp-tile-value is-small">{p.value}</p>
                  <p className="bp-tile-text">{p.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="topics" className="bp-section is-sky" aria-labelledby="topics-title">
          <div className="wrap">
            <Heading kicker={TOPICS.kicker} title={TOPICS.title} lede={TOPICS.lede} id="topics-title" />
            <div className="bp-charts">
              <ChartCard
                wide
                title={TOPICS.chart.title}
                note={TOPICS.chart.note}
                source={TOPICS.chart.source}
                columns={['Topic', 'Share']}
                rows={TOPICS.chart.rows.map(r => [r.label, `${r.value}%`])}
              >
                <BarList rows={TOPICS.chart.rows} max={30} suffix="%" />
              </ChartCard>
            </div>
            <div className="bp-callout">
              <span className="small-label">A CAPABILITY SHAPED BY DAILY USE</span>
              <p>{TOPICS.callout}</p>
            </div>
          </div>
        </section>

        <section id="actions" className="bp-section is-white" aria-labelledby="actions-title">
          <div className="wrap">
            <Heading kicker={ACTIONS.kicker} title={ACTIONS.title} lede={ACTIONS.lede} id="actions-title" />
            <div className="bp-charts">
              <ChartCard
                wide
                title={ACTIONS.chart.title}
                note={ACTIONS.chart.note}
                source={ACTIONS.chart.source}
                columns={['Group', 'Action', 'Count']}
                rows={ACTIONS.chart.rows.map(r => [r.group ?? '', `${r.label}${r.sub ? ` (${r.sub})` : ''}`, r.value])}
              >
                <BarList rows={ACTIONS.chart.rows} />
              </ChartCard>
            </div>
            <div className="bp-tiles is-proof is-two">
              {ACTIONS.proof.map(p => (
                <div className="bp-tile" key={p.label}>
                  <p className="bp-tile-value">{p.value}</p>
                  <p className="bp-tile-text">{p.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="roles" className="bp-section is-mist" aria-labelledby="roles-title">
          <div className="wrap">
            <Heading kicker={ROLES.kicker} title={ROLES.title} lede={ROLES.lede} id="roles-title" />
            <RoleTabs />
          </div>
        </section>

        <section id="calculator" className="bp-section is-sky" aria-labelledby="calc-title">
          <div className="wrap">
            <Heading kicker={CALC.kicker} title={CALC.title} lede={CALC.lede} id="calc-title" />
            <ImpactCalculator />
            <p className="bp-calc-foot">{CALC.foot}</p>
          </div>
        </section>

        <section id="revenue" className="bp-section is-white" aria-labelledby="revenue-title">
          <div className="wrap">
            <Heading kicker={REVENUE.kicker} title={REVENUE.title} lede={REVENUE.lede} id="revenue-title" />
            <ol className="bp-path is-six" aria-label="Where revenue enters, from quote to cash">
              {REVENUE.flow.map(step => (
                <li key={step.n}>
                  <p className="bp-step-n">{step.n}</p>
                  <h4>{step.title}</h4>
                  <p>{step.body}</p>
                  <p className="bp-ask">{step.ask}</p>
                </li>
              ))}
            </ol>
            <div className="bp-aside">
              <div>
                <p className="eyebrow">{REVENUE.aside.kicker}</p>
                <h3>{REVENUE.aside.title}</h3>
                <p className="bp-prose">{REVENUE.aside.body}</p>
                <a className="bp-quiet-link" href={REVENUE.aside.link.href}>{REVENUE.aside.link.label} <ArrowUpRight size={14} /></a>
              </div>
              <div>
                <ul className="bp-ledger">
                  {REVENUE.aside.rows.map(r => (
                    <li key={r.label}><p>{r.label}<small>{r.sub}</small></p><b>{r.figure}</b></li>
                  ))}
                </ul>
                <p className="bp-source">{REVENUE.aside.source}</p>
              </div>
            </div>
          </div>
        </section>

        <section id="fit" className="bp-section is-deep" aria-labelledby="fit-title">
          <div className="wrap">
            <Heading kicker={FIT.kicker} title={FIT.title} lede={FIT.lede} id="fit-title" />
            <div className="bp-cols">
              <div>
                <h3>WHO BUYS IT</h3>
                <dl>{FIT.buyers.map(b => <div key={b.who}><dt>{b.who}</dt><dd>{b.why}</dd></div>)}</dl>
              </div>
              <div>
                <h3>WHAT USUALLY STARTS THE CONVERSATION</h3>
                <ul>{FIT.triggers.map(t => <li key={t}>{t}</li>)}</ul>
              </div>
              <div>
                <h3>WHEN NOT TO BUY</h3>
                <ul>{FIT.notFor.map(t => <li key={t}>{t}</li>)}</ul>
              </div>
            </div>
          </div>
        </section>

        <section id="rollout" className="bp-section is-white" aria-labelledby="rollout-title">
          <div className="wrap">
            <Heading kicker={ROLLOUT.kicker} title={ROLLOUT.title} lede={ROLLOUT.lede} id="rollout-title" />
            <figure className="bp-chart is-wide bp-only-wide">
              <figcaption className="bp-chart-head"><div><p className="bp-chart-title">From first version to company wide, 2026</p><p className="bp-chart-note">Twelve milestones on one axis. Read only first, then one capability at a time.</p></div></figcaption>
              <TimelineChart events={ROLLOUT.timeline} start={ROLLOUT.span.start} end={ROLLOUT.span.end} months={ROLLOUT.months} label="Twelve milestones from 9 June to 21 September 2026 on one timeline" />
            </figure>
            <ol className="bp-timeline bp-only-narrow">
              {ROLLOUT.timeline.map(t => <li key={t.iso}><time dateTime={t.dateTime ?? t.iso}>{t.date}</time><span>{t.what}</span></li>)}
            </ol>
            <ol className="bp-steps">
              {ROLLOUT.steps.map(s => <li key={s.title}><h3>{s.title}</h3><p>{s.body}</p></li>)}
            </ol>
          </div>
        </section>

        <section id="contact" className="bp-close scene" aria-labelledby="close-title">
          <img className="scene-art bp-close-art" src="/artfield/assets/hopeful-sunrise.png" alt="" width="1659" height="948" loading="lazy" />
          <div className="bp-close-shade" />
          <div className="wrap">
            <p className="eyebrow">{CLOSE.kicker}</p>
            <h2 id="close-title">{CLOSE.title[0]}<br />{CLOSE.title[1]}<br /><span className="text-accent">{CLOSE.title[2]}</span></h2>
            <p>{CLOSE.body}</p>
            <a className="primary-button" href={CLOSE.primary.href} target="_blank" rel="noreferrer"><span>{CLOSE.primary.label}</span><ArrowUpRight size={20} /></a>
            <div className="bp-close-links">
              {CLOSE.links.map(l => <a key={l.href} href={l.href}>{l.label} <ArrowUpRight size={14} /></a>)}
            </div>
            <p className="bp-colophon">{CLOSE.colophon}</p>
          </div>
        </section>
      </main>
      <SiteFooter current="use-cases" />
    </HomeFrame>
  );
}
