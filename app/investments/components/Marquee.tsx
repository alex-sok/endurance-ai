import type { ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  duration?: number;
  reverse?: boolean;
}

export function Marquee({ children, duration = 40, reverse }: MarqueeProps) {
  return (
    <div className="inv-marquee" aria-hidden="false">
      <div
        className="inv-marquee__track"
        style={{
          animationDuration: `${duration}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        <div className="inv-marquee__group">{children}</div>
        <div className="inv-marquee__group" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
