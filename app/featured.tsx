"use client";

import ProductCard from "@/component/productCard";
import { allProducts } from "@/data/products";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Featured() {
  const router = useRouter();

  const handleProductClick = (code: string) => {
    if (!code) return;
    router.push(`/product/${code}`);
  };

  return (
    <section className="w-full py-24 overflow-hidden" style={{ background: "#faf8f5" }}>

      <div className="mx-auto px-8">
        <div
          className="flex items-center justify-between pb-4 mb-16"
          style={{ borderBottom: "1px solid #ece7df" }}
        >
          <span className="text-[11px] uppercase tracking-[0.12em]" style={{ color: "#b0a89e" }}>
            Featured Products
          </span>
          <span className="text-[11px] uppercase tracking-[0.12em]" style={{ color: "#b0a89e" }}>
            New In
          </span>
        </div>

        <div className="flex items-end justify-between mb-14">
          <h2
            className="text-[48px] leading-[1.05] tracking-[-0.03em] font-semibold max-w-[480px]"
            style={{ color: "#1a1a1a", fontFamily: "Georgia, serif" }}
          >
            Pieces worth reaching for.
          </h2>
          <button
            className="flex items-center gap-2 text-[13px] uppercase tracking-[0.12em] font-medium"
            style={{ color: "#e05a3a", background: "none", border: "none", cursor: "pointer" }}
            onClick={() => router.push("/products")}
          >
            View All Products
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* MARQUEE */}
      <div className="overflow-hidden w-full">
        <div className="marquee-track flex gap-4 w-max">
          {[...allProducts, ...allProducts].map((product, index) => (
            <div
              key={index}
              className="cursor-pointer"
              onClick={() => handleProductClick(product.code)}
            >
              <ProductCard
                images={product.images}
                title={product.title}
                code={product.code}
                price={product.price}
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .marquee-track {
          animation: marqueeMove 32s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        @keyframes marqueeMove {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>

    </section>
  );
}