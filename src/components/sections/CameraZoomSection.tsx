import { useState, useCallback, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * CameraResSection Component
 * -------------------------------------------------- 
 * Zoom Option Type Definition
 * Represents a single zoom option with associated image and zoom level.
 * 
 * -------------------------------------------------- */
type ZoomOption = {
  label: string;       // Display label for the zoom (e.g., "200 mm")
  value: string;       // Unique value identifier (e.g., "200mm")
  imagePath: string;   // Path to the image to display
  zoomLevel: string;   // Zoom level text (e.g., "8x")
};

/* =========================================================
   Zoom Options Configuration
   ---------------------------------------------------------
   List of all available zoom levels with corresponding 
   image paths and zoom text.
   ========================================================= */
const zoomOptions: ZoomOption[] = [
  { label: '200 mm', value: '200mm', imagePath: '/img/zoom/200mm__c8kya18imsqe_large.jpg', zoomLevel: '8x' },
  { label: '100 mm', value: '100mm', imagePath: '/img/zoom/100mm__cykxcenbhvue_large.jpg', zoomLevel: '4x' },
  { label: '48 mm', value: '48mm', imagePath: '/img/zoom/48mm__bmrwps1q6w76_large.jpg', zoomLevel: '2x' },
  { label: '35 mm', value: '35mm', imagePath: '/img/zoom/35mm__k375wbkrjp2e_large.jpg', zoomLevel: '1.5x' },
  { label: '28 mm', value: '28mm', imagePath: '/img/zoom/28mm__fylmxo06jq6i_large.jpg', zoomLevel: '1.2x' },
  { label: '24 mm', value: '24mm', imagePath: '/img/zoom/24mm__e54cxtdkdrwy_large.jpg', zoomLevel: '1x' },
  { label: '13 mm', value: '13mm', imagePath: '/img/zoom/13mm__dzafu9h1kaye_large.jpg', zoomLevel: '0.5x' },
  { label: 'Macro', value: 'macro', imagePath: '/img/zoom/macro__bb7oud7ri2o2_large.jpg', zoomLevel: 'Macro' },
];

/* =========================================================
   Initial Zoom Selection
   ========================================================= */
const initialZoom = zoomOptions[0];

/* =========================================================
   CameraShowcase Component
   ---------------------------------------------------------
   Main component to showcase camera zoom options with 
   animated image transitions and responsive zoom buttons.
   ========================================================= */
export default function CameraZoomSection() {
  // --- State Management ---
  const [currentZoom, setCurrentZoom] = useState<ZoomOption>(initialZoom);
  const [previousZoom, setPreviousZoom] = useState<ZoomOption | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  /* =========================================================
     Handle Zoom Change
     ---------------------------------------------------------
     Updates the current zoom selection and triggers fade
     animation for the previous image.
     ========================================================= */
  const handleZoomChange = useCallback(
    (newZoom: ZoomOption) => {
      if (newZoom.value === currentZoom.value) return;
      setPreviousZoom(currentZoom);
      setCurrentZoom(newZoom);
      setIsTransitioning(true);
    },
    [currentZoom]
  );

  /* =========================================================
     Transition Cleanup
     ---------------------------------------------------------
     Clears previous image after animation duration.
     ========================================================= */
  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setPreviousZoom(null);
        setIsTransitioning(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  const zoomLevelText = currentZoom.zoomLevel;

  /* =========================================================
     Scroll Controls for Mobile
     ---------------------------------------------------------
     Smoothly scrolls zoom button container left or right.
     ========================================================= */
  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -100, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 100, behavior: 'smooth' });
  };

  return (
    <section className="flex relative h-auto py-5 items-center justify-center bg-[var(--color-black)]">
      <div className="relative w-full max-w-5xl flex flex-col items-center justify-between">

        {/* =====================================================
           Image Display Section
           -----------------------------------------------------
           Shows current zoom image with fade transition for 
           previous image.
           ===================================================== */}
        <div className="relative w-[90%] sm:w-[85%] md:w-[80%] h-[40vh] sm:h-[65vh] md:h-[70vh] overflow-hidden mb-10 rounded-2xl shadow-lg">
          {/* Base (new) image */}
          <Image
            key={currentZoom.imagePath + '_base'}
            src={currentZoom.imagePath}
            alt={`Preview at ${currentZoom.label}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
            className="object-cover object-right"
            priority
          />

          {/* Fading previous image */}
          {previousZoom && (
            <motion.div
              key={previousZoom.imagePath + '_fadeout'}
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              className="absolute inset-0"
            >
              <Image
                src={previousZoom.imagePath}
                alt={`Preview at ${previousZoom.label}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
                className="object-cover object-right"
                priority
              />
            </motion.div>
          )}
        </div>

        {/* =====================================================
           Zoom Button Section
           -----------------------------------------------------
           Includes desktop horizontal buttons and mobile 
           scrollable buttons with animated active toggle.
           ===================================================== */}
        <div className="relative text-center w-full max-w-3xl">

          {/* Desktop view (hidden on mobile) */}
          <div className="hidden md:flex relative bg-[var(--color-white)]/60 rounded-full p-1.5 backdrop-blur-md shadow-2xl justify-center">
            {/* Active background animation */}
            <motion.div
              layoutId="active-bg"
              className="absolute top-1 left-1 bottom-1 bg-[var(--color-white)] rounded-full shadow-lg"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              style={{ width: `${100 / zoomOptions.length}%` }}
              animate={{
                x: zoomOptions.findIndex((z) => z.value === currentZoom.value) * 95,
              }}
            />

            {/* Zoom option buttons */}
            <div className="relative flex space-x-4">
              {zoomOptions.map((option) => {
                const isActive = currentZoom.value === option.value;
                return (
                  <button
                    key={option.value}
                    onClick={() => handleZoomChange(option)}
                    className={`relative px-3 py-1 text-sm font-medium rounded-full transition-all duration-300 min-w-[80px]
                      ${isActive ? 'text-black' : 'text-[var(--color-white)]/70 hover:text-[var(--color-white)]'}`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mobile view (scrollable buttons) */}
          <div className="flex md:hidden items-center justify-center px-3 w-full">
            {/* Left arrow */}
            <button
              onClick={scrollLeft}
              className="text-[var(--color-white)]/70 hover:text-[var(--color-white)] transition-colors"
            >
              <ChevronLeft size={22} />
            </button>

            {/* Scrollable buttons container */}
            <div
              ref={scrollRef}
              className="relative flex overflow-x-hidden bg-[var(--color-white)]/60 rounded-full p-1.5 backdrop-blur-md shadow-2xl mx-2"
              style={{ scrollBehavior: 'smooth' }}
            >
              {/* Active background */}
              <motion.div
                layoutId="active-bg-mobile"
                className="absolute top-1 left-1 bottom-1 bg-[var(--color-white)] rounded-full shadow-lg"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                style={{ width: 78 }}
                animate={{
                  x: zoomOptions.findIndex((z) => z.value === currentZoom.value) * 86,
                }}
              />

              {/* Zoom option buttons */}
              {zoomOptions.map((option) => {
                const isActive = currentZoom.value === option.value;
                return (
                  <button
                    key={option.value}
                    onClick={() => handleZoomChange(option)}
                    className={`relative z-10 flex-shrink-0 px-3 py-1 text-sm font-medium rounded-full min-w-[80px] mx-0.5
                      ${isActive ? 'text-black' : 'text-[var(--color-white)]/70 hover:text-[var(--color-white)]'}`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>

            {/* Right arrow */}
            <button
              onClick={scrollRight}
              className="text-[var(--color-white)]/70 hover:text-[var(--color-white)] transition-colors"
            >
              <ChevronRight size={22} />
            </button>
          </div>

          {/* Zoom level display */}
          <div className="mt-3 text-[var(--color-white)]/80 text-base font-medium">
            {zoomLevelText}
          </div>
        </div>
      </div>
    </section>
  );
}
