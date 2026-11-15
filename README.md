# Primewave Marketing Agency — Website + Private CRM

Next.js 15 · TypeScript · Tailwind CSS (navy + orange design tokens) · Framer Motion · Lucide · Supabase · Vercel

## 1. Run it locally
```bash
npm install
cp .env.example .env.local     # then fill in the values (step 2)
npm run dev                    # http://localhost:3000
```

## 2. Supabase (already created)
Project **primewave-agency** (London, eu-west-2). The schema lives in `supabase/migrations/` and has been applied:
`20261115000001_crm_core.sql` (CRM tables), `20261115000002_platform.sql` (content, sales, booking, newsletter, storage),
`20261115000003_security_hardening.sql`. Add new changes as new migration files; never edit applied ones.

1. **Project Settings → API**: copy the URL, anon key and service_role key into `.env.local` (and into Vercel).
2. **Authentication → Users → Add user** (your email + strong password), then **Authentication → Providers → Email** → turn OFF "Allow new users to sign up".
3. Make yourself an admin (SQL Editor):
   ```sql
   insert into public.admin_users (user_id) select id from auth.users where email = 'YOUR@EMAIL.com';
   insert into public.profiles (id, role) select id, 'admin' from auth.users where email = 'YOUR@EMAIL.com';
   ```
4. Visit `/admin` and sign in.

## 3. Things only you can add (the site hides them until you do)
| What | Where |
|---|---|
| UK business phone, email, Instagram/LinkedIn/Facebook/Fiverr | `lib/site.ts` |
| Real portfolio projects + screenshots (`/public/images/projects/`) | `lib/data/projects.ts` |
| Genuine client testimonials (e.g. Fiverr reviews, word-for-word) | `lib/data/testimonials.ts` |
| Legal text review | `app/(site)/privacy-policy`, `app/(site)/terms` |

Placeholders for projects/testimonials show **only in development** (amber "Dev placeholder" label) and never in production.

## 4. Deploy (GitHub → Vercel) — only when you approve
```bash
git init && git add . && git commit -m "Primewave website"
gh repo create primewave-website --private --source=. --push
```
In Vercel: **Add New → Project →** import the repo → add these Environment Variables:

| Variable | Exposed to browser? |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | yes (safe) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | yes (safe — RLS protects data) |
| `NEXT_PUBLIC_SITE_URL` | yes (your domain) |
| `SUPABASE_SERVICE_ROLE_KEY` | **NO — server only. Never prefix with NEXT_PUBLIC_** |

Then Deploy, and connect your domain under **Settings → Domains**.

## Architecture
```
app/
  (site)/            public website (Navbar, Footer, cursor, smooth scroll, preloader)
    page.tsx         homepage — 12 sections
    about, services, services/[slug], crm-solutions, portfolio, contact, privacy-policy, terms
  admin/             private CRM (middleware + server-side admin check + RLS)
    login, (dash)/{overview, leads, leads/[id], clients, pipeline, consultations, projects, reminders}
    actions.ts       server actions — every one re-checks admin access
  api/contact        validated, rate-limited, honeypot-protected enquiry endpoint
  sitemap.ts, robots.ts, opengraph-image.tsx, template.tsx (page transitions)
components/  layout · sections · ui · motion · admin
lib/         site.ts (brand + contact), data/ (services, CRM, FAQs, projects, testimonials), supabase/
supabase/schema.sql
```

## Security
- RLS on every table; anonymous visitors have **no** read/write access.
- Enquiries are inserted only by the server route using the service-role key (`server-only` guarded).
- `/admin` protected three ways: middleware, `requireAdmin()` in every page/action, and RLS `is_admin()`.
- Spam protection: honeypot field, minimum fill-time check, per-IP rate limit, server-side validation.
- Security headers in `next.config.mjs`; admin pages are `noindex`.

## Animation notes
Framer Motion covers everything (text reveals, staggered cards, scroll-drawn process timeline, parallax, 3D-tilt service cards, mega menu, page transitions, preloader). Lenis provides smooth scrolling. GSAP was not needed, keeping the bundle lighter. All motion respects `prefers-reduced-motion`; the custom cursor only activates on desktop with a mouse.
Animated statistics are intentionally omitted until you have genuine figures to show.
