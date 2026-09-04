import type { Metadata } from "next";
import { MarginsProof } from "@/components/margins/MarginsProof";
import { PROOF_META } from "@/components/margins/proof-content";
import "../../landing.css";

export const metadata: Metadata = {
  title: PROOF_META.title,
  description: PROOF_META.description,
  alternates: {
    canonical: PROOF_META.canonical,
  },
  openGraph: {
    title: PROOF_META.title,
    description: PROOF_META.description,
    url: PROOF_META.canonical,
    type: "article",
  },
};

export default function MarginsProofPage() {
  return <MarginsProof />;
}
