# ChangLek — Project Conventions

> Auto-loaded into every Claude Code session in this directory. Read this before making changes.

ChangLek is a learning platform for Thai kids ages 7–13. Solo junior developer, bootstrap budget. The full plan lives in [`master-plan.md`](master-plan.md).

---

## Tech stack (locked in)

- **Framework**: Next.js 16 (App Router) + TypeScript + Tailwind v4
- **DB**: PostgreSQL on Supabase
- **ORM**: Drizzle (`src/db/schema.ts` is the single source of truth)
- **Auth**: Supabase Auth via `@supabase/ssr` (NOT NextAuth, not custom)
- **API style**: REST via Next.js route handlers (`src/app/api/.../route.ts`) + Zod validation. **No tRPC, no GraphQL.**
- **Styling**: Inline styles + design-system CSS variables from `src/app/globals.css`. Tailwind is available but rarely used — the design tokens (`--coral-500`, `--type-h2`, etc.) cover most cases.
- **Icons**: `lucide-react` (NOT the CDN `<i data-lucide="...">` pattern).
- **Fonts**: `next/font/google` for Baloo 2 / Nunito / Noto Sans Thai Looped / JetBrains Mono. Knewave is local at `/public/fonts/`.
- **PIN hashing**: `bcryptjs`.
- **Env loading**: `.env.local` (loaded explicitly via `dotenv` in `drizzle.config.ts`; loaded automatically by Next.js).

---

## Project structure (strict — follow exactly)

### Route groups vs plain folders

| Pattern | When to use | Example |
| --- | --- | --- |
| `(group)/` | You want to omit the segment from the URL (canonical Next.js use) | `(auth)/login/page.tsx` → `/login` |
| Plain `folder/` | The folder name IS the URL prefix | `parent/page.tsx` → `/parent` |

**Rules of thumb:**
- The kid app uses `(kid)` because we want kid routes at `/`, `/lessons`, `/me` — no prefix.
- Parent and admin use plain `parent/` and `admin/` because their URL prefix matches the folder.
- Auth-adjacent flows (login, signup, select-profile) all live in `(auth)` so they share the gradient layout without `/auth/...` URLs.

### Private `_components` folders (colocation)

- Components specific to a route segment go in `_components/` next to the pages that use them.
- Examples: `(kid)/_components/`, `(auth)/_components/`, `(auth)/select-profile/[id]/_components/`.
- Truly cross-cutting code goes in `src/lib/` (helpers) or could go in a top-level `src/components/` (UI primitives — currently empty, no shadcn yet).
- **Never** create generic component folders if they're only used by one section.

### Layouts

- Each section has its own `layout.tsx` to provide its UI shell.
- `src/app/layout.tsx` — root, just `<html>` + `<body>` + `next/font` variables.
- `(auth)/layout.tsx` — coral-gradient full-screen, centers children.
- `(kid)/layout.tsx` — fetches the current profile (server component), redirects if missing/wrong type, renders the `SideNav`.
- `parent/layout.tsx`, `admin/layout.tsx` — placeholder shells for now.

### Server actions

- One `actions.ts` per route group at the group's root. Currently `(auth)/actions.ts`.
- Server actions are imported by both server and client components — they always run server-side.
- For actions used with `useActionState`, signature is `(prev, formData)`. For direct form actions, signature is `(formData)`. **Don't try to share one function for both** — split into two (e.g., `selectProfileDirect` vs `selectProfileWithPin`).

### Database

