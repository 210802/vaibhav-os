import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "rgb(var(--paper) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        steel: "rgb(var(--steel) / <alpha-value>)",
        sun: "rgb(var(--sun) / <alpha-value>)",
        mute: "rgb(var(--mute) / <alpha-value>)",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
        marker: ["var(--font-marker)"],
        hand: ["var(--font-hand)"],
      },
      boxShadow: {
        panel: "6px 6px 0 0 rgb(var(--ink))",
        "panel-sm": "4px 4px 0 0 rgb(var(--ink))",
        "panel-lg": "10px 10px 0 0 rgb(var(--ink))",
        "panel-accent": "6px 6px 0 0 rgb(var(--accent))",
        "panel-steel": "6px 6px 0 0 rgb(var(--steel))",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.15" },
        },
        floaty: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        marquee: "marquee 22s linear infinite",
        blink: "blink 1.4s steps(1) infinite",
        floaty: "floaty 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
