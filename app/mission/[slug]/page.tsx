import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { PortalShell } from "@/components/portal/PortalShell";
import { PortalPasswordGate } from "@/components/portal/PortalPasswordGate";
import { computeAuthToken } from "@/app/api/portal/[slug]/auth/route";
import type { Portal, PortalSection } from "@/types/portal";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function MissionPage({ params }: Props) {
  const { slug } = await params;

  // Use service role to read password_hash (never exposed to client)
  const supabase = await createClient(true);

  const { data: portal, error } = await supabase
    .from("portals")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (error || !portal) notFound();

  // ── Password gate check ───────────────────────────────────────────────────
  if (portal.password_hash) {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get(`portal_auth_${slug}`)?.value;
    const expectedToken = computeAuthToken(slug, portal.password_hash);

    if (authCookie !== expectedToken) {
      return <PortalPasswordGate slug={slug} />;
    }
  }

  // ── Strip password_hash before passing to client components ───────────────
  const { password_hash: _, ...safePortal } = portal;

  const { data: sections } = await supabase
    .from("portal_sections")
    .select("*")
    .eq("portal_id", portal.id)
    .eq("is_visible", true)
    .order("sort_order", { ascending: true });

  return (
    <PortalShell
      portal={safePortal as Portal}
      sections={(sections ?? []) as PortalSection[]}
    />
  );
}
