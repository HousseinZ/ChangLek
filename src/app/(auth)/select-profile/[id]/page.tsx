import Link from "next/link";
import { notFound } from "next/navigation";
import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { profiles } from "@/db/schema";
import { createClient } from "@/lib/supabase/server";
import { Avatar } from "../../_components/Avatar";
import { AuthCard } from "../../_components/AuthCard";
import { PinEntryForm } from "./_components/PinEntryForm";

export default async function PinEntryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) notFound();

  const [profile] = await db
    .select()
    .from(profiles)
    .where(and(eq(profiles.id, id), eq(profiles.userId, user.id)))
    .limit(1);

  if (!profile) notFound();

  return (
    <AuthCard showLogo={false}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
        <Avatar icon={profile.avatarIcon} color={profile.avatarColor} size={96}/>
        <div style={{ textAlign: "center" }}>
          <div style={{ font: "var(--type-h2)", color: "var(--ink-900)" }}>{profile.name}</div>
          <div style={{ font: "var(--type-body)", color: "var(--fg-2)" }}>Enter PIN to continue</div>
        </div>

        <PinEntryForm profileId={profile.id}/>

        <Link href="/select-profile" style={{ font: "var(--type-body-sm)", color: "var(--fg-2)" }}>
          ← Back to profiles
        </Link>
      </div>
    </AuthCard>
  );
}
