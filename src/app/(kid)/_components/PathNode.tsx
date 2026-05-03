"use client";

import { Check, Lock, Star } from "lucide-react";

type Accent = "coral" | "sky" | "amber" | "success";
type Status = "done" | "current" | "locked";

type Props = {
  label: string;
  status?: Status;
  accent?: Accent;
  onClick?: () => void;
};

const colorMap: Record<Accent, { bg: string; shadow: string }> = {
  coral:   { bg: "var(--coral-500)",   shadow: "var(--coral-700)" },
  sky:     { bg: "var(--sky-400)",     shadow: "var(--sky-600)" },
  amber:   { bg: "var(--amber-400)",   shadow: "var(--amber-600)" },
  success: { bg: "var(--success-500)", shadow: "var(--success-700)" },
};

export function PathNode({ label, status = "locked", accent = "coral", onClick }: Props) {
  const colors = colorMap[accent];
  const isLocked = status === "locked";
  return (
    <button
      onClick={onClick}
      disabled={isLocked}
      style={{
        width: 100, height: 100, borderRadius: "50%",
        background: isLocked ? "var(--ink-200)" : colors.bg,
        boxShadow: isLocked ? "0 7px 0 var(--ink-300)" : `0 7px 0 ${colors.shadow}`,
        border: "none", cursor: isLocked ? "not-allowed" : "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "#fff", position: "relative",
      }}
    >
      {status === "done" && <Check size={44}/>}
      {status === "current" && <Star size={44}/>}
      {isLocked && <Lock size={32} color="var(--ink-500)"/>}
      {status === "current" && (
        <div style={{
          position: "absolute", top: -16, left: "50%", transform: "translateX(-50%)",
          background: "#fff", color: "var(--coral-700)",
          fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 13,
          padding: "4px 12px", borderRadius: 999, boxShadow: "var(--shadow-sm)", whiteSpace: "nowrap",
        }}>
          {label}
        </div>
      )}
    </button>
  );
}
