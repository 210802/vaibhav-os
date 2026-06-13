"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useReducedMotion,
  type HTMLMotionProps,
} from "framer-motion";
import clsx from "clsx";

/* -----------------------------------------------------------------------
   Magnetic — elements that lean toward the cursor (buttons, badges)
----------------------------------------------------------------------- */
export function Magnetic({
  children,
  strength = 0.35,
  className,
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16 });
  const sy = useSpring(y, { stiffness: 220, damping: 16 });
  const reduced = useReducedMotion();

  const onMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={clsx("inline-block", className)}
    >
      {children}
    </motion.div>
  );
}

/* -----------------------------------------------------------------------
   PanelIn — comic panels snap in with a slight tilt-correct spring
----------------------------------------------------------------------- */
export function PanelIn({
  children,
  delay = 0,
  tilt = -2,
  className,
  ...rest
}: { delay?: number; tilt?: number } & HTMLMotionProps<"div">) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 46, rotate: tilt * 2.2, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, rotate: tilt, scale: 1 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ type: "spring", stiffness: 130, damping: 16, delay }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/* -----------------------------------------------------------------------
   Words — staggered word-by-word reveal for big statements
----------------------------------------------------------------------- */
export function Words({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.06,
  once = true,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
}) {
  const words = text.split(" ");
  return (
    <motion.span
      className={clsx("inline-block", className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-10% 0px" }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
      aria-label={text}
    >
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom" aria-hidden>
          <motion.span
            className={clsx("inline-block will-change-transform", wordClassName)}
            variants={{
              hidden: { y: "110%", rotate: 6 },
              show: { y: "0%", rotate: 0, transition: { type: "spring", stiffness: 160, damping: 18 } },
            }}
          >
            {w}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

/* -----------------------------------------------------------------------
   CountUp — animated metrics for the command center / activity
----------------------------------------------------------------------- */
export function CountUp({ to, duration = 1.4, className }: { to: number; duration?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [val, setVal] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setVal(to);
      return;
    }
    let raf: number;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / (duration * 1000));
      setVal(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration, reduced]);

  return (
    <span ref={ref} className={className}>
      {val}
    </span>
  );
}
