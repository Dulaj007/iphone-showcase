"use client";

import { useState } from "react";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import Image from "next/image";

/**
 * Navbar Component
 * ------------------------------------------------------
 * This component renders the main navigation bar for the iPhone 17 Pro showcase page.
 * Features:
 *  - Responsive navigation with animated expand/collapse behavior.
 *  - Animated SVG background with integrated content.
 *  - "Buy" and "Explore" buttons triggering animations for detailed product display.
 *  - Mobile-friendly with pointer-event handling.
 *  - framer-motion: For smooth animations of navbar, SVG, and content.
 * ------------------------------------------------------
 */
export default function Navbar() {
  const [showShape, setShowShape] = useState(false); // State to toggle expanded view

  // Animation controllers
  const navbarControls = useAnimation();
  const contentControls = useAnimation();
  const svgControls = useAnimation();
  const arrowControls = useAnimation();
  const buyContentControls = useAnimation(); // Controls the product display inside SVG

  /**
   * handleBuyClick
   * ------------------------------------------------------
   * Triggered when the "Explore" button is clicked.
   * Steps:
   *  1. Shrinks the navbar and hides default content.
   *  2. Moves the navbar and SVG downwards to reveal expanded area.
   *  3. Animates the product showcase content and arrow into view.
   */
  const handleBuyClick = async () => {
    if (!showShape) {
      // Step 1: Shrink navbar & hide content
      await Promise.all([
        navbarControls.start({ maxWidth: "10rem", transition: { duration: 0.7, ease: "easeInOut" } }),
        contentControls.start({ opacity: 0, y: -20, transition: { duration: 0.5 } }),
      ]);

      // Step 2: Move navbar + SVG down
      await Promise.all([
        navbarControls.start({ y: "100vh", transition: { duration: 1, ease: "easeInOut" } }),
        svgControls.start({ y: "-20%", transition: { duration: 1, ease: "easeInOut" } }),
      ]);

      // Step 3: Show Buy Content and arrow
      buyContentControls.start({ opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.3 } });
      arrowControls.start({ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.5 } });

      setShowShape(true);
    }
  };

  /**
   * handleArrowClick
   * ------------------------------------------------------
   * Triggered when the arrow button is clicked to collapse expanded view.
   * Steps:
   *  1. Hide the arrow and expanded content.
   *  2. Reset navbar and SVG position.
   *  3. Restore default navbar content and size.
   */
  const handleArrowClick = async () => {
    // Hide arrow and product content
    await arrowControls.start({ opacity: 0, y: 20, transition: { duration: 0.3 } });
    await buyContentControls.start({ opacity: 0, y: -20, transition: { duration: 0.3 } });

    // Reset navbar and SVG positions
    await Promise.all([
      navbarControls.start({ y: 0, transition: { duration: 1, ease: "easeInOut" } }),
      svgControls.start({ y: "-175%", transition: { duration: 1.5, ease: "easeInOut" } }),
    ]);

    // Restore navbar width and content visibility
    await Promise.all([
      navbarControls.start({ maxWidth: "72rem", transition: { duration: 0.7, ease: "easeInOut" } }),
      contentControls.start({ opacity: 1, y: 0, transition: { duration: 0.5 } }),
    ]);

    setShowShape(false);
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-500 transition-all duration-700 ${showShape ? "h-screen" : "h-auto"}`}>
      
      {/* SVG Shape Background */}
      <motion.div
        className="absolute hidden lg:block top-0 left-1/2 -translate-x-1/2 w-[90%] pointer-events-none"
        initial={{ y: "-100%" }}
        animate={svgControls}
      >
        <svg
          viewBox="0 0 1440 1001"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]"
        >
          <path
            d="M1440 847C1440 872.863 1420.36 894.138 1395.19 896.733C1392.8 896.806 1390.46 896.893 1388.17 897C1323.01 900.037 1296.87 917.217 1284.84 961.766C1279.91 984.205 1259.92 1001 1236 1001H207C183.925 1001 164.501 985.369 158.738 964.118L158 965C146.535 918.778 121.343 900.677 56.9238 897.156L53.8262 897C50.6912 896.854 47.4658 896.742 44.1475 896.66C19.2909 893.762 9.83203e-07 872.634 0 847V0H1440V847Z"
            fill="rgb(255, 255, 255)"
            stroke="rgba(232, 232, 232,0.2)"
          />
        </svg>

        {/* Product showcase content inside SVG */}
        <AnimatePresence>
          {showShape && (
            <motion.div
              className="absolute top-[20%] left-1/2 -translate-x-1/2 w-full max-w-7xl px-6 text-[var(--color-black)] z-400"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.7 } }}
              exit={{ opacity: 0, y: -20, transition: { duration: 0.5 } }}
            >
              {/* Product main display */}
              <div className=" max-w-7xl flex flex-col justify-center items-center p-6 rounded-2xl space-y-2 bg-[var(--color-white)]">
                <h1 className="text-4xl ">iPhone 17 Pro</h1>
                <Image
                  src="/img/BuyImages/buyImg2.png"
                  alt="iPhone 17 Pro"
                  width={700}
                  height={700}
                />
                <p className="text-xl font-semibold">From $1099 or $45.79/mo. for 24 mo.*</p>
                <p className="text-sm opacity-90">Innovative design for ultimate performance and battery life.</p>
                <button
                  onClick={() => window.location.href = "/buy"}
                  className="px-6 py-2 rounded-full font-semibold text-[var(--color-white)] mt-2 z-250
                    bg-gradient-to-r from-[var(--color-yellow)] via-[var(--color-orange)] to-[var(--color-yellow)]
                    bg-[length:200%_200%] bg-gradient-animate
                    shadow-[0_0_15px_2px_rgba(255,140,0,0.4)]
                    hover:shadow-[0_0_20px_4px_rgba(255,140,0,0.6)]
                    hover:scale-105 
                    transition-all duration-300
                    backdrop-blur-md"
                >
                  Buy Now
                </button>

                {/* Feature highlights */}
                <div className="flex flex-row justify-center gap-4 mt-6">
                  {[
                    { img: null, mainTitle: '6.9″ or 6.3″', desc: 'Super Retina XDR display' },
                    { img: '/img/BuyImages/iphone_17_promax_camera__.png', title: '48MP Pro Fusion camera system' },
                    { img: '/img/BuyImages/chip_a19pro.png', title: 'A19 Pro chip with 6‑core GPU and Neural Accelerators' },
                    { img: '/img/BuyImages/battery_.png', title: 'Up to 39 hours video playback' },
                    { img: '/img/BuyImages/apple_intelligence.png', title: 'Apple Intelligence2' },
                  ].map((item, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center text-center px-2">
                      {item.img && <Image src={item.img} alt={item.title} width={50} height={50} className="rounded-xl mb-2" />}
                      <p className="text-2xl font-bold">{item.mainTitle}</p>
                      <p className="text-sm font-semibold">{item.title}</p>
                      {item.desc && <p className="text-xs">{item.desc}</p>}
                    </div>
                  ))}
                </div>

                <p className="max-w-5xl mt-5 opacity-80 text-center text-sm hidden lg:block">
                  The iPhone 17 Pro features a durable forged aluminum body, Ceramic Shield 2 for enhanced protection, and the powerful A19 Pro chip. Its 48MP Pro Fusion camera offers 8x optical-quality zoom and Dual Capture video, while Apple Intelligence tools make every experience smarter.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Navbar container */}
      <motion.div
        className="relative z-50 mx-auto w-full flex justify-center"
        animate={navbarControls}
        initial={{ maxWidth: "72rem", y: 0 }}
      >
        <motion.div
          className="flex items-center justify-between mt-2.5 h-10 backdrop-blur-xl mx-3
                    bg-gradient-to-r from-transparent via-[var(--color-white)]/10 to-transparent
                    bg-[length:200%_200%] bg-gradient-animate-slow
                   
                    transition-all duration-900
                    rounded-4xl p-7 lg:px-10 border border-[var(--color-white)]/20 shadow-2xl w-full"
          animate={{ justifyContent: showShape ? "center" : "space-between" }}
        >
          {/* Navbar content */}
          <motion.div animate={contentControls} className="flex items-center w-full justify-between">
            {!showShape && (
              <>
                <span className="font-extrabold text-2xl drop-shadow-[0_0_12px_rgba(000,000,000,0.9)] transition-all duration-500 bg-[var(--color-white)]/90 bg-clip-text text-transparent">
                  iPhone 17 Pro
                </span>
                <div className="md:flex gap-3">
                  <button
                    onClick={handleBuyClick}
                    className="hidden lg:flex px-5 py-1 border-2 font-bold border-[var(--color-white)]/70 text-[var(--color-white)] rounded-full 
                      hover:bg-[var(--color-white)] hover:text-[var(--color-black)] 
                      hover:shadow-[0_0_20px_2px_rgba(255,255,255,0.5)] 
                      shadow-[0_0_20px_2px_rgba(0,0,0,0.1)] 
                      transition-all duration-300 hover:scale-105
                      drop-shadow-[0_0_12px_rgba(000,000,000,0.5)]"
                  >
                    Explore
                  </button>

                  <a
                    href="#explore"
                    className="relative px-5 py-1 rounded-full text-[var(--color-white)] font-semibold 
                      bg-gradient-to-r from-[var(--color-yellow)] via-[var(--color-orange)] to-[var(--color-yellow)]
                      bg-[length:200%_200%] bg-gradient-animate
                      shadow-[0_0_15px_2px_rgba(255,140,0,0.4)]
                      hover:shadow-[0_0_15px_4px_rgba(255,140,0,0.5)]
                      hover:scale-105 
                      transition-all duration-300"
                  >
                    Buy
                  </a>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Arrow button to collapse expanded content */}
      {showShape && (
        <motion.div
          animate={arrowControls}
          initial={{ opacity: 1, y: 20 }}
          className="absolute left-1/2 bottom-25.5 -translate-x-1/2 flex flex-col items-center gap-5 z-50"
        >
          <motion.button
            onClick={handleArrowClick}
            className="py-4 rounded-full px-[5rem] bg-[var(--color-white)] shadow-2xl
              mix-blend-lighten transition-all duration-300 flex items-center justify-center"
          >
            <Image
              src="/Icons/upArrow.svg"
              alt="Up Arrow"
              width={32}
              height={32}
              className="opacity-90 hover:opacity-100 transition-all duration-300"
            />
          </motion.button>
        </motion.div>
      )}
    </nav>
  );
}
