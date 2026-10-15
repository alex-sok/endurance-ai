import type { Metadata } from "next";
import { Geist } from "next/font/google";
import styles from "./landing.module.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const title = "Endurance | A company brain for the businesses building our future.";
const description =
  "Brain OS organizes your company’s knowledge, learns from every task, and helps everyone do more. Built for manufacturing, construction, logistics, energy, facilities management, and real estate.";

export const homepageMetadata: Metadata = {
  title,
  description,
  alternates: { canonical: "https://endurancelabs.ai" },
  openGraph: {
    title,
    description,
    url: "https://endurancelabs.ai",
    siteName: "Endurance AI Labs",
    type: "website",
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};

export default function LandingFrame({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={`${styles.landing} ${geist.variable}${className ? ` ${className}` : ''}`}>{children}</div>;
}
