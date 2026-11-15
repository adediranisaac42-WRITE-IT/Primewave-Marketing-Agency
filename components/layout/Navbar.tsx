"use client";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ctas, nav } from "@/lib/site";
import { services } from "@/lib/data/services";
import { Logo } from "@/components/ui/Logo";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mega, setMega] = useState(false);
  const [mobile, setMobile] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useMotionValueEvent(scrollY, "change", (v) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(v > 24);
    setHidden(v > prev && v > 400 && !mega && !mobile);
  });

  useEffect(() => { setMobile(false); setMega(false); }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = mobile ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && (setMobile(false), setMega(false));
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobile]);

  // Transparent over dark heroes; solid once scrolled.
  const solid = scrolled || mega;
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  const openMega = () => { clearTimeout(closeTimer.current); setMega(true); };
  const closeMega = () => { closeTimer.current = setTimeout(() => setMega(false), 120); };

  return (
    <>
      <motion.header
        animate={{ y: hidden ? "-110%" : "0%" }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div className={cn("transition-all duration-500", solid ? "border-b border-white/10 bg-navy/85 backdrop-blur-xl" : "bg-transparent")}>
          <nav aria-label="Main" className="container flex h-20 items-center justify-between">
            <Logo dark />
            <ul className="hidden items-center gap-1 lg:flex">
              {nav.map((item) =>
                "mega" in item && item.mega ? (
                  <li key={item.href} onMouseEnter={openMega} onMouseLeave={closeMega}>
                    <button
                      aria-expanded={mega}
                      aria-controls="mega-menu"
                      onClick={() => setMega((m) => !m)}
                      className={cn("flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors", isActive(item.href) ? "text-white" : "text-white/70 hover:text-white")}
                    >
                      {item.label}
                      <ChevronDown className={cn("h-4 w-4 transition-transform", mega && "rotate-180")} />
                    </button>
                  </li>
                ) : (
                  <li key={item.href}>
                    <Link href={item.href} className={cn("relative rounded-full px-4 py-2 text-sm font-medium transition-colors", isActive(item.href) ? "text-white" : "text-white/70 hover:text-white")}>
                      {item.label}
                      {isActive(item.href) && (
                        <motion.span layoutId="nav-dot" className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent" />
                      )}
                    </Link>
                  </li>
                )
              )}
            </ul>
            <div className="flex items-center gap-3">
              <Button href={ctas.call.href} variant="secondary" arrow={false} className="hidden !px-5 !py-2.5 text-sm xl:inline-flex">{ctas.call.label}</Button>
              <Button href={ctas.project.href} className="hidden !px-5 !py-2.5 text-sm sm:inline-flex">{ctas.project.label}</Button>
              <button aria-label="Open menu" aria-expanded={mobile} onClick={() => setMobile(true)} className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white lg:hidden">
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </nav>

          <AnimatePresence>
            {mega && (
              <motion.div
                id="mega-menu"
                onMouseEnter={openMega}
                onMouseLeave={closeMega}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="hidden border-t border-white/10 lg:block"
              >
                <div className="container grid grid-cols-12 gap-8 py-10">
                  <div className="col-span-4 rounded-3xl bg-brand-gradient p-8 text-white">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">Our Services</p>
                    <p className="mt-4 font-display text-2xl font-bold leading-snug">Integrated solutions for digital growth.</p>
                    <Link href="/services" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold">
                      View all services <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                  <ul className="col-span-8 grid grid-cols-2 gap-2">
                    {services.map((s) => (
                      <li key={s.slug}>
                        <Link href={s.href} className="group flex gap-4 rounded-2xl p-4 transition-colors hover:bg-white/5">
                          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/10 text-accent transition-colors group-hover:bg-accent group-hover:text-deep">
                            <Icon name={s.icon} className="h-5 w-5" />
                          </span>
                          <span>
                            <span className="block font-semibold text-white">{s.title}</span>
                            <span className="mt-1 line-clamp-2 block text-sm text-white/55">{s.short}</span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobile && (
          <motion.div className="fixed inset-0 z-[60] lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-navy-950/60 backdrop-blur-sm" onClick={() => setMobile(false)} />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col overflow-y-auto bg-navy px-6 pb-8"
            >
              <div className="flex h-20 items-center justify-between">
                <Logo dark />
                <button aria-label="Close menu" onClick={() => setMobile(false)} className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <ul className="mt-6 space-y-1">
                {nav.map((item, i) => (
                  <motion.li key={item.href} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.05 }}>
                    <Link href={item.href} className={cn("block rounded-xl px-3 py-3 font-display text-2xl font-semibold", isActive(item.href) ? "text-accent" : "text-white")}>
                      {item.label}
                    </Link>
                    {"mega" in item && item.mega && (
                      <ul className="mb-2 ml-3 border-l border-white/10 pl-4">
                        {services.map((s) => (
                          <li key={s.slug}><Link href={s.href} className="block py-2 text-[15px] text-white/65">{s.title}</Link></li>
                        ))}
                      </ul>
                    )}
                  </motion.li>
                ))}
              </ul>
              <div className="mt-auto grid gap-3 pt-8">
                <Button href={ctas.project.href} className="w-full">{ctas.project.label}</Button>
                <Button href={ctas.call.href} variant="secondary" arrow={false} className="w-full">{ctas.call.label}</Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
