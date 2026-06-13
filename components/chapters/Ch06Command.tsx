"use client";

import { motion } from "framer-motion";
import { COMMAND_CENTER } from "@/lib/data";
import { CountUp, PanelIn } from "@/components/motion/primitives";
import { Burst, ChapterHead } from "@/components/motion/signature";

const statusTone: Record<string, string> = {
  ACTIVE: "bg-accent text-paper",
  OBSERVING: "bg-steel text-paper",
  SCANNING: "bg-sun text-ink",
  QUEUED: "bg-mute text-ink",
};

export default function Ch06Command() {
  return (
    <section id="command" className="relative mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-32">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <ChapterHead num="06" eyebrow="Live Command Center" title="THE FOUNDER OS, RUNNING" pop="RUNNING" />
        <Burst word="LIVE!" />
      </div>

      <PanelIn tilt={0} className="panel scanlines mt-14 overflow-hidden">
        {/* OS top bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b-[3px] border-ink bg-ink px-5 py-3 text-paper">
          <span className="font-mono text-xs uppercase tracking-[0.35em]">vaibhav.os — command center</span>
          <span className="flex items-center gap-2 font-mono text-xs">
            <span className="h-2.5 w-2.5 animate-blink rounded-full bg-accent" />
            all systems nominal
          </span>
        </div>

        {/* current focus banner */}
        <div className="border-b-[3px] border-ink px-5 py-5 md:px-8">
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-ink/60">{COMMAND_CENTER.focus.label}</p>
          <div className="mt-2 flex flex-wrap items-center gap-5">
            <h3 className="font-display text-3xl uppercase md:text-4xl">{COMMAND_CENTER.focus.value}</h3>
            <div className="flex items-center gap-2">
              <div className="h-4 w-40 border-2 border-ink p-[2px]">
                <motion.div
                  className="h-full bg-accent"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${COMMAND_CENTER.focus.health}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                />
              </div>
              <span className="font-mono text-xs font-bold">
                <CountUp to={COMMAND_CENTER.focus.health} />% momentum
              </span>
            </div>
          </div>
        </div>

        {/* widgets grid */}
        <div className="grid gap-px bg-ink/20 sm:grid-cols-2 lg:grid-cols-4">
          {COMMAND_CENTER.widgets.map((w, i) => (
            <motion.div
              key={w.title}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 160, damping: 18 }}
              className="bg-paper p-5"
            >
              <div className="flex items-center justify-between gap-2">
                <h4 className="font-mono text-xs font-bold uppercase tracking-[0.2em]">{w.title}</h4>
                <span className={`border-2 border-ink px-1.5 py-0.5 font-mono text-[10px] font-bold ${statusTone[w.status]}`}>
                  {w.status}
                </span>
              </div>
              <ul className="mt-4 space-y-2.5">
                {w.items.map((it) => (
                  <li key={it} className="flex items-start gap-2 text-sm leading-snug text-ink/80">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-accent" aria-hidden />
                    {it}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* metric strip */}
        <div className="grid grid-cols-2 gap-px border-t-[3px] border-ink bg-ink/20 md:grid-cols-4">
          {COMMAND_CENTER.metrics.map((m) => (
            <div key={m.label} className="bg-paper px-5 py-6 text-center">
              <div className="knockout-quiet font-display text-5xl text-accent md:text-6xl">
                <CountUp to={m.value} />
              </div>
              <div className="mt-1 font-mono text-xs uppercase tracking-[0.25em] text-ink/70">{m.label}</div>
            </div>
          ))}
        </div>
      </PanelIn>
    </section>
  );
}
