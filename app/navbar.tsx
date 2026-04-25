"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import Card from "@/component/card";

export default function NavBar() {
  const [activeMenu, setActiveMenu] = useState<"shop" | "explore" | null>(null);
  const [renderedMenu, setRenderedMenu] = useState<"shop" | "explore" | null>(null);
  const [navActive, setNavActive] = useState(false);

  const megaRef = useRef<HTMLDivElement>(null);
  const navBgRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  // Single effect — navActive drives both bg + mega menu together
  useEffect(() => {
    if (!navBgRef.current || !megaRef.current) return;

    if (animationRef.current) animationRef.current.kill();

    if (navActive) {
      gsap.to(navBgRef.current, {
        backgroundColor: "#f8f5eb",
        duration: 0.28,
        ease: "power2.out",
      });
    } else {
      gsap.to(navBgRef.current, {
        backgroundColor: "rgba(248,245,235,0)",
        duration: 0.28,
        ease: "power2.out",
      });
    }
  }, [navActive]);

  // Mega menu open/close
  useEffect(() => {
    if (!megaRef.current) return;
    if (animationRef.current) animationRef.current.kill();

    if (activeMenu) {
      setRenderedMenu(activeMenu);
      animationRef.current = gsap.to(megaRef.current, {
        y: 10,
        opacity: 1,
        duration: 0.45,
        ease: "power3.out",
        overwrite: true,
      });
    } else {
      animationRef.current = gsap.to(megaRef.current, {
        y: -12,
        opacity: 0,
        duration: 0.28,
        ease: "power2.inOut",
        overwrite: true,
        onComplete: () => setRenderedMenu(null),
      });
    }
  }, [activeMenu]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (animationRef.current) animationRef.current.kill();
    };
  }, []);

  const clearClose = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const scheduleClose = () => {
  timeoutRef.current = setTimeout(() => {
    setActiveMenu(null);
    setNavActive(false);
  }, 200); // Increased from 120 to 200ms for better tolerance
};

const handleMenuEnter = (menu: "shop" | "explore") => {
  clearClose();
  setNavActive(true);
  setActiveMenu(menu);
};

// Add this to track if mouse is over the button or menu
const handleButtonLeave = (menu: "shop" | "explore") => {
  // Don't immediately close, give time to move to mega menu
  timeoutRef.current = setTimeout(() => {
    // Check if mouse is not over mega menu
    if (megaRef.current && !megaRef.current.matches(':hover')) {
      setActiveMenu(null);
      setNavActive(false);
    }
  }, 50);
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
      className="relative w-full z-50"
      onMouseLeave={scheduleClose}
    >
      {/* NAVBAR */}
      <div
        ref={navBgRef}
        className="relative"
        // style={{ backgroundColor: "rgba(248,245,235,0)" }}
      >
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center justify-between h-[72px]">

            {/* LOGO */}
            <span
              className="font-bold tracking-tight cursor-pointer"
              style={{ color: "#e05a3a", fontFamily: "Georgia, serif", fontSize: "28px" }}
            >
              Cloto
            </span>

            {/* NAV LINKS */}
            <div className="flex items-center gap-10">
              {(["shop", "explore"] as const).map((item) => (
                <button
                  key={item}
                  onMouseEnter={() => handleMenuEnter(item)}
                  style={{
                    // color: activeMenu === item ? "#1a1a1a" : "#3a3530",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "17px",
                    fontWeight: 500,
                    letterSpacing: "0.01em",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    padding: 0,
                    transition: "color 0.2s ease",
                  }}
                >
                  {item}
                  <svg
                    width="11" height="11" viewBox="0 0 10 10" fill="none"
                    style={{
                      transform: activeMenu === item ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.25s ease",
                    }}
                  >
                    <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              ))}

              <button
                // onMouseEnter={handleSubscribeEnter}
                style={{
                  color: "#3a3530",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "17px",
                  fontWeight: 500,
                  letterSpacing: "0.01em",
                  padding: 0,
                  transition: "color 0.2s ease",
                }}
              >
                subscribe
              </button>
            </div>

            {/* ICONS */}
            <div className="flex items-center gap-2">
              <button
                className="w-[36px] h-[36px] rounded-full flex items-center justify-center"
                style={{ border: "1px solid #ddd8d0", background: "transparent", cursor: "pointer" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5a5550" strokeWidth="1.8">
                  <circle cx="11" cy="11" r="7" />
                  <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
                </svg>
              </button>
              <button
                className="w-[36px] h-[36px] rounded-full flex items-center justify-center"
                style={{ border: "1px solid #ddd8d0", background: "transparent", cursor: "pointer" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5a5550" strokeWidth="1.8">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 01-8 0" />
                </svg>
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* MEGA MENU */}
      <div
        ref={megaRef}
        className="absolute left-0 w-full overflow-hidden"
        style={{
          opacity: 0,
          transform: "translateY(-12px)",
          visibility: renderedMenu ? "visible" : "hidden",
          background: "#f8f5eb",
          // boxShadow: "0 12px 24px rgba(0,0,0,0.04)",
          borderBottomLeftRadius: "32px",
          borderBottomRightRadius: "32px",
          
        }}
        onMouseEnter={clearClose}
        onMouseLeave={scheduleClose}
      >
        {/* SHOP MENU */}
        {renderedMenu === "shop" && (
          <div className="max-w-8xl mx-auto px-8 py-12">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold" style={{ color: "#1a1a1a" }}>
                Choose your mood
              </h2>
              <button
                className="flex items-center gap-2 px-6 py-3 rounded-full"
                style={{ background: "#1a1a1a", color: "#fff", fontSize: "13px", fontWeight: 600, border: "none", cursor: "pointer", letterSpacing: "0.025em" }}
              >
                view all
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
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
            <div className="flex flex-col gap-[2px] min-w-[130px] justify-center">
              {["our story", "learn", "faqs"].map((link) => (
                <span
                  key={link}
                  className="font-bold cursor-pointer leading-tight"
                  style={{ fontSize: "42px", color: "#1a1a1a", fontFamily: "Georgia, serif", transition: "color 0.15s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#c8c2ba")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#1a1a1a")}
                >
                  {link}
                </span>
              ))}
            </div>

            <div className="flex gap-6 ml-auto">
              {[
                { gradient: "linear-gradient(135deg, #e07030 0%, #c04010 100%)", title: "Discover timeless styles crafted for effortless everyday wear." },
                { gradient: "linear-gradient(135deg, #e89050 0%, #d06020 100%)", title: "Explore breathable essentials designed for comfort and modern living." },
              ].map(({ gradient, title }, i) => (
                <div key={i} className="cursor-pointer w-[340px]">
                  <div
                    className="w-full h-[220px] rounded-2xl mb-5"
                    style={{ background: gradient, transition: "opacity 0.2s ease" }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                  />
                  <p
                    className="text-[20px] leading-snug font-medium"
                    style={{ color: "#3a3530", textDecoration: "underline", textUnderlineOffset: "3px", textDecorationColor: "#c8c2ba", transition: "color 0.15s" }}
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
  );
}