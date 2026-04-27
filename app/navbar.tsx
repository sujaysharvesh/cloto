"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import Card from "@/component/card";
import { ArrowRight, Menu, X, Search, ShoppingBag } from "lucide-react";

export default function NavBar() {
  const [activeMenu, setActiveMenu] = useState<"shop" | "explore" | null>(null);
  const [renderedMenu, setRenderedMenu] = useState<"shop" | "explore" | null>(
    null
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubMenu, setMobileSubMenu] = useState<"shop" | "explore" | null>(
    null
  );

  const megaRef = useRef<HTMLDivElement>(null);
  const navBgRef = useRef<HTMLDivElement>(null);
  const navWrapRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const bgAnimRef = useRef<gsap.core.Tween | null>(null);
  const menuAnimRef = useRef<gsap.core.Tween | null>(null);
  const isAnimatingOut = useRef(false);
  const lastScrollY = useRef(0);
  const navVisible = useRef(true);
  const [navHovered, setNavHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    if (!isMobile && mobileMenuOpen) {
      setMobileMenuOpen(false);
      setMobileSubMenu(null);
      document.body.style.overflow = "";
    }
  }, [isMobile, mobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if (!navWrapRef.current || !navBgRef.current) return;
      if (mobileMenuOpen) return;

      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;
      const scrolledPast = currentY > 80;

      if (delta > 4 && scrolledPast && navVisible.current) {
        navVisible.current = false;
        gsap.to(navWrapRef.current, {
          y: "-100%",
          duration: 0.4,
          ease: "power3.in",
        });
      } else if (delta < -4 && !navVisible.current) {
        navVisible.current = true;
        gsap.to(navWrapRef.current, {
          y: "0%",
          duration: 0.5,
          ease: "expo.out",
        });
      }

      if (!activeMenu && !mobileSubMenu) {
        if (bgAnimRef.current) bgAnimRef.current.kill();
        bgAnimRef.current = gsap.to(navBgRef.current, {
          backgroundColor: scrolledPast ? "#faf8f5" : "rgba(250,248,245,0)",
          backdropFilter: scrolledPast ? "blur(16px)" : "blur(0px)",
          duration: 0.4,
          ease: "power2.out",
        });
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeMenu, mobileMenuOpen, mobileSubMenu]);

  useEffect(() => {
    if (!navBgRef.current) return;
    if (bgAnimRef.current) bgAnimRef.current.kill();

    const isActive = activeMenu || mobileSubMenu;
    bgAnimRef.current = gsap.to(navBgRef.current, {
      backgroundColor: isActive ? "#faf8f5" : "rgba(250,248,245,0)",
      backdropFilter: isActive ? "blur(16px)" : "blur(0px)",
      duration: isActive ? 0.35 : 0.45,
      ease: isActive ? "expo.out" : "expo.inOut",
    });
  }, [activeMenu, mobileSubMenu]);

  // Desktop mega menu animation
  useEffect(() => {
    if (isMobile) return;
    if (!megaRef.current) return;
    if (menuAnimRef.current) menuAnimRef.current.kill();

    if (activeMenu) {
      isAnimatingOut.current = false;
      setRenderedMenu(activeMenu);

      gsap.set(megaRef.current, {
        visibility: "visible",
        clipPath: "inset(0% 0% 100% 0%)",
        opacity: 1,
        transformOrigin: "top center",
      });

      menuAnimRef.current = gsap.to(megaRef.current, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 0.55,
        ease: "expo.out",
        overwrite: true,
      });
    } else {
      isAnimatingOut.current = true;

      menuAnimRef.current = gsap.to(megaRef.current, {
        clipPath: "inset(0% 0% 100% 0%)",
        duration: 0.38,
        ease: "expo.inOut",
        overwrite: true,
        onComplete: () => {
          if (!isAnimatingOut.current) return;
          gsap.set(megaRef.current!, { visibility: "hidden" });
          setRenderedMenu(null);
        },
      });
    }
  }, [activeMenu, isMobile]);

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
    if (isMobile) return;
    clearClose();
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
      timeoutRef.current = null;
    }, 180);
  };

  const handleMenuEnter = (menu: "shop" | "explore") => {
    if (isMobile) return;
    clearClose();
    setActiveMenu(menu);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (!mobileMenuOpen) {
      setActiveMenu(null);
      setMobileSubMenu(null);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  };

  const openMobileSubMenu = (menu: "shop" | "explore") => {
    setMobileSubMenu(menu);
  };

  const closeMobileSubMenu = () => {
    setMobileSubMenu(null);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileSubMenu(null);
    document.body.style.overflow = "";
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

  const isNavDark =
    renderedMenu || mobileSubMenu || (isMobile && mobileMenuOpen);

  return (
    <>
      <div
        ref={navWrapRef}
        className="w-full z-50 fixed top-0 left-0"
        style={{ willChange: "transform" }}
        onMouseLeave={scheduleClose}
      >
        {/* NAVBAR */}
        <div
          ref={navBgRef}
          style={{
            backgroundColor: isMobile ? "#faf8f5" : "rgba(250,248,245,0)",
            backdropFilter: isMobile ? "blur(16px)" : "blur(0px)",
            WebkitBackdropFilter: isMobile ? "blur(16px)" : "blur(0px)",
            borderBottom: isMobile
              ? "1px solid #ece7df"
              : "1px solid rgba(236,231,223,0)",
            position: "relative",
            zIndex: 10,
          }}
        >
          <div className="w-full px-4 md:px-8">
            <div className="relative flex items-center h-[60px] md:h-[72px]">
              {/* Mobile Menu Button */}
              <button
                onClick={toggleMobileMenu}
                className="md:hidden flex items-center justify-center w-8 h-8"
                style={{ color: isNavDark ? "#2f2a26" : "#ffffff" }}
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>

              {/* DESKTOP NAV LINKS */}
              <div
                className="hidden md:flex items-center gap-6 lg:gap-10 flex-1"
                onMouseEnter={() => setNavHovered(true)}
                onMouseLeave={() => setNavHovered(false)}
              >
                {(["shop", "explore"] as const).map((item) => (
                  <button
                    key={item}
                    onMouseEnter={() => handleMenuEnter(item)}
                    style={{
                      color: renderedMenu ? "#2f2a26" : "#ffffff",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "18px",
                      fontWeight: 500,
                      letterSpacing: "0.025em",
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      padding: 0,
                      transition: "color 0.3s ease, font-weight 0.3s ease",
                    }}
                  >
                    {item}
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      style={{
                        transform:
                          activeMenu === item
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                        transition:
                          "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
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
                  onMouseEnter={(e) => {
                    clearClose();
                    setActiveMenu(null);
                  }}
                  style={{
                    color: renderedMenu ? "#2f2a26" : "#ffffff",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "18px",
                    fontWeight: 500,
                    letterSpacing: "0.025em",
                    padding: 0,
                    transition: "color 0.3s ease",
                  }}
                >
                  subscribe
                </button>
              </div>

              {/* LOGO */}
              <span
                className="absolute left-1/2 -translate-x-1/2 font-bold tracking-tight cursor-pointer whitespace-nowrap"
                style={{
                  color: isNavDark ? "#2f2a26" : "#ffffff",
                  transition: "color 0.3s ease",
                  fontFamily: "Telma",
                  fontSize: "50px",
                }}
              >
                Cloto
              </span>

              {/* ICONS */}
              <div className="flex items-center gap-2 ml-auto">
                <button
                  className="w-[30px] h-[30px] md:w-[34px] md:h-[34px] rounded-full flex items-center justify-center"
                  style={{
                    border: "1px solid rgba(221,216,208,0.6)",
                    background: "transparent",
                    cursor: "pointer",
                  }}
                >
                  <Search
                    size={14}
                    stroke={isNavDark ? "#2f2a26" : "#ffffff"}
                    strokeWidth={1.8}
                  />
                </button>
                <button
                  className="w-[30px] h-[30px] md:w-[34px] md:h-[34px] rounded-full flex items-center justify-center"
                  style={{
                    border: "1px solid rgba(221,216,208,0.6)",
                    background: "transparent",
                    cursor: "pointer",
                  }}
                >
                  <ShoppingBag
                    size={14}
                    stroke={isNavDark ? "#2f2a26" : "#ffffff"}
                    strokeWidth={1.8}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* DESKTOP MEGA MENU */}
        {!isMobile && (
          <div
            ref={megaRef}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              visibility: "hidden",
              clipPath: "inset(0% 0% 100% 0%)",
              background: "#faf8f5",
              borderBottom: "1px solid #ece7df",
              boxShadow: "0 24px 48px -12px rgba(0,0,0,0.08)",
              borderBottomLeftRadius: "24px",
              borderBottomRightRadius: "24px",
              overflow: "hidden",
              zIndex: 5,
              paddingTop: "72px",
            }}
            onMouseEnter={clearClose}
            onMouseLeave={scheduleClose}
          >
            {renderedMenu === "shop" && (
              <div className="max-w-8xl mx-auto px-8 py-8">
                <div className="flex items-center justify-between mb-8">
                  <h2
                    className="font-semibold"
                    style={{
                      color: "#1a1a1a",
                      fontFamily: "Georgia, serif",
                      fontSize: "28px",
                    }}
                  >
                    Choose your mood
                  </h2>
                  <button
                    className="flex items-center gap-3 px-7 py-[14px] text-[13px] uppercase tracking-[0.12em] font-medium transition-all duration-300 hover:gap-5"
                    style={{
                      background: "#1a1a1a",
                      color: "#ffffff",
                      borderRadius: "100px",
                    }}
                  >
                    View All
                    <ArrowRight size={15} />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {cardData.map((card, index) => (
                    <Card key={index} {...card} />
                  ))}
                </div>
              </div>
            )}

            {renderedMenu === "explore" && (
              <div className="max-w-8xl mx-auto px-8 py-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                <div className="flex flex-col gap-0 min-w-[130px]">
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
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "#c8c2ba")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "#1a1a1a")
                      }
                    >
                      {link}
                    </span>
                  ))}
                </div>

                <div
                  style={{
                    width: "1px",
                    background: "#ece7df",
                    height: "auto",
                    alignSelf: "stretch",
                    flexShrink: 0,
                    margin: "0 40px",
                  }}
                  className="hidden md:block"
                />

                <div className="flex gap-6 flex-1 flex-col md:flex-row">
                  {[
                    {
                      gradient:
                        "linear-gradient(135deg, #e07030 0%, #c04010 100%)",
                      title:
                        "Discover timeless styles crafted for effortless everyday wear.",
                    },
                    {
                      gradient:
                        "linear-gradient(135deg, #e89050 0%, #d06020 100%)",
                      title:
                        "Explore breathable essentials designed for comfort and modern living.",
                    },
                  ].map(({ gradient, title }, i) => (
                    <div
                      key={i}
                      className="cursor-pointer flex-1 max-w-[300px]"
                    >
                      <div
                        className="w-full h-[180px] mb-4"
                        style={{
                          background: gradient,
                          borderRadius: "16px",
                          transition: "opacity 0.35s ease",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.opacity = "0.8")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.opacity = "1")
                        }
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
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color = "#8a847c")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color = "#3a3530")
                        }
                      >
                        {title}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* MOBILE MENU OVERLAY */}
      {isMobile && mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          style={{
            background: "#faf8f5",
            top: "60px",
            overflowY: "auto",
          }}
        >
          <div className="px-6 py-8">
            {!mobileSubMenu ? (
              // Main mobile menu
              <div className="flex flex-col gap-8">
                <button
                  onClick={() => openMobileSubMenu("shop")}
                  className="flex items-center justify-between py-4 border-b border-[#ece7df]"
                  style={{
                    fontSize: "24px",
                    fontFamily: "Georgia, serif",
                    color: "#1a1a1a",
                  }}
                >
                  Shop
                  <ArrowRight size={20} />
                </button>
                <button
                  onClick={() => openMobileSubMenu("explore")}
                  className="flex items-center justify-between py-4 border-b border-[#ece7df]"
                  style={{
                    fontSize: "24px",
                    fontFamily: "Georgia, serif",
                    color: "#1a1a1a",
                  }}
                >
                  Explore
                  <ArrowRight size={20} />
                </button>
                <button
                  className="py-4 text-left border-b border-[#ece7df]"
                  style={{
                    fontSize: "24px",
                    fontFamily: "Georgia, serif",
                    color: "#1a1a1a",
                  }}
                  onClick={closeMobileMenu}
                >
                  Subscribe
                </button>
              </div>
            ) : (
              // Submenu
              <div>
                <button
                  onClick={closeMobileSubMenu}
                  className="flex items-center gap-2 mb-6 text-[#8a847c] hover:text-[#1a1a1a] transition"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M15 18l-6-6 6-6" strokeWidth="2" />
                  </svg>
                  Back
                </button>

                {mobileSubMenu === "shop" && (
                  <div>
                    <h2
                      className="font-semibold mb-6"
                      style={{
                        color: "#1a1a1a",
                        fontFamily: "Georgia, serif",
                        fontSize: "24px",
                      }}
                    >
                      Choose your mood
                    </h2>
                    <div className="flex flex-col gap-6">
                      {cardData.map((card, index) => (
                        <div key={index} className="mb-4">
                          <Card {...card} />
                        </div>
                      ))}
                    </div>
                    <button
                      className="flex items-center justify-center gap-2 w-full mt-8 px-6 py-3"
                      style={{
                        background: "#1a1a1a",
                        color: "#fff",
                        fontSize: "14px",
                        fontWeight: 600,
                        border: "none",
                        cursor: "pointer",
                        letterSpacing: "0.08em",
                        borderRadius: "100px",
                        textTransform: "uppercase",
                      }}
                    >
                      view all
                      <ArrowRight size={14} />
                    </button>
                  </div>
                )}

                {mobileSubMenu === "explore" && (
                  <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-4">
                      {["our story", "learn", "faqs"].map((link) => (
                        <span
                          key={link}
                          className="font-bold cursor-pointer"
                          style={{
                            fontSize: "32px",
                            color: "#1a1a1a",
                            fontFamily: "Georgia, serif",
                          }}
                        >
                          {link}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-col gap-6">
                      {[
                        {
                          gradient:
                            "linear-gradient(135deg, #e07030 0%, #c04010 100%)",
                          title:
                            "Discover timeless styles crafted for effortless everyday wear.",
                        },
                        {
                          gradient:
                            "linear-gradient(135deg, #e89050 0%, #d06020 100%)",
                          title:
                            "Explore breathable essentials designed for comfort and modern living.",
                        },
                      ].map(({ gradient, title }, i) => (
                        <div key={i} className="cursor-pointer">
                          <div
                            className="w-full h-[160px] mb-3"
                            style={{
                              background: gradient,
                              borderRadius: "16px",
                            }}
                          />
                          <p
                            className="text-[14px] leading-snug"
                            style={{
                              color: "#3a3530",
                              textDecoration: "underline",
                              textUnderlineOffset: "3px",
                              textDecorationColor: "#c8c2ba",
                            }}
                          >
                            {title}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
