import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const checks: Record<string, unknown> = {
    slug,
    env: {
      supabase_url: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      anon_key: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      service_role: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    },
  };

  try {
    const supabase = await createClient();

    // Check raw portal lookup (no is_published filter)
    const { data: all, error: allError } = await supabase
      .from("portals")
      .select("id, slug, is_published, client_name")
      .eq("slug", slug);

    checks.raw_query = { data: all, error: allError?.message };

    // Check with is_published filter
    const { data: published, error: pubError } = await supabase
      .from("portals")
      .select("id, slug, is_published")
      .eq("slug", slug)
      .eq("is_published", true)
      .single();

    checks.published_query = { data: published, error: pubError?.message };

  } catch (err) {
    checks.exception = err instanceof Error ? err.message : String(err);
  }

  return Response.json(checks);
}
