import Image from "next/image";
import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";

/**
 * MainCameraSection Component
 * --------------------------------------------------
 * A responsive section showcasing the iPhone Main camera system
 * with smooth blend-in/out text animations on scroll.
 */

export default function MainCameraSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-10% 0px" });

  const fadeUpVariant: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 2.5, ease: [0.25, 0.1, 0.25, 1] },
    },
    exit: {
      opacity: 0,
      y: 30,
      transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
    },
  };

  return (
    <section
    ref={sectionRef}
    className="text-[var(--color-white)] py-20 flex flex-col items-center 
              bg-gradient-to-r from-[var(--color-black)] via-[var(--color-black)] to-transparent  
              relative overflow-hidden"
    >


      {/* ---------- Section Title ---------- */}
      <motion.div
        variants={fadeUpVariant}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="text-center mb-10"
      >
        <h3 className="text-[var(--color-orange)] text-sm md:text-base font-semibold mb-2">
          Cameras
        </h3>
        <h1 className="text-4xl md:text-6xl font-bold text-[var(--color-white)]">
          A big zoom forward.
        </h1>
      </motion.div>

      {/* ---------- Image and Feature Layout ---------- */}
      <div className="flex flex-col lg:flex-row items-center w-full relative gap-6 lg:gap-0">
        {/* --- Device Image --- */}
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="w-full lg:w-3/4 relative"
        >
          <div className="overflow-hidden">
            <Image
              src="/img/cmeraWhitePhone.jpg"
              alt="iPhone Camera"
              width={1200}
              height={800}
              className="
                rounded-lg 
                w-[170%] 
                md:w-[115%] 
                lg:w-[120%] 
                object-cover 
                object-left 
                -translate-x-[40%] 
                md:-translate-x-[30%] 
                lg:-translate-x-[20%]
                transition-all
              "
              priority
            />
          </div>
        </motion.div>

        {/* --- Camera Feature Stats --- */}
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="lg:w-[35%] lg:-ml-16 text-center lg:text-left 
                     flex flex-col items-center lg:items-start space-y-12"
        >
          {/* Optical Zoom Stat */}
          <div className="flex flex-col items-center lg:items-start">
            <p className="text-[var(--color-text-muted)] text-base md:text-lg">
              Up to
            </p>
            <p className="text-[var(--color-orange)] text-5xl md:text-6xl font-bold leading-snug">
              8x
            </p>
            <p className="text-[var(--color-text)] text-base font-bold md:text-xl">
              optical-quality zoom
            </p>
          </div>

          {/* Megapixel Stat */}
          <div className="flex flex-col items-center lg:items-start">
            <p className="text-[var(--color-text-muted)] text-base md:text-lg">
              All
            </p>
            <p className="text-[var(--color-orange)] text-5xl md:text-6xl font-bold leading-snug">
              48MP
            </p>
            <p className="text-[var(--color-text)] text-base font-bold md:text-xl">
              rear cameras
            </p>
          </div>
        </motion.div>
      </div>

      {/* ---------- Description Text ---------- */}
      <motion.div
        variants={fadeUpVariant}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-5xl mt-16 px-5 text-[var(--color-text-muted)] 
                   text-center text-sm md:text-base leading-relaxed"
      >
        <p>
          Across the iPhone 17 Pro camera system, you’ll find innovation that
          goes to great lengths. The telephoto features the next generation of
          our tetraprism design and a 56 percent larger sensor. With an
          equivalent 200 mm focal length, the 8x optical-quality zoom makes this{" "}
          <span className="text-[var(--color-white)] font-semibold">
            the longest iPhone Telephoto ever
          </span>{" "}
          — offering 16x total optical zoom range. So you can explore an even
          wider range of creative choices and add a longer reach to your
          compositions.
        </p>
      </motion.div>
    </section>
  );
}
