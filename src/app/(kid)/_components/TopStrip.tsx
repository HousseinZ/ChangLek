import { Flame, Star } from "lucide-react";

type Props = { name?: string; streak?: number; stars?: number };

export function TopStrip({ name = "Praewa", streak = 5, stars = 142 }: Props) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 32px 14px" }}>
      <div>
        <div style={{ font: "var(--type-caption)", color: "var(--fg-3)" }}>Sawasdee 👋</div>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 30, color: "var(--ink-900)", lineHeight: 1.05 }}>
          Hi, {name}!
        </div>
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <div className="cl-chip cl-chip--amber" style={{ padding: "8px 14px", fontSize: 15 }}>
          <Flame size={16}/> {streak} day streak
        </div>
        <div className="cl-chip cl-chip--coral" style={{ padding: "8px 14px", fontSize: 15 }}>
          <Star size={16}/> {stars} stars
        </div>
      </div>
    </div>
  );
}
