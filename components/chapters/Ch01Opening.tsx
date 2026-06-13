"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { HERO_LINES, FOUNDER } from "@/lib/data";
import { Magnetic, Words } from "@/components/motion/primitives";
import FounderStack from "@/components/art/FounderStack";

const toneClass: Record<string, string> = {
  ink: "text-ink",
  accent: "text-accent",
  steel: "text-steel",
};

export default function Ch01Opening() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const artY = useTransform(scrollYProgress, [0, 1], ["0%", "26%"]);
  const typeY = useTransform(scrollYProgress, [0, 1], ["0%", "-14%"]);
  const fade = useTransform(scrollYProgress, [0.5, 0.95], [1, 0]);

  return (
    <section
      id="boot"
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-12 pt-20 sm:pb-20 md:pt-16"
    >
      {/* corner OS label */}
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.3 }}
        className="absolute left-5 top-5 z-20 font-mono text-xs uppercase tracking-[0.3em] text-ink/60"
      >
        {FOUNDER.os} <span className="text-accent">{FOUNDER.version}</span> — booted
      </motion.p>

      <motion.div style={{ opacity: fade }} className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 px-5 md:grid-cols-[1.15fr_0.85fr] md:px-10">
        {/* the four statements */}
        <motion.div style={{ y: typeY }} className="order-last space-y-3 md:order-first md:space-y-5">
          {HERO_LINES.map((l, i) => (
            <h1
              key={l.text}
              className={`knockout block text-[clamp(1.8rem,6.5vw,6.2rem)] ${toneClass[l.tone]}`}
              style={{ transform: `rotate(${i % 2 === 0 ? -1 : 0.8}deg)` }}
            >
              <Words text={l.text} delay={2.2 + i * 0.55} stagger={0.05} />
            </h1>
          ))}

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4.6 }}
            className="max-w-md pt-4 font-hand text-xl leading-snug text-ink/80 sm:text-2xl md:text-3xl"
          >
            — {FOUNDER.name}. Startup founder, AI builder, systems thinker.
          </motion.p>

          {/* recruiter-scan quick links */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 5.1 }}
            className="flex flex-wrap gap-2 pt-5"
          >
            {[
              { label: "Email", href: `mailto:${FOUNDER.email}` },
              { label: "GitHub", href: FOUNDER.github },
              { label: "LinkedIn", href: FOUNDER.linkedin },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={l.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                className="panel panel-press -rotate-1 px-3 py-1.5 font-mono text-xs uppercase tracking-[0.2em]"
                data-hot
              >
                {l.label} ↗
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* parallax art — capped on mobile so text stays visible above the fold */}
        <motion.div
          style={{ y: artY }}
          className="order-first mx-auto w-full max-w-xs overflow-hidden sm:max-w-md md:order-last md:max-w-none"
        >
          <div className="max-h-[45vh] overflow-hidden sm:max-h-none md:max-h-none">
            <FounderStack className="h-auto w-full" />
          </div>
        </motion.div>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 5 }}
        className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2"
      >
        <Magnetic strength={0.5}>
          <a
            href="#origin"
            className="panel panel-press flex -rotate-2 items-center gap-2 px-4 py-2 font-mono text-xs uppercase tracking-[0.25em]"
            data-hot
          >
            open chapter 02
            <motion.span animate={{ y: [0, 4, 0] }} transition={{ duration: 1.4, repeat: Infinity }} aria-hidden>
              ↓
            </motion.span>
          </a>
        </Magnetic>
      </motion.div>

      {/* halftone ground */}
      <div aria-hidden className="halftone halftone-fade absolute inset-x-0 bottom-0 h-44 rotate-180 opacity-60" />
    </section>
  );
}
