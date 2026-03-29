'use client';

import { useEffect, useState } from 'react';
import { gsap } from 'gsap';

export function PagePreloader() {
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Prevent body scroll during preloader
    document.body.style.overflow = 'hidden';

    // GSAP timeline for zoom-in staircase animation
    const tl = gsap.timeline({
      onComplete: () => {
        setIsComplete(true);
        document.body.style.overflow = '';
      }
    });

    // Animate all squares moving forward in 3D space (camera moving through tunnel)
    // Start immediately with no delay
    tl.to(['.preloader-square-1', '.preloader-square-2', '.preloader-square-3',
           '.preloader-square-4', '.preloader-square-5', '.preloader-square-6',
           '.preloader-square-7', '.preloader-square-8'], {
      z: 1200,
      opacity: 0,
      duration: 2.8,
      ease: 'power1.inOut',
      stagger: {
        each: 0.08,
        from: 'end', // Start from the farthest square
      },
    }, 0);

    // Logo comes forward through the tunnel with the squares
    tl.to('.preloader-logo', {
      z: 200,
      scale: 3,
      duration: 2.8,
      ease: 'power1.inOut',
    }, 0);

    // Logo fades out at the end
    tl.to('.preloader-logo', {
      opacity: 0,
      duration: 0.5,
      ease: 'power1.in',
    }, 2.3);

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  if (isComplete) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-[#0c4a6e] flex items-center justify-center overflow-hidden">
      {/* 3D Perspective Container */}
      <div
        className="absolute inset-0"
        style={{
          perspective: '1000px',
          perspectiveOrigin: '50% 50%',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Tunnel end wall - light background at the end */}
        <div className="absolute" style={{
          width: '200vw',
          height: '200vw',
          backgroundColor: '#f0f9ff',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%) translateZ(-1000px)',
          transformStyle: 'preserve-3d',
        }} />

        {/* Logo - positioned at the tunnel end */}
        <div className="preloader-logo absolute left-1/2 top-1/2" style={{
          transform: 'translate(-50%, -50%) translateZ(-950px) scale(2)',
          transformStyle: 'preserve-3d',
        }}>
          <div className="text-center">
            <h1 className="text-6xl md:text-8xl font-bold text-[#0c4a6e] tracking-wider mb-4">
              ALUBOND
            </h1>
            <p className="text-xl md:text-2xl text-[#0ea5e9] tracking-widest">
              PREMIUM ACP SOLUTIONS
            </p>
          </div>
        </div>

        {/* 3D Tunnel with squares at different Z depths */}
        <div className="preloader-square-8 absolute" style={{
          width: '120vw',
          height: '120vw',
          backgroundColor: 'rgba(56, 189, 248, 0.9)',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%) translateZ(-800px)',
          transformStyle: 'preserve-3d',
        }} />

        <div className="preloader-square-7 absolute" style={{
          width: '105vw',
          height: '105vw',
          backgroundColor: 'rgba(14, 165, 233, 0.85)',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%) translateZ(-700px)',
          transformStyle: 'preserve-3d',
        }} />

        <div className="preloader-square-6 absolute" style={{
          width: '90vw',
          height: '90vw',
          backgroundColor: 'rgba(7, 89, 133, 0.8)',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%) translateZ(-600px)',
          transformStyle: 'preserve-3d',
        }} />

        <div className="preloader-square-5 absolute" style={{
          width: '75vw',
          height: '75vw',
          backgroundColor: 'rgba(56, 189, 248, 0.75)',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%) translateZ(-500px)',
          transformStyle: 'preserve-3d',
        }} />

        <div className="preloader-square-4 absolute" style={{
          width: '60vw',
          height: '60vw',
          backgroundColor: 'rgba(14, 165, 233, 0.7)',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%) translateZ(-400px)',
          transformStyle: 'preserve-3d',
        }} />

        <div className="preloader-square-3 absolute" style={{
          width: '45vw',
          height: '45vw',
          backgroundColor: 'rgba(12, 74, 110, 0.65)',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%) translateZ(-300px)',
          transformStyle: 'preserve-3d',
        }} />

        <div className="preloader-square-2 absolute" style={{
          width: '30vw',
          height: '30vw',
          backgroundColor: 'rgba(7, 89, 133, 0.6)',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%) translateZ(-200px)',
          transformStyle: 'preserve-3d',
        }} />

        <div className="preloader-square-1 absolute" style={{
          width: '15vw',
          height: '15vw',
          backgroundColor: 'rgba(12, 74, 110, 0.5)',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%) translateZ(-100px)',
          transformStyle: 'preserve-3d',
        }} />
      </div>
    </div>
  );
}
