"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeftRight, BookOpen, Gamepad2, Home, LogOut, UserRound, type LucideIcon } from "lucide-react";
import { logout, switchProfile } from "@/app/(auth)/actions";
import { Avatar } from "@/app/(auth)/_components/Avatar";

type NavItem = { href: string; icon: LucideIcon; label: string; match: (p: string) => boolean };

const items: NavItem[] = [
  { href: "/",        icon: Home,       label: "Home",    match: (p) => p === "/" },
  { href: "/lessons", icon: BookOpen,   label: "Lessons", match: (p) => p.startsWith("/lessons") },
  { href: "/play",    icon: Gamepad2,   label: "Play",    match: (p) => p.startsWith("/play") },
  { href: "/me",      icon: UserRound,  label: "Me",      match: (p) => p.startsWith("/me") },
];

type Props = {
  profile: {
    name: string;
    avatarIcon: string;
    avatarColor: string;
  };
};

export function SideNav({ profile }: Props) {
  const pathname = usePathname();

  return (
    <aside style={{
      width: 200, height: "100%", background: "var(--cream-50)",
      borderRight: "1px solid var(--ink-100)", padding: "24px 12px",
      display: "flex", flexDirection: "column", gap: 6, flexShrink: 0,
      overflowY: "auto",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "4px 10px 18px" }}>
        <Avatar icon={profile.avatarIcon} color={profile.avatarColor} size={40} hasShadow={false}/>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 18, color: "var(--coral-600)", lineHeight: 1.1 }}>
          {profile.name}
        </div>
      </div>

      {items.map((item) => {
        const on = item.match(pathname);
        const Icon = item.icon;
        return (
          <Link key={item.href} href={item.href} style={{
            display: "flex", alignItems: "center", gap: 12,
            padding: "12px 14px", borderRadius: "var(--r-md)",
            textDecoration: "none",
            background: on ? "var(--coral-100)" : "transparent",
            color: on ? "var(--coral-700)" : "var(--ink-700)",
            fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16,
          }}>
            <Icon size={22}/> {item.label}
          </Link>
        );
      })}

      <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 4 }}>
        <form action={switchProfile}>
          <button type="submit" style={navButtonStyle}>
            <ArrowLeftRight size={22}/> Switch profile
          </button>
        </form>
        <form action={logout}>
          <button type="submit" style={navButtonStyle}>
            <LogOut size={22}/> Log out
          </button>
        </form>
      </div>
    </aside>
  );
}

const navButtonStyle: React.CSSProperties = {
  width: "100%",
  display: "flex", alignItems: "center", gap: 12,
  padding: "12px 14px", borderRadius: "var(--r-md)",
  background: "transparent", border: "none", cursor: "pointer", textAlign: "left",
  color: "var(--ink-500)",
  fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16,
};
