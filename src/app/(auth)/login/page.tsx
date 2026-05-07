"use client";

import Link from "next/link";
import { useActionState } from "react";
import { login, type AuthState } from "../actions";
import { AuthCard } from "../_components/AuthCard";
import { AuthInput } from "../_components/AuthInput";
import { StatusMessage } from "../_components/StatusMessage";

const initialState: AuthState = {};

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(login, initialState);

  return (
    <AuthCard>
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div style={{ textAlign: "center" }}>
          <h2 style={{ margin: 0, font: "var(--type-h2)", color: "var(--ink-900)" }}>Welcome back!</h2>
          <p style={{ margin: "4px 0 0", color: "var(--fg-2)" }}>Log in to keep learning.</p>
        </div>

        <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <AuthInput id="email" name="email" type="email" autoComplete="email" required label="Email" placeholder="you@example.com"/>
          <AuthInput id="password" name="password" type="password" autoComplete="current-password" required label="Password" placeholder="••••••••"/>
          <StatusMessage error={state.error} success={state.success}/>
          <button type="submit" className="cl-btn cl-btn--lg" disabled={isPending} style={{ marginTop: 6 }}>
            {isPending ? "Logging in…" : "Log in"}
          </button>
        </form>

        <div style={{ textAlign: "center", font: "var(--type-body-sm)", color: "var(--fg-2)" }}>
          Don&apos;t have an account?{" "}
          <Link href="/signup" style={{ color: "var(--coral-600)", fontWeight: 700 }}>Sign up</Link>
        </div>
      </div>
    </AuthCard>
  );
}
