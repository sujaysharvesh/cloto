"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

const LINKS = {
  "Site Index": ["Shop Now", "Home", "About Us", "Contact Us"],
  Social: ["Instagram", "Pinterest", "Twitter", "TikTok"],
  Support: ["Shipping", "Returns", "Size Guide", "FAQs"],
};

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <footer
      style={{
        background: "#0e0d0c",
        color: "#fff",
        fontFamily: "'DM Sans', sans-serif",
        overflow: "hidden",
      }}
    >
      {/* ── TOP SECTION ── */}
      <div
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: "80px 40px 64px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "64px 80px",
          alignItems: "start",
        }}
        className="footer-top"
      >
        {/* LEFT — brand + newsletter */}
        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          {/* Logo */}
          <div>
            <span
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 48,
                fontWeight: 300,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#fff",
                lineHeight: 1,
              }}
            >
              CLOTO
            </span>
            <p
              style={{
                fontSize: 12,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#555",
                marginTop: 10,
                fontWeight: 400,
              }}
            >
              Est. 2025 — Bengaluru, India
            </p>
          </div>

          {/* Newsletter */}
          <div>
            <p
              style={{
                fontSize: 13,
                letterSpacing: "0.06em",
                color: "#888",
                marginBottom: 20,
                lineHeight: 1.6,
                maxWidth: 320,
              }}
            >
              New arrivals, restocks, and early access — straight to your inbox.
            </p>

            {submitted ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "14px 0",
                  borderBottom: "1px solid #333",
                }}
              >
                <span style={{ fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: "#888" }}>
                  You're in ✓
                </span>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  alignItems: "center",
                  borderBottom: "1px solid #333",
                  paddingBottom: 14,
                  gap: 12,
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => ((e.currentTarget as HTMLFormElement).style.borderBottomColor = "#fff")}
                onBlur={(e) => ((e.currentTarget as HTMLFormElement).style.borderBottomColor = "#333")}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  style={{
                    flex: 1,
                    background: "none",
                    border: "none",
                    outline: "none",
                    fontSize: 13,
                    letterSpacing: "0.04em",
                    color: "#fff",
                    fontFamily: "inherit",
                  }}
                />
                <button
                  type="submit"
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    transition: "opacity 0.2s",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "0.5")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "1")}
                >
                  <ArrowUpRight size={18} />
                </button>
              </form>
            )}
          </div>

          {/* Contact */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {["hello@cloto.com", "+91 55555 99999"].map((c) => (
              <a
                key={c}
                href={c.includes("@") ? `mailto:${c}` : `tel:${c}`}
                style={{
                  fontSize: 12,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#555",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#fff")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#555")}
              >
                {c}
              </a>
            ))}
          </div>
        </div>

        {/* RIGHT — link columns */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 32,
            paddingTop: 8,
          }}
          className="footer-links"
        >
          {Object.entries(LINKS).map(([heading, items]) => (
            <div key={heading}>
              <p
                style={{
                  fontSize: 10,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#444",
                  marginBottom: 20,
                  fontWeight: 500,
                }}
              >
                {heading}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {items.map((item) => (
                  <a
                    key={item}
                    href="#"
                    style={{
                      fontSize: 13,
                      letterSpacing: "0.04em",
                      color: "#777",
                      textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#fff")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#777")}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── BIG WORDMARK ── */}
      <div
        style={{
          borderTop: "1px solid #1c1b1a",
          borderBottom: "1px solid #1c1b1a",
          overflow: "hidden",
          padding: "6px 0",
        }}
      >
        <p
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(80px, 18vw, 240px)",
            fontWeight: 300,
            letterSpacing: "-0.02em",
            lineHeight: 0.9,
            color: "#1c1b1a",
            textAlign: "center",
            userSelect: "none",
            whiteSpace: "nowrap",
            textTransform: "uppercase",
          }}
        >
          CLOTO
        </p>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: "20px 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <p
          style={{
            fontSize: 11,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#444",
          }}
        >
          © {new Date().getFullYear()} Cloto. All rights reserved.
        </p>

        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {["Privacy Policy", "Terms of Use"].map((t) => (
            <a
              key={t}
              href="#"
              style={{
                fontSize: 11,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#444",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#fff")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#444")}
            >
              {t}
            </a>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-top {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
            padding: 52px 24px 48px !important;
          }
          .footer-links {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 480px) {
          .footer-links {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}