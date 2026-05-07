"use client";

import Link from "next/link";
import { useActionState } from "react";
import { signup, type AuthState } from "../actions";
import { AuthCard } from "../_components/AuthCard";
import { AuthInput } from "../_components/AuthInput";
import { AvatarPicker } from "../_components/AvatarPicker";
import { PinInput } from "../_components/PinInput";
import { StatusMessage } from "../_components/StatusMessage";

const initialState: AuthState = {};

export default function SignupPage() {
  const [state, formAction, isPending] = useActionState(signup, initialState);

  return (
    <AuthCard>
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div style={{ textAlign: "center" }}>
          <h2 style={{ margin: 0, font: "var(--type-h2)", color: "var(--ink-900)" }}>Create your family account</h2>
          <p style={{ margin: "4px 0 0", color: "var(--fg-2)" }}>One login per family. Add kids after signup.</p>
        </div>

        <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <AuthInput id="name" name="name" type="text" autoComplete="name" required label="Your name" placeholder="Praewa S."/>
          <AuthInput id="email" name="email" type="email" autoComplete="email" required label="Email" placeholder="you@example.com"/>
          <AuthInput id="password" name="password" type="password" autoComplete="new-password" required minLength={8} label="Password" placeholder="At least 8 characters"/>

          <AvatarPicker defaultIcon="compass"/>

          <PinInput name="pin" label="Parent PIN (4 digits) — keeps kids out of the dashboard"/>

          <StatusMessage error={state.error} success={state.success}/>

          <button type="submit" className="cl-btn cl-btn--lg" disabled={isPending} style={{ marginTop: 6 }}>
            {isPending ? "Creating account…" : "Create account"}
          </button>
        </form>

        <div style={{ textAlign: "center", font: "var(--type-body-sm)", color: "var(--fg-2)" }}>
          Already have an account?{" "}
          <Link href="/login" style={{ color: "var(--coral-600)", fontWeight: 700 }}>Log in</Link>
        </div>
      </div>
    </AuthCard>
  );
}
