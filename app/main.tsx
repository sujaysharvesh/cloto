"use client";

import Image from "next/image";

export default function Main() {
  return (
    <div className="px-[6px] bg-white">
      <div className="relative h-screen overflow-hidden rounded-[px]">

        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/main.jpg"
            alt="Background"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/20 z-10" />

        {/* Content */}
        <div className="relative z-20 h-full flex items-end">

          {/* LEFT BOTTOM TEXT */}
          <div className="pb-16 pl-10 sm:pl-16 md:pl-20 max-w-3xl">

            {/* Small Label */}
            <p className="text-white/80 uppercase tracking-[0.35em] text-xs sm:text-sm mb-5">
              NEW COLLECTION
            </p>

            {/* Main Heading */}
            <h1
              className="text-white leading-[0.92] mb-6 text-5xl sm:text-6xl md:text-7xl lg:text-[92px]"
              style={{
                fontFamily: "Georgia, serif",
                fontWeight: 600,
              }}
            >
              Elevated,
              <br />
              Naturally
            </h1>

            {/* Description */}
            <p className="text-white/85 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl mb-8">
              Softer, more sustainable, and effortlessly refined —
              designed for everyday comfort with timeless silhouettes
              inspired by modern coastal living.
            </p>

            {/* CTA */}
            <button className="border border-white text-white px-8 py-4 text-sm uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-300">
              SHOP COLLECTION
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}