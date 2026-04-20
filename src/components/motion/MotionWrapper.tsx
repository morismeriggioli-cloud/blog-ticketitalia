"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { HTMLMotionProps, Variants } from "framer-motion";
import { fadeUp, motionDuration, motionEase, motionViewport, withDelay } from "@/lib/motion";

type MotionWrapperProps = HTMLMotionProps<"div"> & {
  delay?: number;
  y?: number;
  variant?: Variants;
};

export function MotionWrapper({ delay = 0, y = 28, variant, children, ...props }: MotionWrapperProps) {
  const prefersReducedMotion = useReducedMotion();
  const activeVariant = variant ?? {
    hidden: { opacity: 0, y },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: motionDuration.reveal, ease: motionEase.premium },
    },
  };

  return (
    <motion.div
      initial={prefersReducedMotion ? false : "hidden"}
      whileInView={prefersReducedMotion ? undefined : "show"}
      viewport={motionViewport}
      variants={delay ? withDelay(activeVariant, delay) : activeVariant}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function MotionReveal(props: MotionWrapperProps) {
  return <MotionWrapper {...props} />;
}

export function FadeUp(props: MotionWrapperProps) {
  return <MotionWrapper variant={fadeUp} {...props} />;
}
