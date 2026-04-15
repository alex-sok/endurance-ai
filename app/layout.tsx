import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600"],
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
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="h-full bg-[#fafaf9] antialiased font-sans">{children}</body>
    </html>
  );
}
