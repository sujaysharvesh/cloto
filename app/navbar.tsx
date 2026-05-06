"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useRouter } from "next/navigation";
import Card from "@/component/card";
import { ShoppingBag, Search, X, ArrowUpRight, Menu } from "lucide-react";

const NAV_LINKS = [
  { label: "Shop", key: "shop" as const },
  { label: "Explore", key: "explore" as const },
];

const SHOP_CATEGORIES = [
  { label: "Caps", href: "/shop?category=caps" },
  { label: "Tees", href: "/shop?category=tees" },
  { label: "Jackets", href: "/shop?category=jackets" },
  { label: "Bottoms", href: "/shop?category=bottoms" },
  { label: "Accessories", href: "/shop?category=accessories" },
  { label: "All Products", href: "/shop" },
];

const EXPLORE_LINKS = [
  { label: "Our Story", href: "/story" },
  { label: "Journal", href: "/journal" },
  { label: "FAQs", href: "/faqs" },
];

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

export default function NavBar() {
  const router = useRouter();

  const [activeMenu, setActiveMenu] = useState<"shop" | "explore" | null>(null);
  const [renderedMenu, setRenderedMenu] = useState<"shop" | "explore" | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState<"shop" | "explore" | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const megaRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastY = useRef(0);
  const animOut = useRef(false);
  const menuAnim = useRef<gsap.core.Tween | null>(null);

  // Scroll behaviour
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      const delta = y - lastY.current;
      if (delta > 6 && y > 120 && !mobileOpen) setHidden(true);
      else if (delta < -6) setHidden(false);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [mobileOpen]);

  // Animate nav hide/show
  useEffect(() => {
    if (!navRef.current) return;
    gsap.to(navRef.current, {
      y: hidden ? "-100%" : "0%",
      duration: hidden ? 0.35 : 0.5,
      ease: hidden ? "power3.in" : "expo.out",
    });
  }, [hidden]);

  // Mega menu animation
  useEffect(() => {
    if (!megaRef.current) return;
    if (menuAnim.current) menuAnim.current.kill();

    if (activeMenu) {
      animOut.current = false;
      setRenderedMenu(activeMenu);
      gsap.set(megaRef.current, { visibility: "visible", clipPath: "inset(0% 0% 100% 0%)" });
      menuAnim.current = gsap.to(megaRef.current, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 0.52,
        ease: "expo.out",
        overwrite: true,
      });
    } else {
      animOut.current = true;
      menuAnim.current = gsap.to(megaRef.current, {
        clipPath: "inset(0% 0% 100% 0%)",
        duration: 0.36,
        ease: "expo.inOut",
        overwrite: true,
        onComplete: () => {
          if (!animOut.current) return;
          gsap.set(megaRef.current!, { visibility: "hidden" });
          setRenderedMenu(null);
        },
      });
    }
  }, [activeMenu]);

  // Body scroll lock for mobile
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Cleanup timers
  useEffect(() => () => { if (closeTimer.current) clearTimeout(closeTimer.current); }, []);

  const clearClose = () => {
    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null; }
  };
  const scheduleClose = () => {
    clearClose();
    closeTimer.current = setTimeout(() => setActiveMenu(null), 180);
  };
  const enterMenu = (key: "shop" | "explore") => { clearClose(); setActiveMenu(key); };

  // Always dark text for this design - no hero white text needed
  const isDark = !!(renderedMenu || mobileOpen || scrolled);
  const textColor = "#111";
  const borderColor = isDark ? "rgba(0,0,0,0.07)" : "rgba(0,0,0,0.05)";

  return (
    <>
      {/* ── NAV WRAPPER ── */}
      <div
        ref={navRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 100,
          willChange: "transform",
        }}
        onMouseLeave={scheduleClose}
      >
        {/* ── NAV BAR ── */}
        <div
          style={{
            background: "#ffffff",
            backdropFilter: scrolled || isDark ? "blur(20px)" : "none",
            WebkitBackdropFilter: scrolled || isDark ? "blur(20px)" : "none",
            borderBottom: `1px solid ${borderColor}`,
            transition: "background 0.4s ease, border-color 0.4s ease",
            position: "relative",
            zIndex: 10,
          }}
        >
          <div
            style={{
              maxWidth: 1400,
              margin: "0 auto",
              padding: "0 32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: 68,
            }}
          >
            {/* LEFT — desktop links */}
            <div className="hidden md:flex" style={{ alignItems: "center", gap: 24, flex: 1 }}>
              {NAV_LINKS.map(({ label, key }) => (
                <button
                  key={key}
                  onMouseEnter={() => enterMenu(key)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "4px 0",
                    fontSize: 12,
                    fontWeight: 400,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: textColor,
                    transition: "color 0.3s ease, opacity 0.3s ease",
                    opacity: activeMenu && activeMenu !== key ? 0.4 : 1,
                    position: "relative",
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                  }}
                >
                  {label}
                  <span
                    style={{
                      position: "absolute",
                      bottom: -1,
                      left: 0,
                      width: activeMenu === key ? "100%" : "0%",
                      height: 1.5,
                      background: textColor,
                      transition: "width 0.3s ease",
                    }}
                  />
                </button>
              ))}

              <button
                onMouseEnter={() => { clearClose(); setActiveMenu(null); }}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "4px 0",
                  fontSize: 12,
                  fontWeight: 400,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: textColor,
                  transition: "color 0.3s ease, opacity 0.3s ease",
                  opacity: activeMenu ? 0.4 : 1,
                  fontFamily: "'Cormorant Garamond', Georgia, serif"
                }}
              >
                Subscribe
              </button>
            </div>

            {/* CENTRE — logo */}
            <button
              onClick={() => router.push("/")}
              style={{
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                lineHeight: 1,
              }}
            >
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 24,
                  fontWeight: 300,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: textColor,
                  transition: "color 0.3s ease",
                }}
              >
                CLOTO
              </span>
            </button>

            {/* RIGHT — icons */}
            <div style={{ display: "flex", alignItems: "center", gap: 4, marginLeft: "auto" }}>
              {/* Search */}
              <div
                ref={searchContainerRef}
                style={{
                  display: "flex",
                  alignItems: "center",
                  overflow: "hidden",
                  width: searchOpen ? 220 : 38,
                  height: 38,
                  borderRadius: 999,
                  border: searchOpen ? "1px solid rgba(0,0,0,0.15)" : "1px solid transparent",
                  transition: "width 0.45s cubic-bezier(0.16, 1, 0.3, 1), border 0.3s ease",
                  background: searchOpen ? "rgba(0,0,0,0.04)" : "transparent",
                }}
              >
                <button
                  onClick={() => {
                    setSearchOpen((prev) => {
                      const next = !prev;
                      if (next) setTimeout(() => searchInputRef.current?.focus(), 50);
                      else setSearchQuery("");
                      return next;
                    });
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    width: 38,
                    height: 38,
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: textColor,
                    transition: "opacity 0.2s",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "0.6")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "1")}
                >
                  <Search size={16} strokeWidth={1.5} />
                </button>

                <input
                  ref={searchInputRef}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") { setSearchOpen(false); setSearchQuery(""); }
                    if (e.key === "Enter") { /* handle search */ }
                  }}
                  placeholder="Search..."
                  style={{
                    flex: 1,
                    background: "none",
                    border: "none",
                    outline: "none",
                    fontSize: 13,
                    letterSpacing: "0.04em",
                    color: textColor,
                    caretColor: textColor,
                    opacity: searchOpen ? 1 : 0,
                    transition: "opacity 0.3s ease 0.15s",
                    paddingRight: 12,
                    fontFamily: "inherit",
                  }}
                />

                {searchOpen && (
                  <button
                    onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      width: 28,
                      height: 28,
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: textColor,
                      opacity: 0.5,
                      marginRight: 4,
                      borderRadius: "50%",
                      transition: "opacity 0.2s",
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "1")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "0.5")}
                  >
                    <X size={13} strokeWidth={2} />
                  </button>
                )}
              </div>

              {/* Cart */}
              <button
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  width: 38,
                  height: 38,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: textColor,
                  transition: "opacity 0.2s",
                  position: "relative",
                  borderRadius: "50%",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "0.6")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "1")}
              >
                <ShoppingBag size={16} strokeWidth={1.5} />
                <span
                  style={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    width: 4,
                    height: 4,
                    borderRadius: "50%",
                    background: textColor,
                    opacity: 0.8,
                  }}
                />
              </button>

              {/* Mobile hamburger */}
              <button
                className="md:hidden"
                onClick={() => {
                  setMobileOpen(!mobileOpen);
                  setMobileSubmenu(null);
                }}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  width: 38,
                  height: 38,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  marginLeft: 4,
                  color: textColor,
                  borderRadius: "50%",
                }}
              >
                {mobileOpen ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
              </button>
            </div>
          </div>

          <div
            ref={lineRef}
            style={{
              position: "absolute",
              bottom: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: 0,
              height: 0,
              background: "rgba(255,255,255,0.3)",
            }}
          />
        </div>

        {/* ── DESKTOP MEGA MENU ── */}
        <div
          ref={megaRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            visibility: "hidden",
            clipPath: "inset(0% 0% 100% 0%)",
            background: "#ffffff",
            borderBottom: "1px solid rgba(0,0,0,0.06)",
            zIndex: 5,
            paddingTop: 68,
          }}
          className="hidden md:block"
          onMouseEnter={clearClose}
          onMouseLeave={scheduleClose}
        >
          {/* SHOP panel */}
          {renderedMenu === "shop" && (
            <div
              style={{
                maxWidth: 1400,
                margin: "0 auto",
                padding: "52px 32px 48px",
                display: "grid",
                gridTemplateColumns: "200px 1fr",
                gap: 64,
                alignItems: "start",
              }}
            >
              <div>
                <p style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#aaa", marginBottom: 20, fontWeight: 500 }}>
                  Browse
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {SHOP_CATEGORIES.map(({ label, href }) => (
                    <button
                      key={label}
                      onClick={() => { router.push(href); setActiveMenu(null); }}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        textAlign: "left",
                        padding: "8px 0",
                        fontSize: 20,
                        fontWeight: 400,
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        color: "#111",
                        letterSpacing: "0.01em",
                        transition: "opacity 0.2s",
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        lineHeight: 1.2,
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "0.5"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "1"; }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
                  <p style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#aaa", fontWeight: 500 }}>
                    Featured
                  </p>
                  <button
                    onClick={() => { router.push("/shop"); setActiveMenu(null); }}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontSize: 11,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "#111",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      fontWeight: 500,
                      transition: "opacity 0.2s",
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "0.5")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "1")}
                  >
                    View all <ArrowUpRight size={12} />
                  </button>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
                  {cardData.map((card, i) => (
                    <Card key={i} {...card} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* EXPLORE panel */}
          {renderedMenu === "explore" && (
            <div
              style={{
                maxWidth: 1400,
                margin: "0 auto",
                padding: "52px 32px 48px",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 80,
                alignItems: "start",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                <p style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#aaa", marginBottom: 20, fontWeight: 500 }}>
                  Company
                </p>
                {EXPLORE_LINKS.map(({ label, href }) => (
                  <button
                    key={label}
                    onClick={() => { router.push(href); setActiveMenu(null); }}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      textAlign: "left",
                      padding: "8px 0",
                      fontSize: 32,
                      fontWeight: 400,
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      color: "#111",
                      letterSpacing: "0.01em",
                      transition: "opacity 0.2s",
                      lineHeight: 1.15,
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "0.4")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "1")}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div>
                <p style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#aaa", marginBottom: 20, fontWeight: 500 }}>
                  Latest
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                  {[
                    { bg: "linear-gradient(145deg, #c8b99a 0%, #a8927a 100%)", label: "SS25 Collection", sub: "Timeless styles for the season" },
                    { bg: "linear-gradient(145deg, #b8c4b0 0%, #8a9e80 100%)", label: "Sustainable Fabrics", sub: "100% organic cotton from field to closet" },
                  ].map(({ bg, label, sub }, i) => (
                    <div
                      key={i}
                      style={{ cursor: "pointer" }}
                      onClick={() => { router.push("/journal"); setActiveMenu(null); }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.opacity = "0.8")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.opacity = "1")}
                    >
                      <div style={{ width: "100%", height: 160, background: bg, marginBottom: 14, borderRadius: 2 }} />
                      <p style={{ fontSize: 14, fontWeight: 500, color: "#111", marginBottom: 4, letterSpacing: "0.01em" }}>{label}</p>
                      <p style={{ fontSize: 12, color: "#888", lineHeight: 1.5, letterSpacing: "0.02em" }}>{sub}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── MOBILE MENU ── */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          top: 68,
          background: "#ffffff",
          zIndex: 90,
          overflowY: "auto",
          transform: mobileOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        className="md:hidden"
      >
        <div style={{ padding: "32px 24px 60px", position: "relative", minHeight: "calc(100vh - 68px)" }}>
          {/* Main links */}
          <div
            style={{
              transform: mobileSubmenu ? "translateX(-100%)" : "translateX(0)",
              transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
              position: "absolute",
              left: 24,
              right: 24,
              top: 32,
            }}
          >
            {NAV_LINKS.map(({ label, key }) => (
              <button
                key={key}
                onClick={() => setMobileSubmenu(key)}
                style={{
                  width: "100%",
                  background: "none",
                  border: "none",
                  borderBottom: "1px solid rgba(0,0,0,0.07)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "18px 0",
                  textAlign: "left",
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 28,
                  fontWeight: 400,
                  color: "#111",
                  letterSpacing: "0.01em",
                }}
              >
                {label}
                <ArrowUpRight size={18} style={{ color: "#aaa", flexShrink: 0 }} />
              </button>
            ))}
            <button
              style={{
                width: "100%",
                background: "none",
                border: "none",
                borderBottom: "1px solid rgba(0,0,0,0.07)",
                cursor: "pointer",
                padding: "18px 0",
                textAlign: "left",
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 28,
                fontWeight: 400,
                color: "#111",
              }}
            >
              Subscribe
            </button>

            <div style={{ marginTop: 48, display: "flex", gap: 28 }}>
              {["Instagram", "Twitter", "TikTok"].map((s) => (
                <span
                  key={s}
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#aaa",
                    cursor: "pointer",
                    fontWeight: 500,
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Submenu */}
          <div
            style={{
              transform: mobileSubmenu ? "translateX(0)" : "translateX(100%)",
              transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
              position: "absolute",
              left: 24,
              right: 24,
              top: 32,
            }}
          >
            <button
              onClick={() => setMobileSubmenu(null)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontSize: 11,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#aaa",
                marginBottom: 32,
                fontWeight: 500,
                padding: 0,
              }}
            >
              ← Back
            </button>

            {mobileSubmenu === "shop" && (
              <div>
                {SHOP_CATEGORIES.map(({ label, href }) => (
                  <button
                    key={label}
                    onClick={() => { router.push(href); setMobileOpen(false); setMobileSubmenu(null); }}
                    style={{
                      width: "100%",
                      background: "none",
                      border: "none",
                      borderBottom: "1px solid rgba(0,0,0,0.06)",
                      cursor: "pointer",
                      padding: "16px 0",
                      textAlign: "left",
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontSize: 24,
                      fontWeight: 400,
                      color: "#111",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    {label}
                    <ArrowUpRight size={16} style={{ color: "#ccc" }} />
                  </button>
                ))}
              </div>
            )}

            {mobileSubmenu === "explore" && (
              <div>
                {EXPLORE_LINKS.map(({ label, href }) => (
                  <button
                    key={label}
                    onClick={() => { router.push(href); setMobileOpen(false); setMobileSubmenu(null); }}
                    style={{
                      width: "100%",
                      background: "none",
                      border: "none",
                      borderBottom: "1px solid rgba(0,0,0,0.06)",
                      cursor: "pointer",
                      padding: "16px 0",
                      textAlign: "left",
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontSize: 24,
                      fontWeight: 400,
                      color: "#111",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    {label}
                    <ArrowUpRight size={16} style={{ color: "#ccc" }} />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}