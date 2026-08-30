import type { Metadata } from "next";
import { ProductLanding } from "@/components/landing/ProductLanding";
import { MARGINS } from "@/components/landing/product-content";
import "../landing.css";

const TITLE = "Margins — Endurance AI Labs";
const DESCRIPTION =
  "Commissions, settled to the penny. TMS loads become a proven pay run. Every exception surfaced before payday.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "https://endurancelabs.ai/margins",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://endurancelabs.ai/margins",
    type: "website",
  },
};

export default function MarginsPage() {
  return <ProductLanding {...MARGINS} />;
}
