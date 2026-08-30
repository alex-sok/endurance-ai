import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Lato, Space_Mono } from "next/font/google";
import { ApolloTracker } from "@/components/ApolloTracker";
import "./globals.css";

// Lato — Cursor Lato substitute for body and utility text
const lato = Lato({
  subsets: ["latin"],
  variable: "--font-figtree",
  weight: ["400", "700"],
});

// Space Mono — berkeleyMono substitute for code, labels, input text
const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "700"],
});

// Instrument Serif — display headlines on the landing page
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-display",
  weight: "400",
  style: ["normal", "italic"],
});

const SITE_URL = "https://endurancelabs.ai";
const TITLE = "Endurance AI Labs — Research, engineering, vertical software";
const DESCRIPTION =
  "A research and engineering lab that studies how industries actually run, then ships the vertical systems they have been missing.";

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
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Endurance AI Labs — Research, engineering, vertical software",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.png"],
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
  themeColor: "#e4d8c6",
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
      "A research and engineering lab that studies how industries actually run, then ships vertical software for that work.",
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
      "Industry operating systems",
    ],
    sameAs: [],
  };

  return (
    <html lang="en" className={`${lato.variable} ${spaceMono.variable} ${instrumentSerif.variable} h-full`}>
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
