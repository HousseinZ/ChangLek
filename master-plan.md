# Thai Kids English Learning Center — Master Plan

> A learning platform for Thai children ages 7–13 with adaptive learning paths, gamification, and an admin-friendly content system.

---

## 1. Project Constraints (your reality)

These shape every decision below. If something here changes, the plan needs to be revisited.

- **Solo junior developer** — boring, well-documented tech wins over clever architecture
- **Bootstrap budget (<$200/month)** — pick services with generous free tiers
- **50–150 students target**, with future scaling possible
- **Devices**: Computer/laptop primary (no mobile-first headaches)
- **Languages**: Thai for parents, English for kids (immersion)
- **Free service for now** — no payment integration needed in MVP
- **Curriculum**: Thai MoE English curriculum (skills hierarchy is pre-defined)
- **Staff**: Tech-comfortable (can handle a real CMS, not just spreadsheets)

---

## 2. The Big Picture (what you're actually building)

Three connected systems, in priority order:

1. **The Kid Experience** — login, see a personalized learning path, do exercises, earn rewards, level up
2. **The Parent Dashboard** — see child's progress, time spent, strengths/weaknesses
3. **The Admin/Content System** — staff create lessons and exercises without touching code

Plus invisible plumbing:
- An **adaptive engine** that decides what exercise to show next based on the kid's mastery
- An **exercise template system** so staff produce content from existing types instead of inventing new UI

---

## 3. Recommended Tech Stack

I'm recommending a stack that maximizes "things you can google when stuck" and minimizes moving parts. Every choice has a reason.

### Frontend: **Next.js 15 (App Router) + TypeScript + Tailwind CSS + shadcn/ui**

- **Next.js**: One framework for both kid app and parent dashboard. Massive community. Vercel hosts it for free up to your scale.
- **TypeScript**: Catches bugs before runtime. Crucial when you're solo and adding new devs later — types are documentation.
- **Tailwind**: Style without thinking about CSS file organization. Junior-dev friendly.
- **shadcn/ui**: Pre-built accessible components you copy into your repo (buttons, dialogs, forms). Not a dependency, just code you own.

### Backend: **Next.js API routes (REST)**

- Keep frontend and backend in the same repo (a "monorepo" but simpler — just one Next.js app)
- Plain REST endpoints under `src/app/api/` — easiest mental model, no extra abstractions, easy to debug with curl/Postman
- Pair with **Zod schemas** shared between client and server for validation + inferred types — that gets you most of the type-safety benefit without a new framework
- Standardize on consistent response shapes (`{ data, error }`) and HTTP status codes from day 1

### Database: **PostgreSQL via Supabase** (free tier)

- Supabase = managed Postgres + auth + file storage + realtime, all free up to 500MB DB and 1GB files
- Postgres is bulletproof, well-known, and scales far beyond 150 students
- **Don't use NoSQL** (Mongo, Firestore) for this — your data is relational (users, lessons, exercises, attempts, mastery scores) and SQL queries make adaptive logic far easier

### Auth: **Supabase Auth** (built into Supabase)

- Email/password + Google OAuth out of the box
- Separate roles: `kid`, `parent`, `teacher`, `admin`
- Free, secure, handles password resets and email verification for you

### ORM: **Drizzle**

- Schema defined in TypeScript (`src/db/schema.ts`) — no separate DSL to learn, types flow naturally
- SQL-like query builder: what you write is close to what runs, easy to reason about and easy to drop into raw SQL when you need to
- Lightweight, fast, no generated client step — `drizzle-kit` handles migrations
- Great fit for Postgres + serverless (Vercel) — small bundle, no engine binary like Prisma
- Pairs cleanly with Zod via `drizzle-zod` to derive validation schemas from your tables

### Content Management: **Build it inside the admin panel** (not Strapi/Contentful)

I considered recommending Strapi or a headless CMS, but for your case it's overkill and adds complexity. Build a simple admin UI inside your Next.js app where staff create lessons and exercises through forms. This way:
- One codebase, one deployment
- Full control over the editor UX (matters for non-standard exercises like drag-and-drop)
- Staff log into the same site as everyone else

### File storage: **Supabase Storage** (for audio files, images)

- Already included with Supabase, free tier covers your needs

### Audio (for listening exercises): **Browser TTS + uploaded MP3s**

- For MVP: staff upload pre-recorded MP3s for listening exercises (best quality)
- Browser's built-in `SpeechSynthesis` API for cheap TTS where audio quality matters less
- Phase 2: integrate ElevenLabs or Google TTS for AI voices

### Speech recognition (for speaking exercises): **Browser Web Speech API**

