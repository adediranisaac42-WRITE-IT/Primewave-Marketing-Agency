-- =====================================================================
-- PrimeWave Marketing Agency — database schema
-- Run in Supabase: Dashboard → SQL Editor → New query → paste → Run.
-- Safe defaults: RLS enabled on every table; only listed admins can read/write.
-- The public website never talks to these tables directly — enquiries are
-- inserted by the server-side /api/contact route.
-- =====================================================================

create extension if not exists "pgcrypto";

-- ---------- Enums ----------
do $$ begin
  create type lead_status as enum ('new','contacted','qualified','proposal','won','lost');
  create type deal_stage as enum ('lead','qualified','proposal','negotiation','won','lost');
  create type consultation_status as enum ('scheduled','completed','cancelled','no_show');
  create type project_status as enum ('planning','in_progress','review','completed','on_hold');
  create type activity_type as enum ('note','email','call','meeting','whatsapp','status_change');
exception when duplicate_object then null; end $$;

-- ---------- Admins ----------
create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.admin_users where user_id = auth.uid());
$$;
revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

-- ---------- Shared updated_at trigger ----------
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end $$;

-- ---------- Clients ----------
create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 160),
  company text,
  email text,
  phone text,
  website text,
  country text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------- Leads (website enquiries + manual) ----------
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  full_name text not null check (char_length(full_name) between 2 and 120),
  email text not null check (char_length(email) <= 200),
  business_name text,
  website_url text,
  service text not null,
  budget text not null,
  message text not null check (char_length(message) <= 5000),
  status lead_status not null default 'new',
  source text not null default 'website_contact_form',
  client_id uuid references public.clients(id) on delete set null,
  user_agent text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists leads_status_idx on public.leads(status);
create index if not exists leads_created_idx on public.leads(created_at desc);

-- ---------- Sales pipeline ----------
create table if not exists public.deals (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  stage deal_stage not null default 'lead',
  value numeric(12,2) check (value >= 0),
  currency text not null default 'GBP',
  expected_close date,
  client_id uuid references public.clients(id) on delete set null,
  lead_id uuid references public.leads(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists deals_stage_idx on public.deals(stage);

-- ---------- Consultations ----------
create table if not exists public.consultations (
  id uuid primary key default gen_random_uuid(),
  scheduled_at timestamptz not null,
  duration_minutes int not null default 30 check (duration_minutes between 5 and 480),
  meeting_link text,
  status consultation_status not null default 'scheduled',
  notes text,
  lead_id uuid references public.leads(id) on delete set null,
  client_id uuid references public.clients(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists consultations_when_idx on public.consultations(scheduled_at);

-- ---------- Projects ----------
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  service text,
  status project_status not null default 'planning',
  progress int not null default 0 check (progress between 0 and 100),
  start_date date,
  due_date date,
  notes text,
  client_id uuid references public.clients(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------- Follow-up reminders ----------
create table if not exists public.reminders (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  due_at timestamptz not null,
  done boolean not null default false,
  lead_id uuid references public.leads(id) on delete cascade,
  client_id uuid references public.clients(id) on delete cascade,
  deal_id uuid references public.deals(id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists reminders_due_idx on public.reminders(done, due_at);

-- ---------- Communication history ----------
create table if not exists public.activities (
  id uuid primary key default gen_random_uuid(),
  type activity_type not null default 'note',
  body text not null check (char_length(body) <= 5000),
  lead_id uuid references public.leads(id) on delete cascade,
  client_id uuid references public.clients(id) on delete cascade,
  created_by uuid references auth.users(id) on delete set null default auth.uid(),
  created_at timestamptz not null default now()
);
create index if not exists activities_lead_idx on public.activities(lead_id, created_at desc);
create index if not exists activities_client_idx on public.activities(client_id, created_at desc);

-- ---------- Triggers ----------
do $$
declare t text;
begin
  foreach t in array array['clients','leads','deals','consultations','projects','reminders'] loop
    execute format('drop trigger if exists touch_%1$s on public.%1$s', t);
    execute format('create trigger touch_%1$s before update on public.%1$s for each row execute function public.touch_updated_at()', t);
  end loop;
end $$;

-- ---------- Row Level Security ----------
do $$
declare t text;
begin
  foreach t in array array['admin_users','clients','leads','deals','consultations','projects','reminders','activities'] loop
    execute format('alter table public.%I enable row level security', t);
  end loop;

  foreach t in array array['clients','leads','deals','consultations','projects','reminders','activities'] loop
    execute format('drop policy if exists "admins_all" on public.%I', t);
    execute format('create policy "admins_all" on public.%I for all to authenticated using (public.is_admin()) with check (public.is_admin())', t);
  end loop;
end $$;

-- Admins can see the admin list (to verify their own access); nobody can modify it from the app.
drop policy if exists "admins_read" on public.admin_users;
create policy "admins_read" on public.admin_users for select to authenticated using (public.is_admin());

-- No policies exist for the anon role → anonymous visitors cannot read or write anything.

-- =====================================================================
-- AFTER RUNNING: create your admin login
--   1. Supabase → Authentication → Users → "Add user" (email + strong password).
--      Then Authentication → Providers → Email: turn OFF "Allow new users to sign up".
--   2. Run (replace the email):
--      insert into public.admin_users (user_id)
--      select id from auth.users where email = 'you@example.com';
-- =====================================================================
