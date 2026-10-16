'use client';

import { useId, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, ChartNoAxesCombined, Check, ChevronDown, Database, FileText, Layers3, MessageSquare, ScanLine } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../artfield/tabs';
import { billingWeeks, conversations, deliveryWeeks, quietCustomers, type QuestionId } from './product-showcase-data';
import styles from './product-showcase.module.css';

type View = 'intelligence' | 'trends' | 'conversations';

function BillingChart() {
  const titleId = useId();
  const descId = useId();
  const y = (value: number) => 190 - value / 140 * 160;
  return <figure className={styles.chart}>
    <figcaption className={styles.chartHead}><div><h4>From delivery to billing</h4><p>Completed work. Paperwork still to close.</p></div><span>6 WEEKS</span></figcaption>
    <div className={styles.legend}><span><i />Delivered</span><span><i className={styles.sageSwatch} />Billed</span></div>
    <svg viewBox="0 0 600 230" role="img" aria-labelledby={`${titleId} ${descId}`}>
      <title id={titleId}>Delivered and billed loads across six sample weeks</title>
      <desc id={descId}>In week 6, 126 loads were delivered and 108 of those were billed, leaving 18 unbilled. The complete sample values are in the expandable table below.</desc>
      {[0, 50, 100, 140].map(value => <g key={value}><line x1="37" y1={y(value)} x2="586" y2={y(value)} className={styles.gridLine} /><text x="27" y={y(value) + 4} textAnchor="end">{value}</text></g>)}
      {billingWeeks.map((week, i) => <g key={week.week}>
        <rect x={57 + i * 88} y={y(week.delivered)} width="24" height={190 - y(week.delivered)} fill="#272823" rx="2" />
        <rect x={86 + i * 88} y={y(week.billed)} width="24" height={190 - y(week.billed)} fill="#8b9279" rx="2" />
        <text x={83 + i * 88} y="215" textAnchor="middle">{week.week}</text>
        {i === 5 && <><text x={69 + i * 88} y={y(week.delivered) - 9} textAnchor="middle" className={styles.valueLabel}>{week.delivered}</text><text x={98 + i * 88} y={y(week.billed) - 9} textAnchor="middle" className={styles.valueLabel}>{week.billed}</text></>}
      </g>)}
    </svg>
    <details className={styles.dataDetails}><summary>View chart data <ChevronDown size={12} aria-hidden="true" /></summary><table><caption>Illustrative loads by week</caption><thead><tr><th>Period</th><th>Delivered</th><th>Billed</th></tr></thead><tbody>{billingWeeks.map(week => <tr key={week.week}><th scope="row">{week.week}</th><td>{week.delivered}</td><td>{week.billed}</td></tr>)}</tbody></table></details>
  </figure>;
}

function DeliveryChart() {
  const [period, setPeriod] = useState<4 | 8>(8);
  const titleId = useId();
  const values = deliveryWeeks.slice(-period);
  const points = values.map((value, i) => ({ x: 75 + i * 493 / (values.length - 1), y: 190 - (value - 90) * 15, value, week: 9 - period + i }));
  return <figure className={styles.chart}>
    <figcaption className={styles.chartHead}><div><h4>On-time delivery</h4><p>See the pattern across the operation.</p></div><div className={styles.periodSwitch} aria-label="Chart period">{([4, 8] as const).map(weeks => <button key={weeks} type="button" aria-pressed={period === weeks} onClick={() => setPeriod(weeks)}>{weeks} weeks</button>)}</div></figcaption>
    <div className={styles.trendNumber}><strong>96<span>%</span></strong><span>+{values[values.length - 1] - values[0]} percentage points over {period} weeks</span></div>
    <svg viewBox="0 0 600 230" role="img" aria-labelledby={titleId}>
      <title id={titleId}>On-time delivery in {period} sample weeks: {points.map(point => `week ${point.week}, ${point.value}%`).join('; ')}. Vertical scale runs from 90 to 100 percent.</title>
      {[90, 95, 100].map(value => <g key={value}><line x1="48" y1={190 - (value - 90) * 15} x2="568" y2={190 - (value - 90) * 15} className={styles.gridLine} /><text x="37" y={194 - (value - 90) * 15} textAnchor="end">{value}%</text></g>)}
      <polyline points={points.map(point => `${point.x},${point.y}`).join(' ')} fill="none" stroke="#677357" strokeWidth="3" strokeLinejoin="round" />
      {points.map(point => <g key={point.week}><circle cx={point.x} cy={point.y} r="4" fill="#fff" stroke="#677357" strokeWidth="2" /><text x={point.x} y={point.y - 13} textAnchor="middle" className={styles.valueLabel}>{point.value}%</text><text x={point.x} y="216" textAnchor="middle">W{point.week}</text></g>)}
    </svg>
    <details className={styles.dataDetails}><summary>View chart data <ChevronDown size={12} aria-hidden="true" /></summary><table><caption>Illustrative weekly on-time delivery</caption><thead><tr><th>Week</th><th>On time</th></tr></thead><tbody>{points.map(point => <tr key={point.week}><th scope="row">Week {point.week}</th><td>{point.value}%</td></tr>)}</tbody></table></details>
  </figure>;
}

