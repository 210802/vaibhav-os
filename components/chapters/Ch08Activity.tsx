"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { REPOS, COMMITS, FOUNDER } from "@/lib/data";
import { CountUp, PanelIn } from "@/components/motion/primitives";
import { Burst, ChapterHead, SquiggleWire } from "@/components/motion/signature";

/* Deterministic pseudo-random so server/client render the same streak field */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default function Ch08Activity() {
  const weeks = 26;
  const days = 7;

  const field = useMemo(() => {
    const rnd = mulberry32(210802);
    return Array.from({ length: weeks * days }, () => {
      const v = rnd();
      return v > 0.82 ? 3 : v > 0.55 ? 2 : v > 0.3 ? 1 : 0;
    });
  }, []);

  const level = ["bg-mute/40", "bg-steel/60", "bg-steel", "bg-accent"];

  return (
    <section id="activity" className="relative mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-32">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <ChapterHead num="08" eyebrow="GitHub & Build Activity" title="THE PROOF IS IN THE COMMITS" pop="COMMITS" popTone="steel" />
        <Burst word="PUSH!" tone="steel" />
      </div>

      <div className="mt-14 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        {/* streak field as halftone ink */}
        <PanelIn tilt={-0.6} className="panel p-5 md:p-7">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="font-mono text-xs font-bold uppercase tracking-[0.3em]">build_streaks / last {weeks} weeks</h3>
            <a
              href={FOUNDER.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs font-bold uppercase tracking-widest text-accent underline decoration-2 underline-offset-4"
              data-hot
            >
              github ↗
            </a>
          </div>

          <div
            className="mt-5 grid gap-[5px]"
            style={{ gridTemplateColumns: `repeat(${weeks}, minmax(0,1fr))`, gridAutoFlow: "column", gridTemplateRows: `repeat(${days}, minmax(0,1fr))` }}
            role="img"
            aria-label="Stylized contribution streak grid"
          >
            {field.map((v, i) => (
              <motion.span
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: (i % weeks) * 0.02 + Math.floor(i / weeks) * 0.01, type: "spring", stiffness: 380, damping: 18 }}
                whileHover={{ scale: 1.6, rotate: 12 }}
                className={`aspect-square border border-ink/60 ${level[v]}`}
              />
            ))}
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3 border-t-[3px] border-ink pt-5 text-center">
            {[
              { n: 142, l: "day longest streak" },
              { n: 1240, l: "commits this year" },
              { n: 3, l: "products launched" },
            ].map((m) => (
              <div key={m.l}>
                <div className="font-display text-3xl text-accent md:text-4xl">
                  <CountUp to={m.n} />
                </div>
                <div className="mt-1 font-mono text-xs uppercase tracking-widest text-ink/70">{m.l}</div>
              </div>
            ))}
          </div>
        </PanelIn>

        {/* repos + commit ticker */}
        <div className="space-y-6">
          <PanelIn tilt={0.8} delay={0.1} className="panel p-5">
            <h3 className="font-mono text-xs font-bold uppercase tracking-[0.3em]">repositories</h3>
            <ul className="mt-4 space-y-3">
              {REPOS.map((r, i) => (
                <motion.li
                  key={r.name}
                  initial={{ x: 24, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center justify-between gap-3 border-2 border-ink bg-paper px-3 py-2 shadow-panel-sm"
                >
                  <div>
                    <span className="font-mono text-sm font-bold">{r.name}</span>
                    <p className="text-xs text-ink/60">{r.desc}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-xs text-steel">{r.lang}</span>
                    <p className={`font-mono text-xs font-bold uppercase ${r.state === "private" ? "text-ink/60" : "text-accent"}`}>
                      {r.state}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </PanelIn>

          <PanelIn tilt={-0.8} delay={0.2} className="panel scanlines overflow-hidden p-0">
            <div className="border-b-[3px] border-ink bg-ink px-4 py-2 font-mono text-xs uppercase tracking-[0.3em] text-paper">
              git log --recent
            </div>
            <ul className="space-y-2 p-4">
              {COMMITS.map((c, i) => (
                <motion.li
                  key={c}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.18 }}
                  className="flex gap-2 font-mono text-xs leading-snug"
                >
                  <span className="text-accent">+</span>
                  <span className="text-ink/80">{c}</span>
                </motion.li>
              ))}
              <li className="animate-blink font-mono text-xs text-steel">▮</li>
            </ul>
          </PanelIn>
        </div>
      </div>

      <SquiggleWire variant={2} className="mt-20" />
    </section>
  );
}
