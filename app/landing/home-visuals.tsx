import Image from 'next/image';
import { ArrowUpRight, Expand } from 'lucide-react';

function ProductScreen({ src, alt, label, width, height }: {
  src: string;
  alt: string;
  label: string;
  width: number;
  height: number;
}) {
  return <figure className="home-product-figure">
    <div className="home-product-label"><span>BRAIN OS / {label}</span><span>ILLUSTRATIVE SCREEN</span></div>
    <a className="home-product-image" href={src} target="_blank" rel="noreferrer" aria-label={`View ${label.toLowerCase()} image at full size (opens in a new tab)`}>
      <Image src={src} alt={alt} width={width} height={height} unoptimized />
      <span className="home-product-expand"><Expand size={13} aria-hidden="true" /> View full size</span>
    </a>
    <figcaption>Product demo with sample data. Figures and connections shown are illustrative.</figcaption>
  </figure>;
}

export function ProductOverview() {
  return <div id="product" className="home-product-overview wrap" aria-labelledby="product-overview-title">
    <ProductScreen src="/product/brain-os-logistics.jpg" width={1006} height={632} label="OPERATIONS" alt="Brain OS demo showing an operating overview with loads in flight, invoices, and a load book with carrier and delivery details." />
    <div className="home-visual-copy">
      <p className="eyebrow">A LOOK INSIDE BRAIN OS</p>
      <h3 id="product-overview-title">The whole operation.<br />A clearer view.</h3>
      <p>From the big picture to the details of a single job. See how the records, systems, and work of a business can come together.</p>
      <a className="text-link" href="/brain-os">Explore the product demo <ArrowUpRight size={15} aria-hidden="true" /></a>
    </div>
  </div>;
}

export function ReviewVisual() {
  return <div className="home-review-visual" aria-labelledby="review-visual-title">
    <div className="home-visual-copy">
      <p className="eyebrow">THE DETAILS BEHIND THE ANSWER</p>
      <h3 id="review-visual-title">See what supports<br />the next step.</h3>
      <p>In this sample invoice review, the agreed rate, supporting records, and proposed amount sit side by side. The context stays close to the work.</p>
      <a className="text-link" href="/brain-os/technical#product-review">See how it works <ArrowUpRight size={15} aria-hidden="true" /></a>
    </div>
    <ProductScreen src="/product/brain-os-invoice-review.jpg" width={968} height={476} label="INVOICE REVIEW" alt="Brain OS sample invoice review comparing an invoice, rate confirmation, supporting records, and contract terms with proposed approved and disputed amounts." />
  </div>;
}

export function MissionImage() {
  return <figure className="mission-photo">
    <Image src="/landing/people-at-work.png" alt="Two technicians examining a precision turbine component together in a sunlit modern workshop overlooking a desert city." width={1536} height={1024} sizes="(max-width: 760px) 90vw, (max-width: 1440px) 92vw, 1296px" />
    <figcaption><span>THE PEOPLE BEHIND THE WORK</span><span>ILLUSTRATIVE IMAGE</span></figcaption>
  </figure>;
}
