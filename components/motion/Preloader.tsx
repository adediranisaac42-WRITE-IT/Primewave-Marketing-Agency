"use client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

/** Brief branded intro shown once per session. Skipped entirely for reduced-motion users. */
export function Preloader() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seen = false;
    try { seen = sessionStorage.getItem("pw-intro") === "1"; } catch {}
    if (reduce || seen) return;
    setShow(true);
    try { sessionStorage.setItem("pw-intro", "1"); } catch {}
    const t = setTimeout(() => setShow(false), 1400);
    return () => clearTimeout(t);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-deep"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="flex flex-col items-center gap-5">
            <Image src="/images/primewave-mark.png" alt="" width={64} height={64} priority />
            <div className="h-px w-40 overflow-hidden bg-white/10">
              <motion.div className="h-full bg-brand-gradient" initial={{ x: "-100%" }} animate={{ x: "0%" }} transition={{ duration: 1.1, ease: "easeInOut" }} />
            </div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/60">Strategy. Innovation. Growth.</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
