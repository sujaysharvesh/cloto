"use client";

import ProductCard from "@/component/productCard";
import { allProducts } from "@/data/products";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Featured() {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleProductClick = (code: string) => {
    if (!code) return;
    router.push(`/product/${code}`);
  };

  return (
    <section className="w-full overflow-hidden" style={{ background: "#faf8f5" }}>
      <div className="py-12 md:py-24">
        <div className="mx-auto px-4 md:px-8">
          <div
            className="flex items-center justify-between pb-4 mb-8 md:mb-16"
            style={{ borderBottom: "1px solid #ece7df" }}
          >
            <span className="text-[10px] md:text-[11px] uppercase tracking-[0.12em]" style={{ color: "#b0a89e" }}>
              Featured Products
            </span>
            <span className="text-[10px] md:text-[11px] uppercase tracking-[0.12em]" style={{ color: "#b0a89e" }}>
              New In
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-14">
            <h2
              className="text-[32px] md:text-[48px] leading-[1.1] md:leading-[1.05] tracking-[-0.02em] md:tracking-[-0.03em] font-semibold max-w-[480px]"
              style={{ color: "#1a1a1a", fontFamily: "Georgia, serif" }}
            >
              Pieces worth reaching for.
            </h2>
            <button
              className="flex items-center gap-2 text-[12px] md:text-[13px] uppercase tracking-[0.12em] font-medium transition-all duration-300 hover:gap-3 w-fit"
              style={{ color: "#e05a3a", background: "none", border: "none", cursor: "pointer" }}
              onClick={() => router.push("/products")}
            >
              View All Products
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* MARQUEE */}
        <div className="overflow-hidden w-full">
          <div className="marquee-track flex gap-3 md:gap-4 w-max">
            {[...allProducts, ...allProducts].map((product, index) => (
              <div
                key={index}
                className="cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
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
        
        @media (max-width: 768px) {
          .marquee-track {
            animation-duration: 24s;
          }
        }
      `}</style>
    </section>
  );
}