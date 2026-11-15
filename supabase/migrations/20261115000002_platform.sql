-- =====================================================================
-- Primewave platform tables (Phase 1). Adds content, sales, booking and
-- newsletter tables next to the CRM core. RLS on every table.
-- Public visitors can only READ published content. All visitor writes go
-- through server routes using the service-role key.
-- =====================================================================
create extension if not exists btree_gist;

do $$ begin
  create type user_role as enum ('admin','editor','customer');
  create type order_status as enum ('pending','awaiting_payment','paid','in_progress','delivered','cancelled','refunded');
  create type payment_status as enum ('pending','succeeded','failed','refunded');
  create type booking_status as enum ('confirmed','rescheduled','cancelled','completed','no_show');
  create type subscriber_status as enum ('pending','confirmed','unsubscribed');
  create type assessment_type as enum ('recommendation','growth');
exception when duplicate_object then null; end $$;

-- ---------- Profiles (role per auth user) ----------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role user_role not null default 'customer',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------- Leads: fields for the multi-step quote form ----------
create sequence if not exists public.lead_ref_seq;
alter table public.leads
  add column if not exists ref text unique default ('PW-' || to_char(now(),'YYYY') || '-' || lpad(nextval('public.lead_ref_seq')::text, 5, '0')),
  add column if not exists services text[] not null default '{}',
  add column if not exists business_category text,
  add column if not exists objectives text,
  add column if not exists timeline text,
  add column if not exists additional_info text;
alter table public.leads alter column message set default '';
create index if not exists leads_service_idx on public.leads(service);

-- ---------- Site settings (contact, socials, homepage copy) ----------
create table if not exists public.site_settings (
  key text primary key check (key ~ '^[a-z0-9_.]{2,64}$'),
  value jsonb not null,
  updated_at timestamptz not null default now()
);

-- ---------- Services and packages ----------
create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9-]{2,80}$'),
  title text not null,
  summary text not null default '',
  body text not null default '',
  icon text,
  category text,
  sort int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.service_packages (
  id uuid primary key default gen_random_uuid(),
  service_id uuid not null references public.services(id) on delete cascade,
  name text not null,
  description text not null default '',
  price_gbp numeric(10,2) check (price_gbp >= 0),
  price_usd numeric(10,2) check (price_usd >= 0),
  deliverables jsonb not null default '[]',
  add_ons jsonb not null default '[]',
  delivery_days int check (delivery_days > 0),
  sort int not null default 0,
  is_available boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists service_packages_service_idx on public.service_packages(service_id);

create table if not exists public.pricing_rules (
  id uuid primary key default gen_random_uuid(),
  service_id uuid not null references public.services(id) on delete cascade,
  min_gbp numeric(10,2) not null check (min_gbp >= 0),
  max_gbp numeric(10,2) not null,
  options jsonb not null default '[]',
  updated_at timestamptz not null default now(),
  check (max_gbp >= min_gbp)
);
create index if not exists pricing_rules_service_idx on public.pricing_rules(service_id);

-- ---------- Portfolio, case studies, testimonials, blog, FAQs ----------
create table if not exists public.portfolio_projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9-]{2,80}$'),
  title text not null,
  category text not null,
  summary text not null default '',
  technologies text[] not null default '{}',
  images text[] not null default '{}',
  live_url text,
  is_concept boolean not null default false,
  is_published boolean not null default false,
  sort int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists portfolio_published_idx on public.portfolio_projects(is_published, category);

create table if not exists public.case_studies (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references public.portfolio_projects(id) on delete set null,
  slug text not null unique check (slug ~ '^[a-z0-9-]{2,80}$'),
  title text not null,
  background text, challenge text, strategy text, implementation text,
  deliverables jsonb not null default '[]',
  verified_outcomes jsonb not null default '[]',
  evidence_note text,
  images text[] not null default '{}',
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists case_studies_project_idx on public.case_studies(project_id);

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  quote text not null check (char_length(quote) <= 2000),
  name text not null,
  role text,
  source text,
  rating int check (rating between 1 and 5),
  consent_on_file boolean not null default false,
  is_published boolean not null default false,
  sort int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (not is_published or consent_on_file)
);

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9-]{2,120}$'),
  title text not null,
  excerpt text not null default '',
  body text not null default '',
  cover_image text,
  tags text[] not null default '{}',
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists blog_published_idx on public.blog_posts(published_at desc);

create table if not exists public.faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  service_id uuid references public.services(id) on delete cascade,
  sort int not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);
create index if not exists faqs_service_idx on public.faqs(service_id);

-- ---------- Assessments (quiz + growth check) ----------
create table if not exists public.assessments (
  id uuid primary key default gen_random_uuid(),
  type assessment_type not null,
  answers jsonb not null,
  result jsonb not null default '{}',
  lead_id uuid references public.leads(id) on delete set null,
  created_at timestamptz not null default now()
);
create index if not exists assessments_lead_idx on public.assessments(lead_id);

-- ---------- Orders and payments ----------
create sequence if not exists public.order_ref_seq;
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  ref text not null unique default ('PWO-' || to_char(now(),'YYYY') || '-' || lpad(nextval('public.order_ref_seq')::text, 5, '0')),
  customer_id uuid references auth.users(id) on delete set null,
  customer_email text not null,
  customer_name text not null,
  status order_status not null default 'pending',
  currency text not null default 'GBP' check (currency in ('GBP','USD','CAD','EUR')),
  total numeric(10,2) not null default 0 check (total >= 0),
  project_brief jsonb not null default '{}',
  internal_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists orders_status_idx on public.orders(status, created_at desc);
