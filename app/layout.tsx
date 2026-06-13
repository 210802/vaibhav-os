import type { Metadata, Viewport } from "next";
import { Anton, Space_Grotesk, Space_Mono, Permanent_Marker, Caveat } from "next/font/google";
import { ThemeProvider } from "next-themes";
import SmoothScroll from "@/components/providers/SmoothScroll";
import "./globals.css";

const display = Anton({ weight: "400", subsets: ["latin"], variable: "--font-display" });
const body = Space_Grotesk({ subsets: ["latin"], variable: "--font-body" });
const mono = Space_Mono({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-mono" });
const marker = Permanent_Marker({ weight: "400", subsets: ["latin"], variable: "--font-marker" });
const hand = Caveat({ subsets: ["latin"], variable: "--font-hand" });

export const metadata: Metadata = {
  title: "VAIBHAV.OS — the operating system of a founder",
  description:
    "Vaibhav Tripathi builds AI products, systems, and businesses. LifeOS, PRAGMA, Lumiere Studio — explore the founder operating system.",
  keywords: ["Vaibhav Tripathi", "AI builder", "startup founder", "LifeOS", "PRAGMA", "systems thinker"],
  openGraph: {
    title: "VAIBHAV.OS — the operating system of a founder",
    description: "Most people build websites. I build systems. Some became products. Some became companies.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAFAF7" },
    { media: "(prefers-color-scheme: dark)", color: "#0D1117" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${display.variable} ${body.variable} ${mono.variable} ${marker.variable} ${hand.variable} grain`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <SmoothScroll>{children}</SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
