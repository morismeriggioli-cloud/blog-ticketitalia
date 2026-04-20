import type { Config } from "tailwindcss";
import { colors, layout, motion } from "./src/styles/design-system";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx,mdx}",
    "./src/components/**/*.{ts,tsx,mdx}",
    "./src/data/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
    "./src/styles/**/*.{ts,tsx}",
  ],
  theme: {
    screens: {
      sm: layout.breakpoints.tablet,
      lg: layout.breakpoints.laptop,
      xl: layout.breakpoints.desktop,
      "2xl": layout.breakpoints.wide,
    },
    extend: {
      colors: {
        primary: colors.primary,
        secondary: colors.secondary,
        accent: colors.accent,
        neutral: colors.neutral,
        semantic: colors.semantic,
        success: colors.semantic.success,
        warning: colors.semantic.warning,
        danger: colors.semantic.danger,
        info: colors.semantic.info,
        surface: "var(--surface)",
        "surface-raised": "var(--surface-raised)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        muted: "var(--muted)",
        ink: "var(--ink)",
        line: "var(--line)",
        neon: "var(--neon)",
        aqua: "var(--aqua)",
        coral: "var(--coral)",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "Sora", "Arial", "sans-serif"],
        sans: ["var(--font-body)", "Manrope", "Arial", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      fontSize: {
        display: ["4.5rem", { lineHeight: "0.96", letterSpacing: "0", fontWeight: "900" }],
        h1: ["4rem", { lineHeight: "1", letterSpacing: "0", fontWeight: "900" }],
        h2: ["3rem", { lineHeight: "1.05", letterSpacing: "0", fontWeight: "850" }],
        h3: ["2rem", { lineHeight: "1.12", letterSpacing: "0", fontWeight: "800" }],
        h4: ["1.375rem", { lineHeight: "1.2", letterSpacing: "0", fontWeight: "800" }],
        "body-lg": ["1.125rem", { lineHeight: "1.7", letterSpacing: "0", fontWeight: "500" }],
        body: ["1rem", { lineHeight: "1.65", letterSpacing: "0", fontWeight: "400" }],
        "body-sm": ["0.875rem", { lineHeight: "1.55", letterSpacing: "0", fontWeight: "500" }],
        caption: ["0.75rem", { lineHeight: "1.35", letterSpacing: "0", fontWeight: "800" }],
      },
      spacing: {
        13: "3.25rem",
        18: "4.5rem",
        22: "5.5rem",
        30: "7.5rem",
        34: "8.5rem",
      },
      borderRadius: layout.radius,
      boxShadow: {
        lift: "0 18px 50px rgba(17, 19, 24, 0.14)",
        "lift-strong": "0 24px 80px rgba(17, 19, 24, 0.2)",
        glow: "0 0 0 1px rgba(0, 184, 217, 0.22), 0 22px 70px rgba(255, 61, 141, 0.16)",
        "glow-lime": "0 0 0 1px rgba(183, 255, 42, 0.28), 0 20px 64px rgba(0, 184, 217, 0.18)",
      },
      transitionDuration: {
        120: motion.duration.instant,
        180: motion.duration.fast,
        240: motion.duration.base,
        360: motion.duration.slow,
        620: motion.duration.reveal,
      },
      transitionTimingFunction: {
        event: motion.easing.standard,
        entrance: motion.easing.entrance,
        exit: motion.easing.exit,
      },
    },
  },
};

export default config;
