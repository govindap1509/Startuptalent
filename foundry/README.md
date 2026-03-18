# FoundryIN — Where Startup Careers Are Built

> AI-matched roles at India's most ambitious startups. Salary and equity shown upfront. No recruiter games.

**🚀 Live App → [https://your-vercel-url.vercel.app](https://your-vercel-url.vercel.app)**
*(Replace this link with your actual Vercel deployment URL)*

---

## What is Foundry?

Foundry is a full-stack startup talent marketplace built specifically for the Indian startup ecosystem. It connects ambitious professionals with high-growth startups — with an AI engine that ranks candidates against roles based on real skill overlap.

The platform has two sides:

| For Talent | For Startups |
|---|---|
| Browse 3,200+ live roles | Post roles and manage a hiring pipeline |
| Get AI match scores against every job | AI-ranked applicants — no manual sifting |
| See salary and equity on every listing | Direct message candidates |
| Apply in one click | Manage your company profile |
| Track applications through the pipeline | Real-time notifications via email |

---

## Why We Built It

The Indian startup hiring market is broken in three specific ways:

1. **No salary transparency.** Candidates waste weeks in processes only to discover the budget doesn't match — Foundry shows salary and equity ranges on every single listing.

2. **Recruiters as middlemen.** Startups pay ₹3–5L per hire to agencies that just spray CVs. Foundry connects founders and hiring managers directly with pre-scored talent.

3. **Generic job boards.** LinkedIn and Naukri are built for corporates. Foundry is built for the startup context — stage, equity, pace, and culture signals are first-class data.

---

## How It Works

### Architecture

```
foundry/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx            # Landing page (marketing)
│   │   ├── auth/               # Unified auth flow (talent + startup)
│   │   ├── roles/              # Browse jobs with AI match + filters
│   │   ├── talent/dashboard/   # Talent: discover, apply, message, profile
│   │   ├── startup/portal/     # Startup: post roles, manage applicants
│   │   ├── profile/setup/      # 7-step AI-assisted profile builder
│   │   ├── u/[username]/       # Public talent profile page
│   │   ├── c/[slug]/           # Public company profile page
│   │   └── api/
│   │       ├── match/          # AI match scoring endpoint
│   │       ├── apply/          # Job application endpoint
│   │       └── notify/         # Email notification endpoint
│   └── lib/
│       └── supabase/           # Supabase client (browser + server + middleware)
└── supabase/
    ├── schema.sql              # Full DB schema with RLS policies
    └── seed.sql                # Seed data
```

### Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| UI | React 19 — fully custom CSS, no component library |
| Font | DM Sans (Google Fonts) |
| Auth | Supabase Auth (email/password + SSR session handling) |
| Database | Supabase (PostgreSQL) with Row Level Security |
| Email | Resend API |
| Deployment | Vercel |

### Database Schema

Seven core tables power the platform:

- **`talent_profiles`** — profile data, skills array, target roles, salary expectations, CV URL, AI profile score
- **`companies`** — startup profile, logo, stage, sector, team, perks, investors, press
- **`jobs`** — role listings with skills array, salary range, equity, responsibilities, requirements
- **`applications`** — links talent ↔ job, tracks status through the hiring pipeline
- **`messages`** — threaded direct messaging between talent and startup users
- **`follows`** — talent following companies for updates
- **`saved_jobs`** — talent bookmarking jobs

All tables have Row Level Security (RLS) enabled. Public read is permitted for jobs, companies, and talent profiles. Writes are locked to the owning user.

### AI Match Scoring (`/api/match`)

The match engine computes a score (0–99) for any talent ↔ job pair:

1. Fetch the talent's `skills[]` from their profile
2. Fetch the job's `skills[]` requirement list
3. Compute **exact matches** (case-insensitive) and **partial matches** (substring overlap)
4. Score formula: `min(99, round((matched + partial×0.5) / totalRequired × 100 × 0.8 + 20))`
5. Returns `match_score`, `matched_skills`, `partial_skills`, and `missing_skills`

This score is surfaced on every job card, in the talent dashboard, and in the startup's applicant ranking view.

### Key User Flows

**Talent onboarding:**
1. Sign up → choose role (talent / startup)
2. Upload CV → AI extracts experience, skills, education (7-step profile builder)
3. Profile scored out of 100 (CV, experience, skills, education, photo)
4. Immediately shown AI-ranked job matches

**Job application:**
1. Browse roles page (`/roles`) — filter by type, location, stage, salary
2. Click a role → expanded detail panel with responsibilities, requirements, perks
3. "Apply now" modal → one-click submit (note + availability optional)
4. Application tracked: Applied → Seen → In Review → Interview → Offer

**Startup hiring:**
1. Sign up → create company profile (logo, stage, sector, about, values, perks, team)
2. Post roles with full detail (salary range, equity, skills, responsibilities)
3. Startup portal shows AI-ranked applicant list per role with match scores
4. Direct message candidates; status updates trigger email notifications via Resend

### Email Notifications (`/api/notify`)

Three notification types powered by the Resend API:

| Type | Trigger | Recipient |
|---|---|---|
| `application_received` | Candidate applies | Startup hiring manager |
| `application_status` | Status advances in pipeline | Talent |
| `new_message` | Direct message sent | Receiver |

---

## Getting Started

### Prerequisites

- Node.js 20+
- A [Supabase](https://supabase.com) project
- A [Resend](https://resend.com) account (optional — notifications log to console without it)

### 1. Clone & install

```bash
git clone https://github.com/your-username/foundry.git
cd foundry
npm install
```

### 2. Set up environment variables

Create a `.env.local` file in the `foundry/` directory:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
RESEND_API_KEY=re_your_resend_api_key         # optional
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 3. Set up the database

Run the schema in your Supabase SQL editor:

```bash
# Copy the contents of supabase/schema.sql into the Supabase SQL editor and run it
# Optionally run supabase/seed.sql to populate sample data
```

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 5. Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

Add the same environment variables in your Vercel project settings under **Settings → Environment Variables**.

---

## Pages Reference

| Route | Description |
|---|---|
| `/` | Marketing landing page |
| `/auth` | Sign up / sign in (talent and startup flows) |
| `/roles` | Browse all live job listings with AI match |
| `/talent/dashboard` | Authenticated talent: discover, apply, track, message |
| `/startup/portal` | Authenticated startup: manage roles, applicants, messages |
| `/profile/setup` | 7-step profile builder with AI CV extraction |
| `/u/[username]` | Public talent profile |
| `/c/[slug]` | Public company profile with open roles |

---

## API Reference

| Endpoint | Method | Description |
|---|---|---|
| `/api/match` | `POST` | Compute AI match score for a talent ↔ job pair |
| `/api/apply` | `POST` | Submit a job application |
| `/api/notify` | `POST` | Send a transactional email notification |

---

## Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push and open a pull request

---

## License

MIT — see [LICENSE](LICENSE) for details.
