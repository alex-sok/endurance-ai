'use client';

import { Menu } from 'lucide-react';
import { useRef } from 'react';

type NavigationLink = { href: string; label: string };

export function MobileNavigation({ links, currentPath }: { links: NavigationLink[]; currentPath?: string }) {
  const menu = useRef<HTMLDetailsElement>(null);

  return (
    <details ref={menu} className="mobile-menu" onKeyDown={event => {
      if (event.key === 'Escape' && menu.current?.open) {
        menu.current.open = false;
        menu.current.querySelector('summary')?.focus();
      }
    }}>
      <summary aria-label="Navigation menu"><Menu aria-hidden="true" /></summary>
      <nav className="mobile-menu-links" aria-label="Mobile navigation">
        {links.map(link => (
          <a key={link.label} href={link.href} aria-current={link.href === currentPath ? 'page' : undefined} onClick={() => {
            if (menu.current) menu.current.open = false;
          }}>{link.label}</a>
        ))}
      </nav>
    </details>
  );
}
