"use client";

import { useRouter } from "next/navigation";
import { TopStrip } from "./_components/TopStrip";
import { BigGoalCard } from "./_components/BigGoalCard";
import { LessonCard } from "./_components/LessonCard";

type Status = "done" | "current" | "locked";
type Accent = "coral" | "sky" | "amber" | "success";

const lessons: { id: string; unit: number; title: string; mins: number; status: Status; accent: Accent }[] = [
  { id: "animal-sounds",   unit: 1, title: "Animal Sounds",   mins: 8,  status: "done",    accent: "success" },
  { id: "big-and-small",   unit: 1, title: "Big & Small",     mins: 10, status: "done",    accent: "success" },
  { id: "counting-1-10",   unit: 2, title: "Counting 1–10",   mins: 12, status: "current", accent: "coral" },
  { id: "colors-and-shapes", unit: 2, title: "Colors & Shapes", mins: 10, status: "locked", accent: "sky" },
  { id: "animals-at-zoo",  unit: 2, title: "Animals at Zoo",  mins: 12, status: "locked",  accent: "amber" },
  { id: "my-family",       unit: 3, title: "My Family",       mins: 10, status: "locked",  accent: "coral" },
];

export default function HomePage() {
  const router = useRouter();
  return (
    <div style={{ flex: 1, overflowY: "auto" }}>
      <TopStrip name="Praewa" streak={5} stars={142}/>
      <div style={{ padding: "0 32px 32px" }}>
        <BigGoalCard done={8} target={10}/>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", margin: "24px 0 12px" }}>
          <h2 style={{ margin: 0, font: "var(--type-h2)", color: "var(--ink-900)" }}>Today&apos;s lessons</h2>
          <a href="/lessons" style={{ font: "var(--type-label)", color: "var(--sky-600)" }}>See all →</a>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {lessons.map((l) => (
            <LessonCard
              key={l.id}
              unit={l.unit}
              title={l.title}
              mins={l.mins}
              status={l.status}
              accent={l.accent}
              onClick={l.status === "current" ? () => router.push(`/lessons/${l.id}`) : undefined}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
