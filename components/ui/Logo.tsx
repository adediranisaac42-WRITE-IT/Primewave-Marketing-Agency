import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ dark = false, className }: { dark?: boolean; className?: string }) {
  return (
    <Link href="/" aria-label="Primewave Marketing Agency — home" className={cn("flex items-center gap-2.5", className)}>
      <Image src="/images/primewave-logo-mark.webp" alt="" width={44} height={42} priority className="h-10 w-auto drop-shadow-[0_0_12px_rgba(37,99,235,.35)]" />
      <span className="leading-none">
        <span className={cn("block font-display text-[17px] font-extrabold tracking-tight", dark ? "text-white" : "text-white")}>
          Primewave
        </span>
        <span className={cn("block text-[9.5px] font-semibold uppercase tracking-[0.28em]", dark ? "text-accent" : "text-accent")}>
          Marketing Agency
        </span>
      </span>
    </Link>
  );
}
