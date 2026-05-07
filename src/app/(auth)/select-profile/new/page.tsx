"use client";

import Link from "next/link";
import { useActionState } from "react";
import { createKidProfile, type AuthState } from "../../actions";
import { AuthCard } from "../../_components/AuthCard";
import { AuthInput } from "../../_components/AuthInput";
import { AvatarPicker } from "../../_components/AvatarPicker";
import { PinInput } from "../../_components/PinInput";
import { StatusMessage } from "../../_components/StatusMessage";

const initialState: AuthState = {};

export default function NewKidProfilePage() {
  const [state, formAction, isPending] = useActionState(createKidProfile, initialState);

  return (
    <AuthCard showLogo={false}>
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div style={{ textAlign: "center" }}>
          <h2 style={{ margin: 0, font: "var(--type-h2)", color: "var(--ink-900)" }}>Add a kid</h2>
          <p style={{ margin: "4px 0 0", color: "var(--fg-2)" }}>Create a profile for your child.</p>
        </div>

        <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <AuthInput id="name" name="name" type="text" required label="Kid&apos;s name" placeholder="Praewa"/>
          <AuthInput id="age" name="age" type="number" min={3} max={18} label="Age (optional)" placeholder="7"/>

          <AvatarPicker defaultIcon="sparkles"/>

          <PinInput name="pin" label="PIN (optional — leave blank for none)"/>

          <StatusMessage error={state.error} success={state.success}/>

          <div style={{ display: "flex", gap: 10 }}>
            <Link href="/select-profile" className="cl-btn cl-btn--secondary cl-btn--lg" style={{ flex: 1, textDecoration: "none" }}>
              Cancel
            </Link>
            <button type="submit" className="cl-btn cl-btn--lg" disabled={isPending} style={{ flex: 1 }}>
              {isPending ? "Creating…" : "Create profile"}
            </button>
          </div>
        </form>
      </div>
    </AuthCard>
  );
}
