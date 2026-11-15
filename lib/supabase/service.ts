import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * SERVICE-ROLE client — bypasses RLS. Server-only (the "server-only" import makes the build fail
 * if this file is ever imported into client code). Used exclusively by /api/contact.
 */
export function createServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Supabase server environment variables are missing.");
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}
