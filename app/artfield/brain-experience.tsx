'use client';

/* Static pixel artwork is intentionally served unchanged; dimensions and loading priority are explicit. */
/* eslint-disable @next/next/no-img-element */

import { ArrowUpRight, Check, CircleDot, FileText, MessageSquare, MoveUpRight, ScanLine, ShieldCheck } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs';
import { LivingArtwork } from './living-artwork';

export function DayStory() {
  return (
    <Tabs defaultValue="brain" className="day-visual">
      <div className="day-heading"><span><CircleDot size={17} /> A WORKING DAY</span><TabsList className="day-tabs" aria-label="Compare a working day"><TabsTrigger value="usual">The usual</TabsTrigger><TabsTrigger value="brain">With Brain OS</TabsTrigger></TabsList></div>
      <TabsContent value="brain" className="day-panel">
        <div className="day-grid">
          <Hours />
          <div className="handled-block"><div className="handled-title">Brain OS <span className="handled-tag">HANDLED</span></div><div className="handled-tasks"><span><Check size={13} /> Payments reconciled</span><span><Check size={13} /> Updates gathered</span><span><Check size={13} /> Records connected</span></div></div>
          <div className="returned-time"><span className="small-label">A LITTLE MORE ROOM</span><p>For the work<br />only you can do.</p><span className="return-arrow"><MoveUpRight size={30} strokeWidth={1.2} /></span></div>
          <div className="human-task"><span className="blue-dot" /> A real conversation with a customer.</div>
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

const worlds = [
  { id: 'company', number: '01', label: 'Your company', title: 'Your whole operation, connected.', copy: 'Answers and actions, connected to the systems you already run. Less chasing across the business.', cta: 'Explore Brain OS', href: 'https://endurancelabs.ai/brain-os' },
  { id: 'freight', number: '02', label: 'Freight', title: 'Keep the world moving.', copy: 'Foundations brings Brain OS to dispatch, invoices, and payments. More freight moving. Fewer hours chasing it.', cta: 'Explore Margins', href: 'https://endurancelabs.ai/margins' },
  { id: 'team', number: '03', label: 'Your team', title: 'Build it, together.', copy: 'A shared development environment where operators and engineers shape the software, side by side.', cta: 'Ask about early access', href: 'https://endurancelabs.ai/waitlist' },
  { id: 'rules', number: '04', label: 'Your rules', title: 'Made for the way you work.', copy: 'The club’s rules. The builder’s process. The details that make an operation yours, built into its software.', cta: 'Tell us about your work', href: '#contact' },
];

export function WorldSelect() {
  return <Tabs defaultValue="company" className="world-tabs wrap">
    <TabsList className="world-nav" aria-label="Explore the ways Brain OS takes shape">{worlds.map(world=><TabsTrigger key={world.id} value={world.id}><span>{world.number}</span>{world.label}</TabsTrigger>)}</TabsList>
    {worlds.map(world=><TabsContent key={world.id} value={world.id} className="world-panel"><div className="world-stage">
      <LivingArtwork kind="world" className="world-art" src="/artfield/assets/pixel-world.png" alt="An isometric pixel-art world connecting a freight harbor, a city, a workshop campus, and a hillside village" width="1659" height="948" loading="lazy" />
      <div className="world-detail"><span className="small-label">BRAIN OS / {world.label.toUpperCase()}</span><h3>{world.title}</h3><p>{world.copy}</p><a href={world.href} target={world.href.startsWith('https')?'_blank':undefined} rel={world.href.startsWith('https')?'noreferrer':undefined}>{world.cta}<ArrowUpRight size={17}/></a></div>
      <span className="map-coordinate">ONE PURPOSE. MANY FORMS.</span>
    </div></TabsContent>)}
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
