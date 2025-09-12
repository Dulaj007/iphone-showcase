// src/app/error.tsx
"use client"; // required for error boundaries in Next.js

import { useEffect } from "react";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Homepage error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 text-red-900 p-8">
      <h1 className="text-4xl font-bold mb-4">Something went wrong!</h1>
      <p className="mb-6 text-center">
        {error.message || "An unexpected error occurred on the homepage."}
      </p>
      <button
        className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        onClick={() => reset()}
      >
        Try Again
      </button>
    </div>
  );
}
