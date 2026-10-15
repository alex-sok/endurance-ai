'use client';

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef } from 'react';

export function HeroFilm() {
  const filmRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const film = filmRef.current;
    if (!film) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible = true;
    let starting = false;
    let disposed = false;
    film.muted = true;
    film.defaultMuted = true;
    film.playbackRate = 0.75;

    const syncPlayback = () => {
      if (disposed) return;
      if (!visible || document.hidden || reducedMotion.matches) {
        film.pause();
        return;
      }
      if (starting || !film.paused || film.ended) return;
      starting = true;
      // The poster remains visible if the browser does not allow autoplay.
      void film.play().catch(() => {}).finally(() => { starting = false; });
    };
    const resume = () => {
      if (visible && !document.hidden && !reducedMotion.matches && film.ended) film.currentTime = 0;
      syncPlayback();
    };
    const observer = new IntersectionObserver(([entry]) => {
      const wasVisible = visible;
      visible = entry.isIntersecting;
      if (visible && !wasVisible) resume();
      else syncPlayback();
    });

    observer.observe(film);
    film.addEventListener('loadedmetadata', syncPlayback);
    film.addEventListener('canplay', syncPlayback);
    document.addEventListener('visibilitychange', resume);
    window.addEventListener('pageshow', resume);
    window.addEventListener('focus', resume);
    window.addEventListener('pointerdown', syncPlayback, { passive: true });
    reducedMotion.addEventListener('change', syncPlayback);
    syncPlayback();

    return () => {
      disposed = true;
      observer.disconnect();
      film.pause();
      film.removeEventListener('loadedmetadata', syncPlayback);
      film.removeEventListener('canplay', syncPlayback);
      document.removeEventListener('visibilitychange', resume);
      window.removeEventListener('pageshow', resume);
      window.removeEventListener('focus', resume);
      window.removeEventListener('pointerdown', syncPlayback);
      reducedMotion.removeEventListener('change', syncPlayback);
    };
  }, []);

  return <div className="hero-film">
    <img className="hero-still" src="/modern-city-poster.webp" alt="A modern desert city with factories, solar fields, wind turbines, and green streets" width="960" height="540" />
    <video ref={filmRef} src="/desert-to-city.mp4" autoPlay muted playsInline preload="auto" poster="/modern-city-poster.webp" aria-label="An empty desert becomes a thriving modern city, with construction, manufacturing, clean energy, and commerce." />
  </div>;
}
