import { redirect } from "next/navigation";
import { logout, switchProfile } from "@/app/(auth)/actions";
import { Avatar } from "@/app/(auth)/_components/Avatar";
import { getCurrentProfile } from "@/lib/profiles";

export default async function ParentDashboardPage() {
  const profile = await getCurrentProfile();
  if (!profile) redirect("/select-profile");
  if (profile.type !== "parent") redirect("/");

  return (
    <div style={{ padding: 40, maxWidth: 960, margin: "0 auto" }}>
      <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Avatar icon={profile.avatarIcon} color={profile.avatarColor} size={64}/>
          <div>
            <div style={{ font: "var(--type-caption)", color: "var(--fg-3)" }}>PARENT</div>
            <h1 style={{ margin: 0, font: "var(--type-h1)", color: "var(--ink-900)" }}>{profile.name}</h1>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <form action={switchProfile}>
            <button type="submit" className="cl-btn cl-btn--secondary">Switch profile</button>
          </form>
          <form action={logout}>
            <button type="submit" className="cl-btn cl-btn--ghost">Log out</button>
          </form>
        </div>
      </header>

      <div className="cl-card" style={{ padding: 32 }}>
        <h2 style={{ margin: 0, font: "var(--type-h2)", color: "var(--ink-900)" }}>Parent dashboard</h2>
        <p style={{ margin: "8px 0 0", color: "var(--fg-2)" }}>
          Progress charts, weekly summaries, and kid management arrive in Phase 3.
        </p>
      </div>
    </div>
  );
}
