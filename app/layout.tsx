import type { Metadata } from "next";
import { Lato, Space_Mono } from "next/font/google";
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
    <html lang="en" className={`${lato.variable} ${spaceMono.variable} h-full`}>
      <body className="h-full antialiased">{children}</body>
    </html>
  );
}
