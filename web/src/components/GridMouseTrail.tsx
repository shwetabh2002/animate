'use client';

import { useEffect, useRef } from 'react';

export function GridMouseTrail() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridSquaresRef = useRef<Map<string, HTMLDivElement>>(new Map());
  const activeSquaresRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check if touch device
    const isTouchDevice = window.matchMedia('(hover: none)').matches;
    if (isTouchDevice) return;

    const squareSize = window.innerWidth * 0.05; // 5vw
    const cols = Math.ceil(window.innerWidth / squareSize);
    const rows = Math.ceil(window.innerHeight / squareSize);

    // Create grid squares
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const square = document.createElement('div');
        square.className = 'grid-square';
        square.style.cssText = `
          position: absolute;
          left: ${col * squareSize}px;
          top: ${row * squareSize}px;
          width: ${squareSize}px;
          height: ${squareSize}px;
          opacity: 0;
          transition: opacity 100ms ease-out;
          pointer-events: none;
        `;

        // Horizontal gradient from light to dark blue
        const gradientPosition = (col / cols) * 100;
        if (gradientPosition < 33) {
          square.style.background = '#bae6fd'; // sky-200
        } else if (gradientPosition < 66) {
          square.style.background = '#38bdf8'; // sky-400
        } else {
          square.style.background = '#0ea5e9'; // sky-500
        }

        const key = `${row}-${col}`;
        gridSquaresRef.current.set(key, square);
        container.appendChild(square);
      }
    }

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      const col = Math.floor(e.clientX / squareSize);
      const row = Math.floor(e.clientY / squareSize);

      // Activate current and surrounding squares
      for (let r = row - 1; r <= row + 1; r++) {
        for (let c = col - 1; c <= col + 1; c++) {
          const key = `${r}-${c}`;
          const square = gridSquaresRef.current.get(key);
          if (square) {
            square.style.opacity = '1';
            activeSquaresRef.current.add(key);

            // Fade out after delay
            setTimeout(() => {
              square.style.transition = 'opacity 300ms ease-out';
              square.style.opacity = '0';
              activeSquaresRef.current.delete(key);
            }, 100);
          }
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      gridSquaresRef.current.forEach(square => square.remove());
      gridSquaresRef.current.clear();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-50"
    />
  );
}
