"use client";

import { useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Stats from "stats.js";
import HeroCanvas from "@/components/3d/HeroCanvas";
import GlowHeroSection from "@/components/sections/GlowHeroSection";
import IntroductionSection from "@/components/sections/IntroductionSection";

import ScrollVideoSection from "@/components/sections/ScrollVideoSection";
import MainCameraSection from "@/components/sections/MainCameraSection";
import VideoQualitySection from "@/components/sections/VideoQualitySection";
import VideoQualityMobileSection from "@/components/sections/VideoQualityMobileSection";


// ✅ Lazy-loaded heavy components
const PhoneAnimation = dynamic(() => import("@/components/3d/HeroCanvas"), { ssr: false });
const TestSection = dynamic(() => import("@/components/sections/GlowHeroSection"));
const IntroSection = dynamic(() => import("@/components/sections/IntroductionSection"));
const IntroducingSection = dynamic(() => import("@/components/sections/introducingSection"));
const ProductFeatures = dynamic(() => import("@/components/sections/productFeatures"));
const HighlightsSection = dynamic(() => import("@/components/sections/HighlightsSection"));
const CameraVideoSection = dynamic(() => import("@/components/sections/ScrollVideoSection"));
const CameraVideoInfoSection = dynamic(() => import("@/components/sections/VideoQualitySection"));
const SelfieCameraSection = dynamic(() => import("@/components/sections/SelfieCameraSection"));
const BatteryLifeSection = dynamic(() => import("@/components/sections/BatteryLifeSection"));
const PerformanceCompareSection = dynamic(() => import("@/components/sections/PerformanceCompareSection"));
const Starfield = dynamic(() => import("@/components/bg/Starfield"), { ssr: false });
const CameraResSection = dynamic(() => import("@/components/sections/CameraResSection"));
const NormalCarouselCameraSection = dynamic(() => import("@/components/sections/NormalCarouselCameraSection"));
const CloserLook = dynamic(() => import("@/components/3d/CloserLook"), { ssr: false });
const CameraShowSection = dynamic(() => import("@/components/sections/MainCameraSection"));
const ShapePage = dynamic(() => import("@/components/sections/ShapePage"));

// ✅ Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const statsRef = useRef<Stats | null>(null);

  // 🧠 Smooth scrolling with Lenis + ScrollTrigger sync
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.3,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      lerp: 0.1,
    });

    // RAF loop for Lenis + ScrollTrigger
    function raf(time: number) {
      lenis.raf(time);
      ScrollTrigger.update(); // keep GSAP synced with Lenis
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // ✅ Connect Lenis scroll to ScrollTrigger
    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value?: number) {
        if (typeof value === "number") {
          lenis.scrollTo(value);
        } else {
          return lenis.scroll?.value ?? window.scrollY;
        }
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    ScrollTrigger.addEventListener("refresh", () => lenis.resize());
    ScrollTrigger.refresh();

    (window as any).lenis = lenis; // optional for debugging

    return () => {
      lenis.destroy();
      ScrollTrigger.killAll(); // clean up all GSAP triggers
    };
  }, []);

  // 🎮 FPS meter (Stats.js)
  useEffect(() => {
    const stats = new Stats();
    stats.showPanel(0);
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

  // 🧩 Page layout
  return (
    <main className="relative">
      {/* 🌌 Global Starfield background */}
      <Starfield />

      {/* 🛰️ HERO 3D Section */}
      <section id="hero" className="relative w-full h-[100vh] hidden md:block">
        <HeroCanvas />
      </section>

      {/* 🌠 Mobile Hero fallback */}
      <section className="md:hidden">
        <GlowHeroSection />
      </section>

      {/* 🧭 Sections */}
      <section className="w-full bg-transparent z-10 hidden sm:block">
        <IntroductionSection />
      </section>

      <section className="bg-transparent">
        <HighlightsSection />
      </section>


      <section  >
        <MainCameraSection />
      </section>
  
      <section className="hidden lg:block" >
        <VideoQualitySection />
      </section>
       <section className="block lg:hidden" >
        <VideoQualityMobileSection />
      </section>

        <section>
        <NormalCarouselCameraSection />
      </section>
         <section>
        <CameraResSection />
      </section>
         <section>
        <SelfieCameraSection />
      </section>
   

      <section className="bg-transparent">
        <BatteryLifeSection />
      </section>

    

      <section  className="relative w-full h-[100vh] bg-black"> </section>
      
     



       <section>
        <ScrollVideoSection />
      </section>

    

      <section>
        <CloserLook />
      </section>

   

      <section>
        <PerformanceCompareSection />
      </section>
    </main>
  );
}
