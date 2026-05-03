import Image from "next/image";

type Props = { done?: number; target?: number };

export function BigGoalCard({ done = 8, target = 10 }: Props) {
  const pct = Math.min(1, done / target);
  return (
    <div style={{
      background: "linear-gradient(135deg, var(--coral-400), var(--coral-500))",
      borderRadius: "var(--r-2xl)", padding: 28, color: "#fff",
      position: "relative", overflow: "hidden",
      boxShadow: "0 8px 0 var(--coral-700), 0 16px 32px rgba(255,122,69,0.25)",
      display: "flex", alignItems: "center", gap: 24, minHeight: 140,
    }}>
      <Image
        src="/assets/nong-mascot.png"
        alt=""
        width={140}
        height={140}
        style={{ filter: "drop-shadow(0 6px 0 rgba(0,0,0,0.1))", height: "auto" }}
      />
      <div style={{ flex: 1 }}>
        <div style={{ font: "var(--type-label)", opacity: 0.9 }}>TODAY&apos;S GOAL</div>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 36, lineHeight: 1.1, marginTop: 4 }}>
          {done} of {target} stars ⭐
        </div>
        <div style={{ height: 14, background: "rgba(255,255,255,0.3)", borderRadius: 999, marginTop: 14, overflow: "hidden", maxWidth: 480 }}>
          <div style={{ height: "100%", width: `${pct * 100}%`, background: "#fff", borderRadius: 999 }}></div>
        </div>
        <div style={{ font: "var(--type-body)", opacity: 0.95, marginTop: 10 }}>
          {target - done} more to keep your streak going!
        </div>
      </div>
      <Image
        src="/assets/sticker-confetti-burst.svg"
        alt=""
        width={120}
        height={120}
        style={{ position: "absolute", right: -10, top: -10, opacity: 0.6 }}
      />
    </div>
  );
}
