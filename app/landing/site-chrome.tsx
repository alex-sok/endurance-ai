/* eslint-disable @next/next/no-img-element */
import { ArrowUpRight, Menu } from 'lucide-react';

export const callUrl = 'https://calendar.notion.so/meet/alexsok/endurance-intro';

export function SiteHeader({ about = false }: { about?: boolean }) {
  const home = about ? '/' : '';
  const links = [
    { href: `${home}#brain`, label: 'Brain OS' },
    { href: `${home}#work`, label: 'Who we serve' },
    { href: `${home}#belief`, label: 'Our mission' },
    { href: `${home}#trust`, label: 'Trust' },
    { href: '/about', label: 'About us' },
  ];
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header id="top" className="site-header">
      <div className="header-inner wrap">
        <a className="wordmark" href={about ? '/' : '#top'} aria-label="Endurance AI Labs home"><img src="/endurance-logo-white.png" alt="Endurance" width="1370" height="238" /></a>
        <nav aria-label="Main navigation">
          {links.map(link => <a key={link.label} href={link.href} aria-current={about && link.href === '/about' ? 'page' : undefined}>{link.label}</a>)}
        </nav>
        <details className="mobile-menu"><summary aria-label="Navigation menu"><Menu aria-hidden="true" /></summary><div className="mobile-menu-links">{links.map(link => <a key={link.label} href={link.href} aria-current={about && link.href === '/about' ? 'page' : undefined}>{link.label}</a>)}</div></details>
        <a className="nav-cta" href={callUrl} target="_blank" rel="noreferrer">Let’s talk <ArrowUpRight size={15} /></a>
      </div>
    </header>
  </>;
}

export function SiteFooter({ about = false }: { about?: boolean }) {
  return <footer className="site-footer">
    <div className="footer-top wrap"><a className="wordmark" href={about ? '/' : '#top'} aria-label="Endurance AI Labs home"><img src="/endurance-logo-white.png" alt="Endurance" width="1370" height="238" /></a><p>A research and engineering team in San Francisco.<br />We sit in the operation, find the burden, and build in steps.</p><a href="mailto:hello@endurancelabs.ai">Say hello <ArrowUpRight size={16} /></a></div>
    <div className="footer-bottom wrap"><span>© 2026 ENDURANCE AI LABS</span><div className="footer-page-links"><a href="/about" aria-current={about ? 'page' : undefined}>About us</a><a href="https://www.linkedin.com/company/endurance-ai-labs" target="_blank" rel="noreferrer">LinkedIn</a></div><a href="#top">Back to top ↑</a></div>
  </footer>;
}
