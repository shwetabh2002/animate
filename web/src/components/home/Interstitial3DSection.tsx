"use client";

import dynamic from "next/dynamic";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { AnimatedHeading } from "./AnimatedHeading";
import { editorialEase, viewOnce } from "@/lib/motion";

const FloatingShardsScene = dynamic(() => import("./FloatingShardsScene"), {
  ssr: false,
  loading: () => (
    <div
      className="absolute inset-0 z-0 bg-[#070d18]"
      aria-hidden
    />
  ),
});

export function Interstitial3DSection() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const textY = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? ["0%", "0%"] : ["18%", "-18%"],
  );
  const textOpacity = useTransform(scrollYProgress, [0, 0.2, 0.75, 1], [0.4, 1, 1, 0.35]);
  const glow = useTransform(scrollYProgress, [0, 0.5, 1], [0.25, 0.55, 0.3]);

  return (
    <section
      ref={ref}
      aria-labelledby="interstitial-3d-heading"
      className="relative min-h-[88vh] overflow-hidden scroll-mt-20"
    >
      <FloatingShardsScene />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-[#38bdf8]/[0.03]"
        style={{ opacity: glow }}
      />
      <div className="relative z-10 flex min-h-[88vh] flex-col items-center justify-center px-6 py-24 sm:px-10">
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.5em" }}
          whileInView={{ opacity: 1, letterSpacing: "0.32em" }}
          viewport={viewOnce}
          transition={{ duration: 1.2, ease: editorialEase }}
          className="mb-6 text-center text-[10px] font-semibold uppercase text-sky-200/70"
        >
          Second canvas — crystalline field
        </motion.p>
        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className="max-w-3xl text-center"
        >
          <AnimatedHeading
            id="interstitial-3d-heading"
            as="h2"
            trace="arc"
            stroke="white"
            align="center"
            className="font-[family-name:var(--font-display)] text-[clamp(1.85rem,4.5vw,3rem)] font-light leading-[1.15] tracking-tight text-white"
          >
            Material intelligence — traced in microns, proven in megajoules and
            fire curves.
          </AnimatedHeading>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewOnce}
          transition={{ duration: 1, delay: 0.35, ease: editorialEase }}
          className="mx-auto mt-12 max-w-lg text-center text-[14px] leading-relaxed text-slate-400"
        >
          A separate WebGL layer from the hero: floating chromatic shards to mark
          the transition from metrics to meaning.
        </motion.p>
      </div>
    </section>
  );
}
