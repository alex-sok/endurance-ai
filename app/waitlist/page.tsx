import Link from "next/link";
import type { Metadata } from "next";
import { WaitlistForm } from "./WaitlistForm";
import "../landing.css";

export const metadata: Metadata = {
  title: "Early Access — Endurance AI Labs",
  description:
    "Join the early-access waitlist for the Multiplayer Developer Tool, a shared environment where operators and engineers build software together.",
};

export default function WaitlistPage() {
  return (
    <div className="theme-paper wl-page">
      <header className="vals-top">
        <Link className="bos-back" href="/">
          <span aria-hidden="true">&larr;</span> Endurance AI Labs
        </Link>
        <Link className="bos-cta" href="/#contact">
          See what we&rsquo;d build for you
        </Link>
      </header>

      <main className="lp-hero is-center is-tall wl-hero">
        <div className="lp-hero-copy wl-copy">
          <p className="lp-kicker">Multiplayer Developer Tool · Early access</p>
          <h1 className="wl-h1">
            Get on the list. <em>Build together.</em>
          </h1>
          <p className="lp-hero-lede">
            Bring operators and engineers into the same development environment,
            with the models and tools they use to build. We open early access
            in small groups so we can learn from the teams using it.
          </p>
          <WaitlistForm />
        </div>
      </main>
    </div>
  );
}
