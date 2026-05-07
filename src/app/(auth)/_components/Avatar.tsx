import { resolveIcon } from "@/lib/avatars";

type Props = {
  icon: string;
  color: string;
  size?: number;
  hasShadow?: boolean;
};

export function Avatar({ icon, color, size = 80, hasShadow = true }: Props) {
  const Icon = resolveIcon(icon);
  return (
    <div style={{
      width: size,
      height: size,
      borderRadius: "50%",
      background: color,
      color: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: hasShadow ? "0 4px 0 rgba(0,0,0,0.12)" : "none",
      flexShrink: 0,
    }}>
      <Icon size={Math.round(size * 0.45)}/>
    </div>
  );
}
