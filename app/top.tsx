"use client";

import { useEffect, useRef } from "react";

export default function Top() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let scrollPos = 0;

    const scroll = () => {
      if (!scrollContainer) return;
      // Move left by 1px per frame
      scrollPos -= 1;
      // Reset position when the first set of items has fully scrolled
      if (Math.abs(scrollPos) >= scrollContainer.scrollWidth / 2) {
        scrollPos = 0;
      }
      scrollContainer.style.transform = `translateX(${scrollPos}px)`;
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className="w-full bg-[#1a1a1a] text-white py-3 overflow-hidden whitespace-nowrap text-sm font-light">
      <div
        ref={scrollRef}
        className="inline-flex items-center gap-8"
      >
        {/* Duplicate the content to create a seamless loop */}
        <div className="flex items-center gap-8">
          <span>• RDER" for free shipping</span>
          <span>• bundle & save up to 20%</span>
          <span>• use code "FIRSTORDER" for free shipping</span>
          <span>• bundle & save up to 20%</span>
          <span>• use code "FIRSTORDE" for free shipping</span>
          <span>• bundle & save up to 20%</span>
        </div>
        <div className="flex items-center gap-8" aria-hidden="true">
          <span>• RDER" for free shipping</span>
          <span>• bundle & save up to 20%</span>
          <span>• use code "FIRSTORDER" for free shipping</span>
          <span>• bundle & save up to 20%</span>
          <span>• use code "FIRSTORDE" for free shipping</span>
          <span>• bundle & save up to 20%</span>
        </div>
      </div>
    </div>
  );
}