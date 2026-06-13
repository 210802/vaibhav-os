"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import { MANIFESTO, FOUNDER } from "@/lib/data";
import { Magnetic, Words } from "@/components/motion/primitives";
import { Burst, ChapterHead } from "@/components/motion/signature";

/* -----------------------------------------------------------------------
   CH.09 — THE MANIFESTO
----------------------------------------------------------------------- */
const tone: Record<string, string> = { ink: "text-ink", accent: "text-accent", steel: "text-steel" };

export function Ch09Manifesto() {
  return (
    <section id="manifesto" className="relative mx-auto max-w-6xl px-5 py-14 sm:py-28 md:px-10 md:py-40">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <ChapterHead num="09" eyebrow="The Manifesto" title="PRINCIPLES I OPERATE BY" />
        <Burst word="TRUE!" tone="sun" />
      </div>

      <div className="mt-10 space-y-5 sm:mt-16 sm:space-y-8 md:space-y-12">
        {MANIFESTO.map((m, i) => (
          <div
            key={m.line}
            className={clsx(
              "flex items-baseline gap-4 md:gap-8",
              i % 3 === 1 && "ml-[2%] sm:ml-[4%]",
              i % 3 === 2 && "ml-[4%] sm:ml-[8%]"
            )}
          >
            <span className="font-mono text-sm font-bold text-ink/40">0{i + 1}</span>
            <h3 className={`knockout text-[clamp(1.5rem,5.5vw,4.8rem)] ${tone[m.tone]}`} style={{ rotate: `${i % 2 === 0 ? -1 : 1}deg` }}>
              <Words text={m.line} stagger={0.07} />
            </h3>
          </div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0, rotate: -2 }}
        whileInView={{ opacity: 1, rotate: -2 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="hl mx-auto mt-12 w-fit border-2 border-ink px-3 py-2 text-center font-display text-sm uppercase tracking-wide shadow-panel-sm sm:mt-20 sm:border-[3px] sm:px-5 sm:py-3 sm:text-xl sm:shadow-panel md:text-2xl"
      >
        Resumes describe the past. Systems build the future.
      </motion.p>
    </section>
  );
}

/* -----------------------------------------------------------------------
   CH.10 — CONTACT: MISSION CONTROL
----------------------------------------------------------------------- */
type Channel = {
  label: string;
  value: string;
  href: string;
  code: string;
  copyText?: string;
};

const CHANNELS: Channel[] = [
  { label: "Email", value: FOUNDER.email, href: `mailto:${FOUNDER.email}`, code: "CH-01", copyText: FOUNDER.email },
  { label: "LinkedIn", value: "/vaibhav-tripathi", href: FOUNDER.linkedin, code: "CH-02" },
  { label: "GitHub", value: "@210802", href: FOUNDER.github, code: "CH-03" },
  { label: "Phone", value: FOUNDER.phone, href: `tel:${FOUNDER.phone.replace(/-/g, "")}`, code: "CH-04", copyText: FOUNDER.phone },
];

function ChannelCard({ c, i }: { c: Channel; i: number }) {
  const [copied, setCopied] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!c.copyText) return;
    navigator.clipboard.writeText(c.copyText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const isExternal = !c.href.startsWith("mailto:") && !c.href.startsWith("tel:");

  return (
    <motion.a
      href={c.href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.08 }}
      whileHover={{ backgroundColor: "rgb(var(--sun))" }}
      className="group flex min-h-[72px] flex-col justify-center bg-paper px-5 py-6 text-left transition-colors active:bg-sun/30 sm:p-5"
      onClick={handleClick}
      data-hot
    >
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-ink/65">{c.code}</p>
      <p className="mt-1 font-display text-lg uppercase sm:text-xl">{c.label}</p>
      <p className="mt-1 font-mono text-sm text-ink/70 transition-colors group-hover:text-ink sm:text-xs">
        {copied ? (
          <span className="font-bold text-accent">Copied ✓</span>
        ) : (
          <>{c.value} {isExternal ? "↗" : c.copyText ? "⎘" : "↗"}</>
        )}
      </p>
    </motion.a>
  );
}

export function Ch10Contact() {
  return (
    <section id="contact" className="contact-section relative mx-auto max-w-6xl px-5 pb-16 pt-14 sm:pt-24 md:px-10 md:pt-32">
      <div className="panel scanlines overflow-hidden">
        {/* mission control header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b-[3px] border-ink bg-ink px-5 py-3 text-paper">
          <span className="font-mono text-xs uppercase tracking-[0.35em]">mission_control / uplink</span>
          <span className="flex items-center gap-2 font-mono text-xs">
            <span className="h-2.5 w-2.5 animate-blink rounded-full bg-steel" /> channels open
          </span>
        </div>

        <div className="halftone halftone-fade px-5 py-14 text-center md:py-20">
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-ink/60">CH.10 / final transmission</p>
          <h2 className="knockout mx-auto mt-5 max-w-3xl text-[clamp(1.7rem,6vw,5rem)]">
            <Words text="LOOKING TO BUILD SOMETHING" />{" "}
            <span className="text-accent">
              <Words text="IMPOSSIBLE?" delay={0.3} />
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-md font-hand text-2xl text-ink/85">
            I reply fastest to people with hard problems and unreasonable timelines.
          </p>

          <div className="mt-8 flex flex-col items-center gap-4 sm:mt-10">
            <Magnetic strength={0.45}>
              <a
                href={`mailto:${FOUNDER.email}?subject=Let%27s%20build%20something%20impossible`}
                className="group inline-flex -rotate-1 items-center gap-2 border-[3px] border-ink bg-accent px-5 py-3 font-display text-xl uppercase tracking-wide text-paper shadow-panel-sm transition-transform hover:translate-x-[-3px] hover:translate-y-[-3px] sm:gap-3 sm:px-8 sm:py-4 sm:text-2xl sm:shadow-panel-lg md:text-3xl"
                data-hot
              >
                Let&rsquo;s talk
                <motion.span animate={{ x: [0, 6, 0] }} transition={{ duration: 1.3, repeat: Infinity }} aria-hidden>
                  →
                </motion.span>
              </a>
            </Magnetic>
            <p className="font-mono text-xs tracking-[0.2em] text-ink/60">
              or reach me directly at{" "}
              <a href={`mailto:${FOUNDER.email}`} className="text-ink underline decoration-2 underline-offset-4 hover:text-accent transition-colors">
                {FOUNDER.email}
              </a>
            </p>
          </div>
        </div>

        {/* channel grid */}
        <div className="grid grid-cols-1 gap-px border-t-[3px] border-ink bg-ink/20 sm:grid-cols-2 lg:grid-cols-4">
          {CHANNELS.map((c, i) => (
            <ChannelCard key={c.code} c={c} i={i} />
          ))}
        </div>
      </div>

      <footer className="mt-10 flex flex-wrap items-center justify-between gap-3 pb-[env(safe-area-inset-bottom)] font-mono text-xs uppercase tracking-[0.25em] text-ink/60">
        <span>
          {FOUNDER.os} {FOUNDER.version} — designed &amp; built by {FOUNDER.name}
        </span>
        <span>
          © {new Date().getFullYear()} / <span className="text-accent">systems running</span>
        </span>
      </footer>
    </section>
  );
}
