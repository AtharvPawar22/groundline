import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: "#F6F7F2", // warm neutral editorial canvas
          raised: "#FFFFFF",  // clean card & table surface
          subtle: "#ECEEE7",  // secondary badge/chip background
          card: "#FAFAF7",    // soft card fill
        },
        ink: {
          DEFAULT: "#121519", // deep charcoal primary typography
          muted: "#4A525A",   // secondary text & captions (>7:1 contrast)
          faint: "#636B74",   // subtle metadata & placeholders (>4.5:1 contrast)
          subtle: "#8E959E",
        },
        line: {
          DEFAULT: "#DCE0D6", // crisp 1px borders
          subtle: "#E8ECE2",  // soft divider lines
          strong: "#C4C9BD",  // active/hover border state
        },
        accent: {
          DEFAULT: "#145348", // deep editorial emerald
          light: "#E8F4EE",   // soft accent tint
          hover: "#0E3E36",
          // Company Accents
          nvda: {
            DEFAULT: "#2D5F34", // forest circuit green
            light: "#EFF6EE",   // subtle badge background
            border: "#BDDABD",  // subtle badge border
            stroke: "#387340",
            hover: "#224A28",
          },
          nflx: {
            DEFAULT: "#8B242D", // cinematic crimson
            light: "#FAF0F1",   // subtle badge background
            border: "#E8BAC0",  // subtle badge border
            stroke: "#A32E38",
            hover: "#6F1D24",
          },
          jpm: {
            DEFAULT: "#1A3D63", // heritage banking navy
            light: "#EDF4FA",   // subtle badge background
            border: "#BACDE2",  // subtle badge border
            stroke: "#244E7E",
            hover: "#132D4A",
          },
        },
        negative: {
          DEFAULT: "#A33B32", // restrained brick red
          light: "#FBF1EF",
          border: "#E8C2BE",
          hover: "#842F27",
        },
        positive: {
          DEFAULT: "#1E6B52", // positive financial growth
          light: "#EBF6F1",
          border: "#BCE3D1",
        },
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-ibm-plex-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-ibm-plex-mono)", "SF Mono", "Menlo", "monospace"],
      },
      fontSize: {
        "hero-num": ["3.25rem", { lineHeight: "1.02", letterSpacing: "-0.02em" }],
        "table-headline": ["1.625rem", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
        "sub-headline": ["1.25rem", { lineHeight: "1.25" }],
        "metric-val": ["1.5rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
      },
      maxWidth: {
        content: "1160px",
        wide: "1280px",
      },
      borderRadius: {
        control: "6px",
        card: "8px",
        table: "0px",
      },
      boxShadow: {
        xs: "0 1px 2px rgba(18, 21, 25, 0.04)",
        sm: "0 1px 3px rgba(18, 21, 25, 0.06), 0 1px 2px rgba(18, 21, 25, 0.04)",
        md: "0 4px 6px -1px rgba(18, 21, 25, 0.07), 0 2px 4px -1px rgba(18, 21, 25, 0.04)",
      },
    },
  },
  plugins: [],
};

export default config;
