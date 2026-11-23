import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { ApolloTracker } from "@/components/ApolloTracker";
import { TrackingTags } from "@/components/analytics/TrackingTags";
import { HOME_DESCRIPTION, HOME_TITLE } from "@/lib/site-schema";
import "./globals.css";

// The pairing: one American grotesque on claims and figures, one humanist
// grotesque on body and nav. No serif, and no italic anywhere.

// IBM Plex Sans: the grotesque, body and nav
const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-plex-sans",
  weight: ["400", "700"],
});

// IBM Plex Mono: the grotesque's mono, kickers and labels
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
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const SITE_URL = "https://endurancelabs.ai";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  openGraph: {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    siteName: "endurance",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
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
  return (
    <html lang="en" className={`${plexSans.variable} ${plexMono.variable} ${archivo.variable} h-full`}>
      <body className="h-full antialiased">
        <TrackingTags />
        <ApolloTracker />
        {children}
      </body>
    </html>
  );
}
