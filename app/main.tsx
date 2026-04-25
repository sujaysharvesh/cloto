"use client";

import Image from "next/image";

export default function Main() {
  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image - Full coverage */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/main.jpg"
          alt="Background"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        //   quality={75}        
        />
      </div>

      {/* Dark overlay for better text readability (optional) */}
      <div className="absolute inset-0 z-10 " />

      {/* Text Content - Centered on top of image */}
      <div className="relative z-20 text-center px-4 sm:px-6 md:px-8 max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white mb-4 drop-shadow-lg tracking-wide">
          Elevated, Naturally
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
          Softer, more sustainable, and easier care (hello vacation!), hemp does it better than linen.
        </p>
        <button className="bg-transparent border-2 border-white text-white px-8 py-3 sm:px-10 sm:py-3 md:px-12 md:py-4 text-sm sm:text-base uppercase tracking-wider font-medium hover:bg-white hover:text-gray-900 transition-all duration-300">
          SHOP TAJ HEMP
        </button>
      </div>
    </div>
  );
}