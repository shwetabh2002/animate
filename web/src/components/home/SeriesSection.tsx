"use client";

import dynamic from "next/dynamic";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { useRef } from "react";
import { editorialEase, springSnappy, viewOnce } from "@/lib/motion";
import { AnimatedHeading } from "./AnimatedHeading";

const Series3DShowcase = dynamic(() => import("./Series3DShowcase"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[min(52vw,420px)] min-h-[280px] w-full items-center justify-center rounded-[1.75rem] border border-dashed border-stone-300/80 bg-stone-100/60 text-[11px] font-medium uppercase tracking-[0.28em] text-stone-400 sm:min-h-[320px]">
      Loading
    </div>
  ),
});

const series = [
  {
    id: "solid",
    name: "Solid Series",
    tagline: "Bold colour. Architectural drama.",
    description:
      "High-chroma PVDF and FEVE finishes for wave façades, canopies, and signature envelopes — engineered for UV stability and a long exterior life.",
    swatches: ["#f5e6a3", "#c0c5ce", "#e85d04", "#c1121f", "#0d5c63", "#212529"],
  },
  {
    id: "stone",
    name: "Stone Series",
    tagline: "Natural texture. Engineered longevity.",
    description:
      "Stone aesthetics on lightweight composite — suited to rainscreens and cladding, with anti-graffiti performance and minimal maintenance.",
    swatches: ["#ebe6dc", "#c4a574", "#b8a99a", "#9ca3af", "#f8f6f3", "#3d3d42"],
  },
  {
    id: "anodized",
    name: "Anodized Series",
    tagline: "Sustainable brilliance. Engineered colour.",
    description:
      "Anodic oxide film for scratch and fade resistance — a calm metallic character for iconic architecture and high-traffic interiors.",
    swatches: ["#c5ccd4", "#c9a961", "#a65d3a", "#5c6670", "#2f5d50", "#1c1c1e"],
  },
];

export function SeriesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const showcaseY = useTransform(scrollYProgress, [0, 0.5, 1], [40, 0, -24]);
  const showcaseRotate = useTransform(
    scrollYProgress,
    [0, 1],
    [reduce ? 0 : -1.2, reduce ? 0 : 1.2]
  );

  return (
    <section
      ref={sectionRef}
      id="series"
      className="scroll-mt-20 bg-[#f5f5f4] py-[var(--section-y-lg)]"
    >
      <div className="mx-auto max-w-[1200px] px-6 sm:px-10">
        <div className="lg:grid lg:grid-cols-[minmax(240px,320px)_minmax(0,1fr)] lg:items-start lg:gap-14 xl:grid-cols-[minmax(260px,360px)_minmax(0,1fr)] xl:gap-16">
          <div className="mb-10 lg:sticky lg:top-28 lg:z-10 lg:mb-0 lg:self-start lg:pb-8">
            <motion.p
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewOnce}
              transition={{ duration: 0.9, ease: editorialEase }}
              className="text-[11px] font-medium uppercase tracking-[0.38em] text-stone-500"
            >
              Product families
            </motion.p>
            <div className="mt-4">
              <AnimatedHeading
                trace="wave"
                stroke="navy"
                className="font-[family-name:var(--font-display)] text-[clamp(2rem,4.5vw,3.25rem)] font-light leading-[1.12] tracking-tight text-stone-900"
              >
                Three surface languages.
                <span className="mt-1 block text-stone-600">
                  One fire-safe core.
                </span>
              </AnimatedHeading>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewOnce}
              transition={{ duration: 1, delay: 0.12, ease: editorialEase }}
              className="mt-8 text-[15px] leading-[1.75] text-stone-600 sm:text-[16px]"
            >
              Solid, stone, and anodized finishes — each built on a
              mineral-filled, non-combustible core, tested to the façade
              standards your specification demands.
            </motion.p>
          </div>

          <div>
            <motion.div
              style={{
                y: reduce ? 0 : showcaseY,
                rotateZ: reduce ? 0 : showcaseRotate,
              }}
              className="mt-2 origin-center [perspective:1400px] lg:mt-0"
            >
              <Series3DShowcase />
            </motion.div>

            <div className="mt-20 grid gap-10 lg:mt-28 lg:grid-cols-3 lg:gap-8 [perspective:1200px]">
              {series.map((card, i) => (
                <motion.article
                  key={card.id}
                  initial={{ opacity: 0, y: 48, rotateX: 8 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={viewOnce}
                  transition={{ ...springSnappy, delay: 0.06 * i }}
                  whileHover={
                    reduce
                      ? undefined
                      : {
                          rotateY: -5,
                          rotateX: 3,
                          y: -8,
                          transition: {
                            type: "spring",
                            stiffness: 260,
                            damping: 22,
                          },
                        }
                  }
                  style={{ transformStyle: "preserve-3d" }}
                  className="flex flex-col border-t border-stone-300/90 pt-10 lg:border-t-0 lg:border-l lg:border-stone-300/90 lg:pt-0 lg:pl-8 first:lg:border-l-0 first:lg:pl-0"
                >
                  <h3 className="font-[family-name:var(--font-display)] text-[1.65rem] font-light tracking-tight text-stone-900">
                    {card.name}
                  </h3>
                  <p className="mt-2 text-[13px] font-normal text-stone-500">
                    {card.tagline}
                  </p>
                  <p className="mt-6 flex-1 text-[15px] leading-[1.75] text-stone-600">
                    {card.description}
                  </p>
                  <div className="mt-10 flex gap-2.5">
                    {card.swatches.map((c, si) => (
                      <motion.span
                        key={c}
                        initial={{ scale: 0, rotate: -30 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        viewport={viewOnce}
                        transition={{
                          ...springSnappy,
                          delay: 0.04 * si + 0.15 * i,
                        }}
                        whileHover={{ scale: 1.15, y: -3 }}
                        className="h-8 w-8 cursor-default rounded-md border border-stone-900/[0.06] bg-white shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]"
                        style={{ backgroundColor: c }}
                        title={c}
                      />
                    ))}
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
