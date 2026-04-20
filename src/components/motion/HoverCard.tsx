"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import { motionDuration, motionEase } from "@/lib/motion";

type HoverCardProps = HTMLMotionProps<"article">;

export function HoverCard({ children, ...props }: HoverCardProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.article
      whileHover={prefersReducedMotion ? undefined : { y: -5, scale: 1.01 }}
      whileTap={prefersReducedMotion ? undefined : { scale: 0.995 }}
      transition={{ duration: motionDuration.hover, ease: motionEase.standard }}
      {...props}
    >
      {children}
    </motion.article>
  );
}
