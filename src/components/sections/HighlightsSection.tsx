"use client";

import { useState, useEffect, useRef } from "react";

/**
 * HighlightsSection (Responsive Carousel Component)
 * --------------------------------------------------
 * A fully responsive highlights carousel that supports both desktop and mobile slides.
 * - Desktop: mix of images and autoplay videos with fallbacks for mobile
 * - Mobile: images only (for performance)
 * - Autoplay only runs when carousel is visible on screen
 * - Includes navigation dots with progress bars and play/pause control (with sticky animation)
 * - Smooth text transitions and slide animations
 * - Supports clickable slides to navigate between adjacent slides
 * - IntersectionObserver triggers autoplay only when visible
 * ----------------------------------------------------
 */

// Slide interface: represents each carousel item
interface Slide {
  id: number;
  type: "image" | "video" | "color"; // type of slide
  src: string; // image/video source
  fallback?: string; // video fallback for mobile
  position: "top" | "bottom" | "center"; // text position
  content: string; // overlay text
  color?: string; // background color (optional)
}

// Desktop slides (mix of images and videos)
const desktopSlides: Slide[] = [
  {
    id: 1,
    type: "image",
    src: "/img/HighlightsSlideImg/slide1Img.jpg",
    position: "top",
    content: "Heat-forged aluminum unibody design for exceptional pro capability.",
  },
  {
    id: 2,
    type: "video",
    src: "/vid/HighlightsSlideVid/slide2vid.mp4",
    fallback: "/img/HighlightsSlideImg/slide2Img.jpg",
    position: "bottom",
    content: "A19 Pro, vapor cooled for lightning-fast performance. Breakthrough battery life.",
  },
  {
    id: 3,
    type: "video",
    src: "/vid/HighlightsSlideVid/slide3vid.mp4",
    fallback: "/img/HighlightsSlideImg/slide3Img.jpg",
    color: "bg-[var(--color-bg-secondary)]",
    position: "top",
    content: "The ultimate pro camera system. All 48MP Fusion rear cameras. And the longest zoom ever on an iPhone.",
  },
  {
    id: 4,
    type: "video",
    src: "/vid/HighlightsSlideVid/slide4vid.mp4",
    fallback: "/img/HighlightsSlideImg/slide4Img.jpg",
    color: "bg-[var(--color-bg-secondary)]",
    position: "top",
    content: "New Center Stage front camera. Flexible ways to frame your shot. Smarter group selfies. And so much more.",
  },
  {
    id: 5,
    type: "image",
    src: "/img/HighlightsSlideImg/slide5Img.jpg",
    color: "bg-[var(--color-bg-secondary)]",
    position: "top",
    content: "iOS 26. New look. Even more magic.",
  },
];

// Mobile slides: only images for simplicity/performance
const mobileSlides: Slide[] = [
  { id: 1, type: "image", src: "/img/HighlightsSlideImg/slide1ImgMB.jpg", position: "top", content: "Heat-forged aluminum unibody design for exceptional pro capability." },
  { id: 2, type: "image", src: "/img/HighlightsSlideImg/slide2ImgMB.jpg", position: "top", content: "A19 Pro, vapor cooled for lightning-fast performance." },
  { id: 3, type: "image", src: "/img/HighlightsSlideImg/slide3ImgMB.jpg", position: "top", content: "Ultimate pro camera system. All 48MP Fusion cameras." },
  { id: 4, type: "image", src: "/img/HighlightsSlideImg/slide4ImgMB.jpg", position: "top", content: "New Center Stage front camera. Smarter selfies." },
  { id: 5, type: "image", src: "/img/HighlightsSlideImg/slide5ImgMB.jpg", position: "top", content: "iOS 26. New look. Even more magic." },
];

