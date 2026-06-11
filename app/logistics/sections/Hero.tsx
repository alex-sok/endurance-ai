import { SectionShell } from "../components/SectionShell";
import { HeroV2 } from "../components/HeroV2";

/**
 * §1 — Hero. "The network, 23:47."
 *
 * V2 (see DESIGN-V2.md): the static SVG network renders as the base
 * layer (LCP-safe) and the WebGL aerial night-world crossfades over it.
 * All choreography + the zero-animation facts strip live in HeroV2;
 * this stays a server component.
 */
export function Hero() {
  return (
    <SectionShell id="hero" index="01" className="logi-hero">
      <HeroV2 />
    </SectionShell>
  );
}
