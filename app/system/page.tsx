import type { Metadata } from "next";
import { SystemBook } from "@/components/system/SystemBook";
import "../landing.css";

const TITLE = "Marketing system | endurance";
const DESCRIPTION =
  "The shared design language for endurance marketing. Paper, two faces, and the parts every page uses, written in itself.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "https://endurancelabs.ai/system",
  },
  robots: { index: false, follow: false },
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
