'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function PageTransition({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Opening curtain animation */}
      <motion.div
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
        style={{ originY: 1 }}
        className="fixed inset-0 bg-gradient-to-b from-gray-900 via-blue-900 to-gray-900 z-50 pointer-events-none"
      />

      {/* Content fade in */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        {children}
      </motion.div>

      {/* Logo reveal animation */}
      <motion.div
        initial={{ opacity: 1, scale: 1.5 }}
        animate={{ opacity: 0, scale: 1 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
        className="fixed inset-0 flex items-center justify-center z-40 pointer-events-none"
      >
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-6xl md:text-8xl font-bold text-white"
        >
          ALUBOND
        </motion.div>
      </motion.div>
    </>
  );
}
