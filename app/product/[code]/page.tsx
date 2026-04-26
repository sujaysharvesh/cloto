"use client";

import Image from "next/image";
import { Plus, ArrowLeft } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { useState } from "react";
import { allProducts } from "@/data/products";
import SmoothScroll from "@/component/SmoothScroll";

const sizes = ["XS", "S", "M", "L", "XL"];

export default function ProductPage() {
  const router = useRouter();
  const params = useParams();
  const code = params.code as string;

  const product = allProducts.find((p) => p.code === code);

  const [detailsOpen, setDetailsOpen] = useState(false);
  const [washOpen, setWashOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [sizeOpen, setSizeOpen] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#faf8f5" }}>
        <p className="text-[13px] uppercase tracking-[0.12em]" style={{ color: "#8a847c" }}>
          Product not found
        </p>
      </div>
    );
  }

  return (
    <SmoothScroll>
      <section className="w-full" style={{ background: "#fafafa" }}>
      <div className="flex">

        {/* LEFT — scrollable image grid */}
        <div className="w-[58%] grid grid-cols-2 gap-2 p-2 bg-white">
          {product.images.map((img, i) => (
            <div
              key={i}
              className="relative"
              style={{
                // first image full width
                gridColumn: i === 0 ? "1 / -1" : "auto",
                height: i === 0 ? "100vh" : "60vw",
                background: "#f7f4ef",
              }}
            >
              <Image
                src={img}
                alt={`${product.title} ${i + 1}`}
                fill
                priority={i === 0}
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* RIGHT — sticky panel */}
        <div
          className="w-[42%] sticky top-0 h-screen flex flex-col px-14 py-14 overflow-y-auto"
          style={{ borderLeft: "1px solid #e8e8e8" }}
        >
          {/* BACK */}
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 mb-10 w-fit transition-colors duration-200"
            style={{ background: "none", border: "none", cursor: "pointer", color: "#aaa" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#1a1a1a")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#aaa")}
          >
            <ArrowLeft size={14} />
            <span className="text-[11px] uppercase tracking-[0.12em]">Back</span>
          </button>

          {/* TITLE + PRICE */}
          <div className="flex items-start justify-between gap-6 mb-6">
            <h1
              className="text-[16px] font-semibold uppercase tracking-[0.02em] leading-snug"
              style={{ color: "#111" }}
            >
              {product.title}
            </h1>
            <span className="text-[16px] font-semibold whitespace-nowrap" style={{ color: "#111" }}>
              {product.price}
            </span>
          </div>

          {/* DESCRIPTION */}
          <p
            className="leading-relaxed mb-8"
            style={{ fontSize: "13px", color: "#555", fontWeight: 400, lineHeight: 1.75 }}
          >
            {product.description}
          </p>

          {/* DIVIDER */}
          <div style={{ borderTop: "1px solid #e8e8e8" }} />

          {/* ACCORDIONS */}
          <div>
            <button
              className="w-full flex items-center justify-between py-5"
              style={{ borderBottom: "1px solid #e8e8e8", background: "none", cursor: "pointer" }}
              onClick={() => setDetailsOpen(!detailsOpen)}
            >
              <span className="text-[12px] font-semibold uppercase tracking-[0.1em]" style={{ color: "#111" }}>
                Garment Details
              </span>
              <Plus size={16} style={{ color: "#111", transform: detailsOpen ? "rotate(45deg)" : "rotate(0deg)", transition: "transform 0.25s ease", flexShrink: 0 }} />
            </button>
            {detailsOpen && (
              <div className="py-4" style={{ borderBottom: "1px solid #e8e8e8" }}>
                {product.details.map((d, i) => (
                  <p key={i} className="text-[13px] py-[3px]" style={{ color: "#555", fontWeight: 400 }}>— {d}</p>
                ))}
              </div>
            )}

            <button
              className="w-full flex items-center justify-between py-5"
              style={{ borderBottom: "1px solid #e8e8e8", background: "none", cursor: "pointer" }}
              onClick={() => setWashOpen(!washOpen)}
            >
              <span className="text-[12px] font-semibold uppercase tracking-[0.1em]" style={{ color: "#111" }}>
                Wash Care
              </span>
              <Plus size={16} style={{ color: "#111", transform: washOpen ? "rotate(45deg)" : "rotate(0deg)", transition: "transform 0.25s ease", flexShrink: 0 }} />
            </button>
            {washOpen && (
              <div className="py-4" style={{ borderBottom: "1px solid #e8e8e8" }}>
                {product.washCare.map((w, i) => (
                  <p key={i} className="text-[13px] py-[3px]" style={{ color: "#555", fontWeight: 400 }}>— {w}</p>
                ))}
              </div>
            )}
          </div>

          {/* SPACER */}
          <div className="flex-1" />

          {/* SIZE + ADD TO CART */}
          <div className="flex flex-col gap-3">
            <div>
              <button
                className="w-full flex items-center justify-between px-5 h-[48px]"
                style={{ border: "1px solid #e8e8e8", background: "#f5f5f5", cursor: "pointer" }}
                onClick={() => setSizeOpen(!sizeOpen)}
              >
                <span className="text-[12px] font-semibold uppercase tracking-[0.1em]" style={{ color: "#111" }}>
                  {selectedSize ? `Size: ${selectedSize}` : "Select Size"}
                </span>
                <Plus size={14} style={{ color: "#111", transform: sizeOpen ? "rotate(45deg)" : "rotate(0deg)", transition: "transform 0.25s ease" }} />
              </button>

              {sizeOpen && (
                <div className="flex gap-2 mt-2 flex-wrap">
                  {sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => { setSelectedSize(s); setSizeOpen(false); }}
                      className="w-12 h-10 text-[12px] font-semibold uppercase transition-all duration-200"
                      style={{
                        border: selectedSize === s ? "1px solid #111" : "1px solid #e8e8e8",
                        background: selectedSize === s ? "#111" : "transparent",
                        color: selectedSize === s ? "#fff" : "#555",
                        cursor: "pointer",
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              className="w-full h-[52px] text-[13px] font-semibold uppercase tracking-[0.12em] hover:opacity-80 transition-opacity duration-200"
              style={{ background: "#111", color: "#fff", border: "none", cursor: "pointer" }}
            >
              Add to Cart
            </button>
          </div>

        </div>
      </div>
    </section>
    </SmoothScroll>

  );
}