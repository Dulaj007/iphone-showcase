// components/BatteryLifeSection.tsx
"use client";

import React from "react";
import Image from "next/image";

/** 
 * BatteryLifeSection Component
 * --------------------------------------------------
 * This section highlights the battery life and fast charging 
 * capabilities of the iPhone 17 series. It contains a hero 
 * background image with key text features at the top and 
 * detailed stats at the bottom. All colors use CSS variables 
 * for consistent theming and dark/light mode support.
 */
export default function BatteryLifeSection() {
  return (
    <section className="relative bg-[var(--color-black)] text-[var(--color-white)]">
      {/* Top Section with Image */}
      <section className="relative w-full h-[400px] md:h-[700px] lg:h-screen flex items-start justify-center md:justify-start">
        <Image
          src="/img/batterySection.jpg"
          alt="Battery Section Background"
          fill
          className="object-cover"
          priority
        />

        {/* Text Content */}
        <div className="relative z-10 max-w-4xl px-6 mt-10 md:mt-24 text-left lg:translate-x-[12%] xl:translate-x-[18%]">
          <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Battery life. 
            All-time high.
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[var(--color-text-muted)] leading-relaxed max-w-2xl">
            The new internal design creates significant additional room for battery capacity,
            giving iPhone 17 Pro Max the best-ever iPhone battery life, and up to 4 more hours per
            full charge compared to iPhone 15 Pro Max. From extended video playback to after-hours
            work, it’s always ready for overtime.
          </p>
        </div>
      </section>

      {/* Bottom Stats Section */}
      <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start justify-center text-center md:text-left gap-10 md:gap-20 py-12 px-6 md:px-20 md:-translate-x-[4%] lg:-translate-x-[8%]">
        {/* iPhone 17 Pro */}
        <div className="flex flex-col items-center md:items-start">
          <p className="text-sm text-[var(--color-text-muted)] mb-1">Up to</p>
          <h3 className="text-3xl sm:text-4xl md:text-4xl font-bold text-[var(--color-orange)]">
            33 hours
          </h3>
          <p className="text-sm sm:text-base md:text-lg mt-2 text-[var(--color-text-muted)]">
            video playback on <br /> iPhone 17 Pro
          </p>
        </div>

        {/* iPhone 17 Pro Max */}
        <div className="flex flex-col items-center md:items-start">
          <p className="text-sm text-[var(--color-text-muted)] mb-1">Up to</p>
          <h3 className="text-3xl sm:text-4xl md:text-4xl font-bold text-[var(--color-orange)]">
            39 hours
          </h3>
          <p className="text-sm sm:text-base md:text-lg mt-2 text-[var(--color-text-muted)]">
            video playback on <br /> iPhone 17 Pro Max
          </p>
        </div>

        {/* Charging */}
        <div className="flex flex-col items-center md:items-start">
          <p className="text-sm text-[var(--color-text-muted)] mb-1">Up to</p>
          <h3 className="text-3xl sm:text-4xl md:text-4xl font-bold text-[var(--color-orange)]">
            50% charge <br /> in 20 minutes
          </h3>
          <p className="text-sm sm:text-base md:text-lg mt-2 text-[var(--color-text-muted)]">
            with high-wattage <br /> power adapter
          </p>
        </div>
      </div>
    </section>
  );
}
