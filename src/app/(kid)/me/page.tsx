import Image from "next/image";
import { Compass, Crown, Flame, Heart, Lock, Sparkles, Star, Sun, Trophy, type LucideIcon } from "lucide-react";

type Badge = { color: string; Icon: LucideIcon; label: string; locked?: boolean };

const badges: Badge[] = [
  { color: "var(--celebrate-orange)", Icon: Sun,      label: "First Day" },
  { color: "var(--celebrate-pink)",   Icon: Heart,    label: "Bookworm" },
  { color: "var(--celebrate-blue)",   Icon: Compass,  label: "Explorer" },
  { color: "var(--celebrate-green)",  Icon: Sparkles, label: "Streaker" },
  { color: "var(--celebrate-purple)", Icon: Crown,    label: "Class Star" },
  { color: "var(--ink-200)",          Icon: Lock,     label: "?", locked: true },
];

type StatProps = { Icon: LucideIcon; value: string; label: string; tile: "amber" | "coral" | "sky" };

function Stat({ Icon, value, label, tile }: StatProps) {
  return (
    <div className="cl-card" style={{ padding: 16, textAlign: "center" }}>
      <div className={`cl-icon-tile cl-icon-tile--${tile}`} style={{ margin: "0 auto 6px" }}>
        <Icon size={24}/>
      </div>
      <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 26, color: "var(--ink-900)" }}>
        {value}
      </div>
      <div style={{ font: "var(--type-caption)", color: "var(--fg-3)" }}>{label}</div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <div style={{ flex: 1, overflowY: "auto" }}>
      <div style={{
        padding: "32px 32px 28px", textAlign: "center",
        background: "linear-gradient(180deg, var(--coral-100), transparent)",
      }}>
        <Image
          src="/assets/nong-avatar.png"
          alt=""
          width={120}
          height={120}
          style={{ borderRadius: "50%", boxShadow: "var(--shadow-md)" }}
        />
        <div style={{
          fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 32,
          color: "var(--ink-900)", marginTop: 10,
        }}>
          Praewa
        </div>
        <div style={{ font: "var(--type-caption)", color: "var(--fg-3)" }}>
          Age 7 · Joined Mar 2026
        </div>
      </div>

      <div style={{
        padding: "0 32px 24px",
        display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14,
        maxWidth: 720, margin: "0 auto",
      }}>
        <Stat Icon={Flame}  value="5"   label="Day streak" tile="amber"/>
        <Stat Icon={Star}   value="142" label="Stars"      tile="coral"/>
        <Stat Icon={Trophy} value="5"   label="Badges"     tile="sky"/>
      </div>

      <div style={{ padding: "0 32px 32px", maxWidth: 720, margin: "0 auto" }}>
        <h3 style={{ margin: "8px 0 16px", font: "var(--type-h3)", color: "var(--ink-900)" }}>Badges</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 14 }}>
          {badges.map((b, i) => (
            <div key={i} style={{ textAlign: "center", opacity: b.locked ? 0.5 : 1 }}>
              <div style={{
                width: 80, height: 80, margin: "0 auto", borderRadius: "50%",
                background: b.color,
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 4px 0 rgba(0,0,0,0.12)", color: "#fff",
              }}>
                <b.Icon size={36}/>
              </div>
              <div style={{ font: "var(--type-caption)", color: "var(--ink-700)", marginTop: 6, fontWeight: 700 }}>
                {b.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