export default function HighlightsSection() {
  // -------------------------
  // State
  // -------------------------
  const [current, setCurrent] = useState(0); // active slide
  const [isPlaying, setIsPlaying] = useState(false); // autoplay state
  const [progress, setProgress] = useState(0); // progress bar %
  const [videoEnded, setVideoEnded] = useState(false); // track video end
  const [isMobile, setIsMobile] = useState(false); // screen width detection
  const [textVisible, setTextVisible] = useState(true); // fade-in text
  const [isVisible, setIsVisible] = useState(false); // IntersectionObserver

  // -------------------------
  // Refs
  // -------------------------
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const slides = isMobile ? mobileSlides : desktopSlides;

  // -------------------------
  // Detect mobile resize
  // -------------------------
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // initialize
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // -------------------------
  // Intersection Observer: autoplay only when visible
  // -------------------------
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setIsPlaying(true); // start autoplay
        } else {
          setIsVisible(false);
          setIsPlaying(false); // pause when out of view
        }
      },
      { threshold: 0.3 }
    );

    if (carouselRef.current) observer.observe(carouselRef.current);
    return () => {
      if (carouselRef.current) observer.unobserve(carouselRef.current);
    };
  }, []);

  // -------------------------
  // Autoplay interval
  // -------------------------
  useEffect(() => {
    if (isPlaying && isVisible) {
      intervalRef.current = setInterval(() => {
        setCurrent((prev) => (prev + 1) % slides.length);
        setProgress(0);
        setVideoEnded(false);
      }, 30000); // 30s per slide
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, isVisible, slides.length]);

  // -------------------------
  // Progress animation
  // -------------------------
  useEffect(() => {
    let frame: number;
    let start: number | null = null;

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const percent = Math.min((elapsed / 30000) * 100, 100); // match interval
      setProgress(percent);
      if (percent < 100 && isPlaying && isVisible)
        frame = requestAnimationFrame(animate);
    };

    setProgress(0);
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [current, isPlaying, isVisible]);

  // -------------------------
  // Video control
  // -------------------------
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      if (index === current && slides[index].type === "video" && !isMobile) {
        video.currentTime = 0;
        video.play().catch(() => {}); // ignore autoplay errors
      } else {
        video.pause();
        video.currentTime = 0;
      }
    });

    // Quick text fade out/in for smooth transition
    setTextVisible(false);
    const timeout = setTimeout(() => setTextVisible(true), 100);
    return () => clearTimeout(timeout);
  }, [current, isMobile, slides]);

  // -------------------------
  // Go to slide manually
  // -------------------------
  const goToSlide = (index: number) => {
    setCurrent(index);
    setProgress(0);
    setVideoEnded(false);
  };

  // -------------------------
  // Render
  // -------------------------
  return (
    <div
      ref={carouselRef}
      className="relative w-full min-h-[70vh] sm:min-h-screen bg-[var(--color-bg-secondary)]"
    >
      {/* Title */}
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 pt-10">
        <h1 className="text-4xl sm:text-6xl font-extrabold text-[var(--color-white)] text-center sm:text-left">
          Get the highlights.
        </h1>
      </div>

      {/* Navigation dots */}
      <div className="sticky top-[90%] pb-2 z-50">
        <div className="relative left-1/2 -translate-x-1/2 flex justify-center items-center z-50 p-[10px]">
          <div className="flex gap-2 sm:gap-3 p-3 sm:p-5 backdrop-blur-sm bg-[var(--color-text-muted)]/20 rounded-4xl mx-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className={`relative h-2 rounded-full overflow-hidden transition-all duration-700 px-1 sm:px-2 ${
                  i === current
                    ? "w-10 sm:w-16 bg-[var(--color-white)]/70"
                    : "w-2 bg-[var(--color-white)]"
                }`}
              >
                {/* Progress bar */}
                {i === current && (
                  <span
                    className="absolute top-0 left-0 h-full bg-[var(--color-white)]"
                    style={{ width: `${progress}%` }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Play/Pause button */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-6 h-6 flex items-center justify-center rounded-full border border-transparent p-4 sm:p-6 backdrop-blur-sm bg-[var(--color-text-muted)]/20 text-[var(--color-text)] hover:bg-[var(--color-white)]/40 transition"
          >
            {isPlaying ? (
              <div className="flex gap-0.5 sm:gap-1">
                <span className="w-0.5 sm:w-1 h-3 sm:h-3 bg-[var(--color-text)]"></span>
                <span className="w-0.5 sm:w-1 h-3 sm:h-3 bg-[var(--color-text)]"></span>
              </div>
            ) : (
              <div className="ml-0.5 w-0 h-0 border-t-[5px] border-b-[5px] border-l-[8px] sm:border-t-[6px] sm:border-b-[6px] sm:border-l-[10px] border-t-transparent border-b-transparent border-l-[var(--color-text)]"></div>
            )}
          </button>
        </div>
      </div>

      {/* Slides */}
      <div className="relative overflow-hidden">
        <div
          className="flex items-center transition-transform duration-[900ms] ease-in-out z-20 pb-20"
          style={{
            transform: isMobile
              ? `translateX(calc(-${current * 95}vw + 2vw))`
              : `translateX(calc(-${current * 70}vw + 13vw))`,
          }}
        >
          {slides.map((slide, i) => (
            <div
              key={slide.id}
              onClick={() => {
                if (!isMobile) {
                  if (i === current + 1 || i === current - 1) {
                    setCurrent(i);
                    setProgress(0);
                    setVideoEnded(false);
                  }
                }
              }}
              className={`relative flex-shrink-0 cursor-pointer ${
                isMobile ? "w-[90vw] h-[70vh]" : "w-[70vw] h-[70vh]"
              } mx-2 sm:mx-4 rounded-3xl overflow-hidden flex items-center justify-center text-white text-2xl font-bold ${
                slide.color || "bg-[var(--color-bg-secondary)]"
              }`}
            >
              {/* Background media */}
              {slide.type === "image" && (
                <img
                  src={slide.src}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}
              {slide.type === "video" && (
                <>
                  {!isMobile && !videoEnded ? (
                    <video
                      ref={(el) => {
                        videoRefs.current[i] = el;
                      }}
                      src={slide.src}
                      muted
                      playsInline
                      onEnded={() => setVideoEnded(true)}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={slide.fallback}
                      alt="Fallback"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )}
                </>
              )}

              {/* Slide text */}
              <div
                className={`absolute text-center px-3 sm:px-6 text-[1rem] sm:text-[1.4rem] md:text-[1.8rem] font-semibold transition-all duration-700 ease-out transform ${
                  textVisible && i === current
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                } ${
                  slide.position === "top"
                    ? "top-10 px-6 sm:px-10 xl:px-60"
                    : slide.position === "bottom"
                    ? "bottom-6 sm:bottom-10 px-6 sm:px-10 xl:px-65"
                    : "inset-0 flex items-center justify-center"
                }`}
              >
                <p className="max-w-[95%] sm:max-w-[100%] text-[var(--color-white)] drop-shadow-[0_0_10px_rgba(0,0,0,0.6)] leading-snug sm:leading-normal">
                  {slide.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
