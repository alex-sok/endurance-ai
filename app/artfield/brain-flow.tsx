'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { ArrowRight, Check, CheckCheck, FileText, Link2, ListChecks, Pause, Play, RotateCcw, Scale, UserRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { advancePlayback, PHASE_DURATION, playbackFrame, SEQUENCE_DURATION } from './brain-flow-timeline';
import styles from './brain-flow.module.css';

const phases = [
  {
    title: 'Connect',
    detail: 'Bring the relevant records together.',
    caption: 'One invoice. Three places to look.',
    copy: 'The invoice, the agreed rate, and your payment policy connect to the same piece of work.',
  },
  {
    title: 'Understand',
    detail: 'Find the relationship that matters.',
    caption: 'A difference, caught in context.',
    copy: 'Brain OS links the records for load 1042 and finds a $150 difference—not just another document.',
  },
  {
    title: 'Prepare',
    detail: 'Make the next step a human decision.',
    caption: 'The chasing is done. The decision is yours.',
    copy: 'A review is prepared with the supporting records attached. Your team decides what happens next.',
  },
];

// This is a finite, illustrative animation, not a live product or payment flow.
// Start with the complete story for server rendering, no-JS, and reduced motion.
function useWorkSequence() {
  const figure = useRef<HTMLElement>(null);
  const elapsed = useRef(SEQUENCE_DURATION);
  const started = useRef(false);
  const [frame, setFrame] = useState(() => playbackFrame(SEQUENCE_DURATION));
  const [playing, setPlaying] = useState(false);
  const [animated, setAnimated] = useState(false);
  const [iteration, setIteration] = useState(0);
  const [inView, setInView] = useState(false);
  const [visible, setVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(true);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncMotion = () => {
      setReducedMotion(preference.matches);
      if (preference.matches) {
        elapsed.current = SEQUENCE_DURATION;
        setFrame(playbackFrame(SEQUENCE_DURATION));
        figure.current?.style.setProperty('--phase-progress', '1');
        setAnimated(false);
        setPlaying(false);
      }
    };
    const syncVisibility = () => setVisible(document.visibilityState === 'visible');
    syncMotion();
    syncVisibility();
    preference.addEventListener('change', syncMotion);
    document.addEventListener('visibilitychange', syncVisibility);
    const observer = new IntersectionObserver(([entry]) => setInView(entry.intersectionRatio >= 0.2), { threshold: 0.2 });
    if (figure.current) observer.observe(figure.current);
    return () => {
      observer.disconnect();
      preference.removeEventListener('change', syncMotion);
      document.removeEventListener('visibilitychange', syncVisibility);
    };
  }, []);

  useEffect(() => {
    if (!inView || !visible || reducedMotion || started.current) return;
    started.current = true;
    elapsed.current = 0;
    setFrame(playbackFrame(0));
    setAnimated(true);
    setPlaying(true);
  }, [inView, visible, reducedMotion]);

  const running = playing && inView && visible && !reducedMotion;
  useEffect(() => {
    if (!running) return;
    let previous: number | null = null;
    let request = 0;
    const tick = (now: number) => {
      // A fresh clock on resume means time spent offscreen never skips the story.
      if (previous !== null) elapsed.current = advancePlayback(elapsed.current, now - previous);
      previous = now;
      const next = playbackFrame(elapsed.current);
      figure.current?.style.setProperty('--phase-progress', String(next.progress));
      setFrame((current) => current.phase === next.phase && current.complete === next.complete ? current : next);
      if (next.complete) {
        setAnimated(false);
        setPlaying(false);
      } else {
        request = window.requestAnimationFrame(tick);
      }
    };
    request = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(request);
  }, [running]);

  function seek(phase: number) {
    started.current = true;
    elapsed.current = phase * PHASE_DURATION;
    const next = playbackFrame(elapsed.current);
    setFrame(next);
    setAnimated(false);
    setPlaying(false);
    figure.current?.style.setProperty('--phase-progress', '0');
  }

  function replay() {
    started.current = true;
    elapsed.current = 0;
    setFrame(playbackFrame(0));
    figure.current?.style.setProperty('--phase-progress', '0');
    setIteration((current) => current + 1);
    setAnimated(true);
    setPlaying(true);
  }

  function toggle() {
    started.current = true;
    if (frame.complete) replay();
    else {
      setAnimated(true);
      setPlaying((current) => !current);
    }
  }

  return { figure, frame, running, playing, animated, iteration, reducedMotion, seek, replay, toggle };
}

