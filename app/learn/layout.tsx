import type { ReactNode } from "react";
import { LearnShell } from "@/components/learn/LearnShell";
import "../landing.css";
import "./learn.css";

export default function LearnLayout({ children }: { children: ReactNode }) {
  return <LearnShell>{children}</LearnShell>;
}
