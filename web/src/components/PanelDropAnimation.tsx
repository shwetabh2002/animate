'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function PanelDropAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInteractive, setIsInteractive] = useState(false);
  const dropsRef = useRef(0);
  const maxDrops = 5;

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const frameData = { frame: 0 };
    const totalFrames = 120;

    // Panel falling and dissolving in water
    const drawFrame = (frameNumber: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const progress = frameNumber / totalFrames;

      // Panel falling
      const panelY = canvas.height * 0.2 + progress * canvas.height * 0.3;
      const panelWidth = 200;
      const panelHeight = 120;
      const panelRotation = progress * Math.PI * 0.3;

      ctx.save();
      ctx.translate(centerX, panelY);
      ctx.rotate(panelRotation);

      // Panel shadow
      ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
      ctx.shadowBlur = 20;
      ctx.shadowOffsetY = 10;

      // Panel with gradient
      const panelGradient = ctx.createLinearGradient(-panelWidth / 2, 0, panelWidth / 2, 0);
      panelGradient.addColorStop(0, '#3b82f6');
      panelGradient.addColorStop(0.5, '#f97316');
      panelGradient.addColorStop(1, '#3b82f6');

      ctx.fillStyle = panelGradient;
      ctx.globalAlpha = 1 - progress * 0.3;
      ctx.fillRect(-panelWidth / 2, -panelHeight / 2, panelWidth, panelHeight);

      // Panel outline
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 3;
      ctx.strokeRect(-panelWidth / 2, -panelHeight / 2, panelWidth, panelHeight);

      ctx.restore();

      // Water surface
      const waterY = canvas.height * 0.6;
      if (progress > 0.4) {
        const splashProgress = (progress - 0.4) / 0.6;

        // Water surface wave
        ctx.strokeStyle = `rgba(59, 130, 246, ${0.8 - splashProgress * 0.5})`;
        ctx.lineWidth = 4;
        ctx.beginPath();
        for (let x = 0; x < canvas.width; x += 10) {
          const wave = Math.sin((x / 100) + splashProgress * 10) * 20 * (1 - splashProgress);
          ctx.lineTo(x, waterY + wave);
        }
        ctx.stroke();

        // Splash particles
        const particleCount = Math.floor(30 * splashProgress);
        for (let i = 0; i < particleCount; i++) {
          const angle = (i / particleCount) * Math.PI - Math.PI / 2;
          const distance = splashProgress * 150 * Math.sin(splashProgress * Math.PI);
          const x = centerX + Math.cos(angle) * distance;
          const y = waterY + Math.sin(angle) * distance - splashProgress * 50;
          const size = 3 + Math.random() * 4;

          ctx.fillStyle = `rgba(59, 130, 246, ${1 - splashProgress})`;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }

        // Ripples
        for (let i = 0; i < 5; i++) {
          const rippleRadius = splashProgress * 200 + i * 40;
          const rippleAlpha = (1 - splashProgress) * (1 - i * 0.15);

          ctx.strokeStyle = `rgba(249, 115, 22, ${rippleAlpha})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(centerX, waterY, rippleRadius, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // Dissolved particles underwater
      if (progress > 0.7) {
        const dissolveProgress = (progress - 0.7) / 0.3;
        const particleCount = Math.floor(50 * dissolveProgress);

        for (let i = 0; i < particleCount; i++) {
          const angle = (i / particleCount) * Math.PI * 2;
          const distance = dissolveProgress * 100 + Math.sin(i * 0.5) * 30;
          const x = centerX + Math.cos(angle) * distance;
          const y = waterY + 50 + Math.sin(angle) * distance;
          const size = 2 + Math.random() * 3;

          const colorChoice = i % 2;
          const color = colorChoice === 0 ? '59, 130, 246' : '249, 115, 22';

          ctx.fillStyle = `rgba(${color}, ${1 - dissolveProgress * 0.7})`;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Text at end
      if (progress > 0.85) {
        const textAlpha = (progress - 0.85) / 0.15;
        ctx.fillStyle = `rgba(249, 115, 22, ${textAlpha})`;
        ctx.font = 'bold 48px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('ALUBOND ACP', centerX, canvas.height * 0.8);

        ctx.fillStyle = `rgba(59, 130, 246, ${textAlpha})`;
        ctx.font = '24px sans-serif';
        ctx.fillText('Premium Quality, Endless Possibilities', centerX, canvas.height * 0.8 + 40);
      }
    };

    // Scroll trigger animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        pin: canvas,
        anticipatePin: 1,
        onEnter: () => setIsInteractive(true),
        onLeave: () => setIsInteractive(false),
        onEnterBack: () => setIsInteractive(true),
        onLeaveBack: () => setIsInteractive(false),
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
  }, []);

  const handleAddDrop = () => {
    if (dropsRef.current < maxDrops) {
      dropsRef.current++;
      // Trigger animation advancement
      const canvas = canvasRef.current;
      if (canvas) {
        const event = new CustomEvent('addDrop');
        canvas.dispatchEvent(event);
      }
    }
  };

  return (
    <div ref={containerRef} className="relative h-[300vh]">
      <canvas
        ref={canvasRef}
        className="sticky top-0 left-0 w-full h-screen bg-white"
      />

      {isInteractive && dropsRef.current < maxDrops && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50">
          <button
            onClick={handleAddDrop}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-orange-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
          >
            Add Panel Drop ({dropsRef.current}/{maxDrops})
          </button>
        </div>
      )}
    </div>
  );
}
