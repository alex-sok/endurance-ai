'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { CheckCheck, ClipboardCheck, CreditCard, Database, FileText, Landmark, MessageCircle, MessagesSquare, Pause, Play, Route, Workflow } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { advancePlayback, phasePreviewTime, playbackFrame, SEQUENCE_DURATION } from './brain-flow-timeline';
import type { BrainScene } from './brain-flow-scene';
import styles from './brain-flow.module.css';

const tickets = [
  { label: 'Invoice', icon: FileText, x: 19, y: 24, turn: -9 },
  { label: 'Audit', icon: ClipboardCheck, x: 46, y: 15, turn: 5 },
  { label: 'System of record', icon: Database, x: 76, y: 22, turn: 8 },
  { label: 'Billing', icon: CreditCard, x: 82, y: 47, turn: -6 },
  { label: 'Finance', icon: Landmark, x: 73, y: 76, turn: 7 },
  { label: 'Contracts', icon: FileText, x: 46, y: 84, turn: -6 },
  { label: 'Operations', icon: Workflow, x: 19, y: 74, turn: 6 },
  { label: 'Support', icon: MessagesSquare, x: 15, y: 48, turn: -5 },
];
const bubbles = [
  { title: 'Answers', copy: 'The answer, with its sources.', icon: MessageCircle, x: 23, y: 30, mobileY: 14 },
  { title: 'Solutions', copy: 'A clear next step, ready for you.', icon: Route, x: 79, y: 35, mobileY: 70 },
  { title: 'Reconciliations', copy: 'Records matched. Differences flagged.', icon: CheckCheck, x: 62, y: 84, mobileY: 89 },
];
const phases = [
  { title: 'Connect', caption: 'All the bits of your business.', copy: 'The records, requests, and everyday work that live across your systems.' },
  { title: 'Understand', caption: 'One Brain OS. A shared understanding.', copy: 'Connected knowledge becomes context for the work ahead.' },
  { title: 'Put to work', caption: 'Useful work comes out.', copy: 'Answers, solutions, and reconciliations—with your people in control.' },
];

function useWorkSequence() {
  const figure = useRef<HTMLElement>(null);
  const scene = useRef<BrainScene | null>(null);
  const elapsed = useRef(SEQUENCE_DURATION);
  const started = useRef(false);
  const [frame, setFrame] = useState(() => playbackFrame(SEQUENCE_DURATION));
  const [playing, setPlaying] = useState(false);
  const [inView, setInView] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(true);

  function paint(time: number) {
    scene.current?.seek(time);
    figure.current?.style.setProperty('--phase-progress', String(playbackFrame(time).progress));
  }

  useEffect(() => {
    if (!shouldLoad) return;
    let cancelled = false;
    // Keep Three.js and GSAP out of the initial page bundle and mount only here.
    import('./brain-flow-scene').then(({ createBrainScene }) => {
      if (cancelled || !figure.current) return;
      scene.current = createBrainScene(figure.current);
      scene.current.seek(elapsed.current);
      setReady(true);
    }).catch(() => {
      // The server-rendered, complete story remains readable if a chunk fails.
      if (!cancelled) setPlaying(false);
    });
    return () => {
      cancelled = true;
      scene.current?.dispose();
      scene.current = null;
    };
  }, [shouldLoad]);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncMotion = () => {
      setReducedMotion(preference.matches);
      if (preference.matches) {
        elapsed.current = SEQUENCE_DURATION;
        paint(SEQUENCE_DURATION);
        setFrame(playbackFrame(SEQUENCE_DURATION));
        setPlaying(false);
      }
    };
    const syncVisibility = () => setVisible(document.visibilityState === 'visible');
    syncMotion();
    syncVisibility();
    preference.addEventListener('change', syncMotion);
    document.addEventListener('visibilitychange', syncVisibility);
    const observer = new IntersectionObserver(([entry]) => {
      const onScreen = entry.intersectionRatio >= .2;
      setInView(onScreen);
      if (onScreen) setShouldLoad(true);
    }, { threshold: .2 });
    if (figure.current) observer.observe(figure.current);
    return () => {
      observer.disconnect();
      preference.removeEventListener('change', syncMotion);
      document.removeEventListener('visibilitychange', syncVisibility);
    };
  }, []);

  useEffect(() => {
    if (!ready || !inView || !visible || reducedMotion || started.current) return;
    started.current = true;
    elapsed.current = 0;
    paint(0);
    setFrame(playbackFrame(0));
    setPlaying(true);
  }, [ready, inView, visible, reducedMotion]);

  const running = ready && playing && inView && visible && !reducedMotion;
  useEffect(() => {
    if (!running) return;
    let previous: number | null = null;
    let request = 0;
    const tick = (now: number) => {
      if (previous !== null) elapsed.current = advancePlayback(elapsed.current, now - previous);
      previous = now;
      paint(elapsed.current);
      const next = playbackFrame(elapsed.current);
      setFrame((current) => current.phase === next.phase && current.complete === next.complete ? current : next);
      if (next.complete) setPlaying(false);
      else request = window.requestAnimationFrame(tick);
    };
    request = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(request);
  }, [running]);

  function seek(phase: number) {
    started.current = true;
    elapsed.current = phasePreviewTime(phase);
    paint(elapsed.current);
    setFrame(playbackFrame(elapsed.current));
    setPlaying(false);
  }
  function replay() {
    started.current = true;
    elapsed.current = 0;
    paint(0);
    setFrame(playbackFrame(0));
    setPlaying(true);
  }
  function toggle() {
    started.current = true;
    if (frame.complete) replay();
    else setPlaying((current) => !current);
  }
  return { figure, frame, playing, ready, reducedMotion, seek, toggle };
}

