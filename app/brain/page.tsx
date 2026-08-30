import type { Metadata } from "next";
import { BrainLanding } from "@/components/landing/BrainLanding";
import "../landing.css";

const PAGE_URL = "https://endurancelabs.ai/brain";
const TITLE = "Endurance Brain — Institutional memory that cites its sources";
const DESCRIPTION =
  "Everything the firm already produces, compiled into a living knowledge base. Every claim cites a source. Nothing is invented.";

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
        alt: TITLE,
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

export default function BrainPage() {
  return <BrainLanding />;
}
