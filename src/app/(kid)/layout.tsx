import { redirect } from "next/navigation";
import { SideNav } from "./_components/SideNav";
import { getCurrentProfile } from "@/lib/profiles";

export default async function KidLayout({ children }: { children: React.ReactNode }) {
  const profile = await getCurrentProfile();
  if (!profile) redirect("/select-profile");
  if (profile.type !== "kid") redirect("/parent");

  return (
    <div style={{ display: "flex", height: "100vh", background: "var(--cream-50)" }}>
      <SideNav profile={profile}/>
      {children}
    </div>
  );
}
