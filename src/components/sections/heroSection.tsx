"use client";
import HeroCanvas from "../3d/HeroCanvas";

export default function HeroSection({
  setShowWrapper,
  isSwipedUp,
}: {
  setShowWrapper: (val: boolean) => void;
  isSwipedUp: boolean;
}) {
  return (
    <section id="hero" className="relative w-full h-[1000px] bg-black">
      {/* Pass isSwipedUp down so HeroCanvas can disable animation */}
      <HeroCanvas setShowWrapper={setShowWrapper} isSwipedUp={isSwipedUp} />

      {/* Overlay text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white pointer-events-none">
        <h1 className="text-5xl font-bold"></h1>
        <p className="mt-4 text-lg text-gray-300"></p>
      </div>
    </section>
  );
}
