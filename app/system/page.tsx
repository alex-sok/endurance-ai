import type { Metadata } from "next";
import { SystemBook } from "@/components/system/SystemBook";
import "../landing.css";

const TITLE = "Marketing system — Endurance AI Labs";
const DESCRIPTION =
  "The shared design language for Endurance marketing. Field, paper, type, and the parts every page uses.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "https://endurancelabs.ai/system",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://endurancelabs.ai/system",
    type: "website",
  },
};

export default function SystemPage() {
  return <SystemBook />;
}
