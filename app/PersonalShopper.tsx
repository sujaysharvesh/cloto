"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function PersonalShopper() {
  return (
    <section className="w-full py-24" style={{ background: "#faf8f5" }}>
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
            Personal Shopper
          </span>

          <span
            className="text-[11px] uppercase tracking-[0.12em]"
            style={{ color: "#b0a89e" }}
          >
            For You
          </span>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-2 gap-12 items-center">

          {/* LEFT IMAGE */}
          <div
            className="relative overflow-hidden"
            style={{ height: "680px" }}
          >
            <Image
              src="/shop.jpg"
              alt="Personal Shopper"
              fill
              className="object-cover transition-transform duration-[1600ms] ease-out hover:scale-[1.03]"
            />

            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 50%)",
              }}
            />
          </div>

          {/* RIGHT CONTENT */}
          <div
            className="flex flex-col items-end text-right pl-8"
            style={{
              height: "680px",
              paddingTop: "0px",
              paddingBottom: "0px",
            }}
          >

            {/* TOP CONTENT */}
            <div className="flex flex-col items-end">
              <p
                className="text-[11px] uppercase tracking-[0.14em] mb-5"
                style={{ color: "#b0a89e" }}
              >
                the right amount of
              </p>

              <h2
                className="leading-[0.95] tracking-[-0.03em] mb-8 font-semibold text-right"
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: "clamp(38px, 4vw, 56px)",
                  color: "#1a1a1a",
                }}
              >
                Personal
                <br />
                Shopper
              </h2>

              <div
                style={{
                  width: "40px",
                  height: "1px",
                  background: "#e05a3a",
                }}
              />
            </div>

            {/* BOTTOM CONTENT */}
            <div className="flex flex-col items-end">

              <p
                className="text-[15px] font-light max-w-[420px] text-right leading-relaxed mb-4"
                style={{ color: "#8a847c" }}
              >
                With our Personal Shopper service, you can discover
                the collections through a dedicated video call,
                receiving tailored advice to help you choose the
                perfect pieces and optimize your time.
              </p>

              <p
                className="text-[15px] font-light max-w-[320px] text-right leading-relaxed"
                style={{ color: "#8a847c" }}
              >
                Make your purchase immediately or review the selected
                looks at your own pace and complete the order whenever
                you prefer.
              </p>

              <button
                className="flex items-center gap-3 w-fit mt-10 px-7 py-[14px] text-[13px] uppercase tracking-[0.12em] font-medium transition-all duration-300 hover:gap-5 self-end"
                style={{
                  background: "#1a1a1a",
                  color: "#fff",
                  borderRadius: "100px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Book on WhatsApp
                <ArrowRight size={15} />
              </button>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}