import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { LenisProvider } from "./lib/lenis-provider";
import { ProgressIndicator } from "./components/ProgressIndicator";
import "./logistics.css";
import "./sections.css";

/**
 * /logistics nested layout.
 *
 * - Wraps the route in `.logistics-theme` so all tokens (dark bg,
 *   amber accent, display/mono fonts) are scoped. The marketing site
 *   above this layout is untouched.
 * - Mounts Lenis once for smooth scroll; honors prefers-reduced-motion.
 * - Mounts the thin amber progress rail at the right edge.
 *
 * TODO(alex): when Neue Haas Grotesk Display + Berkeley Mono are
 * licensed, replace the next/font calls below with localFont() pointing
 * at the .woff2 files in /public/fonts/. Both variables (--font-logi-display
 * and --font-logi-mono) stay the same name, so logistics.css needs no edit.
 */

// Open-source stand-ins for Neue Haas Grotesk Display + Berkeley Mono.
const interDisplay = Inter({
  subsets: ["latin"],
  variable: "--font-logi-display",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-logi-mono",
  weight: ["400", "500"],
  display: "swap",
});

const PAGE_URL = "https://endurancelabs.ai/logistics";
const TITLE = "Endurance Logistics — the first AI-native freight network";
const DESCRIPTION =
  "Endurance Logistics is the first end-to-end AI-native freight network. Investor brief: the problem, the product, the traction, the ask.";

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
    // TODO(alex): publish a static og-logistics.png (1200×630) showing
    // the hero headlight cones + headline. For now we fall back to the
    // main /og-image.png so social previews never break.
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Endurance Logistics",
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

export default function LogisticsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`logistics-theme ${interDisplay.variable} ${jetbrainsMono.variable}`}
    >
      <LenisProvider />
      <ProgressIndicator />
      {children}
    </div>
  );
}
