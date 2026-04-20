"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { motionDuration, motionEase } from "@/lib/motion";
import { cn } from "@/lib/utils";

type MagneticCtaProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
};

export function MagneticCta({ href, children, variant = "primary", className }: MagneticCtaProps) {
  const prefersReducedMotion = useReducedMotion();
  const isExternal = href.startsWith("http");
  const baseClassName = variant === "primary" ? "btn-primary" : "btn-ghost border-white/20 px-5 text-white hover:text-neon";

  const content = (
    <motion.span
      whileHover={prefersReducedMotion ? undefined : { y: -2, scale: 1.015 }}
      whileTap={prefersReducedMotion ? undefined : { scale: 0.985 }}
      transition={{ duration: motionDuration.hover, ease: motionEase.standard }}
      className={cn(baseClassName, className)}
    >
      {children}
    </motion.span>
  );

  if (isExternal) {
    return (
      <a href={href} className="inline-flex rounded-md">
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className="inline-flex rounded-md">
      {content}
    </Link>
  );
}

export const CTAInteractive = MagneticCta;
