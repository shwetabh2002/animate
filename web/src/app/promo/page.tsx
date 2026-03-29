'use client';

import { SmoothScrollProvider } from '@/components/SmoothScrollProvider';
import { GridMouseTrail } from '@/components/GridMouseTrail';
import { PagePreloader } from '@/components/PagePreloader';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function PromoPage() {
  return (
    <>
      <PagePreloader />
      <SmoothScrollProvider>
        <GridMouseTrail />
        <div className="bg-[#f0f9ff] text-[#0c4a6e]" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
          <Navigation />
          <HeroSection />
          <ProblemSection />
          <SolutionCanvasSection />
          <HowItWorksSection />
          <MetricsSection />
          <GlobalTrialsSection />
          <ProductsSection />
          <InteractivePanelSection />
          <CTASection />
          <Footer />
        </div>
      </SmoothScrollProvider>
    </>
  );
}

function Navigation() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkSections = () => {
      const nav = document.querySelector('nav');
      if (!nav) return;

      const darkSections = document.querySelectorAll('.dark-section');
      const navRect = nav.getBoundingClientRect();
      let isOverDark = false;

      darkSections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (navRect.bottom > rect.top && navRect.top < rect.bottom) {
          isOverDark = true;
        }
      });

      setIsDark(isOverDark);
    };

    window.addEventListener('scroll', checkSections);
    checkSections();
    return () => window.removeEventListener('scroll', checkSections);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 px-8 py-6 transition-colors duration-300 ${isDark ? 'text-[#f0f9ff]' : 'text-[#0c4a6e]'}`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-base font-medium tracking-wider">ALUBOND</div>
        <div className="flex gap-8 text-sm tracking-wider">
          <button>MENU</button>
          <a href="#contact" className={`border-b ${isDark ? 'border-[#f0f9ff]' : 'border-[#0c4a6e]'}`}>CONTACT</a>
        </div>
      </div>
    </nav>
  );
}

function HeroSection() {
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const chars = textRef.current.textContent?.split('') || [];
    textRef.current.innerHTML = chars.map(char =>
      `<span class="inline-block opacity-0" style="transform: translateY(100px)">${char === ' ' ? '&nbsp;' : char}</span>`
    ).join('');

    const charElements = textRef.current.querySelectorAll('span');

    gsap.to(charElements, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.02,
      ease: 'power2.out',
      delay: 0.3
    });
  }, []);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-8 pt-20">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-5xl"
      >
        <p className="text-xs tracking-[0.3em] mb-6 text-[#3b82f6] uppercase">World's Largest ACP Manufacturer</p>
        <h1 ref={textRef} className="text-[12vw] font-medium leading-none mb-8 tracking-tight">
          ALUBOND
        </h1>
        <p className="text-[2vw] leading-relaxed mb-12 text-[#666]">
          Fire-rated panels reimagined<br />for architectural excellence
        </p>
        <button className="px-12 py-4 bg-[#0ea5e9] text-white text-sm font-medium tracking-wider hover:bg-[#0284c7] transition-colors">
          EXPLORE PRODUCTS
        </button>
      </motion.div>
    </section>
  );
}

function ProblemSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const words = ref.current.querySelectorAll('.word');

    gsap.fromTo(words,
      { opacity: 0, y: 80 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 70%',
        }
      }
    );
  }, []);

  return (
    <section className="dark-section min-h-screen flex items-center justify-center px-8 bg-[#075985] text-[#f0f9ff]">
      <div ref={ref} className="max-w-5xl text-center">
        <h2 className="text-[6vw] font-medium leading-tight">
          <span className="word inline-block">Most</span>{' '}
          <span className="word inline-block">facades</span>{' '}
          <span className="word inline-block">never</span>{' '}
          <span className="word inline-block">make</span>{' '}
          <span className="word inline-block">it</span>{' '}
          <span className="word inline-block">to</span>{' '}
          <span className="word inline-block text-[#38bdf8]">safety</span>{' '}
          <span className="word inline-block text-[#38bdf8]">standards</span>
        </h2>
        <p className="text-[2vw] mt-8 text-[#7dd3fc]">
          Up to 70% of building facades compromise on fire safety
        </p>
      </div>
    </section>
  );
}

function SolutionCanvasSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const totalFrames = 179;

    const drawFrame = (frame: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const progress = frame / totalFrames;

      // Panel
      const panelWidth = 350 - progress * 150;
      const panelHeight = 200 - progress * 100;

      const gradient = ctx.createLinearGradient(centerX - panelWidth/2, 0, centerX + panelWidth/2, 0);
      gradient.addColorStop(0, '#0ea5e9');
      gradient.addColorStop(0.5, '#38bdf8');
      gradient.addColorStop(1, '#0ea5e9');

      ctx.fillStyle = gradient;
      ctx.globalAlpha = Math.max(0.2, 1 - progress * 0.8);
      ctx.fillRect(centerX - panelWidth/2, centerY - panelHeight/2, panelWidth, panelHeight);

      // Border
      ctx.strokeStyle = '#0c4a6e';
      ctx.lineWidth = 3;
      ctx.globalAlpha = 1 - progress * 0.6;
      ctx.strokeRect(centerX - panelWidth/2, centerY - panelHeight/2, panelWidth, panelHeight);

      // Particles
      if (progress > 0.4) {
        const particleCount = Math.floor((progress - 0.4) * 200);
        for (let i = 0; i < particleCount; i++) {
          const angle = (i / particleCount) * Math.PI * 2 + progress * 2;
          const dist = (progress - 0.4) * 300;
          const x = centerX + Math.cos(angle) * dist;
          const y = centerY + Math.sin(angle) * dist;

          ctx.fillStyle = i % 3 === 0 ? '#0ea5e9' : i % 3 === 1 ? '#38bdf8' : '#7dd3fc';
          ctx.globalAlpha = (1 - progress) * 0.8;
          ctx.beginPath();
          ctx.arc(x, y, 2 + Math.random() * 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Text
      if (progress > 0.75) {
        ctx.globalAlpha = (progress - 0.75) / 0.25;
        ctx.fillStyle = '#0c4a6e';
        ctx.font = 'bold 60px system-ui';
        ctx.textAlign = 'center';
        ctx.fillText('ALUBOND', centerX, centerY + 180);
        ctx.font = '28px system-ui';
        ctx.fillStyle = '#666';
        ctx.fillText('Smaller than a brick, safer than ever', centerX, centerY + 220);
      }
    };

    ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
      pin: canvas,
      onUpdate: (self) => {
        drawFrame(Math.floor(self.progress * totalFrames));
      }
    });

    drawFrame(0);

    return () => {
      window.removeEventListener('resize', resize);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="h-[300vh] relative">
      <canvas ref={canvasRef} className="sticky top-0 w-full h-screen bg-[#f0f9ff]" />
    </div>
  );
}

function HowItWorksSection() {
  const features = [
    { icon: '🔥', title: 'FR-A1 Fire Rating', desc: 'Non-combustible core' },
    { icon: '✓', title: 'NFPA 285 Certified', desc: 'Global fire safety compliance' },
    { icon: '🏭', title: '25M m² Capacity', desc: 'World-class manufacturing' },
    { icon: '🌍', title: '90+ Countries', desc: 'Global reach & trust' },
    { icon: '✨', title: 'Exotic Finishes', desc: 'Copper, titanium, custom' },
    { icon: '♻️', title: '0 Emissions', desc: 'Sustainable production' },
  ];

  return (
    <section className="py-32 px-8 bg-[#e0f2fe]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-[5vw] font-medium mb-20 text-center">How ALUBOND Works</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-5xl mb-4">{f.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-[#0c4a6e]">{f.title}</h3>
              <p className="text-[#666] text-[0.96vw]">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MetricsSection() {
  return (
    <section className="py-32 px-8 bg-white">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-16 text-center">
        {[
          { number: '4', label: 'continents tested' },
          { number: '100x', label: 'lower transport cost' },
          { number: '0.5 ton', label: 'CO₂ saved per installation' },
        ].map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
          >
            <div className="text-[6vw] font-bold text-[#0ea5e9] mb-2">{m.number}</div>
            <div className="text-[1.2vw] text-[#666]">{m.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function GlobalTrialsSection() {
  const locations = [
    { city: 'Dubai', result: '100% fire resistance in extreme heat' },
    { city: 'New York', result: 'NFPA 285 full compliance' },
    { city: 'London', result: 'BS 8414 certified systems' },
    { city: 'Singapore', result: 'A1 fire rating achieved' },
  ];

  return (
    <section className="py-32 px-8 bg-[#f0f9ff]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-[5vw] font-medium mb-6 text-center">Field Testing Across 4 Continents</h2>
        <p className="text-center text-[1.2vw] mb-16 text-[#666]">Rigorous testing in real-world conditions</p>

        <div className="grid md:grid-cols-2 gap-8">
          {locations.map((loc, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-lg border-l-4 border-[#0ea5e9]"
            >
              <h3 className="text-2xl font-semibold mb-2 text-[#0c4a6e]">{loc.city}</h3>
              <p className="text-[#666]">{loc.result}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductsSection() {
  const products = ['FR-A1', 'FR-A2', 'FR-B1', 'FR-B2'];

  return (
    <section className="py-32 px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-[5vw] font-medium mb-20 text-center">Product Variants</h2>

        <div className="flex gap-6 overflow-x-auto pb-4">
          {products.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="min-w-[280px] aspect-[3/4] bg-gradient-to-br from-[#0ea5e9] to-[#7dd3fc] rounded-2xl flex items-center justify-center text-5xl font-bold text-white shadow-lg hover:scale-105 transition-transform cursor-pointer"
            >
              {p}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function InteractivePanelSection() {
  const [clicks, setClicks] = useState(0);
  const maxClicks = 5;

  return (
    <section className="dark-section min-h-screen flex items-center justify-center px-8 bg-[#075985] text-[#f0f9ff]">
      <div className="text-center max-w-2xl">
        <h2 className="text-[4vw] font-medium mb-8">See ALUBOND Transform</h2>
        <p className="text-[1.5vw] mb-12 text-[#7dd3fc]">Click to see progressive installation</p>

        <div className="mb-8 h-32 flex items-end justify-center">
          <div
            className="w-24 bg-[#0ea5e9] transition-all duration-300 rounded-t-lg"
            style={{ height: `${(maxClicks - clicks) * 25}px` }}
          />
        </div>

        <button
          onClick={() => clicks < maxClicks && setClicks(clicks + 1)}
          disabled={clicks >= maxClicks}
          className="px-12 py-4 bg-[#38bdf8] text-[#0c4a6e] font-medium disabled:opacity-20 disabled:cursor-not-allowed transition-all hover:bg-[#0ea5e9]"
        >
          {clicks < maxClicks ? `Add Panel (${maxClicks - clicks} remaining)` : 'Installation Complete!'}
        </button>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section id="contact" className="py-32 px-8 bg-[#f0f9ff]">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-[5vw] font-medium mb-6">Build Your Imagination</h2>
        <p className="text-[1.5vw] mb-12 text-[#666]">Early access program for architects & builders</p>

        <form className="space-y-6 text-left">
          <input type="text" placeholder="Full Name" className="w-full px-6 py-4 bg-white border border-[#ddd] rounded-sm text-[0.96vw]" />
          <input type="email" placeholder="Email" className="w-full px-6 py-4 bg-white border border-[#ddd] rounded-sm text-[0.96vw]" />
          <input type="tel" placeholder="Phone" className="w-full px-6 py-4 bg-white border border-[#ddd] rounded-sm text-[0.96vw]" />
          <textarea placeholder="Project Details" rows={4} className="w-full px-6 py-4 bg-white border border-[#ddd] rounded-sm text-[0.96vw]" />
          <button type="submit" className="w-full px-8 py-4 bg-[#0ea5e9] text-white text-lg font-medium hover:bg-[#0284c7] transition-colors">
            REQUEST CONSULTATION
          </button>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="dark-section bg-[#075985] text-[#f0f9ff] py-16 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="font-semibold mb-4 text-[#38bdf8]">ALUBOND</h3>
            <p className="text-sm text-[#7dd3fc]">A Mulk Holdings Brand</p>
          </div>
          <div>
            <h4 className="font-medium mb-3">Products</h4>
            <ul className="space-y-2 text-sm text-[#7dd3fc]">
              <li>Fire-Rated Panels</li>
              <li>Exotic Finishes</li>
              <li>Facade Systems</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-3">Resources</h4>
            <ul className="space-y-2 text-sm text-[#7dd3fc]">
              <li>Technical Data</li>
              <li>Certifications</li>
              <li>Case Studies</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-3">Contact</h4>
            <ul className="space-y-2 text-sm text-[#7dd3fc]">
              <li>Global Offices</li>
              <li>Support</li>
              <li>Careers</li>
            </ul>
          </div>
        </div>
        <div className="text-center text-sm text-[#bae6fd]">
          © 2024 Alubond. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
