'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollProductCanvasProps {
  // For demo, we'll create a simple animated shape
  // In production, you'd load actual frame images
  productName: string;
}

export function ScrollProductCanvas({ productName }: ScrollProductCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Animation properties
    const frameData = { frame: 0 };
    const totalFrames = 179;

    // Draw function (simulating product transformation)
    const drawFrame = (frameNumber: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Progress through animation
      const progress = frameNumber / totalFrames;

      // Draw dissolving tablet effect
      const radius = 80 + progress * 40;
      const particles = Math.floor(20 + progress * 80);

      // Main circle (tablet)
      const alpha = 1 - progress * 0.7;
      ctx.fillStyle = `rgba(212, 222, 114, ${alpha})`;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();

      // Inner glow
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
      gradient.addColorStop(0, `rgba(255, 188, 3, ${0.8 * alpha})`);
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();

      // Dissolving particles
      for (let i = 0; i < particles; i++) {
        const angle = (i / particles) * Math.PI * 2 + progress * 2;
        const distance = radius + progress * 200 + Math.sin(i * 0.5) * 20;
        const x = centerX + Math.cos(angle) * distance;
        const y = centerY + Math.sin(angle) * distance;
        const particleSize = 3 + Math.random() * 4;
        const particleAlpha = alpha * (1 - progress) * (Math.random() * 0.5 + 0.5);

        ctx.fillStyle = `rgba(138, 158, 57, ${particleAlpha})`;
        ctx.beginPath();
        ctx.arc(x, y, particleSize, 0, Math.PI * 2);
        ctx.fill();
      }

      // Text overlay at end
      if (progress > 0.7) {
        const textAlpha = (progress - 0.7) / 0.3;
        ctx.fillStyle = `rgba(244, 237, 230, ${textAlpha})`;
        ctx.font = 'bold 48px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(productName, centerX, centerY + radius + 80);
      }
    };

    // ScrollTrigger animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        pin: canvas,
        anticipatePin: 1,
      },
    });

    tl.to(frameData, {
      frame: totalFrames - 1,
      ease: 'none',
      onUpdate: () => {
        drawFrame(Math.floor(frameData.frame));
      },
    });

    drawFrame(0);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [productName]);

  return (
    <div ref={containerRef} className="relative h-[300vh]">
      <canvas
        ref={canvasRef}
        className="sticky top-0 left-0 w-full h-screen"
      />
    </div>
  );
}
