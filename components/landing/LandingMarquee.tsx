"use client";

const ITEMS = [
  "Fortune 500 engagements",
  "2-week turnarounds",
  "Regulated industries",
  "Strategy through deployment",
  "No discovery theater",
  "AI Audit · $999 flat",
  "Embedded engineers",
  "Ships, not decks",
  "Mid-market focus",
  "Fixed scope. Flat fee.",
];

const TRACK = [...ITEMS, ...ITEMS];

export function LandingMarquee() {
  return (
    <div
      className="overflow-hidden"
      style={{
        background: "#080d17",
        borderTop: "1px solid rgba(124,58,237,0.18)",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
        padding: "14px 0",
      }}
    >
      <style>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>

      <div
        style={{
          display: "flex",
          width: "max-content",
          animation: "marquee-scroll 48s linear infinite",
        }}
      >
        {TRACK.map((item, i) => (
          <span
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "20px",
              padding: "0 20px",
              fontSize: "10px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgba(247,247,244,0.28)",
              fontFamily: "var(--font-jetbrains)",
              whiteSpace: "nowrap",
            }}
          >
            {item}
            <span style={{ color: "#7c3aed", fontSize: "7px" }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
