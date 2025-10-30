import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

/** 
 * ============================================================
 * NormalCarouselVideoSection Component
 * ============================================================
 * Description:
 * A responsive, interactive carousel designed to highlight the 
 * videography capabilities of the iPhone 17 Pro. The section 
 * dynamically adapts its layout between desktop and mobile viewports.
 * 
 * Key Features:
 * - Responsive image carousel with smooth horizontal transitions.
 * - Dynamic width measurement for desktop layout precision.
 * - Touch-friendly navigation for mobile.
 * - Interactive navigation dots and directional buttons.
 * 
 * ============================================================
 */

const slides = [
  {
    img: "/img/VideoSider/vsl1.jpg",
    text: "ProRes RAW. iPhone 17 Pro is the first smartphone to support this industry-leading Apple-developed video codec, which offers the highest level of control and quality.",
    width: "70vh",
    height: "90%",
  },
  {
    img: "/img/VideoSider/vsl2.jpg",
    text: "Pro workflows. Support for a wider color gamut with Apple Log 2, broadcast frame rates, and recording open gate.",
    width: "75vh",
    height: "90%",
  },
  {
    img: "/img/VideoSider/vsl3.jpg",
    text: "Genlock and timecode support. Allows superprecise video synchronization, which is useful for content creators and Hollywood productions alike. Supported via the new Blackmagic Camera ProDock.",
    width: "100%",
    height: "90%",
  },
  {
    img: "/img/VideoSider/vsl4.jpg",
    text: "4K 120 fps Dolby Vision. Adds stunning cinematic quality with a combination of high resolution and higher frame rates.",
    width: "70vh",
    height: "65vh",
  },
];

export default function NormalCarouselVideoSection() {
  /** Current active slide index */
  const [current, setCurrent] = useState(0);

  /** Device state — determines mobile vs desktop behavior */
  const [isMobile, setIsMobile] = useState(false);

  /** Stores measured widths of each slide (desktop only) */
  const [slideWidths, setSlideWidths] = useState<number[]>([]);

  /** Refs to each slide container for measurement */
  const slideRefs = useRef<HTMLDivElement[]>([]);

  /**
   * Detects viewport size and updates mobile state.
   * Runs on initial load and window resize.
   */
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /**
   * Measures and stores slide widths after render.
   * Only applies to desktop layout for accurate translation.
   */
  useEffect(() => {
    if (!isMobile && slideRefs.current.length) {
      const widths = slideRefs.current.map((el) => el?.offsetWidth || 0);
      setSlideWidths(widths);
    }
  }, [isMobile]);

  /** Advances carousel to the next slide */
  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  /** Moves carousel to the previous slide */
  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  /**
   * Computes horizontal translation offset for smooth transitions.
   * - Mobile: Uses percentage-based transform.
   * - Desktop: Uses pixel-based transform with margin adjustment.
   */
  const getTranslateX = () => {
    if (isMobile) return current * 100;
    if (!slideWidths.length) return 0;
    const margin = (slideRefs.current[0]?.offsetWidth || 0) * 0.03;
    return slideWidths.slice(0, current).reduce((a, b) => a + b + margin * 2, 0);
  };

  return (
    <section className="w-full relative bg-[var(--color-black)] text-[var(--color-text)] py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-8 my-10">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-semibold mb-8 text-left text-[var(--color-white)]">
          Pro results down to the pixel.
        </h2>

        {/* Carousel Wrapper */}
        <div className="relative">
          <motion.div
            className="flex transition-transform duration-700 ease-in-out cursor-pointer"
            style={{
              transform: isMobile
                ? `translateX(-${current * 98}%)`
                : `translateX(-${getTranslateX()}px)`,
            }}
          >
            {/* Individual Slide */}
            {slides.map((slide, index) => (
              <div
                key={index}
                ref={(el) => {
                  slideRefs.current[index] = el!;
                }}
                className={`flex-shrink-0 mx-[1.5%] rounded-3xl overflow-hidden relative ${
                  isMobile ? "w-[85vw]" : ""
                }`}
                style={!isMobile ? { width: slide.width } : {}}
                onClick={() => setCurrent(index)}
              >
                {/* Image Container */}
                <div
                  className="relative w-full"
                  style={{ height: isMobile ? "70vw" : slide.height }}
                >
                  <Image
                    src={slide.img}
                    alt={`slide-${index}`}
                    fill
                    className="object-cover rounded-3xl"
                  />
                </div>

                {/* Caption Text */}
                <p className="mt-4 px-5 md:px-2 mb-10 text-base md:text-lg leading-relaxed text-[var(--color-white)]/70 font-semibold">
                  {slide.text}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center mt-6 space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 rounded-full transition ${
                current === index
                  ? "bg-[var(--color-white)]"
                  : "bg-[var(--color-white)]/30"
              }`}
            />
          ))}
        </div>

        {/* Navigation Controls */}
        <div className="absolute right-[15%] flex flex-row gap-2">
          <button
            onClick={handlePrev}
            className="transform -translate-y-1/2 bg-[var(--color-white)]/20 hover:bg-[var(--color-white)]/40 text-[var(--color-white)] rounded-full w-10 h-10 flex items-center justify-center z-20"
            aria-label="Previous slide"
          >
            ‹
          </button>
          <button
            onClick={handleNext}
            className="transform -translate-y-1/2 bg-[var(--color-white)]/20 hover:bg-[var(--color-white)]/40 text-[var(--color-white)] rounded-full w-10 h-10 flex items-center justify-center z-20"
            aria-label="Next slide"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
