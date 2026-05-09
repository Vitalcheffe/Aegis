"use client";

import { ReactNode } from "react";
import { motion, useScroll, type Variants } from "framer-motion";

/* ════════════════════════════════════════════════════════════════
   ANIMATION VARIANTS — Palantir-grade micro-interactions
   Strict B&W. Subtle, professional, never flashy.
   ════════════════════════════════════════════════════════════════ */

type VariantKey =
  | "fadeUp"
  | "fadeDown"
  | "fadeLeft"
  | "fadeRight"
  | "scaleIn"
  | "stagger";

const variantMap: Record<VariantKey, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  fadeDown: {
    hidden: { opacity: 0, y: -40 },
    visible: { opacity: 1, y: 0 },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 },
  },
  fadeRight: {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.92 },
    visible: { opacity: 1, scale: 1 },
  },
  stagger: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  },
};

/* Shared transition presets */
const transitionPresets = {
  default: {
    duration: 0.7,
    ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
  },
};

/* ════════════════════════════════════════════════════════════════
   SCROLL REVEAL — Fades in on viewport entry with variant support
   ════════════════════════════════════════════════════════════════ */

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Animation variant — defaults to "fadeUp" for backward compatibility */
  variant?: VariantKey;
  /** Override framer-motion transition */
  transition?: Record<string, unknown>;
  /** Custom initial state override */
  initial?: string;
  /** Custom animate state override */
  animate?: string;
  /** Stagger children? When set, wraps in a stagger container */
  staggerChildren?: number;
  /** Viewport amount needed to trigger (0–1) */
  viewportAmount?: number;
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  variant = "fadeUp",
  transition,
  initial,
  animate,
  staggerChildren,
  viewportAmount = 0.15,
}: ScrollRevealProps) {
  /* Stagger container mode */
  if (staggerChildren !== undefined) {
    return (
      <motion.div
        className={className}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: viewportAmount,
          margin: "0px 0px -60px 0px",
        }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren,
              delayChildren: delay,
            },
          },
        }}
      >
        {children}
      </motion.div>
    );
  }

  const selectedVariant = variantMap[variant];

  return (
    <motion.div
      className={className}
      initial={initial ?? "hidden"}
      whileInView={animate ?? "visible"}
      viewport={{
        once: true,
        amount: viewportAmount,
        margin: "0px 0px -60px 0px",
      }}
      variants={selectedVariant}
      transition={
        transition ?? {
          ...transitionPresets.default,
          delay,
        }
      }
    >
      {children}
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════════════
   STAGGER CHILD — Use inside a stagger parent ScrollReveal
   ════════════════════════════════════════════════════════════════ */

interface StaggerChildProps {
  children: ReactNode;
  className?: string;
  variant?: VariantKey;
}

export function StaggerChild({
  children,
  className = "",
  variant = "fadeUp",
}: StaggerChildProps) {
  const selectedVariant = variantMap[variant];

  return (
    <motion.div
      className={className}
      variants={selectedVariant}
      transition={transitionPresets.default}
    >
      {children}
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════════════
   ANIMATED LINE — Horizontal divider that slides in from left
   ════════════════════════════════════════════════════════════════ */

interface AnimatedLineProps {
  className?: string;
}

export function AnimatedLine({ className = "" }: AnimatedLineProps) {
  return (
    <div className={`h-px bg-white/10 overflow-hidden ${className}`}>
      <motion.div
        className="h-full bg-white/20 origin-left"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      />
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   SCROLL PROGRESS INDICATOR — Thin white line at top of viewport
   Palantir-style: shows scroll progress from 0% to 100%
   ════════════════════════════════════════════════════════════════ */

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-white origin-left z-50"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
