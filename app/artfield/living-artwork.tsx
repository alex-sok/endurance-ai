'use client';

/* eslint-disable @next/next/no-img-element */
import { createContext, useContext, useEffect, useRef, useState, type ImgHTMLAttributes, type ReactNode } from 'react';
import { Pause, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { ArtworkKind } from './living-artwork-config';
import type { LivingScene } from './living-artwork-scene';
import styles from './living-artwork.module.css';

const SceneryMotion = createContext({ paused: false, reduced: true, visible: true });

export function SceneryMotionProvider({ children }: { children: ReactNode }) {
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(true);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setReduced(preference.matches);
    const updateVisibility = () => setVisible(!document.hidden);
    updatePreference(); updateVisibility();
    preference.addEventListener('change', updatePreference);
    document.addEventListener('visibilitychange', updateVisibility);
    return () => {
      preference.removeEventListener('change', updatePreference);
      document.removeEventListener('visibilitychange', updateVisibility);
    };
  }, []);
  return <SceneryMotion.Provider value={{ paused, reduced, visible }}>
    {children}
    {!reduced && <Button variant="outline" className={styles.control} onClick={() => setPaused(value => !value)}>
      {paused ? <Play size={13} aria-hidden="true" /> : <Pause size={13} aria-hidden="true" />}
      {paused ? 'Play scenery' : 'Pause scenery'}
    </Button>}
  </SceneryMotion.Provider>;
}

type ArtworkProps = ImgHTMLAttributes<HTMLImageElement> & { kind: ArtworkKind; alt: string };

export function LivingArtwork({ kind, className, alt, ...props }: ArtworkProps) {
  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<LivingScene | null>(null);
  const [inView, setInView] = useState(false);
  const motion = useContext(SceneryMotion);
  const playing = !motion.paused && !motion.reduced && motion.visible;
  const playingRef = useRef(playing);
  playingRef.current = playing;

  useEffect(() => {
    const image = imageRef.current;
    if (!image) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    observer.observe(image);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const image = imageRef.current;
    const canvas = canvasRef.current;
    if (!image || !canvas || !inView || motion.reduced) return;
    let cancelled = false;
    let owned: LivingScene | null = null;
    async function enhance() {
      try {
        // The native image renders first. Offscreen/reduced-motion scenes never load Three.
        const [{ createLivingScene }] = await Promise.all([import('./living-artwork-scene'), image!.decode()]);
        if (cancelled) return;
        owned = createLivingScene(canvas!, image!, kind);
        sceneRef.current = owned;
        owned.setPlaying(playingRef.current);
      } catch {
        // WebGL is a progressive enhancement; keep the complete original artwork.
        delete canvas!.dataset.ready;
      }
    }
    void enhance();
    return () => {
      cancelled = true;
      owned?.dispose();
      if (sceneRef.current === owned) sceneRef.current = null;
    };
  }, [inView, motion.reduced, kind, props.src]);

  useEffect(() => { sceneRef.current?.setPlaying(playing); }, [playing]);

  return <>
    <img {...props} className={className} alt={alt} ref={imageRef} />
    <canvas ref={canvasRef} className={`${className ?? ''} ${styles.canvas}`} aria-hidden="true" />
  </>;
}
