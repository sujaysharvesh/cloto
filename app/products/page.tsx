"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { allProducts } from "@/data/products";

const FILTERS = ["All", "Caps", "Tees", "Jackets", "Bottoms"] as const;
type Filter = (typeof FILTERS)[number];

export default function ShopPage() {
  const router = useRouter();
  const [active, setActive] = useState<Filter>("All");
  const [cartCount, setCartCount] = useState(0);
  const [addedCode, setAddedCode] = useState<string | null>(null);

  const filtered =
    active === "All"
      ? allProducts
      : allProducts.filter(
          (p) => p.category?.toLowerCase() === active.toLowerCase()
        );

  function handleAdd(code: string, e: React.MouseEvent) {
    e.stopPropagation();
    setCartCount((c) => c + 1);
    setAddedCode(code);
    setTimeout(() => setAddedCode(null), 1200);
  }

  return (
    <>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&display=swap');
      `}</style>

      <div style={{ background: "#f2f0ec", minHeight: "100vh", fontFamily: "'DM Sans', sans-serif" }}>

        {/* NAV */}
        <nav style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "18px 28px",
          background: "#f2f0ec",
          borderBottom: "1px solid #dedad5",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}>
          <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
            <button
              onClick={() => router.push("/shop")}
              style={navLinkStyle}
            >
              Shop Now
            </button>
            <button style={navLinkStyle}>
              Cart{" "}
              {cartCount > 0 && (
                <span style={{
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  width: 18, height: 18, borderRadius: "50%", background: "#111",
                  color: "#fff", fontSize: 10, fontWeight: 500, marginLeft: 4,
                }}>
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </nav>

        {/* FILTER BAR */}
        <div style={{
          display: "flex",
          gap: 8,
          padding: "16px 28px",
          borderBottom: "1px solid #dedad5",
          flexWrap: "wrap",
          alignItems: "center",
        }}>
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              style={{
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "7px 18px",
                border: "1px solid",
                borderColor: active === f ? "#111" : "#ccc",
                background: active === f ? "#111" : "transparent",
                color: active === f ? "#fff" : "#555",
                cursor: "pointer",
                transition: "all 0.18s",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {f}
            </button>
          ))}
          <span style={{
            marginLeft: "auto",
            fontSize: 11,
            letterSpacing: "0.08em",
            color: "#999",
            textTransform: "uppercase",
          }}>
            {filtered.length} {filtered.length === 1 ? "item" : "items"}
          </span>
        </div>

        {/* GRID */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 2,
          padding: 2,
        }}
          className="shop-grid"
        >
          {filtered.length === 0 && (
            <div style={{
              gridColumn: "1/-1", padding: "60px 28px",
              textAlign: "center", fontSize: 12,
              letterSpacing: "0.1em", textTransform: "uppercase", color: "#999",
            }}>
              No items found
            </div>
          )}

          {filtered.map((product) => {
            const soldOut = product.tag === "sold out";
            const justAdded = addedCode === product.code;

            return (
              <div
                key={product.code}
                onClick={() => router.push(`/products/${product.code}`)}
                className="product-card"
                style={{
                  background: "#ece9e4",
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                  aspectRatio: "3/4",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* TAG */}
                {product.tag && (
                  <span style={{
                    position: "absolute",
                    top: 14,
                    left: 14,
                    fontSize: 9,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    background: product.tag === "new" ? "#111" : "#888",
                    color: "#fff",
                    padding: "4px 9px",
                    zIndex: 2,
                    fontFamily: "'DM Sans', sans-serif",
                  }}>
                    {product.tag}
                  </span>
                )}

                {/* IMAGE */}
                <div style={{ position: "relative", flex: 1, overflow: "hidden", background: "#e8e4de" }}>
                  {product.images?.[0] ? (
                    <Image
                      src={product.images[0]}
                      alt={product.title}
                      fill
                      className="object-cover"
                      style={{ transition: "transform 0.5s ease" }}
                    />
                  ) : (
                    <div style={{
                      width: "100%", height: "100%",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: 40, letterSpacing: "0.06em", color: "rgba(0,0,0,0.08)",
                    }}>
                      {product.code}
                    </div>
                  )}

                  {/* HOVER OVERLAY */}
                  <div className="product-overlay" style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    gap: 12,
                  }}>
                    <span className="overlay-code" style={{
                      fontSize: 11,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "transparent",
                      fontFamily: "'DM Sans', sans-serif",
                      transition: "color 0.25s ease",
                    }}>
                      ({product.code})
                    </span>
                    <button
                      className="overlay-btn"
                      onClick={(e) => !soldOut && handleAdd(product.code, e)}
                      style={{
                        fontSize: 11,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        border: "1px solid transparent",
                        background: justAdded ? "#fff" : "transparent",
                        color: justAdded ? "#111" : "transparent",
                        padding: "9px 22px",
                        cursor: soldOut ? "default" : "pointer",
                        transition: "all 0.25s ease",
                        fontFamily: "'DM Sans', sans-serif",
                        fontWeight: 500,
                      }}
                    >
                      {soldOut ? "Sold Out" : justAdded ? "Added ✓" : "[ View Product ]"}
                    </button>
                  </div>
                </div>

                {/* META */}
                <div style={{
                  padding: "12px 14px 14px",
                  background: "#f2f0ec",
                  borderTop: "1px solid #dedad5",
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                  gap: 8,
                }}>
                  <span style={{
                    fontSize: 11,
                    fontWeight: 500,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#111",
                    lineHeight: 1.4,
                    flex: 1,
                  }}>
                    {product.title}
                  </span>
                  <span style={{
                    fontSize: 12,
                    fontWeight: 400,
                    letterSpacing: "0.06em",
                    color: "#555",
                    whiteSpace: "nowrap",
                  }}>
                    {product.price}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Scoped hover styles */}
      <style>{`
        .shop-grid {
          grid-template-columns: repeat(3, 1fr);
        }
        @media (max-width: 768px) {
          .shop-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .shop-grid { grid-template-columns: 1fr !important; }
        }

        .product-card .product-overlay {
          background: rgba(0,0,0,0);
          transition: background 0.3s ease;
        }
        .product-card:hover .product-overlay {
          background: rgba(0,0,0,0.38);
        }
        .product-card:hover .overlay-code {
          color: rgba(255,255,255,0.8) !important;
        }
        .product-card:hover .overlay-btn {
          color: #fff !important;
          border-color: rgba(255,255,255,0.7) !important;
        }
        .product-card:hover .overlay-btn:hover {
          background: #fff !important;
          color: #111 !important;
          border-color: #fff !important;
        }
        .product-card:hover img {
          transform: scale(1.03);
        }
      `}</style>
    </>
  );
}

const navLinkStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 500,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "#111",
  background: "none",
  border: "none",
  cursor: "pointer",
  fontFamily: "'DM Sans', sans-serif",
  display: "flex",
  alignItems: "center",
};