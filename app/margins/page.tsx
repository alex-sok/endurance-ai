import type { Metadata } from "next";
import { MarginsLanding } from "@/components/margins/MarginsLanding";
import { MARGINS_META } from "@/components/margins/content";
import "../landing.css";

export const metadata: Metadata = {
  title: MARGINS_META.title,
  description: MARGINS_META.description,
  alternates: {
    canonical: MARGINS_META.canonical,
  },
  openGraph: {
    title: MARGINS_META.title,
    description: MARGINS_META.description,
    url: MARGINS_META.canonical,
    type: "website",
  },
};

export default function MarginsPage() {
  return <MarginsLanding />;
}
