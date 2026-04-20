"use client";

import { motion, useReducedMotion } from "framer-motion";
import { motionDuration, motionEase, motionViewportText } from "@/lib/motion";

type RevealTextProps = {
  as?: "h1" | "h2" | "p";
  children: string;
  className?: string;
  delay?: number;
};

export function RevealText({ as = "h2", children, className, delay = 0 }: RevealTextProps) {
  const prefersReducedMotion = useReducedMotion();
  const MotionTag = motion[as];
  const words = children.split(" ");

  if (prefersReducedMotion) {
    return <MotionTag className={className}>{children}</MotionTag>;
  }

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={motionViewportText}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.035,
            delayChildren: delay,
          },
        },
      }}
    >
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block pr-[0.22em]"
            variants={{
              hidden: { y: "112%", opacity: 0, filter: "blur(8px)" },
              show: {
                y: "0%",
                opacity: 1,
                filter: "blur(0px)",
                transition: { duration: motionDuration.reveal, ease: motionEase.premium },
              },
            }}
            style={{ filter: "blur(0px)" }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
