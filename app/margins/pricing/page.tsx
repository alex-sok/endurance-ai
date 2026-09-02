import type { Metadata } from "next";
import { MarginsPricing } from "@/components/margins/MarginsPricing";
import { PRICING_META } from "@/components/margins/pricing-content";
import "../../landing.css";

export const metadata: Metadata = {
  title: PRICING_META.title,
  description: PRICING_META.description,
  alternates: {
    canonical: PRICING_META.canonical,
  },
  openGraph: {
    title: PRICING_META.title,
    description: PRICING_META.description,
    url: PRICING_META.canonical,
    type: "website",
  },
};

export default function MarginsPricingPage() {
  return <MarginsPricing />;
}
