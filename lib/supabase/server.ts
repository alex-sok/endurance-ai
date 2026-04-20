import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase client (for Server Components and API routes).
 * Uses the anon key by default; pass serviceRole=true for admin operations.
 */
export async function createClient(serviceRole = false) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const apiKey = serviceRole
    ? process.env.SUPABASE_SERVICE_ROLE_KEY!
    : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  return createSupabaseClient(url, apiKey);
}
