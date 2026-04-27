"use client";

import React from "react";

interface CardProps {
  section: string;
  description: string;
  buttonText?: string;
  productImage?: string;
}

export default function Card({
  section,
  description,
  buttonText = "SHOP NOW",
  productImage,
}: CardProps) {
  return (
    <div className="group relative h-[420px] overflow-hidden rounded-md cursor-pointer">
      
      {/* Background Image */}
      {productImage && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${productImage})`,
          }}
        />
      )}

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-end p-8 text-white">
        
        {/* Small Label */}
        <span className="mb-3 text-xs uppercase tracking-[0.25em] text-white/80">
          NEW COLLECTION
        </span>

        {/* Main Heading */}
        <h2
          className="max-w-[90%] text-2xl leading-none font-bold mb-4"
          style={{
            fontFamily: "Georgia, serif",
          }}
        >
          {section}
        </h2>

        {/* Short Description */}
        <p className="max-w-[85%] text-sm leading-relaxed text-white/85 mb-6">
          {description}
        </p>

        {/* CTA */}
        <button 
  className="relative w-fit text-sm uppercase tracking-wider transition after:absolute after:bottom-[-4px] after:left-0 after:h-px after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
>
  {buttonText}
</button>
      </div>
    </div>
  );
}