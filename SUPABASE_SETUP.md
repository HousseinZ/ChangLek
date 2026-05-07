# Supabase + Drizzle Setup Guide

This guide walks you through creating a Supabase project and wiring it into ChangLek.

## Step 1: Create a Supabase Project

1. Go to [https://app.supabase.com](https://app.supabase.com) and sign up (or log in).
2. Click **"New project"**.
3. Fill in:
   - **Project name**: `ChangLek` (or your choice)
   - **Database password**: Generate a strong one (save it temporarily, you won't need it again)
   - **Region**: Choose closest to Thailand (Singapore is ideal, or Asia Pacific if available)
4. Click **"Create new project"**.
5. Wait 1–2 minutes for the DB to provision.

## Step 2: Get Your Database Connection String

1. In Supabase, go to **Settings** (gear icon, bottom left).
2. Click **Database** in the sidebar.
3. Scroll to **Connection string**.
4. Click the **URI** tab (not Pool).
5. Click **Copy** (it'll copy the full PostgreSQL URI).
6. The string looks like: `postgres://postgres:[PASSWORD]@[HOST]:[PORT]/postgres`

## Step 3: Set Environment Variables

1. In your project root, create a file called `.env.local` (git-ignored by default):
   ```
   DATABASE_URL=postgres://postgres:[PASSWORD]@[HOST]:[PORT]/postgres
   ```
2. Replace `[PASSWORD]`, `[HOST]`, `[PORT]` with the values from your Supabase URI.
3. Save and **do not commit** `.env.local` to git.

## Step 4: Generate & Run Migrations

Now Drizzle will create the database schema.

```bash
npm run db:generate
```

This reads `src/db/schema.ts` and generates a migration file in `drizzle/` (SQL files). Review it to make sure it looks right.

Then:

```bash
npm run db:push
```

This applies the migration to your Supabase database. You should see:
```
✓ Migrated [name]
✓ Done
```

## Step 5: Verify the Database

Visit Supabase → **SQL Editor** (in the sidebar) and run:
```sql
SELECT * FROM information_schema.tables WHERE table_schema = 'public';
```

You should see all your tables: `users`, `kids`, `skills`, `lessons`, `exercises`, `exercise_attempts`, `badges`, `kid_badges`, `streaks`.

## Step 6: (Optional) Use Drizzle Studio for Visual Browsing

```bash
npm run db:studio
```

This opens a web UI where you can browse tables and add test data visually. Press `Ctrl+C` to stop.

## What's Next

### Phase 0 (now)
- Database is wired. Environment is set.
- You can now start building API routes that talk to the DB.

### Phase 1 (content)
- Build the admin panel (`src/app/admin/`) to let staff create lessons and exercises.
- Build API routes (`src/app/api/`) to fetch exercises, record attempts, update mastery.
- Integrate Supabase Auth for kid/parent login (or use a stub auth for MVP testing).

### Phase 2 (adaptive engine)
- Wire up the adaptive learning algorithm in `src/lib/adaptive/`.
- API route `/api/lessons/next-exercise` picks the kid's next exercise based on mastery.

## Troubleshooting

**"DATABASE_URL is not set"**
- Make sure `.env.local` exists and has the full URI.
- Restart `npm run dev` after adding `.env.local`.

**"Connection refused"**
- Verify the host/port in your URI are correct.
- Check that Supabase project is still active (sometimes they pause after inactivity).
- Ensure your IP is whitelisted (Supabase free tier allows all IPs by default).

**"Table already exists"**
- If you re-run migrations, Drizzle skips tables that already exist.
- To reset: go to Supabase SQL Editor and run `DROP TABLE IF EXISTS table_name CASCADE;` for each table.
  Or delete the entire project and start fresh (free tier).

## More Resources

- [Drizzle Docs](https://orm.drizzle.team)
- [Supabase Docs](https://supabase.com/docs)
- [Postgres Docs](https://www.postgresql.org/docs/)
