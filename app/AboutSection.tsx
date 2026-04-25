"use client";

export default function AboutSection() {
  return (
    <section className="w-full relative min-h-screen overflow-hidden">

      {/* FULL SCREEN VIDEO */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/video.mp4" type="video/mp4" />
      </video>

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/40" />

      {/* CONTENT — left aligned over video */}
      <div className="relative z-10 flex flex-col justify-between min-h-screen px-16 py-14">

        {/* TOP LABELS */}
        <div className="flex items-center justify-between border-b border-white/20 pb-4">
          <span className="text-[13px] uppercase tracking-[0.08em] text-white/70">
            About Us
          </span>
          <span className="text-[13px] uppercase tracking-[0.08em] text-white/70">
            Est. 1974
          </span>
        </div>

        {/* MAIN TEXT — bottom left */}
        <div className="max-w-[580px] mt-auto ml-auto text-right">

          <p className="text-[15px] leading-[1.2] tracking-[-0.02em] text-white font-light">
            From the renowned tailoring atelier of Vilmo Martini in Carrara
            to the international Mason's brand: discover how, in 1974,
            his son Giorgio transformed his father's craftsmanship into an
            entrepreneurial journey that still today blends artisanal
            tradition and innovation in the world of fashion.
          </p>

          <button
            className="
              mt-10 px-8 py-4
              border border-white
              text-[14px] uppercase tracking-[0.12em]
              text-white
              hover:bg-white hover:text-black
              transition-all duration-300
            "
          >
            About Us
          </button>

        </div>

      </div>

    </section>
  );
}