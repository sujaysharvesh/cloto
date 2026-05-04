"use client";

import Image from "next/image";
import { Plus, ArrowLeft, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { allProducts } from "@/data/products";
import SmoothScroll from "@/component/SmoothScroll";
import Footer from "@/app/Footer";

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

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const closeLightbox = () => setLightboxIndex(null);

  const prevImage = useCallback(() => {
    if (lightboxIndex === null || !product) return;
    setLightboxIndex((lightboxIndex - 1 + product.images.length) % product.images.length);
  }, [lightboxIndex, product]);

  const nextImage = useCallback(() => {
    if (lightboxIndex === null || !product) return;
    setLightboxIndex((lightboxIndex + 1) % product.images.length);
  }, [lightboxIndex, product]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIndex, prevImage, nextImage]);

  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightboxIndex]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#faf8f5" }}>
        <p className="text-[13px] uppercase tracking-[0.12em]" style={{ color: "#8a847c" }}>
          Product not found
        </p>
      </div>
    );
  }

  const total = product.images.length;
  const mainImage = product.images[0];
  const subImages = product.images.slice(1, 3); // Images 2 and 3 (index 1, 2)
  const fourthImage = product.images[3]; // Image 4 for bottom section

  return (
    <SmoothScroll>
      <section className="w-full" style={{ background: "#fafafa" }}>

        {/* LIGHTBOX */}
        {lightboxIndex !== null && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 1000,
              background: "rgba(0,0,0,0.95)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={closeLightbox}
          >
            <div
              style={{ position: "relative", width: "100vw", height: "100vh" }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={product.images[lightboxIndex]}
                alt={`${product.title} ${lightboxIndex + 1}`}
                fill
                className="object-contain"
                priority
              />
            </div>

            <button
              onClick={closeLightbox}
              style={{
                position: "fixed", top: 20, right: 22,
                background: "none", border: "none",
                color: "rgba(255,255,255,0.75)", cursor: "pointer",
                zIndex: 10, padding: 8, display: "flex",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#fff")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.75)")}
            >
              <X size={20} />
            </button>

            <span
              style={{
                position: "fixed", top: 28, left: "50%", transform: "translateX(-50%)",
                fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase",
                color: "rgba(255,255,255,0.45)", zIndex: 10, pointerEvents: "none",
              }}
            >
              {lightboxIndex + 1} / {total}
            </span>

            {total > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); prevImage(); }}
                  style={{
                    position: "fixed", left: 16, top: "50%", transform: "translateY(-50%)",
                    width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center",
                    background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.14)",
                    color: "#fff", cursor: "pointer", zIndex: 10, transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.15)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.07)")}
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); nextImage(); }}
                  style={{
                    position: "fixed", right: 16, top: "50%", transform: "translateY(-50%)",
                    width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center",
                    background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.14)",
                    color: "#fff", cursor: "pointer", zIndex: 10, transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.15)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.07)")}
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}

            {total > 1 && (
              <div
                style={{
                  position: "fixed", bottom: 22, left: "50%", transform: "translateX(-50%)",
                  display: "flex", gap: 7, zIndex: 10,
                }}
              >
                {product.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.stopPropagation(); setLightboxIndex(i); }}
                    style={{
                      width: lightboxIndex === i ? 22 : 6, height: 6, borderRadius: 3,
                      background: lightboxIndex === i ? "#fff" : "rgba(255,255,255,0.3)",
                      border: "none", cursor: "pointer", transition: "all 0.3s ease", padding: 0,
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* MAIN CONTENT - Flex row for left and right sections */}
        <div className="flex flex-col lg:flex-row">
          
          {/* LEFT SECTION - Scrollable images */}
          <div className="w-full lg:w-[58%] bg-white">
            {/* Main Image */}
            <div className="w-full p-2 pb-1">
              <div
                onClick={() => setLightboxIndex(0)}
                className="relative group cursor-zoom-in overflow-hidden bg-[#f7f4ef]"
                style={{ height: "clamp(500px, 80vh, 90vh)", width: "100%" }}
              >
                <Image
                  src={mainImage}
                  alt={`${product.title} - Main`}
                  fill
                  priority
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/10">
                  <span className="text-[10px] tracking-[0.16em] uppercase text-white border border-white/55 px-4 py-1.5 bg-black/20">
                    [ View ]
                  </span>
                </div>
                <span className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[9px] tracking-[0.14em] text-white/65 uppercase">
                  01 / {String(total).padStart(2, "0")}
                </span>
              </div>
            </div>

            {/* Two Sub Images side by side */}
            <div className="flex gap-2 p-2 pt-1">
              {subImages.map((img, idx) => {
                const globalIndex = idx + 1;
                return (
                  <div
                    key={globalIndex}
                    onClick={() => setLightboxIndex(globalIndex)}
                    className="relative group cursor-zoom-in overflow-hidden bg-[#f7f4ef] flex-1"
                    style={{ height: "clamp(300px, 50vh, 60vh)" }}
                  >
                    <Image
                      src={img}
                      alt={`${product.title} ${globalIndex + 1}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/10">
                      <span className="text-[10px] tracking-[0.16em] uppercase text-white border border-white/55 px-4 py-1.5 bg-black/20">
                        [ View ]
                      </span>
                    </div>
                    <span className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[9px] tracking-[0.14em] text-white/65 uppercase">
                      {String(globalIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT SECTION - Sticky Product Details */}
          <div className="w-full lg:w-[42%] lg:sticky sticky lg:top-0 lg:self-start lg:h-screen lg:overflow-y-auto">
            <div className="px-5 py-8 sm:px-8 lg:px-12 lg:py-14" style={{ borderLeft: "1px solid #e8e8e8" }}>
              
              {/* BACK */}
              <button
                onClick={() => router.back()}
                className="flex items-center gap-2 mb-8 w-fit transition-colors duration-200"
                style={{ background: "none", border: "none", cursor: "pointer", color: "#aaa" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#1a1a1a")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#aaa")}
              >
                <ArrowLeft size={14} />
                <span className="text-[11px] uppercase tracking-[0.12em]">Back</span>
              </button>

              {/* TITLE + PRICE */}
              <div className="flex items-start justify-between gap-6 mb-6">
                <h1 className="text-[15px] sm:text-[16px] font-semibold uppercase tracking-[0.02em] leading-snug" style={{ color: "#111" }}>
                  {product.title}
                </h1>
                <span className="text-[15px] sm:text-[16px] font-semibold whitespace-nowrap" style={{ color: "#111" }}>
                  {product.price}
                </span>
              </div>

              {/* DESCRIPTION */}
              <p className="leading-relaxed mb-8" style={{ fontSize: "13px", color: "#555", fontWeight: 400, lineHeight: 1.75 }}>
                {product.description}
              </p>

              <div style={{ borderTop: "1px solid #e8e8e8" }} />

              {/* ACCORDIONS */}
              <div>
                <button
                  className="w-full flex items-center justify-between py-5"
                  style={{ borderBottom: "1px solid #e8e8e8", background: "none", cursor: "pointer" }}
                  onClick={() => setDetailsOpen(!detailsOpen)}
                >
                  <span className="text-[12px] font-semibold uppercase tracking-[0.1em]" style={{ color: "#111" }}>Garment Details</span>
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
                  <span className="text-[12px] font-semibold uppercase tracking-[0.1em]" style={{ color: "#111" }}>Wash Care</span>
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

              {/* SIZE + ADD TO CART */}
              <div className="flex flex-col gap-3 mt-8">
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
        </div>

        {/* BOTTOM SECTION - Full width 4th image */}
        {fourthImage && (
          <div className="w-full mt-0">
            <div
              onClick={() => setLightboxIndex(3)}
              className="relative group cursor-zoom-in overflow-hidden bg-[#f7f4ef]"
              style={{ height: "clamp(500px, 100vh, 100vh)", width: "100%" }}
            >
              <Image
                src={fourthImage}
                alt={`${product.title} - Full Screen`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/10">
                <span className="text-[10px] tracking-[0.16em] uppercase text-white border border-white/55 px-4 py-1.5 bg-black/20">
                  [ View ]
                </span>
              </div>
              <span className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[9px] tracking-[0.14em] text-white/65 uppercase">
                04 / {String(total).padStart(2, "0")}
              </span>
            </div>
          </div>
        )}

        {/* Any additional images beyond the 4th can go here */}
        {product.images.slice(4).map((img, idx) => {
          const globalIndex = 4 + idx;
          return (
            <div key={globalIndex} className="w-full">
              <div
                onClick={() => setLightboxIndex(globalIndex)}
                className="relative group cursor-zoom-in overflow-hidden bg-[#f7f4ef]"
                style={{ height: "clamp(500px, 100vh, 100vh)", width: "100%" }}
              >
                <Image
                  src={img}
                  alt={`${product.title} ${globalIndex + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/10">
                  <span className="text-[10px] tracking-[0.16em] uppercase text-white border border-white/55 px-4 py-1.5 bg-black/20">
                    [ View ]
                  </span>
                </div>
                <span className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[9px] tracking-[0.14em] text-white/65 uppercase">
                  {String(globalIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                </span>
              </div>
            </div>
          );
        })}
        
        <Footer/>
      </section>
    </SmoothScroll>
  );
}