"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function ProductSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRefs = useRef<SVGPathElement[]>([]);
  const colorImageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const paths = lineRefs.current;
    if (!paths.length) return;

    // Setup initial dash animation
    paths.forEach((path) => {
      const length = path.getTotalLength();
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
        stroke: "white",
      });
    });

    // Timeline for scroll animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        scroller: document.querySelector("#swipeUpContent") || undefined,
        start: "top top",
      end: () => "+=" + section.offsetHeight,

        scrub: true,
        pin: true,
        pinSpacing: true,
      },
    });

    // Animate paths
    paths.forEach((path, i) => {
      tl.to(
        path,
        { strokeDashoffset: 0, stroke: "#FF690F", duration: 1.5, ease: "none" },
        i === 0 ? 0 : "<0.1"
      );
    });

    // Animate color image
    if (colorImageRef.current) {
      gsap.set(colorImageRef.current, { opacity: 0 });
      tl.to(colorImageRef.current, { opacity: 1, duration: 1 }, 0);
    }

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  const leftPaths = [
    "M1100,350 H950 L900,400 V400 H800 L700,400",
    "M1100,380 H950 L900,430 V430 H800 L700,430",
    "M1100,410 H950 L900,460 V460 H800 L700,460",
    "M1100,440 H950 L900,490 V490 H800 L700,490",
  ];

  const rightPaths = [
    "M-150,150 H-50 L-10,200 V200 H100 L150,250 L250,350",
    "M-170,170 H-70 L-30,220 V220 H80 L150,290 L290,420",
    "M-190,190 H-80 L-40,240 V240 H60 L150,330 L330,500",
  ];

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col items-center justify-start min-h-[100vh] bg-black text-white px-6"
    >
      {/* Title & Description */}
      <div className="flex flex-col items-center text-center pt-56 mb-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          iPhone 17 Pro Max
        </h1>
        <p className="max-w-2xl text-lg md:text-xl text-gray-300">
          Introducing iPhone 17 Pro and iPhone 17 Pro Max, designed from the inside
          out to be the most powerful iPhone models ever made.
        </p>
      </div>

      {/* Images + Circuit */}
      <div className="relative flex items-center justify-center pt-20">
        <Image
          src="/img/iphonehalfSketch.png"
          alt="iPhone Sketch"
          width={600}
          height={600}
          className="relative z-20"
        />
        <Image
          src="/img/iphonehalf.png"
          alt="iPhone Colored"
          width={600}
          height={600}
          ref={colorImageRef}
          className="absolute bottom-0 left-0 z-30 drop-shadow-[0_0_15px_rgba(255,255,255,0.6)]"
        />

        <svg className="absolute w-[1300px] h-[1000px] z-10" viewBox="0 0 1000 1000">
  {/* LEFT CIRCUIT */}
  {leftPaths.map((d, i) => (
    <g key={`left-${i}`}>
      <path d={d} stroke="#444" strokeWidth="2" fill="none" />
      <path
        ref={(el) => {
          if (el && !lineRefs.current.includes(el)) {
            lineRefs.current.push(el);
          }
        }}
        d={d}
        stroke="white"
        strokeWidth={5}
        fill="none"
        strokeLinejoin="round"
        style={{ filter: "drop-shadow(0px 0px 6px white)" }}
      />
    </g>
  ))}

  {/* RIGHT CIRCUIT */}
  {rightPaths.map((d, i) => (
    <g key={`right-${i}`}>
      <path d={d} stroke="#444" strokeWidth="2" fill="none" />
      <path
        ref={(el) => {
          if (el && !lineRefs.current.includes(el)) {
            lineRefs.current.push(el);
          }
        }}
        d={d}
        stroke="white"
        strokeWidth={5}
        fill="none"
        strokeLinejoin="round"
        style={{ filter: "drop-shadow(0px 0px 6px white)" }}
      />
    </g>
  ))}
</svg>

      </div>
    </section>
  );
}
