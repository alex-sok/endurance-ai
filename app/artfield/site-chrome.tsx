/* Static pixel artwork is served unchanged with explicit dimensions. */
/* eslint-disable @next/next/no-img-element */
import { CALENDLY_URL, CONTACT_EMAIL } from '@/lib/conversation-flows';
import { ArrowUpRight } from 'lucide-react';
import { MobileNav } from './mobile-nav';

export function SiteHeader({ about = false }: { about?: boolean }) {
  const home = about ? '/' : '';
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header id="top" className="site-header">
      <div className="header-inner wrap">
        <a className="wordmark" href={about ? '/' : '#top'} aria-label="Endurance AI Labs home"><img src="/artfield/assets/endurance-logo-white.png" alt="Endurance" width="1370" height="238" /></a>
        <nav aria-label="Main navigation"><a href={`${home}#brain`}>Brain OS</a><a href={`${home}#work`}>What we build</a><a href={`${home}#belief`}>Our mission</a><a href={`${home}#trust`}>Trust</a><a href="/about" aria-current={about ? 'page' : undefined}>About us</a></nav>
        <a className="nav-cta" href={CALENDLY_URL} target="_blank" rel="noreferrer">Let’s talk <ArrowUpRight size={15} /></a>
        <MobileNav about={about} />
      </div>
    </header>
  </>;
}

export function SiteFooter({ about = false }: { about?: boolean }) {
  const home = about ? '/' : '';
  return <footer className="site-footer">
    <div className="footer-top wrap"><a className="wordmark" href={about ? '/' : '#top'} aria-label="Endurance AI Labs home"><img src="/artfield/assets/endurance-logo-white.png" alt="Endurance" width="1370" height="238" /></a><p>A research and engineering team in San Francisco.<br />We sit in the operation, find the burden, and build in steps.</p><a href={`mailto:${CONTACT_EMAIL}`}>Say hello <ArrowUpRight size={16} /></a></div>
    <nav className="footer-links wrap" aria-label="Footer navigation"><a href="/brain-os">Brain OS</a><a href="/margins">Margins</a><a href="/about" aria-current={about ? 'page' : undefined}>About us</a><a href="#team">Our team</a><a href="/values">Our values</a><a href={`${home}#trust`}>Security &amp; trust</a><a href={`mailto:${CONTACT_EMAIL}?subject=Privacy%20question`}>Privacy questions</a><a href="https://www.linkedin.com/company/endurance-ai-labs">LinkedIn</a></nav>
    <div className="footer-bottom wrap"><span>© 2026 ENDURANCE AI LABS</span><span>BUILT FOR THE PEOPLE DOING THE WORK.</span><a href="#top">Back to top ↑</a></div>
  </footer>;
}
