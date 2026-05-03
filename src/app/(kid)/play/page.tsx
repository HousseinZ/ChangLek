import { Gamepad2 } from "lucide-react";

export default function PlayPage() {
  return (
    <div style={{
      flex: 1, display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", padding: 32,
      color: "var(--fg-2)",
    }}>
      <div className="cl-icon-tile cl-icon-tile--lg cl-icon-tile--sky" style={{ marginBottom: 16 }}>
        <Gamepad2 size={28}/>
      </div>
      <h2 style={{ margin: 0, font: "var(--type-h2)", color: "var(--ink-900)" }}>Play coming soon</h2>
      <p style={{ marginTop: 8, maxWidth: 360, textAlign: "center" }}>
        Mini-games arrive in Phase 2 — for now, head to <a href="/lessons">Lessons</a> to keep your streak going.
      </p>
    </div>
  );
}
