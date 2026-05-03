"use client";

import { useState } from "react";

type Props = {
  word: string;
  emoji: string;
  picked: boolean;
  correct: boolean | null;
  onClick: () => void;
};

export function ChoiceCard({ word, emoji, picked, correct, onClick }: Props) {
  const [hover, setHover] = useState(false);
  let border = "var(--ink-100)";
  let bg = "#fff";
  if (picked && correct === true)  { border = "var(--success-500)"; bg = "var(--success-50)"; }
  if (picked && correct === false) { border = "var(--danger-500)";  bg = "var(--danger-50)"; }

  return (
    <button
      onClick={onClick}
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
      style={{
        background: bg, border: `3px solid ${border}`, borderRadius: "var(--r-xl)",
        padding: "28px 24px",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 12,
        cursor: "pointer", boxShadow: `0 4px 0 ${border}`, textAlign: "center",
        transition: "transform 150ms var(--ease-bounce)",
        transform: hover ? "translateY(-3px)" : "translateY(0)",
      }}
    >
      <div style={{ fontSize: 64, lineHeight: 1 }}>{emoji}</div>
      <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 26, color: "var(--ink-900)" }}>
        {word}
      </div>
    </button>
  );
}
