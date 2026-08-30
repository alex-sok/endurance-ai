import type { Metadata } from "next";
import { ProductLanding } from "@/components/landing/ProductLanding";
import { BRAIN } from "@/components/landing/product-content";
import "../landing.css";

const TITLE = "Brain — Endurance AI Labs";
const DESCRIPTION =
  "Institutional memory that cites its sources. Everything the firm already produces, compiled. Every claim cites a source. Nothing is invented.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "https://endurancelabs.ai/brain",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://endurancelabs.ai/brain",
    type: "website",
  },
};

export default function BrainPage() {
  return <ProductLanding {...BRAIN} />;
}
