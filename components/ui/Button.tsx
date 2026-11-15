import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "light";

const styles: Record<Variant, string> = {
  primary: "bg-accent text-deep shadow-[0_8px_24px_-8px_rgba(255,122,48,.6)] hover:bg-accent-600",
  secondary: "border border-white/20 text-white hover:border-white/40 hover:bg-white/5",
  ghost: "border border-line text-white hover:border-accent hover:text-accent",
  light: "bg-white text-deep hover:bg-white/90",
};

export function Button({
  href, children, variant = "primary", className, arrow = true, type, onClick, disabled,
}: {
  href?: string; children: ReactNode; variant?: Variant; className?: string; arrow?: boolean;
  type?: "button" | "submit"; onClick?: () => void; disabled?: boolean;
}) {
  const cls = cn(
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3.5 text-[15px] font-semibold transition-all duration-300 disabled:opacity-60",
    styles[variant],
    className
  );
  const inner = (
    <>
      <span className="relative z-10">{children}</span>
      {arrow && (
        <span className="relative z-10 grid h-5 w-5 place-items-center overflow-hidden">
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-5 group-hover:translate-x-5" />
          <ArrowUpRight className="absolute h-4 w-4 -translate-x-5 translate-y-5 transition-transform duration-300 group-hover:translate-x-0 group-hover:translate-y-0" />
        </span>
      )}
    </>
  );
  if (href) return <Link href={href} className={cls}>{inner}</Link>;
  return <button type={type ?? "button"} onClick={onClick} disabled={disabled} className={cls}>{inner}</button>;
}
