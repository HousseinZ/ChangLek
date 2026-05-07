"use client";

import { useState } from "react";
import { AVATAR_PRESETS } from "@/lib/avatars";
import { Avatar } from "./Avatar";

type Props = {
  /** Hidden inputs named "avatarIcon" and "avatarColor" are submitted with the form. */
  defaultIcon?: string;
};

export function AvatarPicker({ defaultIcon = "sun" }: Props) {
  const [picked, setPicked] = useState<string>(defaultIcon);
  const pickedPreset = AVATAR_PRESETS.find((p) => p.icon === picked) ?? AVATAR_PRESETS[0];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <span style={{ font: "var(--type-label)", color: "var(--ink-700)" }}>Pick an avatar</span>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 8 }}>
        {AVATAR_PRESETS.map((preset) => {
          const active = preset.icon === picked;
          return (
            <button
              key={preset.icon}
              type="button"
              onClick={() => setPicked(preset.icon)}
              aria-label={preset.label}
              style={{
                background: "transparent",
                border: `3px solid ${active ? "var(--coral-500)" : "transparent"}`,
                borderRadius: "50%",
                padding: 2,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "border-color var(--dur-micro) var(--ease-standard)",
              }}
            >
              <Avatar icon={preset.icon} color={preset.color} size={48} hasShadow={false}/>
            </button>
          );
        })}
      </div>
      <input type="hidden" name="avatarIcon" value={pickedPreset.icon}/>
      <input type="hidden" name="avatarColor" value={pickedPreset.color}/>
    </div>
  );
}
