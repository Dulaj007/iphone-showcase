import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

/** 
 * NormalCarouselCameraSection Component
 * --------------------------------------------------
 * A responsive Carousel section showcasing the iPhone Main camera system.
 */

const slides = [
  { img: "/img/CameraSider/sld1.jpg", text: "Low-light photography and Night mode. Capture sharp, detailed, bright images with natural colors, even when it’s dark." },
  { img: "/img/CameraSider/sld2.jpg", text: "All 48MP rear cameras. Pro Fusion cameras capture more detailed images at every zoom range and light level." },
  { img: "/img/CameraSider/sld3.jpg", text: "Ultra Wide camera. Capture powerful perspectives with mesmerizing macro photos and dramatic wide-angle shots." },
  { img: "/img/CameraSider/sld4.jpg", text: "Latest-generation Photographic Styles. Choose from different preset styles, including the new Bright option, to customize the tone, color, and look of your photos." },
  { img: "/img/CameraSider/sld5.jpg", text: "Clean Up. Remove unwanted objects, people, and background distractions from your photos." },
];

export default function NormalCarouselCameraSection() {
  const [current, setCurrent] = useState(0);

  // Navigate to next slide
  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  // Navigate to previous slide
  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="w-full relative bg-[var(--color-black)] text-[var(--color-text)] py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-8 my-10">
        {/* Section Heading */}
        <h2 className="text-3xl md:text-4xl font-semibold mb-8 text-left text-[var(--color-white)]">
          Pro results down to the pixel.
        </h2>

        {/* SLIDER CONTAINER */}
        <div className="relative">
          <motion.div
            className="flex transition-transform duration-700 ease-in-out cursor-pointer"
            style={{ transform: `translateX(calc(-${current * 70}%))` }}
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[70%] md:w-[70%] mx-[1.5%] rounded-3xl overflow-hidden relative"
                onClick={() => setCurrent(index)}
              >
                <div className="relative w-full aspect-[4/3]">
                  <Image
                    src={slide.img}
                    alt={`slide-${index}`}
                    fill
                    className="object-cover rounded-3xl"
                  />
                </div>
                <p className="mt-4 text-base md:text-lg leading-relaxed text-[var(--color-white)] font-semibold">
                  {slide.text}
                </p>
              </div>
            ))}
          </motion.div>

          {/* NEXT / PREV BUTTONS */}
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

        {/* DOTS NAVIGATION */}
        <div className="flex justify-center mt-6 space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 rounded-full transition ${
                current === index ? "bg-[var(--color-white)]" : "bg-[var(--color-white)]/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
