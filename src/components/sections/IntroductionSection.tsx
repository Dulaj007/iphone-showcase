import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";

/**
 * IntroducingSection
 * ------------------------------------------------------
 * Hero sub section introducing iPhone 17 Pro.
 * Text fades in when the section enters the viewport
 * and fades out when the user scrolls past it.
 * 
 * This section is displayed only on screens larger than 'sm'.
 * Text elements have fade-in/out motion animations for smooth appearance.
 * ------------------------------------------------------
 */
export default function IntroductionSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-100px 0px -100px 0px" });
  const controls = useAnimation();

  // Trigger animation based on visibility
  useEffect(() => {
    if (isInView) {
      controls.start({ opacity: 1, y: 0 });
    } else {
      controls.start({ opacity: 0, y: 20 });
    }
  }, [isInView, controls]);

  return (
    <section
      ref={ref}
      className="relative flex flex-col items-center justify-start h-auto bg-gradient-to-b from-transparent via-[var(--color-black)] to-[var(--color-black)] px-6"
    >
      {/* === Title & Description === */}
      <div className="flex flex-col items-center text-center mb-12">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] text-[var(--color-white)]"
          
        >
          Unibody enclosure.<br />
          Makes a strong case for itself.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
          className="max-w-2xl text-lg md:text-xl text-[var(--color-white)]/70"
          
        >
          Introducing iPhone 17 Pro and iPhone 17 Pro Max, designed from the
          inside out to be the most powerful iPhone models ever made. At the
          core of the new design is a heat-forged aluminum unibody enclosure
          that maximizes performance, battery capacity, and durability.
        </motion.p>
      </div>

      {/* === Image === */}
      <div className="relative flex items-center justify-center">
        <Image
          src="/img/iphone17proHalfe.png"
          alt="iPhone Sketch"
          width={600}
          height={600}
          className="relative z-20"
        />
      </div>
    </section>
  );
}
