import Link from "next/link";
import { Plus } from "lucide-react";
import { logout, selectProfileDirect } from "../actions";
import { AuthCard } from "../_components/AuthCard";
import { Avatar } from "../_components/Avatar";
import { getProfilesForCurrentUser } from "@/lib/profiles";

export default async function SelectProfilePage() {
  const list = await getProfilesForCurrentUser();

  // Logged in but no rows in `profiles` for this user — typically an
  // orphaned auth account from a schema reset. Render a fallback that
  // signs the user out cleanly (server action; can write cookies).
  if (list.length === 0) {
    return (
      <AuthCard>
        <div style={{ display: "flex", flexDirection: "column", gap: 14, textAlign: "center" }}>
          <h2 style={{ margin: 0, font: "var(--type-h2)", color: "var(--ink-900)" }}>No profiles found</h2>
          <p style={{ margin: 0, color: "var(--fg-2)" }}>
            Your account exists but has no profile. This usually happens after a schema reset.
            Sign out and create a fresh account.
          </p>
          <form action={logout}>
            <button type="submit" className="cl-btn cl-btn--lg" style={{ width: "100%" }}>
              Sign out and start over
            </button>
          </form>
        </div>
      </AuthCard>
    );
  }

  return (
    <div style={{
      width: "100%",
      maxWidth: 720,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 32,
    }}>
      <div style={{ textAlign: "center" }}>
        <h1 style={{ margin: 0, font: "var(--type-h1)", color: "var(--ink-900)" }}>Who&apos;s playing today?</h1>
        <p style={{ margin: "8px 0 0", font: "var(--type-lead)", color: "var(--fg-2)" }}>
          Pick a profile to continue.
        </p>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
        gap: 24,
        width: "100%",
        maxWidth: 600,
      }}>
        {list.map((p) => (
          <ProfileTile key={p.id} profile={p}/>
        ))}

        <Link
          href="/select-profile/new"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
            padding: 12,
            borderRadius: "var(--r-lg)",
            textDecoration: "none",
            transition: "transform 150ms var(--ease-bounce)",
          }}
        >
          <div style={{
            width: 100, height: 100, borderRadius: "50%",
            background: "transparent",
            border: "3px dashed var(--ink-300)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "var(--ink-400)",
          }}>
            <Plus size={48}/>
          </div>
          <div style={{ font: "var(--type-h4)", color: "var(--ink-700)" }}>Add a kid</div>
        </Link>
      </div>
    </div>
  );
}

function ProfileTile({ profile }: { profile: { id: string; name: string; type: "parent" | "kid"; avatarIcon: string; avatarColor: string; pinHash: string | null } }) {
  // PIN-protected → link to entry page. No PIN → submit straight to selectProfile.
  if (profile.pinHash) {
    return (
      <Link
        href={`/select-profile/${profile.id}`}
        style={{
          display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
          padding: 12, borderRadius: "var(--r-lg)", textDecoration: "none",
        }}
      >
        <Avatar icon={profile.avatarIcon} color={profile.avatarColor} size={100}/>
        <div style={{ font: "var(--type-h4)", color: "var(--ink-900)", textAlign: "center" }}>
          {profile.name}
          <div style={{ font: "var(--type-caption)", color: "var(--fg-3)", marginTop: 2 }}>
            🔒 PIN required
          </div>
        </div>
      </Link>
    );
  }

  return (
    <form action={selectProfileDirect} style={{ display: "flex", justifyContent: "center" }}>
      <input type="hidden" name="profileId" value={profile.id}/>
      <button
        type="submit"
        style={{
          display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
          padding: 12, borderRadius: "var(--r-lg)",
          background: "transparent", border: "none", cursor: "pointer",
        }}
      >
        <Avatar icon={profile.avatarIcon} color={profile.avatarColor} size={100}/>
        <div style={{ font: "var(--type-h4)", color: "var(--ink-900)" }}>{profile.name}</div>
      </button>
    </form>
  );
}
