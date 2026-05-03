import { SideNav } from "./_components/SideNav";

export default function KidLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", height: "100vh", background: "var(--cream-50)" }}>
      <SideNav />
      {children}
    </div>
  );
}
