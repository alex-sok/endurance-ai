import type { ReactNode } from "react";
import type { Viewport } from "next";
import { LearnShell } from "@/components/learn/LearnShell";
import "../landing.css";
import "./learn.css";

export const viewport: Viewport = {
  themeColor: "#f6f4ef",
};

export default function LearnLayout({ children }: { children: ReactNode }) {
  return <LearnShell>{children}</LearnShell>;
}
