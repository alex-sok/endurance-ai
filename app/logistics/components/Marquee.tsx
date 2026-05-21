import type { ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  /** Seconds for one full loop. */
  duration?: number;
  /** Reverse the scroll direction. */
  reverse?: boolean;
}

/**
 * CSS-only marquee — no JS per frame. Doubles its children so the loop
 * is seamless. Used for advisor/investor logo rows. Pauses on hover.
 */
export function Marquee({ children, duration = 40, reverse }: MarqueeProps) {
  return (
    <div className="logi-marquee" aria-hidden="false">
      <div
        className="logi-marquee__track"
        style={{
          animationDuration: `${duration}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        <div className="logi-marquee__group">{children}</div>
        <div className="logi-marquee__group" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
