"use client";

import type { ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useSpring,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { editorialEase, springSnappy, viewOnce } from "@/lib/motion";
import { AnimatedStatCounter } from "./AnimatedStatCounter";
import { AnimatedHeading } from "./AnimatedHeading";

const stats = [
  { end: 35, suffix: "+", label: "Years of leadership", delay: 0 },
  { end: 100, suffix: "+", label: "Countries served", delay: 0.12 },
  { end: 25, suffix: "M m²", label: "Annual production capacity", delay: 0.24 },
  { end: 50, suffix: "K+", label: "Projects worldwide", delay: 0.36 },
];

function TiltGridCell({ i, children }: { i: number; children: ReactNode }) {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(mx, [0, 1], [6, -6]), {
    stiffness: 80,
    damping: 18,
  });
  const ry = useSpring(useTransform(my, [0, 1], [-5, 5]), {
    stiffness: 80,
    damping: 18,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewOnce}
      transition={{ ...springSnappy, delay: 0.08 * i }}
      style={
        reduce
          ? undefined
          : {
              rotateX: rx,
              rotateY: ry,
              transformStyle: "preserve-3d",
            }
      }
      onMouseMove={(e) => {
        if (reduce) return;
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width);
        my.set((e.clientY - r.top) / r.height);
      }}
      onMouseLeave={() => {
        mx.set(0.5);
        my.set(0.5);
      }}
      className="relative rounded-2xl border border-stone-200/80 bg-white/70 p-6 shadow-sm backdrop-blur-sm [perspective:800px] sm:p-7"
    >
      {children}
    </motion.div>
  );
}

export function StatsSection() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-y border-stone-200/70 bg-white py-[var(--section-y-lg)]">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-1/2 top-1/2 h-[140%] w-[140%] -translate-y-1/2 opacity-[0.06]"
        style={{
          background:
            "conic-gradient(from 0deg, #0c2340, #4a7ab8, #0c2340, transparent 55%)",
        }}
        animate={reduce ? undefined : { rotate: [0, 360] }}
        transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(12,35,64,0.06),transparent)]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={viewOnce}
        transition={{ duration: 1.4, ease: editorialEase }}
      />

      <div className="relative mx-auto max-w-[1200px] px-6 sm:px-10">
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.6em" }}
          whileInView={{ opacity: 1, letterSpacing: "0.38em" }}
          viewport={viewOnce}
          transition={{ duration: 1.2, ease: editorialEase }}
          className="text-center text-[11px] font-medium uppercase text-stone-400"
        >
          Scale & reach
        </motion.p>
        <div className="mx-auto mt-5 max-w-2xl">
          <AnimatedHeading
            trace="zigzag"
            stroke="navy"
            align="center"
            className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,3.5vw,2.35rem)] font-light leading-snug tracking-tight text-stone-800"
          >
            One specification language. Manufacturing and offices across the
            map.
          </AnimatedHeading>
        </div>
      </div>

      <div className="relative mx-auto mt-16 grid max-w-[1200px] grid-cols-1 gap-6 px-6 sm:mt-20 sm:grid-cols-2 sm:px-10 lg:grid-cols-4">
        {stats.map((s, i) => (
          <TiltGridCell key={s.label} i={i}>
            <AnimatedStatCounter
              end={s.end}
              suffix={s.suffix}
              label={s.label}
              delay={s.delay}
            />
          </TiltGridCell>
        ))}
      </div>
    </section>
  );
}
