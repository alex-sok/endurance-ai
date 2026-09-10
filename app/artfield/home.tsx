/* Static pixel artwork is intentionally served unchanged; dimensions and loading priority are explicit. */
/* eslint-disable @next/next/no-img-element */
import { CALENDLY_URL, CONTACT_EMAIL } from '@/lib/conversation-flows';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { BrainExperience, DayStory, WorldSelect } from './brain-experience';
import { BusinessArchitecture, SecurityArchitecture } from './architecture-sections';
import { GraceChat } from './grace-chat';
import { MobileNav } from './mobile-nav';
import { CustomerProof, TeamSection } from './proof-and-team';

const callUrl = CALENDLY_URL;

export default function ArtfieldHome() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header id="top" className="site-header">
        <div className="header-inner wrap">
          <a className="wordmark" href="#top" aria-label="Endurance AI Labs home"><img src="/artfield/assets/endurance-logo-white.png" alt="Endurance" width="1370" height="238" /></a>
          <nav aria-label="Main navigation"><a href="#brain">Brain OS</a><a href="#work">What we build</a><a href="#belief">Our mission</a><a href="#trust">Trust</a></nav>
          <a className="nav-cta" href={callUrl} target="_blank" rel="noreferrer">Let’s talk <ArrowUpRight size={15} /></a>
          <MobileNav />
        </div>
      </header>
      <main id="main">
        <section className="hero scene" aria-labelledby="hero-title">
          <img className="scene-art hero-art" src="/artfield/assets/hopeful-sunrise.png" alt="An expansive sunrise sky above a calm coast, with warm light reaching a small community" width="1659" height="948" fetchPriority="high" />
          <div className="hero-shade" />
          <div className="hero-content wrap">
            <p className="eyebrow"><span className="status-light" /> A BETTER WORKING LIFE IS POSSIBLE</p>
            <h1 id="hero-title">Give people<br /><span className="hero-line"><span className="text-accent">back</span> their time.</span></h1>
            <p className="hero-description">We build Brain OS into the systems your business already runs—connecting knowledge, answering questions, and taking repetitive work off people’s hands.</p>
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
              <p className="muted-copy">Chasing information. Copying it between systems. Staying late to hold it all together. We believe people’s time deserves more care.</p>
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
              <p>Connect your knowledge, systems, and routines. Find the answer. Move the work. Bring people in where their judgment matters.</p>
              <BrainExperience />
            </div>
          </div>
          <div className="engine-footer wrap"><span>Sources connected</span><i /><span>People in control</span><i /><span>Work moving forward</span></div>
        </section>
        <CustomerProof />
        <BusinessArchitecture />
        <section id="work" className="world-section" aria-labelledby="world-title">
          <div className="world-heading wrap"><div><p className="eyebrow">ONE PURPOSE, MANY WORLDS</p><h2 id="world-title">Built into <span className="text-accent">your world.</span></h2></div><p>The form changes.<br />The purpose holds: give people their time back.</p></div>
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
            <p>Tell us where the hours go.<br />We’ll find the burden worth lifting.</p>
            <a className="primary-button" href={callUrl} target="_blank" rel="noreferrer"><span>Tell us about your work</span><ArrowUpRight size={20} /></a>
            <p className="contact-next">We’ll start with one workflow, the systems involved, and where your team wants its time back.</p>
            <GraceChat />
          </div>
          <div className="outro-note"><span>THE STANDARD WE BUILD TOWARD</span><p>A better business.<br />A better working life.</p></div>
        </section>
      </main>
      <footer className="site-footer">
        <div className="footer-top wrap"><a className="wordmark" href="#top" aria-label="Endurance AI Labs home"><img src="/artfield/assets/endurance-logo-white.png" alt="Endurance" width="1370" height="238" /></a><p>A research and engineering team in San Francisco.<br />We sit in the operation, find the burden, and build in steps.</p><a href={`mailto:${CONTACT_EMAIL}`}>Say hello <ArrowUpRight size={16} /></a></div>
        <nav className="footer-links wrap" aria-label="Footer navigation"><a href="/brain-os">Brain OS</a><a href="/margins">Margins</a><a href="#team">Our team</a><a href="/values">Our values</a><a href="#trust">Security &amp; trust</a><a href={`mailto:${CONTACT_EMAIL}?subject=Privacy%20question`}>Privacy questions</a></nav>
        <div className="footer-bottom wrap"><span>© 2026 ENDURANCE AI LABS</span><span>BUILT FOR THE PEOPLE DOING THE WORK.</span><a href="#top">Back to top ↑</a></div>
      </footer>
    </>
  );
}