create index if not exists orders_customer_idx on public.orders(customer_id);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  package_id uuid references public.service_packages(id) on delete set null,
  description text not null,
  add_ons jsonb not null default '[]',
  unit_price numeric(10,2) not null check (unit_price >= 0),
  qty int not null default 1 check (qty > 0)
);
create index if not exists order_items_order_idx on public.order_items(order_id);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  provider text not null,
  provider_ref text not null,
  provider_event_id text not null unique,
  status payment_status not null,
  amount numeric(10,2) not null,
  currency text not null,
  created_at timestamptz not null default now(),
  unique (provider, provider_ref, status)
);
create index if not exists payments_order_idx on public.payments(order_id);

-- ---------- Booking ----------
create table if not exists public.availability (
  id uuid primary key default gen_random_uuid(),
  weekday int not null check (weekday between 0 and 6),
  start_time time not null,
  end_time time not null,
  timezone text not null default 'Europe/London',
  buffer_minutes int not null default 15 check (buffer_minutes >= 0),
  check (end_time > start_time)
);

create table if not exists public.blackout_dates (
  day date primary key,
  reason text
);

create sequence if not exists public.booking_ref_seq;
create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  ref text not null unique default ('PWB-' || lpad(nextval('public.booking_ref_seq')::text, 5, '0')),
  name text not null,
  email text not null,
  appointment_type text not null,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  customer_timezone text not null,
  objectives text,
  status booking_status not null default 'confirmed',
  calendar_event_id text,
  manage_token uuid not null unique default gen_random_uuid(),
  lead_id uuid references public.leads(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (ends_at > starts_at),
  constraint bookings_no_overlap exclude using gist (tstzrange(starts_at, ends_at) with &&) where (status in ('confirmed','rescheduled'))
);
create index if not exists bookings_starts_idx on public.bookings(starts_at);

-- ---------- Client project updates ----------
create table if not exists public.project_updates (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  note text not null,
  is_client_visible boolean not null default false,
  created_by uuid references auth.users(id) on delete set null default auth.uid(),
  created_at timestamptz not null default now()
);
create index if not exists project_updates_project_idx on public.project_updates(project_id, created_at desc);

-- ---------- Newsletter ----------
create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  status subscriber_status not null default 'pending',
  consent_text text not null,
  confirm_token uuid not null unique default gen_random_uuid(),
  unsubscribe_token uuid not null unique default gen_random_uuid(),
  confirmed_at timestamptz,
  created_at timestamptz not null default now()
);
create unique index if not exists newsletter_email_uq on public.newsletter_subscribers(lower(email));

-- ---------- updated_at triggers ----------
do $$
declare t text;
begin
  foreach t in array array['profiles','services','service_packages','portfolio_projects','case_studies','testimonials','blog_posts','orders','bookings'] loop
    execute format('drop trigger if exists touch_%1$s on public.%1$s', t);
    execute format('create trigger touch_%1$s before update on public.%1$s for each row execute function public.touch_updated_at()', t);
  end loop;
end $$;

-- ---------- Row Level Security ----------
do $$
declare t text;
begin
  foreach t in array array['profiles','site_settings','services','service_packages','pricing_rules','portfolio_projects','case_studies','testimonials','blog_posts','faqs','assessments','orders','order_items','payments','availability','blackout_dates','bookings','project_updates','newsletter_subscribers'] loop
    execute format('alter table public.%I enable row level security', t);
    execute format('drop policy if exists "admins_all" on public.%I', t);
    execute format('create policy "admins_all" on public.%I for all to authenticated using (public.is_admin()) with check (public.is_admin())', t);
  end loop;
end $$;

-- Public (anon + logged-in) read access to published content only
create policy "public_read" on public.site_settings for select to anon, authenticated using (true);
create policy "public_read" on public.services for select to anon, authenticated using (is_active);
create policy "public_read" on public.service_packages for select to anon, authenticated
  using (is_available and exists (select 1 from public.services s where s.id = service_id and s.is_active));
create policy "public_read" on public.pricing_rules for select to anon, authenticated using (true);
create policy "public_read" on public.portfolio_projects for select to anon, authenticated using (is_published);
create policy "public_read" on public.case_studies for select to anon, authenticated using (is_published);
create policy "public_read" on public.testimonials for select to anon, authenticated using (is_published);
create policy "public_read" on public.blog_posts for select to anon, authenticated using (published_at is not null and published_at <= now());
create policy "public_read" on public.faqs for select to anon, authenticated using (is_published);
create policy "public_read" on public.availability for select to anon, authenticated using (true);
create policy "public_read" on public.blackout_dates for select to anon, authenticated using (true);

-- Customers see only their own profile, orders and order items
create policy "own_profile" on public.profiles for select to authenticated using (id = auth.uid());
create policy "own_orders" on public.orders for select to authenticated using (customer_id = auth.uid());
create policy "own_order_items" on public.order_items for select to authenticated
  using (exists (select 1 from public.orders o where o.id = order_id and o.customer_id = auth.uid()));

-- assessments, payments, bookings, newsletter_subscribers, project_updates:
-- admins only. Writes come from server routes (service role) after validation.

-- ---------- Storage buckets ----------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('public-media', 'public-media', true, 5242880, array['image/jpeg','image/png','image/webp','image/avif']),
  ('private-uploads', 'private-uploads', false, 10485760, array['image/jpeg','image/png','image/webp','application/pdf'])
on conflict (id) do nothing;

create policy "public_media_read" on storage.objects for select to anon, authenticated using (bucket_id = 'public-media');
create policy "admin_media_write" on storage.objects for all to authenticated
  using (bucket_id in ('public-media','private-uploads') and public.is_admin())
  with check (bucket_id in ('public-media','private-uploads') and public.is_admin());
