"use client";

import Image from "next/image";

type Props = { onClose: () => void };

export function CelebrationOverlay({ onClose }: Props) {
  return (
    <div style={{
      position: "absolute", inset: 0, background: "rgba(74,47,30,0.55)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: 32, zIndex: 10,
    }}>
      <div style={{
        background: "#fff", borderRadius: "var(--r-2xl)", padding: 36, textAlign: "center",
        boxShadow: "var(--shadow-xl)", maxWidth: 440, position: "relative",
        backgroundImage: "url(/assets/pattern-confetti.svg)", backgroundSize: 220,
      }}>
        <Image
          src="/assets/nong-mascot.png"
          alt=""
          width={200}
          height={200}
          style={{ marginTop: -70, filter: "drop-shadow(0 6px 0 rgba(255,122,69,0.2))", height: "auto" }}
        />
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 36, color: "var(--coral-600)" }}>
          Lesson done! 🎉
        </div>
        <div style={{ font: "var(--type-body)", color: "var(--ink-700)", margin: "8px 0 20px" }}>
          You earned <b>+12 stars</b> and grew your streak!
        </div>
        <button className="cl-btn cl-btn--lg" onClick={onClose} style={{ width: "100%" }}>
          Keep going
        </button>
      </div>
    </div>
  );
}
