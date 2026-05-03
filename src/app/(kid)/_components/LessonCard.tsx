"use client";

import { Check, Lock, Play } from "lucide-react";
import { useState } from "react";

type Accent = "coral" | "sky" | "amber" | "success";
type Status = "done" | "current" | "locked";

type Props = {
  unit: number;
  title: string;
  mins: number;
  status: Status;
  onClick?: () => void;
  accent?: Accent;
};

const accentMap: Record<Accent, [string, string]> = {
  coral:   ["var(--coral-100)",   "var(--coral-600)"],
  sky:     ["var(--sky-100)",     "var(--sky-700)"],
  amber:   ["var(--amber-100)",   "var(--amber-600)"],
  success: ["var(--success-100)", "var(--success-700)"],
};

export function LessonCard({ unit, title, mins, status, onClick, accent = "coral" }: Props) {
  const [hover, setHover] = useState(false);
  const [bg, fg] = accentMap[accent];
  const locked = status === "locked";
  const done = status === "done";
  const Icon = done ? Check : locked ? Lock : Play;

  return (
    <button
      onClick={onClick}
      disabled={locked}
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
      style={{
        background: "#fff",
        border: "none",
        cursor: locked ? "not-allowed" : "pointer",
        borderRadius: "var(--r-xl)",
        padding: 20,
        textAlign: "left",
        boxShadow: locked ? "var(--shadow-sm)" : "var(--shadow-md), var(--inner-highlight)",
        opacity: locked ? 0.55 : 1,
        position: "relative",
        transition: "transform 150ms var(--ease-bounce)",
        transform: !locked && hover ? "translateY(-3px)" : "translateY(0)",
        display: "flex", flexDirection: "column", gap: 12,
      }}
    >
      <div style={{
        height: 100, borderRadius: "var(--r-md)", background: bg,
        display: "flex", alignItems: "center", justifyContent: "center", position: "relative",
      }}>
        <Icon size={44} color={fg}/>
        {done && (
          <span className="cl-chip cl-chip--success" style={{ position: "absolute", top: 8, right: 8 }}>
            Done
          </span>
        )}
      </div>
      <div>
        <div style={{ font: "var(--type-caption)", color: "var(--fg-3)" }}>Unit {unit} · {mins} min</div>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, color: "var(--ink-900)", marginTop: 2 }}>
          {title}
        </div>
      </div>
    </button>
  );
}
