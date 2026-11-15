import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function PageTitle({ title, sub, children }: { title: string; sub?: string; children?: ReactNode }) {
  return (
    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <h1 className="text-3xl font-bold text-white">{title}</h1>
        {sub && <p className="mt-1 text-muted">{sub}</p>}
      </div>
      {children}
    </div>
  );
}

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("rounded-2xl border border-line bg-surface p-6 shadow-card", className)}>{children}</div>;
}

const tones: Record<string, string> = {
  new: "bg-accent/10 text-accent", contacted: "bg-accent/10 text-accent", qualified: "bg-indigo-100 text-indigo-700",
  proposal: "bg-amber-100 text-amber-800", negotiation: "bg-amber-100 text-amber-800", won: "bg-emerald-100 text-emerald-700",
  completed: "bg-emerald-100 text-emerald-700", lost: "bg-navy text-muted", cancelled: "bg-navy text-muted",
  no_show: "bg-red-100 text-red-700", scheduled: "bg-accent/10 text-accent", in_progress: "bg-accent/10 text-accent",
  planning: "bg-accent/10 text-accent", review: "bg-amber-100 text-amber-800", on_hold: "bg-navy text-muted",
  lead: "bg-accent/10 text-accent",
};
export function Badge({ value }: { value: string }) {
  return <span className={cn("inline-block rounded-full px-2.5 py-1 text-xs font-semibold capitalize", tones[value] ?? "bg-navy text-white")}>{value.replace(/_/g, " ")}</span>;
}

export function Field({ label, children, className }: { label: string; children: ReactNode; className?: string }) {
  return <label className={cn("block", className)}><span className="mb-1.5 block text-sm font-medium text-white">{label}</span>{children}</label>;
}

export const input = "w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/15";
export const btn = "inline-flex items-center justify-center gap-2 rounded-lg bg-cta px-4 py-2 text-sm font-semibold text-white transition hover:bg-cta-600 disabled:opacity-60";
export const btnGhost = "inline-flex items-center justify-center gap-2 rounded-lg border border-line px-4 py-2 text-sm font-semibold text-white transition hover:border-accent hover:text-accent";

export function Empty({ children }: { children: ReactNode }) {
  return <p className="rounded-xl border border-dashed border-line p-8 text-center text-sm text-muted">{children}</p>;
}

export function Table({ head, children }: { head: string[]; children: ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-line bg-surface shadow-card">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead className="border-b border-line bg-navy text-xs uppercase tracking-wider text-muted">
          <tr>{head.map((h) => <th key={h} scope="col" className="px-4 py-3 font-semibold">{h}</th>)}</tr>
        </thead>
        <tbody className="divide-y divide-line">{children}</tbody>
      </table>
    </div>
  );
}
export const td = "px-4 py-3 align-middle";

/** Collapsible "create" panel using native <details> — no client JS needed. */
export function NewPanel({ label, children }: { label: string; children: ReactNode }) {
  return (
    <details className="group mb-8 rounded-2xl border border-line bg-surface shadow-card">
      <summary className="flex cursor-pointer list-none items-center justify-between px-6 py-4 font-semibold text-white">
        {label}<span className="text-accent transition-transform group-open:rotate-45">＋</span>
      </summary>
      <div className="border-t border-line p-6">{children}</div>
    </details>
  );
}
