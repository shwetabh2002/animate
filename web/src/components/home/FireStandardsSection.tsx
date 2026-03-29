"use client";

import { motion, useReducedMotion } from "framer-motion";
import { editorialEase, viewOnce } from "@/lib/motion";
import { AnimatedHeading } from "./AnimatedHeading";

const badges = [
  "EN 13501-1 — A2-s1,d0",
  "NFPA 285",
  "BS 8414 / BRE",
  "ASTM E84 Class A",
  "ISO 9001",
];

const ROWS = [badges.slice(0, 3), badges.slice(3)];

export function FireStandardsSection() {
  const reduce = useReducedMotion();

  return (
    <section
      id="standards"
      className="relative scroll-mt-20 overflow-hidden bg-white py-[var(--section-y-lg)]"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-20 top-1/2 h-[min(80vw,520px)] w-[min(80vw,520px)] -translate-y-1/2 rounded-full bg-[#0c2340]/[0.04] blur-3xl"
        animate={
          reduce ? undefined : { scale: [1, 1.08, 1], opacity: [0.5, 0.75, 0.5] }
        }
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto max-w-[1200px] px-6 sm:px-10">
        <div className="lg:grid lg:grid-cols-12 lg:gap-16">
          <aside className="lg:sticky lg:top-28 lg:col-span-5 lg:z-10 lg:self-start lg:pb-4">
            <motion.p
              initial={{ opacity: 0, y: -12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewOnce}
              transition={{ duration: 1, ease: editorialEase }}
              className="text-[11px] font-medium uppercase tracking-[0.38em] text-stone-500"
            >
              Fire & safety
            </motion.p>
            <div className="mt-4">
              <AnimatedHeading
                trace="pulse"
                stroke="navy"
                className="font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3rem)] font-light leading-[1.12] tracking-tight text-stone-900"
              >
                Global standards. Documented performance.
              </AnimatedHeading>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewOnce}
              transition={{ duration: 1.05, delay: 0.12, ease: editorialEase }}
              className="mt-8 max-w-md text-[15px] leading-[1.75] text-stone-600"
            >
              Independently tested for façades that must satisfy the strictest
              fire propagation and reaction-to-fire regimes — with
              submittal-ready documentation.
            </motion.p>
          </aside>

          <div className="mt-14 flex flex-col gap-0 lg:col-span-7 lg:mt-0 lg:min-h-[130vh] lg:justify-between lg:py-6">
            {ROWS.map((row, ri) => (
              <div
                key={ri}
                className="flex min-h-[min(52vh,480px)] flex-wrap content-center items-center gap-3 border-t border-stone-200/80 py-10 first:border-t-0 first:pt-0 lg:min-h-[48vh] lg:border-t lg:py-12"
              >
                {row.map((b, i) => {
                  const globalI = ri === 0 ? i : i + 3;
                  return (
                    <motion.div
                      key={b}
                      initial={{ opacity: 0, rotate: -8, y: 28 }}
                      whileInView={{ opacity: 1, rotate: 0, y: 0 }}
                      viewport={viewOnce}
                      transition={{
                        type: "spring",
                        stiffness: 120,
                        damping: 18,
                        delay: 0.07 * globalI,
                      }}
                    >
                      <motion.span
                        className="inline-block rounded-md border border-stone-200/90 bg-stone-50/90 px-4 py-2.5 text-[13px] font-normal text-stone-700 shadow-sm"
                        animate={reduce ? undefined : { y: [0, -5, 0] }}
                        transition={{
                          duration: 4.5 + globalI * 0.35,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: globalI * 0.15,
                        }}
                        whileHover={{
                          scale: 1.04,
                          borderColor: "rgba(12,35,64,0.25)",
                        }}
                      >
                        {b}
                      </motion.span>
                    </motion.div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
