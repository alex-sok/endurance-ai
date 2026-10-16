import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { DayStory, WorldSelect } from './brain-experience';
import { industries } from './industries';
import { BusinessArchitecture, SecurityArchitecture } from './architecture-sections';
import { HeroFilm } from './hero-film';
import { SiteHeader, SiteFooter, callUrl } from './site-chrome';
import { GraceChat } from '../artfield/grace-chat';
import { MissionImage, UsageEvidence } from './home-visuals';
import { ProductShowcase } from './product-showcase';

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <HeroFilm />
          <div className="hero-content">
            <h1 id="hero-title"><span>A company brain for the</span> <span>businesses building our future.</span></h1>
            <p className="hero-description">Brain OS organizes your company’s knowledge, learns from every task, and helps everyone do more.</p>
            <div className="hero-actions">
              <a className="primary-button" href="#brain">Meet Brain OS</a>
              <a className="secondary-button" href="#work">Built for your world <ArrowDown size={14} /></a>
            </div>
          </div>
        </section>
        <div className="markets-strip" aria-label="Industries we serve">
          <strong>Built for:</strong>
          <div>{industries.map(industry => <a key={industry.id} href="#work">{industry.label}</a>)}</div>
        </div>
        <section id="brain" className="brain-section" aria-labelledby="brain-title">
          <div className="brain-layout wrap">
            <div className="brain-copy">
              <p className="eyebrow">01 / BRAIN OS AT WORK</p>
              <h2 id="brain-title">Your business knows.<br />Brain OS acts.</h2>
              <p>Know what’s moving. See what’s changing. Ask why. Brain OS brings your records, conversations, and operating knowledge together—so the next step is clearer.</p>
              <a className="text-link" href="#product">Explore Brain OS at work <ArrowDown size={15} /></a>
            </div>
            <UsageEvidence />
          </div>
          <ProductShowcase />
          <div className="engine-footer wrap"><span>Sources connected</span><i /><span>People in control</span><i /><span>Work moving forward</span></div>
        </section>
        <BusinessArchitecture />
        <section id="work" className="world-section" aria-labelledby="world-title">
          <div className="world-heading wrap">
            <div><p className="eyebrow">03 / WHO WE SERVE</p><h2 id="world-title">Built into your world.</h2></div>
            <p>For the companies that keep things built, moved, powered, and running.</p>
          </div>
          <WorldSelect />
        </section>
        <section id="belief" className="belief" aria-labelledby="belief-title">
          <div className="mission-grid wrap">
            <div className="mission-copy">
              <p className="eyebrow">04 / THE MISSION</p>
              <h2 id="belief-title">More room for<br />what people do best.</h2>
              <p>An hour lost to a broken process is still an hour of someone’s life.</p>
              <p className="muted-copy">Chasing information. Copying it between systems. Staying late to hold it all together. We believe people’s time deserves more care.</p>
              <div className="mission-foot"><span>A better business.<br />A better working life.</span></div>
            </div>
            <DayStory />
            <MissionImage />
          </div>
        </section>
        <SecurityArchitecture />
        <section id="contact" className="contact" aria-labelledby="contact-title">
          <div className="contact-content wrap">
            <p className="eyebrow">LET’S BUILD WHAT’S NEXT</p>
            <h2 id="contact-title">Your knowledge.<br />More possibility.</h2>
            <p>Tell us where the work gets stuck.<br />Let’s make more room for what comes next.</p>
            <a className="primary-button" href={callUrl} target="_blank" rel="noreferrer"><span>Tell us about your work</span><ArrowUpRight size={17} /></a>
            <GraceChat />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
