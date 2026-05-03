"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { PathNode } from "../_components/PathNode";

type Status = "done" | "current" | "locked";
type Accent = "coral" | "sky" | "amber" | "success";

const nodes: { id: string; x: number; label: string; status: Status; accent: Accent }[] = [
  { id: "hi",      x: 50, label: "Hi!",     status: "done",    accent: "success" },
  { id: "family",  x: 70, label: "Family",  status: "done",    accent: "success" },
  { id: "animals", x: 50, label: "Animals", status: "done",    accent: "success" },
  { id: "counting-1-10", x: 30, label: "Numbers", status: "current", accent: "coral" },
  { id: "colors", x: 50, label: "Colors", status: "locked", accent: "sky" },
  { id: "shapes", x: 70, label: "Shapes", status: "locked", accent: "amber" },
  { id: "food",   x: 50, label: "Food",   status: "locked", accent: "sky" },
];

export default function LessonsPathPage() {
  const router = useRouter();
  return (
    <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "24px 32px 8px", display: "flex", alignItems: "center", gap: 14 }}>
        <div className="cl-chip cl-chip--coral">UNIT 2</div>
        <h2 style={{ margin: 0, font: "var(--type-h2)", color: "var(--ink-900)" }}>Numbers &amp; Counting</h2>
      </div>
      <div style={{ flex: 1, position: "relative", padding: "12px 32px 40px" }}>
        <div style={{ position: "relative", height: 800, maxWidth: 480, margin: "0 auto" }}>
          <svg width="100%" height="800" style={{ position: "absolute", inset: 0 }} viewBox="0 0 100 800" preserveAspectRatio="none">
            <path
              d="M 50 70 Q 80 130 70 200 Q 60 270 50 320 Q 40 370 30 440 Q 20 510 50 560 Q 80 610 70 680 Q 60 750 50 770"
              stroke="var(--ink-200)" strokeWidth="3" strokeDasharray="4 8"
              fill="none" strokeLinecap="round"
            />
          </svg>
          {nodes.map((n, i) => (
            <div key={n.id} style={{ position: "absolute", top: 30 + i * 110, left: `calc(${n.x}% - 50px)` }}>
              <PathNode
                label={n.label}
                status={n.status}
                accent={n.accent}
                onClick={n.status === "current" ? () => router.push(`/lessons/${n.id}`) : undefined}
              />
            </div>
          ))}
          <Image
            src="/assets/sticker-star.svg"
            alt=""
            width={56}
            height={56}
            style={{ position: "absolute", top: 380, right: -10, transform: "rotate(15deg)" }}
          />
        </div>
      </div>
    </div>
  );
}