- Free, built into Chrome/Edge
- Phase 2: upgrade to OpenAI Whisper or Google Speech-to-Text for better accuracy
- This is the riskiest exercise type — recommend launching without speaking exercises in MVP and adding in Phase 2

### Hosting: **Vercel** (frontend + API) + **Supabase** (DB + storage)

- Vercel free tier handles your scale
- Both have great Thai latency (Singapore region)
- Total monthly cost at MVP: **$0**

### Monitoring & errors: **Sentry** (free tier) + **Vercel Analytics** (free)

- Sentry catches crashes you'd otherwise never see
- Set this up Day 1 — when a parent reports "it's broken" you'll have the actual error

### Total monthly cost at launch: **$0–$25**

The only thing that might push cost up is if you add AI speaking feedback (Whisper API ~$0.006/minute) or AI-generated videos in Phase 2.

---

## 4. The Adaptive Learning Engine (how it actually works)

Forget machine learning for now — you don't have the data and it's overkill at 150 students. Use a proven approach called **Mastery-Based Progression with Spaced Repetition**:

### Core concepts

1. **Skills** — atomic units like "present simple tense", "vocabulary: animals", "phonics: /sh/ sound". Tied to Thai MoE curriculum strands.
2. **Mastery score** per kid per skill (0.0 to 1.0)
3. **Skill graph** — prerequisite relationships (must master "letters" before "phonics", etc.)
4. **Each exercise tagged with skills it tests** (one exercise can test multiple skills)

### How it picks the next exercise

```
1. Find skills the kid is currently "working on" (mastery 0.3–0.8)
2. Among those, pick the one with the lowest mastery
3. Pick an exercise that tests that skill at the kid's current difficulty
4. Sprinkle in spaced-repetition reviews of previously mastered skills (10–20% of exercises)
```

### How mastery updates

After each exercise attempt:
- **Correct** → mastery += `learning_rate * (1 - current_mastery)` (diminishing returns)
- **Incorrect** → mastery -= `forgetting_rate * current_mastery`
- **Time taken** factors in (too slow = lower confidence boost)

This is not ML, it's just math — but it works well and is easy to explain to parents and teachers. You can swap in a real model later if you ever scale up.

### Why this beats grade-level paths

A 9-year-old strong at vocabulary but weak at grammar gets vocabulary at Grade 5 level and grammar at Grade 3 level — no shame, just the right level. This is exactly your "tailored to the kid" goal.

---

## 5. The Exercise Template System

This is the heart of the staff-friendly content system. The principle: **exercise types are coded once, content is data**.

### How it works

Each exercise type has:
- A **schema** (what fields the content needs)
- A **renderer** (how it displays to the kid)
- A **grader** (how to check the answer)

Staff fill in a form for the schema → the platform stores it as JSON → the renderer displays it.

### Example schema for "Multiple Choice":

```json
{
  "type": "multiple_choice",
  "question": "What color is the apple?",
  "options": ["Red", "Blue", "Green", "Yellow"],
  "correct_index": 0,
  "image_url": "apple.jpg",
  "skills": ["vocabulary_colors", "vocabulary_food"],
  "difficulty": 2
}
```

Staff create new questions through a form. They never touch code. Adding a 100th multiple choice question takes 30 seconds.

### Your 10 exercise types (priority order for building)

**Phase 1 — MVP (build first, simplest):**
1. **Multiple choice** — easiest, do this first as your template/template
2. **Fill-in-the-blank** — text input, exact match grading
3. **Matching pairs** — click pairs to match
4. **Picture-to-word** — show image, type or pick word
5. **Reading comprehension** — passage + multiple choice questions

**Phase 2 — interactive:**
6. **Drag-and-drop / sorting** — needs a drag library (use `dnd-kit`)
7. **Sentence building** — drag words into order
8. **Word/vocabulary games** — like a simple matching memory game
9. **Listening** — staff upload MP3, then a multiple choice / fill-in question

**Phase 3 — risky/expensive:**
10. **Speaking with AI feedback** — Web Speech API for free version, Whisper API for accuracy (~$5–15/mo at your scale)

I strongly suggest launching MVP with types 1–5 only. They're enough for real learning, and you'll learn what staff actually need before building the harder ones.

---

## 6. Database Schema (high-level)

Don't memorize this — you'll define it in `src/db/schema.ts` with Drizzle. But this is the shape:

```
users (id, email, role, name, ...)
  ├── kids (user_id, parent_id, age, grade, avatar, total_xp, ...)
  └── parents (user_id, ...)

skills (id, name_en, name_th, parent_skill_id, curriculum_strand, grade_level)

skill_mastery (kid_id, skill_id, mastery_score, last_practiced_at, attempts)

lessons (id, title, description, skill_ids[], created_by, published)

exercises (id, lesson_id, type, content_json, skill_ids[], difficulty, created_by)
  // content_json stores the per-type schema

exercise_attempts (id, kid_id, exercise_id, is_correct, time_taken_ms, attempt_data, created_at)

badges (id, name, description, icon, criteria_json)

kid_badges (kid_id, badge_id, earned_at)

streaks (kid_id, current_days, longest_days, last_active_date)
```

