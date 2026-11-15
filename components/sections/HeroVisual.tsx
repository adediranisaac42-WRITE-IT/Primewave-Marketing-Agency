"use client";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { BarChart3, CheckCircle2, Mail, ShoppingBag, Users } from "lucide-react";

/**
 * Illustrative product-style visual: analytics, e-commerce, CRM pipeline and automation,
 * connected into one system. Contains no client data or performance claims.
 */
export function HeroVisual() {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rX = useSpring(useTransform(my, [-1, 1], [6, -6]), { stiffness: 80, damping: 20 });
  const rY = useSpring(useTransform(mx, [-1, 1], [-8, 8]), { stiffness: 80, damping: 20 });
  const bars = [38, 52, 44, 63, 58, 74, 69, 86, 80, 94];

  const float = (d: number) =>
    reduce ? {} : { animate: { y: [0, -10, 0] }, transition: { duration: 6, repeat: Infinity, ease: "easeInOut" as const, delay: d } };

  return (
    <motion.div
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
        my.set(((e.clientY - r.top) / r.height) * 2 - 1);
      }}
      onPointerLeave={() => { mx.set(0); my.set(0); }}
      style={reduce ? undefined : { rotateX: rX, rotateY: rY, transformPerspective: 1400 }}
      className="relative mx-auto aspect-[5/4] w-full max-w-[620px]"
      aria-hidden
    >
      {/* Connection lines */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 500 400" fill="none">
        <defs>
          <linearGradient id="ln" x1="0" x2="1"><stop stopColor="#FF7A30" stopOpacity=".1" /><stop offset=".5" stopColor="#FF7A30" /><stop offset="1" stopColor="#FF7A30" stopOpacity=".1" /></linearGradient>
        </defs>
        {["M110 300 C 180 260, 200 220, 250 200", "M390 90 C 340 130, 300 170, 250 200", "M400 320 C 340 290, 300 240, 250 200"].map((d, i) => (
          <motion.path key={d} d={d} stroke="url(#ln)" strokeWidth="1.5" strokeDasharray="4 6"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.6, delay: 0.8 + i * 0.2 }} />
        ))}
      </svg>

      {/* Main analytics panel */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="glass absolute left-[12%] top-[14%] w-[66%] rounded-3xl p-5 shadow-2xl shadow-black/40"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent/20 text-accent"><BarChart3 className="h-4 w-4" /></span>
            <div>
              <p className="text-[11px] uppercase tracking-widest text-white/40">Growth overview</p>
              <p className="text-sm font-semibold text-white">Revenue trend</p>
            </div>
          </div>
          <div className="flex gap-1">{[0, 1, 2].map((i) => <span key={i} className="h-1.5 w-1.5 rounded-full bg-white/20" />)}</div>
        </div>
        <div className="mt-6 flex h-32 items-end gap-2">
          {bars.map((h, i) => (
            <motion.span key={i} className="flex-1 rounded-t-md bg-gradient-to-t from-accent/40 to-accent"
              initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ duration: 0.9, delay: 0.9 + i * 0.06, ease: [0.22, 1, 0.36, 1] }} />
          ))}
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {["Traffic", "Conversion", "Retention"].map((l) => (
            <div key={l} className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2">
              <p className="text-[10px] uppercase tracking-wider text-white/40">{l}</p>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/10">
                <motion.div className="h-full rounded-full bg-accent" initial={{ width: 0 }} animate={{ width: "70%" }} transition={{ duration: 1.2, delay: 1.4 }} />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Store card */}
      <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.9 }} className="absolute bottom-[6%] left-0 w-[42%]">
        <motion.div {...float(0)} className="glass rounded-2xl p-4 shadow-xl shadow-black/30">
          <div className="flex items-center gap-2 text-white">
            <ShoppingBag className="h-4 w-4 text-accent" /><span className="text-xs font-semibold">Online store</span>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-1.5">
            {[0, 1, 2].map((i) => <div key={i} className="aspect-square rounded-lg bg-gradient-to-br from-white/15 to-white/[0.03]" />)}
          </div>
          <div className="mt-3 flex items-center justify-between rounded-lg bg-accent px-3 py-2 text-[11px] font-semibold text-deep">
            Checkout <span>→</span>
          </div>
        </motion.div>
      </motion.div>

      {/* CRM pipeline */}
      <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 1.1 }} className="absolute right-0 top-0 w-[40%]">
        <motion.div {...float(1.5)} className="glass rounded-2xl p-4 shadow-xl shadow-black/30">
          <div className="flex items-center gap-2 text-white"><Users className="h-4 w-4 text-accent" /><span className="text-xs font-semibold">CRM pipeline</span></div>
          <div className="mt-3 space-y-2">
            {["New lead", "Qualified", "Proposal", "Won"].map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${i === 3 ? "bg-accent" : "bg-white/25"}`} />
                <span className="text-[11px] text-white/70">{s}</span>
                <span className="ml-auto h-1 rounded-full bg-white/15" style={{ width: `${30 + i * 10}%` }} />
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Automation */}
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 1.3 }} className="absolute bottom-[2%] right-[2%] w-[40%]">
        <motion.div {...float(3)} className="glass rounded-2xl p-4 shadow-xl shadow-black/30">
          <div className="flex items-center gap-2 text-white"><Mail className="h-4 w-4 text-accent" /><span className="text-xs font-semibold">Email automation</span></div>
          <ul className="mt-3 space-y-1.5">
            {["Welcome flow", "Abandoned cart", "Post-purchase"].map((f) => (
              <li key={f} className="flex items-center gap-2 text-[11px] text-white/70"><CheckCircle2 className="h-3.5 w-3.5 text-accent" />{f}</li>
            ))}
          </ul>
        </motion.div>
      </motion.div>

      {/* Hub */}
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 1.6 }}
        className="absolute left-1/2 top-1/2 grid h-4 w-4 -translate-x-1/2 -translate-y-1/2 place-items-center">
        <span className="absolute h-10 w-10 animate-ping rounded-full bg-accent/20" />
        <span className="h-3 w-3 rounded-full bg-accent shadow-glow" />
      </motion.div>
    </motion.div>
  );
}
