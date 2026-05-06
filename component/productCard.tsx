"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

interface ProductCardProps {
  images: string[];
  title: string;
  code: string;
  price: string;
}

export default function ProductCard({ images, title, code, price }: ProductCardProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const primary = images[0];
  const hover = images[1] ?? images[0];

  if (isMobile) {
    return (
      <div className="relative w-[72vw] h-[88vw] max-w-[340px] max-h-[420px] bg-[#f4f4f4] overflow-hidden flex-shrink-0">
        {/* PRIMARY IMAGE */}
        <div className="absolute inset-0">
          <Image src={primary} alt={title} fill className="object-cover" />
        </div>

        {/* PRODUCT INFO */}
        <div className="absolute left-3 right-3 bottom-3 bg-white/95 backdrop-blur-sm p-4">
          <div className="flex items-end justify-between">
            <div className="flex-1">
              <h3 className="text-[11px] font-black uppercase leading-tight tracking-[0.12em]">
                {title}
              </h3>
              <p className="text-[#6f7b84] text-[11px] font-semibold mt-0.5">
                ({code})
              </p>
              <p className="mt-4 text-[17px] font-black">
                {price}
              </p>
            </div>
            <ArrowRight size={18} strokeWidth={1.8} className="flex-shrink-0 ml-2 mb-0.5" />
          </div>
        </div>
      </div>
    );
  }

  // Desktop
  return (
    <div className="group relative min-w-[460px] h-[560px] bg-[#f4f4f4] overflow-hidden flex-shrink-0">
      {/* PRIMARY IMAGE */}
      <div className="absolute inset-0 transition-opacity duration-500 ease-out group-hover:opacity-0">
        <Image src={primary} alt={title} fill className="object-cover" />
      </div>

      {/* HOVER IMAGE */}
      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100">
        <Image src={hover} alt={title} fill className="object-cover" />
      </div>

      {/* PRODUCT INFO HOVER */}
      <div className="absolute left-4 right-4 bottom-4 bg-white p-5 translate-y-[115%] opacity-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-hover:opacity-100">
        <div className="flex items-end justify-between">
          <div>
            <h3 className="text-[12px] font-black uppercase leading-tight">
              {title}
            </h3>
            <p className="text-[#6f7b84] text-[13px] font-semibold mt-1">
              ({code})
            </p>
            <p className="mt-10 text-[20px] font-black">{price}</p>
          </div>
          <ArrowRight size={24} strokeWidth={1.8} className="transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </div>
  );
}