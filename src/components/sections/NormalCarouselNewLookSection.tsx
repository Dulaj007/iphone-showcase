
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

/** 
 * NormalCarouselCameraSection Component
 * --------------------------------------------------
 * This component renders a responsive carousel showcasing
 * the main camera system of the iPhone. Features include:
 * 
 * - Responsive slide widths for small and medium+ screens
 * - Smooth sliding transitions using Framer Motion
 * - Clickable slides to navigate directly
 * - Next and Previous navigation buttons
 * - Dark mode focused design adhering to the defined color theme
 */

/** Array of slide objects containing image paths and descriptive text */
const slides = [
  { img: "/img/newLook/si01.jpg", text: "Liquid Glass. The new iOS design reflects and refracts what’s beneath it in real time, dynamically adapting to your content across apps and devices." },
  { img: "/img/newLook/si02.jpg", text: "A more vibrant Lock Screen. The time dynamically adapts to your photo wallpaper and notifications, keeping your subject in view. When you move your iPhone, your photo comes to life with a new 3D effect." },
  { img: "/img/newLook/si03.jpg", text: "Call Screening. Automatically answers unknown callers. Once they share their name and reason for calling, your phone rings and you decide if you want to pick up." },
  { img: "/img/newLook/si04.jpg", text: "Hold Assist. Keeps your spot in line while you wait for a live agent and notifies you when they’re ready." },
  { img: "/img/newLook/si05.jpg", text: "Polls in Messages. Create a poll and let everyone in the conversation contribute and watch as the votes come in" },
];

export default function NormalCarouselCameraSection() {
  /** Current active slide index */
  const [current, setCurrent] = useState(0);

  /** Slide width percentage for responsive design */
  const [slideWidth, setSlideWidth] = useState(70); // default width for small screens

  /** 
   * Responsive behavior: update slide width based on viewport
   * - 70% width for small screens
   * - 30% width for medium and larger screens (>= 768px)
   */
  useEffect(() => {
    const updateSlideWidth = () => {
      if (window.innerWidth >= 768) {
        setSlideWidth(30);
      } else {
        setSlideWidth(70);
      }
    };

    updateSlideWidth(); // initial check
    window.addEventListener("resize", updateSlideWidth);

    return () => window.removeEventListener("resize", updateSlideWidth);
  }, []);

  /** Navigate to the next slide */
  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  /** Navigate to the previous slide */
  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="w-full relative bg-[var(--color-black)] text-[var(--color-text)] py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-8 my-10">
        {/* Section Heading */}
        <h2 className="text-3xl md:text-4xl font-semibold mb-8 text-left text-[var(--color-white)]">
          iOS 26. New look.<br />
          Even more magic.
        </h2>

        {/* Slider Container */}
        <div className="relative">
          <motion.div
            className="flex transition-transform duration-700 ease-in-out cursor-pointer"
            style={{ transform: `translateX(calc(-${current * (slideWidth + 3)}%))` }} // slide translation with margin adjustment
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[70%] md:w-[30%] mx-[1.5%] overflow-hidden relative"
                onClick={() => setCurrent(index)}
              >
                {/* Image Container */}
                <div className="relative w-full aspect-[2.5/3]">
                  <Image
                    src={slide.img}
                    alt={`slide-${index}`}
                    fill
                    className="object-cover rounded-3xl"
                  />
                </div>

                {/* Slide Description */}
                <p className="mt-4 text-base md:text-lg leading-relaxed text-[var(--color-white)]/70 font-semibold">
                  {slide.text}
                </p>
              </div>
            ))}
          </motion.div>

          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            className="absolute right-14 bg-[var(--color-white)]/20 hover:bg-[var(--color-white)]/40 text-[var(--color-white)] rounded-full w-10 h-10 flex items-center justify-center"
          >
            ‹
          </button>
          <button
            onClick={handleNext}
            className="absolute right-2 bg-[var(--color-white)]/20 hover:bg-[var(--color-white)]/40 text-[var(--color-white)] rounded-full w-10 h-10 flex items-center justify-center"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
