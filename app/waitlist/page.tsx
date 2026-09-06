import Link from "next/link";
import type { Metadata } from "next";
import { WaitlistForm } from "./WaitlistForm";
import "../landing.css";

export const metadata: Metadata = {
  title: "Early Access — Endurance AI Labs",
  description:
    "Join the waitlist for the Multiplayer Developer Tool: every model, every tool, your whole organization building together in real time.",
};

export default function WaitlistPage() {
  return (
    <div className="theme-paper wl-page">
      <header className="vals-top">
        <Link className="bos-back" href="/">
          <span aria-hidden="true">&larr;</span> Endurance AI Labs
        </Link>
        <Link className="bos-cta" href="/#close">
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
            Every model you use and every tool you run, built into one
            harness — your whole organization building in real time. We open
            seats in small groups; the waitlist is the door.
          </p>
          <WaitlistForm />
        </div>
      </main>
    </div>
  );
}
