import type { Metadata } from "next";
import { Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument",
  weight: "400",
  style: ["normal", "italic"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500"],
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
    <html lang="en" className={`${instrumentSerif.variable} ${jetbrainsMono.variable} h-full`}>
      <body className="h-full antialiased">{children}</body>
    </html>
  );
}
