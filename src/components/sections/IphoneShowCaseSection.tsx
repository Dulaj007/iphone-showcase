"use client";

import BottleCanvas from "../3d/BottleCanvas";

export default function IphoneShowcaseSection() {
  return (
    <section className="w-full py-20 bg-gray-900 flex flex-col items-center justify-center">
      <h2 className="text-4xl font-bold mb-10">3D iPhone Showcase</h2>
      <BottleCanvas />
    </section>
  );
}
