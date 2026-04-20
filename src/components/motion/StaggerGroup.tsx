"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { HTMLMotionProps, Variants } from "framer-motion";
import { motionViewport, staggerContainer, staggerItem as baseStaggerItem } from "@/lib/motion";

type StaggerGroupProps = HTMLMotionProps<"div">;

export function StaggerGroup({ children, ...props }: StaggerGroupProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? false : "hidden"}
      whileInView={prefersReducedMotion ? undefined : "show"}
      viewport={motionViewport}
      variants={staggerContainer}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export const staggerItem: Variants = baseStaggerItem;
