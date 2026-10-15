'use client';

/* eslint-disable @next/next/no-img-element */

import { ArrowUpRight, Check, CircleDot, FileText, MessageSquare, MoveUpRight, ScanLine, ShieldCheck } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../artfield/tabs';
import { industries } from './industries';
import { callUrl } from './site-chrome';

export function DayStory() {
  return (
    <Tabs defaultValue="brain" className="day-visual">
      <div className="day-heading"><span><CircleDot size={17} /> A WORKING DAY</span><TabsList className="day-tabs" aria-label="Compare a working day"><TabsTrigger value="usual">The usual</TabsTrigger><TabsTrigger value="brain">With Brain OS</TabsTrigger></TabsList></div>
      <TabsContent value="brain" className="day-panel">
        <div className="day-grid">
          <Hours />
          <div className="handled-block"><div className="handled-title">Brain OS <span className="handled-tag">HANDLED</span></div><div className="handled-tasks"><span><Check size={13} /> Payments reconciled</span><span><Check size={13} /> Updates gathered</span><span><Check size={13} /> Records connected</span></div></div>
          <div className="returned-time"><span className="small-label">A LITTLE MORE ROOM</span><p>For the work<br />only you can do.</p><span className="return-arrow"><MoveUpRight size={30} strokeWidth={1.2} /></span></div>
          <div className="human-task"><span className="status-dot" /> A real conversation with a customer.</div>
        </div>
      </TabsContent>
      <TabsContent value="usual" className="day-panel">
        <div className="day-grid usual-grid"><Hours /><div className="usual-task"><span>01</span><p>Chase an update.<small>Another email. Another follow-up.</small></p></div><div className="usual-task"><span>02</span><p>Reconcile the payments.<small>Two spreadsheets. One missing entry.</small></p></div><div className="usual-task"><span>03</span><p>Copy it all over again.<small>Same information. Different system.</small></p></div><div className="usual-end">The customer conversation will have to wait.</div></div>
      </TabsContent>
      <div className="day-caption"><span className="caption-ticks" aria-hidden="true">||||||||||||||||||||||||||||||||</span><span>AN ILLUSTRATIVE WORKING DAY</span></div>
    </Tabs>
  );
}

function Hours() { return <><div className="hour h9">09:00</div><div className="hour h10">10:00</div><div className="hour h11">11:00</div><div className="hour h12">12:00</div></>; }

