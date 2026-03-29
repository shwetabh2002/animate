'use client';

import { useEffect, useRef, useState } from 'react';

export function SectionAwareNav() {
  const [isDark, setIsDark] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const checkOverlap = () => {
      const nav = navRef.current;
      if (!nav) return;

      const navRect = nav.getBoundingClientRect();

      // Check if nav overlaps with light sections
      const lightSections = document.querySelectorAll('.light-section');
      let shouldBeDark = false;

      lightSections.forEach((section) => {
        const sectionRect = section.getBoundingClientRect();
        // Check if nav overlaps with section
        if (
          navRect.bottom > sectionRect.top &&
          navRect.top < sectionRect.bottom
        ) {
          shouldBeDark = true;
        }
      });

      setIsDark(shouldBeDark);
    };

    const handleScroll = () => {
      requestAnimationFrame(checkOverlap);
    };

    window.addEventListener('scroll', handleScroll);
    checkOverlap();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 px-8 py-6 transition-colors duration-300 ${
        isDark ? 'text-[#404F1D]' : 'text-[#F4EDE6]'
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold tracking-wider">
          ALUBOND
        </div>
        <div className="flex gap-8 items-center">
          <button className="text-sm tracking-widest hover:opacity-70 transition-opacity">
            MENU
          </button>
          <a
            href="#contact"
            className={`text-sm tracking-widest border-b-2 transition-colors ${
              isDark ? 'border-[#404F1D]' : 'border-[#F4EDE6]'
            } hover:opacity-70`}
          >
            CONTACT
          </a>
        </div>
      </div>
    </nav>
  );
}
