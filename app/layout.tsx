import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { ApolloTracker } from "@/components/ApolloTracker";
import "./globals.css";

// The pairing: one American grotesque on claims and figures, one humanist
// grotesque on body and nav. No serif, and no italic anywhere.

// IBM Plex Sans — the grotesque, body and nav
const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-plex-sans",
  weight: ["400", "700"],
});

// IBM Plex Mono — the grotesque's mono, kickers and labels
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-plex-mono",
  weight: ["400", "700"],
});

// Archivo: an American grotesque drawn for print and signage. It carries the
// claim and every figure. The serif is gone: a literary serif over a mono
// eyebrow is what every lab site converged on, and this is a freight ledger.
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600"],
  display: "swap",
});

const SITE_URL = "https://endurancelabs.ai";
const TITLE = "Endurance AI Labs — We research the work.";
const DESCRIPTION =
  "Endurance is a lab. We sit in the operation, then we ship the system it was missing.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Endurance AI Labs",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "48x48" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#fcfbff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Endurance AI Labs",
    url: "https://endurancelabs.ai",
    logo: "https://endurancelabs.ai/logo-endurance.svg",
    description:
      "Endurance is a lab. We sit in the operation, then we ship the system it was missing.",
    contactPoint: {
      "@type": "ContactPoint",
      email: "hello@endurancelabs.ai",
      contactType: "customer service",
    },
    founder: [
      { "@type": "Person", name: "Alex Sok", jobTitle: "CEO" },
      { "@type": "Person", name: "Nick Maxwell", jobTitle: "CTO" },
    ],
    employee: [
      { "@type": "Person", name: "Ramzy Azar", jobTitle: "Chief AI Strategy & Ops" },
      { "@type": "Person", name: "Brennan Burks", jobTitle: "Chief GTM Engineer" },
    ],
    knowsAbout: [
      "Vertical SaaS",
      "AI research",
      "Software engineering",
      "Institutional knowledge systems",
      "Logistics software",
      "Commission settlement",
      "Industry operating systems",
    ],
    sameAs: [],
  };

  return (
    <html lang="en" className={`${plexSans.variable} ${plexMono.variable} ${archivo.variable} h-full`}>
      <body className="h-full antialiased">
        <ApolloTracker />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
