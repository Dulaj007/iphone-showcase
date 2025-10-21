import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

/**
 * GlowHeroSection
 * ------------------------------------------------------
 * 
 * This section use as the mobile her section insted of animated
 * 3d iPhone heroSection in order to optimized performance. 
 * 
 * Interactive animated hero section featuring dynamic
 * glowing waves bg and smooth motion based transitions.
 * 
 * Uses <canvas> for animated gradients and Framer Motion
 * for fluid fade and entrance animations.
 * 
 * Responsive design that even can be used as the desktop heroSection
 * incase the default hero section failed on loading low spec devices.
 * ------------------------------------------------------
 */
export default function GlowHeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let t = 0;
    let pathCount = w < 768 ? 6 : 9;

    /**
     * Draw animated glow waves on canvas.
     */
    const draw = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);

      // Background gradient (dark base fading to transparent)
      const gradient = ctx.createLinearGradient(0, 0, 0, h);
      gradient.addColorStop(0, '#171717');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);

      // Glowing curved paths
      for (let i = 0; i < pathCount; i++) {
        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.shadowBlur = 30;
        ctx.shadowColor = '#ff7300';
        ctx.strokeStyle = 'rgba(255, 140, 58, 0.9)'; 

        const offset = i * 80 + Math.sin(t * 0.00001 + i) * 1;
        for (let x = 0; x < w; x++) {
          const y =
            h / 6 +
            offset +
            Math.sin(x * 0.002 + t * 0.01 + i) * 35 +
            Math.cos((x + i * 100) * 0.004 - t * 0.02) * 50;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      t += 1;
      requestAnimationFrame(draw);
    };

    draw();

    /**
     * Responsive canvas resizing
     * CHange waves across all screens
     */
    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      pathCount = w < 768 ? 6 : 10;
      t = 0;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden  text-[var(--color-text)]">
      {/* === Dynamic Background Canvas === */}
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />

      {/* Subtle black overlay for depth */}
      <motion.div
        className="absolute inset-0 bg-[var(--color-black)] mix-blend-overlay"
        animate={{ opacity: [0.5, 0.7, 0.5] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      {/* === Hero Section Content === */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 sm:px-6 lg:px-10 text-center">

        {/* Mobile Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-4xl mb-2 sm:hidden sm:text-5xl md:text-6xl lg:text-9xl font-bold tracking-tight text-[var(--color-white)] leading-tight"
        >
          iPhone&nbsp;17&nbsp;Pro
        </motion.h1>

        {/* Mobile Image */}
        <motion.img
          src="/img/iphone17proHalfeMB.png"
          alt="iPhone 17 Pro"
          className="block sm:hidden w-5/6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        />

        {/* Glass Card Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="backdrop-blur-xl bg-[var(--color-white)]/5 rounded-4xl p-6 sm:p-12 md:px-20 lg:px-40 shadow-2xl max-w-6xl relative"
        >
          {/* Desktop Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-4xl hidden sm:block sm:text-5xl md:text-6xl lg:text-8xl font-bold tracking-tight text-[var(--color-white)] leading-tight"
          >
            iPhone&nbsp;17&nbsp;Pro
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-[var(--color-text)]/80 max-w-xl mx-auto"
          >
            Power beyond imagination. Designed for the future with Exceptional performance.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-3 flex flex-row gap-4 justify-center items-center"
          >
            {/* Explore Button */}
            <button
              className="px-8 py-2 sm:py-3 border-2 font-bold border-[var(--color-white)] text-[var(--color-white)] rounded-full
              hover:bg-[var(--color-white)] hover:text-[var(--color-black)]
              hover:shadow-[0_0_20px_2px_rgba(255,255,255,0.7)]
              transition-all duration-300"
            >
              Explore
            </button>

            {/* Buy Button (Animated Gradient) */}
            <button
              className="relative px-8 py-2 sm:py-3 rounded-full text-[var(--color-white)] font-semibold
              bg-gradient-to-r from-[var(--color-yellow)] via-[var(--color-orange)] to-[var(--color-yellow)]
              bg-[length:200%_200%] animate-gradient-x
              shadow-[0_0_15px_2px_rgba(255,140,0,0.6)]
              hover:shadow-[0_0_30px_4px_rgba(255,140,0,0.9)]
              hover:scale-105
              transition-all duration-300"
            >
              Buy
            </button>
          </motion.div>

          {/* Pricing Text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-4 text-[var(--color-text-muted)] text-sm sm:text-base"
          >
            From $1099 or $45.79/mo. for 24 mo.
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
