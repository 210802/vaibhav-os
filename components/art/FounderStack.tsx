"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * FounderStack — original illustration.
 * A silhouetted founder stands on a tower of stacked "system blocks"
 * (each labeled like a shipping crate), planting a pennant flag, in front
 * of a giant halftone sun. Orbiting nodes hint at the systems running.
 */
export default function FounderStack({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  return (
    <motion.svg
      viewBox="0 0 520 560"
      fill="none"
      className={className}
      initial={{ opacity: 0, scale: 0.92, rotate: 2 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 0.9, ease: "easeOut", delay: 0.5 }}
      aria-hidden
    >
      {/* halftone sun */}
      <defs>
        <pattern id="ht" width="12" height="12" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="1.6" fill="rgb(var(--ink))" opacity="0.35" />
        </pattern>
      </defs>
      <circle cx="300" cy="200" r="170" fill="rgb(var(--sun))" stroke="rgb(var(--ink))" strokeWidth="4" />
      <circle cx="300" cy="200" r="170" fill="url(#ht)" />

      {/* orbit ring + satellites */}
      <motion.g
        style={{ transformOrigin: "300px 200px" }}
        animate={reduced ? undefined : { rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        <ellipse cx="300" cy="200" rx="225" ry="80" stroke="rgb(var(--ink))" strokeWidth="2.5" strokeDasharray="8 10" />
        <circle cx="75" cy="200" r="11" fill="rgb(var(--accent))" stroke="rgb(var(--ink))" strokeWidth="3" />
        <rect x="512" y="190" width="18" height="18" rx="3" transform="rotate(12 521 199)" fill="rgb(var(--steel))" stroke="rgb(var(--ink))" strokeWidth="3" />
      </motion.g>

      {/* stacked system blocks */}
      {[
        { y: 470, w: 240, label: "SYSTEMS" },
        { y: 414, w: 200, label: "PRODUCTS" },
        { y: 358, w: 160, label: "COMPANIES" },
      ].map((b, i) => (
        <motion.g
          key={b.label}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 + i * 0.18, type: "spring", stiffness: 160, damping: 15 }}
        >
          <rect
            x={300 - b.w / 2}
            y={b.y}
            width={b.w}
            height={52}
            fill="rgb(var(--paper))"
            stroke="rgb(var(--ink))"
            strokeWidth="4"
          />
          {/* crate corner marks */}
          <line x1={300 - b.w / 2 + 10} y1={b.y + 10} x2={300 - b.w / 2 + 26} y2={b.y + 10} stroke="rgb(var(--accent))" strokeWidth="4" />
          <line x1={300 + b.w / 2 - 26} y1={b.y + 42} x2={300 + b.w / 2 - 10} y2={b.y + 42} stroke="rgb(var(--steel))" strokeWidth="4" />
          <text
            x="300"
            y={b.y + 34}
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontWeight="700"
            fontSize="16"
            letterSpacing="6"
            fill="rgb(var(--ink))"
          >
            {b.label}
          </text>
        </motion.g>
      ))}

      {/* founder silhouette planting the flag */}
      <motion.g
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.25, type: "spring", stiffness: 180, damping: 14 }}
      >
        {/* legs + body */}
        <path
          d="M285 356 L282 320 Q281 308 290 304 L296 301 Q306 297 312 305 L316 312 L318 356 L308 356 L305 322 L300 322 L296 356 Z"
          fill="rgb(var(--ink))"
        />
        {/* head */}
        <circle cx="299" cy="288" r="11" fill="rgb(var(--ink))" />
        {/* arm raised to flagpole */}
        <path d="M308 308 L330 290 L334 296 L313 314 Z" fill="rgb(var(--ink))" />
        {/* flagpole */}
        <line x1="336" y1="232" x2="336" y2="356" stroke="rgb(var(--ink))" strokeWidth="5" strokeLinecap="round" />
        {/* pennant */}
        <motion.path
          d="M336 234 L398 246 L336 262 Z"
          fill="rgb(var(--accent))"
          stroke="rgb(var(--ink))"
          strokeWidth="3.5"
          style={{ transformOrigin: "336px 248px" }}
          animate={reduced ? undefined : { skewY: [0, 4, 0, -3, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.g>

      {/* hand-drawn motion dashes */}
      <path d="M150 320 q 14 -8 28 -2" stroke="rgb(var(--ink))" strokeWidth="3" strokeLinecap="round" />
      <path d="M140 340 q 18 -6 34 0" stroke="rgb(var(--ink))" strokeWidth="3" strokeLinecap="round" />
      <path d="M428 330 q -16 -10 -30 -4" stroke="rgb(var(--ink))" strokeWidth="3" strokeLinecap="round" />
    </motion.svg>
  );
}
