"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { THINKING_CARDS } from "@/lib/data";
import { Burst, ChapterHead } from "@/components/motion/signature";

export default function Ch05Thinking() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="thinking" className="relative mx-auto max-w-5xl px-5 py-24 md:px-10 md:py-32">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <ChapterHead num="05" eyebrow="How I Think" title="NOT SKILLS. OPERATING PRINCIPLES." pop="OPERATING" popTone="steel" />
        <Burst word="THINK!" tone="steel" />
      </div>
      <p className="mt-6 max-w-xl font-hand text-2xl text-ink/70">
        Technologies change every quarter. These don&rsquo;t.
      </p>

      <div className="mt-14 space-y-4">
        {THINKING_CARDS.map((c, i) => {
          const isOpen = open === i;
          return (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ type: "spring", stiffness: 140, damping: 18 }}
              className="panel panel-press"
              style={{ rotate: i % 2 === 0 ? -0.6 : 0.6 }}
            >
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left md:px-7"
                data-hot
              >
                <span className="flex items-center gap-4">
                  <span
                    className={`hidden -rotate-3 border-2 border-ink px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-widest sm:inline-block ${
                      isOpen ? "bg-accent text-paper" : "bg-sun text-ink"
                    }`}
                  >
                    {c.stamp}
                  </span>
                  <span className="font-display text-lg uppercase sm:text-2xl md:text-3xl">{c.title}</span>
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 18 }}
                  className="flex h-9 w-9 shrink-0 items-center justify-center border-2 border-ink bg-paper font-display text-xl shadow-panel-sm"
                  aria-hidden
                >
                  +
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="body"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="halftone-fade halftone border-t-[3px] border-ink px-5 py-5 md:px-7">
                      <p className="max-w-2xl bg-paper/80 text-base leading-relaxed text-ink/85 md:text-lg">
                        {c.body}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
