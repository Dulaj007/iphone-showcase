"use client";

import { useRef, useState, useEffect } from "react";
import PhoneAnimation from "@/components/3d/HeroCanvas";
import TestSection from "@/components/sections/GlowHeroSection";
import Stats from "stats.js";
import IntroSection from "@/components/sections/IntroductionSection";
import IntroducingSection from "@/components/sections/introducingSection";
import ProductFeatures from "@/components/sections/productFeatures";
import HighlightsSection from "@/components/sections/HighlightsSection";

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const shortSectionRef = useRef<HTMLDivElement | null>(null);
  const [showHeroCanvas, setShowHeroCanvas] = useState(true);
  const statsRef = useRef<Stats | null>(null);

  useEffect(() => {
    const stats = new Stats();
    stats.showPanel(0); // 0: fps
    stats.dom.style.position = "fixed";
    stats.dom.style.top = "0px";
    stats.dom.style.left = "0px";
    stats.dom.style.zIndex = "9999";
    document.body.appendChild(stats.dom);
    statsRef.current = stats;

    const animate = () => {
      stats.begin();
      stats.end();
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);

    return () => {
      document.body.removeChild(stats.dom);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!shortSectionRef.current) return;

      const shortSectionTop = shortSectionRef.current.getBoundingClientRect().top;

      if (shortSectionTop <= 0 && showHeroCanvas) {
        setShowHeroCanvas(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showHeroCanvas]);

  return (
    <main>
      <section
        ref={heroRef}
        id="hero"
        className="relative w-full h-[1000px] bg-black flex items-center justify-center"
      >
        {showHeroCanvas ? <PhoneAnimation /> : <TestSection />}
      </section>

      <section
        ref={shortSectionRef}
        className="w-full "
      >
<IntroSection/>
      </section>

      <section className="">
     <HighlightsSection/>
      </section>
      <div className="relative w-full h-64">
  <div className="absolute inset-0">
    <div className="w-full h-full backdrop-blur-md bg-white/10" style={{ WebkitMaskImage: 'url(#mask)', maskImage: 'url(#mask)', WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat', WebkitMaskSize: 'cover', maskSize: 'cover' }}></div>
  </div>

  <svg width="0" height="0">
    <defs>
      <mask id="mask" maskUnits="objectBoundingBox" maskContentUnits="objectBoundingBox">
        <path d="M0,0 H1 V0.6 Q0.5,1 0,0.6 Z" fill="white" />
      </mask>
    </defs>
  </svg>
</div>

    </main>
  );
}
