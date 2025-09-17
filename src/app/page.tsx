"use client";
import { useState } from "react";
import HeroSection from "@/components/sections/heroSection";
import ProductSection from "@/components/sections/productSection";
import SwipeUpPanel from "@/components/wrappers/SwipeUpPanel";

import IphoneShowCaseSection from "@/components/sections/IphoneShowCaseSection";

export default function HomePage() {
  const [showWrapper, setShowWrapper] = useState(false);
  const [isSwipedUp, setIsSwipedUp] = useState(false); // ✅ new state

  return (
    <>
      <HeroSection setShowWrapper={setShowWrapper} isSwipedUp={isSwipedUp} />

      {/* AnimatePresence handles smooth in/out */}
      {showWrapper && (
        <SwipeUpPanel
          onOpen={() => setIsSwipedUp(true)}   // ✅ tell HeroSection swipe up
          onClose={() => setIsSwipedUp(false)} // ✅ tell HeroSection swipe down
        >
          <ProductSection />
          <IphoneShowCaseSection />
        </SwipeUpPanel>
      )}
    </>
  );
}
