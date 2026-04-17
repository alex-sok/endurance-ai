import type { Metadata } from "next";
import { Rajdhani } from "next/font/google";
import "./globals.css";

const rajdhani = Rajdhani({
  subsets: ["latin"],
  variable: "--font-rajdhani",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Endurance AI Labs",
  description:
    "Strategic AI advisory and implementation for leaders navigating high-stakes initiatives.",
  openGraph: {
    title: "Endurance AI Labs",
    description:
      "Strategic AI advisory and implementation for leaders navigating high-stakes initiatives.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${rajdhani.variable} h-full`}>
      <body className="h-full bg-[#0F1115] antialiased" style={{ fontFamily: "var(--font-rajdhani), sans-serif" }}>{children}</body>
    </html>
  );
}
