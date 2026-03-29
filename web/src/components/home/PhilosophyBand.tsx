"use client";

import { motion, useReducedMotion } from "framer-motion";
import { editorialEase, viewOnce } from "@/lib/motion";

const SIGNATURE_PATH =
  "M0,9 C80,2 120,16 200,9 S320,2 400,9";

const LINES = [
  "A façade is not only the outer skin of a building —",
  "it is the expression of its character, ambition, and identity.",
];

export function PhilosophyBand() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-y border-stone-200/80 bg-[#fafaf9] py-20 sm:py-28 md:py-32">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        animate={
          reduce ? undefined : { x: ["-25%", "25%"] }
        }
        transition={{
          duration: 14,
          ease: "linear",
          repeat: reduce ? 0 : Infinity,
          repeatType: "mirror",
        }}
        style={{
          background:
            "linear-gradient(105deg, transparent 0%, rgba(12,35,64,0.04) 45%, rgba(12,35,64,0.09) 50%, rgba(12,35,64,0.04) 55%, transparent 100%)",
        }}
      />

      <div className="relative mx-auto max-w-3xl px-6 text-center sm:px-10">
        <div className="space-y-1 sm:space-y-2">
          {LINES.map((line, i) => (
            <div key={line} className="overflow-hidden">
              <motion.p
                initial={{ y: "110%", rotate: reduce ? 0 : 2 }}
                whileInView={{ y: 0, rotate: 0 }}
                viewport={viewOnce}
                transition={{
                  duration: 1.05,
                  delay: 0.14 * i,
                  ease: editorialEase,
                }}
                className="font-[family-name:var(--font-display)] text-2xl font-light leading-snug tracking-tight text-stone-700 sm:text-3xl md:text-[2rem] md:leading-[1.35]"
              >
                {line}
              </motion.p>
            </div>
          ))}
        </div>

        <svg
          viewBox="0 0 400 18"
          className="mx-auto mt-10 h-[12px] w-[min(100%,18rem)] max-w-full sm:h-[14px]"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden
        >
          <motion.path
            d={SIGNATURE_PATH}
            stroke="rgb(12 35 64 / 0.35)"
            strokeWidth={2}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={viewOnce}
            transition={{ duration: 1.5, ease: editorialEase, delay: 0.35 }}
          />
        </svg>

        <motion.p
          initial={{ opacity: 0, clipPath: "inset(0 50% 0 50%)" }}
          whileInView={{ opacity: 1, clipPath: "inset(0 0% 0 0%)" }}
          viewport={viewOnce}
          transition={{ duration: 1.25, delay: 0.45, ease: editorialEase }}
          className="mx-auto mt-8 max-w-xl text-sm leading-relaxed text-stone-500 sm:text-base"
        >
          At Alubond, every panel is engineered to honour the architect&apos;s
          vision — with the{" "}
          <motion.span
            className="relative inline text-stone-800"
            initial={{ backgroundSize: "0% 100%" }}
            whileInView={{ backgroundSize: "100% 100%" }}
            viewport={viewOnce}
            transition={{ duration: 0.9, delay: 0.75, ease: editorialEase }}
            style={{
              backgroundImage:
                "linear-gradient(transparent 60%, rgba(12,35,64,0.12) 60%)",
              backgroundRepeat: "no-repeat",
            }}
          >
            precision, consistency, and fire performance
          </motion.span>{" "}
          the envelope demands.
        </motion.p>
      </div>
    </section>
  );
}
