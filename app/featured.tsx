// Featured.tsx

"use client";

import ProductCard from "@/component/productCard";

export default function Featured() {
  const products = [
    {
      image: "/bag.png",
      // hoverImage: "/bag.png",
      title: "OR MONOGRAM CAP",
      code: "OR_CAP_1",
      price: "₹1,000.00",
    },
    {
      image: "/chain.png",
      // hoverImage: "/chain.png",
      title: "OR RED CAP",
      code: "OR_CAP_2",
      price: "₹1,200.00",
    },
    {
      image: "/pants.png",
      // hoverImage: "/pants.png",
      title: "OR WHITE CAP",
      code: "OR_CAP_3",
      price: "₹1,300.00",
    },
    {
      image: "/shirt.png",
      // hoverImage: "/shirt.png",
      title: "OR MONOGRAM T-SHIRT [BLACK]",
      code: "OR_ORMT_B",
      price: "₹1,000.00",
    },
    {
      image: "/shirt.png",
      // hoverImage: "/shirt.png",
      title: "OR MONOGRAM T-SHIRT [BLACK]",
      code: "OR_ORMT_B",
      price: "₹1,000.00",
    },
    {
      image: "/shirt.png",
      // hoverImage: "/shirt.png",
      title: "OR MONOGRAM T-SHIRT [BLACK]",
      code: "OR_ORMT_B",
      price: "₹1,000.00",
    },
  ];

  return (
    <section className="w-full bg-[#efefef] py-8 overflow-hidden">

      {/* TOP BAR */}
      <div className="flex items-center justify-between px-6 mb-6">

        <div className="flex items-center gap-3">
          <span className="text-[17px] text-[#7b5f4f]">
            ( FEATURED PRODUCTS )
          </span>

          <div className="w-[140px] h-[1px] bg-black" />
        </div>

        {/* <div className="flex items-center gap-8 text-[20px] font-black uppercase">
          <button>SHOP NOW</button>
          <button>CART</button>
        </div> */}
      </div>

      {/* MOVING PRODUCTS */}
      <div className="overflow-hidden w-full">

        <div className="marquee-track flex gap-[10px] w-max">

          {/* duplicated for infinite loop */}
          {[...products, ...products].map((product, index) => (
            <ProductCard
              key={index}
              {...product}
            />
          ))}

        </div>
      </div>

      {/* VIEW ALL */}
      <div className="flex justify-center mt-10">
        <button className="text-[17px] text-[#7b5f4f]">
          ( VIEW ALL PRODUCTS )
        </button>
      </div>

      {/* ANIMATION */}
      <style jsx>{`
        .marquee-track {
          animation: marqueeMove 30s linear infinite;
        }

        // .marquee-track:hover {
        //   animation-play-state: paused;
        // }

        @keyframes marqueeMove {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}