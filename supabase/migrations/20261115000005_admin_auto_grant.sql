-- Approved admin emails. When a user with one of these emails is created in Supabase Auth,
-- they are made an admin automatically (no manual SQL step).
create table if not exists public.admin_invites (
  email text primary key check (email = lower(email)),
  created_at timestamptz not null default now()
);
alter table public.admin_invites enable row level security;
-- No policies: only the database owner / service role can read or change this list.

create or replace function public.grant_admin_on_signup()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if exists (select 1 from public.admin_invites where email = lower(new.email)) then
    insert into public.admin_users (user_id) values (new.id) on conflict do nothing;
    insert into public.profiles (id, role) values (new.id, 'admin')
      on conflict (id) do update set role = 'admin';
  end if;
  return new;
end;
$$;
revoke all on function public.grant_admin_on_signup() from public, anon, authenticated;

drop trigger if exists grant_admin_on_signup on auth.users;
create trigger grant_admin_on_signup
  after insert on auth.users
  for each row execute function public.grant_admin_on_signup();

insert into public.admin_invites (email) values ('info.primewavemarketingagency@gmail.com')
on conflict do nothing;
