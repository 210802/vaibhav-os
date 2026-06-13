"use client";

import { motion } from "framer-motion";
import { ORIGIN_PANELS } from "@/lib/data";
import { PanelIn } from "@/components/motion/primitives";
import { Burst, ChapterHead, SquiggleWire } from "@/components/motion/signature";

function Glyph({ name }: { name: string }) {
  const common = "h-12 w-12 stroke-ink";
  switch (name) {
    case "spark":
      return (
        <svg viewBox="0 0 48 48" className={common} fill="none" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
          <path d="M26 4 L14 28 h9 l-3 16 L34 20 h-9 z" className="fill-sun" />
        </svg>
      );
    case "wrench":
      return (
        <svg viewBox="0 0 48 48" className={common} fill="none" strokeWidth={3} strokeLinecap="round">
          <path d="M30 8a9 9 0 0 0-8.6 11.7L8 33.1a4.4 4.4 0 1 0 6.2 6.2l13.4-13.4A9 9 0 0 0 39 14l-6 6-5-5 6-6a9 9 0 0 0-4-1z" className="fill-mute" />
        </svg>
      );
    case "brain":
      return (
        <svg viewBox="0 0 48 48" className={common} fill="none" strokeWidth={3} strokeLinecap="round">
          <path d="M18 8a7 7 0 0 0-7 7c-4 1-6 4-6 8s3 7 6 8a7 7 0 0 0 7 7h4V8zM30 8a7 7 0 0 1 7 7c4 1 6 4 6 8s-3 7-6 8a7 7 0 0 1-7 7h-4V8z" className="fill-steel/40" />
          <path d="M24 8v30" />
        </svg>
      );
    case "box":
      return (
        <svg viewBox="0 0 48 48" className={common} fill="none" strokeWidth={3} strokeLinejoin="round">
          <path d="M24 5 43 14v20L24 43 5 34V14z" className="fill-accent/25" />
          <path d="M5 14l19 9 19-9M24 23v20" />
        </svg>
      );
    case "flag":
      return (
        <svg viewBox="0 0 48 48" className={common} fill="none" strokeWidth={3} strokeLinecap="round">
          <path d="M12 44V6" />
          <path d="M12 8h26l-7 8 7 8H12z" className="fill-accent" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Ch02Origin() {
  return (
    <section id="origin" className="relative mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-32">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <ChapterHead num="02" eyebrow="The Origin Story" title="HOW A BUILDER GETS BUILT" pop="BUILDER" />
        <Burst word="ORIGIN!" tone="sun" />
      </div>

      <p className="mt-6 max-w-xl font-hand text-2xl text-ink/70">
        Five issues. One through-line: turn curiosity into systems.
      </p>

      {/* comic strip */}
      <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5">
        {ORIGIN_PANELS.map((p, i) => (
          <PanelIn
            key={p.title}
            delay={i * 0.1}
            tilt={i % 2 === 0 ? -1.5 : 1.5}
            className={`panel panel-press group relative flex flex-col overflow-hidden p-5${i === 4 ? " sm:col-span-2 lg:col-span-1" : ""}`}
            data-hot
          >
            {/* halftone header strip */}
            <div className="halftone -mx-5 -mt-5 mb-4 border-b-[3px] border-ink px-5 py-2">
              <span className="bg-ink px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-paper">
                {p.era}
              </span>
            </div>

            <Glyph name={p.glyph} />

            <h3 className="mt-4 font-display text-2xl uppercase leading-none">{p.title}</h3>

            {/* speech bubble pops on hover/in-view */}
            <motion.div
              initial={{ scale: 0, rotate: -6 }}
              whileInView={{ scale: 1, rotate: -2 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35 + i * 0.12, type: "spring", stiffness: 300, damping: 14 }}
              className="relative mt-4 w-full max-w-full border-2 border-ink bg-paper p-3 shadow-panel-sm transition-transform group-hover:-rotate-1 group-hover:scale-[1.03]"
            >
              <p className="font-hand text-xl leading-tight">&ldquo;{p.bubble}&rdquo;</p>
              {/* bubble tail */}
              <span aria-hidden className="absolute -bottom-[11px] left-6 h-0 w-0 border-l-[10px] border-r-[4px] border-t-[12px] border-l-transparent border-r-transparent border-t-ink" />
              <span aria-hidden className="absolute -bottom-[7px] left-[27px] h-0 w-0 border-l-[8px] border-r-[3px] border-t-[9px] border-l-transparent border-r-transparent border-t-paper" />
            </motion.div>

            <p className="mt-5 text-sm leading-relaxed text-ink/70">{p.caption}</p>

            <span className="mt-auto pt-4 font-mono text-[10px] uppercase tracking-widest text-accent">
              → continued
            </span>
          </PanelIn>
        ))}
      </div>

      <SquiggleWire variant={0} className="mt-20" />
    </section>
  );
}
