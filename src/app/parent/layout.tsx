export default function ParentLayout({ children }: { children: React.ReactNode }) {
  return <div style={{ minHeight: "100vh", background: "var(--cream-50)" }}>{children}</div>;
}
