import { Preloader, CursorTrail, ChapterRail, ThemeToggle } from "@/components/system/chrome";
import { Marquee } from "@/components/motion/signature";
import { MARQUEE_WORDS } from "@/lib/data";
import Ch01Opening from "@/components/chapters/Ch01Opening";
import Ch02Origin from "@/components/chapters/Ch02Origin";
import Ch03BrainMap from "@/components/chapters/Ch03BrainMap";
import Ch04Products from "@/components/chapters/Ch04Products";
import Ch05Thinking from "@/components/chapters/Ch05Thinking";
import Ch06Command from "@/components/chapters/Ch06Command";
import Ch07Timeline from "@/components/chapters/Ch07Timeline";
import Ch08Activity from "@/components/chapters/Ch08Activity";
import { Ch09Manifesto, Ch10Contact } from "@/components/chapters/Ch09Ch10";

export default function Home() {
  return (
    <main className="relative overflow-x-hidden">
      <Preloader />
      <CursorTrail />
      <ThemeToggle />
      <ChapterRail />

      <Ch01Opening />
      <Marquee words={MARQUEE_WORDS} />
      <Ch02Origin />
      <Ch03BrainMap />
      <Marquee words={["SYSTEMS", "PRODUCTS", "COMPANIES", "LEVERAGE"]} reverse />
      <Ch04Products />
      <Ch05Thinking />
      <Ch06Command />
      <Ch07Timeline />
      <Ch08Activity />
      <Marquee words={MARQUEE_WORDS} />
      <Ch09Manifesto />
      <Ch10Contact />
    </main>
  );
}
