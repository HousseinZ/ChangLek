import { config } from "dotenv";
import path from "path";
import postgres from "postgres";

config({ path: path.resolve(process.cwd(), ".env.local") });

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) throw new Error("DATABASE_URL not set");

const sql = postgres(databaseUrl);

async function main() {
  console.log("Dropping all public tables and enums...");
  await sql.unsafe(`
    DROP TABLE IF EXISTS public.streaks            CASCADE;
    DROP TABLE IF EXISTS public.kid_badges         CASCADE;
    DROP TABLE IF EXISTS public.profile_badges     CASCADE;
    DROP TABLE IF EXISTS public.badges             CASCADE;
    DROP TABLE IF EXISTS public.exercise_attempts  CASCADE;
    DROP TABLE IF EXISTS public.exercises          CASCADE;
    DROP TABLE IF EXISTS public.lessons            CASCADE;
    DROP TABLE IF EXISTS public.skill_mastery      CASCADE;
    DROP TABLE IF EXISTS public.skills             CASCADE;
    DROP TABLE IF EXISTS public.kids               CASCADE;
    DROP TABLE IF EXISTS public.parents            CASCADE;
    DROP TABLE IF EXISTS public.profiles           CASCADE;
    DROP TABLE IF EXISTS public.users              CASCADE;
    DROP TYPE  IF EXISTS public.user_role          CASCADE;
    DROP TYPE  IF EXISTS public.profile_type       CASCADE;
    DROP TYPE  IF EXISTS public.exercise_type      CASCADE;
  `);
  console.log("Done.");
  await sql.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
