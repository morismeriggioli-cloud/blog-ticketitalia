import type { Variants } from "framer-motion";
import { motionDuration, motionEase } from "./timing";

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: motionDuration.reveal, ease: motionEase.premium },
  },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: motionDuration.reveal, ease: motionEase.premium },
  },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: 28 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: motionDuration.reveal, ease: motionEase.premium },
  },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: -28 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: motionDuration.reveal, ease: motionEase.premium },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: motionDuration.reveal, ease: motionEase.soft },
  },
};

export const imageReveal: Variants = {
  hidden: { opacity: 0, scale: 1.06, clipPath: "inset(8% 8% 8% 8% round 8px)" },
  show: {
    opacity: 1,
    scale: 1,
    clipPath: "inset(0% 0% 0% 0% round 8px)",
    transition: { duration: motionDuration.image, ease: motionEase.premium },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.04,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: motionDuration.reveal, ease: motionEase.premium },
  },
};

export function withDelay(variant: Variants, delay = 0): Variants {
  return {
    hidden: variant.hidden,
    show: {
      ...(variant.show as object),
      transition: {
        ...((variant.show as { transition?: object })?.transition ?? {}),
        delay,
      },
    },
  };
}

