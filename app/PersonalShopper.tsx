"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

export default function PersonalShopper() {
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

  // Responsive image height
  const getImageHeight = () => {
    if (isMobile) return "400px";
    if (isTablet) return "500px";
    return "680px";
  };

  // Responsive heading size
  const getHeadingSize = () => {
    if (isMobile) return "42px";
    if (isTablet) return "48px";
    return "56px";
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
              Personal Shopper
            </span>

            <span
              className="text-[10px] md:text-[11px] uppercase tracking-[0.12em]"
              style={{ color: "#b0a89e" }}
            >
              For You
            </span>
          </div>

          {/* MAIN GRID */}
          <div className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* LEFT IMAGE */}
            <div
              className="relative overflow-hidden w-full order-1 md:order-none"
              style={{ height: getImageHeight() }}
            >
              <Image
                src="/shop.jpg"
                alt="Personal Shopper"
                fill
                className="object-cover transition-transform duration-[1600ms] ease-out hover:scale-[1.03]"
              />

              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 50%)",
                }}
              />
            </div>

            {/* RIGHT CONTENT */}
            <div
              className="flex flex-col items-center md:items-end text-center md:text-right w-full order-2 md:order-none"
              style={{
                paddingTop: "0px",
                paddingBottom: "0px",
              }}
            >
              {/* TOP CONTENT */}
              <div className="flex flex-col items-center md:items-end w-full">
                <p
                  className="text-[10px] md:text-[11px] uppercase tracking-[0.14em] mb-3 md:mb-5"
                  style={{ color: "#b0a89e" }}
                >
                  the right amount of
                </p>

                <h2
                  className="leading-[1.1] md:leading-[0.95] tracking-[-0.02em] md:tracking-[-0.03em] mb-6 md:mb-8 font-semibold text-center md:text-right"
                  style={{
                    fontFamily: "Georgia, serif",
                    fontSize: getHeadingSize(),
                    color: "#1a1a1a",
                  }}
                >
                  Personal
                  <br />
                  Shopper
                </h2>

                <div
                  style={{
                    width: "40px",
                    height: "1px",
                    background: "#e05a3a",
                    marginBottom: "24px",
                  }}
                  className="md:mb-0"
                />
              </div>

              {/* BOTTOM CONTENT */}
              <div className="flex flex-col items-center md:items-end w-full mt-6 md:mt-0">
                <p
                  className="text-[14px] md:text-[15px] font-light max-w-[560px] md:max-w-[420px] text-center md:text-right leading-relaxed mb-4"
                  style={{ color: "#8a847c" }}
                >
                  With our Personal Shopper service, you can discover
                  the collections through a dedicated video call,
                  receiving tailored advice to help you choose the
                  perfect pieces and optimize your time.
                </p>

                <p
                  className="text-[14px] md:text-[15px] font-light max-w-[560px] md:max-w-[320px] text-center md:text-right leading-relaxed"
                  style={{ color: "#8a847c" }}
                >
                  Make your purchase immediately or review the selected
                  looks at your own pace and complete the order whenever
                  you prefer.
                </p>

                <button
                  className="flex items-center justify-center gap-2 md:gap-3 w-full md:w-fit mt-8 md:mt-10 px-6 md:px-7 py-3 md:py-[14px] text-[12px] md:text-[13px] uppercase tracking-[0.12em] font-medium transition-all duration-300 hover:gap-3 md:hover:gap-5"
                  style={{
                    background: "#1a1a1a",
                    color: "#fff",
                    borderRadius: "100px",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Book on WhatsApp
                  <ArrowRight size={isMobile ? 13 : 15} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}