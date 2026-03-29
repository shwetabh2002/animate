"use client";

import type { MotionValue } from "framer-motion";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { editorialEase, viewOnce } from "@/lib/motion";
import { AnimatedHeading } from "./AnimatedHeading";

const projects = [
  "Burj Khalifa — Dubai",
  "Red Sea International Airport — NEOM",
  "The Address Downtown — Dubai",
  "Khalifa International Stadium — Doha",
  "Tornado Tower — Doha",
  "Yas Marina Circuit — Abu Dhabi",
  "Abu Dhabi International Airport",
  "Krestovsky Stadium — St. Petersburg",
  "NAC Municipal Building — Belgium",
  "Landmark Development — Croatia",
];

function MarqueeRow({
  items,
  slow,
  skew,
}: {
  items: string[];
  slow?: boolean;
  skew: MotionValue<number>;
}) {
  const cell = (p: string, suffix: string) => (
    <span
      key={`${p}-${suffix}`}
      className="flex shrink-0 items-center gap-10 sm:gap-16"
    >
      <span className="text-[13px] font-normal tracking-wide text-stone-500">
        {p}
      </span>
      <span className="text-stone-300/90" aria-hidden>
        ·
      </span>
    </span>
  );

  return (
    <div className="overflow-hidden">
      <motion.div
        className={`flex w-max ${slow ? "animate-marquee-slow" : "animate-marquee"}`}
        style={{ skewX: skew }}
      >
        {items.map((p) => cell(p, "a"))}
        {items.map((p) => cell(p, "b"))}
      </motion.div>
    </div>
  );
}

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const skewA = useTransform(scrollYProgress, [0, 0.5, 1], reduce ? [0, 0, 0] : [3, 0, -2.5]);
  const skewB = useTransform(scrollYProgress, [0, 0.5, 1], reduce ? [0, 0, 0] : [-2.5, 0, 3]);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="scroll-mt-20 overflow-hidden border-y border-stone-200/80 bg-[#fafaf9] py-[var(--section-y)]"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        animate={reduce ? undefined : { opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          backgroundImage:
            "linear-gradient(95deg, transparent 42%, rgba(12,35,64,0.07) 50%, transparent 58%)",
        }}
      />

      <div className="relative mx-auto max-w-[1200px] px-6 sm:px-10">
        <motion.p
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={viewOnce}
          transition={{ duration: 0.9, ease: editorialEase }}
          className="text-center text-[11px] font-medium uppercase tracking-[0.38em] text-stone-500"
        >
          Landmark installations
        </motion.p>
        <div className="mx-auto mt-5 max-w-xl">
          <AnimatedHeading
            trace="arc"
            stroke="muted"
            align="center"
            className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,3.5vw,2.5rem)] font-light leading-snug tracking-tight text-stone-900"
          >
            Trusted where the specification does not forgive compromise.
          </AnimatedHeading>
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewOnce}
          transition={{ duration: 1, delay: 0.15, ease: editorialEase }}
          className="mx-auto mt-6 max-w-lg text-center text-[14px] leading-relaxed text-stone-500"
        >
          A sample of projects specifying Alubond — from towers and airports to
          stadia and civic landmarks.
        </motion.p>
      </div>

      <div className="relative mt-14 flex flex-col gap-5 sm:mt-16">
        <div className="px-6 sm:px-10">
          <MarqueeRow items={projects} skew={skewA} />
        </div>
        <div className="px-6 sm:px-10">
          <MarqueeRow items={[...projects].reverse()} slow skew={skewB} />
        </div>
      </div>
    </section>
  );
}
