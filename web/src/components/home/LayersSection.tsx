"use client";

import { motion, useReducedMotion } from "framer-motion";
import { editorialEase, viewOnce } from "@/lib/motion";
import { AnimatedHeading } from "./AnimatedHeading";

const layers = [
  {
    step: "01",
    title: "Specialised coating",
    body: "PVDF / FEVE / HDPE with epoxy primer and chromate treatment per AAMA.",
  },
  {
    step: "02",
    title: "Top metal skin",
    body: "Aluminium, stainless, GI, zinc — hot-bonded for zero delamination.",
  },
  {
    step: "03",
    title: "Fire-rated core",
    body: "FR mineral core — A2 / B1 aligned with EN, ASTM, DIN, UL testing.",
  },
  {
    step: "04",
    title: "Bottom metal skin",
    body: "Structural backing for rigidity, wind load, and thermal stability.",
  },
  {
    step: "05",
    title: "Base treatment",
    body: "Chromate, epoxy primer, and service coats for harsh environments.",
  },
];

export function LayersSection() {
  const reduce = useReducedMotion();

  return (
    <section
      id="layers"
      className="scroll-mt-20 bg-[#0b1f3a] py-12 text-white sm:py-16 lg:py-[var(--section-y-lg)]"
    >
      <div className="mx-auto max-w-[1200px] px-6 sm:px-10">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:z-10 lg:max-w-md lg:self-start lg:pb-12">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewOnce}
              transition={{ duration: 1, ease: editorialEase }}
              className="text-[11px] font-medium uppercase tracking-[0.38em] text-sky-200/70"
            >
              Panel construction
            </motion.p>
            <div className="mt-4">
              <AnimatedHeading
                trace="underline"
                stroke="sky"
                className="font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3.25rem)] font-light leading-[1.12] tracking-tight text-white"
              >
                Engineered without compromise.
              </AnimatedHeading>
            </div>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewOnce}
              transition={{ duration: 1.05, delay: 0.12, ease: editorialEase }}
              className="mt-8 text-[15px] leading-[1.75] text-stone-400"
            >
              Every layer is specified, tested, and certified — so performance
              stays predictable from mock-up to handover.
            </motion.p>

            <div className="mt-12 [perspective:1200px] lg:mt-14">
              <motion.div
                className="relative mx-auto max-w-[260px] lg:mx-0"
                animate={
                  reduce
                    ? undefined
                    : { y: [0, -6, 0], rotateY: [-14, -12, -14] }
                }
                transition={{
                  duration: 6,
                  repeat: reduce ? 0 : Infinity,
                  ease: "easeInOut",
                }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div
                  className="absolute inset-0 rounded-2xl bg-orange-400/15 blur-3xl"
                  aria-hidden
                />
                <div className="relative flex flex-col gap-1.5 rounded-2xl border border-white/[0.09] bg-white/[0.03] p-5 backdrop-blur-[2px]">
                  <div className="h-3 rounded-md bg-gradient-to-r from-stone-200 to-stone-400" />
                  <div className="h-5 rounded-md bg-[#12141a]" />
                  <div className="h-3 rounded-md bg-gradient-to-r from-stone-400 to-stone-500" />
                </div>
              </motion.div>
            </div>
          </div>

          <div className="relative lg:min-h-[240vh]">
            <motion.div
              aria-hidden
              className="absolute bottom-0 left-3 top-0 w-px origin-top bg-gradient-to-b from-sky-300/50 via-sky-200/25 to-transparent"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={viewOnce}
              transition={{ duration: 1.8, ease: editorialEase }}
            />
            <ul className="relative space-y-0 border-t border-white/[0.08] pl-10 lg:border-t-0">
              {layers.map((layer, i) => (
                <motion.li
                  key={layer.step}
                  initial={{ opacity: 0, x: 48, filter: "blur(10px)" }}
                  whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-20% 0px", amount: 0.35 }}
                  transition={{
                    duration: 0.95,
                    delay: 0.06 * i,
                    ease: editorialEase,
                  }}
                  className="flex min-h-[min(72vh,600px)] flex-col justify-center border-b border-white/[0.06] py-10 last:border-b-0 lg:min-h-[75vh] lg:py-12"
                >
                  <motion.span
                    className="font-mono text-[11px] text-sky-200/60"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={viewOnce}
                    transition={{
                      duration: 0.55,
                      delay: 0.06 * i,
                      ease: editorialEase,
                    }}
                  >
                    {layer.step}
                  </motion.span>
                  <h3 className="mt-2 text-[1.15rem] font-medium tracking-tight text-white/95 sm:text-[1.05rem]">
                    {layer.title}
                  </h3>
                  <p className="mt-4 max-w-md text-[15px] leading-[1.75] text-stone-400 sm:text-[14px]">
                    {layer.body}
                  </p>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
