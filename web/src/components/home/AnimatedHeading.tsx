"use client";

import { motion } from "framer-motion";
import { createElement, type ElementType, type ReactNode } from "react";
import { editorialEase, viewOnce } from "@/lib/motion";

const TRACES: Record<string, string> = {
  wave: "M0,9 C80,2 120,16 200,9 S320,2 400,9",
  arc: "M0,14 Q200,-2 400,14",
  zigzag: "M0,11 L40,5 L80,11 L120,5 L160,11 L200,5 L240,11 L280,5 L320,11 L360,5 L400,11",
  underline: "M0,10 L400,10",
  pulse: "M0,8 C100,14 200,2 300,8 S380,12 400,6",
};

const STROKE: Record<string, string> = {
  stone: "rgb(12 35 64 / 0.55)",
  navy: "rgb(12 35 64 / 0.7)",
  muted: "rgb(120 113 108 / 0.5)",
  white: "rgb(255 255 255 / 0.45)",
  sky: "rgb(125 211 252 / 0.5)",
};

type Props = {
  children: ReactNode;
  id?: string;
  className?: string;
  /** SVG underline style — unique per section */
  trace?: keyof typeof TRACES;
  /** Stroke palette */
  stroke?: keyof typeof STROKE;
  align?: "left" | "center";
  as?: ElementType;
};

export function AnimatedHeading({
  children,
  id,
  className = "",
  trace = "wave",
  stroke = "stone",
  align = "left",
  as: Tag = "h2",
}: Props) {
  const d = TRACES[trace] ?? TRACES.wave;
  const strokeColor = STROKE[stroke] ?? STROKE.stone;

  return (
    <div className={align === "center" ? "mx-auto flex max-w-3xl flex-col items-center" : ""}>
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewOnce}
        transition={{ duration: 1, ease: editorialEase }}
        className={align === "center" ? "w-full text-center" : ""}
      >
        {createElement(Tag, { id, className }, children)}
        <svg
          viewBox="0 0 400 18"
          className={
            align === "center"
              ? "mt-5 h-[14px] w-[min(100%,22rem)] max-w-full sm:h-[16px]"
              : "mt-5 h-[14px] w-full max-w-md sm:h-[16px]"
          }
          fill="none"
          preserveAspectRatio="none"
          aria-hidden
        >
          <motion.path
            d={d}
            stroke={strokeColor}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={viewOnce}
            transition={{ duration: 1.45, ease: editorialEase, delay: 0.15 }}
          />
        </svg>
      </motion.div>
    </div>
  );
}
