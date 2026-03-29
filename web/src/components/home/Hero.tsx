"use client";

import dynamic from "next/dynamic";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useRef } from "react";
import { editorialEase, springSoft } from "@/lib/motion";

const AlubondScene = dynamic(() => import("./AlubondScene"), {
  ssr: false,
  loading: () => (
    <div
      className="absolute inset-0 z-0 bg-[#ede9e0]"
      aria-hidden
    />
  ),
});

/** Cream columns that lift away — inspired by editorial promo reveals, not a 1:1 copy. */
const MASK_COLUMNS = [
  { blocks: [0.42, 0.28, 0.3] as const },
  { blocks: [0.55, 0.45] as const },
  { blocks: [0.33, 0.34, 0.33] as const },
  { blocks: [0.5, 0.5] as const },
  { blocks: [0.38, 0.62] as const },
];

const TOP_INSIGHTS = [
  {
    title: "Non-combustible core",
    line: "Mineral-filled A2 / B1 systems for demanding envelopes.",
  },
  {
    title: "Global footprint",
    line: "Manufacturing and teams across four continents.",
  },
  {
    title: "Specification-ready",
    line: "Test reports, fire classifications, and project references.",
  },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const parallaxX = useSpring(mouseX, springSoft);
  const parallaxY = useSpring(mouseY, springSoft);

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: MouseEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      mouseX.set((e.clientX / w - 0.5) * 22);
      mouseY.set((e.clientY / h - 0.5) * 14);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduce, mouseX, mouseY]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "6%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const stageScale = useTransform(scrollYProgress, [0, 0.45], [1, 0.94]);

  const enter = { duration: 1.15, ease: editorialEase };

  return (
    <section
      ref={sectionRef}
      className="relative isolate min-h-[100dvh] overflow-hidden bg-[#c5cfc0]"
    >
      {/* Studio field — soft sage, not a photograph */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#dde5d6] via-[#c8d2c0] to-[#aab9a2]"
        aria-hidden
      />
      <div
        className="absolute inset-0 opacity-[0.35] mix-blend-multiply bg-[radial-gradient(ellipse_80%_60%_at_70%_30%,rgba(255,255,255,0.5),transparent)]"
        aria-hidden
      />

      {!reduce && (
        <>
          <motion.div
            aria-hidden
            className="absolute -left-24 top-[18%] h-[min(52vw,420px)] w-[min(52vw,420px)] rounded-full bg-[#ede9e0]/50 blur-3xl"
            animate={{ scale: [1, 1.12, 1], opacity: [0.35, 0.5, 0.35] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            className="absolute -right-16 bottom-[30%] h-[min(40vw,320px)] w-[min(40vw,320px)] rounded-full bg-[#2c382c]/10 blur-3xl"
            animate={{ scale: [1.08, 1, 1.08], opacity: [0.25, 0.4, 0.25] }}
            transition={{
              duration: 11,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </>
      )}

      {/* 3D-only wash so the stage never reads “through” copy */}
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-transparent via-transparent to-[#c5cfc0]/95 lg:bg-gradient-to-r lg:from-transparent lg:via-[#c5cfc0]/40 lg:to-transparent"
        aria-hidden
      />

      {/* Mask columns — %-translate on flex children is unreliable (often stays at 0); use vh + post-reveal fade. */}
      {!reduce && (
        <motion.div
          className="pointer-events-none absolute inset-x-0 bottom-0 top-[4.25rem] z-[3] overflow-hidden sm:top-[4.5rem]"
          aria-hidden
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ delay: 2.35, duration: 0.5, ease: editorialEase }}
        >
          <div className="grid h-[calc(100dvh-4.25rem)] min-h-[min(100dvh-4.25rem,800px)] grid-cols-5 gap-1 sm:h-[calc(100dvh-4.5rem)] sm:min-h-[min(100dvh-4.5rem,800px)] sm:gap-1.5">
            {MASK_COLUMNS.map((col, ci) => (
              <div
                key={ci}
                className="flex h-full min-h-0 flex-col gap-1 sm:gap-1.5"
              >
                {col.blocks.map((fr, bi) => (
                  <motion.div
                    key={bi}
                    initial={{ y: 0 }}
                    animate={{ y: "-120vh" }}
                    transition={{
                      duration: 1.15,
                      delay: 0.55 + ci * 0.09 + bi * 0.05,
                      ease: editorialEase,
                    }}
                    className="min-h-0 flex-1 rounded-[2px] bg-[#ede9e0] shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]"
                    style={{ flexGrow: fr, flexBasis: 0 }}
                  />
                ))}
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Foreground: grid keeps 3D and copy in separate tracks (no more centered canvas over bottom-aligned type). */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-20 mx-auto grid min-h-[100dvh] w-full max-w-[1200px] grid-cols-1 gap-10 px-6 pb-20 pt-[calc(5rem+1.5rem)] sm:px-10 sm:pb-24 sm:pt-[calc(5.25rem+1.5rem)] lg:grid-cols-[minmax(0,1.02fr)_minmax(0,1.08fr)] lg:items-center lg:gap-12 lg:pb-28 pointer-events-none [&_a]:pointer-events-auto"
      >
        {/* 3D — top on mobile, right column on lg */}
        <motion.div
          style={{ scale: reduce ? 1 : stageScale }}
          className="relative order-1 h-[min(36vh,340px)] w-full max-lg:mx-auto max-lg:max-w-[min(100%,520px)] lg:order-2 lg:h-[min(52vh,520px)] lg:max-w-none"
        >
          <div className="pointer-events-none relative h-full w-full overflow-hidden rounded-lg sm:rounded-xl">
            <AlubondScene tone="studio" />
            {/* Glass shelf: pinned to canvas bottom, not % of viewport */}
            <div
              className="pointer-events-none absolute bottom-3 left-1/2 z-[2] h-12 w-[min(90%,420px)] -translate-x-1/2 rounded-2xl border border-white/45 bg-gradient-to-b from-white/35 to-white/[0.12] shadow-[0_16px_40px_-14px_rgba(45,58,44,0.35)] backdrop-blur-xl sm:bottom-4 sm:h-14 lg:bottom-5"
              aria-hidden
            />
          </div>
        </motion.div>

        {/* Copy — below 3D on mobile, left column on lg */}
        <motion.div
          style={{ x: reduce ? 0 : parallaxX, y: reduce ? 0 : parallaxY }}
          className="order-2 flex min-h-0 flex-col justify-end lg:order-1 lg:justify-center lg:pr-4"
        >
          {/* Stays above insight cards during entrance transforms */}
          <div className="relative z-10">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...enter, delay: 1.05 }}
              className="mb-5 text-[11px] font-medium uppercase tracking-[0.4em] text-[#3d4f3d]/85"
            >
              Alubond U.S.A — Est. 1989
            </motion.p>
            <h1 className="max-w-[min(18ch,92vw)] font-[family-name:var(--font-display)] text-[clamp(2.5rem,6.5vw,4.75rem)] font-light leading-[0.98] tracking-[-0.03em] sm:max-w-[min(22ch,90vw)] lg:max-w-[min(14ch,40vw)]">
              <div className="overflow-hidden">
                <motion.span
                  className="block text-[#1e281e] [text-shadow:0_1px_0_rgba(221,229,214,0.9)]"
                  initial={{ y: "100%", opacity: 0.2 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ ...enter, delay: 1.08 }}
                >
                  Tested for safety.
                </motion.span>
              </div>
              <div className="overflow-hidden">
                <motion.span
                  className="mt-2 block text-[#2f3d2f]/90 [text-shadow:0_1px_0_rgba(221,229,214,0.9)]"
                  initial={{ y: "100%", opacity: 0.2 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ ...enter, delay: 1.18 }}
                >
                  Crafted for legacy.
                </motion.span>
              </div>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...enter, delay: 1.28 }}
              className="mt-8 max-w-lg text-[15px] leading-[1.8] text-[#3d4f3d]/92 sm:text-[16px]"
            >
              Fire-retardant metal composites for façades that cannot compromise
              — engineered clarity from specification to installation.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...enter, delay: 1.4 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <motion.a
                href="#series"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 22 }}
                className="inline-flex items-center justify-center rounded-full bg-[#2c382c] px-9 py-3.5 text-[12px] font-medium uppercase tracking-[0.2em] text-[#f4f1ea] transition-opacity duration-300 hover:opacity-90"
              >
                Explore series
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 22 }}
                className="inline-flex items-center justify-center rounded-full border border-[#2c382c]/25 bg-[#f4f1ea]/40 px-9 py-3.5 text-[12px] font-medium uppercase tracking-[0.18em] text-[#2c382c] backdrop-blur-sm transition-colors duration-300 hover:border-[#2c382c]/40"
              >
                Request specifications
              </motion.a>
            </motion.div>
          </div>

          {/* Below primary copy in stacking order; fades in after headline/CTA pass */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.85,
              ease: editorialEase,
              delay: reduce ? 0 : 2.35,
            }}
            className="relative z-0 mt-16 hidden min-w-0 max-w-full grid-cols-3 gap-4 lg:grid lg:mt-20 xl:gap-5"
          >
            {TOP_INSIGHTS.map((item) => (
              <div
                key={item.title}
                className="border border-[#2c382c]/12 bg-[#f4f1ea]/90 px-4 py-3.5 shadow-sm backdrop-blur-sm xl:px-5 xl:py-4"
              >
                <p className="font-[family-name:var(--font-display)] text-base font-light text-[#2c382c] xl:text-lg">
                  {item.title}
                </p>
                <p className="mt-2 text-[10px] font-medium uppercase leading-relaxed tracking-[0.18em] text-[#4a5c48]/90 xl:text-[11px] xl:tracking-[0.22em]">
                  {item.line}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1, ease: editorialEase }}
        className="pointer-events-none absolute bottom-8 left-1/2 z-20 hidden -translate-x-1/2 md:block"
        aria-hidden
      >
        <div className="flex h-10 w-5 justify-center rounded-full border border-[#2c382c]/20 pt-2">
          <motion.span
            className="h-1.5 w-1 rounded-full bg-[#2c382c]/40"
            animate={{ y: [0, 7, 0] }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: [0.45, 0, 0.55, 1],
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}
