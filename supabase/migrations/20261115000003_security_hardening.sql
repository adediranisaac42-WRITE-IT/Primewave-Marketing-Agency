-- Fixes from the Supabase security advisor.
alter function public.touch_updated_at() set search_path = public;
create schema if not exists extensions;
alter extension btree_gist set schema extensions;
-- anon never needs is_admin(): admin policies apply to signed-in users only.
revoke execute on function public.is_admin() from anon;
