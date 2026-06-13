"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TIMELINE } from "@/lib/data";
import { Burst, ChapterHead } from "@/components/motion/signature";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const typeStyle: Record<string, { chip: string; word: string }> = {
  spark: { chip: "bg-sun text-ink", word: "SPARK" },
  ship: { chip: "bg-accent text-paper", word: "SHIPPED" },
  fail: { chip: "bg-ink text-paper", word: "FAILED → LEARNED" },
  build: { chip: "bg-steel text-paper", word: "BUILDING" },
  future: { chip: "bg-paper text-ink", word: "NEXT" },
};

export default function Ch07Timeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (reduced || !isDesktop) return; // mobile/tablet: native horizontal swipe

    const ctx = gsap.context(() => {
      const distance = () => track.scrollWidth - section.clientWidth;
      gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="timeline" className="relative py-14 sm:py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <ChapterHead num="07" eyebrow="Timeline of Builds" title="WINS, WRECKS & WHAT'S NEXT" pop="WRECKS" />
          <Burst word="POW!" tone="sun" />
        </div>
        <p className="mt-6 max-w-xl font-hand text-2xl text-ink/70">
          Scroll through time. The failures are load-bearing.
        </p>
      </div>

      {/* mobile swipe hint — fades in after mount */}
      <p className="mt-4 flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-widest text-ink/40 lg:hidden">
        <span className="animate-bounce inline-block">→</span> swipe to explore
      </p>

      {/* pinned horizontal rail on desktop; swipeable on touch */}
      <div ref={sectionRef} className="relative mt-4 flex min-h-[70vh] items-center overflow-hidden lg:mt-10 lg:min-h-screen">
        {/* the wire the cards hang from */}
        <div aria-hidden className="absolute left-0 right-0 top-1/2 hidden h-1 -translate-y-1/2 bg-ink lg:block" />
        {/* right-edge fade scroll affordance — mobile only */}
        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-paper to-transparent lg:hidden" />

        <div
          ref={trackRef}
          className="no-scrollbar flex w-full gap-6 overflow-x-auto px-5 py-8 lg:w-max lg:gap-10 lg:overflow-visible lg:px-[12vw]"
        >
          {TIMELINE.map((t, i) => {
            const s = typeStyle[t.type];
            return (
              <article
                key={`${t.year}-${t.title}`}
                className={`panel panel-press relative w-64 shrink-0 p-5 sm:w-72 lg:w-80 ${i % 2 === 0 ? "lg:-translate-y-10 lg:-rotate-1" : "lg:translate-y-10 lg:rotate-1"}`}
                data-hot
              >
                {/* hanger pin */}
                <span aria-hidden className="absolute -top-3 left-1/2 hidden h-6 w-6 -translate-x-1/2 rounded-full border-[3px] border-ink bg-sun lg:block" />
                <div className="flex items-center justify-between">
                  <span className="font-display text-3xl text-accent">{t.year}</span>
                  <span className={`-rotate-2 border-2 border-ink px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-widest shadow-panel-sm ${s.chip}`}>
                    {s.word}
                  </span>
                </div>
                <h3 className="mt-3 font-display text-2xl uppercase leading-none">{t.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/75">{t.note}</p>
                {t.type === "fail" && (
                  <p className="mt-3 font-hand text-lg text-accent">filed under: tuition.</p>
                )}
                {t.type === "future" && (
                  <p className="mt-3 animate-blink font-mono text-xs font-bold uppercase tracking-widest text-steel">
                    ▮ loading…
                  </p>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
