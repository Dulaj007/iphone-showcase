"use client";

export default function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-5xl font-bold mb-4">Welcome to the iPhone 17 Showcase</h1>
      <p className="text-lg text-gray-300 mb-8">
        Experience the next generation iPhone in stunning 3D.
      </p>
      <div className="flex gap-4">
        <button className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 transition">
          Learn More
        </button>
        <button className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 transition">
          Get Started
        </button>
      </div>
    </section>
  );
}
