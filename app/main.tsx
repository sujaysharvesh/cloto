"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Main() {
  return (
    <div className="px-2" style={{ background: "#faf8f5" }}>
      <div className="relative h-screen overflow-hidden" style={{ borderRadius: "20px" }}>

        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/main.jpg"
            alt="Background"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>

        {/* Gradient Overlay — bottom-up like Trend cards */}
        <div
          className="absolute inset-0 z-10"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.05) 55%)" }}
        />

        {/* Content */}
        <div className="relative z-20 h-full flex flex-col justify-between px-10 sm:px-16 md:px-20 py-14">

          {/* TOP LABELS — same as all sections */}
          <div
            className="flex items-center justify-between pb-4"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.2)" }}
          >
            <span className="text-[11px] uppercase tracking-[0.12em]" style={{ color: "rgba(255,255,255,0.6)" }}>
              Cloto
            </span>
            <span className="text-[11px] uppercase tracking-[0.12em]" style={{ color: "rgba(255,255,255,0.6)" }}>
              New Collection
            </span>
          </div>

          {/* BOTTOM CONTENT */}
          <div className="max-w-3xl">

            {/* Eyebrow */}
            <p
              className="text-[11px] uppercase tracking-[0.14em] mb-4"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              the right amount of
            </p>

            {/* Heading */}
            <h1
              className="text-white leading-[0.92] mb-6"
              style={{
                fontFamily: "Georgia, serif",
                fontWeight: 600,
                fontSize: "clamp(52px, 8vw, 96px)",
              }}
            >
              Elevated,
              <br />
              Naturally
            </h1>

            {/* Description */}
            <p
              className="text-[15px] leading-relaxed max-w-xl mb-10"
              style={{ color: "rgba(255,255,255,0.75)", fontWeight: 300 }}
            >
              Softer, more sustainable, and effortlessly refined —
              designed for everyday comfort with timeless silhouettes
              inspired by modern coastal living.
            </p>

            {/* CTA — pill button matching Trend cards */}
            <button
              className="flex items-center gap-3 px-7 py-[14px] text-[13px] uppercase tracking-[0.12em] font-medium transition-all duration-300 hover:gap-5"
              style={{
                background: "rgba(255,255,255,0.95)",
                color: "#1a1a1a",
                borderRadius: "100px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Shop Collection
              <ArrowRight size={15} />
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}