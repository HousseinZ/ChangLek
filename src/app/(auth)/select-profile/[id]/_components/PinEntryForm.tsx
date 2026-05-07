"use client";

import { useActionState } from "react";
import { selectProfileWithPin, type SelectProfileState } from "../../../actions";
import { PinInput } from "../../../_components/PinInput";
import { StatusMessage } from "../../../_components/StatusMessage";

const initialState: SelectProfileState = {};

export function PinEntryForm({ profileId }: { profileId: string }) {
  const [state, formAction, isPending] = useActionState(selectProfileWithPin, initialState);

  return (
    <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: 14, width: "100%" }}>
      <input type="hidden" name="profileId" value={profileId}/>
      <PinInput autoFocus/>
      <StatusMessage error={state.error}/>
      <button type="submit" className="cl-btn cl-btn--lg" disabled={isPending}>
        {isPending ? "Checking…" : "Continue"}
      </button>
    </form>
  );
}
