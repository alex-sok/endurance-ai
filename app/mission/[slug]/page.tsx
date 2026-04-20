import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { PortalShell } from "@/components/portal/PortalShell";
import type { Portal, PortalSection } from "@/types/portal";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function MissionPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: portal, error } = await supabase
    .from("portals")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (error || !portal) notFound();

  const { data: sections } = await supabase
    .from("portal_sections")
    .select("*")
    .eq("portal_id", portal.id)
    .eq("is_visible", true)
    .order("sort_order", { ascending: true });

  return (
    <PortalShell
      portal={portal as Portal}
      sections={(sections ?? []) as PortalSection[]}
    />
  );
}
