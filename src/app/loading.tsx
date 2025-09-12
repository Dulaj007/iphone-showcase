// src/app/loading.tsx
"use client";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-700 p-8">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin mb-6"></div>
      <h2 className="text-2xl font-semibold mb-2">Loading...</h2>
      <p className="text-center text-gray-500 max-w-sm">
        Please wait while we prepare your experience. It won’t take long.
      </p>
    </div>
  );
}
