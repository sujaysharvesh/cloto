// Footer.tsx

"use client";

export default function Footer() {
  return (
    <footer
      className="w-full overflow-hidden"
      style={{ background: "#faf8f5" }}
    >

      {/* MAIN FOOTER GRID */}
      <div className="mx-auto px-5 md:px-8 pt-16 md:pt-24 pb-12 md:pb-16">

        <div
          className="
            grid
            grid-cols-2
            md:grid-cols-4
            gap-10
            md:gap-8
          "
        >

          {/* SITE INDEX */}
          <div>
            <p
              className="
                text-[11px]
                font-semibold
                uppercase
                tracking-[0.12em]
                mb-3
              "
              style={{ color: "#1a1a1a" }}
            >
              Site Index
            </p>

            <div
              style={{
                borderTop: "1px solid #c8c2ba",
                marginBottom: "20px",
              }}
            />

            <div className="flex flex-col gap-2">
              {[
                "Shop Now",
                "Home",
                "About Us",
                "Contact Us",
              ].map((item) => (
                <span
                  key={item}
                  className="
                    text-[11px]
                    uppercase
                    tracking-[0.1em]
                    cursor-pointer
                    transition-colors
                    duration-200
                  "
                  style={{ color: "#8a847c" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#1a1a1a")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#8a847c")
                  }
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* SOCIAL */}
          <div>
            <p
              className="
                text-[11px]
                font-semibold
                uppercase
                tracking-[0.12em]
                mb-3
              "
              style={{ color: "#1a1a1a" }}
            >
              Social
            </p>

            <div
              style={{
                borderTop: "1px solid #c8c2ba",
                marginBottom: "20px",
              }}
            />

            <div className="flex flex-col gap-2">
              {[
                "Instagram",
                "Pinterest",
                "Twitter",
                "TikTok",
              ].map((item) => (
                <span
                  key={item}
                  className="
                    text-[11px]
                    uppercase
                    tracking-[0.1em]
                    cursor-pointer
                    transition-colors
                    duration-200
                  "
                  style={{ color: "#8a847c" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#1a1a1a")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#8a847c")
                  }
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* GET IN TOUCH */}
          <div>
            <p
              className="
                text-[11px]
                font-semibold
                uppercase
                tracking-[0.12em]
                mb-3
              "
              style={{ color: "#1a1a1a" }}
            >
              Get in Touch
            </p>

            <div
              style={{
                borderTop: "1px solid #c8c2ba",
                marginBottom: "20px",
              }}
            />

            <div className="flex flex-col gap-2">
              {[
                "hello@cloto.com",
                "+91 98765 43210",
              ].map((item) => (
                <span
                  key={item}
                  className="
                    text-[11px]
                    uppercase
                    tracking-[0.1em]
                    cursor-pointer
                    transition-colors
                    duration-200
                  "
                  style={{ color: "#8a847c" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#e05a3a")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#8a847c")
                  }
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* SUPPORT */}
          <div>
            <p
              className="
                text-[11px]
                font-semibold
                uppercase
                tracking-[0.12em]
                mb-3
              "
              style={{ color: "#1a1a1a" }}
            >
              Support
            </p>

            <div
              style={{
                borderTop: "1px solid #c8c2ba",
                marginBottom: "20px",
              }}
            />

            <div className="flex flex-col gap-2">
              {[
                "Contact Us",
                "Shipping",
                "Returns",
                "Size Guide",
              ].map((item) => (
                <span
                  key={item}
                  className="
                    text-[11px]
                    uppercase
                    tracking-[0.1em]
                    cursor-pointer
                    transition-colors
                    duration-200
                  "
                  style={{ color: "#8a847c" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#1a1a1a")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#8a847c")
                  }
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* BIG LOGO */}
      <div className="w-full overflow-hidden">
        <p
          className="
            text-center
            font-bold
            leading-none
            select-none
          "
          style={{
            fontFamily: "Telma",
            color: "#0a0a0a",
            fontSize: "clamp(72px, 18vw, 260px)",
            letterSpacing: "-0.02em",
            lineHeight: 0.85,
            padding: "12px 0 0",
          }}
        >
          Cloto
        </p>
      </div>

      {/* BOTTOM BAR */}
      <div
        className="
          w-full
          px-5
          md:px-8
          py-5

          flex
          flex-col
          md:flex-row

          items-center
          justify-between

          gap-3
          md:gap-0
        "
        style={{
          borderTop: "1px solid #ece7df",
        }}
      >

        <p
          className="
            text-[10px]
            md:text-[11px]

            uppercase
            tracking-[0.1em]

            text-center
            md:text-left
          "
          style={{ color: "#8a847c" }}
        >
          All Rights Reserved _ Cloto©
          {new Date().getFullYear()}
        </p>

        <p
          className="
            text-[10px]
            md:text-[11px]

            uppercase
            tracking-[0.1em]
          "
          style={{ color: "#c8c2ba" }}
        >
          Est. 2025
        </p>

      </div>

    </footer>
  );
}