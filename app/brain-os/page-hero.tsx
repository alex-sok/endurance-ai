/* eslint-disable @next/next/no-img-element */
import { ArrowDown, ArrowUpRight } from 'lucide-react';

type Link = { label: string; href: string };
type Hero = { eyebrow: string; h1: string[]; lede: string; primary: Link; secondary: Link };

export function BrainPageHero({ hero, image, sections }: {
  hero: Hero;
  image: { src: string; alt: string; caption: string };
  sections: Link[];
}) {
  return <>
    <section className="bp-hero" aria-labelledby="hero-title">
      <div className="wrap bp-hero-grid">
        <div className="bp-hero-copy">
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1 id="hero-title">{hero.h1[0]}<br />{hero.h1[1]}</h1>
          <p className="bp-hero-lede">{hero.lede}</p>
          <div className="bp-hero-actions">
            <a className="primary-button" href={hero.primary.href} target="_blank" rel="noreferrer">{hero.primary.label}<ArrowUpRight size={16} /></a>
            <a className="bp-quiet-link" href={hero.secondary.href}>{hero.secondary.label}<ArrowUpRight size={14} /></a>
          </div>
        </div>
        <figure className="bp-hero-figure">
          <img src={image.src} alt={image.alt} width="1536" height="1024" fetchPriority="high" />
          <figcaption>{image.caption}</figcaption>
        </figure>
      </div>
    </section>
    <nav className="bp-page-index" aria-label="On this page">
      <div className="wrap"><span>EXPLORE THIS PAGE <ArrowDown size={12} aria-hidden="true" /></span><div>{sections.map(section => <a key={section.href} href={section.href}>{section.label}</a>)}</div></div>
    </nav>
  </>;
}
