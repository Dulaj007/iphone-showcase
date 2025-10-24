/**
 * VideoQualityMobileSection Component
 * --------------------------------------------------
 * A responsive mobile focused section showcasing professional
 * video capabilities with automatic playback behavior.
 * Plays the video only when in view, and freezes on the final frame.
 * Can be used in desktop screens as well if there is any failure in desktop component
 */

import { useEffect, useRef, useState } from "react";

export default function VideoQualityMobileSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0];
      setIsInView(entry.isIntersecting);
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.9, // Trigger when 90% of section is visible
    }); 

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isInView) {
      video.currentTime = 0; // Start from beginning
      video.play();
    } else {
      video.pause();
    }

    const handleEnded = () => {
      // Freeze on last frame
      video.pause();
    };

    video.addEventListener("ended", handleEnded);
    return () => {
      video.removeEventListener("ended", handleEnded);
    };
  }, [isInView]);

  return (
    <section
      ref={sectionRef}
      className="py-16 relative px-4 md:px-12 bg-[var(--color-black)] text-[var(--color-white)]"
    >
      <div className="flex flex-col items-center">
        {/* Section Heading */}
        <div className="text-center mb-6">
          <p className="text-lg sm:text-xl font-bold opacity-90 text-[var(--color-primary-light)]">
            Pro video
          </p>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mt-2 text-[var(--color-white)]">
            Any more pro and <br /> it would need an agent.
          </h2>
        </div>

        {/* Video Section */}
        <video
          ref={videoRef}
          src="/vid/autoplaVid01.mp4"
          muted
          playsInline
          preload="auto"
          className="w-full h-auto object-cover mb-6 rounded-lg border border-[var(--color-bg-secondary)]"
        />

        {/* Description Text */}
        <div className="text-center max-w-3xl">
          <p className="text-sm sm:text-base md:text-lg leading-relaxed opacity-90 text-[var(--color-text-muted)]">
            From home movies to Hollywood productions, iPhone 17 Pro is up to any
            challenge. With more pro video features than ever — like enhanced video
            stabilization, cinema-grade specs, and compatibility with
            industry-standard workflows — iPhone 17 Pro puts powerful filmmaking
            tools within reach, wherever you need them.
          </p>
        </div>
      </div>
    </section>
  );
}
