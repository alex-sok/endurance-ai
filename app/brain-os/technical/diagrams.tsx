import { Fragment, type ReactNode } from 'react';
import { BookOpen, Check, Database, Layers, MessageSquare, Minus, Pause, ShieldCheck, Users, Workflow } from 'lucide-react';

/* The architecture, drawn in the homepage's diagram cards. Server components:
   nothing here needs a browser. */

export function Architecture() {
  return (
    <figure className="bp-arch-figure" aria-label="How Brain OS is put together">
      <div className="bp-arch">
        <div className="bp-arch-col">
          <p className="bp-arch-label">KNOWLEDGE, COMPILED</p>
          <div className="bp-node">
            <h4><BookOpen size={17} aria-hidden="true" />What the business already produces</h4>
            <ul><li>Process write ups and procedures</li><li>Email and chat threads</li><li>Customer rulebooks</li><li>Rules taught in chat</li></ul>
          </div>
          <p className="bp-arch-label">LIVE SYSTEMS, THROUGH TOOLS</p>
          <div className="bp-node">
            <h4><Database size={17} aria-hidden="true" />Read live. Written as drafts.</h4>
            <ul><li>The system of record, read and write</li><li>Company mailbox</li><li>Driver text number</li><li>Load board, carrier vetting</li></ul>
          </div>
        </div>
        <div className="bp-core">
          <div className="bp-core-head"><Layers size={26} aria-hidden="true" /><span>Brain OS</span></div>
          <p>For every message, inside the asker’s access tier:</p>
          <ol className="bp-loop">
            <li><span><b>Who is asking?</b> The sender resolves to a person page: book, role, tier.</span></li>
            <li><span><b>What may they see?</b> The session is assembled with only the tools and pages that tier allows.</span></li>
            <li><span><b>Read, call, reason.</b> The brain first, the live tools for anything transactional.</span></li>
            <li><span><b>Answer with sources.</b> Each figure says whether it came from a live read, a rollup or a page.</span></li>
            <li><span><b>Or draft the action.</b> A preview, a yes, a write, an audit line.</span></li>
          </ol>
        </div>
        <div className="bp-arch-col">
          <p className="bp-arch-label">WHERE PEOPLE ARE</p>
          <div className="bp-node is-out">
            <h4><MessageSquare size={17} aria-hidden="true" />No new app, no new login</h4>
            <ul><li>Teams direct messages and group chats</li><li>Email, from its own mailbox</li><li>Text messages, from its own number</li><li>A load board screen, per load screens, a public tracking link</li></ul>
          </div>
          <p className="bp-arch-label">WHO</p>
          <div className="bp-node is-out">
            <h4><Users size={17} aria-hidden="true" />Every desk, at its tier</h4>
            <ul><li>Dispatch and load management</li><li>Carrier sales</li><li>Billing and finance</li><li>Leadership</li></ul>
          </div>
        </div>
      </div>
      <div className="bp-guard">
        <p className="bp-arch-label">THE GUARD, IN THE TOOL LAYER</p>
        <div className="bp-node"><h4><ShieldCheck size={17} aria-hidden="true" />Access tier</h4><ul><li>Money tools and pages absent from a dispatch session, not hidden</li></ul></div>
        <div className="bp-node"><h4><Workflow size={17} aria-hidden="true" />Draft, then confirm</h4><ul><li>The first call previews. Only a second call writes.</li></ul></div>
        <div className="bp-node"><h4><Pause size={17} aria-hidden="true" />Pause switch</h4><ul><li>One phrase stops every write. Fails closed if unreadable.</li></ul></div>
      </div>
    </figure>
  );
}

export function WritePath({ steps, brake }: { steps: { n: string; title: string; body: string; write?: boolean }[]; brake: string }) {
  return (
    <>
      <ol className="bp-path" aria-label="The write path">
        {steps.map(s => (
          <li key={s.n} className={s.write ? 'is-write' : undefined}>
            <p className="bp-step-n">{s.n}</p>
            <h4>{s.title}</h4>
            <p>{s.body}</p>
          </li>
        ))}
      </ol>
      <p className="bp-brake"><Pause size={18} aria-hidden="true" /><span><b>One pause switch.</b> {brake}</span></p>
    </>
  );
}

const C = ({ children }: { children: ReactNode }) => <span className="c">{children}</span>;
const K = ({ children }: { children: ReactNode }) => <span className="k">{children}</span>;

// An illustrative entity page: the shape the runtime reads, with invented names.
export function PageAnatomy() {
  const lines: ReactNode[] = [
    <C key="a">---</C>,
    <><K>type:</K> entity</>,
    <><K>name:</K> Meridian Lumber</>,
    <><K>aliases:</K> Meridian, MLC</>,
    <><K>status:</K> active</>,
    <><K>verified:</K> 2026-09-14</>,
    <C key="b">---</C>,
    <C key="c"># Meridian Lumber</C>,
    '',
    'Flatbed shipper out of the Ohio yard. Books through the',
    <>Charlotte office. <C>[[Charlotte-office]]</C></>,
    '',
    <C key="d">## Rules</C>,
    '- The confirmation number on their load sheet is the BOL.',
    <>  <C>[[2026-08-14-teams-dispatch]]</C></>,
    '- Pickup window 07:00 to 16:00 unless the sheet says otherwise.',
    <>  <C>[[2026-09-02-teams-dispatch]]</C></>,
    '',
    <C key="e">## Lanes</C>,
    '- Ohio yard to Alcoa, TN: 41 loads in 2026 to date.',
    <>  <C>[[weekly-2026-37]]</C>  <C>(the system of record wins)</C></>,
  ];
  return (
    <pre className="bp-code" aria-label="An illustrative page from the brain">
      {lines.map((line, i) => <Fragment key={i}>{line}{'\n'}</Fragment>)}
    </pre>
  );
}

export function TierMatrix({ columns, rows, note }: { columns: string[]; rows: { what: string; cells: [string, string, string] }[]; note: string }) {
  return (
    <>
      <table className="bp-matrix">
        <thead><tr><th scope="col">What a session may reach</th>{columns.map(c => <th key={c} scope="col">{c}</th>)}</tr></thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.what}>
              <th scope="row">{r.what}</th>
              {r.cells.map((c, i) => (
                <td key={i} data-col={columns[i]} className={c === 'yes' ? 'is-yes' : c === 'no' ? 'is-no' : 'is-note'}>
                  {c === 'yes' ? <><Check size={16} aria-hidden="true" /><span className="sr-only">Yes</span></> : c === 'no' ? <><Minus size={16} aria-hidden="true" /><span className="sr-only">No</span></> : c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="bp-source">{note}</p>
    </>
  );
}

export function DeployDiagram({ columns }: { columns: { label: string; core?: boolean; nodes: { title: string; body: string }[] }[] }) {
  return (
    <figure className="bp-deploy" aria-label="Where Brain OS runs">
      {columns.map(col => (
        <div className={`bp-arch-col${col.core ? ' is-core' : ''}`} key={col.label}>
          <p className="bp-arch-label">{col.label}</p>
          {col.nodes.map(n => (
            <div className={`bp-node${col.core ? '' : ' is-out'}`} key={n.title}>
              <h4>{n.title}</h4>
              <ul><li>{n.body}</li></ul>
            </div>
          ))}
        </div>
      ))}
    </figure>
  );
}
