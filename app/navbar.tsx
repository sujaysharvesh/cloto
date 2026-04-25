"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import Card from "@/component/card";

export default function NavBar() {
  const [activeMenu, setActiveMenu] = useState<"shop" | "explore" | null>(null);
  const [renderedMenu, setRenderedMenu] = useState<"shop" | "explore" | null>(null);

  const megaRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (!megaRef.current) return;

    if (activeMenu) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      setRenderedMenu(activeMenu);
      if (animationRef.current) animationRef.current.kill();

      animationRef.current = gsap.to(megaRef.current, {
        maxHeight: 600,
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
        overwrite: true,
      });
    } else {
      if (animationRef.current) animationRef.current.kill();

      animationRef.current = gsap.to(megaRef.current, {
        maxHeight: 0,
        opacity: 0,
        duration: 0.25,
        ease: "power2.in",
        overwrite: true,
        onComplete: () => {
          setRenderedMenu(null);
          animationRef.current = null;
        },
      });
    }
  }, [activeMenu]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      if (animationRef.current) {
        animationRef.current.kill();
        animationRef.current = null;
      }
    };
  }, []);

  const handleMouseEnter = (menu: "shop" | "explore") => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setActiveMenu(menu);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
      timeoutRef.current = null;
    }, 100);
  };

  const handleMegaMenuLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
      timeoutRef.current = null;
    }, 100);
  };

  const cardData = [
    {
      section: "Go with the Flow Dresses",
      description: "Effortless styling for everyday comfort and movement.",
      productImage: "/women.jpg",
      buttonText: "SHOP DRESSES",
    },
    {
      section: "Airy 100% Organic Cotton",
      description: "Lightweight summer essentials inspired by coastal living.",
      productImage: "/men.jpg",
      buttonText: "SHOP HOLLY",
    },
    {
      section: "Modern Accessories",
      description: "Minimal pieces designed to complete your look.",
      productImage: "/accessories.jpg",
      buttonText: "SHOP ACCESSORIES",
    },
  ];

  return (
    <div
      className="w-full z-50"
      style={{ background: "#faf8f5" }}
      onMouseLeave={handleMouseLeave}
    >
      {/* Main Navbar */}
      <div style={{ borderBottom: "1px solid #ece7df" }}>
        <div className="w-full mx-auto px-8">
          <div className="relative flex items-center h-[72px]">

            {/* Nav Links */}
            <div className="flex items-center gap-10 flex-1">
              {(["shop", "explore"] as const).map((item) => (
                <button
                  key={item}
                  onMouseEnter={() => handleMouseEnter(item)}
                  style={{
                    color: activeMenu === item ? "#1a1a1a" : "#8a847c",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "20px",
                    fontWeight: 700,
                    letterSpacing: "0.025em",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    padding: 0,
                    transition: "color 0.15s",
                  }}
                >
                  {item}
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    style={{
                      transform: activeMenu === item ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.25s ease",
                    }}
                  >
                    <path
                      d="M2 3.5L5 6.5L8 3.5"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              ))}
              <button
                onMouseEnter={() => setActiveMenu(null)}
                style={{
                  color: "#8a847c",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "20px",
                  fontWeight: 700,
                  letterSpacing: "0.025em",
                  padding: 0,
                  transition: "color 0.15s",
                }}
              >
                subscribe
              </button>
            </div>

            <span
              className="absolute left-1/2 -translate-x-1/2 font-bold text-[42px] tracking-tight"
              style={{ color: "#e05a3a", fontFamily: "Georgia, serif" }}
            >
              Cloto
            </span>
            
            {/* Icons */}
            <div className="flex items-center gap-2 ml-auto">
              <button
                className="w-[34px] h-[34px] rounded-full flex items-center justify-center"
                style={{ border: "1px solid #ddd8d0", background: "transparent", cursor: "pointer" }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#5a5550"
                  strokeWidth="1.8"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
                </svg>
              </button>
              <button
                className="w-[34px] h-[34px] rounded-full flex items-center justify-center"
                style={{ border: "1px solid #ddd8d0", background: "transparent", cursor: "pointer" }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#5a5550"
                  strokeWidth="1.8"
                >
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 01-8 0" />
                </svg>
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Mega Menu */}
      <div
        ref={megaRef}
        className="absolute left-0 w-full overflow-hidden"
        style={{
            maxHeight: 0,
            opacity: 0,
            visibility: activeMenu ? "visible" : "hidden",
            background: "#f8f5eb",
            boxShadow: "0 20px 40px rgba(0,0,0,0.06)",
          
            // borderBottomLeftRadius: "32px",
            // borderBottomRightRadius: "32px",
          
            border: "1px solid #d7d2c8",
            borderTop: "none",
          }}
        onMouseEnter={() => {
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
          }
        }}
        onMouseLeave={handleMegaMenuLeave}
      >
        <div ref={contentRef}>

          {/* SHOP MENU */}
          {renderedMenu === "shop" && (
            <div className="max-w-8xl mx-auto px-8 py-12">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold" style={{ color: "#1a1a1a" }}>
                  Choose your mood
                </h2>
                <button
                  className="flex items-center gap-2 px-6 py-3 rounded-full"
                  style={{
                    background: "#1a1a1a",
                    color: "#fff",
                    fontSize: "13px",
                    fontWeight: 600,
                    border: "none",
                    cursor: "pointer",
                    letterSpacing: "0.025em",
                  }}
                >
                  view all
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-3 gap-6">
                {cardData.map((card, index) => (
                  <Card key={index} {...card} />
                ))}
              </div>
            </div>
          )}

          {/* EXPLORE MENU */}
          {renderedMenu === "explore" && (
            <div className="max-w-8xl mx-auto px-8 py-9 flex justify-between">

              {/* Nav links */}
              <div className="flex flex-col gap-[2px] min-w-[130px] justify-center">
                {["our story", "learn", "faqs"].map((link) => (
                  <span
                    key={link}
                    className="text-[42px] font-bold cursor-pointer leading-tight"
                    style={{
                      color: "#1a1a1a",
                      fontFamily: "Georgia, serif",
                      transition: "color 0.15s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#c8c2ba")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#1a1a1a")}
                  >
                    {link}
                  </span>
                ))}
              </div>

              {/* Thin divider */}
              {/* <div
                style={{
                  width: "1px",
                  background: "#e5dfd6",
                  alignSelf: "stretch",
                  flexShrink: 2,
                }}
              /> */}

              {/* Articles */}
              <div className="flex gap-6 ml-auto">
                {[
                  {
                    gradient: "linear-gradient(135deg, #e07030 0%, #c04010 100%)",
                    title:
                      "Discover timeless styles crafted for effortless everyday wear.",
                  },
                  {
                    gradient: "linear-gradient(135deg, #e89050 0%, #d06020 100%)",
                    title:
                      "Explore breathable essentials designed for comfort and modern living.",
                  },
                ].map(({ gradient, title }, i) => (
                  <div key={i} className="cursor-pointer w-[340px] group">
                    <div
                      className="w-full h-[220px] rounded-2xl mb-5"
                      style={{ background: gradient, transition: "opacity 0.2s ease" }}
                      onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                      onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                    />
                    <p
                      className="text-[20px] leading-snug font-medium"
                      style={{
                        color: "#3a3530",
                        textDecoration: "underline",
                        textUnderlineOffset: "3px",
                        textDecorationColor: "#c8c2ba",
                        transition: "color 0.15s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#8a847c")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "#3a3530")}
                    >
                      {title}
                    </p>
                  </div>
                ))}
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}