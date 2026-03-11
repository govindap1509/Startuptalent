-- ═══════════════════════════════════════════════════════════
-- FOUNDRY DATABASE SCHEMA
-- Run this in your Supabase SQL editor
-- ═══════════════════════════════════════════════════════════

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ── PROFILES ──────────────────────────────────────────────
create table public.talent_profiles (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade unique,
  username text unique,
  first_name text,
  last_name text,
  email text,
  phone text,
  city text,
  headline text,
  bio text,
  avatar_url text,
  current_role text,
  current_company text,
  years_of_experience integer default 0,
  target_roles text[] default '{}',
  skills text[] default '{}',
  education jsonb default '[]',
  experience jsonb default '[]',
  work_preference text, -- 'remote' | 'hybrid' | 'onsite'
  expected_salary_min integer, -- in lakhs
  expected_salary_max integer, -- in lakhs
  preferred_stage text, -- 'Seed' | 'Series A' | 'Series B' etc
  availability text, -- 'immediate' | '1-month' | '2-months' | '3-months'
  profile_score integer default 0,
  cv_url text,
  is_open_to_roles boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ── COMPANIES ─────────────────────────────────────────────
create table public.companies (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  slug text unique not null,
  name text not null,
  logo_url text,
  logo_letter text,
  logo_color text default '#1A73E8',
  tagline text,
  about text,
  website text,
  stage text,
  sector text,
  hq text,
  team_size text,
  founded text,
  raised text,
  is_verified boolean default false,
  values jsonb default '[]',
  perks jsonb default '[]',
  team jsonb default '[]',
  investors text[] default '{}',
  press jsonb default '[]',
  life_data jsonb default '[]',
  follower_count integer default 0,
  plan text default 'free',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ── JOBS ──────────────────────────────────────────────────
create table public.jobs (
  id uuid default uuid_generate_v4() primary key,
  company_id uuid references public.companies(id) on delete cascade not null,
  title text not null,
  type text, -- 'product' | 'engineering' | 'growth' | 'design' | 'data'
  location text,
  work_type text, -- 'Remote' | 'Hybrid' | 'On-site'
  salary_min integer, -- in lakhs
  salary_max integer, -- in lakhs
  salary_display text, -- formatted e.g. '₹28–40L'
  equity text,
  description text,
  responsibilities text[] default '{}',
  requirements text[] default '{}',
  skills text[] default '{}',
  tags text[] default '{}',
  perks text[] default '{}',
  similar_job_ids uuid[] default '{}',
  status text default 'live', -- 'live' | 'paused' | 'closed'
  applicant_count integer default 0,
  posted_at timestamptz default now(),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ── APPLICATIONS ──────────────────────────────────────────
create table public.applications (
  id uuid default uuid_generate_v4() primary key,
  job_id uuid references public.jobs(id) on delete cascade not null,
  talent_id uuid references public.talent_profiles(id) on delete cascade not null,
  company_id uuid references public.companies(id) on delete cascade not null,
  status text default 'applied', -- 'applied' | 'seen' | 'in-review' | 'interview' | 'offer' | 'rejected'
  match_score integer,
  availability text,
  note text,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(job_id, talent_id)
);

-- ── MESSAGES ──────────────────────────────────────────────
create table public.messages (
  id uuid default uuid_generate_v4() primary key,
  sender_id uuid references auth.users(id) on delete cascade not null,
  receiver_id uuid references auth.users(id) on delete cascade not null,
  thread_key text not null, -- composite key for grouping
  content text not null,
  is_read boolean default false,
  created_at timestamptz default now()
);

-- ── FOLLOWS ───────────────────────────────────────────────
create table public.follows (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  company_id uuid references public.companies(id) on delete cascade not null,
  created_at timestamptz default now(),
  unique(user_id, company_id)
);

-- ── SAVED JOBS ────────────────────────────────────────────
create table public.saved_jobs (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  job_id uuid references public.jobs(id) on delete cascade not null,
  created_at timestamptz default now(),
  unique(user_id, job_id)
);

-- ── INDEXES ───────────────────────────────────────────────
create index idx_jobs_company on public.jobs(company_id);
create index idx_jobs_type on public.jobs(type);
create index idx_jobs_status on public.jobs(status);
create index idx_applications_job on public.applications(job_id);
create index idx_applications_talent on public.applications(talent_id);
create index idx_messages_thread on public.messages(thread_key);
create index idx_talent_username on public.talent_profiles(username);
create index idx_companies_slug on public.companies(slug);

-- ── RLS ───────────────────────────────────────────────────
alter table public.talent_profiles enable row level security;
alter table public.companies enable row level security;
alter table public.jobs enable row level security;
alter table public.applications enable row level security;
alter table public.messages enable row level security;
alter table public.follows enable row level security;
alter table public.saved_jobs enable row level security;

-- Public read for jobs and companies (anyone can browse)
create policy "Anyone can read live jobs" on public.jobs for select using (status = 'live');
create policy "Anyone can read companies" on public.companies for select using (true);
create policy "Anyone can read talent profiles" on public.talent_profiles for select using (true);

-- Auth policies
create policy "Users can update own profile" on public.talent_profiles for update using (auth.uid() = user_id);
create policy "Users can insert own profile" on public.talent_profiles for insert with check (auth.uid() = user_id);
create policy "Company owners can manage" on public.companies for all using (auth.uid() = user_id);
create policy "Company owners can manage jobs" on public.jobs for all using (
  company_id in (select id from public.companies where user_id = auth.uid())
);
create policy "Talent can manage own applications" on public.applications for all using (
  talent_id in (select id from public.talent_profiles where user_id = auth.uid())
);
create policy "Users can manage own messages" on public.messages for all using (
  auth.uid() = sender_id or auth.uid() = receiver_id
);
create policy "Users can manage own follows" on public.follows for all using (auth.uid() = user_id);
create policy "Users can manage own saved jobs" on public.saved_jobs for all using (auth.uid() = user_id);

-- ── FUNCTIONS ─────────────────────────────────────────────
-- Auto-generate username from name
create or replace function generate_username()
returns trigger as $$
declare
  base_slug text;
  final_slug text;
  counter integer := 0;
begin
  base_slug := lower(regexp_replace(
    coalesce(new.first_name, '') || '-' || coalesce(new.last_name, ''),
    '[^a-z0-9-]', '', 'g'
  ));
  final_slug := base_slug;
  while exists (select 1 from public.talent_profiles where username = final_slug and id != new.id) loop
    counter := counter + 1;
    final_slug := base_slug || '-' || counter;
  end loop;
  new.username := final_slug;
  return new;
end;
$$ language plpgsql;

create trigger set_username
  before insert or update of first_name, last_name on public.talent_profiles
  for each row
  when (new.username is null or new.username = '')
  execute function generate_username();

-- Auto-update updated_at
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at := now();
  return new;
end;
$$ language plpgsql;

create trigger update_talent_timestamp before update on public.talent_profiles for each row execute function update_updated_at();
create trigger update_companies_timestamp before update on public.companies for each row execute function update_updated_at();
create trigger update_jobs_timestamp before update on public.jobs for each row execute function update_updated_at();
create trigger update_applications_timestamp before update on public.applications for each row execute function update_updated_at();
