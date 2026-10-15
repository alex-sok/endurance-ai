import Image from 'next/image';
import { ArrowUpRight, Expand } from 'lucide-react';

// Captured from the public /brain-os demo. These are sample product screens,
// separate from the dated deployment evidence elsewhere on these pages.
export function ProductImage({ src, alt, width, height, label }: {
  src: string;
  alt: string;
  width: number;
  height: number;
  label: string;
}) {
  return <figure className="bp-product-image">
    <div className="bp-product-image-top"><span>BRAIN OS / {label}</span><span>ILLUSTRATIVE SCREEN</span></div>
    <a className="bp-product-image-link" href={src} target="_blank" rel="noreferrer" aria-label={`View ${label.toLowerCase()} image at full size (opens in a new tab)`}>
      <Image src={src} alt={alt} width={width} height={height} unoptimized />
      <span className="bp-image-expand"><Expand size={13} aria-hidden="true" /> View full size</span>
    </a>
    <figcaption><span>Product demo with sample data. Figures and connections shown are illustrative.</span><a href="/brain-os">Explore the demo <ArrowUpRight size={13} aria-hidden="true" /></a></figcaption>
  </figure>;
}

export function ContextImage({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  return <figure className="bp-context-image">
    <Image src={src} alt={alt} width={1536} height={1024} sizes="(max-width: 760px) 90vw, 44vw" />
    <figcaption>{caption} / CONCEPT IMAGE</figcaption>
  </figure>;
}
