import Link from "next/link";
import type { Metadata } from "next";
import { BrainOSConsole } from "@/components/landing/BrainOSConsole";
import "../landing.css";

export const metadata: Metadata = {
  title: "Brain OS — Endurance AI Labs",
  description:
    "Explore illustrative Brain OS screens for seven industries, from freight operations to real estate. See how records, decisions, and tasks fit together.",
};

export default function BrainOSPage() {
  return (
    <div className="theme-paper bos-page">
      <header className="bos-top">
        <Link className="bos-back" href="/">
          <span aria-hidden="true">&larr;</span> Endurance AI Labs
        </Link>
        <div className="bos-title">
          <span className="bpos-sq">B</span>
          <b>Brain OS</b>
          <span className="bos-sub">Brain powered operating systems</span>
        </div>
        <Link className="bos-cta" href="/#contact">
          See what we’d build for you
        </Link>
      </header>

      <main className="bos-main">
        <BrainOSConsole variant="full" />
      </main>
    </div>
  );
}
