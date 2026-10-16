import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { RateVarianceMockup } from './rate-variance-mockup';

export function UsageEvidence() {
  return <aside className="home-usage" aria-labelledby="home-usage-title">
    <p className="eyebrow">FROM A WORKING OPERATION</p>
    <h3 id="home-usage-title">Part of the working day.</h3>
    <p>At one logistics business, people use Brain OS to find loads, prepare orders, check paperwork, and understand the numbers.</p>
    <dl><div><dt>People asking in a week</dt><dd>35</dd><small>7 days to 24 Sep 2026</small></div><div><dt>Orders created in a week</dt><dd>94</dd><small>21–25 Sep 2026*</small></div><div><dt>Operating rules kept</dt><dd>153</dd><small>24 Jul–21 Sep 2026</small></div></dl>
    <p className="home-usage-source">Recorded at one deployment. *Through 11:09 a.m. Eastern on 25 September; 9 orders were later voided.</p>
    <a className="text-link" href="/brain-os/use-cases">Read the case study <ArrowUpRight size={14} aria-hidden="true" /></a>
  </aside>;
}

export function ReviewVisual() {
  return <div className="home-review-visual" aria-labelledby="review-visual-title">
    <div className="home-visual-copy">
      <p className="eyebrow">THE DETAILS BEHIND THE ANSWER</p>
      <h3 id="review-visual-title">See what supports<br />the next step.</h3>
      <p>In this sample invoice review, the agreed rate, supporting records, and proposed amount sit side by side. The context stays close to the work.</p>
      <a className="text-link" href="/brain-os/technical#product-review">See how it works <ArrowUpRight size={15} aria-hidden="true" /></a>
    </div>
    <RateVarianceMockup />
  </div>;
}

export function MissionImage() {
  return <figure className="mission-photo">
    <Image src="/landing/people-at-work.png" alt="Two technicians examining a precision turbine component together in a sunlit modern workshop overlooking a desert city." width={1536} height={1024} sizes="(max-width: 760px) 90vw, (max-width: 1440px) 92vw, 1296px" />
    <figcaption><span>THE PEOPLE BEHIND THE WORK</span><span>ILLUSTRATIVE IMAGE</span></figcaption>
  </figure>;
}
