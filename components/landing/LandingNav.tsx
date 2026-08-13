"use client";

import { useEffect, useState } from "react";

interface Props {
  onOpenChat: () => void;
  onNavigate: (id: string) => void;
  onCtaClick?: (label: string) => void;
}

const LINKS = [
  { id: "research", label: "Lab" },
  { id: "work", label: "Work" },
  { id: "method", label: "Method" },
  { id: "team", label: "Team" },
];

export function LandingNav({ onOpenChat, onNavigate }: Props) {
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
          href="#top"
          aria-label="Endurance AI Labs"
          onClick={(e) => {
            e.preventDefault();
            onNavigate("top");
          }}
        >
          <img src="/logo-endurance.svg" alt="" />
        </a>
        <div className="lp-nav-links">
          {LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(link.id);
              }}
            >
              {link.label}
            </a>
          ))}
          <button type="button" className="lp-nav-talk" onClick={onOpenChat}>
            Talk
          </button>
        </div>
      </div>
    </nav>
  );
}
