-- Portfolio cards: featured flag, cover image, card label, case-study text and deliverables.
alter table public.portfolio_projects
  add column if not exists is_featured boolean not null default false,
  add column if not exists cover_image text,
  add column if not exists badge text,
  add column if not exists description text not null default '',
  add column if not exists deliverables text[] not null default '{}',
  add column if not exists client_name text;

alter table public.portfolio_projects drop constraint if exists portfolio_category_check;
alter table public.portfolio_projects add constraint portfolio_category_check
  check (category in ('Website Development', 'Shopify & E-commerce', 'Digital Marketing', 'CRM & Automation'));

create index if not exists portfolio_sort_idx on public.portfolio_projects(is_published, is_featured desc, sort);

-- Concept projects (clearly labelled as concepts on the site; replace with real case studies over time).
insert into public.portfolio_projects
  (slug, title, category, badge, summary, description, deliverables, technologies, cover_image, is_concept, is_published, is_featured, sort)
values
  ('vellora-shopify-store', 'E-commerce Store Design & Development', 'Shopify & E-commerce', 'Shopify',
   'A concept Shopify store for a modern home-living brand, designed around a clean, premium shopping experience.',
   'Vellora is a concept project that shows how we approach a new Shopify build: a calm, premium look, clear navigation, product pages that answer buyers'' questions and a mobile layout designed first. It is not a client project, and no results are claimed.',
   array['Brand-led homepage and collection pages','Product page layout and content structure','Mobile-first design','Cart and checkout review','Launch checklist'],
   array['Shopify','Figma','Klaviyo'], '/images/portfolio/vellora-shopify-store-hd.webp', true, true, true, 1),
  ('corporate-website-redesign', 'Corporate Website Redesign', 'Website Development', 'Website Development',
   'A concept redesign of a corporate website focused on trust, clarity and easy enquiries.',
   'This concept shows how we would redesign an established company''s website: a stronger first impression, clearer service pages and a simple path to get in touch. It is a concept, not a client project.',
   array['Information architecture','Homepage and service page design','Enquiry journey','Speed and accessibility review'],
   array['Next.js','Figma'], '/images/portfolio/corporate-website-redesign-hd.webp', true, true, false, 2),
  ('multi-channel-marketing-campaign', 'Multi-Channel Marketing Campaign', 'Digital Marketing', 'Digital Marketing',
   'A concept campaign plan across Meta, Google and TikTok with clear audiences and creative testing.',
   'This concept outlines how we structure a paid campaign across Meta, Google and TikTok: tracking set up first, audiences mapped to the buying journey, and a regular creative-testing rhythm. No performance figures are claimed.',
   array['Tracking and conversion setup','Audience mapping','Campaign structure','Creative testing plan','Reporting template'],
   array['Meta Ads','Google Ads','TikTok Ads'], '/images/portfolio/multi-channel-campaign-hd.webp', true, true, false, 3),
  ('klaviyo-email-automation', 'Klaviyo Email Automation', 'CRM & Automation', 'CRM & Automation',
   'A concept welcome and follow-up flow that nurtures new subscribers into first-time buyers.',
   'This concept shows a Klaviyo setup for a growing store: a welcome series for new subscribers, timed follow-ups and segments that keep messages relevant. It is a concept, not a client project.',
   array['Klaviyo setup and integration','Signup form','Welcome series','Follow-up flow','Segmentation'],
   array['Klaviyo','Shopify'], '/images/portfolio/klaviyo-email-automation-hd.webp', true, true, false, 4),
  ('product-page-cro', 'Conversion Rate Optimization (CRO)', 'Shopify & E-commerce', 'Shopify & CRO',
   'A concept product-page review showing how we prioritise changes that remove friction for buyers.',
   'This concept walks through how we review a Shopify product and collection experience: what buyers see first, where they hesitate, and which changes to make first. No conversion figures are claimed.',
   array['Product and collection page review','Mobile experience review','Prioritised recommendations','Implementation support'],
   array['Shopify','Google Analytics'], '/images/portfolio/product-page-cro-hd.webp', true, true, false, 5)
on conflict (slug) do nothing;