function SourceTags({ sources }: { sources: string[] }) {
  return <div className={styles.sources}>{sources.map(source => <span key={source}><FileText size={12} aria-hidden="true" />{source}</span>)}</div>;
}

function Conversation({ question, onQuestionChange }: { question: QuestionId; onQuestionChange: (question: QuestionId) => void }) {
  const [draftVisible, setDraftVisible] = useState(false);
  const draftId = useId();
  const current = conversations[question];
  const max = Math.max(...current.bars.map(bar => bar.value));
  return <div className={styles.conversationLayout}>
    <aside className={styles.questionMenu} aria-label="Example questions">
      <span className={styles.micro}>START WITH A QUESTION</span>
      {(Object.entries(conversations) as [QuestionId, typeof current][]).map(([id, item]) => <button key={id} type="button" aria-pressed={question === id} onClick={() => { onQuestionChange(id); setDraftVisible(false); }}><MessageSquare size={15} aria-hidden="true" /><span>{item.label}</span><ArrowUpRight size={13} aria-hidden="true" /></button>)}
      <div className={styles.chatContext}><Layers3 size={19} aria-hidden="true" /><h4>The context comes with you.</h4><p>Questions meet company records, operating rules, and the history of the work.</p><span>EXAMPLE CONVERSATIONS</span></div>
    </aside>
    <div className={styles.chatThread} aria-live="polite">
      <div className={styles.userMessage}><span className={styles.micro}>YOU</span><p>{current.question}</p></div>
      <div className={styles.brainMessage}><div className={styles.chatAuthor}><span className={styles.brainMark}>B</span><strong>Brain OS</strong><span>Answer with context</span></div><p>{current.answer}</p>
        <figure className={styles.answerChart}><figcaption>{current.chartTitle}</figcaption>{current.bars.map(bar => <div className={styles.answerBar} key={bar.label}><span>{bar.label}</span><div><i style={{ width: `${bar.value / max * 100}%` }} /></div><strong>{bar.value} <small>{current.unit}</small></strong></div>)}</figure>
        <SourceTags sources={current.sources} />
        <details className={styles.dataDetails} key={`records-${question}`}><summary>Inspect supporting records <ChevronDown size={12} aria-hidden="true" /></summary><table><caption>Sample records used for this answer</caption><tbody>{current.records.map(record => <tr key={record.label}><th scope="row">{record.label}</th><td>{record.value}</td></tr>)}</tbody></table></details>
        <div className={styles.nextStep}><ScanLine size={17} aria-hidden="true" /><p>{current.recommendation}</p></div>
        <button className={styles.draftButton} type="button" aria-expanded={draftVisible} aria-controls={draftId} onClick={() => setDraftVisible(!draftVisible)}>{draftVisible ? 'Close example draft' : 'Review example draft'}<ArrowRight size={14} aria-hidden="true" /></button>
        {draftVisible && <div id={draftId} className={styles.draft}><span className={styles.micro}>DRAFT / FOR HUMAN REVIEW</span><p>{current.draft}</p><span className={styles.draftNote}><Check size={13} aria-hidden="true" />Example only. No message is sent.</span></div>}
      </div>
    </div>
  </div>;
}

