"use client";
import { useState } from "react";
import { input } from "./ui";

/** datetime-local in the admin's own timezone, submitted as an ISO (UTC) string. */
export function DateTimeField({ name, required }: { name: string; required?: boolean }) {
  const [iso, setIso] = useState("");
  return (
    <>
      <input type="datetime-local" required={required} className={input} onChange={(e) => setIso(e.target.value ? new Date(e.target.value).toISOString() : "")} />
      <input type="hidden" name={name} value={iso} />
    </>
  );
}
