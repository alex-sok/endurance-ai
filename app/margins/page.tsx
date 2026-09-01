import type { Metadata } from "next";
import { ProductLanding } from "@/components/landing/ProductLanding";
import { MARGINS } from "@/components/landing/product-content";
import "../landing.css";

const TITLE = "Margins — Endurance AI Labs";
const DESCRIPTION =
  "Pay for the margin, not the load. TMS loads become a weekly pay run. Splits track what the load actually made.";

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
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Margins",
  description: DESCRIPTION,
  url: "https://endurancelabs.ai/margins",
  image: "https://endurancelabs.ai/landing/margins.jpg",
  brand: {
    "@type": "Organization",
    name: "Endurance AI Labs",
    url: "https://endurancelabs.ai",
  },
};

export default function MarginsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <ProductLanding {...MARGINS} />
    </>
  );
}
