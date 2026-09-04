"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  onOpenChat: () => void;
  onNavigate?: (id: string) => void;
  onCtaClick?: (label: string) => void;
}

// Section anchors on the homepage, then the one link that is a page of its
// own. Pricing keeps its place on a phone, where the anchors are hidden: the
// page is what gets handed out, and it is handed out to people holding phones.
const LINKS = [
  { id: "research", label: "Lab" },
  { id: "work", label: "Work" },
  { id: "team", label: "Team" },
];

const MARGINS_PRICING = "/margins/pricing";
const BRAIN_PRICING = "/brain/pricing";

export function LandingNav({ onOpenChat, onNavigate }: Props) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  // Pricing follows the product you are on; Margins is the default elsewhere.
  const pricingHref = pathname.startsWith("/brain") ? BRAIN_PRICING : MARGINS_PRICING;
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
            href={pricingHref}
            aria-current={pathname === pricingHref ? "page" : undefined}
          >
            Pricing
          </Link>
          <button type="button" className="lp-nav-talk" onClick={onOpenChat}>
            Talk
          </button>
        </div>
      </div>
    </nav>
  );
}
