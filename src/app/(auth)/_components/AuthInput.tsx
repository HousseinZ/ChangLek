import type { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export function AuthInput({ label, id, ...rest }: Props) {
  return (
    <label htmlFor={id} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <span style={{ font: "var(--type-label)", color: "var(--ink-700)" }}>{label}</span>
      <input
        id={id}
        {...rest}
        style={{
          font: "var(--type-body)",
          padding: "12px 16px",
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
    </label>
  );
}