function SignalBridge({ outgoing = false }: { outgoing?: boolean }) {
  const paths = outgoing
    ? ['M 0 216 H 80']
    : ['M 0 68 C 45 68 30 216 80 216', 'M 0 216 H 80', 'M 0 364 C 45 364 30 216 80 216'];
  return (
    <div className={`${styles.bridge} ${outgoing ? styles.outgoing : styles.incoming}`} aria-hidden="true">
      <svg viewBox="0 0 80 432" preserveAspectRatio="none" className={styles.desktopBridge}>
        {paths.map((path, index) => (
          <g key={path} style={{ '--signal-delay': `${index * 0.55}s` } as CSSProperties}>
            <path d={path} className={styles.rail} />
            <path d={path} pathLength="100" className={styles.signal} />
          </g>
        ))}
      </svg>
      <svg viewBox="0 0 40 48" className={styles.mobileBridge}>
        <path d="M 20 0 V 48" className={styles.rail} />
        <path d="M 20 0 V 48" pathLength="100" className={styles.signal} />
      </svg>
    </div>
  );
}

export function BrainFlow() {
  const { figure, frame, running, playing, animated, iteration, reducedMotion, seek, replay, toggle } = useWorkSequence();
  const current = phases[frame.phase];

  return (
    <figure
      ref={figure}
      className={styles.flow}
      data-phase={frame.phase}
      data-running={running}
      data-animated={animated}
      data-complete={frame.complete}
      aria-label="An illustrative invoice moving through Brain OS: connected records, a difference found, and a review prepared for a person."
    >
      <div className={styles.toolbar}>
        <div>
          <p className={styles.kicker}>ILLUSTRATIVE FREIGHT WORKFLOW</p>
          <h3 className={styles.title}>Follow one piece of work.</h3>
        </div>
        {!reducedMotion ? (
          <div className={styles.controls} aria-label="Animation controls">
            <Button variant="ghost" className={styles.playButton} onClick={toggle} aria-label={playing ? 'Pause animation' : frame.complete ? 'Replay animation' : 'Play animation'}>
              {playing ? <Pause size={15} aria-hidden="true" /> : <Play size={15} aria-hidden="true" />}
              {playing ? 'Pause' : frame.complete ? 'Replay' : 'Play'}
            </Button>
            <Button variant="ghost" size="icon" className={styles.resetButton} onClick={replay} aria-label="Restart animation">
              <RotateCcw size={16} aria-hidden="true" />
            </Button>
          </div>
        ) : <span className={styles.motionNote}>Explore each step below</span>}
      </div>

      <div className={styles.steps} role="group" aria-label="Workflow steps">
        {phases.map((phase, index) => (
          <Button
            variant="ghost"
            key={phase.title}
            className={styles.step}
            aria-pressed={frame.phase === index}
            onClick={() => seek(index)}
            data-past={frame.phase > index}
          >
            <span className={styles.stepName}>{phase.title}<ArrowRight size={16} aria-hidden="true" /></span>
            <span className={styles.stepDetail}>{phase.detail}</span>
            <span className={styles.progressTrack} aria-hidden="true"><span /></span>
          </Button>
        ))}
      </div>

      <div className={styles.stage} key={`${iteration}-${frame.phase}`}>
        <div className={styles.sources}>
          <p className={styles.columnLabel}>Across your business</p>
          <div className={styles.sourceList}>
            <div className={`${styles.source} ${styles.invoice}`}>
              <span className={styles.sourceIcon}><FileText size={19} strokeWidth={1.5} aria-hidden="true" /></span>
              <div className={styles.sourceContent}>
                <h4>Carrier invoice</h4>
                <p className={styles.amount}>$2,450<span>USD</span></p>
                <p className={styles.sourceMeta}>Load 1042 · Finance</p>
              </div>
              <span className={styles.sourceCheck} aria-hidden="true"><Check size={13} /></span>
            </div>
            <div className={`${styles.source} ${styles.agreement}`}>
              <span className={styles.sourceIcon}><Link2 size={19} strokeWidth={1.5} aria-hidden="true" /></span>
              <div className={styles.sourceContent}>
                <h4>Agreed rate</h4>
                <p className={styles.amount}>$2,300<span>USD</span></p>
                <p className={styles.sourceMeta}>Load 1042 · Operations</p>
              </div>
              <span className={styles.sourceCheck} aria-hidden="true"><Check size={13} /></span>
            </div>
            <div className={`${styles.source} ${styles.policy}`}>
              <span className={styles.sourceIcon}><ListChecks size={19} strokeWidth={1.5} aria-hidden="true" /></span>
              <div className={styles.sourceContent}>
                <h4>Payment policy</h4>
                <p className={styles.policyCopy}>Review mismatches<br />before payment.</p>
                <p className={styles.sourceMeta}>Your company’s rules</p>
              </div>
              <span className={styles.sourceCheck} aria-hidden="true"><Check size={13} /></span>
            </div>
          </div>
          <p className={styles.channel}>APIs · MCP · Documents</p>
        </div>

        <SignalBridge />

        <div className={styles.contextColumn}>
          <p className={styles.columnLabel}>One shared context</p>
          <div className={styles.core}>
            <div className={styles.coreHeader}>
              <span>Brain OS</span>
              <span className={styles.coreBlocks} aria-hidden="true"><i /><i /><i /></span>
            </div>
            <div className={styles.contextMap} aria-hidden="true">
              <div className={styles.contextTags}><span>Invoice</span><span>Agreement</span><span>Policy</span></div>
              <svg viewBox="0 0 240 74" preserveAspectRatio="none">
                <path d="M 35 0 V 16 Q 35 27 50 27 H 106 Q 120 27 120 42 V 74 M 120 0 V 74 M 205 0 V 16 Q 205 27 190 27 H 134 Q 120 27 120 42" className={styles.contextRail} />
                <path d="M 35 0 V 16 Q 35 27 50 27 H 106 Q 120 27 120 42 V 74" pathLength="100" className={styles.contextSignal} />
                <path d="M 205 0 V 16 Q 205 27 190 27 H 134 Q 120 27 120 42 V 74" pathLength="100" className={styles.contextSignal} />
              </svg>
              <div className={styles.record}><Link2 size={14} />Load 1042</div>
            </div>
            <div className={styles.comparison}>
              <div><span>Invoiced</span><strong>$2,450</strong></div>
              <span className={styles.compareDash} aria-hidden="true">−</span>
              <div><span>Agreed</span><strong>$2,300</strong></div>
            </div>
            <div className={styles.finding}>
              <Scale size={18} strokeWidth={1.5} aria-hidden="true" />
              <span>{frame.phase === 0 ? 'Records connected' : '$150 difference found'}</span>
              {frame.phase > 0 && <Check size={15} aria-hidden="true" />}
            </div>
          </div>
          <p className={styles.channel}>Knowledge connected to its source</p>
        </div>

        <SignalBridge outgoing />

        <div className={styles.resultColumn}>
          <p className={styles.columnLabel}>Ready for your team</p>
          <div className={styles.result}>
            <div className={styles.resultHeader}>
              <span className={styles.resultStatus}><span />{frame.phase === 2 ? 'Review prepared' : 'The next step'}</span>
              <CheckCheck size={18} strokeWidth={1.5} aria-hidden="true" />
            </div>
            <div className={styles.resultBody}>
              <span className={styles.resultMeta}>LOAD 1042</span>
              <h4>A clear next step.</h4>
              <div className={styles.resultReveal}>
                <p>The invoice is <strong>$150 above</strong> the agreed rate.</p>
                <p className={styles.resultAction}>Review the difference<br />before payment.</p>
                <div className={styles.evidence}><FileText size={14} aria-hidden="true" /><span>Invoice + rate confirmation</span></div>
                <div className={styles.evidence}><ListChecks size={14} aria-hidden="true" /><span>Payment policy attached</span></div>
              </div>
              {frame.phase < 2 && <p className={styles.waitingNote}>First, connect the records<br />and understand the context.</p>}
            </div>
            <div className={styles.humanGate}>
              <span className={styles.person}><UserRound size={18} strokeWidth={1.5} aria-hidden="true" /></span>
              <span><strong>Your team decides.</strong><span>No payment made.</span></span>
            </div>
          </div>
          <p className={styles.channel}>Evidence attached · Human review</p>
        </div>
      </div>

      <figcaption className={styles.caption}>
        <div className={styles.captionCopy} key={frame.phase}>
          <h4>{current.caption}</h4>
          <p>{current.copy}</p>
        </div>
        <span className={styles.exampleNote}>Example data.<br />No live systems connected.</span>
      </figcaption>
    </figure>
  );
}