Notice the design: skills connect to mastery, exercises tag skills, the adaptive engine reads mastery to pick exercises. Clean and scalable.

---

## 7. Gamification System

Designed for ages 7–13 — should feel rewarding without becoming addictive (parents will resent you for that).

- **XP** for every exercise completed (more XP for harder/correct/first-try)
- **Levels** based on XP thresholds
- **Badges** for milestones ("First lesson", "10-day streak", "Mastered animals", "Reading champion")
- **Streaks** — daily login streak with a "freeze" so a missed day doesn't kill weeks of progress
- **Avatar customization** — unlock with XP, gives kids a long-term goal

Badge and level criteria stored as JSON so staff can add new ones via the admin panel without code changes.

---

## 8. Project Structure (the codebase)

This is the structure I'd put in place from Day 1. It's optimized for "a new dev can find anything in 10 minutes."

```
thai-kids-english/
├── README.md                  # Setup, deployment, philosophy
├── docs/                      # Long-form docs (architecture, decisions)
│   ├── ARCHITECTURE.md
│   ├── ADAPTIVE_ENGINE.md
│   ├── EXERCISE_TYPES.md
│   └── DEPLOYMENT.md
├── drizzle/                   # Generated SQL migrations (committed)
├── drizzle.config.ts          # Drizzle Kit config
├── src/
│   ├── app/                   # Next.js App Router pages
│   │   ├── (kid)/             # Kid-facing pages, English UI
│   │   ├── (parent)/          # Parent dashboard, Thai UI
│   │   ├── (admin)/           # Staff content tools
│   │   └── api/               # REST API routes (route.ts handlers)
│   ├── db/
│   │   ├── schema.ts          # Drizzle schema (single source of truth)
│   │   └── index.ts           # Drizzle client
│   ├── components/
│   │   ├── ui/                # shadcn primitives (button, dialog, etc.)
│   │   ├── exercises/         # One folder per exercise type
│   │   │   ├── multiple-choice/
│   │   │   │   ├── MultipleChoiceRenderer.tsx
│   │   │   │   ├── MultipleChoiceEditor.tsx  # admin form
│   │   │   │   ├── grader.ts                  # checks answer
│   │   │   │   └── schema.ts                  # zod validation
│   │   │   ├── fill-in-blank/
│   │   │   └── ... (one folder per type)
│   │   └── shared/            # Avatars, badges, progress bars
│   ├── lib/
│   │   ├── adaptive/          # The learning path algorithm
│   │   ├── api/               # Shared REST helpers (response shapes, error handling)
│   │   ├── auth.ts            # Auth helpers
│   │   └── i18n/              # Thai/English translations
│   ├── hooks/                 # React hooks
│   └── types/                 # Shared TypeScript types
├── public/                    # Static assets
└── tests/                     # Tests (start with the adaptive engine)
```

### Code conventions to enforce from day 1

- **Every exercise type is a folder** with the same 4 files (Renderer, Editor, grader, schema). Predictable = scalable.
- **No file longer than ~300 lines** — split it.
- **Zod schemas for all data validation** — same schema validates the form, the API, and the database.
- **Comments explain *why*, not *what*** — code shows what, comments show why.
- **One ESLint + Prettier config**, enforced on commit (use Husky)
- **Conventional commits** (`feat:`, `fix:`, `docs:`) — makes changelogs free

---

## 9. Build Roadmap (phased plan)

### Phase 0 — Foundations (Week 1–2)
- Set up Next.js project, Supabase, Drizzle, deploy to Vercel
- Build auth (kid + parent + admin roles)
- Create base layouts for kid, parent, admin areas
- Set up CI (linting, type checks on every commit)
- **Deliverable: empty site you can log into in 3 roles**

### Phase 1 — Core MVP (Week 3–6)
- Database schema for skills, lessons, exercises, attempts, mastery
- Build 3 exercise types: multiple choice, fill-in-blank, matching pairs
- Admin: create lessons and exercises through forms
- Kid: linear progression through a lesson (no adaptive engine yet — just pick a lesson and do exercises)
- XP and basic level system
- **Deliverable: kids can do real exercises, staff can create content**

### Phase 2 — Adaptive Engine (Week 7–9)
- Skill mastery tracking
- Adaptive exercise picker
- Replace "pick a lesson" with "next recommended exercise"
- Spaced repetition reviews
- **Deliverable: each kid gets a personalized path**

