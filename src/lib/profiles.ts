import { cookies } from "next/headers";
import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { profiles, users } from "@/db/schema";
import { createClient } from "@/lib/supabase/server";

const COOKIE_NAME = "selected_profile_id";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export type ProfileWithUser = typeof profiles.$inferSelect & {
  userEmail: string;
};

/**
 * Returns the currently-selected profile for the logged-in user, or null.
 * Verifies the cookie's profileId actually belongs to this user (defense
 * against tampered cookies).
 */
export async function getCurrentProfile() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const cookieStore = await cookies();
  const profileId = cookieStore.get(COOKIE_NAME)?.value;
  if (!profileId) return null;

  const [profile] = await db
    .select()
    .from(profiles)
    .where(and(eq(profiles.id, profileId), eq(profiles.userId, user.id)))
    .limit(1);

  return profile ?? null;
}

/**
 * Returns all profiles owned by the logged-in user (or empty array).
 */
export async function getProfilesForCurrentUser() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  return db.select().from(profiles).where(eq(profiles.userId, user.id));
}

/**
 * Returns the user row from public.users for the logged-in auth user.
 */
export async function getCurrentUserRow() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const [row] = await db.select().from(users).where(eq(users.id, user.id)).limit(1);
  return row ?? null;
}

export async function setSelectedProfile(profileId: string) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, profileId, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  });
}

export async function clearSelectedProfile() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export function hasSelectedProfileCookie(cookieValue: string | undefined): boolean {
  return typeof cookieValue === "string" && cookieValue.length > 0;
}
