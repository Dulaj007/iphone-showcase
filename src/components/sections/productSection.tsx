"use client";

export default function ProductSection() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 bg-gray-800">
      <h2 className="text-4xl font-bold mb-8">Our Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-6xl">
        <div className="bg-gray-900 p-6 rounded-xl shadow-md text-center">Product 1</div>
        <div className="bg-gray-900 p-6 rounded-xl shadow-md text-center">Product 2</div>
        <div className="bg-gray-900 p-6 rounded-xl shadow-md text-center">Product 3</div>
      </div>
    </section>
  );
}
