"use client"

export default function TypingDot({ color }: { color: string }) {
    return (
      <span
        style={{
          display: "inline-flex",
          gap: 2,
          marginLeft: 4,
          alignItems: "center",
        }}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              width: 3,
              height: 3,
              borderRadius: "50%",
              background: color,
              animation: `typingBounce 1.2s ${i * 0.2}s infinite ease-in-out`,
            }}
          />
        ))}
        <style>{`
          @keyframes typingBounce {
            0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
            30% { transform: translateY(-4px); opacity: 1; }
          }
        `}</style>
      </span>
    );
  }