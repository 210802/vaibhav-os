"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useTheme } from "next-themes";
import { CHAPTERS, FOUNDER } from "@/lib/data";

/* -----------------------------------------------------------------------
   Preloader — the OS boot screen. Name slams in, comic loading bar fills,
   microcopy rotates, then the whole screen wipes upward like a page turn.
----------------------------------------------------------------------- */
const BOOT_LINES = ["booting founder os…", "mounting systems…", "loading products…", "compounding leverage…"];

export function Preloader() {
  const [done, setDone] = useState(false);
  const [line, setLine] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      setDone(true);
      return;
    }
    const lineTimer = setInterval(() => setLine((l) => (l + 1) % BOOT_LINES.length), 520);
    const doneTimer = setTimeout(() => setDone(true), 2100);
    return () => {
      clearInterval(lineTimer);
      clearTimeout(doneTimer);
    };
  }, [reduced]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-paper"
          exit={{ y: "-100%", transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } }}
          aria-label="Loading"
        >
          <motion.h1
            initial={{ scale: 0.4, rotate: -8, opacity: 0 }}
            animate={{ scale: 1, rotate: -3, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 13 }}
            className="knockout text-5xl text-accent sm:text-6xl md:text-8xl"
          >
            {FOUNDER.name.split(" ")[0]}!
          </motion.h1>

          {/* segmented comic loading bar */}
          <div className="flex h-5 w-56 gap-1 border-[3px] border-ink bg-paper p-[3px] shadow-panel-sm">
            {Array.from({ length: 10 }).map((_, i) => (
              <motion.span
                key={i}
                className="h-full flex-1 bg-accent"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: 0.15 + i * 0.16, duration: 0.12 }}
                style={{ originY: 1 }}
              />
            ))}
          </div>

          <p className="font-mono text-xs uppercase tracking-[0.3em] text-ink/60" aria-live="polite">
            {BOOT_LINES[line]}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* -----------------------------------------------------------------------
   CursorTrail — a small ink dot with a lagging ring; ring "inks up" over
   interactive elements. Desktop pointer only.
----------------------------------------------------------------------- */
export function CursorTrail() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hot, setHot] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    setEnabled(true);
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      const t = e.target as HTMLElement;
      setHot(!!t.closest("a, button, [data-hot]"));
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [reduced]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[90] hidden md:block">
      <motion.div
        className="absolute h-2 w-2 rounded-full bg-accent"
        animate={{ x: pos.x - 4, y: pos.y - 4 }}
        transition={{ type: "tween", duration: 0 }}
      />
      <motion.div
        className="absolute h-9 w-9 rounded-full border-2 border-ink"
        animate={{
          x: pos.x - 18,
          y: pos.y - 18,
          scale: hot ? 1.7 : 1,
          backgroundColor: hot ? "rgba(255, 210, 63, 0.35)" : "rgba(0,0,0,0)",
        }}
        transition={{ type: "spring", stiffness: 380, damping: 26, mass: 0.6 }}
      />
    </div>
  );
}

/* -----------------------------------------------------------------------
   ChapterRail — appears after the hero; a slim OS-style chapter index
----------------------------------------------------------------------- */
export function ChapterRail() {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState("boot");

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -50% 0px" }
    );
    CHAPTERS.forEach((c) => {
      const el = document.getElementById(c.id);
      if (el) obs.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      obs.disconnect();
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ x: 60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 60, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 22 }}
          className="fixed right-4 top-1/2 z-[70] hidden -translate-y-1/2 flex-col gap-1 lg:flex"
          aria-label="Chapters"
        >
          {CHAPTERS.map((c) => (
            <a
              key={c.id}
              href={`#${c.id}`}
              className={`group flex items-center justify-end gap-2 py-0.5 font-mono text-[10px] uppercase tracking-widest transition-colors ${
                active === c.id ? "text-accent" : "text-ink/40 hover:text-ink"
              }`}
            >
              <span className="opacity-0 transition-opacity group-hover:opacity-100">{c.label}</span>
              <span
                className={`block border border-ink/40 px-1 ${
                  active === c.id ? "bg-accent text-paper shadow-panel-sm border-ink" : "bg-paper/60"
                }`}
              >
                {c.num}
              </span>
            </a>
          ))}
        </motion.nav>
      )}
    </AnimatePresence>
  );
}

/* -----------------------------------------------------------------------
   ThemeToggle — sun/moon flip switch, panel-styled
----------------------------------------------------------------------- */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const dark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(dark ? "light" : "dark")}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="panel panel-press fixed right-4 top-4 z-[70] flex h-11 w-11 -rotate-2 items-center justify-center"
      data-hot
    >
      {!mounted ? (
        <span className="h-5 w-5 rounded-full border-2 border-ink" />
      ) : dark ? (
        /* sun */
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-sun stroke-ink" strokeWidth={1.6}>
          <circle cx="12" cy="12" r="5" />
          <g strokeLinecap="round">
            {Array.from({ length: 8 }).map((_, i) => {
              const a = (Math.PI * i) / 4;
              return (
                <line
                  key={i}
                  x1={12 + 7.5 * Math.cos(a)}
                  y1={12 + 7.5 * Math.sin(a)}
                  x2={12 + 10 * Math.cos(a)}
                  y2={12 + 10 * Math.sin(a)}
                />
              );
            })}
          </g>
        </svg>
      ) : (
        /* moon */
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-steel stroke-ink" strokeWidth={1.6}>
          <path d="M20 13.5A8.5 8.5 0 1 1 10.5 4a7 7 0 0 0 9.5 9.5z" />
        </svg>
      )}
    </button>
  );
}
