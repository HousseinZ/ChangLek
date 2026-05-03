"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Gamepad2, Home, UserRound, type LucideIcon } from "lucide-react";

type NavItem = { href: string; icon: LucideIcon; label: string; match: (p: string) => boolean };

const items: NavItem[] = [
  { href: "/",        icon: Home,       label: "Home",    match: (p) => p === "/" },
  { href: "/lessons", icon: BookOpen,   label: "Lessons", match: (p) => p.startsWith("/lessons") },
  { href: "/play",    icon: Gamepad2,   label: "Play",    match: (p) => p.startsWith("/play") },
  { href: "/me",      icon: UserRound,  label: "Me",      match: (p) => p.startsWith("/me") },
];

export function SideNav() {
  const pathname = usePathname();
  return (
    <aside style={{
      width: 200, height: "100%", background: "var(--cream-50)",
      borderRight: "1px solid var(--ink-100)", padding: "24px 12px",
      display: "flex", flexDirection: "column", gap: 6, flexShrink: 0,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "4px 10px 18px" }}>
        <Image src="/assets/nong-avatar.png" alt="" width={40} height={40} style={{ borderRadius: "50%" }}/>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 20, color: "var(--coral-600)" }}>
          ChangLek
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
    </aside>
  );
}
