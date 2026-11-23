import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { HOME_DESCRIPTION, HOME_TITLE } from "@/lib/site-schema";
import styles from "./landing.module.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const title = HOME_TITLE;
const description = HOME_DESCRIPTION;

export const homepageMetadata: Metadata = {
  title,
  description,
  alternates: { canonical: "https://endurancelabs.ai" },
  openGraph: {
    title,
    description,
    url: "https://endurancelabs.ai",
    siteName: "endurance",
    type: "website",
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};

export default function LandingFrame({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={`${styles.landing} ${geist.variable}${className ? ` ${className}` : ''}`}>{children}</div>;
}