### Phase 3 — Parent Dashboard + Polish (Week 10–12)
- Parent account linked to kid account(s)
- Progress views (mastery per skill, time spent, recent attempts)
- Email weekly summary
- Badges and streaks
- Avatar customization
- Add exercise types: drag-drop, sentence building, picture-to-word, reading comprehension
- **Deliverable: launchable to first 10–20 students**

### Phase 4 — Listening + Content scale (Week 13–16)
- Listening exercises (audio uploads)
- Content production: get staff to create the first 100+ exercises
- Beta with 20–30 real kids, gather feedback
- **Deliverable: real users using it weekly**

### Phase 5 — Advanced (later)
- Speaking exercises with AI feedback
- AI avatar videos for lesson intros (HeyGen/Synthesia)
- Mobile-responsive polish
- Multi-classroom features for teachers
- Referral / social features

---

## 10. Staying Junior-Dev Friendly (real talk)

Some honest advice for solo-dev success:

1. **Don't optimize prematurely.** At 150 users you don't need Redis, Kubernetes, or microservices. A single Next.js app + Postgres handles 10,000+ users fine.

2. **Write the README as you build.** A future-you (or new dev) reading the README in month 6 will thank you. Update it whenever you change setup steps.

3. **Use Cursor, Claude Code, or GitHub Copilot.** As a solo junior, AI pair programming is a force multiplier. Just don't paste code you don't understand.

4. **Set up error monitoring on Day 1.** Sentry catches bugs your test users won't report.

5. **Test the adaptive engine.** Most of your code can be tested manually, but the math behind mastery scoring needs unit tests — bugs there silently corrupt every kid's data.

6. **Keep one secrets file template** (`.env.example`) so new devs know what env vars they need.

7. **Document architectural decisions** in `docs/decisions/` — Markdown files like `001-why-supabase.md`. When a future dev asks "why this not that", you have an answer.

8. **Don't build the perfect admin panel for staff first.** Build the simplest possible form. Use it yourself for a month. You'll find out what's actually annoying — then improve.

9. **Get one paying / engaged user before scaling content production.** Don't ask staff to create 500 exercises before you know kids actually use it.

10. **Backups.** Supabase has them on free tier but verify. Once you have real student data, losing it is unacceptable.

---

## 11. Key Risks & Mitigations

| Risk | Likelihood | Mitigation |
|---|---|---|
| Adaptive engine has subtle bugs | High | Unit test the math; log every mastery update for audit |
| Staff don't create enough content | High | Start with a content-creation sprint before launch; you create the first 50 exercises yourself |
| Speaking exercises frustrate kids (recognition errors) | High | Postpone to Phase 5; pilot with small group first |
| Free Supabase tier runs out (DB > 500MB) | Low at first | Audio in Storage, not DB; archive old attempts after 6 months |
| Kid burnout / parents complain about screen time | Medium | Daily session caps, age-appropriate XP curves, weekly parent emails |
| Browser TTS sounds robotic in English to Thai kids | Medium | Use real audio uploads in MVP; add ElevenLabs in Phase 2 |
| Solo dev burnout | High | Phased plan, no perfectionism, ship ugly things |

---

## 12. Definition of Done for MVP

You can launch when:
- [ ] Kid can sign up, take a placement quiz, and see a learning path
- [ ] At least 5 exercise types working
- [ ] At least 100 exercises created across the curriculum
- [ ] Adaptive engine adjusts difficulty based on performance
- [ ] Parent can see child's progress and skills mastered
- [ ] Admin can create new exercises through forms (no code)
- [ ] XP, levels, badges, and streaks working
- [ ] Daily backups confirmed working
- [ ] Sentry catching errors
- [ ] You've onboarded 5 friendly testers (kids + parents) and fixed the issues they found

---

## 13. What I'd Skip (and why)

- **Mobile app** — web works fine on a laptop, browsers handle Chromebooks great. Build native only when 10,000+ users justify it.
- **Microservices** — single Next.js app is fine until 10k+ users.
- **GraphQL / tRPC** — plain REST + shared Zod schemas covers your needs with the smallest mental footprint; revisit only if you outgrow it.
- **Custom video generation** — too expensive, too unreliable, not core to learning. Add talking-head AI avatars in Phase 5 if needed.
- **Real-time multiplayer** — fun idea, big complexity. Maybe Phase 6+.
- **Internal classroom/school management features** — solve student-first first.

---

## Final Note

This plan is a starting point, not a contract. Ship Phase 1, watch real kids use it, then adjust. The adaptive engine in particular will need tuning based on real data — the math I described is a reasonable starting point, not the final answer.

Good luck. The most important thing isn't the architecture, it's that you ship something kids actually use.
