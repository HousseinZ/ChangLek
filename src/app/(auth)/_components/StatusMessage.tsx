type Props = { error?: string; success?: string };

export function StatusMessage({ error, success }: Props) {
  if (!error && !success) return null;
  const isError = !!error;
  return (
    <div style={{
      font: "var(--type-body-sm)",
      padding: "10px 14px",
      borderRadius: "var(--r-md)",
      background: isError ? "var(--danger-50)" : "var(--success-50)",
      color: isError ? "var(--danger-700)" : "var(--success-700)",
      border: `1px solid ${isError ? "var(--danger-500)" : "var(--success-500)"}`,
    }}>
      {error || success}
    </div>
  );
}
