"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

export default function Trend() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Responsive height based on screen size
  const getImageHeight = () => {
    if (isMobile) return "500px";
    if (isTablet) return "600px";
    return "780px";
  };

  // Responsive heading size
  const getHeadingSize = () => {
    if (isMobile) return "36px";
    if (isTablet) return "44px";
    return "52px";
  };

  // Responsive title size
  const getTitleSize = () => {
    if (isMobile) return "28px";
    if (isTablet) return "38px";
    return "48px";
  };

  return (
    <section className="w-full" style={{ background: "#faf8f5" }}>
      <div className="py-12 md:py-24">
        <div className="mx-auto px-4 md:px-8">

          {/* TOP LABELS */}
          <div
            className="flex items-center justify-between pb-4 mb-8 md:mb-16"
            style={{ borderBottom: "1px solid #ece7df" }}
          >
            <span
              className="text-[10px] md:text-[11px] uppercase tracking-[0.12em]"
              style={{ color: "#b0a89e" }}
            >
              Collections
            </span>
            <span
              className="text-[10px] md:text-[11px] uppercase tracking-[0.12em]"
              style={{ color: "#b0a89e" }}
            >
              Season 2025
            </span>
          </div>

          {/* HEADING */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-14">
            <h2
              className="text-[28px] md:text-[38px] lg:text-[48px] leading-[1.2] md:leading-[1.05] tracking-[-0.02em] md:tracking-[-0.03em] font-semibold max-w-[560px]"
              style={{ color: "#1a1a1a", fontFamily: "Georgia, serif" }}
            >
              Discover styles made for every moment.
            </h2>

            <p
              className="text-[14px] md:text-[15px] font-light max-w-[560px] md:max-w-[280px] text-left md:text-right leading-relaxed"
              style={{ color: "#8a847c" }}
            >
              Curated collections designed for comfort, confidence, and everyday expression.
            </p>
          </div>

          {/* IMAGE GRID */}
          <div className="flex flex-col md:grid md:grid-cols-2 gap-4">
            {/* WOMEN */}
            <div
              className="relative overflow-hidden group cursor-pointer w-full"
              style={{ height: getImageHeight() }}
            >
              <Image
                src="/pants.png"
                alt="Women's Collection"
                fill
                className="object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.04]"
              />

              {/* overlay */}
              <div
                className="absolute inset-0 transition-colors duration-500"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.05) 55%)" }}
              />

              {/* hover tint */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />

              {/* CONTENT */}
              <div className="absolute bottom-6 left-4 md:bottom-10 md:left-10 z-10 right-4 md:right-auto">
                <p
                  className="text-[10px] md:text-[11px] uppercase tracking-[0.14em] mb-2 md:mb-3"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                >
                  the right amount of
                </p>
                <h3
                  className="text-white mb-4 md:mb-7"
                  style={{
                    fontSize: getHeadingSize(),
                    fontFamily: "Georgia, serif",
                    lineHeight: "1",
                    letterSpacing: "-0.03em",
                  }}
                >
                  Women
                </h3>
                <button
                  className="flex items-center gap-2 md:gap-3 px-5 md:px-7 py-3 md:py-[14px] text-[11px] md:text-[13px] uppercase tracking-[0.12em] font-medium transition-all duration-300 hover:gap-3 md:hover:gap-5 bg-white/95 hover:bg-white text-[#1a1a1a] rounded-full w-full md:w-auto justify-center md:justify-start"
                >
                  Shop Collection
                  <ArrowRight size={isMobile ? 13 : 15} />
                </button>
              </div>
            </div>

            {/* MEN */}
            <div
              className="relative overflow-hidden group cursor-pointer w-full"
              style={{ height: getImageHeight() }}
            >
              <Image
                src="/shirt.png"
                alt="Men's Collection"
                fill
                className="object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.04]"
              />

              <div
                className="absolute inset-0 transition-colors duration-500"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.05) 55%)" }}
              />

              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />

              {/* CONTENT */}
              <div className="absolute bottom-6 left-4 md:bottom-10 md:left-10 z-10 right-4 md:right-auto">
                <p
                  className="text-[10px] md:text-[11px] uppercase tracking-[0.14em] mb-2 md:mb-3"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                >
                  the right amount of
                </p>
                <h3
                  className="text-white mb-4 md:mb-7"
                  style={{
                    fontSize: getHeadingSize(),
                    fontFamily: "Georgia, serif",
                    lineHeight: "1",
                    letterSpacing: "-0.03em",
                  }}
                >
                  Men
                </h3>
                <button
                  className="flex items-center gap-2 md:gap-3 px-5 md:px-7 py-3 md:py-[14px] text-[11px] md:text-[13px] uppercase tracking-[0.12em] font-medium transition-all duration-300 hover:gap-3 md:hover:gap-5 bg-white/95 hover:bg-white text-[#1a1a1a] rounded-full w-full md:w-auto justify-center md:justify-start"
                >
                  Shop Collection
                  <ArrowRight size={isMobile ? 13 : 15} />
                </button>
              </div>
            </div>
          </div>

          {/* BOTTOM LINK */}
          <div className="flex justify-center mt-8 md:mt-10">
            <button
              className="flex items-center gap-2 text-[12px] md:text-[13px] uppercase tracking-[0.12em] font-medium transition-all duration-300 hover:gap-3"
              style={{ color: "#e05a3a", background: "none", border: "none", cursor: "pointer" }}
            >
              View All Collections
              <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}