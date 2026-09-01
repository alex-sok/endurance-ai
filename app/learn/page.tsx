import type { Metadata } from "next";
import { LearnIndex } from "@/components/learn/LearnIndex";
import { LEARN_INDEX_LINE } from "@/lib/learn-articles";

const TITLE = "Learn — Endurance AI Labs";

export const metadata: Metadata = {
  title: TITLE,
  description: LEARN_INDEX_LINE,
  alternates: {
    canonical: "https://endurancelabs.ai/learn",
  },
  openGraph: {
    title: TITLE,
    description: LEARN_INDEX_LINE,
    url: "https://endurancelabs.ai/learn",
    type: "website",
  },
};

export default function LearnPage() {
  return <LearnIndex />;
}
