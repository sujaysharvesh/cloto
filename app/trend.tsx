"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Trend() {
  return (
    <section className="w-full py-24" style={{ background: "#faf8f5" }}>

      <div className="max-w-7xl mx-auto px-8">

        {/* TOP LABELS */}
        <div
          className="flex items-center justify-between pb-4 mb-16"
          style={{ borderBottom: "1px solid #ece7df" }}
        >
          <span
            className="text-[11px] uppercase tracking-[0.12em]"
            style={{ color: "#b0a89e" }}
          >
            Collections
          </span>
          <span
            className="text-[11px] uppercase tracking-[0.12em]"
            style={{ color: "#b0a89e" }}
          >
            Season 2025
          </span>
        </div>

        {/* HEADING */}
        <div className="mb-14 flex items-end justify-between">
          <h2
            className="text-[48px] leading-[1.05] tracking-[-0.03em] font-semibold max-w-[560px]"
            style={{ color: "#1a1a1a", fontFamily: "Georgia, serif" }}
          >
            Discover styles made for every moment.
          </h2>

          <p
            className="text-[15px] font-light max-w-[280px] text-right leading-relaxed"
            style={{ color: "#8a847c" }}
          >
            Curated collections designed for comfort,
            confidence, and everyday expression.
          </p>
        </div>

        {/* IMAGE GRID */}
        <div className="grid grid-cols-2 gap-4">

          {/* WOMEN */}
          <div
            className="relative overflow-hidden group cursor-pointer"
            style={{ height: "780px", borderRadius: "20px" }}
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
            <div className="absolute bottom-10 left-10 z-10">
              <p
                className="text-[11px] uppercase tracking-[0.14em] mb-3"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                the right amount of
              </p>
              <h3
                className="text-white text-[52px] leading-none tracking-[-0.03em] mb-7"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Women
              </h3>
              <button
                className="flex items-center gap-3 px-7 py-[14px] text-[13px] uppercase tracking-[0.12em] font-medium transition-all duration-300 hover:gap-5"
                style={{
                  background: "rgba(255,255,255,0.95)",
                  color: "#1a1a1a",
                  borderRadius: "100px",
                }}
              >
                Shop Collection
                <ArrowRight size={15} />
              </button>
            </div>
          </div>

          {/* MEN */}
          <div
            className="relative overflow-hidden group cursor-pointer"
            style={{ height: "780px", borderRadius: "20px" }}
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
            <div className="absolute bottom-10 left-10 z-10">
              <p
                className="text-[11px] uppercase tracking-[0.14em] mb-3"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                the right amount of
              </p>
              <h3
                className="text-white text-[52px] leading-none tracking-[-0.03em] mb-7"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Men
              </h3>
              <button
                className="flex items-center gap-3 px-7 py-[14px] text-[13px] uppercase tracking-[0.12em] font-medium transition-all duration-300 hover:gap-5"
                style={{
                  background: "rgba(255,255,255,0.95)",
                  color: "#1a1a1a",
                  borderRadius: "100px",
                }}
              >
                Shop Collection
                <ArrowRight size={15} />
              </button>
            </div>
          </div>

        </div>

        {/* BOTTOM LINK */}
        <div className="flex justify-center mt-10">
          <button
            className="flex items-center gap-2 text-[13px] uppercase tracking-[0.12em] font-medium transition-colors duration-200"
            style={{ color: "#e05a3a", background: "none", border: "none", cursor: "pointer" }}
          >
            View All Collections
            <ArrowRight size={14} />
          </button>
        </div>

      </div>
    </section>
  );
}