"use client";
import dynamic from "next/dynamic";
import { Component, useEffect, useRef, useState, type ReactNode } from "react";

// three.js is only downloaded when the scene is actually shown.
const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false, loading: () => null });

class SceneBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? this.props.fallback : this.props.children; }
}

function canUseWebGL() {
  try {
    const c = document.createElement("canvas");
    return Boolean(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

const Fallback = () => (
  <div className="absolute inset-[12%] rounded-full bg-[radial-gradient(circle,rgba(255,122,48,.28),transparent_65%)]" />
);

/**
 * Decorative 3D layer behind the hero cards. Shown only on desktop, with WebGL,
 * when the visitor hasn't asked for reduced motion or data saving. Rendering
 * stops while the hero is off screen. Any failure falls back to a static glow.
 */
export function HeroCanvas() {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
    setEnabled(desktop && !reduce && !saveData && canUseWebGL());
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute -inset-[12%] -z-10">
      {enabled ? (
        <SceneBoundary fallback={<Fallback />}>
          <HeroScene active={visible} />
        </SceneBoundary>
      ) : (
        <Fallback />
      )}
    </div>
  );
}
