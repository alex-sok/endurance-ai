/* Static pixel artwork is intentionally served unchanged; dimensions are explicit. */
/* eslint-disable @next/next/no-img-element */
import { CALENDLY_URL, CONTACT_EMAIL } from '@/lib/conversation-flows';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { MobileNav } from './mobile-nav';

// The homepage's header and footer, for the pages under it. Section links point
// back to the homepage; the page you are on carries aria-current.
export type SitePage = 'use-cases' | 'technical';

const pageLinks = [
  ['/#brain', 'Brain OS'],
  ['/brain-os/use-cases', 'Use cases'],
  ['/brain-os/technical', 'Technical'],
  ['/brain/pricing', 'Pricing'],
  ['/#trust', 'Trust'],
] as const;

export function SiteHeader({ current }: { current: SitePage }) {
  const currentHref = `/brain-os/${current}`;
  return (
    <header id="top" className="site-header">
      <div className="header-inner wrap">
        <Link className="wordmark" href="/" aria-label="Endurance AI Labs home"><img src="/artfield/assets/endurance-logo-white.png" alt="Endurance" width="1370" height="238" /></Link>
        <nav aria-label="Main navigation">
          {pageLinks.map(([href, label]) => (
            <a key={href} href={href} aria-current={href === currentHref ? 'page' : undefined}>{label}</a>
          ))}
        </nav>
        <a className="nav-cta" href={CALENDLY_URL} target="_blank" rel="noreferrer">Let’s talk <ArrowUpRight size={15} /></a>
        <MobileNav links={[...pageLinks, ['/#contact', 'Contact'] as const]} />
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-top wrap">
        <Link className="wordmark" href="/" aria-label="Endurance AI Labs home"><img src="/artfield/assets/endurance-logo-white.png" alt="Endurance" width="1370" height="238" /></Link>
        <p>A research and engineering team in San Francisco.<br />We sit in the operation, find the burden, and build in steps.</p>
        <a href={`mailto:${CONTACT_EMAIL}`}>Say hello <ArrowUpRight size={16} /></a>
      </div>
      <nav className="footer-links wrap" aria-label="Footer navigation">
        <a href="/brain-os">Brain OS</a><a href="/brain-os/use-cases">Use cases</a><a href="/brain-os/technical">Technical</a><a href="/brain/pricing">Pricing</a><a href="/margins">Margins</a><Link href="/#team">Our team</Link><a href="/values">Our values</a><Link href="/#trust">Security &amp; trust</Link><a href={`mailto:${CONTACT_EMAIL}?subject=Privacy%20question`}>Privacy questions</a>
      </nav>
      <div className="footer-bottom wrap"><span>© 2026 ENDURANCE AI LABS</span><span>BUILT FOR THE PEOPLE DOING THE WORK.</span><a href="#top">Back to top ↑</a></div>
    </footer>
  );
}
