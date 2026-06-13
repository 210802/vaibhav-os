"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { BRAIN_NODES, BRAIN_EDGES } from "@/lib/data";
import { Burst, ChapterHead } from "@/components/motion/signature";

const W = 1000;
const H = 620;

export default function Ch03BrainMap() {
  const [hot, setHot] = useState<string | null>(null);
  const reduced = useReducedMotion();

  const px = (n: number) => (n / 100) * W;
  const py = (n: number) => (n / 100) * H;
  const node = (id: string) => BRAIN_NODES.find((n) => n.id === id)!;
  const connected = (id: string) =>
    BRAIN_EDGES.filter(([a, b]) => a === id || b === id).flatMap((e) => e);

  return (
    <section id="brain" className="relative mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-32">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <ChapterHead num="03" eyebrow="The Brain Map" title="EVERYTHING IS CONNECTED" pop="CONNECTED" popTone="steel" />
        <Burst word="WIRED!" tone="steel" />
      </div>
      <p className="mt-6 max-w-xl font-hand text-2xl text-ink/70">
        Hover a node — systems thinking means the edges matter more than the dots.
      </p>

      <motion.div
        initial={{ opacity: 0, y: 40, rotate: -0.6 }}
        whileInView={{ opacity: 1, y: 0, rotate: -0.6 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ type: "spring", stiffness: 120, damping: 16 }}
        className="panel mt-14 overflow-hidden"
      >
        {/* graph title bar like an OS window */}
        <div className="flex items-center gap-2 border-b-[3px] border-ink bg-mute/40 px-4 py-2">
          {["bg-accent", "bg-sun", "bg-steel"].map((c) => (
            <span key={c} className={`h-3 w-3 rounded-full border-2 border-ink ${c}`} />
          ))}
          <span className="ml-2 font-mono text-xs uppercase tracking-[0.3em] text-ink/60">brain_map.graph</span>
        </div>

        <svg viewBox={`0 0 ${W} ${H}`} className="halftone block w-full" role="img" aria-label="Interest graph: AI, systems, finance, automation, products, trading, behavior design, business — all interconnected">
          {/* edges */}
          {BRAIN_EDGES.map(([a, b], i) => {
            const A = node(a);
            const B = node(b);
            const lit = hot === a || hot === b;
            const mx = (px(A.x) + px(B.x)) / 2 + (i % 2 === 0 ? 26 : -26);
            const my = (py(A.y) + py(B.y)) / 2 + (i % 3 === 0 ? -22 : 18);
            return (
              <motion.path
                key={`${a}-${b}`}
                d={`M ${px(A.x)} ${py(A.y)} Q ${mx} ${my} ${px(B.x)} ${py(B.y)}`}
                fill="none"
                stroke={lit ? "rgb(var(--accent))" : "rgb(var(--ink))"}
                strokeWidth={lit ? 4 : 2}
                strokeDasharray={lit ? "0" : "7 9"}
                strokeLinecap="round"
                opacity={hot && !lit ? 0.15 : 0.8}
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.1 + i * 0.06 }}
              />
            );
          })}

          {/* nodes */}
          {BRAIN_NODES.map((n, i) => {
            const lit = hot === n.id || (hot !== null && connected(hot).includes(n.id));
            const dim = hot !== null && !lit;
            const r = 30 * n.size;
            return (
              <motion.g
                key={n.id}
                style={{ transformOrigin: `${px(n.x)}px ${py(n.y)}px` }}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.07, type: "spring", stiffness: 280, damping: 13 }}
                onMouseEnter={() => setHot(n.id)}
                onMouseLeave={() => setHot(null)}
                onFocus={() => setHot(n.id)}
                onBlur={() => setHot(null)}
                tabIndex={0}
                className="cursor-pointer outline-none"
                data-hot
              >
                <motion.g
                  animate={reduced ? undefined : { y: [0, i % 2 === 0 ? -7 : 7, 0] }}
                  transition={{ duration: 4 + (i % 3), repeat: Infinity, ease: "easeInOut" }}
                >
                <circle
                  cx={px(n.x)}
                  cy={py(n.y)}
                  r={r}
                  fill={hot === n.id ? "rgb(var(--accent))" : lit ? "rgb(var(--sun))" : "rgb(var(--paper))"}
                  stroke="rgb(var(--ink))"
                  strokeWidth={4}
                  opacity={dim ? 0.35 : 1}
                />
                {/* hard offset shadow circle */}
                <circle cx={px(n.x) + 4} cy={py(n.y) + 4} r={r} fill="none" stroke="rgb(var(--ink))" strokeWidth={2} opacity={dim ? 0.1 : 0.35} />
                <text
                  x={px(n.x)}
                  y={py(n.y) + 6}
                  textAnchor="middle"
                  fontFamily="var(--font-display)"
                  fontSize={n.size > 1.4 ? 26 : 18}
                  fill={hot === n.id ? "rgb(var(--paper))" : "rgb(var(--ink))"}
                  opacity={dim ? 0.35 : 1}
                  style={{ textTransform: "uppercase", pointerEvents: "none" }}
                >
                  {n.label}
                </text>
                </motion.g>
              </motion.g>
            );
          })}
        </svg>

        <div className="border-t-[3px] border-ink px-4 py-2 font-mono text-xs uppercase tracking-widest text-ink/60">
          {hot ? (
            <span>
              <span className="text-accent">●</span> {node(hot).label} ↔ {connected(hot).filter((x) => x !== hot).length} systems linked
            </span>
          ) : (
            <span>8 nodes / 13 edges / 1 operating system</span>
          )}
        </div>
      </motion.div>
    </section>
  );
}
