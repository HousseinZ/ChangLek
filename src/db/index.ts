import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL environment variable is not set");
}

// Create a single Postgres connection for the app
// In serverless environments (Vercel), use connection pooling (e.g., PgBouncer)
const client = postgres(databaseUrl, {
  // Use prepared statements for security
  prepare: true,
});

export const db = drizzle(client, { schema });

export type Database = typeof db;
