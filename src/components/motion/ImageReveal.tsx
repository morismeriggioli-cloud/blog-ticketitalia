"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { imageReveal, motionViewportEarly } from "@/lib/motion";

type ImageRevealProps = {
  children: ReactNode;
  className?: string;
};

export function ImageReveal({ children, className }: ImageRevealProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={prefersReducedMotion ? false : "hidden"}
      whileInView={prefersReducedMotion ? undefined : "show"}
      viewport={motionViewportEarly}
      variants={imageReveal}
    >
      {children}
    </motion.div>
  );
}

