import { Compass, Crown, Gamepad2, Heart, Sparkles, Sun, type LucideIcon } from "lucide-react";

export type AvatarPreset = {
  icon: string;        // stored in DB (string key)
  color: string;       // stored in DB (hex)
  Icon: LucideIcon;    // resolved component for rendering
  label: string;       // for accessibility / picker hints
};

// Six presets in the celebration palette. Add more here without touching the
// schema — the DB stores `icon` and `color` as plain strings.
export const AVATAR_PRESETS: AvatarPreset[] = [
  { icon: "sun",       color: "#F08A2A", Icon: Sun,      label: "Sunny" },
  { icon: "heart",     color: "#E8438A", Icon: Heart,    label: "Sweetheart" },
  { icon: "compass",   color: "#2C7BC9", Icon: Compass,  label: "Explorer" },
  { icon: "sparkles",  color: "#6FBE44", Icon: Sparkles, label: "Sparkle" },
  { icon: "crown",     color: "#9C4FB8", Icon: Crown,    label: "Royal" },
  { icon: "gamepad-2", color: "#2EB7B0", Icon: Gamepad2, label: "Gamer" },
];

const ICON_MAP: Record<string, LucideIcon> = Object.fromEntries(
  AVATAR_PRESETS.map((p) => [p.icon, p.Icon]),
);

export function resolveIcon(iconKey: string): LucideIcon {
  return ICON_MAP[iconKey] ?? Sun;
}
