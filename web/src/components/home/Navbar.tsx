"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { editorialEase, springSnappy } from "@/lib/motion";

const links = [
  { href: "#series", label: "Series" },
  { href: "#layers", label: "Construction" },
  { href: "#standards", label: "Fire & safety" },
  { href: "#projects", label: "Projects" },
];

function NavLink({
  href,
  children,
  solid,
}: {
  href: string;
  children: string;
  solid: boolean;
}) {
  return (
    <motion.a
      href={href}
      className={`group relative py-1 text-[13px] font-normal tracking-wide transition-colors duration-300 ${
        solid
          ? "text-stone-600 hover:text-stone-900"
          : "text-[#3d4f3d] hover:text-[#1e281e]"
      }`}
      whileTap={{ scale: 0.97 }}
    >
      {children}
      <span
        className={`absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100 ${
          solid ? "bg-stone-800" : "bg-[#2c382c]"
        }`}
      />
    </motion.a>
  );
}

export function Navbar() {
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    setSolid(y > 48);
  });

  return (
    <motion.header
      initial={{ y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: editorialEase }}
      className={`fixed left-0 right-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ease-out ${
        solid
          ? "border-b border-stone-200/90 bg-white/88 backdrop-blur-2xl backdrop-saturate-150"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[4.25rem] max-w-[1200px] items-center justify-between px-6 sm:h-[4.5rem] sm:px-10">
        <Link href="/" className="group flex items-center gap-3.5">
          <motion.span
            className={`flex h-9 w-9 items-center justify-center rounded-md text-sm font-semibold transition-colors duration-500 ${
              solid
                ? "bg-gradient-to-br from-[#1e4d8c] to-[#0c2340] text-white/95"
                : "bg-[#2c382c] text-[#f4f1ea]"
            }`}
            whileHover={{ rotate: [0, -6, 6, 0], transition: { duration: 0.5 } }}
            aria-hidden
          >
            A
          </motion.span>
          <div className="leading-tight">
            <span
              className={`block text-[0.9375rem] font-medium tracking-[-0.02em] transition-colors duration-500 ${
                solid ? "text-stone-900" : "text-[#1e281e]"
              }`}
            >
              Alubond U.S.A
            </span>
            <span
              className={`text-[11px] font-normal tracking-[0.12em] transition-colors duration-500 ${
                solid ? "text-stone-500" : "text-[#4a5c48]"
              }`}
            >
              Fire retardant composites
            </span>
          </div>
        </Link>
        <nav className="hidden items-center gap-10 md:flex">
          {links.map((l) => (
            <NavLink key={l.href} href={l.href} solid={solid}>
              {l.label}
            </NavLink>
          ))}
        </nav>
        <motion.a
          href="#contact"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          transition={springSnappy}
          className={`rounded-full px-5 py-2.5 text-[12px] font-medium tracking-wide transition-all duration-300 ${
            solid
              ? "border border-stone-300/90 bg-stone-50 text-stone-800 hover:border-stone-400"
              : "border border-[#2c382c]/20 bg-[#f4f1ea]/50 text-[#1e281e] backdrop-blur-sm hover:border-[#2c382c]/35"
          }`}
        >
          Contact
        </motion.a>
      </div>
    </motion.header>
  );
}
