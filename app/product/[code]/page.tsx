"use client";

import Image from "next/image";
import { Plus, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { allProducts } from "@/data/products";
import Footer from "@/app/Footer";
import SmoothScroll from "@/component/SmoothScroll";

const sizes = ["XS", "S", "M", "L", "XL"];

export default function ProductPage() {
  const params = useParams();
  const code = params.code as string;
  const product = allProducts.find((p) => p.code === code);

  const [detailsOpen, setDetailsOpen] = useState(false);
  const [washOpen, setWashOpen] = useState(false);
  const [shippingOpen, setShippingOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [sizeOpen, setSizeOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
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

  if (!product) return null;

  const mainImage = product.images[0];
  const midImages = product.images.slice(1, 3);
  const remainingImages = product.images.slice(3);

  return (
    <section className="w-full bg-white">

      {/* LIGHTBOX OVERLAY */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[1000] bg-black/95 flex items-center justify-center "
          onClick={closeLightbox}
        >
          <div className="relative w-screen h-screen  p-2 pt-2" onClick={(e) => e.stopPropagation()}>
            <Image src={product.images[lightboxIndex]} alt="Zoom" fill className="object-contain p-1" priority />
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white p-1"
            >
              <ChevronLeft size={28} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white p-3"
            >
              <ChevronRight size={28} />
            </button>
          </div>
          <button onClick={closeLightbox} className="fixed top-5 right-5 text-white/70 hover:text-white p-2">
            <X size={24} />
          </button>
        </div>
      )}

      {/* TWO COLUMN WRAPPER */}
      <div className="flex flex-col lg:flex-row items-start pt-2 px-2">

        {/* LEFT COLUMN */}
        <div className="w-full lg:w-1/2">

          {/* Hero image — true full viewport height, no offset */}
          <div
            onClick={() => setLightboxIndex(0)}
            className="relative w-full cursor-zoom-in bg-[#f7f4ef]"
            style={{ height: "100vh" }}
          >
            <Image src={mainImage} alt="Main" fill className="object-cover" priority />
          </div>

          {/* Mid grid images */}
          <div className="flex gap-2 pt-2">
            {midImages.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setLightboxIndex(idx + 1)}
                className="relative flex-1 cursor-zoom-in bg-[#f7f4ef]"
                style={{ height: "80vh" }}
              >
                <Image src={img} alt={`Detail ${idx + 2}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN — sticky, scrollbar hidden */}
        <aside className="w-full lg:w-1/2 lg:sticky lg:top-0 lg:h-screen flex flex-col border-l border-[#ebebeb]">

          {/* Scrollable zone — webkit scrollbar hidden via inline style */}
          <div
            className="flex-1 min-h-0 overflow-y-scroll px-8 py-10 lg:px-12 lg:py-12"
            style={{
              scrollbarWidth: "none",      /* Firefox */
              msOverflowStyle: "none",     /* IE/Edge */
            }}
          >
            {/* Hide webkit scrollbar — injected once */}
            <style>{`
              aside div::-webkit-scrollbar { display: none; }
            `}</style>

            {/* Title + Price */}
            <div className="flex items-start justify-between mb-2 gap-4">
              <h1 className="text-[13px] font-black uppercase tracking-[0.18em] text-[#111] leading-snug">
                {product.title}
              </h1>
              <div className="flex flex-col items-end gap-1 flex-shrink-0">
                <span className="text-[13px] font-black text-[#111] whitespace-nowrap">
                  {product.price}
                </span>
                <span className="text-[10px] text-[#888] font-semibold tracking-wide">
                  Incl. of all taxes
                </span>
              </div>
            </div>

            {/* Code + Tag */}
            <div className="flex items-center gap-3 mb-5">
              <span className="text-[10px] font-bold text-[#aaa] uppercase tracking-[0.15em]">
                {product.code}
              </span>
              {product.tag && (
                <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-2 py-0.5 ${
                  product.tag === "new" ? "bg-black text-white" : "bg-[#e5e5e5] text-[#555]"
                }`}>
                  {product.tag}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-[12.5px] leading-[1.85] text-[#555] font-bold mb-8 w-[90%]">
              {product.description}
            </p>

            <div className="border-t border-[#e5e5e5] mb-6" />

            {/* Size */}
            <div className="mb-2 relative">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#111]">Size</span>
                <button className="text-[10px] font-bold text-[#888] underline underline-offset-2 hover:text-black transition-colors">
                  Size Guide
                </button>
              </div>
              <button
                onClick={() => setSizeOpen(!sizeOpen)}
                className="w-full flex items-center justify-between px-5 h-12 border border-[#ddd] bg-white text-[10.5px] font-black uppercase tracking-[0.2em] hover:border-black transition-colors"
              >
                {selectedSize ? `Size: ${selectedSize}` : "Select Size"}
                <Plus size={13} className={`transition-transform duration-200 ${sizeOpen ? "rotate-45" : ""}`} />
              </button>
              {sizeOpen && (
                <div className="flex gap-1.5 mt-1.5">
                  {sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => { setSelectedSize(s); setSizeOpen(false); }}
                      className={`flex-1 h-11 text-[10px] font-black border transition-all ${
                        selectedSize === s
                          ? "bg-black text-white border-black"
                          : "bg-white text-black border-[#ddd] hover:border-black"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Low stock */}
            <p className="text-[10px] font-bold text-[#c17f3a] uppercase tracking-[0.15em] mb-6">
              ⚠ Only 3 left in stock
            </p>

            {/* Quantity */}
            <div className="mb-6">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#111] block mb-2">
                Quantity
              </span>
              <div className="flex items-center border border-[#ddd] w-fit">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-11 h-11 flex items-center justify-center text-[#111] hover:bg-[#f5f5f5] transition-colors text-lg font-light"
                >−</button>
                <span className="w-10 text-center text-[12px] font-black text-[#111]">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                  className="w-11 h-11 flex items-center justify-center text-[#111] hover:bg-[#f5f5f5] transition-colors text-lg font-light"
                >+</button>
              </div>
            </div>

            {/* Accordions */}
            <div className="border-t border-[#e5e5e5]">
              <Accordion title="Garment Details" isOpen={detailsOpen} toggle={() => setDetailsOpen(!detailsOpen)}>
                {product.details.map((d, i) => (
                  <p key={i} className="mb-1 text-[11.5px] font-bold text-[#555]">— {d}</p>
                ))}
              </Accordion>
              <Accordion title="Wash Care" isOpen={washOpen} toggle={() => setWashOpen(!washOpen)}>
                {product.washCare.map((w, i) => (
                  <p key={i} className="mb-1 text-[11.5px] font-bold text-[#555]">— {w}</p>
                ))}
              </Accordion>
              <Accordion title="Shipping & Returns" isOpen={shippingOpen} toggle={() => setShippingOpen(!shippingOpen)}>
                <p className="mb-1 text-[11.5px] font-bold text-[#555]">— Free shipping on orders above ₹2,000</p>
                <p className="mb-1 text-[11.5px] font-bold text-[#555]">— Standard delivery: 4–7 business days</p>
                <p className="mb-1 text-[11.5px] font-bold text-[#555]">— Express delivery available at checkout</p>
                <p className="mb-1 text-[11.5px] font-bold text-[#555]">— Easy 14-day returns on unworn items</p>
                <p className="mb-1 text-[11.5px] font-bold text-[#555]">— Return shipping covered by OR</p>
              </Accordion>
            </div>

            {/* Trust badges */}
            <div className="mt-8 grid grid-cols-3 gap-3">
              {[
                { icon: "✦", label: "Locally Made" },
                { icon: "◈", label: "Organic Cotton" },
                { icon: "⟳", label: "Easy Returns" },
              ].map(({ icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-1.5 py-3 border border-[#ebebeb]">
                  <span className="text-[14px] text-[#111]">{icon}</span>
                  <span className="text-[9px] font-black uppercase tracking-[0.15em] text-[#666] text-center">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ADD TO BAG + WISHLIST — always visible at bottom */}
          <div className="flex-shrink-0 px-8 pb-8 lg:px-12 lg:pb-10 pt-4 border-t border-[#ebebeb] flex flex-col gap-2 bg-white">
            <button className="w-full bg-black text-white text-[10.5px] font-black uppercase tracking-[0.3em] hover:bg-[#222] transition-colors py-4">
              Add to Bag
            </button>
            <button
              onClick={() => setWishlisted((w) => !w)}
              className={`w-full border text-[10.5px] font-black uppercase tracking-[0.3em] transition-all py-4 ${
                wishlisted ? "border-black bg-black text-white" : "border-[#ddd] text-[#111] hover:border-black"
              }`}
            >
              {wishlisted ? "♥  Wishlisted" : "♡  Wishlist"}
            </button>
          </div>
        </aside>
      </div>

      {/* FULL WIDTH REMAINING IMAGES */}
      <div className="w-full h-full bg-white flex flex-col pt-2">
        {remainingImages.map((img, idx) => (
          <div
            key={idx}
            onClick={() => setLightboxIndex(idx + 3)}
            className="relative w-full cursor-zoom-in bg-[#f7f4ef]"
            style={{ height: "110vh" }}
          >
            <Image src={img} alt={`Full detail ${idx + 4}`} fill className="object-cover" />
          </div>
        ))}
      </div>

      <Footer />
    </section>
  );
}

function Accordion({
  title, children, isOpen, toggle,
}: {
  title: string; children: React.ReactNode; isOpen: boolean; toggle: () => void;
}) {
  return (
    <div className="border-b border-[#e8e8e8]">
      <button onClick={toggle} className="w-full py-5 flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#111]">{title}</span>
        <Plus size={14} className={`transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-500 ${isOpen ? "max-h-96 pb-6" : "max-h-0"}`}>
        <div className="text-[#666] leading-relaxed font-light text-[12px]">{children}</div>
      </div>
    </div>
  );
}