- Schema in `src/db/schema.ts`. Always update this file first, then run `npm run db:push` (or generate + migrate for proper history).
- All data queries go through Drizzle (`src/db/index.ts` exports `db`). Never query via `supabase.from(...)` — that's only for `supabase.auth.*`.
- Migrations live in `drizzle/`. Reset script at `scripts/reset-db.ts` (use only when there's no data).

### Proxy (formerly middleware)

- Next.js 16 deprecated `middleware.ts` in favor of `proxy.ts`. We use `src/proxy.ts`.
- The proxy refreshes Supabase sessions and enforces the redirect chain: not-logged-in → `/login`; logged-in-no-profile → `/select-profile`; logged-in-with-profile → through to the requested route.

---

## Auth / profile model (Netflix-style)

Read this before touching anything in `(auth)/` or `lib/profiles.ts`:

- **One family = one auth account.** `users` table has email/password (Supabase Auth) and a single `role` (currently always `parent`; admins are seeded manually).
- **Profiles, not user accounts, are what kids see.** Each `profiles` row is a selectable avatar tied to a parent's `userId`. Type is `parent` or `kid`.
- **PINs are optional and bcrypt-hashed.** Parent profile gets a PIN at signup. Kid profiles can have one or not.
- **Selected profile lives in a cookie** (`selected_profile_id`). Helpers in `src/lib/profiles.ts`: `getCurrentProfile`, `getProfilesForCurrentUser`, `setSelectedProfile`, `clearSelectedProfile`.
- All foreign keys reference `profiles.id` (not `users.id`) for kid-specific data: `skill_mastery.profile_id`, `exercise_attempts.profile_id`, `profile_badges.profile_id`, `streaks.profile_id`.

---

## Code style

- **No comments by default.** Only add when the WHY is non-obvious (hidden constraint, surprising behavior, workaround for a bug). Don't explain what the code does — names should do that.
- **No file longer than ~300 lines.** Split before that.
- **Inline styles match the design 1:1.** Don't refactor to Tailwind without a reason — the design tokens cover everything.
- **Zod for all data validation.** Same schema validates form, API, and DB inserts where possible. (Not yet wired in — Phase 1.)
- **Conventional commits**: `feat:`, `fix:`, `docs:`, `refactor:`, `chore:`.

---

## Common commands

```bash
npm run dev              # Next.js dev server (port 3000)
npm run build            # Production build
npm run lint             # ESLint
npm run db:generate      # Generate migration from schema
npm run db:push          # Sync schema to Supabase (no migration file)
npm run db:migrate       # Apply pending migrations
npm run db:studio        # Open Drizzle Studio at https://local.drizzle.studio
```

---

## What NOT to do

- ❌ Don't put `parent/` or `admin/` inside a `(parent)` / `(admin)` route group — those segments ARE their URL prefix.
- ❌ Don't put kid-specific components in `src/components/` — colocate via `(kid)/_components/`.
- ❌ Don't query DB via `supabase.from(...)` — use Drizzle. The Supabase client is only for auth.
- ❌ Don't store plaintext PINs or passwords. PINs are bcrypt-hashed; passwords are managed by Supabase Auth.
- ❌ Don't add tRPC, GraphQL, or alternative state managers. We picked REST + Zod intentionally.
- ❌ Don't create `middleware.ts` in Next.js 16 — use `proxy.ts`.
- ❌ Don't bypass the design system. Use CSS variables (`var(--coral-500)`, `var(--type-h2)`, etc.) before reaching for hex codes or Tailwind classes.
- ❌ Don't disable RLS on Supabase tables. We enabled it for defense-in-depth even though Drizzle bypasses it.

---

## Design system reference

All tokens live in [`src/app/globals.css`](src/app/globals.css). Key patterns:

- **Colors**: `--coral-50..900` (primary), `--sky-50..700` (accent), `--cream-50..200` (surfaces), `--ink-50..900` (neutrals), `--celebrate-*` (decorative only).
- **Type**: `font: var(--type-h1|h2|h3|h4|lead|body|body-sm|label|caption|button)`.
- **Radii**: `--r-sm|md|lg|xl|2xl|pill`.
- **Shadows**: `--shadow-sm|md|lg|xl`, `--inner-highlight`.
- **Buttons**: `.cl-btn`, `.cl-btn--secondary`, `.cl-btn--accent`, `.cl-btn--ghost`, plus `--lg`/`--sm` size modifiers.
- **Cards**: `.cl-card`, `.cl-card--interactive`.
- **Chips**: `.cl-chip`, `.cl-chip--coral|sky|amber|success`.
- **Icon tiles**: `.cl-icon-tile`, `.cl-icon-tile--sky|amber|success|lg`.

Avatar presets (icon + color) are in [`src/lib/avatars.ts`](src/lib/avatars.ts) — add new options there, no schema migration needed.
