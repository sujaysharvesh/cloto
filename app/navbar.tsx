"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import Card from "@/component/card";

export default function NavBar() {
  const [activeMenu, setActiveMenu] = useState<"shop" | "explore" | null>(null);
  const [renderedMenu, setRenderedMenu] = useState<"shop" | "explore" | null>(null);

  const megaRef = useRef<HTMLDivElement>(null);
  const navBgRef = useRef<HTMLDivElement>(null);
  const navWrapRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const bgAnimRef = useRef<gsap.core.Tween | null>(null);
  const menuAnimRef = useRef<gsap.core.Tween | null>(null);
  const isAnimatingOut = useRef(false);
  const lastScrollY = useRef(0);
  const navVisible = useRef(true);

  // Scroll — hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      if (!navWrapRef.current || !navBgRef.current) return;

      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;
      const scrolledPast = currentY > 80;

      // Show/hide based on direction
      if (delta > 4 && scrolledPast && navVisible.current) {
        // Scrolling DOWN — hide
        navVisible.current = false;
        gsap.to(navWrapRef.current, {
          y: "-100%",
          duration: 0.4,
          ease: "power3.in",
        });
      } else if (delta < -4 && !navVisible.current) {
        // Scrolling UP — show
        navVisible.current = true;
        gsap.to(navWrapRef.current, {
          y: "0%",
          duration: 0.5,
          ease: "expo.out",
        });
      }

      // Background fill when scrolled
      if (!activeMenu) {
        gsap.to(navBgRef.current, {
          backgroundColor: "#faf8f5",
backdropFilter: "blur(16px)",
          duration: 0.4,
          ease: "power2.out",
        });
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeMenu]);

  // Navbar background driven by menu state
  useEffect(() => {
    if (!navBgRef.current) return;
    if (bgAnimRef.current) bgAnimRef.current.kill();

    bgAnimRef.current = gsap.to(navBgRef.current, {
      backgroundColor: "#faf8f5",
      backdropFilter: "blur(16px)",
      duration: 0.45,
      ease: "expo.out",
    });
  }, [activeMenu]);

  // Mega menu — luxury reveal
  useEffect(() => {
    if (!megaRef.current) return;
    if (menuAnimRef.current) menuAnimRef.current.kill();

    if (activeMenu) {
      isAnimatingOut.current = false;
      setRenderedMenu(activeMenu);

      gsap.set(megaRef.current, {
        visibility: "visible",
        y: -24,
        opacity: 0,
        scale: 0.98,
        transformOrigin: "top center",
      });

      menuAnimRef.current = gsap.to(megaRef.current, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.65,
        ease: "expo.out",
        overwrite: true,
      });
    } else {
      isAnimatingOut.current = true;

      menuAnimRef.current = gsap.to(megaRef.current, {
        y: -16,
        opacity: 0,
        scale: 0.98,
        duration: 0.4,
        ease: "expo.inOut",
        overwrite: true,
        onComplete: () => {
          if (!isAnimatingOut.current) return;
          gsap.set(megaRef.current!, { visibility: "hidden" });
          setRenderedMenu(null);
        },
      });
    }
  }, [activeMenu]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (bgAnimRef.current) bgAnimRef.current.kill();
      if (menuAnimRef.current) menuAnimRef.current.kill();
    };
  }, []);

  const clearClose = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const scheduleClose = () => {
    clearClose();
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
      timeoutRef.current = null;
    }, 180);
  };

  const handleMenuEnter = (menu: "shop" | "explore") => {
    clearClose();
    setActiveMenu(menu);
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
    // navWrapRef — this is what slides up/down
    <div
      ref={navWrapRef}
      className="relative w-full z-50"
      style={{ willChange: "transform" }}
      onMouseLeave={scheduleClose}
    >
      {/* NAVBAR */}
      <div
        ref={navBgRef}
        className="relative"
        style={{
          backgroundColor: "#faf8f5",
          backdropFilter: "blur(0px)",
          WebkitBackdropFilter: "blur(0px)",
          borderBottom: "1px solid rgba(236,231,223,0.4)",
        }}
      >
        <div className="w-full px-8">
          <div className="relative flex items-center h-[72px]">

            {/* NAV LINKS — left */}
            <div className="flex items-center gap-10 flex-1">
              {(["shop", "explore"] as const).map((item) => (
                <button
                  key={item}
                  onMouseEnter={() => handleMenuEnter(item)}
                  style={{
                    color: activeMenu === item ? "#111111" : "#2f2a26",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "20px",
                    fontWeight: 500,
                    letterSpacing: "0.025em",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    padding: 0,
                    transition: "color 0.3s ease",
                  }}
                >
                  {item}
                  <svg
                    width="10" height="10" viewBox="0 0 10 10" fill="none"
                    style={{
                      transform: activeMenu === item ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                  >
                    <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              ))}

              <button
                onMouseEnter={() => { clearClose(); setActiveMenu(null); }}
                style={{
                  color: "#2f2a26",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "20px",
                  fontWeight: 500,
                  letterSpacing: "0.025em",
                  padding: 0,
                  transition: "color 0.3s ease",
                }}
              >
                subscribe
              </button>
            </div>

            {/* LOGO — centered */}
            <span
              className="absolute text-white left-1/2 -translate-x-1/2 font-bold tracking-tight cursor-pointer"
              style={{
                color: "#2f2a26",
                fontFamily: "Georgia, serif",
                fontSize: "36px",
              }}
            >
              Cloto
            </span>

            {/* ICONS — right */}
            <div className="flex items-center gap-2 ml-auto">
              <button
                className="w-[34px] h-[34px] rounded-full flex items-center justify-center"
                style={{ border: "1px solid #ddd8d0", background: "transparent", cursor: "pointer" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1f1f1f" strokeWidth="1.8">
                  <circle cx="11" cy="11" r="7" />
                  <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
                </svg>
              </button>
              <button
                className="w-[34px] h-[34px] rounded-full flex items-center justify-center"
                style={{ border: "1px solid #ddd8d0", background: "transparent", cursor: "pointer" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1f1f1f" strokeWidth="1.8">
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
        className="absolute left-0 w-full"
        style={{
          opacity: 0,
          visibility: "hidden",
          background: "#faf8f5",
          borderBottom: "1px solid #ece7df",
          boxShadow: "0 24px 48px -12px rgba(0,0,0,0.08), 0 8px 16px -4px rgba(0,0,0,0.04)",
          borderBottomLeftRadius: "24px",
          borderBottomRightRadius: "24px",
          overflow: "hidden",
          transformOrigin: "top center",
        }}
        onMouseEnter={clearClose}
        onMouseLeave={scheduleClose}
      >
        {/* SHOP MENU */}
        {renderedMenu === "shop" && (
          <div className="max-w-8xl mx-auto px-8 py-12">
            <div className="flex items-center justify-between mb-8">
              <h2
                className="font-semibold"
                style={{ color: "#1a1a1a", fontFamily: "Georgia, serif", fontSize: "28px" }}
              >
                Choose your mood
              </h2>
              <button
                className="flex items-center gap-2 px-6 py-3"
                style={{
                  background: "#1a1a1a",
                  color: "#fff",
                  fontSize: "12px",
                  fontWeight: 600,
                  border: "none",
                  cursor: "pointer",
                  letterSpacing: "0.08em",
                  borderRadius: "100px",
                  textTransform: "uppercase",
                }}
              >
                view all
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-3 gap-5">
              {cardData.map((card, index) => (
                <Card key={index} {...card} />
              ))}
            </div>
          </div>
        )}

        {/* EXPLORE MENU */}
        {renderedMenu === "explore" && (
          <div className="max-w-8xl mx-auto px-8 py-10 flex justify-between items-center">
            <div className="flex flex-col gap-0 min-w-[130px] justify-center">
              {["our story", "learn", "faqs"].map((link) => (
                <span
                  key={link}
                  className="font-bold cursor-pointer leading-tight"
                  style={{
                    fontSize: "42px",
                    color: "#1a1a1a",
                    fontFamily: "Georgia, serif",
                    transition: "color 0.3s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#c8c2ba")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#1a1a1a")}
                >
                  {link}
                </span>
              ))}
            </div>

            <div style={{ width: "1px", background: "#ece7df", alignSelf: "stretch", flexShrink: 0, margin: "0 40px" }} />

            <div className="flex gap-6 flex-1">
              {[
                {
                  gradient: "linear-gradient(135deg, #e07030 0%, #c04010 100%)",
                  title: "Discover timeless styles crafted for effortless everyday wear.",
                },
                {
                  gradient: "linear-gradient(135deg, #e89050 0%, #d06020 100%)",
                  title: "Explore breathable essentials designed for comfort and modern living.",
                },
              ].map(({ gradient, title }, i) => (
                <div key={i} className="cursor-pointer flex-1 max-w-[300px]">
                  <div
                    className="w-full h-[180px] mb-4"
                    style={{ background: gradient, borderRadius: "16px", transition: "opacity 0.35s ease" }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                  />
                  <p
                    className="text-[14px] leading-snug"
                    style={{
                      color: "#3a3530",
                      textDecoration: "underline",
                      textUnderlineOffset: "3px",
                      textDecorationColor: "#c8c2ba",
                      transition: "color 0.3s ease",
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
  );
}