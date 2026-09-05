"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  onOpenChat: () => void;
  onNavigate?: (id: string) => void;
  onCtaClick?: (label: string) => void;
}

// One link. The page carries its own map; the nav carries the one thing
// that is not on it.
const LINKS: { id: string; label: string }[] = [];

export function LandingNav({ onOpenChat, onNavigate }: Props) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("top");
    if (!hero) return;
    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0, rootMargin: "-64px 0px 0px 0px" }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <nav className={scrolled ? "lp-nav is-scrolled" : "lp-nav"} aria-label="Primary">
      <div className="lp-nav-inner">
        <a
          className="lp-wordmark"
          href={isHome ? "#top" : "/"}
          aria-label="Endurance AI Labs"
          onClick={(e) => {
            if (!isHome) return;
            e.preventDefault();
            onNavigate?.("top");
          }}
        >
          <img src="/logo-endurance.svg" alt="" />
        </a>
        <div className="lp-nav-links">
          {LINKS.map((link) => (
            <a
              key={link.id}
              href={isHome ? `#${link.id}` : `/#${link.id}`}
              onClick={(e) => {
                if (!isHome) return;
                e.preventDefault();
                onNavigate?.(link.id);
              }}
            >
              {link.label}
            </a>
          ))}
          <Link
            className="lp-nav-page"
            href="/values"
            aria-current={pathname === "/values" ? "page" : undefined}
          >
            Core Values
          </Link>
          <button type="button" className="lp-nav-talk" onClick={onOpenChat}>
            Talk
          </button>
        </div>
      </div>
    </nav>
  );
}