export function WorldSelect() {
  const [selected, setSelected] = useState<string>('manufacturing');
  const [displayed, setDisplayed] = useState<string>('manufacturing');
  const [entered, setEntered] = useState(false);
  const [loadedDetails, setLoadedDetails] = useState<string[]>([]);
  const imageViewport = useRef<HTMLDivElement>(null);
  const displayedWorld = industries.find(world => world.id === displayed) ?? industries[0];

  useEffect(() => {
    const viewport = imageViewport.current;
    if (!viewport) return;
    let disposed = false;
    const removeListeners: Array<() => void> = [];
    viewport.querySelectorAll<HTMLImageElement>('img').forEach(image => {
      const id = image.dataset.industry;
      if (!id) return;
      const ready = () => {
        void image.decode().then(() => {
          if (!disposed) setLoadedDetails(loaded => loaded.includes(id) ? loaded : [...loaded, id]);
        }).catch(() => { /* Retain the previous image if this asset fails. */ });
      };
      image.addEventListener('load', ready);
      // Cached images can finish before hydration attaches their load handler.
      if (image.complete && image.naturalWidth) ready();
      removeListeners.push(() => image.removeEventListener('load', ready));
    });
    const entrance = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setEntered(true);
        entrance.disconnect();
      }
    }, { threshold: 0.25 });
    entrance.observe(viewport);
    return () => {
      disposed = true;
      removeListeners.forEach(remove => remove());
      entrance.disconnect();
    };
  }, []);

  // Keep the previous sharp view until the selected asset has decoded. Each
  // image stays mounted, so rapid tab changes cannot reveal a stale frame.
  useEffect(() => {
    if (loadedDetails.includes(selected)) setDisplayed(selected);
  }, [selected, loadedDetails]);

  return <Tabs value={selected} onValueChange={value => {
    if (typeof value === 'string') setSelected(value);
  }} className="world-tabs wrap">
    <TabsList className="world-nav" aria-label="Explore industries">{industries.map(world => <TabsTrigger key={world.id} value={world.id}>{world.label}</TabsTrigger>)}</TabsList>
    <div className="world-stage">
      <div ref={imageViewport} className="world-image" data-entered={entered || undefined} aria-busy={selected !== displayed || !loadedDetails.includes(displayed)}>
        {industries.map(world => <img key={world.id} className="world-art" src={world.imageSrc} data-industry={world.id} data-active={world.id === displayed && loadedDetails.includes(world.id) || undefined} alt={world.id === displayed ? `City concept, detail: ${world.imageLabel.toLowerCase()}` : ''} aria-hidden={world.id !== displayed} width="1536" height="1024" loading="lazy" decoding="async" />)}
        <span className="image-caption">{displayedWorld.imageLabel} / CITY CONCEPT</span>
      </div>
      {industries.map(world => <TabsContent key={world.id} value={world.id} className="world-panel">
      <div className="world-detail">
        <span className="small-label">BRAIN OS / {world.label.toUpperCase()}</span>
        <h3>{world.title}</h3><p>{world.copy}</p>
        <div className="industry-examples"><span className="small-label">ILLUSTRATIVE WORKFLOWS</span><ul>{world.examples.map(example => <li key={example}>{example}</li>)}</ul></div>
        <a className="text-link" href={world.id === 'logistics' ? 'https://endurancelabs.ai/margins' : callUrl} target="_blank" rel="noreferrer">{world.id === 'logistics' ? 'Explore Margins' : 'Talk about your operation'}<ArrowUpRight size={16} /></a>
      </div>
      </TabsContent>)}
    </div>
  </Tabs>;
}

const workflowContent = [
  { id:'answer', icon:MessageSquare, label:'Find the answer', question:'What did we agree to in this contract?', headline:'The terms, without the search.', description:'The agreement renews in March. Written notice is due 30 days before renewal.', sources:['Signed agreement.pdf', 'Renewal terms · §4.2'] },
  { id:'action', icon:ScanLine, label:'Move the work', question:'Get this week’s invoices ready.', headline:'The routine work is ready.', description:'Invoices matched. Rate confirmations checked. An unmatched charge is held for your review.', sources:['Carrier invoices', 'Rate confirmations'] },
  { id:'control', icon:ShieldCheck, label:'Keep control', question:'Let the team know about the renewal.', headline:'Prepared. Waiting on your judgment.', description:'The relevant people are identified and the follow-up is drafted. You decide when it goes out.', sources:['Account team', 'Draft follow-up'] },
];

export function BrainExperience() {
  return (
    <Tabs defaultValue="answer" className="experience-tabs">
      <TabsList className="experience-nav" aria-label="Explore Brain OS workflows">
        {workflowContent.map(({id,label,icon:Icon})=><TabsTrigger key={id} value={id}><Icon size={17} />{label}</TabsTrigger>)}
      </TabsList>
      {workflowContent.map(flow=><TabsContent key={flow.id} value={flow.id} className="experience-panel">
        <div className="brain-window">
          <div className="window-top"><span>Brain OS</span><span className="connected"><span /> Connected to your business</span></div>
          <div className="query"><span className="person-initial">Y</span><p>{flow.question}</p></div>
          <div className="answer"><div><h3>{flow.headline}</h3><p>{flow.description}</p><div className="source-files">{flow.sources.map(source=><span key={source}><FileText size={13} />{source}</span>)}</div></div></div>
          <div className="window-bottom"><ShieldCheck size={15} /><span>Sources attached. Decisions visible.</span><ArrowUpRight size={17} /></div>
        </div>
      </TabsContent>)}
      <p className="example-caption">AN ILLUSTRATIVE BRAIN OS WORKFLOW</p>
    </Tabs>
  );
}
