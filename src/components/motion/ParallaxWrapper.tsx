"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { ReactNode } from "react";

type ParallaxWrapperProps = {
  children: ReactNode;
  className?: string;
  distance?: number;
  direction?: "up" | "down";
};

export function ParallaxWrapper({ children, className, distance = 56, direction = "down" }: ParallaxWrapperProps) {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const end = direction === "down" ? distance : -distance;
  const y = useTransform(scrollYProgress, [0, 0.5], [0, prefersReducedMotion ? 0 : end]);

  return (
    <motion.div className={className} style={{ y }}>
      {children}
    </motion.div>
  );
}

