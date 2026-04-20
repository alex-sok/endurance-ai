import { createClient as createSupabaseClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

  const checks: Record<string, unknown> = {
    slug,
    env: {
      supabase_url_present: !!url,
      supabase_url_value: url, // show actual value to catch formatting issues
      anon_key_present: !!anonKey,
      anon_key_length: anonKey.length,
      service_role_present: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    },
  };

  try {
    // Use plain supabase-js client (bypass SSR wrapper) to isolate the issue
    const supabase = createSupabaseClient(url, anonKey);

    const { data, error } = await supabase
      .from("portals")
      .select("id, slug, is_published, client_name");

    checks.query = { data, error: error?.message, code: error?.code };

  } catch (err) {
    checks.exception = err instanceof Error ? err.message : String(err);
  }

  return Response.json(checks);
}
