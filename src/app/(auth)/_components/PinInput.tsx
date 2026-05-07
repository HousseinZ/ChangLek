"use client";

import { useRef, useState } from "react";

type Props = {
  /** Submits as a single hidden input named "pin". */
  name?: string;
  label?: string;
  autoFocus?: boolean;
};

/** Four-box numeric PIN input. Auto-advances on type, backspace goes back. */
export function PinInput({ name = "pin", label = "PIN", autoFocus = false }: Props) {
  const [digits, setDigits] = useState<string[]>(["", "", "", ""]);
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const value = digits.join("");

  function handleChange(i: number, v: string) {
    const cleaned = v.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[i] = cleaned;
    setDigits(next);
    if (cleaned && i < 3) refs.current[i + 1]?.focus();
  }

  function handleKeyDown(i: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !digits[i] && i > 0) {
      refs.current[i - 1]?.focus();
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <span style={{ font: "var(--type-label)", color: "var(--ink-700)" }}>{label}</span>
      <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
        {digits.map((d, i) => (
          <input
            key={i}
            ref={(el) => { refs.current[i] = el; }}
            type="text"
            inputMode="numeric"
            pattern="\d*"
            maxLength={1}
            value={d}
            autoFocus={autoFocus && i === 0}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            aria-label={`PIN digit ${i + 1}`}
            style={{
              width: 56,
              height: 64,
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: 32,
              textAlign: "center",
              borderRadius: "var(--r-md)",
              border: "2px solid var(--ink-100)",
              background: "var(--cream-50)",
              color: "var(--ink-900)",
              outline: "none",
              transition: "border-color var(--dur-micro) var(--ease-standard)",
            }}
            onFocus={(e) => { e.currentTarget.style.borderColor = "var(--coral-400)"; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = "var(--ink-100)"; }}
          />
        ))}
      </div>
      <input type="hidden" name={name} value={value}/>
    </div>
  );
}
