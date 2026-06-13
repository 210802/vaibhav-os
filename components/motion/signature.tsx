"use client";

import { motion } from "framer-motion";
import clsx from "clsx";
import { Words } from "./primitives";

/* -----------------------------------------------------------------------
   SquiggleWire — THE SIGNATURE. A hand-drawn wire that draws itself as
   each chapter scrolls into view, threading the whole founder OS together.
   Each variant is an original scribble path, not a straight connector.
----------------------------------------------------------------------- */
const WIRE_PATHS = [
  "M10 8 C 80 90, 140 -30, 220 50 S 330 110, 400 30 S 520 -20, 590 60",
  "M10 60 C 70 -10, 120 110, 200 40 S 310 -20, 380 70 S 500 100, 590 20",
  "M10 30 C 90 110, 180 -40, 250 60 S 340 120, 430 20 S 540 -10, 590 70",
];

export function SquiggleWire({
  variant = 0,
  className,
  flip = false,
}: {
  variant?: 0 | 1 | 2;
  className?: string;
  flip?: boolean;
}) {
  return (
    <div
      aria-hidden
      className={clsx("pointer-events-none mx-auto w-full max-w-2xl px-6", flip && "-scale-x-100", className)}
    >
      <svg viewBox="0 0 600 100" fill="none" className="h-16 w-full md:h-24">
        <motion.path
          d={WIRE_PATHS[variant]}
          stroke="rgb(var(--wire))"
          strokeWidth={4}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
        />
        {/* plug at the end of the wire */}
        <motion.circle
          cx={590}
          cy={variant === 0 ? 60 : variant === 1 ? 20 : 70}
          r={7}
          fill="rgb(var(--wire))"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1, type: "spring", stiffness: 300, damping: 12 }}
        />
      </svg>
    </div>
  );
}

/* -----------------------------------------------------------------------
   Burst — comic starburst chapter stamp ("BOOT!", "SHIP!", "WIRED!")
----------------------------------------------------------------------- */
export function Burst({
  word,
  className,
  tone = "accent",
}: {
  word: string;
  className?: string;
  tone?: "accent" | "steel" | "sun";
}) {
  const fill =
    tone === "accent" ? "rgb(var(--accent))" : tone === "steel" ? "rgb(var(--steel))" : "rgb(var(--sun))";
  const text = tone === "sun" ? "rgb(17 17 17)" : "rgb(var(--paper))";
  // 12-point star polygon
  const pts = Array.from({ length: 24 }, (_, i) => {
    const r = i % 2 === 0 ? 50 : 33;
    const a = (Math.PI * i) / 12 - Math.PI / 2;
    return `${50 + r * Math.cos(a)},${50 + r * Math.sin(a)}`;
  }).join(" ");

  return (
    <motion.div
      aria-hidden
      initial={{ scale: 0, rotate: -28 }}
      whileInView={{ scale: 1, rotate: -10 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ type: "spring", stiffness: 320, damping: 11, delay: 0.15 }}
      whileHover={{ rotate: 6, scale: 1.08 }}
      className={clsx("h-20 w-20 select-none md:h-28 md:w-28", className)}
    >
      <svg viewBox="0 0 100 100" className="h-full w-full drop-shadow-[3px_3px_0_rgb(var(--ink))]">
        <polygon points={pts} fill={fill} stroke="rgb(var(--ink))" strokeWidth={2.5} />
        <text
          x="50"
          y="55"
          textAnchor="middle"
          fontFamily="var(--font-display)"
          fontSize="17"
          fill={text}
          transform="rotate(-6 50 50)"
        >
          {word}
        </text>
      </svg>
    </motion.div>
  );
}

/* -----------------------------------------------------------------------
   Marquee — the red ticker band of founder verbs
----------------------------------------------------------------------- */
export function Marquee({ words, reverse = false }: { words: string[]; reverse?: boolean }) {
  const row = [...words, ...words, ...words, ...words];
  return (
    <div
      aria-hidden
      className="relative z-10 -rotate-1 overflow-x-clip border-y-[3px] border-ink bg-accent py-3 shadow-panel-sm"
    >
      <div
        className={clsx("flex w-max animate-marquee gap-10 whitespace-nowrap", reverse && "[animation-direction:reverse]")}
      >
        {[0, 1].map((half) => (
          <div key={half} className="flex gap-10">
            {row.map((w, i) => (
              <span key={`${half}-${i}`} className="flex items-center gap-10 font-display text-2xl uppercase tracking-wide text-paper md:text-3xl">
                {w}
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-sun stroke-ink" strokeWidth={1.5}>
                  <path d="M12 2l2.6 6.6L21 11l-6.4 2.4L12 20l-2.6-6.6L3 11l6.4-2.4z" />
                </svg>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* -----------------------------------------------------------------------
   ChapterHead — eyebrow + massive headline with keyword color pop
----------------------------------------------------------------------- */
export function ChapterHead({
  num,
  eyebrow,
  title,
  pop,
  popTone = "accent",
  align = "left",
  className,
}: {
  num: string;
  eyebrow: string;
  title: string;
  pop?: string;
  popTone?: "accent" | "steel";
  align?: "left" | "center";
  className?: string;
}) {
  const parts = pop ? title.split(pop) : [title];
  return (
    <div className={clsx("relative", align === "center" && "text-center", className)}>
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.35em] text-ink/60">
        CH.{num} <span className="text-accent">/</span> {eyebrow}
      </p>
      <h2 className="knockout-quiet text-[clamp(2.4rem,7vw,5.5rem)] font-display">
        {pop ? (
          <>
            <Words text={parts[0]} />
            <span className={clsx("relative inline-block", popTone === "accent" ? "text-accent" : "text-steel")}>
              <Words text={pop} wordClassName="scratch-underline" />
            </span>
            {parts[1] && <Words text={parts[1]} />}
          </>
        ) : (
          <Words text={title} />
        )}
      </h2>
    </div>
  );
}
