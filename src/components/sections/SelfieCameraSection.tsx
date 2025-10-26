import React, { useEffect, useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";

/** 
 * SelfieCameraSection Component
 * --------------------------------------------------
 * This section showcases the 18MP Center Stage front camera of the device.
 * It includes:
 * - A title and description explaining camera features
 * - An autoplay video demonstrating the selfie camera in action
 * - Smooth fade-in animations triggered when the section enters the viewport
 * The section uses CSS variables for consistent theming across dark/light mode.
 */
export default function SelfieCameraSection() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  // Detect when section is in view (used for text animations)
  const isInView = useInView(sectionRef, { once: false, margin: "-10% 0px" });

  // Intersection observer for auto-playing / pausing video
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {
              // Ignore autoplay blocking errors silently
            });
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.5 } // Trigger when at least 50% of video is visible
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  // Smooth fade-in/up animation variant
  const fadeUpVariant: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 2.5, ease: [0.25, 0.1, 0.25, 1] }, // easeOut
    },
  };

  return (
    <section
      ref={sectionRef}
      className="
       bg-gradient-to-r from-transparent via-[var(--color-black)] to-transparent 
      relative text-[var(--color-text)] py-20 px-6 flex flex-col items-center text-center overflow-hidden"
    >
      {/* ---------- Section Title ---------- */}
      <motion.div
        variants={fadeUpVariant}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-3xl mb-8 lg:max-w-7xl"
      >
        <h2 className="text-4xl md:text-5xl lg:text-7xl font-semibold lg:leading-normal leading-snug">
          18MP Center Stage front camera.
          <span className="inline lg:hidden">&nbsp;</span>
          <br className="hidden lg:block" />
          It’s a total frame changer.
        </h2>
      </motion.div>

      {/* ---------- Description Text ---------- */}
      <motion.div
        variants={fadeUpVariant}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ delay: 0.2 }}
        className="max-w-5xl text-[var(--color-text-muted)] mb-12 text-lg md:text-xl leading-relaxed"
      >
        <p>
          The new front camera gives you flexible ways to frame your photos and
          videos — and so much more. Tap to expand the field of view and rotate
          from portrait to landscape without moving your iPhone. And when
          friends join the shot, the field of view expands so you get more
          friendsies in your selfies.
        </p>
      </motion.div>

      {/* ---------- Selfie Video ---------- */}
      <div className="w-full bg-transparent max-w-5xl mb-10 flex justify-center">
        <video
          ref={videoRef}
          src="/vid/SelfieClip1.mp4"
          muted
          loop
          playsInline
          className="rounded-2xl shadow-lg max-h-[600px] w-auto"
        />
      </div>

      {/* ---------- Bottom Description ---------- */}
      <motion.div
        variants={fadeUpVariant}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ delay: 0.3 }}
        className="max-w-2xl text-[var(--color-text-muted)] text-lg md:text-xl leading-relaxed"
      >
        <p>
          An all-new square sensor enables zoom and rotate options for more
          flexible ways to frame selfies and videos. And it gets everyone in a
          group shot — automatically.
        </p>
      </motion.div>
    </section>
  );
}