export function ProductShowcase() {
  const [view, setView] = useState<View>('intelligence');
  const [question, setQuestion] = useState<QuestionId>('billing');
  const conversationTab = useRef<HTMLButtonElement>(null);
  const ask = (nextQuestion: QuestionId) => {
    setQuestion(nextQuestion);
    setView('conversations');
    conversationTab.current?.focus();
  };
  return <div id="product" className={`${styles.showcase} wrap`}>
    <div className={styles.showcaseHeading}><div><p className="eyebrow">A LOOK INSIDE BRAIN OS</p><h3>See the picture.<br />Understand what’s behind it.</h3></div><p>Reports that explain what changed. Insights that point to the next step. A conversation with the knowledge of your business.</p></div>
    <Tabs value={view} onValueChange={value => { if (value === 'intelligence' || value === 'trends' || value === 'conversations') setView(value); }} className={styles.app}>
      <div className={styles.appHeader}><div className={styles.brand}><span className={styles.brainMark}>B</span><strong>Brain OS</strong><span className={styles.workspace}>Operations workspace</span></div><span className={styles.conceptLabel}>PRODUCT CONCEPT · SAMPLE DATA</span></div>
      <div className={styles.navigation}><TabsList className={styles.nav} aria-label="Explore product concepts"><TabsTrigger value="intelligence"><Layers3 size={16} aria-hidden="true" />Intelligence</TabsTrigger><TabsTrigger value="trends"><ChartNoAxesCombined size={16} aria-hidden="true" />Trends</TabsTrigger><TabsTrigger value="conversations" ref={conversationTab}><MessageSquare size={16} aria-hidden="true" />Conversations</TabsTrigger></TabsList><span className={styles.sourceStatus}><Database size={13} aria-hidden="true" />Records → context → action</span></div>
      <TabsContent value="intelligence" className={styles.panel}>
        <div className={styles.panelHeading}><div><span className={styles.micro}>THE OPERATING PICTURE</span><h3>Your morning, in focus.</h3></div><span className={styles.periodLabel}>Weekly briefing</span></div>
        <div className={styles.stats}><div><span>Delivered this week</span><strong>126</strong><small>Completed loads</small></div><div><span>Billed</span><strong>108</strong><small>From this week’s deliveries</small></div><div><span>Ready for a closer look</span><strong>18</strong><small>Delivered, still unbilled</small></div></div>
        <div className={styles.intelligenceGrid}><BillingChart /><aside className={styles.brief}><span className={styles.micro}>BRAIN OS / THE INSIGHT</span><h4>The work is delivered.<br />The paperwork is holding it up.</h4><p>12 missing proofs of delivery account for two-thirds of this week’s unbilled loads. The other 6 need an invoice review.</p><SourceTags sources={['Delivery records', 'Billing status']} /><button type="button" onClick={() => ask('billing')}>Ask about this<ArrowUpRight size={16} aria-hidden="true" /></button><span className={styles.briefFoot}>A useful next step, with the evidence attached.</span></aside></div>
        <div className={styles.intelligenceFoot}><span><ScanLine size={16} aria-hidden="true" />Next step: prepare requests for the missing documents.</span><span>People review. Brain OS prepares.</span></div>
      </TabsContent>
      <TabsContent value="trends" className={styles.panel}>
        <div className={styles.panelHeading}><div><span className={styles.micro}>PATTERNS WORTH YOUR ATTENTION</span><h3>Know what’s changing.</h3></div><span className={styles.periodLabel}>Performance & customer activity</span></div>
        <div className={styles.trendsGrid}><DeliveryChart /><aside className={styles.customerSignal}><span className={styles.micro}>CUSTOMER INTELLIGENCE</span><h4>Who’s gone quiet?</h4><p>Three customers have not shipped in over 90 days. See the history before you reach out.</p><div className={styles.customerList}>{quietCustomers.map(customer => <div key={customer.name}><span className={styles.customerInitial}>{customer.name.slice(-1)}</span><div><strong>{customer.name}</strong><small>{customer.priorLoads} loads in the prior 90 days</small></div><span>{customer.days}d<small>since last load</small></span></div>)}</div><button type="button" onClick={() => ask('customers')}>Explore the customer history<ArrowUpRight size={15} aria-hidden="true" /></button></aside></div>
        <div className={styles.trendInsight}><div><ChartNoAxesCombined size={19} aria-hidden="true" /><div><h4>The number is a starting point.</h4><p>On-time performance is 96% in the latest sample week. Ask where the remaining delays are coming from.</p></div></div><button type="button" onClick={() => ask('delivery')}>Understand the delays<ArrowUpRight size={15} aria-hidden="true" /></button></div>
      </TabsContent>
      <TabsContent value="conversations" className={`${styles.panel} ${styles.conversationPanel}`}>
        <div className={styles.panelHeading}><div><span className={styles.micro}>ASK. UNDERSTAND. MOVE FORWARD.</span><h3>The next question is yours.</h3></div><span className={styles.periodLabel}>Company knowledge, in conversation</span></div>
        <Conversation question={question} onQuestionChange={setQuestion} />
      </TabsContent>
      <div className={styles.appFoot}><span><Check size={12} aria-hidden="true" />Sources alongside answers</span><span><Check size={12} aria-hidden="true" />Drafts before action</span><span><Check size={12} aria-hidden="true" />People in control</span></div>
    </Tabs>
    <p className={styles.caption}>Illustrative product concepts based on documented Brain OS workflows. Charts, figures, and conversations use sample data.</p>
    <div className={styles.useCases}>
      <div><span className={styles.micro}>01 / THE OPERATIONS DESK</span><h4>“Where is my load?”</h4><p>Bring order status, driver updates, and email into an answer with its sources.</p></div>
      <div><span className={styles.micro}>02 / THE BACK OFFICE</span><h4>“What’s ready to bill?”</h4><p>Find delivered work, missing documents, and invoice exceptions in a morning digest.</p></div>
      <div><span className={styles.micro}>03 / THE LEADERSHIP TEAM</span><h4>“What needs our attention?”</h4><p>Explore customer activity, lane history, and operating reports through a conversation.</p></div>
    </div>
    <a className="text-link" href="/brain-os/use-cases">See how one team uses Brain OS<ArrowUpRight size={15} aria-hidden="true" /></a>
  </div>;
}
