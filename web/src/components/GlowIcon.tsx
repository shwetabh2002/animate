'use client';

import { useEffect, useRef, useState } from 'react';

interface GlowIconProps {
  children: React.ReactNode;
  className?: string;
}

export function GlowIcon({ children, className = '' }: GlowIconProps) {
  const iconRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const icon = iconRef.current;
    if (!icon) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = icon.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePos({ x, y });
    };

    icon.addEventListener('mousemove', handleMouseMove);

    return () => {
      icon.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={iconRef}
      className={`relative group ${className}`}
      style={{
        background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(59, 130, 246, 0.3) 0%, transparent 60%)`,
      }}
    >
      <div className="relative z-10 transition-transform group-hover:scale-110">
        {children}
      </div>
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
        style={{
          background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(59, 130, 246, 0.6) 0%, transparent 50%)`,
        }}
      />
    </div>
  );
}
