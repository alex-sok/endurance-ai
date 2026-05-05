import type { Metadata } from "next";
import { Inter, Space_Mono } from "next/font/google";
import "./globals.css";

// universalSans substitute — Inter with negative tracking applied via CSS
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-figtree",
  weight: ["400", "500", "600", "700"],
});

// GeistMono substitute — Space Mono with positive tracking applied via CSS
const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Endurance AI Labs",
  description:
    "AI transformation, delivered under contract. Small units. Senior operators. Shipped systems.",
  openGraph: {
    title: "Endurance AI Labs",
    description:
      "AI transformation, delivered under contract. Small units. Senior operators. Shipped systems.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceMono.variable} h-full`}>
      <body className="h-full antialiased">{children}</body>
    </html>
  );
}
