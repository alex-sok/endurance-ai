import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: portal } = await supabase
    .from("portals")
    .select("client_name, tagline")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (!portal) {
    return { title: "Mission Briefing | Endurance AI Labs" };
  }

  return {
    title: `${portal.client_name} Mission Briefing | Endurance AI Labs`,
    description: portal.tagline ?? "Your private strategic AI briefing from Endurance AI Labs.",
    robots: { index: false, follow: false }, // Never index mission portals
  };
}

export default async function MissionLayout({ params, children }: Props) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: portal } = await supabase
    .from("portals")
    .select("id")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (!portal) notFound();

  return <>{children}</>;
}
