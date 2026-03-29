"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { editorialEase, viewOnce } from "@/lib/motion";
import { AnimatedHeading } from "./AnimatedHeading";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.14, delayChildren: 0.06 },
  },
};

const item = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.95, ease: editorialEase },
  },
};

export function Footer() {
  return (
    <footer
      id="contact"
      className="relative scroll-mt-20 overflow-hidden bg-[#05070c] text-stone-500"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-32 bottom-0 h-[min(70vw,480px)] w-[min(70vw,480px)] rounded-full bg-[#0c2340]/40 blur-[100px]"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.8, ease: editorialEase }}
      />

      <div className="relative mx-auto max-w-[1200px] px-6 py-[var(--section-y-lg)] sm:px-10">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={viewOnce}
          className="grid gap-16 lg:grid-cols-2 lg:gap-24"
        >
          <motion.div variants={item}>
            <AnimatedHeading
              trace="wave"
              stroke="white"
              className="font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3rem)] font-light leading-[1.15] tracking-tight text-white"
            >
              Specify Alubond on your next envelope.
            </AnimatedHeading>
            <p className="mt-8 max-w-md text-[15px] leading-[1.75] text-stone-400">
              Samples, BIM-ready assets, project references, and technical
              submittals — with manufacturing and teams across the Americas,
              Europe, Middle East, and Asia.
            </p>
            <motion.div
              className="mt-10 flex flex-wrap gap-4"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={viewOnce}
            >
              <motion.a
                variants={item}
                href="mailto:info@alubond.com"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex rounded-full bg-white px-8 py-3.5 text-[13px] font-medium tracking-wide text-[#0c2340]"
              >
                Email specifications
              </motion.a>
              <motion.div variants={item}>
                <Link
                  href="https://www.mulkinternational.com/brands/alubond"
                  className="inline-flex rounded-full border border-white/18 px-8 py-3.5 text-[13px] font-normal tracking-wide text-white/90 transition-colors duration-300 hover:border-white/30 hover:bg-white/[0.06]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Mulk International
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            variants={container}
            className="grid gap-12 sm:grid-cols-2 sm:gap-10"
          >
            <motion.div variants={item}>
              <h3 className="text-[11px] font-medium uppercase tracking-[0.28em] text-stone-600">
                Manufacturing
              </h3>
              <ul className="mt-5 space-y-3 text-[14px] leading-relaxed text-stone-400">
                {["UAE", "India", "Europe", "United States"].map((place, i) => (
                  <motion.li
                    key={place}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={viewOnce}
                    transition={{ delay: 0.08 * i, duration: 0.6, ease: editorialEase }}
                  >
                    {place}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            <motion.div variants={item}>
              <h3 className="text-[11px] font-medium uppercase tracking-[0.28em] text-stone-600">
                Offices
              </h3>
              <ul className="mt-5 space-y-3 text-[14px] leading-relaxed text-stone-400">
                {["USA · Canada", "Egypt · Turkey", "Vietnam"].map((place, i) => (
                  <motion.li
                    key={place}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={viewOnce}
                    transition={{ delay: 0.08 * i, duration: 0.6, ease: editorialEase }}
                  >
                    {place}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewOnce}
          transition={{ duration: 1, delay: 0.2, ease: editorialEase }}
          className="mt-20 flex flex-col gap-6 border-t border-white/[0.08] pt-10 text-[12px] leading-relaxed text-stone-600 sm:flex-row sm:items-start sm:justify-between"
        >
          <p>© {new Date().getFullYear()} Alubond U.S.A. Concept demo site.</p>
          <p className="max-w-md text-stone-600">
            Fire-retardant metal composite panels — flagship brand of Mulk
            International. Confirm live contacts and certifications with your
            regional representative.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
