"use client";

import Image from "next/image";
import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";

/**
 * CameraResSection Component
 * --------------------------------------------------
 * Showcases the camera capabilities of the device.
 * Animations:
 * - Text and image fade in + slide up when section enters viewport
 * - Reverses animation when section exits viewport
 */

const CameraResSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-10% 0px" });

  // Fade + upward motion variant
  const fadeUpVariant: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 2.5, ease: [0.25, 0.1, 0.25, 1] }, // smooth ease-out
    },
  };

  return (
    <section
      ref={sectionRef}
      className="text-[var(--color-white)]
      bg-gradient-to-r from-transparent via-[var(--color-black)] to-transparent 
      relative  flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="w-full flex flex-col items-center z-20">

        {/* ===== Heading Section ===== */}
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center bg-transparent pt-16 md:pt-20 pb-8 md:pb-12 px-4 sm:px-6 md:px-12 lg:px-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
            <span className="text-gray-400 font-light">Like having</span>{" "}
            8 pro lenses in your pocket.
          </h2>
          <p className="mt-2 sm:mt-3 text-md sm:text-lg md:text-xl lg:text-2xl text-gray-300">
            <span className="text-gray-400 font-light">Super-high-resolution</span>{" "}
            24MP photos by default.
          </p>
        </motion.div>

        {/* ===== Camera Image Section ===== */}
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ delay: 0.2 }} // Slight delay for staggered effect
          className="w-full relative z-10"
        >
          <Image
            src="/img/camMac.jpg"
            alt="Phone Camera Module"
            layout="responsive"
            width={1920}
            height={1080}
            className="w-full h-auto object-cover shadow-2xl rounded-lg"
          />
        </motion.div>

        {/* ===== Camera Specs Section ===== */}
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ delay: 0.3 }} // Staggered appearance
          className="w-full 
          bg-black
          py-12 md:py-20 px-4 sm:px-6 md:px-16 lg:px-32 flex flex-col md:flex-row items-center md:items-start justify-center gap-8 md:gap-16 z-20"
        >
          
          {/* Main Camera */}
          <div className="flex-1 text-center md:text-left border-b md:border-b-0 md:border-r border-gray-700 pb-6 md:pb-0 md:pr-6">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-3">48MP Fusion Main Camera</h3>
            <ul className="list-none space-y-2 sm:space-y-3 text-gray-300 text-md sm:text-lg md:text-xl">
              <li>24/48 mm focal length (1x/2x)</li>
              <li>ƒ/1.78 aperture</li>
              <li>2.44 µm quad-pixel (1.22 µm individual)</li>
            </ul>
          </div>

          {/* Ultra Wide Camera */}
          <div className="flex-1 text-center md:text-left border-b md:border-b-0 md:border-r border-gray-700 pb-6 md:pb-0 md:pr-6">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-3">48MP Fusion Ultra Wide Camera</h3>
            <ul className="list-none space-y-2 sm:space-y-3 text-gray-300 text-md sm:text-lg md:text-xl">
              <li>13 mm focal length (.5x/macro)</li>
              <li>ƒ/2.2 aperture</li>
              <li>1.4 µm quad-pixel (0.7 µm individual)</li>
            </ul>
          </div>

          {/* Telephoto Camera */}
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-3">48MP Fusion Telephoto Camera</h3>
            <ul className="list-none space-y-2 sm:space-y-3 text-gray-300 text-md sm:text-lg md:text-xl">
              <li>100/200 mm focal length (4x/8x)</li>
              <li>ƒ/2.8 aperture</li>
              <li>1.4 µm quad-pixel (0.7 µm individual)</li>
            </ul>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default CameraResSection;
