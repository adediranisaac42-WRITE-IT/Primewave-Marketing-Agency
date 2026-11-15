"use client";
import { motion, useReducedMotion } from "framer-motion";
import { createElement } from "react";

/** Word-by-word masked reveal. Screen readers get the full sentence via aria-label. */
export function TextReveal({
  text, as = "h2", className, delay = 0, highlight = [],
}: { text: string; as?: "h1" | "h2" | "h3" | "p"; className?: string; delay?: number; highlight?: string[] }) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  return createElement(
    as,
    { className, "aria-label": text },
    words.map((word, i) => {
      const hl = highlight.includes(word.replace(/[.,]/g, ""));
      return (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <motion.span
            className={`inline-block ${hl ? "text-gradient" : ""}`}
            initial={reduce ? false : { y: "110%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: delay + i * 0.045, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      );
    })
  );
}
