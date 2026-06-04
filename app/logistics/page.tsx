import { Hero } from "./sections/Hero";
import { Problem } from "./sections/Problem";
import { Shift } from "./sections/Shift";
import { Product } from "./sections/Product";
import { Traction } from "./sections/Traction";
import { Market } from "./sections/Market";
import { Moat } from "./sections/Moat";
import { Team } from "./sections/Team";
import { Roadmap } from "./sections/Roadmap";
import { Ask } from "./sections/Ask";
import { Edge } from "./sections/Edge";
import { Close } from "./sections/Close";

/**
 * /logistics — the investor page.
 *
 * Twelve sections, in narrative order. Each is a self-contained beat
 * with its own copy + data. Phase 1 is fully static; Phase 3+ adds
 * GSAP scroll choreography on top of these same components.
 *
 * If you add a section: update sitemap.ts so it's indexed, and add an
 * analytics scroll-depth marker once PostHog/Plausible is wired.
 */
export default function LogisticsPage() {
  return (
    <main>
      <Hero />
      <hr className="logi-rule" />
      <Problem />
      <hr className="logi-rule" />
      <Shift />
      <hr className="logi-rule" />
      <Product />
      <hr className="logi-rule" />
      <Traction />
      <hr className="logi-rule" />
      <Market />
      <hr className="logi-rule" />
      <Moat />
      <hr className="logi-rule" />
      <Team />
      <hr className="logi-rule" />
      <Roadmap />
      <hr className="logi-rule" />
      <Ask />
      <hr className="logi-rule" />
      <Edge />
      <hr className="logi-rule" />
      <Close />
    </main>
  );
}
