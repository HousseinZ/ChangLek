"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { profiles, users } from "@/db/schema";
import { hashPin, isValidPin, verifyPin } from "@/lib/pin";
import {
  clearSelectedProfile,
  setSelectedProfile,
} from "@/lib/profiles";
import { createClient } from "@/lib/supabase/server";

export type AuthState = { error?: string; success?: string };

/* ============================================================
   Signup — creates a family account + parent profile
   ============================================================ */

export async function signup(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  const pin = String(formData.get("pin") ?? "");
  const avatarIcon = String(formData.get("avatarIcon") ?? "sun");
  const avatarColor = String(formData.get("avatarColor") ?? "#F08A2A");

  if (!email || !password || !name) {
    return { error: "Name, email, and password are required" };
  }
  if (password.length < 8) {
    return { error: "Password must be at least 8 characters" };
  }
  if (!isValidPin(pin)) {
    return { error: "Parent PIN must be exactly 4 digits" };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name, role: "parent" } },
  });

  if (error) return { error: error.message };
  if (!data.user) return { error: "Signup failed — no user returned" };

  try {
    await db.insert(users).values({
      id: data.user.id,
      email,
      name,
      role: "parent",
    });

    const pinHash = await hashPin(pin);
    await db.insert(profiles).values({
      userId: data.user.id,
      type: "parent",
      name,
      avatarIcon,
      avatarColor,
      pinHash,
    });
  } catch (err) {
    return {
      error: `Account created but profile setup failed: ${err instanceof Error ? err.message : "unknown error"}`,
    };
  }

  if (!data.session) {
    return { success: "Check your email to confirm your account, then log in." };
  }

  revalidatePath("/", "layout");
  redirect("/select-profile");
}

/* ============================================================
   Login — email + password → profile picker
   ============================================================ */

export async function login(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: error.message };

  await clearSelectedProfile();
  revalidatePath("/", "layout");
  redirect("/select-profile");
}

/* ============================================================
   Select profile — sets cookie, optionally checks PIN
   ============================================================ */

export type SelectProfileState = { error?: string };

/**
 * Internal: shared logic for picking a profile + redirecting.
 * Returns { error } only when something goes wrong; the happy path redirects.
 */
async function selectProfileCore(profileId: string, pin: string): Promise<SelectProfileState> {
  if (!profileId) return { error: "No profile selected" };

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not logged in" };

  const [profile] = await db
    .select()
    .from(profiles)
    .where(and(eq(profiles.id, profileId), eq(profiles.userId, user.id)))
    .limit(1);

  if (!profile) return { error: "Profile not found" };

  if (profile.pinHash) {
    if (!pin) return { error: "PIN required" };
    const ok = await verifyPin(pin, profile.pinHash);
    if (!ok) return { error: "Incorrect PIN" };
  }

  await setSelectedProfile(profile.id);
  revalidatePath("/", "layout");

  redirect(profile.type === "parent" ? "/parent" : "/");
}

/** Direct form action (PIN-less profile tiles on the picker grid). */
export async function selectProfileDirect(formData: FormData) {
  const profileId = String(formData.get("profileId") ?? "");
  const result = await selectProfileCore(profileId, "");
  // selectProfileCore redirects on success; if we got here, it errored.
  // For PIN-less tiles we expect no error path. If somehow it errors,
  // bounce back to the picker so the user can retry.
  if (result.error) redirect("/select-profile");
}

/** Form action used with useActionState on the PIN entry page. */
export async function selectProfileWithPin(
  _prev: SelectProfileState,
  formData: FormData,
): Promise<SelectProfileState> {
  const profileId = String(formData.get("profileId") ?? "");
  const pin = String(formData.get("pin") ?? "");
  return selectProfileCore(profileId, pin);
}

/* ============================================================
   Create kid profile — only callable by a logged-in parent
   ============================================================ */

export async function createKidProfile(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const name = String(formData.get("name") ?? "").trim();
  const pin = String(formData.get("pin") ?? "");
  const ageRaw = String(formData.get("age") ?? "").trim();
  const avatarIcon = String(formData.get("avatarIcon") ?? "sparkles");
  const avatarColor = String(formData.get("avatarColor") ?? "#6FBE44");

  if (!name) return { error: "Name is required" };
  if (pin && !isValidPin(pin)) return { error: "PIN must be exactly 4 digits (or leave blank for no PIN)" };

  const age = ageRaw ? parseInt(ageRaw, 10) : null;
  if (age !== null && (Number.isNaN(age) || age < 3 || age > 18)) {
    return { error: "Age must be between 3 and 18" };
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not logged in" };

  try {
    const pinHash = pin ? await hashPin(pin) : null;
    await db.insert(profiles).values({
      userId: user.id,
      type: "kid",
      name,
      avatarIcon,
      avatarColor,
      pinHash,
      age,
    });
  } catch (err) {
    return {
      error: `Failed to create profile: ${err instanceof Error ? err.message : "unknown error"}`,
    };
  }

  revalidatePath("/select-profile");
  redirect("/select-profile");
}

/* ============================================================
   Logout
   ============================================================ */

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  await clearSelectedProfile();
  revalidatePath("/", "layout");
  redirect("/login");
}

export async function switchProfile() {
  await clearSelectedProfile();
  revalidatePath("/", "layout");
  redirect("/select-profile");
}
