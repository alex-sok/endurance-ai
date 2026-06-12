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

function Row({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div className="flex shrink-0 items-center" aria-hidden={ariaHidden}>
      {ITEMS.map((item) => (
        <span key={item} className="flex items-center">
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-bone/55 whitespace-nowrap px-7">
            {item}
          </span>
          <span className="text-flare/60 text-[7px]" aria-hidden>
            ✦
          </span>
        </span>
      ))}
    </div>
  );
}

export function LandingTicker() {
  return (
    <div
      className="relative z-10 overflow-hidden py-4 border-y"
      style={{ borderColor: "rgba(244,243,238,0.07)" }}
      role="marquee"
      aria-label="Endurance at a glance"
    >
      <div className="flex w-max animate-[ticker_55s_linear_infinite] motion-reduce:animate-none">
        <Row />
        <Row ariaHidden />
      </div>
    </div>
  );
}
