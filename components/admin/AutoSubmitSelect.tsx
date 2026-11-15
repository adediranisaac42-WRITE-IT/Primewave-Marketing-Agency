"use client";
import { label } from "@/lib/admin-labels";

/** A <select> that submits its parent form (a server action) as soon as the value changes. */
export function AutoSubmitSelect({ name, value, options, ariaLabel }: { name: string; value: string; options: readonly string[]; ariaLabel: string }) {
  return (
    <select
      name={name}
      defaultValue={value}
      aria-label={ariaLabel}
      onChange={(e) => e.currentTarget.form?.requestSubmit()}
      className="rounded-lg border border-line bg-surface px-2 py-1.5 text-xs font-medium focus:border-accent focus:outline-none"
    >
      {options.map((o) => <option key={o} value={o}>{label(o)}</option>)}
    </select>
  );
}
