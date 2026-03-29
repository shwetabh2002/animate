"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Props = {
  end: number;
  suffix: string;
  label: string;
  delay?: number;
};

export function AnimatedStatCounter({
  end,
  suffix,
  label,
  delay = 0,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12%" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;
    let controls: ReturnType<typeof animate> | undefined;
    const tid = window.setTimeout(() => {
      controls = animate(0, end, {
        duration: 2.4,
        ease: [0.22, 1, 0.36, 1],
        onUpdate: (v) => setDisplay(Math.round(v)),
      });
    }, delay * 1000);
    return () => {
      window.clearTimeout(tid);
      controls?.stop();
    };
  }, [inView, end, delay, reduce]);

  const value = reduce ? end : display;

  return (
    <div ref={ref} className="text-center sm:text-left">
      <p className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,5vw,3.5rem)] font-light tabular-nums tracking-tight text-[#0c2340]">
        {value}
        {suffix}
      </p>
      <p className="mt-3 max-w-[14rem] text-[13px] font-normal leading-relaxed text-stone-500 sm:mx-0 sm:max-w-none">
        {label}
      </p>
    </div>
  );
}