export function BrainFlow() {
  const { figure, frame, playing, ready, reducedMotion, seek, toggle } = useWorkSequence();
  const current = phases[frame.phase];

  return (
    <figure ref={figure} className={styles.flow} data-phase={frame.phase} aria-label="Invoices, audits, systems of record, billing, finance, contracts, operations, and support come together in Brain OS. Answers, solutions, and reconciliations emerge.">
      <div className={styles.toolbar}>
        <p className={styles.kicker}>A LITTLE LESS SCATTERED. A LOT MORE CONNECTED.</p>
        {!reducedMotion && ready ? (
          <div className={styles.controls} aria-label="Animation controls">
            <Button variant="ghost" className={styles.playButton} onClick={toggle} aria-label={playing ? 'Pause animation' : frame.complete ? 'Replay animation' : 'Play animation'}>
              {playing ? <Pause size={15} aria-hidden="true" /> : <Play size={15} aria-hidden="true" />}
              {playing ? 'Pause' : frame.complete ? 'Replay' : 'Play'}
            </Button>
          </div>
        ) : <span className={styles.motionNote}>Explore each step below</span>}
      </div>

      <div className={styles.stage} data-flow-stage aria-hidden="true">
        <div className={styles.orbit} />
        {tickets.map(({ label, icon: Icon, x, y, turn }, index) => (
          <div key={label} className={styles.ticket} data-ticket data-x={x} data-y={y} data-turn={turn} data-tone={index % 3}
            style={{ '--wide-x': String(x) + '%', '--wide-y': String(y) + '%', '--small-x': String(index % 2 ? 75 : 25) + '%', '--small-y': String([14, 14, 32, 32, 68, 68, 86, 86][index]) + '%', '--ticket-turn': String(turn) + 'deg' } as CSSProperties}>
            <div className={styles.ticketInk} data-ticket-ink><span className={styles.ticketIcon}><Icon size={18} strokeWidth={1.5} /></span><span>{label}</span></div>
          </div>
        ))}
        <div className={styles.blobPosition}>
          <div className={styles.blobFallback} data-blob-fallback />
          <div className={styles.blobCanvas} data-blob-canvas />
          <div className={styles.blobLabel} data-blob-label><span>Brain OS</span><span>It comes together.</span></div>
        </div>
        {bubbles.map(({ title, copy, icon: Icon, x, y, mobileY }, index) => (
          <div key={title} className={styles.bubble} data-bubble={index} data-x={x} data-y={y} data-mobile-y={mobileY}
            style={{ '--wide-x': String(x) + '%', '--wide-y': String(y) + '%', '--small-y': String(mobileY) + '%' } as CSSProperties}>
            <span className={styles.bubbleHeading}><Icon size={19} strokeWidth={1.5} /><span>{title}</span></span><p>{copy}</p>
          </div>
        ))}
      </div>

      <div className={styles.steps} role="group" aria-label="Workflow steps">
        {phases.map((phase, index) => (
          <Button variant="ghost" key={phase.title} className={styles.step} disabled={!ready} aria-pressed={frame.phase === index} onClick={() => seek(index)} data-past={frame.phase > index}>
            <span>{phase.title}</span><span className={styles.progressTrack} aria-hidden="true"><span /></span>
          </Button>
        ))}
      </div>
      <figcaption className={styles.caption}>
        <div><h3>{current.caption}</h3><p>{current.copy}</p></div>
        <span className={styles.exampleNote}>An illustration of Brain OS.<br />Not a live workflow.</span>
      </figcaption>
    </figure>
  );
}
