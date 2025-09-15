"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-transparent fixed top-0 left-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-white font-bold text-xl">
            iPhone 17
          </Link>

          {/* Menu */}
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="text-gray-300 hover:text-white transition">
           
            </Link>
            <Link href="#products" className="text-gray-300 hover:text-white transition">
           
            </Link>
            <Link href="#contact" className="text-gray-300 hover:text-white transition">
           
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
