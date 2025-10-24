"use client";

import { useEffect, useRef, useState } from "react";

/**
 * VideoQualitySection Component
 * --------------------------------------------------
 * A cinematic scroll section highlighting iPhone 17 Pro Video showcase
 * professional video capabilities. Includes smooth text fade out,
 * dynamic video scaling, and intelligent play/pause behavior
 * based on viewport visibility.
 * This will be used for desktop version
 */

export default function VideoQualitySection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const inView = rect.top < windowHeight * 0.8 && rect.bottom > windowHeight * 0.2;
      setIsInView(inView);

      const totalScrollable = rect.height - windowHeight;
      const scrollProgress = Math.min(Math.max(-rect.top / totalScrollable, 0), 1);
      setProgress(scrollProgress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isInView) {
      if (video.currentTime === video.duration || video.paused) {
        video.currentTime = 0;
        video.play();
      }
    } else {
      video.pause();
    }

    const handleEnded = () => {
      video.pause();
      video.currentTime = video.duration;
    };

    video.addEventListener("ended", handleEnded);
    return () => video.removeEventListener("ended", handleEnded);
  }, [isInView]);

  const scaleStart = 1.3;
  const scaleEnd = 0.5;
  const scale = scaleStart - (scaleStart - scaleEnd) * progress;

  // Fade out top text smoothly as scroll progresses (visible 0→0.3)
  const textOpacity = Math.max(1 - progress * 3, 0);

  return (
    <section
      ref={sectionRef}
      id="camera-show-section"
      className="relative h-[250vh] bg-[var(--color-black)] text-[var(--color-white)]"
    >
      {/* Sticky video container */}
      <div className="sticky pt-20 top-0 lg:h-[500] xl:h-[750] 2xl:h-[950] w-full flex flex-col items-center justify-center overflow-hidden">
        {/* Top Text Overlay (fades out as scroll progresses) */}
        <div
          className="absolute top-30 text-center z-10 text-[var(--color-white)]"
          style={{
            opacity: textOpacity,
            transition: "opacity 0.2s ease-out",
          }}
        >
          <p className="text-lg sm:text-xl font-bold opacity-90 text-[var(--color-orange)]">
            Pro video
          </p>
          <h2 className="text-2xl sm:text-4xl md:text-8xl font-bold mt-2 text-[var(--color-white)]">
            Any more pro and <br /> it would need an agent.
          </h2>
        </div>

        {/* Video */}
        <video
          ref={videoRef}
          src="/vid/autoplaVid01.mp4"
          muted
          playsInline
          preload="auto"
          className="w-full h-auto object-cover transition-transform duration-100 ease-out"
          style={{
            transform: `scale(${scale})`,
          }}
        />
      </div>

      {/* Bottom Text after scaling down */}
      <div className="absolute bottom-10 w-full text-center px-6 text-[var(--color-text-muted)]">
        <p className="text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed opacity-90">
          From home movies to Hollywood productions, iPhone 17 Pro is up to any
          challenge. With more pro video features than ever — like enhanced video
          stabilization, cinema-grade specs, and compatibility with
          industry-standard workflows — iPhone 17 Pro puts powerful filmmaking
          tools within reach, wherever you need them.
        </p>
      </div>
    </section>
  );
}
