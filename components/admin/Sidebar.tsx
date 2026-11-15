"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Bell, Briefcase, CalendarDays, Columns3, Inbox, LogOut, Users, ExternalLink } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Overview", icon: BarChart3 },
  { href: "/admin/leads", label: "Leads", icon: Inbox },
  { href: "/admin/clients", label: "Clients", icon: Users },
  { href: "/admin/pipeline", label: "Sales Pipeline", icon: Columns3 },
  { href: "/admin/consultations", label: "Consultations", icon: CalendarDays },
  { href: "/admin/projects", label: "Projects", icon: Briefcase },
  { href: "/admin/reminders", label: "Reminders", icon: Bell },
];

export function Sidebar({ email, signOut }: { email: string; signOut: () => Promise<void> }) {
  const path = usePathname();
  return (
    <aside className="flex flex-col bg-surface text-white lg:fixed lg:inset-y-0 lg:w-64">
      <div className="flex items-center gap-2.5 px-6 py-6">
        <Image src="/images/primewave-logo-mark.png" alt="" width={32} height={32} />
        <div><p className="font-display font-bold leading-none">Primewave</p><p className="text-[10px] uppercase tracking-[0.25em] text-accent">Admin CRM</p></div>
      </div>
      <nav aria-label="Admin" className="flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-1 lg:flex-col lg:overflow-visible">
        {links.map(({ href, label, icon: I }) => {
          const active = href === "/admin" ? path === "/admin" : path.startsWith(href);
          return (
            <Link key={href} href={href} className={cn("flex shrink-0 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition", active ? "bg-accent text-white" : "text-white/65 hover:bg-white/5 hover:text-white")}>
              <I className="h-4 w-4" />{label}
            </Link>
          );
        })}
      </nav>
      <div className="hidden border-t border-white/10 p-4 lg:block">
        <Link href="/" target="_blank" className="mb-3 flex items-center gap-2 text-xs text-white/50 hover:text-white"><ExternalLink className="h-3.5 w-3.5" />View website</Link>
        <p className="truncate text-xs text-white/50">{email}</p>
        <form action={signOut}><button className="mt-2 flex items-center gap-2 text-sm text-white/80 hover:text-white"><LogOut className="h-4 w-4" />Sign out</button></form>
      </div>
    </aside>
  );
}
