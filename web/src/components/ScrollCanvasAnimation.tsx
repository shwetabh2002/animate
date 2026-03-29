'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollCanvasAnimationProps {
  frameCount: number;
  getFramePath: (index: number) => string;
  className?: string;
}

export function ScrollCanvasAnimation({
  frameCount,
  getFramePath,
  className = '',
}: ScrollCanvasAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameIndexRef = useRef({ value: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Preload images
    const loadImages = async () => {
      const imagePromises = [];
      for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        const promise = new Promise<HTMLImageElement>((resolve, reject) => {
          img.onload = () => resolve(img);
          img.onerror = reject;
        });
        img.src = getFramePath(i);
        imagePromises.push(promise);
      }

      try {
        imagesRef.current = await Promise.all(imagePromises);
        render(0);
      } catch (error) {
        console.error('Error loading images:', error);
      }
    };

    loadImages();

    // Render function
    const render = (index: number) => {
      const img = imagesRef.current[index];
      if (!img) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Calculate dimensions to fit and center
      const scale = Math.min(
        canvas.width / img.width,
        canvas.height / img.height
      );
      const x = (canvas.width - img.width * scale) / 2;
      const y = (canvas.height - img.height * scale) / 2;

      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    };

    // ScrollTrigger animation
    const scrollTrigger = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
      onUpdate: (self) => {
        const frame = Math.floor(self.progress * (frameCount - 1));
        frameIndexRef.current.value = frame;
        render(frame);
      },
    });

    // Cleanup
    return () => {
      window.removeEventListener('resize', setCanvasSize);
      scrollTrigger.kill();
    };
  }, [frameCount, getFramePath]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        className="sticky top-0 left-0 w-full h-screen"
      />
    </div>
  );
}
