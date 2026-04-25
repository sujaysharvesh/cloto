// top.tsx
"use client";

import { useEffect, useRef } from "react";

const items = [
  'use code "FIRSTORDER" for free shipping',
  "bundle & save up to 20%",
  "free returns on all orders",
  "new collection — shop now",
  'use code "FIRSTORDER" for free shipping',
  "bundle & save up to 20%",
  "free returns on all orders",
  "new collection — shop now",
];

export default function Top() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let pos = 0;
    let id: number;

    const tick = () => {
      pos -= 0.6;
      if (Math.abs(pos) >= el.scrollWidth / 2) pos = 0;
      el.style.transform = `translateX(${pos}px)`;
      id = requestAnimationFrame(tick);
    };

    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div
      className="w-full overflow-hidden whitespace-nowrap"
      style={{
        background: "#1a1a1a",
        borderBottom: "1px solid #2a2a2a",
        padding: "10px 0",
      }}
    >
      <div ref={scrollRef} className="inline-flex items-center">
        {/* render twice for seamless loop */}
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="inline-flex items-center"
            aria-hidden={copy === 1}
          >
            {items.map((item, i) => (
              <span key={i} className="inline-flex items-center">
                <span
                  className="text-[11px] uppercase tracking-[0.12em]"
                  style={{ color: "rgba(255,255,255,0.55)", fontWeight: 400 }}
                >
                  {item}
                </span>
                {/* dot separator */}
                <span
                  className="mx-6 text-[8px]"
                  style={{ color: "#e05a3a" }}
                >
                  ●
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}