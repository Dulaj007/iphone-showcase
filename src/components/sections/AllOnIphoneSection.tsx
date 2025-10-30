import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { motion, useInView, Variants } from "framer-motion";

/**
 * AllOnIphoneSection Component
 * --------------------------------------------------
 * A visually engaging section that showcases a trio of iPhone images and
 * a descriptive text block. The section includes GSAP based scroll animations
 * for dynamic interactivity and Framer Motion for smooth content transitions.
 *
 * Key Features:
 * - Scroll-triggered image size and spacing animations (GSAP + ScrollTrigger)
 * - Text fade up animations (Framer Motion)
 * - Responsive layouts for both desktop and mobile views
 * - Professional section structure for product highlighting
 */

gsap.registerPlugin(ScrollTrigger);

export default function AllOnIphoneSection() {
  /** --------------------------- Refs Setup --------------------------- */
  const sectionRef = useRef<HTMLDivElement>(null); // Main section reference for scroll animations
  const containerRef = useRef<HTMLDivElement>(null); // Container for the image group
  const centerImageRef = useRef<HTMLDivElement>(null); // Center image element reference

  /** --------------------------- In-View Detection --------------------------- */
  // Detects when the section enters the viewport to trigger fade animations
  const isInView = useInView(sectionRef, { once: false, margin: "-10% 0px" });

  /** --------------------------- Animation Variants --------------------------- */
  // Defines Framer Motion variants for smooth fade-up transitions
  const fadeUpVariant: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 2.2, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  /** --------------------------- GSAP Scroll Animations --------------------------- */
  useEffect(() => {
    // Prevents initialization if any reference is missing
    if (!sectionRef.current || !containerRef.current || !centerImageRef.current) return;

    // GSAP timeline configured with ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 20%", // When the section top reaches 20% of viewport
        end: "bottom 60%", // Ends when the bottom of section is at 60% of viewport
        scrub: true, // Smooth scroll sync
      },
    });

    // Animate the gap between the images for a compact effect
    tl.to(containerRef.current, { gap: "5", duration: 1 }, 0);

    // Reduce center image width slightly during scroll
    tl.to(centerImageRef.current, { width: 360, duration: 1 }, 0);
  }, []);

  /** --------------------------- JSX Structure --------------------------- */
  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col justify-center items-center h-auto overflow-hidden py-10 bg-[var(--color-black)]"
    >
      {/* ---------- Section Title ---------- */}
      <motion.div
        variants={fadeUpVariant}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-3xl mb-8 lg:max-w-7xl text-center px-6"
      >
        <p className="text-[var(--color-orange)] text-xl font-bold">All in the family</p>
        <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold lg:leading-tight leading-snug">
          All the must-haves.
          <span className="inline lg:hidden">&nbsp;</span>
          <br className="hidden lg:block" />
          All on iPhone.
        </h2>
      </motion.div>

      {/* ---------- Desktop Image Layout ---------- */}
      <div
        ref={containerRef}
        className="flex-row items-center justify-center max-w-7xl w-full gap-30 hidden md:flex"
      >
        {/* Left image */}
        <div className="flex-shrink-0">
          <Image
            src="/img/All-in/im01.jpg"
            alt="Image 01"
            width={250}
            height={500}
            className="object-cover"
          />
        </div>

        {/* Center image (animated) */}
        <div ref={centerImageRef} className="flex-shrink-0">
          <Image
            src="/img/All-in/im02.jpg"
            alt="Image 02"
            width={450} // Initial width before animation
            height={500}
            className="object-cover"
          />
        </div>

        {/* Right image */}
        <div className="flex-shrink-0">
          <Image
            src="/img/All-in/im03.jpg"
            alt="Image 03"
            width={250}
            height={500}
            className="object-cover"
          />
        </div>
      </div>

      {/* ---------- Mobile Image Layout ---------- */}
      <div
        className="flex-row items-center justify-center max-w-full w-full gap-3 px-10 flex md:hidden"
      >
        {/* Left image */}
        <div>
          <Image
            src="/img/All-in/im01.jpg"
            alt="Image 01"
            width={110}
            height={200}
            className="object-cover"
          />
        </div>

        {/* Center image */}
        <div>
          <Image
            src="/img/All-in/im02.jpg"
            alt="Image 02"
            width={150}
            height={200}
            className="object-cover"
          />
        </div>

        {/* Right image */}
        <div>
          <Image
            src="/img/All-in/im03.jpg"
            alt="Image 03"
            width={110}
            height={200}
            className="object-cover"
          />
        </div>
      </div>

      {/* ---------- Description Text ---------- */}
      <motion.div
        variants={fadeUpVariant}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ delay: 0.2 }}
        className="max-w-4xl text-[var(--color-text-muted)] text-center font-semibold py-5 mb-12 text-sm md:text-xl leading-relaxed px-6"
      >
        <p>
          The latest iPhone models come packed with advanced capabilities. Helpful Apple
          Intelligence features such as visual intelligence13 and Writing Tools to make
          your everyday easier. Fast, secure connections with{" "}
          <span className="text-[var(--color-white)]">
            Wi-Fi 7,14 Bluetooth 6, 5G connectivity,15 and eSIM.
          </span>{" "}
          16 And safety features like Messages via satellite designed to give you peace of mind.
        </p>
      </motion.div>
    </section>
  );
}
