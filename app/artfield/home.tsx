/* Static pixel artwork is intentionally served unchanged; dimensions and loading priority are explicit. */
/* eslint-disable @next/next/no-img-element */
import { CALENDLY_URL } from '@/lib/conversation-flows';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { BrainExperience, DayStory, WorldSelect } from './brain-experience';
import { BusinessArchitecture, SecurityArchitecture } from './architecture-sections';
import { GraceChat } from './grace-chat';
import { SiteHeader, SiteFooter } from './site-chrome';
import { CustomerProof, TeamSection } from './proof-and-team';

const callUrl = CALENDLY_URL;

export default function ArtfieldHome() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <section className="hero scene" aria-labelledby="hero-title">
          <img className="scene-art hero-art" src="/artfield/assets/hopeful-sunrise.png" alt="An expansive sunrise sky above a calm coast, with warm light reaching a small community" width="1659" height="948" fetchPriority="high" />
          <div className="hero-shade" />
          <div className="hero-content wrap">
            <p className="eyebrow"><span className="status-light" /> A BETTER WORKING LIFE IS POSSIBLE</p>
            <h1 id="hero-title">Give people<br /><span className="hero-line"><span className="text-accent">back</span> their time.</span></h1>
            <p className="hero-description">Brain OS connects the knowledge and systems your business already uses, so your team can find an answer, check its source, and act on it.</p>
            <a className="primary-button" href="#brain"><span>Meet Brain OS</span><ArrowUpRight size={20} /></a>
            <a className="hero-secondary" href="#belief">Discover why we build <ArrowDown size={14} /></a>
          </div>
          <div className="hero-bottom wrap"><span><span className="status-light" /> BRAIN OS / BUILT BY ENDURANCE</span><a href="#belief">Scroll to explore <ArrowDown size={15} /></a></div>
        </section>
        <section id="belief" className="belief scene" aria-labelledby="belief-title">
          <img className="scene-art belief-art" src="/artfield/assets/hopeful-sunrise.png" alt="" width="1659" height="948" loading="lazy" />
          <div className="belief-shade" />
          <div className="mission-grid wrap">
            <div className="mission-copy">
              <p className="eyebrow">THE MISSION</p>
              <h2 id="belief-title">Time is the<br /><span className="text-accent">real treasure.</span></h2>
              <p>An hour lost to a broken process is still an hour of someone’s life.</p>
              <p className="muted-copy">When information is hard to find, people spend their day chasing it. We connect the records and routines behind that work so a small question needn’t become a long interruption.</p>
              <div className="mission-foot"><span>Less chasing.<br />More room for people.</span></div>
            </div>
            <DayStory />
          </div>
        </section>
        <section id="brain" className="brain-section scene" aria-labelledby="brain-title">
          <img className="scene-art lab-art" src="/artfield/assets/hopeful-atelier-refined.png" alt="A sunlit garden workspace where people collaborate in an open glass pavilion" width="1660" height="948" loading="lazy" />
          <div className="lab-shade" />
          <div className="brain-layout wrap">
            <div className="brain-copy">
              <p className="eyebrow">BRAIN OS AT WORK</p>
              <h2 id="brain-title">Your business knows.<br /><span className="text-accent">Brain OS acts.</span></h2>
              <p>Ask about a contract, check an invoice, or prepare a follow-up. Brain OS brings the relevant records together and drafts the next step for your team to review.</p>
              <BrainExperience />
              <p className="brain-more"><a href="/brain-os/use-cases">Use cases and impact <ArrowUpRight size={15} /></a><a href="/brain-os/technical">How it is built <ArrowUpRight size={15} /></a></p>
            </div>
          </div>
          <div className="engine-footer wrap"><span>Sources connected</span><i /><span>People in control</span><i /><span>Work moving forward</span></div>
        </section>
        <CustomerProof />
        <BusinessArchitecture />
        <section id="work" className="world-section" aria-labelledby="world-title">
          <div className="world-heading wrap"><div><p className="eyebrow">ONE PURPOSE, MANY WORLDS</p><h2 id="world-title">Built into <span className="text-accent">your world.</span></h2></div><p>Different industries, different routines.<br />Software built around the people doing the work.</p></div>
          <WorldSelect />
        </section>
        <SecurityArchitecture />
        <TeamSection />
        <section id="contact" className="contact scene" aria-labelledby="contact-title">
          <img className="scene-art contact-art" src="/artfield/assets/hopeful-sunrise.png" alt="" width="1659" height="948" loading="lazy" />
          <div className="contact-shade" />
          <div className="contact-content wrap">
            <p className="eyebrow">YOUR NEXT CHAPTER</p>
            <h2 id="contact-title">More time.<br /><span className="text-accent">More life.</span></h2>
            <p>Tell us where the hours go.<br />We’ll look at what could make the work easier.</p>
            <a className="primary-button" href={callUrl} target="_blank" rel="noreferrer"><span>Tell us about your work</span><ArrowUpRight size={20} /></a>
            <p className="contact-next">We’ll start with one workflow and the people who know it. Together, we’ll decide what to build first.</p>
            <GraceChat />
          </div>
          <div className="outro-note"><span>THE STANDARD WE BUILD TOWARD</span><p>A better business.<br />A better working life.</p></div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
