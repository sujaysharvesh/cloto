"use client";

import { useState, useEffect } from "react";

export default function AboutSection() {
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

  // Responsive text size
  const getTextSize = () => {
    if (isMobile) return "13px";
    if (isTablet) return "14px";
    return "15px";
  };

  // Responsive max width for text
  const getMaxWidth = () => {
    if (isMobile) return "100%";
    if (isTablet) return "480px";
    return "580px";
  };

  // Responsive padding
  const getHorizontalPadding = () => {
    if (isMobile) return "20px";
    if (isTablet) return "32px";
    return "64px";
  };

  return (
    <section className="w-full relative min-h-screen overflow-hidden">

      {/* FULL SCREEN VIDEO */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/video.mp4" type="video/mp4" />
      </video>

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/40" />

      {/* CONTENT — left aligned over video */}
      <div 
        className="relative z-10 flex flex-col justify-between min-h-screen"
        style={{ 
          paddingLeft: getHorizontalPadding(),
          paddingRight: getHorizontalPadding(),
          paddingTop: isMobile ? "20px" : "56px",
          paddingBottom: isMobile ? "20px" : "56px",
        }}
      >

        {/* TOP LABELS */}
        <div className="flex items-center justify-between border-b border-white/20 pb-3 md:pb-4">
          <span 
            className="text-[11px] md:text-[13px] uppercase tracking-[0.08em]"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            About Us
          </span>
          <span 
            className="text-[11px] md:text-[13px] uppercase tracking-[0.08em]"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            Est. 1974
          </span>
        </div>

        {/* MAIN TEXT — positioned based on screen size */}
        <div 
          className="mt-auto"
          style={{
            maxWidth: getMaxWidth(),
            marginLeft: isMobile ? "auto" : "auto",
            marginRight: isMobile ? "auto" : "0",
            textAlign: isMobile ? "center" : "right",
            width: "100%",
          }}
        >
          <p 
            className="leading-[1.3] md:leading-[1.2] tracking-[-0.01em] md:tracking-[-0.02em] text-white font-light"
            style={{ 
              fontSize: getTextSize(),
            }}
          >
            From the renowned tailoring atelier of Vilmo Martini in Carrara
            to the international Mason's brand: discover how, in 1974,
            his son Giorgio transformed his father's craftsmanship into an
            entrepreneurial journey that still today blends artisanal
            tradition and innovation in the world of fashion.
          </p>

          <button
            className="
              mt-8 md:mt-10 
              px-6 md:px-8 
              py-3 md:py-4
              border border-white
              text-[12px] md:text-[14px] 
              uppercase tracking-[0.12em]
              text-white
              hover:bg-white hover:text-black
              transition-all duration-300
              hover:scale-105
              active:scale-95
            "
            style={{
              cursor: "pointer",
              background: "transparent",
            }}
          >
            About Us
          </button>

        </div>

      </div>

    </section>
  );
}