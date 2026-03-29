'use client';

import { useEffect, useRef } from 'react';

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
}

export function WaterDropEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ripplesRef = useRef<Ripple[]>([]);
  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create ripple on click
    const handleClick = (e: MouseEvent) => {
      ripplesRef.current.push({
        x: e.clientX,
        y: e.clientY,
        radius: 0,
        maxRadius: 150 + Math.random() * 100,
        opacity: 1,
      });
    };

    // Auto-generate drops occasionally
    const autoDropInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        ripplesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: 0,
          maxRadius: 100 + Math.random() * 80,
          opacity: 0.6,
        });
      }
    }, 2000);

    window.addEventListener('click', handleClick);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw ripples
      ripplesRef.current = ripplesRef.current.filter((ripple) => {
        ripple.radius += 2;
        ripple.opacity -= 0.008;

        if (ripple.opacity <= 0 || ripple.radius >= ripple.maxRadius) {
          return false;
        }

        // Draw multiple concentric circles for water effect
        for (let i = 0; i < 3; i++) {
          const offset = i * 15;
          const currentRadius = ripple.radius - offset;

          if (currentRadius > 0) {
            ctx.strokeStyle = `rgba(59, 130, 246, ${ripple.opacity * (1 - i * 0.3)})`;
            ctx.lineWidth = 2 - i * 0.5;
            ctx.beginPath();
            ctx.arc(ripple.x, ripple.y, currentRadius, 0, Math.PI * 2);
            ctx.stroke();
          }
        }

        return true;
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('click', handleClick);
      clearInterval(autoDropInterval);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-40"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
