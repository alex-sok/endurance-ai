import type { Metadata } from "next";
import { BrainPricing } from "@/components/landing/BrainPricing";
import { BRAIN_PRICING_META } from "@/components/landing/brain-pricing-content";
import "../../landing.css";

export const metadata: Metadata = {
  title: BRAIN_PRICING_META.title,
  description: BRAIN_PRICING_META.description,
  alternates: { canonical: BRAIN_PRICING_META.canonical },
  openGraph: {
    title: BRAIN_PRICING_META.title,
    description: BRAIN_PRICING_META.description,
    url: BRAIN_PRICING_META.canonical,
    type: "website",
  },
};

export default function BrainPricingPage() {
  return <BrainPricing />;
}
