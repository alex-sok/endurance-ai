import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { LenisProvider } from "./lib/lenis-provider";
import { ProgressIndicator } from "./components/ProgressIndicator";
import "./investments.css";
import "./sections.css";

const interDisplay = Inter({
  subsets: ["latin"],
  variable: "--font-inv-display",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-inv-mono",
  weight: ["400", "500"],
  display: "swap",
});

const PAGE_URL = "https://endurancelabs.ai/investments";
const TITLE =
  "Endurance Investments — the operating system for multifamily real estate";
const DESCRIPTION =
  "AI-powered investment platform for multifamily operators. From deal screening to LP distributions — one platform.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: PAGE_URL,
    siteName: "Endurance AI Labs",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Endurance Investments",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.png"],
  },
};

export default function InvestmentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`invest-theme ${interDisplay.variable} ${jetbrainsMono.variable}`}
    >
      <LenisProvider />
      <ProgressIndicator />
      {children}
    </div>
  );
}
