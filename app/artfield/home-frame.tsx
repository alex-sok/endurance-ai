import type { Metadata } from "next";
import { Geist } from "next/font/google";
import styles from "./artfield.module.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const title = "Endurance AI Labs | Give people back their time.";
const description =
  "Brain OS connects what your business knows with the work it needs to do. A better business. A better working life.";

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

export default function HomeFrame({ children }: { children: React.ReactNode }) {
  return <div className={`${styles.artfield} ${geist.variable}`}>{children}</div>;
}
