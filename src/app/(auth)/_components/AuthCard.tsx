import Image from "next/image";

type Props = {
  children: React.ReactNode;
  showLogo?: boolean;
};

export function AuthCard({ children, showLogo = true }: Props) {
  return (
    <div style={{
      background: "var(--surface-raised)",
      borderRadius: "var(--r-2xl)",
      boxShadow: "var(--shadow-xl), var(--inner-highlight)",
      padding: 36,
      width: "100%",
      maxWidth: 460,
    }}>
      {showLogo && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 20 }}>
          <Image src="/assets/nong-avatar.png" alt="Nong" width={56} height={56} style={{ borderRadius: "50%" }}/>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 32, color: "var(--coral-600)", lineHeight: 1 }}>
            ChangLek
          </div>
        </div>
      )}
      {children}
    </div>
  );
}
