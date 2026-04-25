"use client";

import ProductCard from "@/component/productCard";
import { ArrowRight } from "lucide-react";

export default function Featured() {
  const products = [
    {
      image: "/bag.png",
      title: "OR MONOGRAM CAP",
      code: "OR_CAP_1",
      price: "₹1,000.00",
    },
    {
      image: "/chain.png",
      title: "OR RED CAP",
      code: "OR_CAP_2",
      price: "₹1,200.00",
    },
    {
      image: "/pants.png",
      title: "OR WHITE CAP",
      code: "OR_CAP_3",
      price: "₹1,300.00",
    },
    {
      image: "/shirt.png",
      title: "OR MONOGRAM T-SHIRT [BLACK]",
      code: "OR_ORMT_B",
      price: "₹1,000.00",
    },
    {
      image: "/shirt.png",
      title: "OR MONOGRAM T-SHIRT [WHITE]",
      code: "OR_ORMT_W",
      price: "₹1,000.00",
    },
    {
      image: "/shirt.png",
      title: "OR MONOGRAM T-SHIRT [GREY]",
      code: "OR_ORMT_G",
      price: "₹1,000.00",
    },
  ];

  return (
    <section className="w-full py-24 overflow-hidden" style={{ background: "#faf8f5" }}>

      <div className="mx-auto px-8">

        {/* TOP LABELS */}
        <div
          className="flex items-center justify-between pb-4 mb-16"
          style={{ borderBottom: "1px solid #ece7df" }}
        >
          <span
            className="text-[11px] uppercase tracking-[0.12em]"
            style={{ color: "#b0a89e" }}
          >
            Featured Products
          </span>
          <span
            className="text-[11px] uppercase tracking-[0.12em]"
            style={{ color: "#b0a89e" }}
          >
            New In
          </span>
        </div>

        {/* HEADING ROW */}
        <div className="flex items-end justify-between mb-14">
          <h2
            className="text-[48px] leading-[1.05] tracking-[-0.03em] font-semibold max-w-[480px]"
            style={{ color: "#1a1a1a", fontFamily: "Georgia, serif" }}
          >
            Pieces worth reaching for.
          </h2>

          <button
            className="flex items-center gap-2 text-[13px] uppercase tracking-[0.12em] font-medium transition-colors duration-200"
            style={{ color: "#e05a3a", background: "none", border: "none", cursor: "pointer" }}
          >
            View All Products
            <ArrowRight size={14} />
          </button>
        </div>

      </div>

      {/* MARQUEE */}
      <div className="overflow-hidden w-full">
        <div className="marquee-track flex gap-4 w-max">
          {[...products, ...products].map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      </div>

      <style jsx>{`
        .marquee-track {
          animation: marqueeMove 32s linear infinite;
        }

        @keyframes marqueeMove {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>

    </section>
  );
}