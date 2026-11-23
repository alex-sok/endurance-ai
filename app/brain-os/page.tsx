import Link from "next/link";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { BrainOSConsole } from "@/components/landing/BrainOSConsole";
import "../landing.css";
import styles from "./console.module.css";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });

const TITLE = "BrainOS sample screens | endurance";
const DESCRIPTION =
  "Illustrative BrainOS screens with fictional sample figures. Load IDs, revenue, and margins on this page are not a customer's results.";
const PAGE_URL = "https://endurancelabs.ai/brain-os";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: PAGE_URL,
    siteName: "endurance",
    type: "website",
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
  robots: { index: true, follow: true },
};

export default function BrainOSPage() {
  return (
    <div className={`theme-paper bos-page ${styles.console} ${geist.variable}`}>
      <header className="bos-top">
        <Link className="bos-back" href="/">
          <span aria-hidden="true">&larr;</span> endurance
        </Link>
        <div className="bos-title">
          <span className="bpos-sq">B</span>
          <h1>BrainOS</h1>
          <span className="bos-sub">Sample screens. Figures are fictional.</span>
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
