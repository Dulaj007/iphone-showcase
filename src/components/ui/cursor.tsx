"use client";

import { useEffect, useRef } from "react";

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const radius = 100;

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const moveCursor = (e: MouseEvent) => {
      cursor.style.opacity = "1";
      cursor.style.transform = `translate(${e.clientX - radius}px, ${e.clientY - radius}px)`;
    };

    const checkHoverTargets = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("nav") || target.closest("footer")) {
        cursor.style.opacity = "0"; // hide over navbar/footer
      } else {
        cursor.style.opacity = "1";
      }
    };

    document.addEventListener("mousemove", moveCursor);
    document.addEventListener("mousemove", checkHoverTargets);

    return () => {
      document.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mousemove", checkHoverTargets);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-[200px] h-[200px] bg-white/5 rounded-full pointer-events-none blur-[50px] z-[999] opacity-0 transition-opacity duration-300 will-change-transform"
    ></div>
  );
}
