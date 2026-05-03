"use client";

import { Heart, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChoiceCard } from "../../_components/ChoiceCard";
import { CelebrationOverlay } from "../../_components/CelebrationOverlay";

const correct = "Five";
const choices = [
  { word: "Three", emoji: "🐠" },
  { word: "Five",  emoji: "🖐️" },
  { word: "Two",   emoji: "👀" },
  { word: "Seven", emoji: "🌈" },
];

export default function LessonPage() {
  const router = useRouter();
  const [picked, setPicked] = useState<string | null>(null);
  const [celebrating, setCelebrating] = useState(false);

  const isCorrect = picked === correct;

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", position: "relative", overflow: "hidden" }}>
      <div style={{
        padding: "20px 32px 16px",
        display: "flex", alignItems: "center", gap: 16,
        borderBottom: "1px solid var(--ink-100)",
      }}>
        <button
          onClick={() => router.push("/lessons")}
          style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}
          aria-label="Close lesson"
        >
          <X size={28} color="var(--ink-500)"/>
        </button>
        <div style={{ flex: 1, height: 14, background: "var(--cream-200)", borderRadius: 999, overflow: "hidden", maxWidth: 600 }}>
          <div style={{ width: "60%", height: "100%", background: "var(--coral-500)" }}></div>
        </div>
        <div style={{
          display: "flex", alignItems: "center", gap: 6,
          color: "var(--coral-600)",
          fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 18,
        }}>
          <Heart size={20} fill="currentColor"/> 3
        </div>
      </div>

      <div style={{
        flex: 1, padding: "32px 40px",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        maxWidth: 720, margin: "0 auto", width: "100%",
      }}>
        <div style={{ font: "var(--type-label)", color: "var(--fg-3)", textAlign: "center" }}>
          MATCH THE WORD
        </div>
        <div style={{
          fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 40,
          color: "var(--ink-900)", lineHeight: 1.15,
          textAlign: "center", marginTop: 6,
        }}>
          How many fingers? 🖐️
        </div>
        <div style={{
          marginTop: 32, display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16,
          width: "100%", maxWidth: 560,
        }}>
          {choices.map((c) => (
            <ChoiceCard
              key={c.word}
              word={c.word}
              emoji={c.emoji}
              picked={picked === c.word}
              correct={picked === c.word ? c.word === correct : null}
              onClick={() => setPicked(c.word)}
            />
          ))}
        </div>
        <button
          className="cl-btn cl-btn--lg"
          style={{ marginTop: 32, minWidth: 280 }}
          disabled={!picked}
          onClick={() => { if (isCorrect) setCelebrating(true); }}
        >
          {picked ? (isCorrect ? "Nice! Continue" : "Try again") : "Pick an answer"}
        </button>
      </div>

      {celebrating && (
        <CelebrationOverlay onClose={() => router.push("/lessons")}/>
      )}
    </div>
  );
}
