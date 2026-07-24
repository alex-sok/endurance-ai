import type { Metadata } from "next";
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
const TITLE = "Endurance AI Labs — Custom AI Infrastructure for Large Industries";
const DESCRIPTION =
  "We build the AI infrastructure large, regulated organizations run on — designed around how your business operates, not a one-size platform. Embedded senior operators. Shipped in production.";

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
        alt: "Endurance AI Labs — Custom AI Infrastructure for Large Industries",
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
      "Custom AI infrastructure builder for large, regulated industries. We build the systems your business runs on — designed around your operation, not a one-size platform — with a small senior team embedded alongside your operators.",
    contactPoint: {
      "@type": "ContactPoint",
      email: "hello@endurancelabs.ai",
      contactType: "customer service",
    },
    founder: [
      { "@type": "Person", name: "Alex Sok", jobTitle: "Founder & CEO" },
      { "@type": "Person", name: "Sid Bhambhani", jobTitle: "Co-Founder & CTO" },
      { "@type": "Person", name: "Nick Maxwell", jobTitle: "Co-Founder & Chief AI Officer" },
    ],
    knowsAbout: [
      "AI Strategy",
      "AI Transformation",
      "Workflow Automation",
      "AI Architecture",
      "Enterprise AI",
      "AI Execution",
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
