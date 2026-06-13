"use client";

import { motion, useReducedMotion } from "framer-motion";
import { PRODUCTS } from "@/lib/data";
import { PanelIn, Magnetic } from "@/components/motion/primitives";
import { Burst, ChapterHead, SquiggleWire } from "@/components/motion/signature";

const accentBg: Record<string, string> = {
  accent: "bg-accent text-paper",
  steel: "bg-steel text-paper",
  sun: "bg-sun text-ink",
};
const accentText: Record<string, string> = {
  accent: "text-accent",
  steel: "text-steel",
  sun: "text-ink",
};

/* Animated architecture flow: stages connected by dash-marching wires */
function FlowDiagram({ stages, tone }: { stages: readonly string[]; tone: string }) {
  const reduced = useReducedMotion();
  return (
    <div className="relative mt-4">
      <div className="overflow-x-auto no-scrollbar">
      <svg viewBox={`0 0 ${stages.length * 150} 84`} className="h-20 w-full min-w-[460px]" aria-label={`Architecture: ${stages.join(" → ")}`}>
        {stages.map((s, i) => (
          <g key={s}>
            {i < stages.length - 1 && (
              <motion.line
                x1={i * 150 + 122}
                y1={42}
                x2={(i + 1) * 150 + 8}
                y2={42}
                stroke="rgb(var(--ink))"
                strokeWidth={3}
                strokeDasharray="6 7"
                initial={{ strokeDashoffset: 0 }}
                animate={reduced ? undefined : { strokeDashoffset: [-52, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
              />
            )}
            <motion.g
              initial={{ scale: 0, rotate: -4 }}
              whileInView={{ scale: 1, rotate: i % 2 === 0 ? -1.5 : 1.5 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, type: "spring", stiffness: 260, damping: 13 }}
              style={{ transformOrigin: `${i * 150 + 65}px 42px` }}
            >
              <rect x={i * 150 + 10} y={20} width={112} height={44} fill="rgb(var(--paper))" stroke="rgb(var(--ink))" strokeWidth={3} />
              <rect x={i * 150 + 14} y={24} width={112} height={44} fill="none" stroke="rgb(var(--ink))" strokeWidth={1.5} opacity={0.3} />
              <text x={i * 150 + 66} y={47} textAnchor="middle" fontFamily="var(--font-mono)" fontWeight={700} fontSize={13} fill="rgb(var(--ink))">
                {s.toUpperCase()}
              </text>
              <circle cx={i * 150 + 20} cy={30} r={3.5} fill={tone === "steel" ? "rgb(var(--steel))" : tone === "sun" ? "rgb(var(--sun))" : "rgb(var(--accent))"} stroke="rgb(var(--ink))" strokeWidth={1.5} />
            </motion.g>
          </g>
        ))}
      </svg>
      </div>{/* end overflow-x-auto */}
      {/* fade-right scroll affordance, mobile only */}
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-paper to-transparent md:hidden" />
    </div>
  );
}

export default function Ch04Products() {
  return (
    <section id="products" className="relative mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-32">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <ChapterHead num="04" eyebrow="The Products" title="NOT PROJECTS. COMPANIES." pop="COMPANIES." />
        <Burst word="SHIP!" />
      </div>
      <p className="mt-6 max-w-xl font-hand text-2xl text-ink/70">
        Three case studies. Each one started as a problem that wouldn&rsquo;t leave me alone.
      </p>

      <div className="mt-16 space-y-20">
        {PRODUCTS.map((p, idx) => (
          <PanelIn key={p.id} tilt={idx % 2 === 0 ? -0.8 : 0.8} className="panel relative p-0">
            {/* case-study header bar */}
            <div className={`flex flex-wrap items-center justify-between gap-3 border-b-[3px] border-ink px-5 py-3 md:px-8 ${accentBg[p.accent]}`}>
              <span className="font-mono text-xs font-bold uppercase tracking-[0.3em]">{p.kicker}</span>
              <span className="border-2 border-ink bg-paper px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-widest text-ink">
                {p.status === "live" ? "● LIVE" : p.status === "open" ? "◆ OPEN SOURCE" : "■ CURRENTLY PRIVATE"}
              </span>
            </div>

            <div className="grid gap-8 p-5 md:grid-cols-[1fr_1fr] md:gap-12 md:p-8">
              {/* left: narrative */}
              <div>
                <h3 className={`knockout break-words text-3xl sm:text-4xl md:text-7xl ${accentText[p.accent]}`}>{p.name}</h3>
                <p className="mt-3 font-hand text-2xl text-ink/80">{p.tagline}</p>

                <div className="mt-8 space-y-6">
                  <div>
                    <h4 className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">The problem</h4>
                    <p className="mt-2 leading-relaxed text-ink/80">{p.problem}</p>
                  </div>
                  <div>
                    <h4 className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-steel">The insight</h4>
                    <p className="mt-2 leading-relaxed text-ink/80">
                      <span className="hl font-medium text-ink">{p.insight}</span>
                    </p>
                  </div>
                  <div>
                    <h4 className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-ink/60">The vision</h4>
                    <p className="mt-2 leading-relaxed text-ink/80">{p.vision}</p>
                  </div>
                </div>

                <div className="mt-8">
                  {p.cta.href ? (
                    <Magnetic>
                      <a
                        href={p.cta.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`panel panel-press inline-flex -rotate-1 items-center gap-2 px-5 py-3 font-display text-lg uppercase tracking-wide ${accentText[p.accent]}`}
                        data-hot
                      >
                        {p.cta.label} <span aria-hidden>↗</span>
                      </a>
                    </Magnetic>
                  ) : (
                    <span className="inline-flex -rotate-1 items-center gap-2 border-[3px] border-dashed border-ink/50 px-5 py-3 font-display text-lg uppercase tracking-wide text-ink/50">
                      {p.cta.label} <span aria-hidden>🔒</span>
                    </span>
                  )}
                </div>
              </div>

              {/* right: system view */}
              <div className="space-y-6">
                {/* pillars as crate labels */}
                <div className="flex flex-wrap gap-3">
                  {p.pillars.map((pl, i) => (
                    <motion.span
                      key={pl}
                      initial={{ scale: 0, rotate: -8 }}
                      whileInView={{ scale: 1, rotate: i % 2 === 0 ? -2 : 2 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.1, type: "spring", stiffness: 280, damping: 14 }}
                      className="border-2 border-ink bg-paper px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-wider shadow-panel-sm"
                    >
                      {pl}
                    </motion.span>
                  ))}
                </div>

                {/* architecture flow */}
                <div className="border-[3px] border-ink bg-paper">
                  <div className="border-b-[3px] border-ink px-4 py-2 font-mono text-xs uppercase tracking-[0.3em] text-ink/70">
                    system_design.flow
                  </div>
                  <div className="halftone px-3 pb-3">
                    <FlowDiagram stages={p.architecture} tone={p.accent} />
                  </div>
                </div>

                {/* product-specific visual */}
                {p.id === "lifeos" && <LifeOSMock />}
                {p.id === "pragma" && <PragmaRiskMock />}
                {p.id === "lumiere" && <LumiereMock />}
              </div>
            </div>
          </PanelIn>
        ))}
      </div>

      <SquiggleWire variant={1} flip className="mt-20" />
    </section>
  );
}

/* --- LifeOS: habit-loop screenshot-style mock --- */
function LifeOSMock() {
  const habits = [
    { name: "Deep work block", done: 5 },
    { name: "Train", done: 4 },
    { name: "Ship something", done: 6 },
  ];
  return (
    <div className="panel -rotate-1 p-4" aria-label="LifeOS interface mockup">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-ink/70">lifeos / this week</p>
      <div className="mt-3 space-y-3">
        {habits.map((h, i) => (
          <div key={h.name}>
            <div className="flex justify-between font-mono text-xs">
              <span>{h.name}</span>
              <span className="text-accent">{h.done}/7</span>
            </div>
            <div className="mt-1 flex gap-1">
              {Array.from({ length: 7 }).map((_, d) => (
                <motion.span
                  key={d}
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.15 + d * 0.05 }}
                  className={`h-4 flex-1 border-2 border-ink ${d < h.done ? "bg-accent" : "bg-mute/50"}`}
                  style={{ originY: 1 }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-3 font-hand text-lg text-ink/70">identity: someone who ships daily ✓</p>
    </div>
  );
}

/* --- PRAGMA: risk monitoring pulse mock --- */
function PragmaRiskMock() {
  const reduced = useReducedMotion();
  return (
    <div className="panel rotate-1 p-4" aria-label="PRAGMA risk monitoring mockup">
      <div className="flex items-center justify-between">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-ink/70">pragma / portfolio pulse</p>
        <span className="flex items-center gap-1.5 font-mono text-[10px] font-bold text-steel">
          <span className="h-2 w-2 animate-blink rounded-full bg-steel" /> MONITORING
        </span>
      </div>
      <svg viewBox="0 0 300 80" className="mt-3 w-full">
        <motion.path
          d="M0 50 L30 48 L55 52 L80 40 L105 44 L130 30 L155 46 L180 24 L205 38 L230 18 L255 34 L280 26 L300 30"
          fill="none"
          stroke="rgb(var(--steel))"
          strokeWidth={3}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
        />
        <motion.circle
          cx={180}
          cy={24}
          r={6}
          fill="rgb(var(--accent))"
          stroke="rgb(var(--ink))"
          strokeWidth={2}
          animate={reduced ? undefined : { scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        />
        <text x={192} y={20} fontFamily="var(--font-mono)" fontSize={10} fontWeight={700} fill="rgb(var(--accent))">
          EARLY WARNING
        </text>
      </svg>
      <div className="mt-2 grid grid-cols-3 gap-2 font-mono text-[10px]">
        {[
          ["TRACKED", "1.2K loans"],
          ["SIGNALS/DAY", "84K"],
          ["FLAGGED", "0.9%"],
        ].map(([k, v]) => (
          <div key={k} className="border-2 border-ink p-1.5 text-center">
            <div className="text-ink/50">{k}</div>
            <div className="font-bold">{v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* --- Lumiere: private pipeline mock --- */
function LumiereMock() {
  const steps = ["raw_cut_017.mp4", "auto-cut: 41 trims applied", "review queue: 2 pending", "publish: scheduled 09:00"];
  return (
    <div className="panel -rotate-1 p-4" aria-label="Lumiere Studio pipeline mockup">
      <div className="flex items-center justify-between">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-ink/70">lumiere / pipeline</p>
        <span className="border-2 border-ink bg-sun px-1.5 font-mono text-[10px] font-bold text-ink">PRIVATE</span>
      </div>
      <ul className="mt-3 space-y-2">
        {steps.map((s, i) => (
          <motion.li
            key={s}
            initial={{ x: -16, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 + i * 0.14 }}
            className="flex items-center gap-2 font-mono text-xs"
          >
            <span className={`h-2.5 w-2.5 border-2 border-ink ${i < 2 ? "bg-steel" : i === 2 ? "bg-sun" : "bg-mute"}`} />
            {s}
          </motion.li>
        ))}
      </ul>
      <p className="mt-3 font-hand text-lg text-ink/70">the pipeline is the team.</p>
    </div>
  );
}
