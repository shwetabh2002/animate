'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TextRevealAnimationProps {
  children: string;
  className?: string;
  stagger?: number;
  delay?: number;
}

export function TextRevealAnimation({
  children,
  className = '',
  stagger = 0.02,
  delay = 0,
}: TextRevealAnimationProps) {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;

    // Split text into characters
    const text = children;
    const chars = text.split('');

    element.innerHTML = chars
      .map((char) => {
        if (char === ' ') return '<span class="inline-block">&nbsp;</span>';
        return `<span class="inline-block opacity-0">${char}</span>`;
      })
      .join('');

    const charElements = element.querySelectorAll('span');

    // Animate characters
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.to(charElements, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: stagger,
      delay: delay,
      ease: 'power2.out',
    });

    return () => {
      tl.kill();
    };
  }, [children, stagger, delay]);

  return (
    <div ref={textRef} className={className}>
      {children}
    </div>
  );
}

interface WordRevealAnimationProps {
  children: string;
  className?: string;
  stagger?: number;
}

export function WordRevealAnimation({
  children,
  className = '',
  stagger = 0.1,
}: WordRevealAnimationProps) {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;

    // Split text into words
    const words = children.split(' ');

    element.innerHTML = words
      .map((word) => `<span class="inline-block overflow-hidden"><span class="inline-block translate-y-full opacity-0">${word}</span></span>`)
      .join('<span class="inline-block">&nbsp;</span>');

    const wordElements = element.querySelectorAll('span > span');

    // Animate words
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.to(wordElements, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: stagger,
      ease: 'power3.out',
    });

    return () => {
      tl.kill();
    };
  }, [children, stagger]);

  return (
    <div ref={textRef} className={className}>
      {children}
    </div>
  );
}
