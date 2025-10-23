"use client";

import { useState } from "react";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import Image from "next/image";

export default function Navbar() {
  const [showShape, setShowShape] = useState(false);

  const navbarControls = useAnimation();
  const contentControls = useAnimation();
  const svgControls = useAnimation();
  const arrowControls = useAnimation();
  const buyContentControls = useAnimation(); // For new content inside SVG

  const handleBuyClick = async () => {
    if (!showShape) {
      // 1️⃣ Shrink navbar & hide content
      await Promise.all([
        navbarControls.start({ maxWidth: "10rem", transition: { duration: 0.7, ease: "easeInOut" } }),
        contentControls.start({ opacity: 0, y: -20, transition: { duration: 0.5 } }),
      ]);

      // 2️⃣ Move navbar + SVG down
      await Promise.all([
        navbarControls.start({ y: "100vh", transition: { duration: 1, ease: "easeInOut" } }),
        svgControls.start({ y: "-20%", transition: { duration: 1, ease: "easeInOut" } }),
      ]);

      // 3️⃣ Show Buy Content and arrow
      buyContentControls.start({ opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.3 } });
      arrowControls.start({ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.5 } });

      setShowShape(true);
    }
  };

  const handleArrowClick = async () => {
    await arrowControls.start({ opacity: 0, y: 20, transition: { duration: 0.3 } });
    await buyContentControls.start({ opacity: 0, y: -20, transition: { duration: 0.3 } });

    await Promise.all([
      navbarControls.start({ y: 0, transition: { duration: 1, ease: "easeInOut" } }),
      svgControls.start({ y: "-175%", transition: { duration: 1.5, ease: "easeInOut" } }),
    ]);

    await Promise.all([
      navbarControls.start({ maxWidth: "72rem", transition: { duration: 0.7, ease: "easeInOut" } }),
      contentControls.start({ opacity: 1, y: 0, transition: { duration: 0.5 } }),
    ]);

    setShowShape(false);
  };

  return (
    <nav
  className={`fixed top-0 left-0 w-full overflow-hidden z-50 transition-all duration-700
    ${showShape ? "h-screen pointer-events-auto" : "h-20 pointer-events-none"}`}
>

      {/* SVG Shape */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[90%] pointer-events-none"
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

        {/* Buy Content inside SVG */}
<AnimatePresence>
  {showShape && (
    <motion.div
      className="absolute top-[20%] left-1/2 -translate-x-1/2 w-full max-w-7xl px-6 text-black z-400"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.7 } }}
      exit={{ opacity: 0, y: -20, transition: { duration: 0.5 } }}
    >
            {/* iPhone Image */}
            <div className="flex justify-center mb-6">
            
            </div>

            {/* Phone Info */}
            <div className=" max-w-7xl flex flex-col justify-center items-center  p-6 rounded-2xl space-y-2 bg-white">
                <h1 className="text-4xl ">iPhone 17 Pro</h1>
              <Image
                src="/img/BuyImages/buyImg2.png"
                alt="iPhone 17 Pro"
                width={700}
                height={700}
                className=" "
              />
           

               <p className="text-xl font-semibold">From $1099 or $45.79/mo. for 24 mo.*</p>
              <p className="text-sm opacity-90">
                Innovative design for ultimate performance and battery life.
              </p>
             
    <button
      onClick={() => window.location.href = "/buy"} // change this route as needed
      className="px-6 py-2 rounded-full font-semibold text-white mt-2 z-250
      bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400
      bg-[length:200%_200%] bg-gradient-animate
      shadow-[0_0_15px_2px_rgba(255,140,0,0.4)]
      hover:shadow-[0_0_20px_4px_rgba(255,140,0,0.6)]
      hover:scale-105 
      transition-all duration-300
       backdrop-blur-md"
    >
      Buy Now
    </button>
          
                {/* Small Images */}
               
          
                
   
         

<div className="flex flex-row justify-center gap-4 mt-6">
  {/* Each part takes equal width */}
  {[
    { img: null, mainTitle: '6.9″ or 6.3″', desc: 'Super Retina XDR display' },
    { img: '/img/BuyImages/iphone_17_promax_camera__.png', title: '48MP Pro Fusion camera system' },
    { img: '/img/BuyImages/chip_a19pro.png', title: 'A19 Pro chip with 6‑core GPU and Neural Accelerators' },
    { img: '/img/BuyImages/battery_.png', title: 'Up to 39 hours video playback' },
    { img: '/img/BuyImages/apple_intelligence.png', title: 'Apple Intelligence2' },
  ].map((item, index) => (
    <div key={index} className="flex-1 flex flex-col items-center text-center px-2">
      {item.img && (
        <Image
          src={item.img}
          alt={item.title}
          width={50}
          height={50}
          className="rounded-xl mb-2"
        />
      )}
       <p className="text-2xl font-bold">{item.mainTitle}</p>
      <p className="text-sm font-semibold">{item.title}</p>
      {item.desc && <p className="text-xs ">{item.desc}</p>}
    </div>
  ))}
</div>
 
                
                            

<p className="max-w-5xl mt-5 opacity-80 text-center text-sm hidden lg:block">
  The iPhone 17 Pro features a durable forged aluminum body, Ceramic Shield 2 for enhanced protection, and the powerful A19 Pro chip. Its 48MP Pro Fusion camera offers 8x optical-quality zoom and Dual Capture video, while Apple Intelligence tools make every experience smarter.
</p>



        
            </div>
          </motion.div>
        )}</AnimatePresence>
      </motion.div>

      {/* Navbar */}
      <motion.div
        className="relative z-50 mx-auto w-full flex justify-center"
        animate={navbarControls}
        initial={{ maxWidth: "72rem", y: 0 }}
      >
        <motion.div
          className="flex items-center justify-between mt-2 h-10 backdrop-blur-xl
            bg-white/5 rounded-4xl p-7 lg:px-10 border border-white/20 shadow-2xl w-full"
          animate={{ justifyContent: showShape ? "center" : "space-between" }}
        >
          {/* Navbar content */}
          <motion.div animate={contentControls} className="flex items-center space-x-4 ml-4 w-full justify-between">
            {!showShape && (
              <>
                <span className="font-extrabold text-2xl drop-shadow-[0_0_12px_rgba(255,255,255,0.4)] transition-all duration-500 bg-white/90 bg-clip-text text-transparent">
                  iPhone 17 Pro
                </span>
                <div className="md:flex gap-5">
                  
                   <button
                    onClick={handleBuyClick}
                    className="hidden md:flex px-5 py-1 border-2 font-bold border-white/70 text-white rounded-full 
                    hover:bg-white hover:text-black 
                    hover:shadow-[0_0_20px_2px_rgba(255,255,255,0.3)] 
                    transition-all duration-300"
                  >
                    Explore
                     </button>
                  
                  <a
                     href="#explore"
                    className="relative px-5 py-1 rounded-full text-white font-semibold 
                    bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400
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
{/* Arrow & Buy Buttons (visible when expanded) */}
{showShape && (
  <motion.div
    animate={arrowControls}
    initial={{ opacity: 1, y: 20 }}
    className="absolute left-1/2 bottom-25.5 -translate-x-1/2 flex flex-col items-center gap-5 z-50"
  >
    <motion.button
      onClick={handleArrowClick}
      className="py-4 rounded-full px-[5rem] bg-white shadow-2xl
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
