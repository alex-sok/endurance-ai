'use client';

import { useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';

const links = [
  ['#brain', 'Brain OS'],
  ['#customer-story', 'A customer story'],
  ['#work', 'What we build'],
  ['#belief', 'Our mission'],
  ['#trust', 'Security & trust'],
  ['#team', 'Our team'],
] as const;

export function MobileNav() {
  const disclosure = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const menu = disclosure.current;
    if (!menu) return;
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !menu.contains(event.target)) menu.open = false;
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || !menu.open) return;
      menu.open = false;
      menu.querySelector('summary')?.focus();
    };
    const desktop = window.matchMedia('(min-width: 761px)');
    const closeOnDesktop = () => { if (desktop.matches) menu.open = false; };
    document.addEventListener('pointerdown', closeOutside);
    document.addEventListener('keydown', closeOnEscape);
    desktop.addEventListener('change', closeOnDesktop);
    return () => {
      document.removeEventListener('pointerdown', closeOutside);
      document.removeEventListener('keydown', closeOnEscape);
      desktop.removeEventListener('change', closeOnDesktop);
    };
  }, []);

  return (
    <details className="mobile-menu" ref={disclosure}>
      <summary aria-label="Navigation menu">
        <Menu className="menu-open-icon" size={21} aria-hidden="true" />
        <X className="menu-close-icon" size={21} aria-hidden="true" />
      </summary>
      <nav aria-label="Mobile navigation">
        {links.map(([href, label]) => (
          <a key={href} href={href} onClick={() => {
            if (disclosure.current) disclosure.current.open = false;
            // Keep keyboard focus at the destination, not in a collapsed menu.
            const destination = document.querySelector<HTMLElement>(`${href} h2`);
            if (destination) {
              destination.tabIndex = -1;
              destination.focus({ preventScroll: true });
            }
          }}>{label}</a>
        ))}
      </nav>
    </details>
  );
}
