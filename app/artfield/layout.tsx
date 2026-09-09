import type { Metadata } from "next";
import { Geist } from "next/font/google";
import styles from "./artfield.module.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const title = "Endurance AI Labs | Give people their time back.";
const description =
  "Brain OS connects what your business knows with the work it needs to do. A better business. A better working life.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "https://endurancelabs.ai/artfield" },
  openGraph: {
    title,
    description,
    url: "https://endurancelabs.ai/artfield",
  },
  twitter: { title, description },
  // Keep the alternate concept out of search while the main homepage remains canonical.
  robots: { index: false, follow: false },
};

export default function ArtfieldLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${styles.artfield} ${geist.variable}`}>{children}</div>;
}
